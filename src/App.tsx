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
import BentoStats from "@/src/components/BentoStats";
import AboutPage from "@/src/components/AboutPage";
import GroupPage from "@/src/components/GroupPage";
import TestimonialCarousel from "@/src/components/TestimonialCarousel";
import MultiStepForm from "@/src/components/MultiStepForm";
import Footer from "@/src/components/Footer";
import type { PageId } from "@/src/types/page";

/** Cleared when the user wipes site data / cache — then the intro loader shows again. */
const PRELOADER_SEEN_KEY = "bawany-enterprises-preloader-seen";

function pageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "").split("/")[0];
  if (hash === "about") return "about";
  if (hash === "group") return "group";
  return "home";
}

function hasSeenPreloader(): boolean {
  try {
    return localStorage.getItem(PRELOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markPreloaderSeen() {
  try {
    localStorage.setItem(PRELOADER_SEEN_KEY, "1");
  } catch {
    /* private mode / blocked storage — skip persist */
  }
}

export default function App() {
  const [loading, setLoading] = useState(() =>
    typeof window !== "undefined" ? !hasSeenPreloader() : true,
  );
  const [page, setPage] = useState<PageId>(() =>
    typeof window !== "undefined" ? pageFromHash() : "home",
  );
  const handlePreloaderComplete = useCallback(() => {
    markPreloaderSeen();
    setLoading(false);
  }, []);

  const navigate = useCallback((next: PageId, hash?: string) => {
    setPage(next);
    if (next === "about") {
      window.history.pushState(null, "", "#about");
      window.scrollTo({ top: 0 });
      return;
    }
    if (next === "group") {
      window.history.pushState(null, "", "#group");
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
          ) : page === "group" ? (
            <GroupPage />
          ) : (
            <>
              <Hero />
              <HeroTicker />
              <LogoMarquee />
              <ProductGrid />
              <BrandStatement />
              <ServiceSplit />
              <TrustReasons />
              <BentoStats />
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
