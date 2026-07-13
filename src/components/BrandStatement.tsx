import React, { useEffect, useRef } from "react";
import { prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import { whoWeAre } from "@/src/content/brand";

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    sectionRef.current
      .querySelectorAll<HTMLElement>("[data-about-p], [data-about-h]")
      .forEach((el) => skewUpReveal(el));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="section-y-lg bg-surface border-t border-jet-black/10"
    >
      <PageContainer>
        <p className="section-label mb-4">{whoWeAre.label}</p>
        <h2 data-about-h className="section-heading mb-10 md:mb-14 max-w-4xl">
          Official importer. Genuine devices. Fully PTA approved.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl">
          {whoWeAre.paragraphs.map((p) => (
            <p
              key={p.slice(0, 32)}
              data-about-p
              className="text-body-lg text-on-surface-variant leading-relaxed lg:col-span-2"
            >
              {p}
            </p>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
