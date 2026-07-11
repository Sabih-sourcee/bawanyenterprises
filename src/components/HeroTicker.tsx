import React from "react";
import { heroTickerItems } from "@/src/content/sections";

export default function HeroTicker() {
  const items = [...heroTickerItems, ...heroTickerItems];

  return (
    <section
      aria-hidden
      className="border-y border-jet-black bg-jet-black text-pure-white overflow-hidden py-4 select-none"
    >
      <div className="flex w-max animate-marquee-fast gap-0">
        {items.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center shrink-0 px-8 md:px-12 text-label-caps text-pure-white/90 whitespace-nowrap"
          >
            {item}
            <span className="ml-8 md:ml-12 w-1.5 h-1.5 bg-electric-lime inline-block" />
          </span>
        ))}
      </div>
    </section>
  );
}
