import React, { useEffect, useRef } from "react";
import { Heart, Network } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import { buzzStats } from "@/src/content/sections";
import { gsap, prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";

function StatIcon({ type }: { type?: string }) {
  if (type === "heart") return <Heart className="w-16 h-16 md:w-24 md:h-24 text-electric-lime" strokeWidth={1} />;
  if (type === "network") return <Network className="w-16 h-16 md:w-24 md:h-24 text-electric-lime" strokeWidth={1} />;
  return null;
}

export default function BentoStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    if (prefersReducedMotion()) return;

    // Buzz: stat labels use data-skew-up; cards stay visible (no fade-in wrapper)
    gridRef.current.querySelectorAll<HTMLElement>("[data-stat-label]").forEach((el) => {
      skewUpReveal(el, { trigger: sectionRef.current! });
    });

    gridRef.current.querySelectorAll("[data-stat-value]").forEach((el) => {
      const target = parseFloat((el as HTMLElement).dataset.target || "0");
      const suffix = (el as HTMLElement).dataset.suffix || "";
      const isWord = (el as HTMLElement).dataset.word === "true";
      if (isWord) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          (el as HTMLElement).textContent = `${Math.floor(obj.val)}${suffix}`;
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-y bg-surface">
      <PageContainer>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-fr"
        >
          {buzzStats.map((stat) => (
            <div
              key={stat.id}
              data-stat-card
              className={`buzz-card-round p-6 md:p-8 flex flex-col justify-between min-h-[180px] md:min-h-[220px] ${stat.span} ${
                stat.variant === "accent"
                  ? "bg-electric-lime text-jet-black"
                  : stat.variant === "dark" || stat.icon
                    ? "bg-jet-black text-pure-white items-center justify-center text-center"
                    : "bg-chalk-white text-jet-black"
              }`}
            >
              {stat.icon ? (
                <StatIcon type={stat.icon} />
              ) : stat.value ? (
                <p
                  className={`font-sans font-bold tracking-tight leading-none ${
                    stat.large ? "text-[clamp(3rem,8vw,5rem)]" : "text-[clamp(2rem,5vw,3.5rem)]"
                  }`}
                >
                  {Number.isFinite(Number(stat.value)) ? (
                    <span data-stat-value data-target={stat.value} data-suffix={stat.suffix}>
                      0{stat.suffix}
                    </span>
                  ) : (
                    <span data-stat-value data-word="true">
                      {stat.value}
                      {stat.suffix}
                    </span>
                  )}
                </p>
              ) : null}
              {stat.label && !stat.icon && (
                <p
                  data-stat-label
                  className={`leading-snug ${
                    stat.value
                      ? "text-sm md:text-base mt-4 " +
                        (stat.variant === "accent" ? "text-jet-black/80" : "text-on-surface-variant")
                      : "text-base md:text-lg font-medium " +
                        (stat.variant === "accent" ? "text-jet-black" : "text-jet-black")
                  }`}
                >
                  {stat.label}
                </p>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
