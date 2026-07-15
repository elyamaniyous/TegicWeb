import { SITE, type Locale } from "./site";
import { ROUTES } from "./routes";
import type { Dict } from "@/i18n";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "tegic — Strategic Logistics",
    url: SITE.url,
    logo: `${SITE.url}/brand/tegic-logo.svg`,
    email: SITE.email,
    slogan: SITE.baseline.fr,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: { "@type": "Country", name: "Morocco" },
    knowsAbout: [
      "Transport amont", "Transit et douane", "Entreposage", "Distribution",
      "Freight forwarding", "Logistique 3PL", "Supply chain Maroc",
    ],
    hasCredential: SITE.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: c,
    })),
  };
}

export function transportServiceJsonLd(locale: Locale, dict: Dict) {
  const url = `${SITE.url}${ROUTES.transportAmont[locale]}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: locale === "fr" ? "Transport amont au Maroc" : "Upstream transport in Morocco",
    serviceType: locale === "fr"
      ? "Transport amont — enlèvement portuaire, aéroportuaire et frontalier"
      : "Upstream transport — port, airport and border pickup",
    description: dict.meta.transportAmont.description,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "Morocco" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      availableLanguage: ["fr", "en"],
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    url,
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
