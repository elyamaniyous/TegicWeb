import { getDict } from "@/i18n";
import { ROUTES } from "@/lib/routes";
import { SITE, type Locale } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { Chrome } from "@/components/Chrome";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionHead } from "@/components/Sections";
import { CountUp } from "@/components/CountUp";

export function QuoteView({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const q = dict.quote;

  return (
    <Chrome locale={locale} solidHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.home, url: ROUTES.home[locale] },
          { name: dict.nav.quote, url: ROUTES.quote[locale] },
        ])}
      />

      <section className="section section--paper" style={{ paddingTop: "calc(76px + clamp(3rem, 6vw, 5rem))" }}>
        <div className="container quote-grid">
          <div>
            <SectionHead eyebrow={q.eyebrow} title={q.h1} lead={q.intro} />
            <div data-reveal>
              <QuoteForm dict={q} locale={locale} />
            </div>
          </div>

          <aside className="quote-aside" data-reveal>
            <div className="statgrid" style={{ gridTemplateColumns: "1fr" }}>
              {dict.ta.heroStats.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat__value"><CountUp value={s.value} /></span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="flow__row" style={{ background: "var(--g900)" }}>
              <span className="flow__label">{dict.contact.emailTitle}</span>
              <a href={`mailto:${SITE.email}`} style={{ color: "var(--g300)", fontWeight: 600 }}>{SITE.email}</a>
            </div>
            <p className="mono" style={{ color: "var(--g600)" }}>◆ {dict.contact.hoursNote}</p>
          </aside>
        </div>
      </section>
    </Chrome>
  );
}
