/**
 * Registre central des visuels du site.
 *
 * Chaque slot correspond à une photo réelle Tegic fournie par le client.
 * Déposer les fichiers JPG dans `public/media/photos/` avec EXACTEMENT ces
 * noms : le site les utilise automatiquement. Tant qu'une photo est absente,
 * un visuel de marque (SVG cinématique, sans faux texte ni faux logo) prend
 * le relais — la mise en page reste intacte.
 *
 * Correspondance photos fournies → fichiers : voir docs/GUIDE-PHOTOS.md
 */

export type MediaSlot = {
  /** Photo réelle attendue (public/media/photos/…) */
  photo: string;
  /** Visuel de repli généré (public/media/placeholders/…) */
  fallback: string;
  alt: { fr: string; en: string };
};

export const MEDIA = {
  /** Photo 6 — semi-remorque Scania + remorque tegic devant le siège, ciel dramatique. HERO transport amont. */
  heroTransport: {
    photo: "/media/photos/semi-tegic-hq.jpg",
    fallback: "/media/placeholders/truck-highway.svg",
    alt: {
      fr: "Semi-remorque de la flotte propre Tegic Logistique quittant le siège de Casablanca pour un enlèvement portuaire",
      en: "Tegic Logistics own-fleet semi-trailer leaving the Casablanca headquarters for a port pickup",
    },
  },
  /** Photo 5 — camions verts tegic alignés au dépôt, tracteur au premier plan. Section flotte + accueil. */
  fleet: {
    photo: "/media/photos/fleet-tegic-trucks.jpg",
    fallback: "/media/placeholders/fleet-yard.svg",
    alt: {
      fr: "Camions porteurs aux couleurs Tegic alignés sur la plateforme logistique de Casablanca",
      en: "Tegic-liveried rigid trucks lined up at the Casablanca logistics platform",
    },
  },
  /** Photo #37 — porteurs tegic à quai et tracteur au premier plan : les deux gabarits de la flotte. */
  distribution: {
    photo: "/media/photos/fleet-dock-mixed.jpg",
    fallback: "/media/placeholders/truck-city.svg",
    alt: {
      fr: "Porteurs de distribution Tegic à quai et tracteur lourd au premier plan sur la plateforme de Casablanca",
      en: "Tegic distribution rigids at the dock with a heavy tractor unit in the foreground at the Casablanca platform",
    },
  },
  /** Photo 8 — façade du siège tegic, enseigne sur le toit. Qui sommes-nous / contact. */
  hq: {
    photo: "/media/photos/hq-tegic-building.jpg",
    fallback: "/media/placeholders/hq-building.svg",
    alt: {
      fr: "Siège de Tegic Logistique à Casablanca, enseigne tegic et quais de chargement",
      en: "Tegic Logistics headquarters in Casablanca with rooftop tegic sign and loading docks",
    },
  },
  /** Photo 9 — intérieur d'entrepôt, allées de cartons électroménager. Entreposage. */
  warehouse: {
    photo: "/media/photos/warehouse-interior-racks.jpg",
    fallback: "/media/placeholders/warehouse-racks.svg",
    alt: {
      fr: "Entrepôt Tegic à Casablanca : allées de marchandises électroménager stockées et identifiées",
      en: "Tegic warehouse in Casablanca: aisles of stored and labelled home-appliance goods",
    },
  },
  /** Photo 2 — chariot élévateur levant une palette en hauteur, entrepôt voûté. Entreposage / accueil. */
  warehouseLift: {
    photo: "/media/photos/warehouse-lift-wide.jpg",
    fallback: "/media/placeholders/warehouse-racks.svg",
    alt: {
      fr: "Cariste Tegic gerbant des marchandises volumineuses dans l'entrepôt de Casablanca",
      en: "Tegic forklift operator stacking bulky goods in the Casablanca warehouse",
    },
  },
  /** Photo 4/10 — chargement d'un conteneur à quai au chariot embarqué. Port / process. */
  dockLoading: {
    photo: "/media/photos/dock-container-loading.jpg",
    fallback: "/media/placeholders/port-cranes.svg",
    alt: {
      fr: "Chargement de marchandises dans un conteneur maritime sur le quai Tegic",
      en: "Goods being loaded into a shipping container at the Tegic dock",
    },
  },
  /** Photo 3 — équipe en tenue tegic manutentionnant un réfrigérateur. Qui sommes-nous / équipe. */
  team: {
    photo: "/media/photos/team-tegic-warehouse.jpg",
    fallback: "/media/placeholders/team-ops.svg",
    alt: {
      fr: "Équipe d'exploitation Tegic en tenue de travail lors d'une opération de manutention en entrepôt",
      en: "Tegic operations team in uniform during a warehouse handling operation",
    },
  },
  /** Photo 1 — chariot élévateur en allée, format vertical. Panneaux latéraux. */
  forklift: {
    photo: "/media/photos/warehouse-forklift-vertical.jpg",
    fallback: "/media/placeholders/warehouse-racks.svg",
    alt: {
      fr: "Chariot élévateur Tegic en opération dans les allées de l'entrepôt",
      en: "Tegic forklift at work in the warehouse aisles",
    },
  },
  /** Visuel généré — zone cargo aéroportuaire au crépuscule (enlèvement aérien). */
  airportCargo: {
    photo: "/media/photos/airport-cargo.jpg",
    fallback: "/media/placeholders/port-cranes.svg",
    alt: {
      fr: "Fret aérien sur le tarmac : palettes cargo prêtes à l'enlèvement à l'aéroport Mohammed V",
      en: "Air freight on the apron: cargo pallets ready for pickup at Mohammed V airport",
    },
  },
  /** Visuel généré — poste frontière routier de nuit (transport international). */
  borderNight: {
    photo: "/media/photos/border-night.jpg",
    fallback: "/media/placeholders/truck-highway.svg",
    alt: {
      fr: "Semi-remorques au poste frontière de nuit — transport routier international vers le Maroc",
      en: "Semi-trailers at a border crossing by night — international road transport to Morocco",
    },
  },
  /** Visuel généré — camion électrique Tegic en charge (engagement RSE 2026). */
  electricTruck: {
    photo: "/media/photos/electric-truck-tegic.jpg",
    fallback: "/media/placeholders/truck-city.svg",
    alt: {
      fr: "Camion électrique aux couleurs Tegic en charge sur la plateforme logistique — flotte électrique dès 2026",
      en: "Tegic-liveried electric truck charging at the logistics platform — electric fleet from 2026",
    },
  },
  /** Visuel généré — terminal à conteneurs au couchant (freight forwarding). */
  portSunset: {
    photo: "/media/photos/port-cranes-sunset.jpg",
    fallback: "/media/placeholders/port-cranes.svg",
    alt: {
      fr: "Portiques et conteneurs au terminal maritime — flux internationaux vers le Maroc",
      en: "Gantry cranes and containers at the sea terminal — international flows to Morocco",
    },
  },
} as const;

export type MediaKey = keyof typeof MEDIA;
