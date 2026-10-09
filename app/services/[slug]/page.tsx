import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { formatDuration, getServices, getSettings, waLink } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui";

async function findService(slug: string) {
  const services = await getServices();
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await findService(slug);
  return service ? { title: service.name, description: service.description ?? undefined } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, { business }] = await Promise.all([findService(slug), getSettings()]);
  if (!service) notFound();

  return (
    <>
      <PageHeader title={service.name} subtitle={service.description ?? undefined}>
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-foreground/75">
          <Clock className="size-4 text-accent" aria-hidden="true" />
          Typical time: {formatDuration(service.duration_min)}
        </p>
      </PageHeader>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">How pricing works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every vehicle is different. When you arrive we inspect, explain what we found and give you a price before any work
            starts. Pay by cash or M-Pesa at the garage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/book?service=${service.slug}`}>Book {service.name.toLowerCase()}</ButtonLink>
            <a
              href={waLink(business.whatsapp, `Hello, I would like a quote for ${service.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
