/**
 * Hero apaisant — ciel de fin de journée sur le port de Casablanca,
 * construit en code : dégradé aux verts Tegic, nuages en dérive très
 * lente, halo de soleil couchant, silhouettes de portiques à l'horizon.
 * Poids réseau : zéro. Mouvement désactivé avec prefers-reduced-motion.
 */
export function SkyPortScene() {
  return (
    <div className="skyport" aria-hidden="true">
      {/* ciel */}
      <div className="skyport__sky" />
      {/* halo soleil couchant */}
      <div className="skyport__sun" />
      {/* nuages en dérive */}
      <div className="skyport__cloud skyport__cloud--1" />
      <div className="skyport__cloud skyport__cloud--2" />
      <div className="skyport__cloud skyport__cloud--3" />

      {/* horizon : portiques du port en silhouette */}
      <svg className="skyport__cranes" viewBox="0 0 1600 260" preserveAspectRatio="xMidYMax slice">
        <g fill="none" stroke="#04120a" strokeWidth="14">
          <path d="M140 260 V96 L420 62 V260" />
          <path d="M140 168 H420" />
          <path d="M96 96 H468" />
          <path d="M980 260 V120 L1240 92 V260" />
          <path d="M980 190 H1240" />
          <path d="M942 120 H1286" />
        </g>
        <g fill="#04120a">
          <rect x="250" y="168" width="86" height="60" rx="6" />
          <rect x="1074" y="190" width="76" height="52" rx="6" />
          <rect x="0" y="238" width="1600" height="22" />
          {/* conteneurs empilés au premier plan lointain */}
          <rect x="520" y="212" width="150" height="28" rx="3" />
          <rect x="548" y="186" width="150" height="28" rx="3" />
          <rect x="1330" y="206" width="180" height="34" rx="3" />
          <rect x="40" y="214" width="60" height="26" rx="3" />
        </g>
        {/* feux de portique */}
        <circle cx="420" cy="62" r="5" fill="#7fe08f" className="skyport__beacon" />
        <circle cx="1240" cy="92" r="5" fill="#7fe08f" className="skyport__beacon skyport__beacon--late" />
      </svg>

      {/* reflet d'eau sous l'horizon */}
      <div className="skyport__sea" />
      {/* assombrissement bas pour le texte */}
      <div className="skyport__base" />
    </div>
  );
}
