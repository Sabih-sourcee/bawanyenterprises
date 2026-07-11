import React, { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, refreshScrollTrigger } from "@/src/lib/animations";
import { brand } from "@/src/content/brand";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        refreshScrollTrigger();
        onComplete();
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.floor(obj.val);
        setPercent(v);
        if (counterRef.current) counterRef.current.textContent = `${v}`;
      },
    });

    tl.to(
      panelRef.current,
      {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
      },
      "+=0.15"
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.01,
      },
      "-=0.05"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden={percent >= 100}
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-pure-white text-jet-black flex flex-col items-center justify-center border-b-4 border-jet-black"
      >
        <p className="text-label-caps text-on-surface-variant mb-8 tracking-[0.25em]">
          {brand.name}
        </p>
        <div className="flex items-end gap-1 font-sans">
          <span
            ref={counterRef}
            className="text-[clamp(5rem,18vw,11rem)] font-bold leading-none tabular-nums tracking-tighter"
          >
            {percent}
          </span>
          <span className="text-3xl md:text-5xl font-bold text-electric-lime mb-3 md:mb-6">%</span>
        </div>
        <p className="text-label-caps text-on-surface-variant mt-10 opacity-50">
          {brand.tagline}
        </p>
      </div>
    </div>
  );
}
