import Link from "next/link";
import { Wrench } from "lucide-react";
import { getCurrentUser } from "@/lib/site";
import { ButtonLink } from "@/components/ui";
import { MobileNav } from "@/components/mobile-nav";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact & quote" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();
  const isStaff = user?.profile?.role === "staff" || user?.profile?.role === "admin";

  const links = [
    ...NAV,
    ...(user ? [{ href: "/account/bookings", label: "My bookings" }] : []),
    ...(isStaff ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Wrench className="size-4" aria-hidden="true" />
          </span>
          Nkubu Auto
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm text-ink-foreground/80 hover:bg-white/10 hover:text-ink-foreground">
              {l.label}
            </Link>
          ))}
          {user ? (
            <form action="/auth/signout" method="post">
              <button className="rounded-md px-3 py-2 text-sm text-ink-foreground/80 hover:bg-white/10">Sign out</button>
            </form>
          ) : (
            <Link href="/auth/login" className="rounded-md px-3 py-2 text-sm text-ink-foreground/80 hover:bg-white/10">
              Sign in
            </Link>
          )}
          <ButtonLink href="/book" className="ml-2">
            Book a service
          </ButtonLink>
        </nav>

        <MobileNav links={links} signedIn={!!user} />
      </div>
    </header>
  );
}
