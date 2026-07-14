import React, { useEffect, useRef } from "react";
import { Heart, Network } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import { buzzStats } from "@/src/content/sections";
import { gsap, prefersReducedMotion } from "@/src/lib/animations";

function StatIcon({ type }: { type?: string }) {
  if (type === "heart") {
    return <Heart className="w-14 h-14 md:w-20 md:h-20 text-electric-lime" strokeWidth={1} />;
  }
  if (type === "network") {
    return <Network className="w-14 h-14 md:w-20 md:h-20 text-electric-lime" strokeWidth={1} />;
  }
  return null;
}

export default function BentoStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current || prefersReducedMotion()) return;

    gridRef.current.querySelectorAll("[data-stat-value]").forEach((el) => {
      const node = el as HTMLElement;
      const target = parseFloat(node.dataset.target || "0");
      const suffix = node.dataset.suffix || "";
      if (node.dataset.word === "true" || !Number.isFinite(target)) return;

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
          node.textContent = `${Math.floor(obj.val)}${suffix}`;
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-y bg-surface">
      <PageContainer>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {buzzStats.map((stat) => (
            <div
              key={stat.id}
              data-stat-card
              className={`buzz-card-round p-5 md:p-8 flex flex-col gap-3 md:gap-4 min-h-0 ${stat.span} ${
                stat.variant === "accent"
                  ? "bg-electric-lime text-jet-black"
                  : stat.variant === "dark" || stat.icon
                    ? "bg-jet-black text-pure-white items-center justify-center text-center min-h-[140px] md:min-h-[180px]"
                    : "bg-chalk-white text-jet-black border border-jet-black/10"
              }`}
            >
              {stat.icon ? (
                <StatIcon type={stat.icon} />
              ) : (
                <>
                  {stat.value ? (
                    <p
                      className={`font-sans font-bold tracking-tight leading-none ${
                        stat.large
                          ? "text-[clamp(2.5rem,10vw,5rem)]"
                          : "text-[clamp(2rem,8vw,3.5rem)]"
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
                  {stat.label ? (
                    <p
                      className={`leading-snug text-sm md:text-base ${
                        stat.variant === "accent" ? "text-jet-black/80" : "text-on-surface-variant"
                      }`}
                    >
                      {stat.label}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
