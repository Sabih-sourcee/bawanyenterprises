import React, { useState, useCallback, useEffect } from "react";
import SmoothScrollProvider from "@/src/providers/SmoothScrollProvider";
import Preloader from "@/src/components/Preloader";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import HeroTicker from "@/src/components/HeroTicker";
import CustomCursor from "@/src/components/CustomCursor";
import LogoMarquee from "@/src/components/LogoMarquee";
import ProductGrid from "@/src/components/ProductGrid";
import ServiceSplit from "@/src/components/ServiceSplit";
import BrandStatement from "@/src/components/BrandStatement";
import TrustReasons from "@/src/components/TrustReasons";
import AboutPage from "@/src/components/AboutPage";
import TestimonialCarousel from "@/src/components/TestimonialCarousel";
import MultiStepForm from "@/src/components/MultiStepForm";
import Footer from "@/src/components/Footer";

type PageId = "home" | "about";

function pageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "");
  if (hash === "about") return "about";
  return "home";
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<PageId>(() =>
    typeof window !== "undefined" ? pageFromHash() : "home",
  );
  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  const navigate = useCallback((next: PageId, hash?: string) => {
    setPage(next);
    if (next === "about") {
      window.history.pushState(null, "", "#about");
      window.scrollTo({ top: 0 });
      return;
    }
    const target = hash && hash !== "#home" ? hash : "#home";
    window.history.pushState(null, "", target === "#home" ? "#" : target);
    requestAnimationFrame(() => {
      if (hash && hash !== "#home") {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <SmoothScrollProvider enabled={!loading}>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className="bg-surface text-on-surface min-h-screen font-sans selection:bg-electric-lime selection:text-jet-black antialiased md:cursor-none">
        <CustomCursor />
        <Navbar page={page} onNavigate={navigate} />

        <main>
          {page === "about" ? (
            <AboutPage onContact={() => navigate("home", "#contact-form-section")} />
          ) : (
            <>
              <Hero />
              <HeroTicker />
              <LogoMarquee />
              <ProductGrid />
              <BrandStatement />
              <ServiceSplit />
              <TrustReasons />
              <TestimonialCarousel />
              <MultiStepForm />
            </>
          )}
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
