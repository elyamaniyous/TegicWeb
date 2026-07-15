/**
 * Génère src/components/worldland.ts à partir des données Natural Earth
 * (world-atlas 110m) : trait de côte réel projeté en équirectangulaire
 * sur une viewBox 1000×500, + silhouette du Royaume du Maroc complète
 * (fusion des polygones 504 + 732, conformément à la carte officielle).
 * Usage : node scripts/build-world.mjs <land-110m.json> <countries-110m.json>
 */
import { readFileSync, writeFileSync } from "fs";
import * as topojson from "topojson-client";

const [landFile, countriesFile] = process.argv.slice(2);
const land = JSON.parse(readFileSync(landFile, "utf8"));
const countries = JSON.parse(readFileSync(countriesFile, "utf8"));

const px = (lon) => ((lon + 180) / 360) * 1000;
const py = (lat) => ((90 - lat) / 180) * 500;

function ringArea(ring) {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(a / 2);
}

function geomToPath(geom, minArea = 4) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  let d = "";
  for (const poly of polys) {
    for (const ring of poly) {
      const projected = ring.map(([lon, lat]) => [px(lon), py(lat)]);
      if (ringArea(projected) < minArea) continue; // îlots invisibles à cette échelle
      let prev = null;
      let seg = "";
      for (const [x, y] of projected) {
        const X = Math.round(x * 10) / 10;
        const Y = Math.round(y * 10) / 10;
        if (prev && Math.abs(prev[0] - X) < 0.35 && Math.abs(prev[1] - Y) < 0.35) continue;
        seg += seg === "" ? `M${X} ${Y}` : `L${X} ${Y}`;
        prev = [X, Y];
      }
      if (seg) d += seg + "Z";
    }
  }
  return d;
}

const landGeo = topojson.feature(land, land.objects.land);
const landPath = landGeo.features
  ? landGeo.features.map((f) => geomToPath(f.geometry)).join("")
  : geomToPath(landGeo.geometry);

const cGeo = topojson.feature(countries, countries.objects.countries);
const morocco = cGeo.features.filter((f) => f.id === "504" || f.id === "732");
if (morocco.length === 0) throw new Error("Maroc introuvable dans les données");
const moroccoPath = morocco.map((f) => geomToPath(f.geometry, 0.5)).join("");

const out = `/**
 * Tracés générés par scripts/build-world.mjs (Natural Earth 110m,
 * projection équirectangulaire, viewBox 1000×500). Ne pas éditer à la main.
 */
export const WORLD_LAND_PATH = ${JSON.stringify(landPath)};

/** Royaume du Maroc — silhouette complète (Tanger → Lagouira). */
export const MOROCCO_PATH = ${JSON.stringify(moroccoPath)};
`;
writeFileSync("src/components/worldland.ts", out);
console.log("worldland.ts :", (out.length / 1024).toFixed(1), "Ko — Maroc:", morocco.length, "polygones");
