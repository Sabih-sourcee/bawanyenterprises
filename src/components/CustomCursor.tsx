import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/src/lib/animations";

const DEFAULT_SRC = "/assets/cursor-default.png?v=1";
const POINTER_SRC = "/assets/cursor-pointer.png?v=1";
const INTERACTIVE =
  "a, button, [href], [data-cursor-grow], [data-work-card], [role='button'], [role='link'], input[type='submit'], input[type='button'], input[type='checkbox'], input[type='radio'], label, select, summary, .cursor-pointer";

function isInteractiveTarget(el: Element | null): boolean {
  if (!el || !(el instanceof Element)) return false;
  return !!el.closest(INTERACTIVE);
}

/**
 * Dual custom cursor:
 * - default arrow  → normal browsing
 * - hand pointer   → links / buttons / interactive controls
 * Rendered as a fixed follower (not CSS `cursor: url()`).
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isPointer = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const img = imgRef.current;
    if (!cursor || !img) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = prefersReducedMotion();
    if (coarse || reduced) {
      cursor.style.display = "none";
      return;
    }

    cursor.style.display = "block";
    document.documentElement.classList.add("has-custom-cursor");

    // Preload both marks to avoid flicker on first hover swap
    [DEFAULT_SRC, POINTER_SRC].forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });

    gsap.set(cursor, { x: -200, y: -200 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.28, ease: "power3.out" });

    const setMode = (pointer: boolean) => {
      if (pointer === isPointer.current) return;
      isPointer.current = pointer;
      img.src = pointer ? POINTER_SRC : DEFAULT_SRC;
      cursor.classList.toggle("is-pointer", pointer);
      gsap.to(cursor, {
        scale: pointer ? 1.05 : 1,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      setMode(isInteractiveTarget(el));
    };

    const onDown = () => gsap.to(cursor, { scale: 0.88, duration: 0.1, ease: "power2.out" });
    const onUp = () =>
      gsap.to(cursor, {
        scale: isPointer.current ? 1.05 : 1,
        duration: 0.15,
        ease: "power2.out",
      });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden style={{ display: "none" }}>
      <img
        ref={imgRef}
        className="custom-cursor__mark"
        src={DEFAULT_SRC}
        alt=""
        draggable={false}
        width={28}
        height={28}
      />
    </div>
  );
}
