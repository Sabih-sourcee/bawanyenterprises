import React, { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/src/lib/animations";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = prefersReducedMotion();
    if (coarse || reduced) return;

    setActive(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.06, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
    };

    const grow = () => gsap.to(ring, { scale: 2.2, borderColor: "#64ff00", duration: 0.2 });
    const shrink = () => gsap.to(ring, { scale: 1, borderColor: "#000000", duration: 0.2 });

    window.addEventListener("mousemove", move);
    const interactives = document.querySelectorAll("a, button, [data-cursor-grow]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-electric-lime pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-jet-black pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
    </>
  );
}
