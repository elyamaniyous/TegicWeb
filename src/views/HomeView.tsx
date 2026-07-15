import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { CountUp } from "@/components/CountUp";
import { Masthead, ServiceRows, CtaBand } from "@/components/Sections";
import { WorldNetwork } from "@/components/WorldNetwork";
import { HeroIntro, SplitHeading, ScrubScale, Magnetic } from "@/components/motion/Motion";
import { IconArrow, IconFlow, IconGps, IconShield, IconCargo } from "@/components/Icons";

const WHY_ICONS = [IconFlow, IconGps, IconShield, IconCargo];

export function HomeView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const h = dict.home;
  const quoteHref = ROUTES.quote[locale];

  const marquee = [...h.ticker, ...h.ticker];

  return (
    <Chrome locale={locale}>
      <JsonLd data={breadcrumbJsonLd([{ name: dict.nav.home, url: ROUTES.home[locale] }])} />

      {/* ============ HERO ============ */}
      <section className="hero">
        <HeroIntro>
          <div className="hero__media" aria-hidden="true">
            <Photo slot={MEDIA.fleet} locale={locale} eager />
          </div>
          <div className="hero__scrim" aria-hidden="true" />

          <div className="hero__top" data-hero-el>
            <span>Tegic Logistique — {dict.common.since}</span>
            <span style={{ textAlign: "right" }}>{h.eyebrow}</span>
          </div>

          <div className="container hero__bottom">
            <SplitHeading as="h1" className="h1 hero__title">
              {h.h1}
            </SplitHeading>
            <div className="hero__row">
              <p className="hero__sub" data-hero-el>{h.sub}</p>
              <div className="hero__ctas" data-hero-el>
                <Magnetic>
                  <Link href={quoteHref} className="btn btn--green btn--lg">
                    <span>{dict.common.quoteCta}</span> <span className="arr"><IconArrow /></span>
                  </Link>
                </Magnetic>
                <Link href={ROUTES.services[locale]} className="btn btn--ghost btn--lg">
                  {dict.common.allServices}
                </Link>
              </div>
            </div>
            <div className="hero__stats" data-hero-el>
              {h.heroStats.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat__value"><CountUp value={s.value} /></span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <span className="scrollcue" aria-hidden data-hero-el>SCROLL</span>
        </HeroIntro>
      </section>

      {/* ============ STATEMENT ÉDITORIAL ============ */}
      <section className="section section--paper">
        <div className="container edito">
          <span className="edito__label">(01) — {h.integratedTitle}</span>
          <div style={{ display: "grid", gap: "2rem", justifyItems: "start" }}>
            <SplitHeading as="p" className="statement">
              {h.integratedText}
            </SplitHeading>
            <Link href={ROUTES.why[locale]} className="tlink">
              {dict.nav.why} <span className="arr"><IconArrow /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SERVICES — LISTE ÉDITORIALE ============ */}
      <section className="section section--paper" style={{ paddingTop: 0 }}>
        <div className="container">
          <Masthead no="02" title={h.servicesTitle} meta={`${dict.nav.services} — 05`} />
          <ServiceRows locale={locale} dict={dict} />
        </div>
      </section>

      {/* ============ GRANDE MARQUEE ============ */}
      <div className="bigmarquee" aria-hidden="true">
        <div className="bigmarquee__track" style={{ animation: "marquee 46s linear infinite" }}>
          {marquee.map((it, i) => (
            <span key={`${it}-${i}`} className="bigmarquee__item">
              {i % 2 === 0 ? it : <b>{it}</b>}
            </span>
          ))}
        </div>
      </div>

      {/* ============ FLOTTE — MOMENT SOMBRE ============ */}
      <section className="section section--dark">
        <div className="container">
          <div className="edito" style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
            <span className="edito__label" style={{ color: "var(--g300)" }}>(03) — {dict.common.ownFleet}</span>
            <div>
              <ScrubScale>
                <span className="fleet-num" aria-hidden="true">240</span>
              </ScrubScale>
              <SplitHeading as="h2" className="h2" >
                {h.fleetTitle}
              </SplitHeading>
              <p className="lead" data-reveal style={{ color: "var(--muted)", marginTop: "1rem" }}>{h.fleetText}</p>
            </div>
          </div>

          <div className="statgrid" data-reveal>
            {dict.ta.fleet.stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat__value"><CountUp value={s.value} /></span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="media media--169" data-parallax data-reveal style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
            <Photo slot={MEDIA.distribution} locale={locale} />
            <div className="media__scrim" aria-hidden />
            <span className="media__tag">{dict.common.ownFleet} · Casablanca</span>
          </div>

          <div style={{ marginTop: "2rem" }} data-reveal>
            <Link href={ROUTES.transportAmont[locale]} className="tlink" style={{ color: "var(--txt)" }}>
              {dict.services.transportAmont.title} <span className="arr"><IconArrow /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ RÉSEAU MONDIAL ============ */}
      <section className="section section--dark" style={{ paddingTop: 0 }}>
        <div className="container">
          <Masthead no="04" title={dict.network.title} lead={dict.network.text} />
          <div data-reveal>
            <WorldNetwork dict={dict.network} />
          </div>
        </div>
      </section>

      {/* ============ POURQUOI ============ */}
      <section className="section section--paper">
        <div className="container">
          <Masthead no="05" title={h.whyTitle} meta="Tegic — 3PL" />
          <div className="pillars">
            {dict.why.pillars.map((p, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <article key={p.title} className="pillar" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
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

      {/* ============ SECTEURS — RAIL ============ */}
      <section className="section section--paper2 section--flush" style={{ paddingBlock: "var(--pad-section)" }}>
        <div className="container">
          <Masthead no="06" title={h.sectorsTitle} lead={h.sectorsText} />
        </div>
        <div className="rail">
          {dict.sectors.items.map((s, i) => (
            <article key={s.title} className="railcard" data-reveal style={{ ["--d" as string]: `${i * 0.05}s` }}>
              <span className="railcard__no">{String(i + 1).padStart(2, "0")}</span>
              <div style={{ display: "grid", gap: "0.6rem" }}>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="container" data-reveal>
          <Link href={ROUTES.sectors[locale]} className="tlink">
            {dict.nav.sectors} <span className="arr"><IconArrow /></span>
          </Link>
        </div>
      </section>

      {/* ============ ÉQUIPE / PREUVE ============ */}
      <section className="section section--paper">
        <div className="container photoduo">
          <div className="media media--tall media--frame" data-parallax data-reveal>
            <Photo slot={MEDIA.team} locale={locale} />
            <div className="media__scrim" aria-hidden />
            <span className="media__tag">Tegic · Casablanca</span>
          </div>
          <div className="media media--43 media--frame" data-parallax data-reveal>
            <Photo slot={MEDIA.hq} locale={locale} />
            <div className="media__scrim" aria-hidden />
            <span className="media__tag">{dict.about.hqTitle}</span>
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
