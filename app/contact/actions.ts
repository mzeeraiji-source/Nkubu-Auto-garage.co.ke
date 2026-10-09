"use server";

import { createClient } from "@/lib/supabase/server";
import { normalizePhone } from "@/lib/phone";

export type QuoteState = { ok?: boolean; error?: string };

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const description = String(formData.get("description") ?? "").trim();

  if (!name) return { error: "Please enter your name." };
  if (!phone) return { error: "Please enter a valid Kenyan phone number." };
  if (description.length < 10) return { error: "Please describe the problem in a bit more detail." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_quote", { p_name: name, p_phone: phone, p_description: description });
  if (error) {
    console.error("[quote] submit failed", error.message);
    return { error: "Something went wrong. Please try again or WhatsApp us." };
  }
  return { ok: true };
}
