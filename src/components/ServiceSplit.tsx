import React, { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  skewUpReveal,
  staggerReveal,
} from "@/src/lib/animations";
import { serviceTabs } from "@/src/content/sections";
import PageContainer from "@/src/components/layout/PageContainer";

function getHorizontalScrollDistance(row: HTMLElement, strip: HTMLElement) {
  const stripWidth = strip.getBoundingClientRect().width;
  const rowWidth = row.scrollWidth;
  return Math.max(0, rowWidth - stripWidth);
}

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

    let resizeObserver: ResizeObserver | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

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

        const distance = getHorizontalScrollDistance(row, strip);
        if (distance <= 0) return;

        scrubTween.current = gsap.to(row, {
          marginLeft: () => -getHorizontalScrollDistance(row, strip),
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

      const scheduleScrubRefresh = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          setupScrub();
          ScrollTrigger.refresh();
        }, 100);
      };

      setupScrub();
      window.addEventListener("resize", scheduleScrubRefresh);

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(scheduleScrubRefresh);
        resizeObserver.observe(strip);
        resizeObserver.observe(row);
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setupScrub();
          ScrollTrigger.refresh();
        });
      });

      return () => {
        window.removeEventListener("resize", scheduleScrubRefresh);
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeObserver?.disconnect();
      };
    }, track);

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
      <div className="services-sticky bg-surface lg:py-0">
        <div className="services-blob" aria-hidden />

        <div className="services-layout">
          <PageContainer className="services-headline-wrap relative z-10">
            <h2 ref={headingRef} className="services-headline">
              <span ref={dotRef} className="services-dot" aria-hidden />
              We&apos;re an infrastructure &amp; technology group making partners scale with
              confidence.
            </h2>

            {/* Caption sits in normal flow above the cards row — never overlaps cards */}
            <div ref={introRef} className="services-intro relative z-10">
              <p data-services-line>
                Honest pricing. Smart engineering. Real distribution results.
              </p>
              <p data-services-line>
                You bring the vision. We&apos;ll wire it into reality.
              </p>
            </div>
          </PageContainer>

          {/* Clipped card track — full-bleed to the right viewport edge */}
          <div className="services-cards-viewport relative z-[5]">
            <div ref={stripRef} className="overflow-x-auto scroll-bleed lg:overflow-x-clip">
              <div ref={rowRef} className="services-cards-row">
                {serviceTabs.map((tab) => (
                  <article key={tab.id} data-service-card className="services-card-buzz scroll-snap-start">
                    <span className="services-card-title">{tab.title}</span>
                    <ul className="flex flex-col">
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
                <div className="services-scroll-spacer hidden lg:block" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
