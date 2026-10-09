import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nkubu Auto Garage | Car, truck & diesel repairs in Nkubu, Meru",
    template: "%s | Nkubu Auto Garage",
  },
  description:
    "Trusted vehicle repairs in Nkubu, Meru County since 2019. Diesel injection, servicing, brakes, electrical, AC and engine overhauls. Book online or WhatsApp us.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
