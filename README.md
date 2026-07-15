# Tegic Logistique — Site web

Refonte premium du site **Tegic Logistique** — le 3PL de référence des
grandes marques au Maroc. Transit · Transport · Entreposage · Distribution.

Next.js 15 (App Router) · TypeScript · CSS design system sur mesure ·
zéro framework UI · i18n FR/EN (AR préparé) · SEO/GEO complet ·
formulaire de devis avec mini-CRM intégré.

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production
npm run og           # régénère les images Open Graph (public/og/)
```

## Variables d'environnement

| Variable | Rôle | Défaut |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO, sitemap, OG) | `https://www.tegiclogistique.com` |
| `ADMIN_TOKEN` | Jeton d'accès au back-office `/admin/leads` — **requis** pour activer l'admin | — |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_SECURE` | Envoi de la notification email à chaque lead | non configuré → lead stocké sans email |
| `LEADS_NOTIFY_EMAIL` | Destinataire des notifications | `contact@tegiclogistique.com` |
| `EMAIL_FROM` | Expéditeur des notifications | `Tegic Web <no-reply@tegiclogistique.com>` |

## Architecture

```
src/
  app/
    (fr)/            → routes françaises (racine : /, /services/transport-amont, /devis…)
    (en)/en/         → routes anglaises (/en, /en/services/upstream-transport…)
    api/quote        → POST du formulaire de devis (validation + honeypot)
    api/leads        → GET (liste) / PATCH (statut) — protégé par ADMIN_TOKEN
    sitemap.ts       → sitemap.xml FR+EN avec alternates hreflang
    robots.ts        → robots.txt (bloque /admin et /api)
  i18n/              → fr.ts (source), en.ts (traduction pro), ar.ts (structure RTL prête)
  lib/               → routes (FR↔EN), media (slots photos), jsonld, meta, leads, mail
  views/             → une vue par page, partagée entre les deux langues
  components/        → header, footer, scènes SVG (carte Maroc, console GPS), form…
public/
  media/photos/      → DÉPOSER ICI les photos réelles (voir docs/GUIDE-PHOTOS.md)
  media/placeholders/→ visuels de marque SVG utilisés en repli automatique
  og/                → images Open Graph générées (npm run og)
docs/
  GUIDE-PHOTOS.md    → mapping photos fournies → fichiers → sections du site
  PROMPTS-IMAGES.md  → prompts IA (cinématique hero, slots complémentaires)
```

## Photos réelles

Le site est **câblé sur des slots nommés** : déposer les JPG dans
`public/media/photos/` avec les noms exacts listés dans
`docs/GUIDE-PHOTOS.md` et tout s'affiche automatiquement. En attendant, des
visuels de marque (SVG cinématiques, sans faux texte ni faux logo) prennent
le relais.

Le logo du header/footer est une recréation vectorielle fidèle du wordmark
« tegic » (`src/components/Logo.tsx`). Pour utiliser le fichier officiel de
la charte : déposer `public/brand/tegic-logo-white.svg` et remplacer le SVG
dans ce seul composant.

## i18n

- FR est la langue de référence (`src/i18n/fr.ts`, contenu intégral du brief).
- EN est une traduction professionnelle complète (`en.ts`), vérifiée par le
  type `Dict` (toute clé manquante casse la compilation).
- AR : architecture prête (`ar.ts`, direction RTL, procédure d'activation en
  tête de fichier). Aucune traduction automatique embarquée, conformément au
  brief — le sélecteur affiche AR comme « bientôt disponible ».
- Correspondance d'URL entre langues : `src/lib/routes.ts` (alimente le
  sélecteur de langue, les hreflang et le sitemap).

## Leads / mini-CRM

1. Le visiteur envoie le formulaire `/devis` (ou `/en/quote`).
2. `POST /api/quote` valide, attribue une référence `TGC-XXXXXX`, stocke le
   lead dans `data/leads.json` (gitignoré) et notifie par email si SMTP est
   configuré. L'échec d'email ne bloque jamais la demande.
3. Back-office : `/admin/leads` (jeton `ADMIN_TOKEN`) — liste, changement de
   statut (nouveau → contacté → devis envoyé → gagné/perdu), export CSV.

> Hébergement serverless (Vercel…) : le stockage fichier n'y est pas
> persistant. Brancher `src/lib/leads.ts` sur une base (Postgres, KV…) en
> conservant la même interface — c'est le seul module à adapter.

## SEO / GEO

- Metadata par page (titres, descriptions, mots-clés du brief), canonical +
  hreflang FR/EN, Open Graph et Twitter Cards (images générées).
- JSON-LD : `Organization` (global), `Service` + `FAQPage` + `BreadcrumbList`
  (transport amont), breadcrumbs sur toutes les pages.
- Bloc « answer-first » (L'essentiel) sur la page Transport amont pour les
  moteurs génératifs, FAQ indexable.
- `sitemap.xml` bilingue avec alternates, `robots.txt` propre.
- Textes alternatifs descriptifs FR/EN sur toutes les photos (`src/lib/media.ts`).

## Déploiement

Build standard Next.js (`npm run build && npm start`), Node ≥ 20.
Renseigner `NEXT_PUBLIC_SITE_URL`, `ADMIN_TOKEN` et le SMTP en production.
Reste à fournir côté Tegic : numéro de téléphone officiel (footer « Nous
appeler » pointe vers la page contact en attendant) et liens réseaux sociaux.
