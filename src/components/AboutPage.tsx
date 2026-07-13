import React, { useEffect, useRef } from "react";
import { prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import Button from "@/src/components/ui/Button";
import { aboutPage } from "@/src/content/brand";

interface AboutPageProps {
  onContact?: () => void;
}

export default function AboutPage({ onContact }: AboutPageProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    sectionRef.current
      .querySelectorAll<HTMLElement>("[data-about-reveal]")
      .forEach((el, i) => skewUpReveal(el, { delay: i * 0.05 }));
  }, []);

  return (
    <section ref={sectionRef} className="hero-offset section-y-lg bg-surface min-h-screen">
      <PageContainer>
        <p className="section-label mb-4">About Us</p>
        <h1 data-about-reveal className="section-heading mb-8 md:mb-12 max-w-4xl">
          {aboutPage.headline}
        </h1>

        <div className="max-w-3xl space-y-6 mb-16 md:mb-24">
          {aboutPage.intro.map((p) => (
            <p
              key={p.slice(0, 40)}
              data-about-reveal
              className="text-body-lg text-on-surface-variant leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 md:mb-24">
          <div data-about-reveal>
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-jet-black mb-4">
              {aboutPage.mission.title}
            </h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {aboutPage.mission.body}
            </p>
          </div>
          <div data-about-reveal>
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-jet-black mb-4">
              {aboutPage.vision.title}
            </h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {aboutPage.vision.body}
            </p>
          </div>
        </div>

        <p className="section-label mb-4">What Sets Us Apart</p>
        <h2 data-about-reveal className="section-heading mb-10 md:mb-14 max-w-3xl">
          The harder path. Proper process. Products people rely on.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {aboutPage.differentiators.map((item) => (
            <article
              key={item.title}
              data-about-reveal
              className="border border-jet-black/20 p-6 md:p-8 buzz-card-round-sm"
            >
              <h3 className="font-sans font-bold text-xl md:text-2xl text-jet-black mb-3">
                {item.title}
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <Button
          href="#contact-form-section"
          variant="primary"
          onClick={(e) => {
            if (onContact) {
              e.preventDefault();
              onContact();
            }
          }}
        >
          Contact Us
        </Button>
      </PageContainer>
    </section>
  );
}
