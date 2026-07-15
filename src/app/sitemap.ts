import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ROUTES, type RouteKey } from "@/lib/routes";

const PRIORITY: Partial<Record<RouteKey, number>> = {
  home: 1,
  transportAmont: 0.95,
  services: 0.9,
  quote: 0.9,
  why: 0.8,
  about: 0.7,
  sectors: 0.7,
  contact: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const [key, paths] of Object.entries(ROUTES) as [RouteKey, { fr: string; en: string }][]) {
    for (const locale of ["fr", "en"] as const) {
      entries.push({
        url: `${SITE.url}${paths[locale]}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: PRIORITY[key] ?? 0.6,
        alternates: {
          languages: {
            fr: `${SITE.url}${paths.fr}`,
            en: `${SITE.url}${paths.en}`,
          },
        },
      });
    }
  }
  return entries;
}
