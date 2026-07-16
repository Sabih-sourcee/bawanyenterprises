import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import Button from "@/src/components/ui/Button";
import InfinixParticlesScene from "@/src/components/infinix/InfinixParticlesScene";
import { infinixStoryPage } from "@/src/content/infinixStory";
import { gsap, prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";

interface InfinixStoryPageProps {
  onContact?: () => void;
}

export default function InfinixStoryPage({ onContact }: InfinixStoryPageProps) {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSeries, setActiveSeries] = useState<string>("latest");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      page.querySelectorAll<HTMLElement>("[data-infinix-reveal]").forEach((el, i) => {
        skewUpReveal(el, { trigger: el, delay: i * 0.03 });
      });

      const hero = heroRef.current;
      if (hero) {
        gsap.to(hero.querySelector(".infinix-hero-fade"), {
          opacity: 0.15,
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, page);

    return () => ctx.revert();
  }, []);

  const { brand, products, productsLabel, productsHeadline, seriesTabs, viewAllHref, cta } =
    infinixStoryPage;

  const visibleProducts =
    activeSeries === "latest"
      ? products.filter((p) => p.latest)
      : products.filter((p) => p.series === activeSeries);

  return (
    <article ref={pageRef} className="infinix-story bg-pure-white text-jet-black">
      <header
        ref={heroRef}
        className="infinix-hero relative min-h-[100svh] overflow-hidden bg-pure-white"
      >
        <InfinixParticlesScene />
        <div className="infinix-hero-fade absolute bottom-0 left-0 right-0 z-10 pointer-events-none pb-10 md:pb-14">
          <PageContainer>
            <p className="section-label text-center">{infinixStoryPage.label}</p>
          </PageContainer>
        </div>
      </header>

      {/* One viewport — brand story */}
      <section className="min-h-[100svh] flex items-center border-t border-jet-black/10 section-y">
        <PageContainer>
          <p className="section-label mb-4">{brand.eyebrow}</p>
          <h1
            data-infinix-reveal
            className="font-sans font-bold text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight max-w-4xl mb-8 md:mb-10"
          >
            {brand.headline}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 space-y-5 max-w-2xl">
              {brand.body.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  data-infinix-reveal
                  className="text-body-lg text-on-surface-variant leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-6 md:gap-8 border-t lg:border-t-0 lg:border-l border-jet-black/10 pt-8 lg:pt-0 lg:pl-10">
              {brand.points.map((point) => (
                <div key={point.label}>
                  <p className="text-label-caps text-on-surface-variant mb-1">{point.label}</p>
                  <p
                    data-infinix-reveal
                    className="font-sans font-bold text-xl md:text-2xl text-jet-black"
                  >
                    {point.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Series products */}
      <section className="border-t border-jet-black/10 section-y">
        <PageContainer>
          <p className="section-label mb-4">{productsLabel}</p>
          <h2 data-infinix-reveal className="section-heading mb-8 md:mb-10 max-w-3xl">
            {productsHeadline}
          </h2>

          <div
            className="flex gap-1 overflow-x-auto scroll-bleed mb-8 md:mb-10 pb-1"
            role="tablist"
            aria-label="Infinix series"
          >
            {seriesTabs.map((tab) => {
              const isActive = activeSeries === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSeries(tab.id)}
                  className={`shrink-0 px-3 sm:px-4 py-2 text-sm sm:text-base font-sans font-semibold tracking-wide whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? "text-jet-black border-electric-lime"
                      : "text-on-surface-variant border-transparent hover:text-jet-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            key={activeSeries}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
          >
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col items-center text-center rounded-2xl bg-surface-container-low p-4 sm:p-5 md:p-6"
              >
                <div className="relative w-full aspect-[3/4] max-h-[220px] sm:max-h-[260px] flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-sans font-bold text-sm sm:text-base md:text-lg text-jet-black">
                  {product.name}
                </h3>
              </article>
            ))}

            <a
              href={viewAllHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low p-6 min-h-[200px] sm:min-h-[240px] text-jet-black hover:bg-jet-black hover:text-pure-white transition-colors group"
            >
              <span className="font-sans font-bold text-lg sm:text-xl">
                View All <span className="text-electric-lime group-hover:text-electric-lime">+</span>
              </span>
            </a>
          </div>
        </PageContainer>
      </section>

      <section className="section-y-lg border-t border-jet-black/10 bg-surface-container-low">
        <PageContainer>
          <h2 data-infinix-reveal className="section-heading mb-4 max-w-2xl">
            {cta.headline}
          </h2>
          <p data-infinix-reveal className="text-body-lg text-on-surface-variant max-w-xl mb-10">
            {cta.body}
          </p>
          <div className="flex flex-wrap gap-4">
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
              {cta.button}
            </Button>
            <a
              href="https://www.infinixmobility.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-jet-black/25 text-jet-black hover:bg-jet-black hover:text-pure-white transition-colors"
            >
              Visit Infinix
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </PageContainer>
      </section>
    </article>
  );
}
