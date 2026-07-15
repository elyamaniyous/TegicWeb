import { Header } from "./Header";
import { Footer } from "./Footer";
import { getDict } from "@/i18n";
import type { Locale } from "@/lib/site";
import type { ReactNode } from "react";

/** Enveloppe commune : header fixe + contenu + footer, par langue. */
export function Chrome({
  locale,
  children,
  solidHeader = false,
}: {
  locale: Locale;
  children: ReactNode;
  /** Pages démarrant sur fond clair : header en verre sombre dès le départ. */
  solidHeader?: boolean;
}) {
  const dict = getDict(locale);
  return (
    <>
      <a href="#main" className="skip-link">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <Header locale={locale} labels={dict.nav} solid={solidHeader} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
