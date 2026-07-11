import React, { useState, useCallback } from "react";
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
import BentoStats from "@/src/components/BentoStats";
import TestimonialCarousel from "@/src/components/TestimonialCarousel";
import MultiStepForm from "@/src/components/MultiStepForm";
import Footer from "@/src/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  return (
    <SmoothScrollProvider enabled={!loading}>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className="bg-surface text-on-surface min-h-screen font-sans selection:bg-electric-lime selection:text-jet-black antialiased md:cursor-none">
        <CustomCursor />
        <Navbar />

        {/* overflow-x-hidden would create a scroll container and break position:sticky;
            horizontal clipping is handled by overflow-x:clip on body in index.css */}
        <main>
          <Hero />
          <HeroTicker />
          <LogoMarquee />
          <ProductGrid />
          <ServiceSplit />
          <BrandStatement />
          <BentoStats />
          <TestimonialCarousel />
          <MultiStepForm />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
