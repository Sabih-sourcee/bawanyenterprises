import React from "react";
import { partnerLogos } from "@/src/content/sections";

export default function LogoMarquee() {
  const items = [...partnerLogos, ...partnerLogos];

  return (
    <section
      id="partners-marquee-section"
      className="py-8 md:py-10 bg-pure-white border-y border-jet-black/10 overflow-hidden"
    >
      <div className="flex w-max animate-marquee items-center gap-0">
        {items.map((logo, idx) => (
          <React.Fragment key={`${logo.name}-${idx}`}>
            <div className="px-8 md:px-12 flex items-center justify-center shrink-0 h-12">
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-6 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector("[data-fallback]")) {
                    const span = document.createElement("span");
                    span.dataset.fallback = "true";
                    span.className = "text-sm font-medium text-on-surface-variant tracking-wide";
                    span.textContent = logo.name;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            <span className="w-1 h-1 bg-on-surface-variant/30 rounded-full shrink-0" />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
