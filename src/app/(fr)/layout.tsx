import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/RootShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Tegic Logistique — 3PL de référence au Maroc", template: "%s" },
  applicationName: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#041108",
  width: "device-width",
  initialScale: 1,
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
