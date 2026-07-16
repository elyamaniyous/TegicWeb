"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import type { MediaSlot } from "@/lib/media";
import type { Locale } from "@/lib/site";

/**
 * Vidéo de fond avec repli photo automatique.
 *
 * Le <video> est injecté en HTML brut : React n'écrit pas l'attribut
 * `muted` côté serveur (bug connu), or iOS Safari ne autorise
 * l'autoplay que si `muted` et `playsinline` sont présents dans le
 * HTML initial. On garantit ici les attributs au parsing.
 *
 * Stratégie de lecture :
 *  1. tentative play() au montage ;
 *  2. si bloqué (mode économie d'énergie iOS…), nouvelle tentative au
 *     premier toucher/clic n'importe où sur la page ;
 *  3. si la vidéo reste illisible (codec, réseau), bascule sur la photo
 *     — pas de bouton ▶ disgracieux.
 *  4. prefers-reduced-motion → image fixe (poster).
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const webm = src.replace(/\.mp4$/, ".webm");
  const html = `<video autoplay muted loop playsinline preload="metadata" poster="${poster}" aria-hidden="true"><source src="${src}" type="video/mp4"/><source src="${webm}" type="video/webm"/></video>`;

  useEffect(() => {
    const v = wrapRef.current?.querySelector("video");
    if (!v) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }

    v.muted = true;
    v.defaultMuted = true;

    const onError = () => setFailed(true);
    v.addEventListener("error", onError);

    const tryPlay = () => v.play().catch(() => undefined);
    tryPlay();

    // Autoplay bloqué (économie d'énergie…) → lecture au premier geste.
    const onGesture = () => {
      tryPlay();
    };
    window.addEventListener("touchstart", onGesture, { passive: true, once: true });
    window.addEventListener("pointerdown", onGesture, { passive: true, once: true });

    // Codec indisponible / lecture impossible → repli photo (sans bouton ▶).
    const check = window.setTimeout(() => {
      if (v.videoWidth === 0) setFailed(true);
    }, 4000);

    return () => {
      v.removeEventListener("error", onError);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
      window.clearTimeout(check);
    };
  }, [src]);

  if (failed) return <Photo slot={slot} locale={locale} eager />;

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", height: "100%", display: "contents" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
