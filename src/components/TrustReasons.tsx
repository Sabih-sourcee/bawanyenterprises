import React, { useEffect, useRef } from "react";
import { prefersReducedMotion, skewUpReveal, staggerReveal } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import { trustReasons } from "@/src/content/brand";

export default function TrustReasons() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    const heading = sectionRef.current.querySelector<HTMLElement>("[data-trust-h]");
    if (heading) skewUpReveal(heading, { trigger: sectionRef.current });
    if (gridRef.current) {
      staggerReveal(gridRef.current.querySelectorAll("[data-trust-card]"), {
        trigger: sectionRef.current,
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust-section"
      className="section-y bg-surface border-t border-jet-black/10"
    >
      <PageContainer>
        <p className="section-label mb-4">Why People Stick With Us</p>
        <h2 data-trust-h className="section-heading mb-10 md:mb-14 max-w-3xl">
          Almost thirty years. Same principles. Still growing.
        </h2>

        {/* Same card language as Selected Work — buzz-card-round, not pill radius */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {trustReasons.map((item) => (
            <article
              key={item.title}
              data-trust-card
              data-cursor-grow
              className="group buzz-card-round overflow-hidden bg-chalk-white border border-jet-black/10 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-jet-black/5">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-lime/25 via-transparent to-jet-black/5" />
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                  <span className="inline-block bg-pure-white/95 text-jet-black text-sm md:text-base font-bold px-4 py-2 buzz-card-round-sm">
                    {item.title}
                  </span>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-sans font-bold text-lg md:text-xl text-jet-black group-hover:underline decoration-electric-lime underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
