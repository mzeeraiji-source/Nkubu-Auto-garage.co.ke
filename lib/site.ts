import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Business = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  established: number;
  privacy_email: string;
};
export type Hours = { days: number[]; open: string; close: string; label: string };
export type BookingConfig = { auto_confirm: boolean; max_days_ahead: number; slot_minutes: number; cancel_hours: number };
export type Service = {
  id: string;
  slug: string;
  name: string;
  name_sw: string | null;
  description: string | null;
  duration_min: number;
};

const DEFAULTS = {
  business: {
    name: "Nkubu Auto Garage",
    tagline: "Honest repairs. Fast service.",
    address: "Nkubu town, opposite Tims Garage, Meru County",
    phone: "+254718144143",
    whatsapp: "+254718144143",
    established: 2019,
    privacy_email: "murangirijunior46@gmail.com",
  } as Business,
  hours: { days: [1, 2, 3, 4, 5, 6], open: "08:00", close: "17:00", label: "Mon-Sat 08:00-17:00" } as Hours,
  booking: { auto_confirm: true, max_days_ahead: 30, slot_minutes: 30, cancel_hours: 4 } as BookingConfig,
};

export const getSettings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  return {
    business: { ...DEFAULTS.business, ...(map.business ?? {}) } as Business,
    hours: { ...DEFAULTS.hours, ...(map.hours ?? {}) } as Hours,
    booking: { ...DEFAULTS.booking, ...(map.booking ?? {}) } as BookingConfig,
  };
});

export const getServices = cache(async (): Promise<Service[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, slug, name, name_sw, description, duration_min")
    .eq("active", true)
    .order("name");
  return data ?? [];
});

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role, staff_type")
    .eq("id", user.id)
    .single();
  return { id: user.id, email: user.email, profile };
});

export function waLink(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function formatDuration(min: number) {
  if (min >= 1440) return `${Math.round(min / 1440)}+ day job`;
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
