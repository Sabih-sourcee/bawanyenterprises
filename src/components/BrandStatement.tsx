import React, { useEffect, useRef } from "react";
import { prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import { brand } from "@/src/content/brand";

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    // Buzz data-skew-up word reveal on heading + paragraphs
    sectionRef.current
      .querySelectorAll<HTMLElement>("[data-about-p], [data-about-h]")
      .forEach((el) => skewUpReveal(el));
  }, []);

  return (
    <section ref={sectionRef} id="about-section" className="section-y-lg bg-surface border-t border-jet-black/10">
      <PageContainer>
        <p className="section-label mb-4">About us</p>
        <h2 data-about-h className="section-heading mb-10 md:mb-14 max-w-4xl">
          The team behind your infrastructure &amp; technology growth.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl">
          <p data-about-p className="text-body-lg text-on-surface-variant leading-relaxed">
            We&apos;re not just a distribution company — we&apos;re the people who get excited about
            powering homes, retailers, and enterprises with energy, lighting, and connectivity that
            lasts.
          </p>
          <p data-about-p className="text-body-lg text-on-surface-variant leading-relaxed">
            {brand.mission}
          </p>
          <p data-about-p className="text-body-lg text-on-surface-variant leading-relaxed lg:col-span-2">
            Why? Because we turn bold ideas into dependable infrastructure that actually works. From
            solar arrays and lithium storage to nationwide mobile distribution and commercial LED —
            we deliver results. We&apos;re the crew you call when you want your business to scale without
            compromise.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
