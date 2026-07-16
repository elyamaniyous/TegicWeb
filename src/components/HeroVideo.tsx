"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import type { MediaSlot } from "@/lib/media";
import type { Locale } from "@/lib/site";

/**
 * Vidéo de hero avec repli photo automatique :
 * - lecture auto muette en boucle (politiques navigateur respectées) ;
 * - poster = photo étalonnée (affichée pendant le chargement) ;
 * - prefers-reduced-motion → vidéo figée sur la première image ;
 * - échec de chargement → bascule sur la photo.
 */
export function HeroVideo({
  src,
  poster,
  slot,
  locale,
}: {
  src: string;
  poster: string;
  slot: MediaSlot;
  locale: Locale;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.currentTime = 0;
      return;
    }
    // codec indisponible ou lecture bloquée → photo
    const check = window.setTimeout(() => {
      if (v.readyState < 2 || v.videoWidth === 0) setFailed(true);
    }, 3500);
    return () => window.clearTimeout(check);
  }, []);

  if (failed) return <Photo slot={slot} locale={locale} eager />;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
    </video>
  );
}
