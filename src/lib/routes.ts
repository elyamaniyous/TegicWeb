import type { Locale } from "./site";

/**
 * Table de correspondance des routes FR ↔ EN.
 * Sert au sélecteur de langue, aux balises hreflang et au sitemap.
 */
export const ROUTES = {
  home: { fr: "/", en: "/en" },
  about: { fr: "/qui-sommes-nous", en: "/en/about" },
  services: { fr: "/services", en: "/en/services" },
  transportAmont: { fr: "/services/transport-amont", en: "/en/services/upstream-transport" },
  transitDouane: { fr: "/services/transit-douane", en: "/en/services/customs-transit" },
  entreposage: { fr: "/services/entreposage", en: "/en/services/warehousing" },
  distribution: { fr: "/services/distribution", en: "/en/services/distribution" },
  freightForwarding: { fr: "/services/freight-forwarding", en: "/en/services/freight-forwarding" },
  why: { fr: "/pourquoi-tegic", en: "/en/why-tegic" },
  sectors: { fr: "/secteurs", en: "/en/sectors" },
  contact: { fr: "/contact", en: "/en/contact" },
  quote: { fr: "/devis", en: "/en/quote" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function href(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

/** Retrouve la clé de route à partir d'un pathname (pour le switch de langue). */
export function routeKeyFromPath(pathname: string): RouteKey | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const [key, paths] of Object.entries(ROUTES)) {
    if (paths.fr === clean || paths.en === clean) return key as RouteKey;
  }
  return null;
}

export function alternate(pathname: string, target: Locale): string {
  const key = routeKeyFromPath(pathname);
  if (!key) return target === "fr" ? "/" : "/en";
  return ROUTES[key][target];
}
