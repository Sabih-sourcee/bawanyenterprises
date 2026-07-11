import { useEffect, useRef } from "react";
import { splitTextReveal } from "@/src/lib/animations";

export function useSplitTextReveal<T extends HTMLElement>(
  scrub = false,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    splitTextReveal(el, { trigger: el, scrub });

    return () => {
      // SplitType adds wrapper elements; cleanup handled on unmount by React
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
