"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaSlot } from "@/lib/media";
import type { Locale } from "@/lib/site";

/**
 * Photo réelle Tegic avec repli automatique : si le fichier JPG n'est pas
 * encore déposé dans public/media/photos/, le visuel de marque généré
 * (SVG cinématique) s'affiche à la place — aucune image cassée, jamais.
 *
 * Le repli est vérifié au montage (img.complete + naturalWidth) car une
 * erreur de chargement peut survenir avant l'hydratation de React.
 */
export function Photo({
  slot,
  locale,
  eager = false,
  className,
  sizes,
}: {
  slot: MediaSlot;
  locale: Locale;
  eager?: boolean;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(slot.photo);

  const fallback = () => {
    setSrc((cur) => (cur === slot.fallback ? cur : slot.fallback));
  };

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) fallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={slot.alt[locale]}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      onError={fallback}
    />
  );
}
