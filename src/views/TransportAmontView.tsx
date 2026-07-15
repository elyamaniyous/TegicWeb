import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, faqJsonLd, transportServiceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { Rings } from "@/components/Rings";
import { CountUp } from "@/components/CountUp";
import { MoroccoRoute } from "@/components/MoroccoRoute";
import { TrackingConsole } from "@/components/TrackingConsole";
import { SectionHead, CtaBand, FaqList, ServiceCards, FleetBars, FlowCompare, Ticker } from "@/components/Sections";
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
        <div className="hero__media" aria-hidden="true">
          <Photo slot={MEDIA.heroTransport} locale={locale} eager />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <Rings className="hero__rings rings-svg" cx="86%" cy="18%" />

        <div className="container hero__grid">
          <div className="hero__content">
            <span className="badge" data-reveal>
              <span className="dot" aria-hidden />
              {ta.badge}
            </span>
            <h1 className="h1 hero__title" data-reveal style={{ ["--d" as string]: "0.08s" }}>
              {ta.h1}
            </h1>
            <p className="hero__sub" data-reveal style={{ ["--d" as string]: "0.16s" }}>
              {ta.sub}
            </p>
            <div className="hero__ctas" data-reveal style={{ ["--d" as string]: "0.24s" }}>
              <Link href={quoteHref} className="btn btn--primary btn--lg">
                {dict.common.quoteTransportCta} <span className="arr"><IconArrow /></span>
              </Link>
              <Link href={contactHref} className="btn btn--ghost btn--lg">
                {dict.common.expertCta}
              </Link>
            </div>
          </div>

          <div className="hero__stats" data-reveal style={{ ["--d" as string]: "0.32s" }}>
            {ta.heroStats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat__value"><CountUp value={s.value} /></span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* carte Maroc subtile, grands écrans */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "clamp(1rem, 4vw, 4rem)",
            top: "110px",
            bottom: "180px",
            width: "min(30vw, 340px)",
            opacity: 0.85,
            pointerEvents: "none",
          }}
          className="hero-map-wrap"
        >
          <MoroccoRoute
            from={ta.heroRoute.from}
            to={ta.heroRoute.to}
            status={ta.heroRoute.status}
            className="hero-map"
          />
        </div>
      </section>

      <Ticker items={dict.home.ticker} />

      {/* ============ ANSWER-FIRST (GEO) ============ */}
      <section className="section section--dark" style={{ paddingBlock: "clamp(2.6rem, 5vw, 4rem)" }}>
        <div className="container">
          <div
            data-reveal
            style={{
              border: "1px solid var(--line)",
              borderLeft: "3px solid var(--g400)",
              borderRadius: "var(--r-md)",
              padding: "clamp(1.3rem, 3vw, 2rem)",
              background: "var(--g900)",
              display: "grid",
              gap: "0.6rem",
            }}
          >
            <span className="mono" style={{ color: "var(--g300)" }}>{ta.essential.title}</span>
            <p style={{ maxWidth: "88ch", color: "var(--txt)", fontSize: "1.02rem" }}>{ta.essential.text}</p>
          </div>
        </div>
      </section>

      {/* ============ POINTS D'ENLÈVEMENT ============ */}
      <section className="section section--paper" id="enlevements">
        <div className="container">
          <SectionHead eyebrow="Transport amont" title={ta.pickup.title} lead={ta.pickup.text} />
          <div className="cards3">
            {ta.pickup.cards.map((card, i) => {
              const Icon = PICKUP_ICONS[i];
              return (
                <article key={card.title} className="pcard" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
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

      {/* ============ PROCESS ============ */}
      <section className="section section--deep" id="process">
        <div className="container">
          <SectionHead eyebrow="Process" title={ta.process.title} lead={ta.process.text} />
          <ol className="tl" data-reveal>
            {ta.process.steps.map((s, i) => (
              <li key={s.title} className="tl__step">
                <span className="tl__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tl__title">{s.title}</span>
                <span className="tl__detail">{s.detail}</span>
              </li>
            ))}
          </ol>

          <div className="narr" data-reveal style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
            <div style={{ display: "grid", gap: "1rem" }}>
              <span className="eyebrow">{ta.process.narrativeTitle}</span>
              <p className="lead" style={{ color: "var(--txt)" }}>{ta.process.narrativeText}</p>
            </div>
            <FlowCompare compare={ta.process.compare} />
          </div>
        </div>
      </section>

      {/* ============ FLOTTE ============ */}
      <section className="section section--dark" id="flotte">
        <div className="container">
          <div className="split" style={{ alignItems: "end", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <div>
              <span className="fleet-num" data-reveal aria-hidden="true">240</span>
              <SectionHead title={ta.fleet.title} lead={ta.fleet.text} />
            </div>
            <div className="media media--43" data-reveal>
              <Photo slot={MEDIA.fleet} locale={locale} />
              <div className="media__scrim" aria-hidden />
              <span className="media__tag">{dict.common.ownFleet} · Casablanca</span>
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

          <div className="split" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)", alignItems: "start" }}>
            <div>
              <h3 className="h3" style={{ marginBottom: "1.4rem" }} data-reveal>{ta.fleet.detailTitle}</h3>
              <FleetBars detail={ta.fleet.detail} />
            </div>
            <div className="rse" data-reveal>
              <IconLeafBolt className="icon" />
              <div style={{ display: "grid", gap: "0.6rem" }}>
                <h3 className="h3">{ta.fleet.rse.title}</h3>
                <p style={{ color: "var(--muted)" }}>{ta.fleet.rse.text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GPS ============ */}
      <section className="section section--deep" id="gps">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <SectionHead eyebrow="GPS · Tracking" title={ta.gps.title} lead={ta.gps.text} />
            <ol style={{ display: "grid", gap: "1.1rem" }}>
              {ta.gps.blocks.map((b, i) => (
                <li
                  key={b.title}
                  data-reveal
                  style={{
                    ["--d" as string]: `${i * 0.07}s`,
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1rem",
                    alignItems: "start",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-md)",
                    padding: "1.05rem 1.2rem",
                    background: "rgba(4,17,8,0.45)",
                  }}
                >
                  <span className="mono" style={{ color: "var(--g300)", paddingTop: "0.15rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ display: "grid", gap: "0.25rem" }}>
                    <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.02rem", color: "#fff" }}>{b.title}</strong>
                    <span style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{b.text}</span>
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
          <SectionHead eyebrow={dict.nav.why} title={ta.why.title} lead={ta.why.text} />
          <div className="pillars">
            {ta.why.blocks.map((b, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <article key={b.title} className="pillar" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
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
          <SectionHead eyebrow="FAQ" title={ta.faq.title} lead={ta.faq.text} />
          <FaqList items={ta.faq.items} />
        </div>
      </section>

      {/* ============ AUTRES SERVICES ============ */}
      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow={dict.nav.services} title={ta.others.title} lead={ta.others.text} />
          <ServiceCards locale={locale} dict={dict} exclude="transportAmont" goLabel={dict.common.learnMore} />
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
