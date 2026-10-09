import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { getCurrentUser, getSettings, waLink } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = { title: "Contact & quote", description: "Find Nkubu Auto Garage or request a repair quote." };

export default async function ContactPage() {
  const [{ business, hours }, user] = await Promise.all([getSettings(), getCurrentUser()]);

  return (
    <>
      <PageHeader title="Contact & quote" subtitle="Tell us what's wrong and we'll get back to you with an estimate." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1fr_1.2fr]">
        <ul className="flex flex-col gap-5">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-5 text-accent" aria-hidden="true" />
            <address className="not-italic">{business.address}</address>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 size-5 text-accent" aria-hidden="true" />
            {hours.label}
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-5 text-accent" aria-hidden="true" />
            <a href={`tel:${business.phone}`} className="font-semibold hover:underline">
              {business.phone}
            </a>
          </li>
          <li className="flex gap-3">
            <MessageCircle className="mt-0.5 size-5 text-accent" aria-hidden="true" />
            <a href={waLink(business.whatsapp)} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
              Chat on WhatsApp
            </a>
          </li>
          <li className="mt-2 overflow-hidden rounded-xl border border-border">
            <iframe
              title="Map of Nkubu town"
              src="https://www.google.com/maps?q=Nkubu,+Meru,+Kenya&output=embed"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </li>
        </ul>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-extrabold">Request a quote</h2>
          <QuoteForm defaultName={user?.profile?.full_name ?? ""} defaultPhone={user?.profile?.phone ?? ""} />
        </div>
      </div>
    </>
  );
}
