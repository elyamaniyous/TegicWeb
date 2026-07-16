import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { Rings } from "@/components/Rings";
import { SectionHead, CtaBand } from "@/components/Sections";

export function SectorsView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const s = dict.sectors;

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.sectors, url: ROUTES.sectors[locale] },
        ])}
      />

      <section className="hero" style={{ minHeight: "min(72vh, 700px)" }}>
        <div className="hero__media" aria-hidden="true">
          <Photo slot={MEDIA.warehouse} locale={locale} eager />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(to bottom, rgba(4,17,8,0.55), rgba(4,17,8,0.15) 45%)" }} />
        <Rings className="hero__rings rings-svg" cx="85%" cy="20%" />
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow" data-reveal>{s.eyebrow}</span>
            <h1 className="h1 hero__title" data-reveal style={{ ["--d" as string]: "0.08s" }}>{s.h1}</h1>
            <p className="hero__sub" data-reveal style={{ ["--d" as string]: "0.16s" }}>{s.intro}</p>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="svc-grid grid-3">
            {s.items.map((item, i) => (
              <article key={item.title} className="svc svc--paper" data-reveal style={{ ["--d" as string]: `${i * 0.05}s` }}>
                <span className="mono" style={{ color: "var(--g600)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={s.ctaTitle}
        text={s.ctaText}
        primary={{ label: dict.common.quoteCta, href: ROUTES.quote[locale] }}
        secondary={{ label: dict.common.expertCta, href: ROUTES.contact[locale] }}
      />
    </Chrome>
  );
}
