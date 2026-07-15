import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, faqJsonLd, transportServiceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { CountUp } from "@/components/CountUp";
import { TrackingConsole } from "@/components/TrackingConsole";
import { Masthead, CtaBand, FaqList, ServiceRows, FleetBars, FlowCompare } from "@/components/Sections";
import { HeroIntro, SplitHeading, PinnedProcess, ScrubScale, Magnetic } from "@/components/motion/Motion";
import { IconPort, IconAir, IconBorder, IconArrow, IconLeafBolt, IconFlow, IconGps, IconShield, IconCargo } from "@/components/Icons";

const PICKUP_ICONS = [IconPort, IconAir, IconBorder];
const WHY_ICONS = [IconFlow, IconGps, IconShield, IconCargo];

export function TransportAmontView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const ta = dict.ta;
  const quoteHref = ROUTES.quote[locale];
  const contactHref = ROUTES.contact[locale];

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={[
          transportServiceJsonLd(locale, dict),
          faqJsonLd(ta.faq.items),
          breadcrumbJsonLd([
            { name: dict.nav.home, url: ROUTES.home[locale] },
            { name: dict.nav.services, url: ROUTES.services[locale] },
            { name: dict.services.transportAmont.title, url: ROUTES.transportAmont[locale] },
          ]),
        ]}
      />

      {/* ============ HERO CINÉMATIQUE ============ */}
      <section className="hero">
        <HeroIntro>
          <div className="hero__media" aria-hidden="true">
            <Photo slot={MEDIA.heroTransport} locale={locale} eager />
          </div>
          <div className="hero__scrim" aria-hidden="true" />

          <div className="hero__top" data-hero-el>
            <span>{dict.nav.services} — {dict.services.transportAmont.title}</span>
            <span style={{ textAlign: "right" }}>{ta.heroRoute.from} → {ta.heroRoute.to}</span>
          </div>

          <div className="container hero__bottom">
            <span className="badge" data-hero-el>
              <span className="dot" aria-hidden />
              {ta.badge}
            </span>
            <SplitHeading as="h1" className="h1 hero__title hero__title--long">
              {ta.h1}
            </SplitHeading>
            <div className="hero__row">
              <p className="hero__sub" data-hero-el>{ta.sub}</p>
              <div className="hero__ctas" data-hero-el>
                <Magnetic>
                  <Link href={quoteHref} className="btn btn--green btn--lg">
                    <span>{dict.common.quoteTransportCta}</span> <span className="arr"><IconArrow /></span>
                  </Link>
                </Magnetic>
                <Link href={contactHref} className="btn btn--ghost btn--lg">
                  {dict.common.expertCta}
                </Link>
              </div>
            </div>
            <div className="hero__stats" data-hero-el>
              {ta.heroStats.map((s) => (
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

      {/* ============ L'ESSENTIEL (answer-first / GEO) ============ */}
      <section className="section section--paper">
        <div className="container edito">
          <span className="edito__label">{ta.essential.title}</span>
          <SplitHeading as="p" className="statement">
            {ta.essential.text}
          </SplitHeading>
        </div>
      </section>

      {/* ============ POINTS D'ENLÈVEMENT ============ */}
      <section className="section section--paper2" id="enlevements">
        <div className="container">
          <Masthead no="01" title={ta.pickup.title} lead={ta.pickup.text} />
          <div className="cards3">
            {ta.pickup.cards.map((card, i) => {
              const Icon = PICKUP_ICONS[i];
              return (
                <article key={card.title} className="pcard" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
                  <Icon className="icon" />
                  <span className="kicker">{card.kicker}</span>
                  <h3 className="h3">{card.title}</h3>
                  <p>{card.text}</p>
                  <ul className="ticks">
                    {card.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESS — ÉPINGLÉ HORIZONTAL ============ */}
      <section className="section section--paper section--flush" id="process" style={{ paddingBlock: "var(--pad-section)" }}>
        <div className="only-desktop">
          <PinnedProcess>
            <div style={{ minHeight: "100svh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem", paddingBlock: "5rem", overflow: "clip" }}>
              <div className="container">
                <Masthead no="02" title={ta.process.title} lead={ta.process.text} />
              </div>
              <div className="proc">
                <div className="proc__bar"><i /><span className="truckdot" aria-hidden /></div>
                <div className="proc__track">
                  {ta.process.steps.map((s, i) => (
                    <div key={s.title} className={`proc__step${i === ta.process.steps.length - 1 ? " proc__step--last" : ""}`}>
                      <span className="proc__no">{String(i + 1).padStart(2, "0")}</span>
                      <span className="proc__title">{s.title}</span>
                      <span className="proc__detail">{s.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PinnedProcess>
        </div>

        {/* fallback vertical mobile */}
        <div className="container only-mobile">
          <Masthead no="02" title={ta.process.title} lead={ta.process.text} />
          <ol className="tl">
            {ta.process.steps.map((s, i) => (
              <li key={s.title} className="tl__step">
                <span className="tl__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tl__title">{s.title}</span>
                <span className="tl__detail">{s.detail}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="container" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <div className="narr" data-reveal>
            <div style={{ display: "grid", gap: "1rem" }}>
              <span className="eyebrow">{ta.process.narrativeTitle}</span>
              <p className="lead" style={{ color: "var(--txt)" }}>{ta.process.narrativeText}</p>
            </div>
            <FlowCompare compare={ta.process.compare} />
          </div>
        </div>
      </section>

      {/* ============ FLOTTE — MOMENT SOMBRE ============ */}
      <section className="section section--dark" id="flotte">
        <div className="container">
          <ScrubScale>
            <span className="fleet-num" aria-hidden="true">240</span>
          </ScrubScale>
          <div className="edito" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <span className="edito__label" style={{ color: "var(--g300)" }}>(03) — {dict.common.ownFleet}</span>
            <div>
              <SplitHeading as="h2" className="h2">{ta.fleet.title}</SplitHeading>
              <p className="lead" data-reveal style={{ color: "var(--muted)", marginTop: "1rem" }}>{ta.fleet.text}</p>
            </div>
          </div>

          <div className="statgrid" data-reveal>
            {ta.fleet.stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat__value"><CountUp value={s.value} /></span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="split split--start" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
            <div>
              <h3 className="h3" style={{ marginBottom: "1.4rem", color: "#fff" }} data-reveal>{ta.fleet.detailTitle}</h3>
              <FleetBars detail={ta.fleet.detail} />
            </div>
            <div style={{ display: "grid", gap: "1.2rem" }}>
              <div className="media media--169" data-parallax data-reveal>
                <Photo slot={MEDIA.fleet} locale={locale} />
                <div className="media__scrim" aria-hidden />
                <span className="media__tag">{dict.common.ownFleet} · Casablanca</span>
              </div>
              <div className="rse" data-reveal>
                <IconLeafBolt className="icon" />
                <div style={{ display: "grid", gap: "0.6rem" }}>
                  <h3 className="h3" style={{ color: "#fff" }}>{ta.fleet.rse.title}</h3>
                  <p>{ta.fleet.rse.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GPS ============ */}
      <section className="section section--deep" id="gps">
        <div className="container split split--start">
          <div>
            <Masthead no="04" title={ta.gps.title} lead={ta.gps.text} />
            <ol style={{ display: "grid", gap: "1rem" }}>
              {ta.gps.blocks.map((b, i) => (
                <li key={b.title} className="gpsblock" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
                  <span className="no">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{b.title}</strong>
                    <span className="txt">{b.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <TrackingConsole dict={dict} live={dict.common.live} />
        </div>
      </section>

      {/* ============ POURQUOI TEGIC ============ */}
      <section className="section section--paper" id="pourquoi">
        <div className="container">
          <Masthead no="05" title={ta.why.title} lead={ta.why.text} />
          <div className="pillars">
            {ta.why.blocks.map((b, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <article key={b.title} className="pillar" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
                  <Icon className="icon" />
                  <span className="pillar__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{b.title}</h3>
                  <p className="sub">{b.sub}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section section--paper2" id="faq">
        <div className="container">
          <Masthead no="06" title={ta.faq.title} lead={ta.faq.text} />
          <FaqList items={ta.faq.items} />
        </div>
      </section>

      {/* ============ AUTRES SERVICES ============ */}
      <section className="section section--paper">
        <div className="container">
          <Masthead no="07" title={ta.others.title} lead={ta.others.text} />
          <ServiceRows locale={locale} dict={dict} exclude="transportAmont" />
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <CtaBand
        title={ta.finalCta.title}
        text={ta.finalCta.text}
        primary={{ label: dict.common.quoteTransportCta, href: quoteHref }}
        secondary={{ label: dict.common.expertCta, href: contactHref }}
      />
    </Chrome>
  );
}
