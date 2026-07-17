import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/src/lib/animations";

const DEFAULT_SRC = "/assets/cursor-default.png?v=2";
const POINTER_SRC = "/assets/cursor-pointer.png?v=2";
const INTERACTIVE =
  "a, button, [href], [data-cursor-grow], [data-work-card], [role='button'], [role='link'], input[type='submit'], input[type='button'], input[type='checkbox'], input[type='radio'], label, select, summary, .cursor-pointer";

function isInteractiveTarget(el: Element | null): boolean {
  if (!el || !(el instanceof Element)) return false;
  return !!el.closest(INTERACTIVE);
}

/**
 * Dual custom cursor:
 * - outer node  → position only (never scaled)
 * - inner node  → scale / mark swap
 * Keeping them separate prevents scale tweens from wiping x/y.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isPointer = useRef(false);
  const lastTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;
    const img = imgRef.current;
    if (!cursor || !inner || !img) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = prefersReducedMotion();
    if (coarse || reduced) {
      cursor.style.display = "none";
      return;
    }

    cursor.style.display = "block";
    document.documentElement.classList.add("has-custom-cursor");

    [DEFAULT_SRC, POINTER_SRC].forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });

    gsap.set(cursor, { x: -100, y: -100, xPercent: 0, yPercent: 0 });
    gsap.set(inner, { scale: 1 });

    // Light follow — smooth without heavy lag
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });

    const setMode = (pointer: boolean) => {
      if (pointer === isPointer.current) return;
      isPointer.current = pointer;
      img.src = pointer ? POINTER_SRC : DEFAULT_SRC;
      cursor.classList.toggle("is-pointer", pointer);
      gsap.to(inner, {
        scale: pointer ? 1.04 : 1,
        duration: 0.14,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      if (e.target !== lastTarget.current) {
        lastTarget.current = e.target;
        setMode(isInteractiveTarget(e.target as Element | null));
      }
    };

    const onDown = () =>
      gsap.to(inner, {
        scale: 0.92,
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });

    const onUp = () =>
      gsap.to(inner, {
        scale: isPointer.current ? 1.04 : 1,
        duration: 0.12,
        ease: "power3.out",
        overwrite: "auto",
      });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden style={{ display: "none" }}>
      <div ref={innerRef} className="custom-cursor__inner">
        <img
          ref={imgRef}
          className="custom-cursor__mark"
          src={DEFAULT_SRC}
          alt=""
          draggable={false}
          width={28}
          height={28}
          onError={(e) => {
            // Fallback if default asset fails to load
            const el = e.currentTarget;
            if (!el.dataset.fallback) {
              el.dataset.fallback = "1";
              el.src = "/assets/cursor.png";
            }
          }}
        />
      </div>
    </div>
  );
}
