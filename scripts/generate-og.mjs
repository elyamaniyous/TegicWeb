/**
 * Génère les images Open Graph (1200×630) aux couleurs Tegic.
 * Usage : npm run og
 * Produit : public/og/og-tegic.png, public/og/og-transport-amont.png
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "og");
mkdirSync(outDir, { recursive: true });

/* Wordmark officiel : lettres blanches extraites de public/brand/tegic-badge.svg */
import { readFileSync } from "fs";
const badge = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "public", "brand", "tegic-badge.svg"), "utf8");
const letterPaths = [...badge.matchAll(/<path fill="#ffffff"[^>]*d="([^"]+)"/g)].map((m) => m[1]);
/* viewBox lettres : x 222.08→372.27, y 556.21→627.44 */
const wordmark = (scale = 1, x = 0, y = 0) => `
  <g transform="translate(${x} ${y}) scale(${scale}) translate(-222.08 -556.21)" fill="#ffffff">
    ${letterPaths.map((d) => `<path d="${d}"/>`).join("\n    ")}
  </g>`;

function ogSvg({ title1, title2, kicker, footer }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a2214"/>
      <stop offset="0.55" stop-color="#07190e"/>
      <stop offset="1" stop-color="#041108"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.7">
      <stop offset="0" stop-color="#2fa44a" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#2fa44a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="none" stroke="#4fc063">
    <circle cx="1020" cy="130" r="90" stroke-opacity="0.35" stroke-width="30"/>
    <circle cx="1020" cy="130" r="170" stroke-opacity="0.22" stroke-width="38"/>
    <circle cx="1020" cy="130" r="260" stroke-opacity="0.12" stroke-width="46"/>
  </g>
  ${wordmark(1.2, 84, 64)}
  <text x="86" y="130" font-family="DejaVu Sans, Arial, sans-serif" font-size="21" letter-spacing="9" fill="#7fe08f" transform="translate(0 66)" opacity="0">.</text>
  <text x="86" y="300" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="58" fill="#ffffff">${title1}</text>
  <text x="86" y="372" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="58" fill="#ffffff">${title2}</text>
  <text x="86" y="440" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#a7bdab">${kicker}</text>
  <rect x="86" y="500" width="1028" height="1.5" fill="#2fa44a" opacity="0.55"/>
  <text x="86" y="552" font-family="DejaVu Sans Mono, monospace" font-size="20" letter-spacing="4" fill="#7fe08f">${footer}</text>
</svg>`;
}

const jobs = [
  {
    file: "og-tegic.png",
    svg: ogSvg({
      title1: "Le 3PL de référence des",
      title2: "grandes marques au Maroc.",
      kicker: "Transit · Transport · Entreposage · Distribution",
      footer: "TEGICLOGISTIQUE.COM — CASABLANCA, MAROC",
    }),
  },
  {
    file: "og-transport-amont.png",
    svg: ogSvg({
      title1: "Port, aéroport, frontière —",
      title2: "enlèvement immédiat.",
      kicker: "Transport amont · Flotte 100% propriétaire · 100% GPS · 7j/7",
      footer: "TEGIC — TRANSPORT AMONT AU MAROC",
    }),
  },
];

for (const job of jobs) {
  const out = join(outDir, job.file);
  await sharp(Buffer.from(job.svg)).png({ compressionLevel: 9 }).toFile(out);
  console.log("✓", job.file);
}
