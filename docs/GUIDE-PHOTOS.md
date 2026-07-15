# Guide d'intégration des photos réelles Tegic

Le site est câblé sur des **slots de photos nommés**. Il suffit de déposer
les fichiers JPG dans `public/media/photos/` avec **exactement** les noms
ci-dessous : chaque page les utilise automatiquement au prochain
déploiement. Tant qu'un fichier manque, un visuel de marque (SVG) prend le
relais — aucune image cassée.

## Sélection retenue (direction artistique)

Parmi les photos fournies, voici celles retenues pour le site et leur rôle :

| # | Photo fournie (description) | Nom de fichier EXACT | Utilisée sur | Recadrage conseillé |
|---|---|---|---|---|
| 1 | **Semi-remorque Scania + remorque « tegic » devant le siège, ciel dramatique** | `semi-tegic-hq.jpg` | ⭐ HERO Transport amont, carte service vedette (accueil & hub), freight forwarding | 16:9 — garder le camion aux 2/3 droits, espace négatif à gauche pour le titre |
| 2 | **Porteurs verts « tegic » alignés au dépôt, tracteur au 1er plan** | `fleet-tegic-trucks.jpg` | HERO Accueil, section Flotte (240), Pourquoi Tegic | 16:9 — horizon droit, conserver les 2 camions lisibles |
| 3 | **Camion Fuso « tegic » devant l'entrée du siège, palmiers** | `truck-tegic-hq.jpg` | Page Distribution, bande flotte de l'accueil | 4:3 — centrer le camion, couper le ciel excédentaire |
| 4 | **Façade du siège, enseigne « tegic » sur le toit, végétation** | `hq-tegic-building.jpg` | HERO Qui sommes-nous, page Contact | 16:9 — enseigne dans le tiers supérieur |
| 5 | **Intérieur d'entrepôt, allées de cartons électroménager** | `warehouse-interior-racks.jpg` | HERO Secteurs, page Entreposage | 16:9 — allée en perspective centrale ; éviter un crop où les marques tierces dominent |
| 6 | **Chariot élévateur levant une palette en hauteur (plan large, toit voûté)** | `warehouse-lift-wide.jpg` | Entreposage (panneau), réserve accueil | 16:9 ou 4:3 — garder la verticale du mât |
| 7 | **Chargement d'un conteneur à quai (chariot + cartons « Front/Face avant »)** | `dock-container-loading.jpg` | Carte Enlèvement portuaire, Qui sommes-nous, Transit & douane | 4:3 — l'ouverture du conteneur bien visible |
| 8 | **Équipe en tenue verte tegic, manutention d'un réfrigérateur** | `team-tegic-warehouse.jpg` | Accueil (opérateur intégré), Qui sommes-nous (équipes) | 4:3 — les 2 personnes au premier plan |
| 9 | **Chariot élévateur en allée (format vertical)** | `warehouse-forklift-vertical.jpg` | Panneaux verticaux (réserve) | 3:4 tel quel |

⭐ = **input désigné pour la cinématique du hero** (voir
`docs/PROMPTS-IMAGES.md`, section 1).

## Préparation des fichiers

- Format : JPG, qualité 80–85, profil sRGB.
- Largeur : 2560 px pour les héros (`semi-tegic-hq`, `fleet-tegic-trucks`,
  `hq-tegic-building`, `warehouse-interior-racks`), 1600 px pour le reste.
- Poids cible : < 350 Ko par image (les overlays du site foncent déjà les
  images : inutile d'assombrir à la retouche).
- Une commande prête à l'emploi (sharp est déjà dans les devDependencies) :

```bash
npx sharp-cli --input photo-source.jpg --output public/media/photos/semi-tegic-hq.jpg resize 2560 --quality 82
```

  ou en une ligne Node :

```bash
node -e "require('sharp')('source.jpg').resize({width:2560}).jpeg({quality:82}).toFile('public/media/photos/semi-tegic-hq.jpg')"
```

## Où c'est branché dans le code

- Registre des slots : `src/lib/media.ts` (chemins + textes alternatifs SEO
  FR/EN déjà rédigés).
- Composant d'affichage avec repli : `src/components/Photo.tsx`.
- Pour ajouter un nouveau slot : ajouter une entrée dans `MEDIA`, déposer le
  fichier, utiliser `<Photo slot={MEDIA.monSlot} locale={locale} />`.

## Note sur les marques tierces

La photo d'entrepôt (`warehouse-interior-racks.jpg`) montre des cartons de
marques clientes réelles. Elle est utilisée avec un overlay sombre et sans
mise en avant : ne pas l'utiliser en gros plan sans accord des marques
concernées, et ne jamais présenter ces marques comme références
commerciales sans validation de Tegic.
