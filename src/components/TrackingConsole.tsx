import type { Dict } from "@/i18n";
import { IconTruck } from "./Icons";

/**
 * Interface de suivi GPS — visuel produit : carte stylisée
 * Port de Casablanca → entrepôt, ETA dynamique, jalons réels.
 */
export function TrackingConsole({ dict, live }: { dict: Dict; live: string }) {
  const c = dict.ta.gps.console;
  const progress = 68;

  return (
    <div className="console" data-reveal>
      <div className="console__head">
        <span className="console__id">{c.vehicle}</span>
        <span className="console__live"><i aria-hidden />{live}</span>
      </div>

      <div className="console__map">
        <svg viewBox="0 0 560 150" className="console__routeline" role="img" aria-label={`${c.route[0]} → ${c.route[1]}`}>
          <defs>
            <linearGradient id="consGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--g500)" />
              <stop offset="1" stopColor="var(--g300)" />
            </linearGradient>
          </defs>

          {/* itinéraire */}
          <path d="M30 96 C 150 66, 260 122, 380 88 S 520 70, 530 78" stroke="rgba(127,224,143,0.18)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path
            d="M30 96 C 150 66, 260 122, 380 88 S 520 70, 530 78"
            stroke="url(#consGrad)"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${progress} 100`}
          />

          {/* origine / destination */}
          <circle cx="30" cy="96" r="6" fill="var(--g300)" />
          <circle cx="530" cy="78" r="6" fill="none" stroke="var(--g300)" strokeWidth="2.2" />

          {/* position courante ~68% */}
          <g transform="translate(368 89)">
            <circle r="13" fill="rgba(127,224,143,0.16)">
              <animate attributeName="r" values="10;18" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="var(--g950)" stroke="var(--g300)" strokeWidth="2.2" />
          </g>

          <text x="30" y="128" fill="#a7bdab" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em">
            {c.route[0].toUpperCase()}
          </text>
          <text x="530" y="52" fill="#a7bdab" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em" textAnchor="end">
            {c.route[1].toUpperCase()}
          </text>
        </svg>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", paddingBottom: "0.4rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", color: "var(--muted)", fontSize: "0.86rem" }}>
            <IconTruck width={20} height={20} style={{ color: "var(--g300)" }} />
            {c.status}
          </span>
          <span className="eta-chip">{c.eta} · {c.progress}</span>
        </div>
      </div>

      <div className="console__foot">
        {c.checkpoints.map((cp) => (
          <div key={cp.label} className="console__row" data-done={cp.done}>
            <span className="st" aria-hidden />
            <span className="t">{cp.time}</span>
            <span>{cp.label}</span>
          </div>
        ))}
        <div className="console__tms">
          <span aria-hidden style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--g300)", display: "inline-block" }} />
          {c.tms}
        </div>
      </div>
    </div>
  );
}
