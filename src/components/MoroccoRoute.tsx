/**
 * Carte stylisée du Maroc avec ligne de trajet animée
 * Port de Casablanca → destination (entrepôt client).
 * Tracé volontairement épuré : cartographie subtile, pas d'atlas.
 */
export function MoroccoRoute({
  from,
  to,
  status,
  className,
}: {
  from: string;
  to: string;
  status?: string;
  className?: string;
}) {
  // Silhouette simplifiée du Royaume (nord → provinces du sud)
  const morocco =
    "M199 22 L221 38 L236 55 L250 72 L252 96 L244 128 L233 158 L221 186 L207 214 L196 238 L182 262 L163 286 L146 308 L131 330 L114 356 L100 384 L88 414 L74 446 L20 446 L26 414 L33 384 L41 356 L52 330 L64 308 L79 286 L92 262 L99 238 L106 214 L112 186 L121 158 L134 128 L146 108 L162 88 L176 62 L186 40 Z";

  return (
    <svg
      viewBox="0 0 300 470"
      className={className}
      role="img"
      aria-label={`${from} → ${to}`}
      fill="none"
    >
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--g300)" />
          <stop offset="1" stopColor="var(--g500)" />
        </linearGradient>
        <radialGradient id="mapGlow" cx="0.42" cy="0.28" r="0.55">
          <stop offset="0" stopColor="rgba(47,164,74,0.28)" />
          <stop offset="1" stopColor="rgba(47,164,74,0)" />
        </radialGradient>
      </defs>

      {/* grille de coordonnées, très discrète */}
      <g stroke="rgba(127,224,143,0.07)" strokeWidth="1">
        {[60, 120, 180, 240].map((x) => (
          <line key={`v${x}`} x1={x} y1="10" x2={x} y2="460" />
        ))}
        {[80, 160, 240, 320, 400].map((y) => (
          <line key={`h${y}`} x1="10" y1={y} x2="290" y2={y} />
        ))}
      </g>

      <path d={morocco} fill="url(#mapGlow)" stroke="rgba(127,224,143,0.35)" strokeWidth="1.6" strokeLinejoin="round" />

      {/* trajet Casablanca (port) → destination intérieure */}
      <path id="tegicRoute" d="M146 116 C 175 130, 196 148, 205 178" stroke="rgba(127,224,143,0.25)" strokeWidth="6" strokeLinecap="round" />
      <path d="M146 116 C 175 130, 196 148, 205 178" stroke="url(#routeGrad)" strokeWidth="2.4" strokeLinecap="round" className="route-dash" />

      {/* point de départ : port de Casablanca */}
      <circle cx="146" cy="116" r="5" fill="var(--g300)" />
      <circle cx="146" cy="116" r="11" fill="none" stroke="var(--g300)" strokeOpacity="0.5">
        <animate attributeName="r" values="7;15" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.55;0" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* destination */}
      <circle cx="205" cy="178" r="5" fill="none" stroke="var(--g300)" strokeWidth="2" />

      {/* camion en mouvement sur le trajet */}
      <g>
        <rect x="-7" y="-4.5" width="14" height="9" rx="2.5" fill="var(--g300)" />
        <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto">
          <mpath href="#tegicRoute" />
        </animateMotion>
      </g>

      {/* étiquettes */}
      <g fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.08em">
        <text x="138" y="102" fill="#eef5ee" textAnchor="end">{from.toUpperCase()}</text>
        <text x="205" y="200" fill="#eef5ee" textAnchor="middle">{to.toUpperCase()}</text>
        {status ? (
          <text x="24" y="446" fill="var(--g300)" fontSize="9.5">
            ● {status.toUpperCase()}
          </text>
        ) : null}
      </g>
    </svg>
  );
}
