import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import { groupPage } from "@/src/content/brand";

export default function GroupPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    sectionRef.current
      .querySelectorAll<HTMLElement>("[data-group-reveal]")
      .forEach((el, i) => skewUpReveal(el, { delay: i * 0.04 }));
  }, []);

  return (
    <section ref={sectionRef} className="hero-offset section-y-lg bg-surface min-h-screen">
      <PageContainer>
        <p className="section-label mb-4">{groupPage.label}</p>
        <h1 data-group-reveal className="section-heading mb-8 md:mb-12 max-w-4xl">
          {groupPage.headline}
        </h1>

        <div className="max-w-3xl space-y-6 mb-16 md:mb-24">
          {groupPage.intro.map((p) => (
            <p
              key={p.slice(0, 40)}
              data-group-reveal
              className="text-body-lg text-on-surface-variant leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-col mb-16 md:mb-24">
          {groupPage.companies.map((company) => (
            <article
              key={company.id}
              className="border-t border-jet-black/15 pt-10 md:pt-12 pb-10 md:pb-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
            >
              <div className="md:col-span-4 min-w-0">
                <p className="text-label-caps text-on-surface-variant mb-2">{company.eyebrow}</p>
                <h2
                  data-group-reveal
                  className="font-serif text-2xl md:text-3xl text-jet-black"
                >
                  {company.name}
                </h2>
                {company.logo && (
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 md:mt-6 inline-flex items-center rounded-sm bg-transparent"
                    aria-label={`${company.name} website`}
                  >
                    <img
                      src={`${company.logo}?v=2`}
                      alt={`${company.name} logo`}
                      className="h-12 md:h-14 w-auto max-w-[240px] object-contain object-left"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
              <div className="md:col-span-8 min-w-0">
                <p
                  data-group-reveal
                  className="text-body-lg text-on-surface-variant leading-relaxed max-w-2xl"
                >
                  {company.body}
                </p>
                {company.cta && (
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-data-mono text-jet-black hover:underline underline-offset-4"
                  >
                    {company.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-jet-black pt-10 md:pt-14 max-w-3xl">
          <p className="section-label mb-4">{groupPage.closingLabel}</p>
          <p data-group-reveal className="font-serif text-2xl md:text-3xl text-jet-black leading-snug">
            {groupPage.closing}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
