import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/lib/animations";
import { brand, divisions } from "@/src/content/brand";
import { navLinks } from "@/src/content/sections";
import PageContainer from "@/src/components/layout/PageContainer";
import Button from "@/src/components/ui/Button";

type PageId = "home" | "about";

interface NavbarProps {
  page: PageId;
  onNavigate: (page: PageId, hash?: string) => void;
}

export default function Navbar({ page, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDivisions, setShowDivisions] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const current = self.scroll();
        if (current > lastScroll.current + 10 && current > 100) {
          setHidden(true);
        } else if (current < lastScroll.current - 10) {
          setHidden(false);
        }
        lastScroll.current = current;
      },
    });
  }, []);

  const go = (next: PageId, hash?: string) => {
    setIsOpen(false);
    setShowDivisions(false);
    onNavigate(next, hash);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 bg-pure-white/95 backdrop-blur-sm border-b border-jet-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <PageContainer as="div" className="h-16 md:h-20 flex justify-between items-center">
        <button
          type="button"
          onClick={() => go("home")}
          className="font-serif text-xl md:text-2xl font-bold text-jet-black tracking-tight cursor-pointer"
        >
          {brand.shortName}
          <span className="text-electric-lime">.</span>
        </button>

        <div className="hidden lg:flex items-center gap-8 h-full">
          <button
            type="button"
            onClick={() => go("home")}
            className={`text-label-caps transition-colors cursor-pointer ${
              page === "home" ? "text-jet-black" : "text-on-surface-variant hover:text-jet-black"
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => go("about")}
            className={`text-label-caps transition-colors cursor-pointer ${
              page === "about" ? "text-jet-black" : "text-on-surface-variant hover:text-jet-black"
            }`}
          >
            About
          </button>

          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowDivisions(true)}
            onMouseLeave={() => setShowDivisions(false)}
          >
            <button
              type="button"
              className="text-label-caps text-on-surface-variant hover:text-jet-black transition-colors flex items-center gap-2 cursor-pointer"
              onClick={() => go("home", "#divisions-section")}
            >
              Divisions
              <span className="w-1.5 h-1.5 bg-electric-lime" />
            </button>

            <AnimatePresence>
              {showDivisions && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-pure-white border border-jet-black grid grid-cols-2 gap-px bg-jet-black mt-0"
                >
                  {divisions.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => go("home", "#divisions-section")}
                      className="bg-pure-white p-6 hover:bg-electric-lime group transition-colors text-left cursor-pointer"
                    >
                      <p className="text-label-caps text-on-surface-variant group-hover:text-jet-black mb-2">
                        {v.tag}
                      </p>
                      <p className="font-serif text-lg text-jet-black mb-2">{v.name}</p>
                      <p className="text-body-md text-on-surface-variant text-sm line-clamp-2">
                        {v.description}
                      </p>
                      <span className="text-data-mono text-jet-black mt-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => go("home", "#contact-form-section")}
            className="text-label-caps text-on-surface-variant hover:text-jet-black transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        <div className="hidden lg:block">
          <Button
            href="#contact-form-section"
            variant="primary"
            className="!text-xs"
            onClick={(e) => {
              e.preventDefault();
              go("home", "#contact-form-section");
            }}
          >
            <span className="w-1.5 h-1.5 bg-electric-lime inline-block mr-2" />
            Contact Us
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-jet-black p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </PageContainer>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-jet-black bg-pure-white overflow-hidden"
          >
            <PageContainer className="py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.title}
                  type="button"
                  onClick={() => go(link.page, link.href.startsWith("#") && link.page === "home" && link.href !== "#home" ? link.href : undefined)}
                  className="text-label-caps text-jet-black py-2 border-b border-surface-container text-left cursor-pointer"
                >
                  {link.title}
                </button>
              ))}
              <Button
                href="#contact-form-section"
                variant="primary"
                className="w-full mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  go("home", "#contact-form-section");
                }}
              >
                Contact Us
              </Button>
            </PageContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
