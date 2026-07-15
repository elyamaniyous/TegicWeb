import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import { SITE, type Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { SectionHead } from "@/components/Sections";
import { IconArrow } from "@/components/Icons";

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const c = dict.contact;

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.contact, url: ROUTES.contact[locale] },
        ])}
      />

      <section className="section section--deep" style={{ paddingTop: "calc(76px + var(--pad-section))" }}>
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <SectionHead eyebrow={c.eyebrow} title={c.h1} lead={c.intro} />

            <div style={{ display: "grid", gap: "1.1rem", maxWidth: "460px" }}>
              <div className="flow__row" data-reveal>
                <span className="flow__label">{c.addressTitle}</span>
                <address className="ftr__addr">
                  <strong style={{ color: "var(--txt)" }}>{SITE.name}</strong>
                  <br />
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.country}
                </address>
              </div>
              <div className="flow__row" data-reveal>
                <span className="flow__label">{c.emailTitle}</span>
                <a href={`mailto:${SITE.email}`} style={{ color: "var(--g300)", fontSize: "1.05rem", fontWeight: 600 }}>
                  {SITE.email}
                </a>
              </div>
              <div className="flow__row" data-reveal>
                <span className="flow__label">{c.careersTitle}</span>
                <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
                  {c.careersText}{" "}
                  <a href={`mailto:${SITE.email}`} style={{ color: "var(--g300)" }}>{SITE.email}</a>
                </p>
              </div>
              <p className="mono" style={{ color: "var(--g300)" }} data-reveal>◆ {c.hoursNote}</p>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1.2rem" }}>
            <div className="media media--169" data-reveal>
              <Photo slot={MEDIA.hq} locale={locale} eager />
              <div className="media__scrim" aria-hidden />
              <span className="media__tag">{SITE.address.city} · {SITE.address.country}</span>
            </div>
            <div className="narr" data-reveal style={{ gridTemplateColumns: "1fr" }}>
              <div style={{ display: "grid", gap: "0.8rem", justifyItems: "start" }}>
                <h2 className="h3" style={{ color: "#fff" }}>{c.quoteTitle}</h2>
                <p style={{ color: "var(--muted)" }}>{c.quoteText}</p>
                <Link href={ROUTES.quote[locale]} className="btn btn--primary">
                  {dict.common.quoteCta} <span className="arr"><IconArrow /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Chrome>
  );
}
