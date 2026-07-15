/**
 * Wordmark "tegic" — recréation vectorielle fidèle du logo fourni
 * (bas de casse géométrique, terminaisons rondes) pour un rendu net à
 * toutes les tailles. Pour utiliser le fichier officiel de la charte,
 * déposer `public/brand/tegic-logo-white.svg` et remplacer le <svg>
 * ci-dessous par une balise <img> — un seul composant à modifier.
 */
export function TegicWordmark({
  height = 30,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 250 112"
      height={height}
      className={className}
      role="img"
      aria-label="tegic"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
    >
      {/* t */}
      <path d="M22 12 V64 a20 20 0 0 0 20 20" />
      <path d="M8 36 H42" />
      {/* e */}
      <circle cx="74" cy="61" r="23" />
      <path d="M52 57 H95" strokeWidth="14" />
      {/* g */}
      <circle cx="128" cy="61" r="23" />
      <path d="M151 42 V84 a19 19 0 0 1 -31 14" />
      {/* i */}
      <path d="M176 44 V84" />
      <circle cx="176" cy="18" r="9.5" fill="currentColor" stroke="none" />
      {/* c */}
      <path d="M236.5 46.5 a23 23 0 1 0 0 29" />
    </svg>
  );
}

export function LogoLockup({
  height = 30,
  tagline = false,
  className,
}: {
  height?: number;
  tagline?: boolean;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", flexDirection: "column", gap: tagline ? 8 : 0 }}
    >
      <TegicWordmark height={height} />
      {tagline && (
        <span
          className="mono"
          style={{ color: "var(--g200)", letterSpacing: "0.32em", fontSize: "0.6rem" }}
        >
          Strategic Logistics
        </span>
      )}
    </span>
  );
}
