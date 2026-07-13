import React, { useEffect, useRef } from "react";
import { prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";
import { serviceTabs } from "@/src/content/sections";
import PageContainer from "@/src/components/layout/PageContainer";

export default function ServiceSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    if (headingRef.current) skewUpReveal(headingRef.current, { trigger: section });
    if (introRef.current) {
      introRef.current.querySelectorAll<HTMLElement>("[data-services-line]").forEach((el, i) => {
        skewUpReveal(el, { trigger: section, delay: i * 0.12 });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="divisions-section"
      className="relative bg-surface border-t border-jet-black/10 section-y"
    >
      <div className="services-blob" aria-hidden />

      <PageContainer className="relative z-10 mb-10 md:mb-14">
        <h2 ref={headingRef} className="services-headline">
          <span ref={dotRef} className="services-dot" aria-hidden />
          We&apos;re Pakistan&apos;s official mobile importer — two divisions, one promise of
          authenticity.
        </h2>

        <div ref={introRef} className="services-intro relative z-10">
          <p data-services-line>
            Honest imports. PTA approved. Warranty that means something.
          </p>
          <p data-services-line>
            You bring the demand. We&apos;ll keep the supply genuine.
          </p>
        </div>
      </PageContainer>

      {/* Full-bleed 50/50 cards — no scroll scrub */}
      <div className="divisions-grid relative z-[5]">
        {serviceTabs.map((tab) => (
          <article key={tab.id} data-service-card className="divisions-card">
            <span className="services-card-title">{tab.title}</span>
            <ul className="flex flex-col mt-auto">
              {tab.links.slice(0, 5).map((link) => (
                <li key={link}>
                  <a href="#contact-form-section" className="services-card-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
