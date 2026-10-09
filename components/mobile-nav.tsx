"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileNav({ links, signedIn }: { links: { href: string; label: string }[]; signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="rounded-md p-2 hover:bg-white/10"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-white/10 bg-ink px-4 pb-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block rounded-md px-2 py-3 text-ink-foreground/90 hover:bg-white/10">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              {signedIn ? (
                <form action="/auth/signout" method="post">
                  <button className="w-full rounded-md px-2 py-3 text-left text-ink-foreground/90 hover:bg-white/10">Sign out</button>
                </form>
              ) : (
                <Link href="/auth/login" onClick={close} className="block rounded-md px-2 py-3 text-ink-foreground/90 hover:bg-white/10">
                  Sign in
                </Link>
              )}
            </li>
          </ul>
          <Link
            href="/book"
            onClick={close}
            className="mt-2 block rounded-md bg-accent px-4 py-3 text-center font-semibold text-accent-foreground"
          >
            Book a service
          </Link>
        </nav>
      )}
    </div>
  );
}
