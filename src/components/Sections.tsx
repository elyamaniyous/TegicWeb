import Link from "next/link";
import type { ReactNode } from "react";
import { Rings } from "./Rings";
import { Photo } from "./Photo";
import { Magnetic } from "./motion/Motion";
import { IconArrow, IconPlus, IconCustoms, IconWarehouse, IconDistribution, IconGlobe, IconTruck } from "./Icons";
import { ROUTES, type RouteKey } from "@/lib/routes";
import { MEDIA, type MediaKey } from "@/lib/media";
import type { Locale } from "@/lib/site";
import type { Dict } from "@/i18n";

/* ---------- Masthead éditorial (n° / titre / méta) ---------- */
export function Masthead({
  no,
  title,
  meta,
  lead,
}: {
  no?: string;
  title: string;
  meta?: string;
  lead?: string;
}) {
  return (
    <header className={`mast${lead ? " mast--lead" : ""}`}>
      <span className="mast__no">{no ? `(${no})` : ""}</span>
      <h2 className="h2" data-reveal>{title}</h2>
      {meta && !lead ? <span className="mast__meta">{meta}</span> : null}
      {lead ? <p className="lead" data-reveal style={{ ["--d" as string]: "0.1s" }}>{lead}</p> : null}
    </header>
  );
}

/* ---------- Liste services éditoriale avec aperçu photo ---------- */
const SERVICE_THUMBS: Record<string, MediaKey> = {
  transitDouane: "customsInspection",
  transportAmont: "heroTransport",
  entreposage: "warehouse",
  distribution: "distribution",
  freightForwarding: "portSunset",
};

export function ServiceRows({
  locale,
  dict,
  exclude,
}: {
  locale: Locale;
  dict: Dict;
  exclude?: RouteKey;
}) {
  const keys: RouteKey[] = ["transitDouane", "transportAmont", "entreposage", "distribution", "freightForwarding"];
  const shown = keys.filter((k) => k !== exclude);
  return (
    <div className="svclist">
      {shown.map((k, i) => {
        const s = dict.services[k as keyof Dict["services"]];
        return (
          <Link key={k} href={ROUTES[k][locale]} className="svcrow" data-reveal style={{ ["--d" as string]: `${i * 0.05}s` }}>
            <span className="svcrow__no">{String(i + 1).padStart(2, "0")}</span>
            <span className="svcrow__title">{s.title}</span>
            <span className="svcrow__desc">{s.desc}</span>
            <span className="svcrow__arr" aria-hidden><IconArrow /></span>
            <span className="svcrow__thumb" aria-hidden>
              <Photo slot={MEDIA[SERVICE_THUMBS[k]]} locale={locale} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ---------- En-tête de section ---------- */
export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`sec-head${center ? " sec-head--center" : ""}`}>
      {eyebrow ? <span className="eyebrow" data-reveal>{eyebrow}</span> : null}
      <h2 className="h2" data-reveal style={{ ["--d" as string]: "0.08s" }}>{title}</h2>
      {lead ? <p className="lead" data-reveal style={{ ["--d" as string]: "0.16s" }}>{lead}</p> : null}
    </div>
  );
}

/* ---------- Bandeau CTA ---------- */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section section--paper" aria-label={title}>
      <div className="container">
        <div className="cta-band on-dark" data-reveal>
          <Rings className="cta-band__rings rings-svg" cx="88%" cy="110%" />
          <h2 className="h2">{title}</h2>
          <p className="lead">{text}</p>
          <div className="hero__ctas">
            <Magnetic>
              <Link href={primary.href} className="btn btn--green btn--lg">
                <span>{primary.label}</span> <span className="arr"><IconArrow /></span>
              </Link>
            </Magnetic>
            {secondary ? (
              <Link href={secondary.href} className="btn btn--ghost btn--lg">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} data-reveal style={{ ["--d" as string]: `${i * 0.07}s` }}>
          <summary>
            {item.q}
            <span className="pm" aria-hidden><IconPlus /></span>
          </summary>
          <p className="faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Cartes services ---------- */
const SERVICE_ICONS: Record<string, ReactNode> = {
  transitDouane: <IconCustoms className="icon" />,
  transportAmont: <IconTruck className="icon" />,
  entreposage: <IconWarehouse className="icon" />,
  distribution: <IconDistribution className="icon" />,
  freightForwarding: <IconGlobe className="icon" />,
};

export function ServiceCards({
  locale,
  dict,
  exclude,
  paper = false,
  goLabel,
}: {
  locale: Locale;
  dict: Dict;
  exclude?: RouteKey;
  paper?: boolean;
  goLabel: string;
}) {
  const keys: RouteKey[] = ["transitDouane", "transportAmont", "entreposage", "distribution", "freightForwarding"];
  const shown = keys.filter((k) => k !== exclude);
  return (
    <div className="svc-grid">
      {shown.map((k, i) => {
        const s = dict.services[k as keyof Dict["services"]];
        return (
          <Link
            key={k}
            href={ROUTES[k][locale]}
            className={`svc${paper ? " svc--paper" : ""}`}
            data-reveal
            style={{ ["--d" as string]: `${i * 0.06}s` }}
          >
            {SERVICE_ICONS[k]}
            <h3 className="h3">{s.title}</h3>
            <p>{s.desc}</p>
            <span className="go">
              {goLabel} <span className="arr"><IconArrow /></span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ---------- Barres de flotte ---------- */
export function FleetBars({ detail }: { detail: readonly { count: number; label: string; usage: string }[] }) {
  const max = Math.max(...detail.map((d) => d.count));
  return (
    <div className="fleetbars" data-reveal>
      {detail.map((d) => (
        <div key={d.label} className="fbar">
          <div className="fbar__head">
            <span>
              <span className="fbar__count">{d.count}</span>{" "}
              <span className="fbar__label">{d.label}</span>
            </span>
            <span className="fbar__usage">{d.usage}</span>
          </div>
          <div className="fbar__track">
            <div className="fbar__fill" style={{ ["--w" as string]: `${Math.round((d.count / max) * 100)}` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Diagramme comparatif opérateur intégré ---------- */
export function FlowCompare({ compare }: { compare: Dict["ta"]["process"]["compare"] }) {
  return (
    <div className="flow">
      <div className="flow__row">
        <div className="flow__label">
          <span>{compare.fragmented}</span>
          <span className="flow__delay--bad">{compare.fragmentedDelay}</span>
        </div>
        <div className="flow__steps">
          {compare.fragmentedSteps.map((s, i) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span className={`flow__node${i === 1 || i === 2 ? " flow__node--wait" : ""}`}>{s}</span>
              {i < compare.fragmentedSteps.length - 1 ? <span className="flow__arrow" aria-hidden>→</span> : null}
            </span>
          ))}
        </div>
      </div>
      <div className="flow__row flow__row--tegic">
        <div className="flow__label">
          <span>{compare.integrated}</span>
          <span className="flow__delay--good">{compare.integratedDelay}</span>
        </div>
        <div className="flow__steps">
          {compare.integratedSteps.map((s, i) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="flow__node">{s}</span>
              {i < compare.integratedSteps.length - 1 ? <span className="flow__arrow" aria-hidden>→</span> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Ticker ---------- */
export function Ticker({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {row.map((it, i) => (
          <span key={`${it}-${i}`} className="ticker__item">{it}</span>
        ))}
      </div>
    </div>
  );
}
