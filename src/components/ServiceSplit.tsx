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
      id="built-on"
      className="relative bg-surface border-t border-jet-black/10 section-y"
    >
      <div className="services-blob" aria-hidden />

      <PageContainer className="relative z-10 mb-10 md:mb-14">
        <p className="section-label mb-4">What We&apos;re Built On</p>
        <h2 ref={headingRef} className="services-headline">
          <span ref={dotRef} className="services-dot" aria-hidden />
          Different chapters. Same standard.
        </h2>

        <div ref={introRef} className="services-intro relative z-10">
          <p data-services-line>
            From accessories to Infinix, lighting, and energy — every step earned.
          </p>
        </div>
      </PageContainer>

      <div className="divisions-grid relative z-[5]">
        {serviceTabs.map((tab) => (
          <article key={tab.id} data-service-card className="divisions-card">
            <span className="services-card-title">{tab.title}</span>
            <p className="text-body-md text-on-surface-variant mt-4 mb-6 leading-relaxed max-w-md mx-auto">
              {tab.headline}
            </p>
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
