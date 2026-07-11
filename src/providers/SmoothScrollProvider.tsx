import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useLenis } from "@/src/hooks/useLenis";
import { prefersReducedMotion, refreshScrollTrigger } from "@/src/lib/animations";

interface ScrollContextValue {
  lenisReady: boolean;
  reducedMotion: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenisReady: false,
  reducedMotion: false,
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export default function SmoothScrollProvider({
  children,
  enabled = true,
}: SmoothScrollProviderProps) {
  const reducedMotion = prefersReducedMotion();
  const lenisRef = useLenis(enabled && !reducedMotion);
  const [lenisReady, setLenisReady] = useState(false);

  const refresh = useCallback(() => {
    requestAnimationFrame(() => refreshScrollTrigger());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    document.documentElement.classList.add("lenis", "lenis-smooth");
    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (enabled && !reducedMotion) {
      setLenisReady(true);
      // Lenis + scrollerProxy init after preloader — refresh triggers twice so
      // scroll-linked reveals (work cards, stats, etc.) recalculate correctly
      refresh();
      const t = setTimeout(refresh, 150);
      return () => clearTimeout(t);
    }
  }, [enabled, reducedMotion, refresh]);

  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(refresh, 500);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [enabled, refresh]);

  return (
    <ScrollContext.Provider value={{ lenisReady, reducedMotion }}>
      {children}
    </ScrollContext.Provider>
  );
}
