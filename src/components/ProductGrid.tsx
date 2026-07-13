import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import { workItems } from "@/src/content/sections";
import { skewUpReveal } from "@/src/lib/animations";

/* Buzz "Selected Work" mechanics:
   - Heading revealed with skew-up word animation.
   - Cards fade in; on hover, tag chips slide in from translateX(100%)
     with stagger, and the title pill expands from width 0. */

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

        {/* Buzz masonry: wide + two halves + wide */}
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
              <div
                className={`relative overflow-hidden bg-jet-black/5 ${
                  item.layout === "wide" ? "aspect-[21/9]" : "aspect-square"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})`, backgroundColor: "#e8e8e8" }}
                />

                {/* Buzz _w-chip: slide in from right with stagger on hover */}
                <div className="absolute top-4 right-4 md:top-5 md:right-5 flex flex-col items-end gap-2 overflow-hidden">
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

                {/* Buzz _w-title-wrap: pill expands from width 0 on hover */}
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                  <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden">
                      <span className="block whitespace-nowrap bg-pure-white/95 text-jet-black text-sm md:text-base font-bold px-4 py-2 buzz-card-round-sm">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

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
