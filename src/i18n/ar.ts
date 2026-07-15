/**
 * Architecture prête pour la version arabe (AR).
 *
 * Conformément au brief, aucune traduction automatique approximative n'est
 * embarquée : ce fichier définit la structure et la direction RTL, et sera
 * complété avec une traduction validée par Tegic avant activation.
 *
 * Pour activer l'arabe :
 *  1. Compléter ce dictionnaire (même structure que `fr.ts`, type `Dict`).
 *  2. Ajouter "ar" à LOCALES dans `src/lib/site.ts` et les routes /ar dans
 *     `src/lib/routes.ts` + `src/app/ar/…` (mêmes wrappers que /en).
 *  3. Le layout applique automatiquement dir="rtl" via la clé `dir`.
 */
export const arStub = {
  locale: "ar",
  dir: "rtl",
  // … clés à traduire (voir Dict dans ./fr)
} as const;
