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

        <ol className="relative border-l border-jet-black/20 ml-3 md:ml-4 mb-16 md:mb-24 space-y-10 md:space-y-12">
          {aboutPage.timeline.map((item) => (
            <li key={item.year} data-about-reveal className="pl-8 md:pl-10 relative">
              <span className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-[calc(50%+0.5px)] bg-electric-lime border border-jet-black" />
              <p className="text-data-mono text-on-surface-variant mb-1">{item.year}</p>
              <h3 className="font-sans font-bold text-xl md:text-2xl text-jet-black mb-2">
                {item.title}
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="section-label mb-4">{aboutPage.whyLabel}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
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
