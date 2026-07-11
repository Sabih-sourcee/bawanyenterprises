import React from "react";
import { motion, useSpring } from "motion/react";
import { ArrowUp, Linkedin, Instagram } from "lucide-react";
import PageContainer from "@/src/components/layout/PageContainer";
import { brand } from "@/src/content/brand";
import { locations } from "@/src/content/sections";
import TagPhysics from "@/src/components/TagPhysics";

function BouncyLetter({ char }: { char: string; key?: React.Key }) {
  const y = useSpring(0, { stiffness: 450, damping: 8, mass: 0.8 });
  const scaleY = useSpring(1, { stiffness: 450, damping: 8, mass: 0.8 });
  const scaleX = useSpring(1, { stiffness: 450, damping: 8, mass: 0.8 });

  const handleHover = () => {
    y.set(-20);
    scaleY.set(1.3);
    scaleX.set(0.9);
    setTimeout(() => {
      y.set(0);
      scaleY.set(1);
      scaleX.set(1);
    }, 150);
  };

  return (
    <motion.span
      onMouseEnter={handleHover}
      style={{ y, scaleY, scaleX, display: "inline-block", transformOrigin: "bottom center" }}
      className="cursor-pointer text-[clamp(3rem,10vw,7rem)] font-sans font-black text-pure-white hover:text-electric-lime transition-colors select-none leading-none"
    >
      {char}
    </motion.span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="footer-section" className="bg-jet-black text-pure-white">
      {/* Location cards — Buzz multi-office */}
      <div className="section-y border-b border-pure-white/10">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-pure-white/10">
          {locations.map((loc) => (
            <div key={loc.city} className="bg-jet-black p-8 md:p-10">
              <p className="text-label-caps text-electric-lime mb-4">{loc.city}</p>
              <p className="text-body-md text-pure-white/70 mb-4">{loc.address}</p>
              <a href={`tel:${loc.phone}`} className="block text-body-md hover:text-electric-lime transition-colors">
                {loc.phone}
              </a>
              <a
                href={`mailto:${loc.email}`}
                className="block text-body-md text-pure-white/70 hover:text-electric-lime transition-colors mt-1"
              >
                {loc.email}
              </a>
            </div>
          ))}
          </div>
        </PageContainer>
      </div>

      {/* Physics tag canvas — Buzz .tag-canvas with falling pills */}
      <div className="border-b border-pure-white/10">
        <TagPhysics />
      </div>

      {/* Giant wordmark — Buzz footer logo */}
      <div className="section-y flex flex-col items-center">
        <PageContainer className="flex flex-col items-center">
        <div className="flex items-end justify-center gap-0 mb-8">
          {brand.shortName.split("").map((char, i) => (
            <BouncyLetter key={i} char={char} />
          ))}
          <span className="text-electric-lime text-[clamp(3rem,10vw,7rem)] font-black leading-none">.</span>
        </div>

        <div className="flex gap-4 mb-8">
          <a href={brand.social.linkedin} className="w-10 h-10 border border-pure-white/20 flex items-center justify-center hover:bg-electric-lime hover:text-jet-black transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={brand.social.instagram} className="w-10 h-10 border border-pure-white/20 flex items-center justify-center hover:bg-electric-lime hover:text-jet-black transition-colors" aria-label="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        <button
          onClick={scrollTop}
          className="flex items-center gap-2 text-label-caps text-pure-white/60 hover:text-electric-lime transition-colors cursor-pointer mb-8"
        >
          Let&apos;s go up <ArrowUp className="w-4 h-4" />
        </button>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-pure-white/40">
          <a href="#" className="hover:text-pure-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-pure-white transition-colors">Terms Of Use</a>
          <a href="#contact-form-section" className="hover:text-pure-white transition-colors">Careers</a>
        </div>

        <p className="text-pure-white/30 text-xs mt-8">
          &copy; {year} {brand.name}. Powered by Bawany Enterprises.
        </p>
        </PageContainer>
      </div>
    </footer>
  );
}
