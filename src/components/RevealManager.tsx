"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Anime l'apparition de tous les éléments [data-reveal] au scroll.
 * Un seul observateur global, re-scanné à chaque changement de route.
 */
export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-reveal", "in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-reveal", "in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => {
      if (el.getAttribute("data-reveal") !== "in") io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return (
    <noscript>
      <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
    </noscript>
  );
}
