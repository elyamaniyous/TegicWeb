import { fr, type Dict } from "./fr";
import { en } from "./en";
import type { Locale } from "@/lib/site";

const dicts: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  return dicts[locale] ?? fr;
}

export type { Dict };
