import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import { SITE, type Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { Rings } from "@/components/Rings";
import { CountUp } from "@/components/CountUp";
import { SectionHead, CtaBand } from "@/components/Sections";
import { IconFlow, IconGps, IconShield, IconCargo, IconLeafBolt } from "@/components/Icons";

const WHY_ICONS = [IconFlow, IconGps, IconShield, IconCargo];

export function WhyView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const w = dict.why;

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.why, url: ROUTES.why[locale] },
        ])}
      />

      <section className="section section--deep" style={{ paddingTop: "calc(76px + var(--pad-section))" }}>
        <Rings className="hero__rings rings-svg" cx="88%" cy="10%" />
        <div className="container">
          <SectionHead eyebrow={w.eyebrow} title={w.h1} lead={w.intro} />
          <div className="pillars">
            {w.pillars.map((p, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <article key={p.title} className="pillar pillar--dark" data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
                  <Icon className="icon" />
                  <span className="pillar__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <p className="sub">{p.sub}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="section section--dark">
        <div className="container split" style={{ alignItems: "center" }}>
          <div>
            <SectionHead title={w.numbersTitle} />
            <div className="statgrid" data-reveal>
              {dict.ta.fleet.stats.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat__value"><CountUp value={s.value} /></span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="media media--43" data-reveal>
            <Photo slot={MEDIA.fleet} locale={locale} />
            <div className="media__scrim" aria-hidden />
            <span className="media__tag">{dict.common.ownFleet}</span>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section section--paper" id="certifications">
        <div className="container split" style={{ alignItems: "center" }}>
          <div>
            <SectionHead eyebrow="ISO · IATA" title={w.certTitle} lead={w.certText} />
            <div className="ftr__certs" data-reveal>
              {SITE.certifications.map((c) => (
                <span
                  key={c}
                  className="chip"
                  style={{ color: "var(--ink)", borderColor: "var(--line-ink)", fontSize: "0.9rem", padding: "0.8rem 1.3rem" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="rse" data-reveal style={{ background: "radial-gradient(500px 260px at 100% 0%, rgba(47,164,74,0.1), transparent 65%), var(--g900)" }}>
            <IconLeafBolt className="icon" />
            <div style={{ display: "grid", gap: "0.6rem" }}>
              <h3 className="h3" style={{ color: "#fff" }}>{w.rseTitle}</h3>
              <p style={{ color: "var(--muted)" }}>{w.rseText}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={dict.ta.finalCta.title}
        text={dict.ta.finalCta.text}
        primary={{ label: dict.common.quoteCta, href: ROUTES.quote[locale] }}
        secondary={{ label: dict.common.expertCta, href: ROUTES.contact[locale] }}
      />
    </Chrome>
  );
}
