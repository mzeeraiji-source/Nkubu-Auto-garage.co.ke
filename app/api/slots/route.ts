import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getServices, getSettings } from "@/lib/site";
import { TZ_OFFSET } from "@/lib/utils";

export type Slot = { startsAt: string; label: string; available: boolean };

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("service");
  const date = request.nextUrl.searchParams.get("date");
  if (!slug || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }

  const [services, { hours, booking }] = await Promise.all([getServices(), getSettings()]);
  const service = services.find((s) => s.slug === slug);
  if (!service) return NextResponse.json({ error: "invalid_service" }, { status: 404 });

  const dayStart = new Date(`${date}T00:00:00${TZ_OFFSET}`);
  const isoDow = ((dayStart.getUTCDay() + 6 + (dayStart.getUTCHours() >= 21 ? 1 : 0)) % 7) + 1;
  const weekday = new Date(`${date}T12:00:00${TZ_OFFSET}`).getUTCDay();
  const dow = weekday === 0 ? 7 : weekday;
  void isoDow;
  if (!hours.days.includes(dow)) return NextResponse.json({ closed: true, slots: [] });

  const supabase = await createClient();
  const dayEnd = new Date(dayStart.getTime() + 2 * 24 * 60 * 60 * 1000);
  const [{ data: bays }, { data: busy }] = await Promise.all([
    supabase.from("bays").select("id").eq("online", true),
    supabase.rpc("busy_ranges", { p_from: dayStart.toISOString(), p_to: dayEnd.toISOString() }),
  ]);
  const capacity = bays?.length ?? 0;

  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const step = booking.slot_minutes || 30;
  const earliest = Date.now() + 30 * 60 * 1000;
  const latestDay = Date.now() + booking.max_days_ahead * 24 * 60 * 60 * 1000;
  const longJob = service.duration_min > 240;

  const slots: Slot[] = [];
  for (let m = open; m < close; m += step) {
    if (!longJob && m + service.duration_min > close) break;
    const hh = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    const start = new Date(`${date}T${hh}:${mm}:00${TZ_OFFSET}`);
    const end = new Date(start.getTime() + service.duration_min * 60 * 1000);
    const overlapping = (busy ?? []).filter(
      (b: { starts_at: string; ends_at: string }) => new Date(b.starts_at) < end && new Date(b.ends_at) > start,
    ).length;
    const available = start.getTime() >= earliest && start.getTime() <= latestDay && overlapping < capacity;
    slots.push({ startsAt: start.toISOString(), label: `${hh}:${mm}`, available });
  }

  return NextResponse.json({ closed: false, slots }, { headers: { "Cache-Control": "no-store" } });
}
