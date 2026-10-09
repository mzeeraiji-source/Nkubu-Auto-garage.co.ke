import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDuration, type Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-ink"
    >
      <h3 className="font-semibold">{service.name}</h3>
      {service.name_sw && service.name_sw !== service.name && (
        <p className="text-xs text-muted-foreground" lang="sw">
          {service.name_sw}
        </p>
      )}
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-4" aria-hidden="true" /> {formatDuration(service.duration_min)}
        </span>
        <span className="flex items-center gap-1 font-semibold group-hover:text-ink">
          Details <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
