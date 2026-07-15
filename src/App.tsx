import React, { useState, useCallback, useEffect } from "react";
import SmoothScrollProvider from "@/src/providers/SmoothScrollProvider";
import Preloader from "@/src/components/Preloader";
import StaggeredMenu from "@/src/components/StaggeredMenu";
import Hero from "@/src/components/Hero";
import CustomCursor from "@/src/components/CustomCursor";
import LogoMarquee from "@/src/components/LogoMarquee";
import ProductGrid from "@/src/components/ProductGrid";
import ServiceSplit from "@/src/components/ServiceSplit";
import BrandStatement from "@/src/components/BrandStatement";
import BentoStats from "@/src/components/BentoStats";
import AboutPage from "@/src/components/AboutPage";
import GroupPage from "@/src/components/GroupPage";
import TestimonialCarousel from "@/src/components/TestimonialCarousel";
import MultiStepForm from "@/src/components/MultiStepForm";
import Footer from "@/src/components/Footer";
import { brand } from "@/src/content/brand";
import type { PageId } from "@/src/types/page";
import type { StaggeredMenuItem } from "@/src/components/StaggeredMenu";

/** Cleared when the user wipes site data / cache — then the intro loader shows again. */
const PRELOADER_SEEN_KEY = "bawany-enterprises-preloader-seen";

function pageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "").split("/")[0];
  if (hash === "about") return "about";
  // #divisions is the group companies page (formerly #group)
  if (hash === "divisions" || hash === "group") return "divisions";
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
    if (next === "divisions") {
      window.history.pushState(null, "", "#divisions");
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
    const onHash = () => {
      const raw = window.location.hash.replace("#", "").split("/")[0];
      // Keep legacy #group URLs working → same page as #divisions
      if (raw === "group") {
        window.history.replaceState(null, "", "#divisions");
      }
      setPage(pageFromHash());
      if (raw === "divisions" || raw === "group" || raw === "about") {
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const menuItems: StaggeredMenuItem[] = [
    { label: "Home", ariaLabel: "Go to home page", onClick: () => navigate("home") },
    { label: "About", ariaLabel: "Learn about us", onClick: () => navigate("about") },
    {
      label: "Divisions",
      ariaLabel: "View our divisions",
      onClick: () => navigate("divisions"),
    },
    {
      label: "Contact",
      ariaLabel: "Get in touch",
      onClick: () => navigate("home", "#contact-form-section"),
    },
  ];

  const socialItems = [
    { label: "LinkedIn", link: brand.social.linkedin || "#" },
    { label: "Instagram", link: brand.social.instagram || "#" },
  ];

  return (
    <SmoothScrollProvider enabled={!loading}>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className="bg-surface text-on-surface min-h-screen font-sans selection:bg-electric-lime selection:text-jet-black antialiased md:cursor-none">
        <CustomCursor />
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          isFixed
          logoUrl="/assets/bawany-wordmark.svg"
          menuButtonColor="#000000"
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={false}
          colors={["#0a0a0a", "#64ff00"]}
          accentColor="#64ff00"
          onLogoClick={() => navigate("home")}
        />

        <main>
          {page === "about" ? (
            <AboutPage onContact={() => navigate("home", "#contact-form-section")} />
          ) : page === "divisions" ? (
            <GroupPage />
          ) : (
            <>
              <Hero />
              <LogoMarquee />
              <ProductGrid />
              <BrandStatement />
              <ServiceSplit />
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
