import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import { workItems } from "@/src/content/sections";
import { gsap, prefersReducedMotion, skewUpReveal } from "@/src/lib/animations";

type WorkItem = (typeof workItems)[number];

function coverRadius(w: number, h: number, x: number, y: number) {
  const dx = Math.max(x, w - x);
  const dy = Math.max(y, h - y);
  return Math.ceil(Math.hypot(dx, dy)) + 8;
}

function WorkCardMedia({ item, wide }: { item: WorkItem; wide: boolean }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const sceneARef = useRef<HTMLDivElement>(null);
  const sceneBRef = useRef<HTMLDivElement>(null);
  const openTl = useRef<gsap.core.Timeline | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  const hoverImage = "hoverImage" in item ? item.hoverImage : undefined;

  useEffect(() => {
    const media = mediaRef.current;
    const sceneB = sceneBRef.current;
    const sceneA = sceneARef.current;
    if (!media || !sceneA) return;

    if (!hoverImage || !sceneB || prefersReducedMotion()) {
      const onEnter = () => gsap.to(sceneA, { scale: 1.05, duration: 0.6, ease: "power2.out" });
      const onLeave = () => gsap.to(sceneA, { scale: 1, duration: 0.5, ease: "power2.out" });
      media.addEventListener("mouseenter", onEnter);
      media.addEventListener("mouseleave", onLeave);
      return () => {
        media.removeEventListener("mouseenter", onEnter);
        media.removeEventListener("mouseleave", onLeave);
      };
    }

    // Single animation only: circle expands from cursor to cover the media
    gsap.set(sceneB, { clipPath: "circle(0px at 50% 50%)", scale: 1.08 });
    gsap.set(sceneA, { scale: 1 });

    const localPoint = (e: MouseEvent) => {
      const r = media.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        w: r.width,
        h: r.height,
      };
    };

    const open = (e: MouseEvent) => {
      openTl.current?.kill();
      const { x, y, w, h } = localPoint(e);
      pointer.current = { x: x / w, y: y / h };
      const r = coverRadius(w, h, x, y);

      gsap.set(sceneB, { clipPath: `circle(0px at ${x}px ${y}px)` });

      openTl.current = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      openTl.current.to(
        sceneB,
        {
          clipPath: `circle(${r}px at ${x}px ${y}px)`,
          scale: 1,
          duration: 0.9,
        },
        0,
      );
    };

    const close = () => {
      openTl.current?.kill();
      const mediaBox = media.getBoundingClientRect();
      const x = pointer.current.x * mediaBox.width;
      const y = pointer.current.y * mediaBox.height;

      openTl.current = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      openTl.current.to(sceneB, {
        clipPath: `circle(0px at ${x}px ${y}px)`,
        scale: 1.08,
        duration: 0.55,
      });
    };

    media.addEventListener("mouseenter", open);
    media.addEventListener("mouseleave", close);

    return () => {
      openTl.current?.kill();
      media.removeEventListener("mouseenter", open);
      media.removeEventListener("mouseleave", close);
    };
  }, [hoverImage]);

  return (
    <div
      ref={mediaRef}
      className={`work-card-media relative overflow-hidden bg-jet-black/5 ${
        wide ? "aspect-[21/9]" : "aspect-square"
      }`}
    >
      <div
        ref={sceneARef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${item.image})`, backgroundColor: "#e8e8e8" }}
      />

      {hoverImage ? (
        <div
          ref={sceneBRef}
          className="absolute inset-0 bg-cover bg-center will-change-[clip-path,transform]"
          style={{
            backgroundImage: `url(${hoverImage})`,
            clipPath: "circle(0px at 50% 50%)",
          }}
          aria-hidden
        />
      ) : null}

      <div className="absolute top-4 right-4 md:top-5 md:right-5 flex flex-col items-end gap-2 overflow-hidden z-10">
        {item.tags.map((tag, i) => (
          <span
            key={tag}
            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-pure-white/95 text-jet-black buzz-card-round-sm translate-x-[110%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 z-10">
        <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <span className="block whitespace-nowrap bg-pure-white/95 text-jet-black text-sm md:text-base font-bold px-4 py-2 buzz-card-round-sm">
              {item.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;
    skewUpReveal(headingRef.current, { trigger: sectionRef.current });
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="section-y bg-surface">
      <PageContainer>
        <h2 ref={headingRef} className="section-heading mb-10 md:mb-14">
          Selected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {workItems.map((item) => (
            <article
              key={item.id}
              data-work-card
              data-cursor-grow
              className={`group cursor-pointer buzz-card-round overflow-hidden bg-chalk-white ${
                item.layout === "wide" ? "md:col-span-2" : ""
              }`}
            >
              <WorkCardMedia item={item} wide={item.layout === "wide"} />

              <div className="p-5 md:p-6 flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-jet-black group-hover:underline decoration-electric-lime underline-offset-4">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant mt-1">{item.client}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
