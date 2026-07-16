import React, { useEffect, useRef } from "react";
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

      page.querySelectorAll("[data-infinix-product]").forEach((card) => {
        const img = card.querySelector(".infinix-product-img") as HTMLElement | null;
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.04 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const { brand, products, productsLabel, productsHeadline, cta } = infinixStoryPage;

  return (
    <article ref={pageRef} className="infinix-story bg-pure-white text-jet-black">
      {/* Hero — 3D floating title */}
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

      {/* Products */}
      <section className="border-t border-jet-black/10 section-y">
        <PageContainer>
          <p className="section-label mb-4">{productsLabel}</p>
          <h2 data-infinix-reveal className="section-heading mb-12 md:mb-16 max-w-3xl">
            {productsHeadline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {products.map((product, idx) => (
              <article
                key={product.id}
                data-infinix-product
                className={`group overflow-hidden bg-surface-container-low flex flex-col ${
                  idx === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-surface-container w-full ${
                    idx === 0
                      ? "aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="infinix-product-img absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-label-caps bg-pure-white/90 text-jet-black px-2.5 py-1">
                    {product.tag}
                  </span>
                </div>
                <div className="p-5 sm:p-6 md:p-8 flex-1">
                  <p className="text-data-mono text-on-surface-variant mb-1">{product.category}</p>
                  <h3
                    data-infinix-reveal
                    className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-jet-black mb-2"
                  >
                    {product.name}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed max-w-lg">
                    {product.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
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
