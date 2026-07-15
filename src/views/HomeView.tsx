import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { Rings } from "@/components/Rings";
import { CountUp } from "@/components/CountUp";
import { SectionHead, CtaBand, ServiceCards, Ticker } from "@/components/Sections";
import { IconArrow, IconTruck, IconFlow, IconGps, IconShield, IconCargo } from "@/components/Icons";

const WHY_ICONS = [IconFlow, IconGps, IconShield, IconCargo];

export function HomeView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const h = dict.home;
  const quoteHref = ROUTES.quote[locale];

  return (
    <Chrome locale={locale}>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: ROUTES.home[locale] }])} />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <Photo slot={MEDIA.fleet} locale={locale} eager />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <Rings className="hero__rings rings-svg" cx="82%" cy="24%" />

        <div className="container hero__grid">
          <div className="hero__content">
            <span className="badge" data-reveal>
              <span className="dot" aria-hidden />
              {h.eyebrow}
            </span>
            <h1 className="h1 hero__title" data-reveal style={{ ["--d" as string]: "0.08s" }}>
              {h.h1}
            </h1>
            <p className="hero__sub" data-reveal style={{ ["--d" as string]: "0.16s" }}>{h.sub}</p>
            <div className="hero__ctas" data-reveal style={{ ["--d" as string]: "0.24s" }}>
              <Link href={quoteHref} className="btn btn--primary btn--lg">
                {dict.common.quoteCta} <span className="arr"><IconArrow /></span>
              </Link>
              <Link href={ROUTES.services[locale]} className="btn btn--ghost btn--lg">
                {dict.common.allServices}
              </Link>
            </div>
          </div>

          <div className="hero__stats" data-reveal style={{ ["--d" as string]: "0.32s" }}>
            {h.heroStats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat__value"><CountUp value={s.value} /></span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker items={h.ticker} />

      {/* ============ SERVICES ============ */}
      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow={dict.nav.services} title={h.servicesTitle} lead={h.servicesText} />

          <div className="svc-grid" style={{ marginBottom: "1.4rem" }}>
            <Link href={ROUTES.transportAmont[locale]} className="svc svc--featured" data-reveal>
              <div style={{ display: "grid", gap: "0.8rem", alignContent: "start" }}>
                <span className="mono" style={{ color: "var(--g300)" }}>{dict.servicesHub.flagship}</span>
                <h3 className="h2" style={{ color: "#fff" }}>{dict.services.transportAmont.title}</h3>
                <p style={{ color: "var(--muted)", maxWidth: "48ch" }}>{dict.services.transportAmont.desc}</p>
                <span className="go" style={{ marginTop: "0.4rem" }}>
                  {dict.common.learnMore} <span className="arr"><IconArrow /></span>
                </span>
              </div>
              <div className="media media--169">
                <Photo slot={MEDIA.heroTransport} locale={locale} />
                <div className="media__scrim" aria-hidden />
                <span className="media__tag">{dict.ta.heroRoute.from} → {dict.ta.heroRoute.to}</span>
              </div>
            </Link>
          </div>

          <ServiceCards locale={locale} dict={dict} exclude="transportAmont" goLabel={dict.common.learnMore} />
        </div>
      </section>

      {/* ============ OPÉRATEUR INTÉGRÉ ============ */}
      <section className="section section--deep">
        <div className="container split">
          <div className="media media--43" data-reveal>
            <Photo slot={MEDIA.team} locale={locale} />
            <div className="media__scrim" aria-hidden />
            <span className="media__tag">Tegic · Casablanca</span>
          </div>
          <div>
            <SectionHead eyebrow="Tegic" title={h.integratedTitle} lead={h.integratedText} />
            <div className="hero__ctas">
              <Link href={ROUTES.why[locale]} className="btn btn--ghost">
                {dict.nav.why} <span className="arr"><IconArrow /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLOTTE ============ */}
      <section className="section section--dark">
        <div className="container">
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <SectionHead eyebrow={dict.common.ownFleet} title={h.fleetTitle} lead={h.fleetText} />
              <div className="statgrid" data-reveal>
                {dict.ta.fleet.stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="stat">
                    <span className="stat__value"><CountUp value={s.value} /></span>
                    <span className="stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="media media--43" data-reveal>
              <Photo slot={MEDIA.distribution} locale={locale} />
              <div className="media__scrim" aria-hidden />
              <span className="media__tag"><IconTruck width={14} height={14} style={{ display: "inline" }} /> {dict.common.ownFleet}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POURQUOI ============ */}
      <section className="section section--paper">
        <div className="container">
          <SectionHead eyebrow={dict.nav.why} title={h.whyTitle} />
          <div className="pillars">
            {dict.why.pillars.map((p, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <article key={p.title} className="pillar" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
                  <Icon className="icon" />
                  <span className="pillar__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p className="sub">{p.sub}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SECTEURS ============ */}
      <section className="section section--paper2">
        <div className="container">
          <SectionHead eyebrow={dict.nav.sectors} title={h.sectorsTitle} lead={h.sectorsText} />
          <div className="svc-grid">
            {dict.sectors.items.slice(0, 6).map((s, i) => (
              <article key={s.title} className="svc svc--paper" data-reveal style={{ ["--d" as string]: `${i * 0.05}s` }}>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "1.8rem" }} data-reveal>
            <Link href={ROUTES.sectors[locale]} className="btn btn--ghost on-paper">
              {dict.nav.sectors} <span className="arr"><IconArrow /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CtaBand
        title={h.ctaTitle}
        text={h.ctaText}
        primary={{ label: dict.common.quoteCta, href: quoteHref }}
        secondary={{ label: dict.common.expertCta, href: ROUTES.contact[locale] }}
      />
    </Chrome>
  );
}
