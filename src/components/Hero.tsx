import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/src/lib/animations";
import PageContainer from "@/src/components/layout/PageContainer";
import Button from "@/src/components/ui/Button";
import { brand } from "@/src/content/brand";

const CLIP_START = "polygon(20% 1%, 88% 40%, 99% 99%, 0% 74%)";
const CLIP_END = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
            stagger: 0.06,
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
          invalidateOnRefresh: true,
          scroller: document.documentElement,
        },
      });

      tl.fromTo(
        videoWrapper,
        { clipPath: CLIP_START, width: "60%", height: "60vh" },
        { clipPath: CLIP_END, width: "100%", height: "100vh", ease: "none" },
        0,
      );

      if (overlay) {
        tl.to(overlay, { opacity: 1, duration: 0.25, ease: "none" }, 0.7);
      }
    }, track);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === track) st.kill();
      });
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div id="home" className="relative bg-surface">
      <div className="hero-offset pb-8 md:pb-12">
        <PageContainer>
          <h1
            ref={headlineRef}
            className="font-sans font-bold text-jet-black tracking-tight max-w-5xl"
          >
            <span
              data-hero-lead
              className="block text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.05] overflow-hidden"
            >
              {brand.heroHeadline}
            </span>
          </h1>

          <p className="mt-6 md:mt-8 max-w-2xl text-body-lg text-on-surface-variant leading-relaxed">
            {brand.heroSubhead}
          </p>

          <div className="mt-8 md:mt-10">
            <Button href="#about-section" variant="primary">
              {brand.heroCta}
            </Button>
          </div>
        </PageContainer>
      </div>

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
