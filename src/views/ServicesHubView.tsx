import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { CountUp } from "@/components/CountUp";
import { Masthead, CtaBand, ServiceRows } from "@/components/Sections";
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
          <div className="sec-head">
            <span className="eyebrow" data-reveal>{s.eyebrow}</span>
            <h1 className="h1" data-reveal style={{ ["--d" as string]: "0.08s" }}>{s.h1}</h1>
            <p className="lead" data-reveal style={{ ["--d" as string]: "0.16s" }}>{s.intro}</p>
          </div>

          <div className="svc-grid">
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

          <div className="statgrid" data-reveal style={{ marginTop: "1.4rem" }}>
            {dict.ta.fleet.stats.map((st) => (
              <div key={st.label} className="stat">
                <span className="stat__value"><CountUp value={st.value} /></span>
                <span className="stat__label">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liste éditoriale complète */}
      <section className="section section--paper">
        <div className="container">
          <ServiceRows locale={locale} dict={dict} exclude="transportAmont" />
        </div>
      </section>

      {/* Comment on démarre */}
      <section className="section section--paper2">
        <div className="container">
          <Masthead title={s.start.title} meta="Tegic — 3PL" />
          <div className="cards3">
            {s.start.steps.map((step, i) => (
              <article key={step.title} className="pcard" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
                <span className="proc__no" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={s.cta.title}
        text={s.cta.text}
        primary={{ label: dict.common.quoteCta, href: ROUTES.quote[locale] }}
        secondary={{ label: dict.common.expertCta, href: ROUTES.contact[locale] }}
      />
    </Chrome>
  );
}
