import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "FAQ", description: "Answers about bookings, payment, pick-up and towing." };

export default async function FaqPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase.from("faq").select("id, question, answer").eq("active", true).order("id");

  return (
    <>
      <PageHeader title="Frequently asked questions" />
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-12">
        {(faqs ?? []).map((f) => (
          <details key={f.id} className="group rounded-xl border border-border bg-card p-5 open:border-ink">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {f.question}
                <span aria-hidden="true" className="text-xl transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
