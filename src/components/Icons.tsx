import type { SVGProps } from "react";

function Base({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Portique / grue portuaire */
export const IconPort = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 27h24" />
    <path d="M8 27V12l14-6v21" />
    <path d="M22 10h6v6" />
    <path d="M28 16v11" />
    <path d="M13 27v-8h6v8" />
    <path d="M25 16v4.5" />
    <circle cx="25" cy="22.5" r="1.6" />
  </Base>
);

/** Fret aérien */
export const IconAir = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 24 28 24" />
    <path d="M16 5v9l10 6.2V23l-10-3.4L6 23v-2.8L16 14" />
    <path d="M12.5 27h7" />
  </Base>
);

/** Frontière / routier international */
export const IconBorder = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6 27V6" />
    <path d="M6 7h14l-3 4.5L20 16H6" />
    <path d="M12 27h16" />
    <path d="M17 27v-4.5a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3V27" />
  </Base>
);

/** Flux continu / continuum */
export const IconFlow = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="6" cy="16" r="2.6" />
    <circle cx="16" cy="16" r="2.6" />
    <circle cx="26" cy="16" r="2.6" />
    <path d="M8.6 16h4.8M18.6 16h4.8" />
    <path d="M4 24.5c8-4.5 16 4.5 24-1" />
  </Base>
);

/** GPS / traçabilité */
export const IconGps = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M16 27s-8.5-7.2-8.5-13A8.5 8.5 0 0 1 24.5 14c0 5.8-8.5 13-8.5 13Z" />
    <circle cx="16" cy="13.7" r="3" />
    <path d="M25.5 24.5c1.9 1 3 2.1 3 3.3 0 2.3-5.6 4.2-12.5 4.2S3.5 30.1 3.5 27.8c0-1.2 1.1-2.3 3-3.3" opacity="0.7" />
  </Base>
);

/** Responsabilité / bouclier flotte */
export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M16 4.5 26 8v8.2c0 6.3-4.2 10-10 11.8-5.8-1.8-10-5.5-10-11.8V8Z" />
    <path d="m11.5 16 3.2 3.2 6-6.2" />
  </Base>
);

/** Marchandises à contraintes / conteneur */
export const IconCargo = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="4" y="10" width="24" height="14" rx="1.6" />
    <path d="M9 10v14M14.5 10v14M20 10v14M25 10v14" opacity="0.7" />
    <path d="M4 14h24" opacity="0" />
  </Base>
);

/** Entrepôt */
export const IconWarehouse = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 27V12l12-7 12 7v15" />
    <path d="M9 27v-9h14v9" />
    <path d="M9 22.5h14" />
    <path d="M4 27h24" />
  </Base>
);

/** Camion */
export const IconTruck = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M3 8h15v13H3z" />
    <path d="M18 12h6l4 5v4h-10" />
    <circle cx="8" cy="24" r="2.6" />
    <circle cx="23" cy="24" r="2.6" />
    <path d="M10.6 24h9.8M3 24h2.4" />
  </Base>
);

/** Distribution / dernier km */
export const IconDistribution = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="16" cy="14" r="9.5" />
    <path d="M16 4.5V14l6.5 4" />
    <path d="M5 27.5h22" />
    <path d="M9 24l-2 3.5M23 24l2 3.5" />
  </Base>
);

/** Freight forwarding / globe */
export const IconGlobe = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="16" cy="16" r="11.5" />
    <path d="M4.5 16h23" />
    <path d="M16 4.5c3.4 3 5.2 7.1 5.2 11.5S19.4 24.5 16 27.5c-3.4-3-5.2-7.1-5.2-11.5S12.6 7.5 16 4.5Z" />
  </Base>
);

/** Douane / tampon transit */
export const IconCustoms = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="5" y="5" width="22" height="22" rx="3" />
    <path d="m11 16.5 3.4 3.4L21.5 12" />
    <path d="M5 22h22" opacity="0.6" />
  </Base>
);

/** RSE / électrique */
export const IconLeafBolt = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M27 5C15 5 6.5 10.5 6.5 20.5c0 3.4 1.4 5.7 2.6 7C11 20 16 13.5 23 10c-6 4.5-10.5 11-12 17 1.6.6 3.3.9 5 .9C24.5 27.9 27 15 27 5Z" />
    <path d="m18.5 15-3 5h4l-3 5" strokeWidth="1.5" />
  </Base>
);

/** Check simple */
export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="16" cy="16" r="11.5" />
    <path d="m10.5 16.5 3.8 3.8 7.2-8" />
  </Base>
);

/** Flèche */
export const IconArrow = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
  </svg>
);

/** Plus (FAQ) */
export const IconPlus = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M8 2v12M2 8h12" />
  </svg>
);
