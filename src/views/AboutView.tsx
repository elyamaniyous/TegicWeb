import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import { SITE, type Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { Rings } from "@/components/Rings";
import { SectionHead, CtaBand } from "@/components/Sections";
import { IconShield, IconGps, IconPort, IconCustoms } from "@/components/Icons";

const PILLAR_ICONS = [IconShield, IconPort, IconGps, IconCustoms];

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const a = dict.about;

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.about, url: ROUTES.about[locale] },
        ])}
      />

      {/* Hero éditorial */}
      <section className="hero" style={{ minHeight: "min(78vh, 760px)" }}>
        <div className="hero__media" aria-hidden="true">
          <Photo slot={MEDIA.hq} locale={locale} eager />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <Rings className="hero__rings rings-svg" cx="85%" cy="20%" />
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow" data-reveal>{a.eyebrow}</span>
            <h1 className="h1 hero__title" data-reveal style={{ ["--d" as string]: "0.08s" }}>{a.h1}</h1>
            <p className="hero__sub" data-reveal style={{ ["--d" as string]: "0.16s" }}>{a.intro}</p>
          </div>
        </div>
      </section>

      {/* Mission & modèle */}
      <section className="section section--paper">
        <div className="container split split--start">
          <div style={{ display: "grid", gap: "1rem" }} data-reveal>
            <span className="eyebrow">{a.missionTitle}</span>
            <p className="statement" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)" }}>{a.missionText}</p>
          </div>
          <div style={{ display: "grid", gap: "1rem" }} data-reveal>
            <span className="eyebrow">{a.modelTitle}</span>
            <p className="lead">{a.modelText}</p>
          </div>
        </div>
      </section>

      {/* Piliers */}
      <section className="section section--deep">
        <div className="container">
          <div className="pillars">
            {a.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <article key={p.title} className="pillar pillar--dark" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
                  <Icon className="icon" />
                  <span className="pillar__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Casablanca / HQ */}
      <section className="section section--paper">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Casablanca" title={a.hqTitle} lead={a.hqText} />
            <address className="ftr__addr" style={{ color: "var(--ink-soft)" }} data-reveal>
              <strong style={{ color: "var(--ink)" }}>{SITE.name}</strong>
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.country}
            </address>
            <div className="ftr__certs" data-reveal style={{ marginTop: "1.4rem" }}>
              {SITE.certifications.map((c) => (
                <span key={c} className="chip" style={{ color: "var(--ink-soft)", borderColor: "var(--line-ink)" }}>{c}</span>
              ))}
            </div>
            <p className="form__notice" data-reveal style={{ marginTop: "0.9rem" }}>{a.certText}</p>
          </div>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div className="media media--169" data-reveal>
              <Photo slot={MEDIA.dockLoading} locale={locale} />
              <div className="media__scrim" aria-hidden />
              <span className="media__tag">Casablanca · {dict.common.ownFleet}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Équipes */}
      <section className="section section--paper2">
        <div className="container split">
          <div className="media media--43" data-reveal>
            <Photo slot={MEDIA.team} locale={locale} />
            <div className="media__scrim" aria-hidden />
          </div>
          <div>
            <SectionHead eyebrow="Tegic" title={a.teamTitle} lead={a.teamText} />
          </div>
        </div>
      </section>

      <CtaBand
        title={a.cta.title}
        text={a.cta.text}
        primary={{ label: dict.common.quoteCta, href: ROUTES.quote[locale] }}
        secondary={{ label: dict.common.expertCta, href: ROUTES.contact[locale] }}
      />
    </Chrome>
  );
}
