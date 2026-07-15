"use client";

/**
 * Infrastructure motion du site — Lenis (défilement doux) + GSAP
 * (ScrollTrigger, SplitText). Tous les effets respectent
 * prefers-reduced-motion et se désactivent proprement sans JS.
 */

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= Provider global ================= */

export function MotionProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* progression de scroll : ligne + camion (signature) */
  useEffect(() => {
    if (reduced()) return;
    const line = document.querySelector<HTMLElement>(".routebar__line");
    const truck = document.querySelector<HTMLElement>(".routebar__truck");
    if (!line || !truck) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        line.style.transform = `scaleX(${self.progress})`;
        truck.style.transform = `translateX(calc(${self.progress * 100}vw - 14px))`;
      },
    });
    return () => st.kill();
  }, [pathname]);

  /* retour en haut + refresh à chaque navigation */
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  /* parallax générique sur .media[data-parallax] */
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((wrap) => {
        const img = wrap.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div className="routebar" aria-hidden="true">
        <div className="routebar__line" />
        <div className="routebar__truck" />
      </div>
      <noscript>
        <style>{`[data-split]{opacity:1 !important}`}</style>
      </noscript>
    </>
  );
}

/* ================= Titres révélés par lignes ================= */

export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  once = true,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("split-ready");
    if (reduced()) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: "lines", linesClass: "line" });
      split.lines.forEach((line) => {
        const mask = document.createElement("span");
        mask.className = "line-mask";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
      });
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        split.lines,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.09,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once },
        }
      );
    }, el);
    return () => {
      ctx.revert();
      split?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={`split-lines ${className ?? ""}`} data-split>
      {children}
    </Tag>
  );
}

/* ================= Intro du hero ================= */

export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      const img = el.querySelector(".hero__media img, .hero__media .ph-fallback");
      const items = el.querySelectorAll("[data-hero-el]");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.9, ease: "power2.out" }, 0);
      tl.fromTo(
        items,
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.12 },
        0.25
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ display: "contents" }}>
      {children}
    </div>
  );
}

/* ================= Section process épinglée (horizontale) ================= */

export function PinnedProcess({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const track = el.querySelector<HTMLElement>(".proc__track");
      const fill = el.querySelector<HTMLElement>(".proc__bar i");
      const truck = el.querySelector<HTMLElement>(".proc__bar .truckdot");
      const bar = el.querySelector<HTMLElement>(".proc__bar");
      if (!track) return;
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${dist()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill) fill.style.transform = `scaleX(${self.progress})`;
            if (truck && bar) truck.style.transform = `translateX(calc(${self.progress} * ${bar.offsetWidth}px - 8px))`;
          },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}

/* ================= Zoom léger du grand chiffre flotte ================= */

export function ScrubScale({ children, from = 0.86 }: { children: ReactNode; from?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.5 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [from]);
  return (
    <div ref={ref} style={{ display: "inline-block", transformOrigin: "left bottom" }}>
      {children}
    </div>
  );
}

/* ================= Bouton magnétique ================= */

export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const target = el.firstElementChild as HTMLElement | null;
    if (!target) return;
    const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * strength);
      yTo((e.clientY - r.top - r.height / 2) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
