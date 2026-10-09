import { MessageCircle } from "lucide-react";
import { getSettings, waLink } from "@/lib/site";

export async function WhatsAppFab() {
  const { business } = await getSettings();
  return (
    <a
      href={waLink(business.whatsapp, "Hello Nkubu Auto Garage, I need help with my vehicle.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 font-semibold text-[#0b2e17] shadow-lg hover:brightness-95"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only sm:hidden">Chat on WhatsApp</span>
    </a>
  );
}
