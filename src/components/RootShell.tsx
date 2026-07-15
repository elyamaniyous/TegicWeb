import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@/app/globals.css";
import { RevealManager } from "@/components/RevealManager";
import { MotionProvider } from "@/components/motion/Motion";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import type { ReactNode } from "react";

/** Coquille racine partagée par les root layouts FR et EN. */
export function RootShell({ lang, children }: { lang: "fr" | "en"; children: ReactNode }) {
  return (
    <html lang={lang}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <RevealManager />
        <MotionProvider />
        {children}
      </body>
    </html>
  );
}
