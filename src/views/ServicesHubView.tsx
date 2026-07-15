import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { SectionHead, CtaBand, ServiceCards } from "@/components/Sections";
import { IconArrow } from "@/components/Icons";

export function ServicesHubView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const s = dict.servicesHub;

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.services, url: ROUTES.services[locale] },
        ])}
      />

      <section className="section section--deep" style={{ paddingTop: "calc(76px + var(--pad-section))" }}>
        <div className="container">
          <SectionHead eyebrow={s.eyebrow} title={s.h1} lead={s.intro} />

          <div className="svc-grid" style={{ marginBottom: "1.4rem" }}>
            <Link href={ROUTES.transportAmont[locale]} className="svc svc--featured" data-reveal>
              <div style={{ display: "grid", gap: "0.8rem", alignContent: "start" }}>
                <span className="mono" style={{ color: "var(--g300)" }}>{s.flagship}</span>
                <h2 className="h2" style={{ color: "#fff" }}>{dict.services.transportAmont.title}</h2>
                <p style={{ color: "var(--muted)", maxWidth: "48ch" }}>{dict.services.transportAmont.desc}</p>
                <span className="go">
                  {dict.common.learnMore} <span className="arr"><IconArrow /></span>
                </span>
              </div>
              <div className="media media--169">
                <Photo slot={MEDIA.heroTransport} locale={locale} eager />
                <div className="media__scrim" aria-hidden />
                <span className="media__tag">{dict.ta.badge}</span>
              </div>
            </Link>
          </div>

          <ServiceCards locale={locale} dict={dict} exclude="transportAmont" goLabel={dict.common.learnMore} />
        </div>
      </section>

      <CtaBand
        title={dict.home.ctaTitle}
        text={dict.home.ctaText}
        primary={{ label: dict.common.quoteCta, href: ROUTES.quote[locale] }}
        secondary={{ label: dict.common.expertCta, href: ROUTES.contact[locale] }}
      />
    </Chrome>
  );
}
