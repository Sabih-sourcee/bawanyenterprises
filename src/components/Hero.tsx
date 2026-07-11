import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import { brand } from "@/src/content/brand";
import { heroPhrases } from "@/src/content/sections";

/* Buzz hero mechanics:
   1. H1 spans reveal with 3D entrance (split words, y/skew).
   2. Rotating line = vertical word carousel: overflow-hidden mask,
      column of phrases stepped -100% per phrase on a loop.
   3. Showreel = sticky-track (200vh) + sticky video-wrapper whose
      clip-path scrubs from a skewed polygon at 60% width to a
      full-bleed rectangle at 100vw/100vh. */

const CLIP_START = "polygon(20% 1%, 88% 40%, 99% 99%, 0% 74%)";
const CLIP_END = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Vertical word carousel — Buzz .ticker-inner */
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker || prefersReducedMotion()) return;

    const items = ticker.children;
    const count = heroPhrases.length; // last item is a duplicate of the first
    const tl = gsap.timeline({ repeat: -1 });

    for (let i = 1; i <= count; i++) {
      tl.to(items, {
        yPercent: -100 * i,
        duration: 0.7,
        ease: "power3.inOut",
        delay: 1.6,
      });
    }
    tl.set(items, { yPercent: 0 });

    return () => {
      tl.kill();
    };
  }, []);

  /* Headline split reveal + clip-path scrub */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const track = trackRef.current;
    const headline = headlineRef.current;
    const videoWrapper = videoWrapperRef.current;
    const overlay = overlayRef.current;
    if (!track || !headline || !videoWrapper) return;

    const ctx = gsap.context(() => {
      import("split-type").then(({ default: SplitType }) => {
        const lead = headline.querySelector("[data-hero-lead]");
        if (lead) {
          const split = new SplitType(lead as HTMLElement, { types: "words" });
          gsap.from(split.words, {
            yPercent: 100,
            skewX: -6,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
            delay: 0.2,
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          scroller: document.documentElement,
          id: "hero-clip",
        },
      });

      tl.fromTo(
        videoWrapper,
        { clipPath: CLIP_START, width: "60%", height: "60vh" },
        { clipPath: CLIP_END, width: "100%", height: "100vh", ease: "none" },
        0
      );

      if (overlay) {
        tl.fromTo(
          overlay,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "none" },
          0.55
        );
      }
    }, track);

    return () => {
      ctx.revert();
      ScrollTrigger.getById("hero-clip")?.kill();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div id="hero-section" className="relative bg-surface">
      {/* Headline block */}
      <div className="hero-offset pb-4 md:pb-6">
        <PageContainer>
          <h1
            ref={headlineRef}
            className="font-sans font-bold text-jet-black tracking-tight"
          >
            <span
              data-hero-lead
              className="block text-[clamp(2.5rem,8.5vw,7rem)] leading-[1.02] overflow-hidden"
            >
              {brand.heroHeadlineLead}
            </span>

            {/* Buzz hero-ticker-wrap: overflow-hidden mask, one line tall */}
            <span className="block overflow-hidden h-[1.06em] text-[clamp(2.5rem,8.5vw,7rem)] leading-[1.02]">
              <span ref={tickerRef} className="flex flex-col">
                {[...heroPhrases, heroPhrases[0]].map((phrase, i) => (
                  <span key={`${phrase}-${i}`} className="block will-change-transform">
                    {phrase}
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </PageContainer>
      </div>

      {/* Buzz sticky-track: 200vh scroll distance, sticky video inside */}
      <div ref={trackRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-start justify-center overflow-hidden">
          <div
            ref={videoWrapperRef}
            className="relative bg-jet-black will-change-[clip-path,width,height]"
            style={{
              clipPath: CLIP_START,
              width: "60%",
              height: "60vh",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/assets/showreel.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-jet-black/20 pointer-events-none" />

            {/* Quote overlay reveals at end of clip scrub */}
            <p
              ref={overlayRef}
              className="absolute inset-0 flex items-center justify-center text-center px-[var(--page-pad)] font-serif text-[clamp(1.5rem,4vw,3.5rem)] text-pure-white leading-tight opacity-0"
            >
              {brand.heroOverlayQuote}
            </p>

            <button
              onClick={toggleMute}
              className="absolute bottom-5 right-5 w-12 h-12 md:w-14 md:h-14 bg-pure-white/90 text-jet-black flex items-center justify-center hover:bg-electric-lime transition-colors cursor-pointer z-10 buzz-card-round-sm"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
