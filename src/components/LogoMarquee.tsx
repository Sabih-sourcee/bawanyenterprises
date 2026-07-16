import React, { useEffect, useRef } from "react";
import { groupPage } from "@/src/content/brand";
import { gsap, prefersReducedMotion } from "@/src/lib/animations";

const brands = groupPage.companies.map((c) => ({
  id: c.id,
  name: c.name,
  label: c.name.replace(/\s+Technology$/, ""),
  logo: c.logo,
  href: c.href,
}));

type Brand = (typeof brands)[number];

const LOOP_DURATION = 25;

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <a
      href={brand.href}
      target="_blank"
      rel="noopener noreferrer"
      className="brand-marquee-item"
      data-brand-item
      aria-label={`Visit ${brand.name}`}
    >
      <span className="brand-marquee-slot">
        <span className="brand-marquee-text" data-brand-text>
          {brand.label}
        </span>
        <img
          src={brand.logo}
          alt=""
          className="brand-marquee-logo"
          data-brand-logo
          draggable={false}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </span>
    </a>
  );
}

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...brands, ...brands];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemEls = Array.from(
      track.querySelectorAll("[data-brand-item]")
    ) as HTMLElement[];

    const setIdle = (el: HTMLElement, immediate = false) => {
      const text = el.querySelector<HTMLElement>("[data-brand-text]");
      const logo = el.querySelector<HTMLElement>("[data-brand-logo]");
      if (!text || !logo) return;

      gsap.killTweensOf([text, logo]);
      el.dataset.active = "false";

      if (immediate || prefersReducedMotion()) {
        gsap.set(text, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
        gsap.set(logo, { opacity: 0, scale: 0.88, y: 4 });
        return;
      }

      gsap.to(text, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(logo, {
        opacity: 0,
        scale: 0.88,
        y: 4,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    const setActive = (el: HTMLElement) => {
      const text = el.querySelector<HTMLElement>("[data-brand-text]");
      const logo = el.querySelector<HTMLElement>("[data-brand-logo]");
      if (!text || !logo) return;

      gsap.killTweensOf([text, logo]);
      el.dataset.active = "true";

      if (prefersReducedMotion()) {
        gsap.set(text, { opacity: 0, scale: 0.94, y: -4, filter: "blur(0px)" });
        gsap.set(logo, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.to(text, {
        opacity: 0,
        scale: 0.94,
        y: -4,
        filter: "blur(2px)",
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(logo, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.4)",
      });
    };

    itemEls.forEach((el) => setIdle(el, true));

    const loop = prefersReducedMotion()
      ? null
      : gsap.to(track, {
          xPercent: -50,
          duration: LOOP_DURATION,
          ease: "none",
          repeat: -1,
        });

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      loop?.pause();
      setActive(el);
    };

    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setIdle(el);
      loop?.resume();
    };

    itemEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("focus", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("blur", onLeave);
    });

    return () => {
      loop?.kill();
      itemEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("focus", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("blur", onLeave);
      });
    };
  }, []);

  return (
    <section
      id="brands-section"
      className="brand-marquee py-10 md:py-14 bg-pure-white border-y border-jet-black/10 overflow-hidden"
      aria-label="Our brands"
    >
      <div
        ref={trackRef}
        className="brand-marquee-track flex w-max items-center will-change-transform"
      >
        {items.map((brand, idx) => (
          <React.Fragment key={`${brand.id}-${idx}`}>
            <BrandItem brand={brand} />
            <span className="brand-marquee-sep" aria-hidden />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
