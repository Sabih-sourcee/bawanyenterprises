import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/src/lib/animations";

/**
 * Hand-pointer cursor graphic (assets/cursor.png).
 * Fixed UI follower — not CSS `cursor: url()`.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = prefersReducedMotion();
    if (coarse || reduced) {
      cursor.style.display = "none";
      return;
    }

    cursor.style.display = "block";
    document.documentElement.classList.add("has-custom-cursor");

    gsap.set(cursor, { x: -200, y: -200 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const grow = () => gsap.to(cursor, { scale: 1.2, duration: 0.25, ease: "power2.out" });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });
    const onDown = () => gsap.to(cursor, { scale: 0.88, duration: 0.12, ease: "power2.out" });
    const onUp = () => gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.("a, button, [data-cursor-grow], input, select, textarea, label")) {
        grow();
      }
    };
    const onLeave = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.("a, button, [data-cursor-grow], input, select, textarea, label")) {
        shrink();
      }
    };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden style={{ display: "none" }}>
      <img
        className="custom-cursor__mark"
        src="/assets/cursor.png?v=4"
        alt=""
        draggable={false}
        width={44}
        height={46}
      />
    </div>
  );
}
