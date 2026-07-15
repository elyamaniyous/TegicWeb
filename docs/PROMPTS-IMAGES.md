# Tegic Logistique — Prompts de génération d'images & vidéo

Ce document liste les prompts prêts à l'emploi pour produire les visuels
complémentaires du site (génération IA image + vidéo), **à partir des photos
réelles fournies** et du logo Tegic.

## Règles d'or (à coller dans chaque génération)

**Interdits absolus** — à ajouter en négatif dans chaque prompt :

> Pas de texte généré, pas de lettrage inventé, pas de logo recréé ou
> approximatif, pas de camion d'une autre marque, pas de plaque
> d'immatriculation lisible, pas de visage reconnaissable ajouté, pas de
> drapeaux, pas de watermark. Le wordmark « tegic » ne doit JAMAIS être
> re-dessiné par l'IA : il provient uniquement des photos réelles ou du
> fichier vectoriel officiel.

**Direction artistique commune** :

> Photographie industrielle premium, réaliste, cinématique. Palette dominée
> par les verts Tegic (#2FA44A, #145426, #0A2214) et les tons neutres béton /
> acier. Lumière naturelle marocaine (golden hour ou ciel voilé dramatique),
> contraste maîtrisé, léger grain argentique 35 mm, profondeur de champ,
> composition avec espace négatif pour le texte. Aucune saturation excessive,
> aucun rendu « 3D cartoon », aucun style stock-photo générique.

---

## 1. INPUT HERO — la photo à utiliser pour la cinématique

**Photo choisie : `semi-tegic-hq.jpg`** — la semi-remorque Scania verte avec
remorque au wordmark « tegic / STRATEGIC LOGISTICS », photographiée en
contre-plongée devant le siège (enseigne tegic sur le toit), sous un ciel
nuageux dramatique.

Pourquoi elle : camion en situation de départ (récit « enlèvement »), livrée
officielle plein cadre (zéro logo à générer), ciel graphique idéal pour un
grade cinématique, architecture du siège = preuve de solidité.

**Alternative b-roll : `fleet-tegic-trucks.jpg`** (porteurs alignés au dépôt,
tracteur au premier plan) pour les plans de coupe « puissance de flotte ».

### Prompt vidéo hero (image-to-video, 6–10 s, 24 fps, 21:9 ou 16:9)

Input : `semi-tegic-hq.jpg` (+ logo vectoriel pour l'étalonnage des verts).

> Plan cinématique à partir de cette photo réelle : lent travelling latéral
> et léger push-in vers la semi-remorque verte tegic, le camion démarre
> doucement et avance de quelques mètres, roues en rotation lente, chaleur
> légère sur l'asphalte, nuages en mouvement accéléré subtil dans le ciel
> dramatique, drapeau de lumière golden hour balayant la carrosserie.
> Conserver STRICTEMENT la géométrie du véhicule, la livrée, le lettrage
> « tegic » de la photo d'origine, l'architecture du bâtiment et l'enseigne.
> Grade colorimétrique vert profond / ombres denses, grain film discret,
> rendu type publicité corporate haut de gamme. Caméra stable, pas de
> tremblement, pas de morphing, pas de véhicules ajoutés, pas de personnes
> ajoutées, pas de texte ajouté.

### Prompt image hero statique (relight / upscale de la même photo)

> Sublimer cette photo réelle sans rien inventer : upscale 2×, débruitage
> léger, ciel densifié en dégradé vert-anthracite orageux, phares du camion
> discrètement allumés, reflets humides subtils au sol, vignettage doux,
> étalonnage vers les verts Tegic (#145426 ombres, #2FA44A moyens),
> conserver lettrages, proportions et architecture à l'identique. Sortie
> 2560 px de large, ratio 16:9, espace négatif renforcé à gauche.

---

## 2. Prompts par slot (si un complément visuel est nécessaire)

> Chaque slot du site a déjà : (1) une photo réelle prioritaire, (2) un
> visuel de marque SVG en repli. Ces prompts servent uniquement si vous
> voulez une 3ᵉ source d'images. Toujours repartir des photos réelles quand
> un véhicule Tegic doit apparaître.

### 2.1 Enlèvement portuaire — Port de Casablanca (`port-pickup`)
Input recommandé : `dock-container-loading.jpg` (extension de décor).

> Étendre cette scène réelle de chargement de conteneur : vue plus large du
> terminal, portiques de manutention en silhouette en arrière-plan,
> alignement de conteneurs, lumière de fin de journée avec brume maritime
> légère, dominante verte Tegic dans l'étalonnage. Ne pas modifier le
> chariot, les cartons ni le conteneur d'origine ; aucun logo ajouté, aucun
> texte lisible sur les conteneurs générés, pas de grues au design fantaisiste.

### 2.2 Enlèvement aéroportuaire — fret aérien (`airport-pickup`)
Génération complète (aucune photo aéroport fournie).

> Zone cargo d'un aéroport au Maroc au crépuscule : silhouette d'un avion
> cargo au fond hors focus, palettes aéronautiques ULD au premier plan,
> gyrophares discrets, piste mouillée reflétant les lumières vertes de la
> tour, ambiance opérationnelle calme et maîtrisée. Aucune compagnie
> identifiable, aucune immatriculation lisible, aucun logo sur l'avion,
> aucun personnel reconnaissable. Étalonnage vert profond Tegic, grain 35 mm.

### 2.3 Transport routier international — frontière (`border-tir`)

> Poste frontière routier de nuit au nord du Maroc : file de semi-remorques
> en silhouette sous éclairage sodium mêlé de vert, portique de contrôle,
> signalétique floutée non lisible, montagnes du Rif en arrière-plan,
> atmosphère sérieuse et sécurisée. Camions génériques SANS marquage, aucun
> drapeau, aucun texte lisible, aucune personne identifiable.

### 2.4 Console GPS / traçabilité (`gps-macro`)

> Gros plan macro sur un écran de supervision logistique dans une cabine
> sombre : carte routière stylisée vert sur fond anthracite, ligne de trajet
> lumineuse, point de position pulsant, reflets d'écran sur une main gantée
> hors focus. Interface épurée SANS texte lisible (formes et pastilles
> uniquement), pas de marque de GPS existante, dominante #2FA44A.

### 2.5 Flotte électrique 2026 — RSE (`fleet-electric`)

> Camion porteur électrique générique de profil, branché à une borne de
> recharge haute puissance dans une cour logistique au lever du soleil,
> carrosserie vert profond UNIE sans aucun marquage, câble de recharge au
> premier plan, panneaux photovoltaïques discrets sur le toit du bâtiment.
> Aucune marque de constructeur, aucun texte, style photo corporate réaliste.

### 2.6 Secteur électroménager / retail (`sector-appliances`)
Input recommandé : `warehouse-interior-racks.jpg`.

> Recadrer et étendre cette photo réelle d'entrepôt : allée en perspective
> centrale, empilements de cartons d'électroménager NEUTRES (rendre illisibles
> les marques visibles), lumière zénithale des sheds, sol époxy propre,
> profondeur de champ courte. Aucune marque tierce lisible dans l'image finale.

### 2.7 Portraits équipe (`team-portraits`)
Input : `team-tegic-warehouse.jpg` (retouche uniquement).

> Retouche éditoriale de cette photo réelle : équilibrer l'exposition,
> renforcer la présence des tenues vertes Tegic, adoucir l'arrière-plan
> (bokeh léger), conserver les visages et postures absolument intacts,
> aucun élément généré, étalonnage doux vert/neutre. — *Uniquement de la
> retouche : ne jamais générer de « faux employés ».*

---

## 3. Formats de sortie

| Usage | Ratio | Largeur mini |
|---|---|---|
| Hero (image ou frame vidéo) | 16:9 (ou 21:9) | 2560 px |
| Vidéo hero | 16:9, 6–10 s, boucle douce | 1920 px |
| Panneaux sections (`.media--43`) | 4:3 | 1600 px |
| Panneaux larges (`.media--169`) | 16:9 | 1600 px |
| Vertical (colonnes) | 3:4 | 1200 px |
| Open Graph (déjà généré via `npm run og`) | 1200×630 | — |

Export final : JPG qualité 80–85 (photos), MP4 H.264 CRF 20 (vidéo hero,
muet, autoplay), poids cible < 350 Ko par image, < 4 Mo pour la vidéo.
