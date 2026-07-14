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
    // Only run on leaf text nodes — never on wrappers with nested markup
    sectionRef.current
      .querySelectorAll<HTMLElement>("[data-about-reveal]")
      .forEach((el, i) => skewUpReveal(el, { delay: i * 0.04 }));
  }, []);

  return (
    <section ref={sectionRef} className="hero-offset section-y-lg bg-surface min-h-screen">
      <PageContainer>
        <p className="section-label mb-4">{aboutPage.label}</p>
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

        <p className="section-label mb-4">{aboutPage.timelineLabel}</p>
        <h2 data-about-reveal className="section-heading mb-10 md:mb-14 max-w-3xl">
          From a phone in someone&apos;s hand to a group that lights, powers, and connects.
        </h2>

        <ol className="relative mb-16 md:mb-24 ml-2 md:ml-3 border-l border-jet-black/20">
          {aboutPage.timeline.map((item) => (
            <li key={item.year} className="relative pl-8 md:pl-10 pb-10 md:pb-12 last:pb-0">
              <span
                className="absolute top-1.5 left-0 w-2.5 h-2.5 -translate-x-1/2 bg-electric-lime border border-jet-black"
                aria-hidden
              />
              <div className="flex flex-col gap-1.5 md:gap-2 max-w-2xl">
                <span className="text-data-mono text-on-surface-variant">{item.year}</span>
                <h3
                  data-about-reveal
                  className="font-sans font-bold text-xl md:text-2xl text-jet-black leading-snug"
                >
                  {item.title}
                </h3>
                <p
                  data-about-reveal
                  className="text-body-md text-on-surface-variant leading-relaxed"
                >
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="section-label mb-4">{aboutPage.whyLabel}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div>
            <h2
              data-about-reveal
              className="font-sans font-bold text-2xl md:text-3xl text-jet-black mb-4"
            >
              {aboutPage.mission.title}
            </h2>
            <p
              data-about-reveal
              className="text-body-lg text-on-surface-variant leading-relaxed"
            >
              {aboutPage.mission.body}
            </p>
          </div>
          <div>
            <h2
              data-about-reveal
              className="font-sans font-bold text-2xl md:text-3xl text-jet-black mb-4"
            >
              {aboutPage.vision.title}
            </h2>
            <p
              data-about-reveal
              className="text-body-lg text-on-surface-variant leading-relaxed"
            >
              {aboutPage.vision.body}
            </p>
          </div>
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
