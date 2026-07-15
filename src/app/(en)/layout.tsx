import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/RootShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Tegic Logistics — Morocco's reference 3PL", template: "%s" },
  applicationName: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#041108",
  width: "device-width",
  initialScale: 1,
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
