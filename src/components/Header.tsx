"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TegicWordmark } from "./Logo";
import { ROUTES, alternate, type RouteKey } from "@/lib/routes";
import type { Locale } from "@/lib/site";

type NavLabels = {
  home: string;
  about: string;
  services: string;
  why: string;
  sectors: string;
  contact: string;
  quote: string;
  menuLabel: string;
  langLabel: string;
};

const NAV_KEYS: { key: RouteKey; label: keyof NavLabels }[] = [
  { key: "home", label: "home" },
  { key: "about", label: "about" },
  { key: "services", label: "services" },
  { key: "why", label: "why" },
  { key: "sectors", label: "sectors" },
  { key: "contact", label: "contact" },
];

export function Header({ locale, labels, solid = false }: { locale: Locale; labels: NavLabels; solid?: boolean }) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (key: RouteKey) => {
    const target = ROUTES[key][locale];
    if (key === "home") return pathname === target;
    return pathname.startsWith(target);
  };

  const frPath = alternate(pathname, "fr");
  const enPath = alternate(pathname, "en");

  const langSwitch = (
    <nav className="lang" aria-label={labels.langLabel}>
      <Link href={frPath} data-active={locale === "fr"} lang="fr">FR</Link>
      <span className="sep">/</span>
      <Link href={enPath} data-active={locale === "en"} lang="en">EN</Link>
      <span className="sep">/</span>
      <span className="soon" lang="ar" title="النسخة العربية — قريباً">AR</span>
    </nav>
  );

  return (
    <>
      <header className="hdr" data-scrolled={solid || scrolled || open}>
        <div className="container hdr__inner">
          <Link href={ROUTES.home[locale]} className="hdr__logo" aria-label="Tegic Logistique — accueil">
            <TegicWordmark height={26} />
          </Link>

          <nav className="hdr__nav" aria-label={labels.menuLabel}>
            {NAV_KEYS.filter((n) => n.key !== "home").map((n) => (
              <Link key={n.key} href={ROUTES[n.key][locale]} className="hdr__link" data-active={isActive(n.key)}>
                {labels[n.label]}
              </Link>
            ))}
          </nav>

          <div className="hdr__right">
            {langSwitch}
            <Link href={ROUTES.quote[locale]} className="btn btn--cta">
              <span>{labels.quote}</span>
            </Link>
            <button
              className="burger"
              aria-expanded={open}
              aria-label={labels.menuLabel}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className="mnav" data-open={open}>
        <nav className="mnav__list" aria-label={labels.menuLabel}>
          {NAV_KEYS.map((n) => (
            <Link key={n.key} href={ROUTES[n.key][locale]}>
              {labels[n.label]}
              <span aria-hidden style={{ color: "var(--g300)" }}>→</span>
            </Link>
          ))}
        </nav>
        <div className="mnav__cta">
          <Link href={ROUTES.quote[locale]} className="btn btn--green btn--lg" style={{ justifyContent: "center" }}>
            <span>{labels.quote}</span>
          </Link>
        </div>
        {langSwitch}
      </div>
    </>
  );
}
