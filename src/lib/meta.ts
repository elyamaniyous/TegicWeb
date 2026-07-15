import type { Metadata } from "next";
import { SITE, type Locale } from "./site";
import { ROUTES, type RouteKey } from "./routes";
import { getDict } from "@/i18n";

type MetaKey = keyof ReturnType<typeof getDict>["meta"];

const OG_BY_ROUTE: Partial<Record<RouteKey, string>> = {
  transportAmont: "/og/og-transport-amont.png",
};

/** Construit les métadonnées SEO d'une page : canonical, hreflang, OG, Twitter. */
export function buildMetadata(locale: Locale, route: RouteKey, metaKey: MetaKey): Metadata {
  const dict = getDict(locale);
  const m = dict.meta[metaKey];
  const path = ROUTES[route][locale];
  const url = `${SITE.url}${path}`;
  const ogImage = `${SITE.url}${OG_BY_ROUTE[route] ?? "/og/og-tegic.png"}`;

  return {
    title: m.title,
    description: m.description,
    keywords: [...m.keywords],
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE.url}${ROUTES[route].fr}`,
        en: `${SITE.url}${ROUTES[route].en}`,
        "x-default": `${SITE.url}${ROUTES[route].fr}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: m.title,
      description: m.description,
      url,
      locale: locale === "fr" ? "fr_MA" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [ogImage],
    },
  };
}
