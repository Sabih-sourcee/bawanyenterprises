import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const defaultEase = "power3.out";

export function staggerReveal(
  elements: gsap.TweenTarget,
  options?: { trigger?: Element | string | gsap.DOMTarget; start?: string; stagger?: number }
) {
  const targets = gsap.utils.toArray(elements) as HTMLElement[];
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  const triggerEl = (options?.trigger ?? targets[0]) as Element;
  const start = options?.start ?? "top 85%";

  gsap.set(targets, { opacity: 0, y: 60 });

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: options?.stagger ?? 0.12,
    ease: defaultEase,
    overwrite: "auto",
    scrollTrigger: {
      trigger: triggerEl,
      start,
      once: true,
      scroller: document.documentElement,
    },
  });

  // If section is already on screen when triggers initialize, show content now
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    const rect = triggerEl.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      gsap.set(targets, { opacity: 1, y: 0 });
    }
  });
}

export function scrubCounter(
  element: HTMLElement,
  target: number,
  options?: { trigger?: Element; suffix?: string; scrub?: boolean }
) {
  if (prefersReducedMotion()) {
    element.textContent = `${target.toLocaleString()}${options?.suffix ?? ""}`;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    ease: options?.scrub ? "none" : "power2.out",
    scrollTrigger: {
      trigger: options?.trigger ?? element,
      start: "top 85%",
      end: options?.scrub ? "top 40%" : undefined,
      scrub: options?.scrub ? 1 : false,
      once: !options?.scrub,
    },
    onUpdate: () => {
      element.textContent = `${Math.floor(obj.val).toLocaleString()}${options?.suffix ?? ""}`;
    },
  });
}

export function splitTextReveal(
  element: HTMLElement,
  options?: { trigger?: Element; scrub?: boolean; splitBy?: "lines" | "words" | "chars" }
) {
  if (prefersReducedMotion()) return;

  import("split-type").then(({ default: SplitType }) => {
    const types =
      options?.splitBy === "chars"
        ? "chars"
        : options?.splitBy === "lines"
          ? "lines"
          : "lines,words";
    const split = new SplitType(element, { types });
    const targets =
      options?.splitBy === "chars"
        ? split.chars
        : options?.splitBy === "lines"
          ? split.lines
          : split.words;

    gsap.from(targets, {
      opacity: 0,
      y: options?.splitBy === "chars" ? 50 : 30,
      rotateX: options?.splitBy === "chars" ? -30 : 0,
      duration: options?.scrub ? undefined : 0.6,
      stagger: options?.splitBy === "chars" ? 0.015 : 0.04,
      ease: defaultEase,
      scrollTrigger: {
        trigger: options?.trigger ?? element,
        start: "top 80%",
        end: options?.scrub ? "bottom 40%" : undefined,
        scrub: options?.scrub ? 1 : false,
        once: !options?.scrub,
      },
    });
  });
}

/**
 * Buzz "data-skew-up" reveal: words split into lines, each word starts at
 * translate(0, 100%) skew(-6deg) and reveals to identity on scroll into view.
 */
export function skewUpReveal(
  element: HTMLElement,
  options?: { trigger?: Element; start?: string; delay?: number }
) {
  if (prefersReducedMotion()) return;

  gsap.set(element, { opacity: 1 });

  import("split-type").then(({ default: SplitType }) => {
    const split = new SplitType(element, { types: "lines,words" });
    split.lines?.forEach((line) => {
      line.style.overflow = "hidden";
      line.style.paddingBottom = "0.08em";
      line.style.marginBottom = "-0.08em";
    });

    gsap.fromTo(
      split.words,
      { yPercent: 100, skewX: -6 },
      {
        yPercent: 0,
        skewX: 0,
        duration: 0.9,
        stagger: 0.025,
        ease: "power3.out",
        delay: options?.delay ?? 0,
        scrollTrigger: {
          trigger: options?.trigger ?? element,
          start: options?.start ?? "top 88%",
          once: true,
          scroller: document.documentElement,
          onRefresh() {
            const trigger = (options?.trigger ?? element) as Element;
            const rect = trigger.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88) {
              gsap.set(split.words, { yPercent: 0, skewX: 0 });
            }
          },
        },
      }
    );

    // If already on screen when split completes, show words immediately
    const trigger = (options?.trigger ?? element) as Element;
    if (trigger.getBoundingClientRect().top < window.innerHeight * 0.88) {
      gsap.set(split.words, { yPercent: 0, skewX: 0 });
    }
  });
}

export function horizontalScroll(
  section: HTMLElement,
  track: HTMLElement,
  id: string
) {
  if (prefersReducedMotion()) return;

  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 64);

  const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${track.scrollWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      id,
    },
  });

  return tween;
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
