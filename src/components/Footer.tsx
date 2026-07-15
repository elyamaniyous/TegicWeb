import Link from "next/link";
import { LogoLockup } from "./Logo";
import { ROUTES } from "@/lib/routes";
import { SITE, type Locale } from "@/lib/site";
import type { Dict } from "@/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: dict.services.transitDouane.title, href: ROUTES.transitDouane[locale] },
    { label: dict.services.freightForwarding.title, href: ROUTES.freightForwarding[locale] },
    { label: dict.services.transportAmont.title, href: ROUTES.transportAmont[locale] },
    { label: dict.services.entreposage.title, href: ROUTES.entreposage[locale] },
    { label: dict.services.distribution.title, href: ROUTES.distribution[locale] },
  ];

  return (
    <footer className="ftr">
      <svg viewBox="0 0 250 112" className="ftr__watermark" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round">
        <path d="M22 12 V64 a20 20 0 0 0 20 20" />
        <path d="M8 36 H42" />
        <circle cx="74" cy="61" r="23" />
        <path d="M52 57 H95" strokeWidth="14" />
        <circle cx="128" cy="61" r="23" />
        <path d="M151 42 V84 a19 19 0 0 1 -31 14" />
        <path d="M176 44 V84" />
        <circle cx="176" cy="18" r="9.5" fill="currentColor" stroke="none" />
        <path d="M236.5 46.5 a23 23 0 1 0 0 29" />
      </svg>
      <div className="container">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <Link href={ROUTES.home[locale]} aria-label="Tegic Logistique">
              <LogoLockup height={30} tagline />
            </Link>
            <p className="ftr__baseline">{f.baseline}</p>
            <div>
              <h4>{f.addressTitle}</h4>
              <address className="ftr__addr">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.country}
                <br />
                <a href={`mailto:${SITE.email}`} style={{ color: "var(--g300)" }}>{SITE.email}</a>
              </address>
            </div>
          </div>

          <div className="ftr__col">
            <h4>{f.servicesTitle}</h4>
            <ul>
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h4>{f.companyTitle}</h4>
            <ul>
              <li><Link href={ROUTES.about[locale]}>{f.companyLinks.about}</Link></li>
              <li><Link href={ROUTES.why[locale]}>{f.companyLinks.why}</Link></li>
              <li><Link href={ROUTES.sectors[locale]}>{f.companyLinks.sectors}</Link></li>
              <li><Link href={`${ROUTES.why[locale]}#certifications`}>{f.companyLinks.certifications}</Link></li>
              <li><Link href={ROUTES.contact[locale]}>{f.companyLinks.contact}</Link></li>
            </ul>
          </div>

          <div className="ftr__col">
            <h4>{f.ctaTitle}</h4>
            <ul>
              <li><Link href={ROUTES.quote[locale]}>→ {f.ctaQuote}</Link></li>
              <li><Link href={ROUTES.contact[locale]}>→ {f.ctaCall}</Link></li>
              <li><a href={`mailto:${SITE.email}`}>→ {f.ctaWrite}</a></li>
              <li>
                <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(locale === "fr" ? "Candidature — Rejoindre l'équipe Tegic" : "Application — Join the Tegic team")}`}>
                  → {f.ctaJoin}
                </a>
              </li>
            </ul>
            <h4 style={{ marginTop: "1.6rem" }}>{f.certifTitle}</h4>
            <div className="ftr__certs">
              {SITE.certifications.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="ftr__bottom">
          <span>© {year} {SITE.name}. {f.rights}</span>
          <span className="mono" style={{ letterSpacing: "0.2em", color: "var(--g700)" }}>
            {dict.common.since}
          </span>
        </div>
      </div>
    </footer>
  );
}
