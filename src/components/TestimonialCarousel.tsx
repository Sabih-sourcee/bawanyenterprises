import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import { testimonials } from "@/src/content/sections";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section id="testimonials-section" className="section-y bg-surface border-t border-jet-black/10">
      <PageContainer>
        <div className="relative min-h-[280px] md:min-h-[240px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.blockquote
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) handleNext();
                else if (info.offset.x > 60) handlePrev();
              }}
              className="max-w-4xl cursor-grab active:cursor-grabbing select-none"
            >
              <p className="font-serif text-[clamp(1.25rem,3vw,2rem)] text-jet-black leading-snug">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <footer className="mt-8">
                <p className="font-sans font-bold text-jet-black">{testimonials[current].author}</p>
                <p className="text-body-md text-on-surface-variant mt-1">{testimonials[current].role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 border border-jet-black/20 flex items-center justify-center hover:bg-jet-black hover:text-pure-white transition-colors cursor-pointer buzz-card-round-sm"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 border border-jet-black/20 flex items-center justify-center hover:bg-jet-black hover:text-pure-white transition-colors cursor-pointer buzz-card-round-sm"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={`h-1 transition-all duration-300 ${
                  idx === current ? "w-8 bg-electric-lime" : "w-4 bg-jet-black/15"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
