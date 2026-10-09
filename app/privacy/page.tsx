import type { Metadata } from "next";
import { getSettings } from "@/lib/site";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Privacy" };

export default async function PrivacyPage() {
  const { business } = await getSettings();
  return (
    <>
      <PageHeader title="Privacy" subtitle="How we handle your information under the Kenya Data Protection Act, 2019." />
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-12 text-sm leading-relaxed text-muted-foreground">
        <p>
          We collect your name, phone number, email and vehicle details only to manage your bookings and repair quotes. We do not
          sell or share your data with third parties for marketing.
        </p>
        <p>
          You can ask us to see, correct or delete your information at any time by emailing{" "}
          <a href={`mailto:${business.privacy_email}`} className="font-semibold text-foreground underline">
            {business.privacy_email}
          </a>{" "}
          or calling {business.phone}.
        </p>
      </div>
    </>
  );
}
