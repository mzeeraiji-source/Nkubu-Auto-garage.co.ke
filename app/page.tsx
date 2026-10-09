import Image from "next/image";
import { Clock, MapPin, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { getServices, getSettings, waLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui";
import { ServiceCard } from "@/components/service-card";

const REASONS = [
  { icon: ShieldCheck, title: "Honest quotes", body: "We inspect first and explain the fix before we touch your car. No surprise bills." },
  { icon: Wrench, title: "Diesel specialists", body: "Injector testing, pump calibration and engine work for pickups, trucks and tractors." },
  { icon: Truck, title: "Pick-up and towing", body: "Can't drive in? We collect your vehicle or tow it around Meru County." },
];

export default async function HomePage() {
  const [services, { business, hours }] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Image
          src="/images/hero-garage.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Nkubu, Meru County</p>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {business.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-ink-foreground/80">
            Cars, pickups, trucks, matatus, motorbikes and tractors. Petrol, diesel, hybrid and electric. Book a slot online in a
            minute.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book" className="px-6 py-3 text-base">
              Book a service
            </ButtonLink>
            <a
              href={waLink(business.whatsapp, "Hello, I would like a quote for my vehicle.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-white/25 px-6 py-3 text-base font-semibold hover:bg-white/10"
            >
              Get a quote on WhatsApp
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-foreground/80">
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-accent" aria-hidden="true" /> {hours.label}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" aria-hidden="true" /> Opposite Tims Garage, Nkubu
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              <a href={`tel:${business.phone}`} className="hover:text-accent">
                {business.phone}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="services-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="services-heading" className="font-display text-3xl font-extrabold">
              What we fix
            </h2>
            <p className="mt-2 text-muted-foreground">Pick a service and choose a time that suits you.</p>
          </div>
          <ButtonLink href="/services" variant="outline">
            All services
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/diesel-work.png"
              alt="Mechanic testing diesel injectors on the workbench"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold">Why drivers in Meru come back</h2>
            <ul className="mt-6 flex flex-col gap-6">
              {REASONS.map((r) => (
                <li key={r.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent/15 text-ink">
                    <r.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-accent p-8 text-accent-foreground sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Not sure what&apos;s wrong?</h2>
            <p className="mt-1">Describe the problem and we&apos;ll get back to you with an estimate.</p>
          </div>
          <ButtonLink href="/contact" variant="dark">
            Request a quote
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
