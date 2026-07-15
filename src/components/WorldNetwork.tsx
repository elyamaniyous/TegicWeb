"use client";

/**
 * Réseau logistique mondial — carte animée construite en code
 * (remplace l'infographie statique : labels nets et traduits,
 * données modifiables ci-dessous, arcs dessinés au scroll).
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/i18n";
import { WORLD_LAND_PATH, MOROCCO_PATH } from "./worldland";

gsap.registerPlugin(ScrollTrigger);

/* Projection équirectangulaire simple sur viewBox 1000×500 */
const P = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

const CASA = P(-7.6, 33.6);

type CityKey = keyof Dict["network"]["cities"];
type Route = { key: CityKey; lon: number; lat: number; type: "sea" | "air"; anchor?: "start" | "end"; dy?: number };

/** Destinations — modifiables librement (lon, lat, type de flux). */
const ROUTES: Route[] = [
  { key: "newYork", lon: -74.0, lat: 40.7, type: "sea", anchor: "end", dy: -10 },
  { key: "rotterdam", lon: 4.5, lat: 51.9, type: "sea", anchor: "start", dy: -12 },
  { key: "algeciras", lon: -5.45, lat: 36.1, type: "sea", anchor: "start", dy: 5 },
  { key: "jebelAli", lon: 55.0, lat: 25.0, type: "air", anchor: "start", dy: -10 },
  { key: "shanghai", lon: 121.5, lat: 31.2, type: "air", anchor: "start", dy: -10 },
  { key: "singapore", lon: 103.8, lat: 1.35, type: "sea", anchor: "start", dy: 18 },
];

/** Arc entre Casablanca et une destination (contrôle relevé = effet orthodromie). */
function arcPath(to: { x: number; y: number }) {
  const dx = to.x - CASA.x;
  const dy = to.y - CASA.y;
  const dist = Math.hypot(dx, dy);
  const mx = (CASA.x + to.x) / 2;
  const my = (CASA.y + to.y) / 2 - Math.min(dist * 0.28, 90);
  return `M ${CASA.x.toFixed(1)} ${CASA.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

/* Le fond de carte provient de Natural Earth (voir ./worldland.ts) */

export function WorldNetwork({ dict }: { dict: Dict["network"] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<SVGPathElement>(".net-sea").forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }
    const ctx = gsap.context(() => {
      const seas = el.querySelectorAll<SVGPathElement>(".net-sea");
      seas.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
        defaults: { ease: "power2.inOut" },
      });
      tl.to(seas, { strokeDashoffset: 0, duration: 1.6, stagger: 0.14 }, 0)
        .fromTo(
          el.querySelectorAll(".net-air"),
          { opacity: 0 },
          { opacity: 1, duration: 0.9, stagger: 0.14 },
          0.5
        )
        .fromTo(
          el.querySelectorAll(".net-label, .net-dot"),
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
          0.6
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="network" ref={ref}>
      <div className="network__scroll">
        <svg viewBox="0 28 1000 372" className="network__map" role="img" aria-label={dict.title}>
          <defs>
            <radialGradient id="maGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#7fe08f" stopOpacity="0.4" />
              <stop offset="1" stopColor="#7fe08f" stopOpacity="0" />
            </radialGradient>
            <pattern id="landDots" width="7" height="7" patternUnits="userSpaceOnUse">
              <circle cx="3.5" cy="3.5" r="1.05" fill="#4fc063" />
            </pattern>
            <mask id="landMask">
              <path d={WORLD_LAND_PATH} fill="#fff" />
            </mask>
            <filter id="maBlur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* graticule */}
          <g stroke="rgba(127,224,143,0.05)" strokeWidth="1">
            {[100, 200, 300, 400].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} />
            ))}
            {[125, 250, 375, 500, 625, 750, 875].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" />
            ))}
          </g>

          {/* continents — trait de côte réel (Natural Earth) */}
          <path d={WORLD_LAND_PATH} fill="#0e2b1a" stroke="rgba(127,224,143,0.14)" strokeWidth="0.7" strokeLinejoin="round" />
          <rect x="0" y="0" width="1000" height="500" fill="url(#landDots)" mask="url(#landMask)" opacity="0.22" />

          {/* Maroc — silhouette complète, surlignée */}
          <path d={MOROCCO_PATH} fill="var(--g500)" opacity="0.55" filter="url(#maBlur)" />
          <path d={MOROCCO_PATH} fill="var(--g500)" fillOpacity="0.92" stroke="var(--g300)" strokeWidth="0.8" strokeLinejoin="round" />
          <circle cx={CASA.x} cy={CASA.y} r="55" fill="url(#maGlow)" />

          {/* routes */}
          <g fill="none" strokeLinecap="round">
            {ROUTES.map((r) => {
              const to = P(r.lon, r.lat);
              return r.type === "sea" ? (
                <path key={r.key} d={arcPath(to)} className="net-sea" stroke="var(--g400)" strokeWidth="1.8" strokeOpacity="0.85" />
              ) : (
                <path key={r.key} d={arcPath(to)} className="net-air net-air--dash" stroke="var(--g300)" strokeWidth="1.7" strokeOpacity="0.9" />
              );
            })}
          </g>

          {/* points voyageurs */}
          {ROUTES.map((r, i) => {
            const to = P(r.lon, r.lat);
            return (
              <circle key={`dot-${r.key}`} r="2.6" fill="var(--g200)" className="net-dot">
                <animateMotion dur={`${5 + i * 0.9}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={arcPath(to)} />
              </circle>
            );
          })}

          {/* nœuds destinations + labels */}
          {ROUTES.map((r) => {
            const to = P(r.lon, r.lat);
            const anchor = r.anchor ?? "start";
            const tx = anchor === "start" ? to.x + 12 : to.x - 12;
            return (
              <g key={`n-${r.key}`}>
                <circle cx={to.x} cy={to.y} r="4" fill="var(--g950)" stroke="var(--g300)" strokeWidth="1.8" className="net-dot" />
                <text
                  x={tx}
                  y={to.y + (r.dy ?? -10)}
                  className="net-label"
                  textAnchor={anchor}
                  fill="#eef5ee"
                  fontSize="16"
                  fontWeight="600"
                  letterSpacing="1.5"
                  style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
                >
                  {dict.cities[r.key]}
                </text>
              </g>
            );
          })}

          {/* Maroc — nœud origine */}
          <circle cx={CASA.x} cy={CASA.y} r="5.5" fill="var(--g300)" />
          <circle cx={CASA.x} cy={CASA.y} r="10" fill="none" stroke="var(--g300)" strokeOpacity="0.6">
            <animate attributeName="r" values="7;20" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text
            x={CASA.x - 22}
            y={CASA.y + 92}
            className="net-label"
            textAnchor="middle"
            fill="var(--g300)"
            fontSize="13"
            letterSpacing="2.4"
            style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
          >
            {dict.badge}
          </text>
        </svg>
      </div>

      {/* légende hubs + types de flux */}
      <div className="network__legend">
        <div>
          <h4 className="mono network__legendtitle">{dict.hubsTitle}</h4>
          <div className="network__hubs">
            <div>
              <span className="network__hublabel"><i className="hub-port" aria-hidden /> {dict.portsLabel}</span>
              <ul>
                {dict.ports.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="network__hublabel"><i className="hub-air" aria-hidden /> {dict.airportsLabel}</span>
              <ul>
                {dict.airports.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="network__types">
          <span><i className="type-sea" aria-hidden /> {dict.maritime}</span>
          <span><i className="type-air" aria-hidden /> {dict.air}</span>
        </div>
      </div>
    </div>
  );
}
