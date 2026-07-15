import Link from "next/link";
import { getDict } from "@/i18n";
import { ROUTES, type RouteKey } from "@/lib/routes";
import { MEDIA, type MediaKey } from "@/lib/media";
import type { Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { Rings } from "@/components/Rings";
import { SectionHead, CtaBand, ServiceCards } from "@/components/Sections";
import { IconArrow } from "@/components/Icons";

type LightKey = "transitDouane" | "entreposage" | "distribution" | "freightForwarding";

const MEDIA_BY_SERVICE: Record<LightKey, MediaKey> = {
  transitDouane: "dockLoading",
  entreposage: "warehouse",
  distribution: "distribution",
  freightForwarding: "heroTransport",
};

export function ServiceLightView({ locale, service }: { locale: Locale; service: LightKey }) {
  const dict = getDict(locale);
  const s = dict[service];
  const media = MEDIA[MEDIA_BY_SERVICE[service]];

  return (
    <Chrome locale={locale}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.services, url: ROUTES.services[locale] },
          { name: dict.services[service].title, url: ROUTES[service as RouteKey][locale] },
        ])}
      />

      <section className="hero" style={{ minHeight: "min(74vh, 720px)" }}>
        <div className="hero__media" aria-hidden="true">
          <Photo slot={media} locale={locale} eager />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <Rings className="hero__rings rings-svg" cx="85%" cy="20%" />
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow" data-reveal>{s.eyebrow}</span>
            <h1 className="h1 hero__title" data-reveal style={{ ["--d" as string]: "0.08s" }}>{s.h1}</h1>
            <p className="hero__sub" data-reveal style={{ ["--d" as string]: "0.16s" }}>{s.intro}</p>
            <div className="hero__ctas" data-reveal style={{ ["--d" as string]: "0.24s" }}>
              <Link href={ROUTES.quote[locale]} className="btn btn--primary btn--lg">
                {dict.common.quoteCta} <span className="arr"><IconArrow /></span>
              </Link>
              <Link href={ROUTES.contact[locale]} className="btn btn--ghost btn--lg">
                {dict.common.expertCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <SectionHead title={dict.serviceCommon.pointsTitle} />
            <ul className="ticks" style={{ maxWidth: "56ch" }} data-reveal>
              {s.points.map((p) => (
                <li key={p} style={{ fontSize: "1.02rem" }}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="media media--43" data-reveal>
            <Photo slot={media} locale={locale} />
            <div className="media__scrim" aria-hidden />
            <span className="media__tag">Tegic · {dict.services[service].title}</span>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow={dict.nav.services} title={dict.serviceCommon.crossTitle} lead={dict.serviceCommon.crossText} />
          <ServiceCards locale={locale} dict={dict} exclude={service as RouteKey} goLabel={dict.common.learnMore} />
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
