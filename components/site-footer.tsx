import Link from "next/link";
import { getSettings, waLink } from "@/lib/site";

export async function SiteFooter() {
  const { business, hours } = await getSettings();
  return (
    <footer className="bg-ink text-ink-foreground/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-ink-foreground">{business.name}</p>
          <p className="mt-2 text-sm">{business.tagline}</p>
          <p className="mt-2 text-sm">Serving Meru County since {business.established}.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-ink-foreground">Visit</p>
          <address className="mt-2 not-italic">{business.address}</address>
          <p className="mt-1">{hours.label}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-ink-foreground">Talk to us</p>
          <ul className="mt-2 flex flex-col gap-1">
            <li>
              <a href={`tel:${business.phone}`} className="hover:text-accent">
                Call {business.phone}
              </a>
            </li>
            <li>
              <a href={waLink(business.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                WhatsApp us
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs">
        {"\u00A9"} {new Date().getFullYear()} {business.name}
      </p>
    </footer>
  );
}
