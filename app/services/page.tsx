import type { Metadata } from "next";
import { getServices } from "@/lib/site";
import { ServiceCard } from "@/components/service-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Services",
  description: "Servicing, diesel injection, brakes, tyres, electrical, AC, suspension, hydraulics and engine overhauls in Nkubu.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader title="Our services" subtitle="Prices depend on your vehicle, so we quote after inspection." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </>
  );
}
