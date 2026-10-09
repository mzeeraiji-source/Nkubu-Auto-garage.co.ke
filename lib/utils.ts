import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TZ_OFFSET = "+03:00";

export function formatNairobi(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-KE", { timeZone: "Africa/Nairobi", ...opts }).format(new Date(iso));
}

export function todayNairobi() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date());
}
