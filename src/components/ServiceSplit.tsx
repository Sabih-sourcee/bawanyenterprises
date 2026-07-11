import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  skewUpReveal,
  staggerReveal,
} from "@/src/lib/animations";
import { serviceTabs } from "@/src/content/sections";
import PageContainer from "@/src/components/layout/PageContainer";

export default function ServiceSplit() {
  const trackRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const scrubTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const row = rowRef.current;
    const strip = stripRef.current;
    if (!track || !row || !strip) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) skewUpReveal(headingRef.current, { trigger: track });
      if (introRef.current) {
        introRef.current.querySelectorAll<HTMLElement>("[data-services-line]").forEach((el, i) => {
          skewUpReveal(el, { trigger: track, delay: i * 0.12 });
        });
      }

      if (dotRef.current) {
        gsap.from(dotRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.55,
          ease: "back.out(2.5)",
          delay: 0.5,
          scrollTrigger: {
            trigger: track,
            start: "top 75%",
            once: true,
            scroller: document.documentElement,
          },
        });
      }

      staggerReveal(row.querySelectorAll("[data-service-card]"), {
        trigger: track,
        start: "top 72%",
        stagger: 0.09,
      });

      const setupScrub = () => {
        scrubTween.current?.kill();
        ScrollTrigger.getById("services-scrub")?.kill();
        gsap.set(row, { marginLeft: 0 });

        if (!window.matchMedia("(min-width: 1024px)").matches) return;

        const getX = () => {
          const overflow = row.scrollWidth - strip.clientWidth;
          return -(overflow > 0 ? overflow : 0);
        };

        scrubTween.current = gsap.to(row, {
          marginLeft: getX,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            scroller: document.documentElement,
            id: "services-scrub",
          },
        });
      };

      setupScrub();
      window.addEventListener("resize", setupScrub);
      return () => window.removeEventListener("resize", setupScrub);
    }, track);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      scrubTween.current?.kill();
      ScrollTrigger.getById("services-scrub")?.kill();
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="services-section"
      className="services-track relative bg-surface border-t border-jet-black/10"
    >
      <div className="services-sticky bg-surface section-y lg:py-0 lg:min-h-screen lg:flex lg:flex-col">
        <div className="services-green-gradient absolute inset-0 pointer-events-none z-0" aria-hidden />

        {/* Headline — aligned with every other section */}
        <PageContainer className="relative z-10 lg:pt-20 xl:pt-24">
          <h2 ref={headingRef} className="section-heading lg:max-w-[65%] xl:max-w-[60%]">
            We&apos;re an infrastructure &amp; technology group making partners scale with
            confidence.
          </h2>
          <span
            ref={dotRef}
            className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 bg-electric-lime rounded-full mt-4 md:mt-6"
            aria-hidden
          />
        </PageContainer>

        {/* Cards — full viewport width; mobile swipe, desktop scrub */}
        <div className="relative z-10 mt-8 lg:mt-0 lg:absolute lg:inset-x-0 lg:top-[34%] lg:bottom-28 xl:bottom-32">
          <div ref={stripRef} className="scroll-bleed services-strip-inset lg:!m-0 lg:overflow-x-clip">
            <div ref={rowRef} className="flex gap-3 md:gap-[14px] w-max pb-1 services-row-pad">
              {serviceTabs.map((tab) => (
                <article
                  key={tab.id}
                  data-service-card
                  className="scroll-snap-start buzz-card-round buzz-glass-card shrink-0 flex flex-col text-jet-black border border-jet-black/20 w-[82vw] max-w-[340px] sm:max-w-[360px] lg:w-[400px] xl:w-[440px] p-7 md:p-9 lg:p-10 xl:p-12 min-h-[340px] lg:min-h-[400px] xl:min-h-[420px]"
                >
                  <h3 className="font-sans font-bold text-[clamp(1.5rem,3vw,2.5rem)] tracking-tight leading-tight mb-6 md:mb-8 lg:mb-10">
                    {tab.title}
                  </h3>
                  <ul className="flex flex-col gap-0.5 mt-auto">
                    {tab.links.slice(0, 5).map((link) => (
                      <li key={link}>
                        <a
                          href="#contact-form-section"
                          className="group flex items-center justify-between gap-4 py-2.5 text-[15px] md:text-base text-jet-black hover:text-secondary transition-colors"
                        >
                          <span>{link}</span>
                          <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copy — aligned with page grid */}
        <PageContainer className="relative z-10 mt-10 md:mt-12 lg:mt-0 lg:absolute lg:bottom-10 xl:bottom-14">
          <div ref={introRef} className="max-w-sm">
            <p
              data-services-line
              className="text-[15px] md:text-base font-medium text-jet-black leading-snug mb-3"
            >
              Honest pricing. Smart engineering. Real distribution results.
            </p>
            <p
              data-services-line
              className="text-[15px] md:text-base text-on-surface-variant leading-snug"
            >
              You bring the vision. We&apos;ll wire it into reality.
            </p>
          </div>
        </PageContainer>
      </div>
    </section>
  );
}
