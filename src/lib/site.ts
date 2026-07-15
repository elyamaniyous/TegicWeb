export const SITE = {
  name: "Tegic Logistique",
  legalName: "Tegic Logistique",
  brand: "tegic",
  tagline: "STRATEGIC LOGISTICS",
  baseline: {
    fr: "Le 3PL de référence des grandes marques au Maroc. Transit · Transport · Entreposage · Distribution.",
    en: "The 3PL of choice for leading brands in Morocco. Customs transit · Transport · Warehousing · Distribution.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tegiclogistique.com",
  email: "contact@tegiclogistique.com",
  address: {
    street: "Marina, Lot A4, Immeuble Oceanes 3",
    city: "Casablanca",
    country: "Maroc",
    countryCode: "MA",
  },
  certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "IATA"],
} as const;

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";
/** L'arabe est prévu dans l'architecture (dir RTL, dictionnaire dédié) — activé dès que la traduction validée est fournie. */
export const FUTURE_LOCALES = ["ar"] as const;
