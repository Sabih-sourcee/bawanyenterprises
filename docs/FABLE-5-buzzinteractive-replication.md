# Fable 5 — Full Buzz Interactive Replication

> **The master handoff.** Everything still needed to replicate [buzzinteractive.co](https://buzzinteractive.co) end-to-end for Bawany Enterprises — section by section, asset by asset, animation by animation.

**Reference:** https://buzzinteractive.co  
**Target:** Bawany Enterprises homepage (`npm run dev` → http://localhost:3000)  
**Stack today:** Vite 6 · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis · split-type · Motion  
**Buzz stack:** Webflow · GSAP · Lenis · split-type · Matter.js · Lottie · Finsweet slider · Cloudflare Turnstile

---

## Progress Update — Buzz Mechanics Pass (Jul 11, 2026)

Implemented after a live DOM/animation inspection of buzzinteractive.co:

- [x] **Hero clip-path scrub** — sticky track (200vh), video wrapper animates `polygon(20% 1%, 88% 40%, 99% 99%, 0% 74%)` at 60% width → full-bleed rectangle at 100vw/100vh (Buzz `.sticky-track` / `.video-wrapper` mechanic)
- [x] **Hero rotator** — vertical word carousel (overflow mask + column stepped −100% per phrase), matching Buzz `.ticker-inner`, replacing the React state swap
- [x] **`skewUpReveal`** utility — Buzz `data-skew-up` word reveal (`translate(0,100%) skew(-6deg)` → identity), applied to Work/Services/About headings and stats labels
- [x] **Work cards** — Buzz `._w-chip` hover (chips slide from `translateX(110%)` with stagger) + `._w-title-wrap` width-expand pill; 5th case card added
- [x] **Services** — rebuilt as Buzz horizontal scrub: sticky section inside 250vh track, card row translated −overflow px on scroll (5 cards); fixed `position:sticky` breakage by replacing `overflow-x-hidden` with `overflow-x: clip` on body
- [x] **Stats** — count-up counters + skew-up labels
- [x] **Testimonials** — 9 slides + drag/swipe
- [x] **Footer physics** — Matter.js tag canvas (falling/draggable pills), matching Buzz `canvas.physics-canvas` in `.tag-canvas`

Still open: real assets (showreel/work images/logo SVG), form backend + Turnstile, nav mega-menu, Lottie, case-study routes.

---

## Executive Summary

The homepage **architecture matches Buzz** — preloader → nav → hero → ticker → marquee → work → services → about → stats → testimonials → form → footer. Layout, section order, and scroll rhythm are in place.

What remains is **motion fidelity**, **real assets**, **micro-interactions**, and **production wiring**. This document is the single source of truth for closing that gap.

### Parity Score (approx.)

| Area            | Done | Remaining |
|-----------------|------|-----------|
| Section order   | 100% | —         |
| Layout / grid   | 85%  | 15%       |
| Scroll motion   | 60%  | 40%       |
| Assets / media  | 25%  | 75%       |
| Form / backend  | 40%  | 60%       |
| Footer physics  | 20%  | 80%       |
| Global polish   | 50%  | 50%       |

---

## Buzz Page Map → Bawany Files

| # | Buzz section              | Buzz behavior                                      | Bawany file(s)                          | Status   |
|---|---------------------------|----------------------------------------------------|-----------------------------------------|----------|
| 0 | Preloader                 | % counter, white wipe, blocks scroll               | `Preloader.tsx`                         | ✅ Close |
| 1 | Navbar                    | SVG logo, hide on scroll, Services mega-menu       | `Navbar.tsx`                            | ⚠️ Partial |
| 2 | Hero                      | Pinned scroll, rotator, showreel, quote overlay    | `Hero.tsx`                              | ⚠️ Partial |
| 3 | Service ticker            | Black infinite strip                               | `HeroTicker.tsx`                        | ✅ Done  |
| 4 | Client marquee            | Logos + dot separators                             | `LogoMarquee.tsx`                       | ✅ Done  |
| 5 | Selected Work             | Masonry, rounded cards, hover media, case links    | `ProductGrid.tsx`                       | ⚠️ Partial |
| 6 | Our Services              | Sticky pin, pills, link grid, preview cards        | `ServiceSplit.tsx`                      | ⚠️ Partial |
| 7 | About us                  | Long prose, line reveals                           | `BrandStatement.tsx`                    | ✅ Close |
| 8 | Stats bento               | Asymmetric grid, icons, scrub counters             | `BentoStats.tsx`                        | ⚠️ Partial |
| 9 | Testimonials              | 9 slides, drag, autoplay                           | `TestimonialCarousel.tsx`               | ⚠️ Partial |
|10 | Let's Connect             | Single form, black panel, Turnstile                | `MultiStepForm.tsx`                     | ⚠️ Partial |
|11 | Footer                    | 3 offices, Matter.js logo, social, legal           | `Footer.tsx`                            | ⚠️ Partial |

**App composition:** `src/App.tsx`  
**Content:** `src/content/brand.ts`, `src/content/sections.ts`  
**Motion utilities:** `src/lib/animations.ts`  
**Smooth scroll:** `src/providers/SmoothScrollProvider.tsx`

---

## Design System Decision (Read First)

Buzz and the original Bawany brief diverge on two axes:

| Token        | Buzz Interactive     | Bawany (current)        | Full Buzz replica?      |
|--------------|----------------------|-------------------------|-------------------------|
| Accent       | Magenta / pink       | Electric lime `#64ff00` | Choose one              |
| Corners      | Heavy radius ~40px   | Hybrid (`.buzz-card-round`) | Match Buzz radius   |
| Hero type    | Aeonik sans          | Hanken Grotesk + serif  | Add Aeonik or closest   |
| Stats accent | Pink bento tiles     | Lime bento tiles        | Layout match, color swap OK |

**Recommendation:** Keep **Bawany lime + content**, adopt **Buzz layout + motion + radius**. Do not clone Buzz magenta unless the client asks for a literal clone.

---

## A. Hero & Motion (Critical)

Buzz hero is the biggest perceptual gap. Current implementation pins and scrubs but uses React interval for the rotator and a single MP4 instead of Buzz's frame sequence.

### Checklist

- [ ] **Typography:** Load Aeonik (licensed) or closest free match (e.g. Satoshi, General Sans). Apply to hero H1 only; keep serif for display elsewhere if desired.
- [ ] **Rotating word:** Replace `setInterval` + React state in `Hero.tsx` with **GSAP TextPlugin** crossfade (Buzz never hard-swaps DOM text).
  ```bash
  npm install @gsap/shockingly-green  # or register TextPlugin from GSAP Club
  ```
  - Register: `gsap.registerPlugin(TextPlugin)`
  - Cycle `heroPhrases` with opacity/y crossfade, ~2.2s interval
- [ ] **Word split animation:** Buzz splits `Leading`, `Full-Service`, and rotator into separate spans with staggered 3D entrance. Extend current split-type usage in `Hero.tsx` to all headline parts, not just `[data-hero-lead]`.
- [ ] **Showreel scroll scrub:** Buzz uses an **image sequence** (`frame-at-0m0s.avif` style) scrubbed to scroll — not just scale/translate on a `<video>`.
  - Option A: Export 60–120 WebP/AVIF frames from Bawany reel → `scrubToProgress` on ScrollTrigger
  - Option B: Keep video but add `currentTime` scrub tied to scroll (heavier, less Buzz-accurate)
- [ ] **Second hero state:** Full-bleed video with centered quote overlay at end of pin. Current overlay exists (`heroOverlayQuote`) — tune opacity, scale, and pin distance to match Buzz (~140–180% scroll).
- [ ] **Skewed frame:** Buzz applies perspective skew to the showreel container on load. Verify `.hero-frame` CSS in `index.css` matches reference angle.
- [ ] **Mute toggle:** Present — keep; ensure it doesn't fight scroll scrub.
- [ ] **Reduced motion:** Hero pin + scrub must respect `prefersReducedMotion()` (partially done via `animations.ts`).

### Files to touch

- `src/components/Hero.tsx`
- `src/index.css` (`.hero-frame`, hero typography)
- `src/content/brand.ts` (`heroHeadlineLead`, `heroOverlayQuote`)
- `public/assets/showreel/` (frame sequence) or optimized `showreel.webm` + `showreel.mp4`

---

## B. Assets (Critical for Visual Parity)

Many paths exist in content but files are missing from `public/`.

### Current asset inventory

| Path | Status |
|------|--------|
| `public/assets/partners/*.svg` | ✅ 8 placeholder SVGs |
| `public/assets/showreel.mp4` | ❌ Missing or not committed |
| `public/assets/work/*.webp` | ❌ Referenced, not present |
| `public/assets/verticals/*.webp` | ❌ Not present |
| `public/assets/logo.svg` | ❌ Nav uses text logo |
| `public/assets/stats/*.png` | ❌ Bento uses Lucide icons |
| `public/favicon.svg` | ✅ Present |

### Asset manifest — drop these in

```
public/assets/
├── logo.svg                    # Nav + footer wordmark source
├── logo-mark.svg               # Favicon alternate
├── og-image.jpg                # 1200×630 social share
├── showreel.mp4                # <8MB H.264, muted loop
├── showreel.webm               # WebM fallback
├── showreel/                   # Optional: frame-000.webp … frame-119.webp
├── work/
│   ├── commercial-solar.webp
│   ├── dealer-network.webp
│   ├── led-retrofit.webp
│   ├── accessories-line.webp
│   └── case-05.webp            # 5th Buzz-style card
├── verticals/
│   ├── mobile.webp
│   ├── solar.webp
│   ├── lighting.webp
│   └── accessories.webp
├── partners/                   # Replace placeholders with real brand SVGs
└── stats/
    ├── glass-heart.png         # Buzz-style 3D icon tiles
    └── glass-network.png
```

### Checklist

- [ ] Compress showreel: target **<8MB** MP4 + WebM; lazy-load below fold
- [ ] Add **5th work item** in `sections.ts` + image (Buzz shows 5+ case cards)
- [ ] **Hover media:** Each work card gets optional `hoverVideo` or `hoverImage` — swap on `:hover` like Buzz
- [ ] Replace partner SVG placeholders with official logos (monochrome for marquee)
- [ ] Add **services preview cards** (2 rounded images above "Our Services" headline)
- [ ] 3D stat icons: custom PNG/Lottie instead of Lucide `Heart` / `Network`

---

## C. Navbar

Buzz nav: fixed white bar, SVG logo, Services dropdown mega-menu, "Let's Work" CTA with animated dot.

### Checklist

- [ ] Replace text logo with `<img src="/assets/logo.svg" />`
- [ ] **Services mega-menu:** Click/hover opens panel listing service categories (mirror `serviceTabs` from `sections.ts`)
- [ ] CTA pill: Buzz uses rounded black button + lime/magenta dot pulse — align `Button.tsx` variant
- [ ] Mobile menu: full-screen overlay with staggered link reveal (partially done)
- [ ] Active section highlight on scroll (optional Buzz behavior)

### Files

- `src/components/Navbar.tsx`
- `src/components/ui/Button.tsx`
- `public/assets/logo.svg`

---

## D. Selected Work (`ProductGrid.tsx`)

Buzz masonry: wide card → two squares → wide → etc. Tags sit **on** the image. Cards link to case study pages.

### Checklist

- [ ] Add **5th card** to `workItems` in `sections.ts`
- [ ] Tag style: inline `Website · UI/UX · Motion` format (middle dot, not separate pills) — match Buzz
- [ ] **Hover:** scale image + optional video swap
- [ ] **Case study links:** `href: "/case-study/[slug]"` — stub routes or `#` until pages exist
- [ ] Stagger reveal on scroll — done; tune timing to Buzz (~0.12s stagger)
- [ ] Remove dead `horizontalScroll` utility from `animations.ts` if masonry is final

### Buzz work grid reference

```
[======== wide ========]
[ half ] [ half ]
[======== wide ========]
[ half ] [ half ]        ← Buzz has more rows; extend as content allows
```

---

## E. Our Services (`ServiceSplit.tsx`)

Buzz pins the entire services block for a long scroll. Two **rounded preview images** float above the section title. Tab pills crossfade link lists.

### Checklist

- [ ] Add **2 preview image cards** above headline (rounded, offset layout like Buzz)
- [ ] Tab switch: **GSAP crossfade** entire link column (opacity + y), not just re-mount stagger
- [ ] Tune pin: `minHeight: 120vh` → test against Buzz (~150–200vh feel with 4+ tabs)
- [ ] Gradient blob position/size — compare live side-by-side
- [ ] Optional: Lottie micro-animation on active tab icon

### Files

- `src/components/ServiceSplit.tsx`
- `src/content/sections.ts` (`serviceTabs` — add `previewImage` per tab)
- `public/assets/verticals/*.webp`

---

## F. About (`BrandStatement.tsx`)

Closest to parity. Minor gaps only.

### Checklist

- [ ] Line-by-line scroll reveal (split-type lines) — verify timing
- [ ] Copy length: Buzz about block is ~3 paragraphs; match rhythm in `brand.ts`
- [ ] Optional: pull-quote or inline stat mid-paragraph

---

## G. Stats Bento (`BentoStats.tsx`)

Buzz uses asymmetric grid: wide `4X` tile, mixed row heights, pink/black/white tiles, scroll-scrubbed percentages.

### Checklist

- [ ] Match **exact grid spans** from Buzz screenshot (2-col wide stat, tall dark icon tile)
- [ ] Add **second dark icon tile** (Buzz has multiple glassmorphism icons)
- [ ] **Scroll-scrub counters** for `%` tiles (use `scrubCounter` in `animations.ts` with `scrub: true`, not trigger-once)
- [ ] Replace Lucide icons with asset PNGs or Lottie
- [ ] Tile radius: `.buzz-card-round` — confirm ~40px matches Buzz

### Files

- `src/components/BentoStats.tsx`
- `src/content/sections.ts` (`buzzStats`)
- `src/lib/animations.ts` (`scrubCounter`)

---

## H. Testimonials (`TestimonialCarousel.tsx`)

Buzz: **9 testimonials**, Finsweet slider, drag + autoplay, minimal chrome, large quote typography.

### Checklist

- [ ] Expand `testimonials` array to **9 entries** in `sections.ts`
- [ ] Add **drag/swipe** (Motion drag or Embla carousel)
- [ ] Autoplay — done (5.5s); match Buzz ~6s
- [ ] Optional: company logo or avatar per slide
- [ ] Progress dots or fraction indicator (Buzz shows slide count subtly)

---

## I. Form — Let's Connect (`MultiStepForm.tsx`)

Buzz single-page form: black section, rounded top (`border-radius` ~40px top only), underline inputs, interest checkboxes, budget radios, source dropdown, Cloudflare Turnstile.

### Checklist

- [ ] **Field order** (match Buzz exactly):
  1. Full name
  2. Email
  3. Phone
  4. Company name
  5. Designation
  6. How did you hear about us (select)
  7. Message (textarea)
  8. Interest checkboxes
  9. Budget radios
- [ ] **Validation:** required fields, email format, phone format
- [ ] **Submit backend:** Formspree / Resend / custom API — replace `console.log`
- [ ] **Success state:** Buzz-style thank-you message inline (partially done)
- [ ] **Error state:** network failure message
- [ ] **Cloudflare Turnstile:** add widget + server verification
- [ ] Honeypot field for spam (Buzz may use Turnstile only)

### Env vars (example)

```
VITE_FORMSPREE_ID=xxxx
VITE_TURNSTILE_SITE_KEY=xxxx
```

---

## J. Footer (`Footer.tsx`)

Buzz footer: 3 office cards, giant kinetic **SVG wordmark**, Matter.js physics on letters, social links, legal row, "Let's go up" scroll-top.

### Checklist

- [ ] Install Matter.js: `npm install matter-js @types/matter-js`
- [ ] Replace Motion `BouncyLetter` with **Matter.js compound body** on logo letters (Buzz loads `matter-js@0.19.0`)
- [ ] Giant wordmark: SVG blob letters from `logo.svg`, not `<span>` per character
- [ ] "Let's go up" button — done; wire to Lenis scroll-to-top
- [ ] Social: LinkedIn, Instagram, Behance/Dribbble equivalents for Bawany
- [ ] Legal links: Privacy, Terms
- [ ] Optional: "Powered by" row

### Files

- `src/components/Footer.tsx`
- New: `src/hooks/useMatterLogo.ts` or `src/lib/matterLogo.ts`

---

## K. Global Polish

### Preloader (`Preloader.tsx`)

- [ ] Wait for critical assets (showreel metadata / first frame) before completing counter
- [ ] Wipe animation curve — match Buzz ease
- [ ] Brand mark flash at 100% (optional)

### Custom cursor (`CustomCursor.tsx`)

- [ ] Expand on hover over links, work cards, magnetic buttons
- [ ] Hide on touch devices — verify `@media (hover: hover)`

### Smooth scroll (`SmoothScrollProvider.tsx`)

- [ ] Lenis + GSAP ScrollTrigger sync — verify `refreshScrollTrigger` after preloader
- [ ] `duration` / `lerp` tuned to Buzz feel (~1.2s duration, 0.1 lerp)

### Lottie (Buzz uses CDN JSON animations)

- [ ] `npm install lottie-react`
- [ ] Hero micro-motion, services tab icons, stat tiles
- [ ] Lazy-load Lottie JSON from `public/assets/lottie/`

### SEO & meta

- [ ] `index.html`: title, description, OG tags, Twitter card
- [ ] JSON-LD Organization schema
- [ ] `public/og-image.jpg`
- [ ] Canonical URL

### Performance

- [ ] Code-split Hero video / frame loader
- [ ] Lazy-load below-fold images (`loading="lazy"`)
- [ ] Preload hero font + first showreel frame only
- [ ] Audit bundle: remove unused Motion features if Matter + Lottie added
- [ ] Target Lighthouse: Performance 90+, LCP < 2.5s

### Accessibility

- [ ] `prefers-reduced-motion` audit on all pins, scrubs, autoplay
- [ ] Form labels + aria
- [ ] Carousel keyboard nav + pause on focus
- [ ] Skip-to-content link

---

## L. Dependencies to Add

```bash
npm install matter-js lottie-react
npm install -D @types/matter-js
# GSAP TextPlugin — Club GreenSock or @gsap/shockingly-green if licensed
```

Optional:

```bash
npm install embla-carousel-react   # testimonials drag
npm install @marsidev/react-turnstile # Cloudflare Turnstile
```

Remove if unused after audit:

- `horizontalScroll` in `animations.ts` (work section no longer horizontal)

---

## M. Implementation Order (Recommended)

Execute in this order for maximum visual impact per hour:

| Phase | Task | Impact |
|-------|------|--------|
| **1** | Real assets: showreel, work images, logo SVG | 🔴 Critical |
| **2** | Hero TextPlugin rotator + scroll scrub frames | 🔴 Critical |
| **3** | Services preview cards + tab crossfade | 🟠 High |
| **4** | Work card hover media + 5th item | 🟠 High |
| **5** | Stats bento grid + scrub counters + icon assets | 🟠 High |
| **6** | Matter.js footer wordmark | 🟠 High |
| **7** | Form backend + Turnstile + validation | 🟡 Medium |
| **8** | Testimonials ×9 + drag | 🟡 Medium |
| **9** | Nav SVG logo + services mega-menu | 🟡 Medium |
| **10** | Lottie micro-motion + SEO + perf pass | 🟢 Polish |

---

## N. Definition of Done

The replication is **complete** when:

1. Side-by-side scroll with buzzinteractive.co feels **indistinguishable in rhythm** (pin distances, scrub timing, section pacing).
2. Every image/video path in `sections.ts` resolves to a real optimized asset.
3. Hero rotator uses GSAP TextPlugin; showreel responds to scroll.
4. Footer logo has Matter.js physics on desktop.
5. Form submits to a live endpoint with validation and spam protection.
6. Lighthouse Performance ≥ 90 on desktop; no layout shift from missing images.
7. `prefers-reduced-motion` disables pins, autoplay, and physics.
8. All content remains **Bawany Enterprises** — not Buzz Interactive copy.

---

## O. Out of Scope (Homepage-Only Brief)

Buzz has additional routes. Stub or skip until requested:

| Route | Buzz URL pattern |
|-------|------------------|
| About page | `/about` |
| Case studies | `/case-study/[slug]` |
| Blog | `/blog` |
| Contact | `/contact` |
| Careers | `/careers` |

Homepage work cards may link to `#` or `/case-study/[slug]` placeholders until those pages are built.

---

## P. Quick Reference — Key Files

```
src/
├── App.tsx                      # Section order — do not reorder without reason
├── index.css                    # Tokens, .buzz-card-round, .hero-frame
├── content/
│   ├── brand.ts                 # heroHeadlineLead, heroOverlayQuote, verticals
│   └── sections.ts              # All section data — extend here first
├── lib/animations.ts            # staggerReveal, scrubCounter, splitTextReveal
├── providers/SmoothScrollProvider.tsx
├── hooks/useLenis.ts, useSplitTextReveal.ts
└── components/
    ├── Preloader.tsx
    ├── Navbar.tsx
    ├── Hero.tsx                 # Biggest remaining motion work
    ├── HeroTicker.tsx
    ├── LogoMarquee.tsx
    ├── ProductGrid.tsx
    ├── ServiceSplit.tsx
    ├── BrandStatement.tsx
    ├── BentoStats.tsx
    ├── TestimonialCarousel.tsx
    ├── MultiStepForm.tsx
    ├── Footer.tsx               # Matter.js target
    └── CustomCursor.tsx
```

---

## Q. Side-by-Side Test Protocol

Before calling Fable 5 complete, run this checklist in two browser windows:

1. Open buzzinteractive.co and localhost:3000 at same viewport (1440×900).
2. Scroll both slowly through hero — compare pin length, rotator timing, video behavior.
3. Compare work grid: card count, radius, tag placement, hover.
4. Services: pin duration, tab switch animation, preview cards.
5. Stats bento: grid proportions, counter scrub.
6. Testimonials: slide count, autoplay, drag.
7. Form: field order, rounded top panel, submit flow.
8. Footer: office cards, logo interaction, scroll-top.
9. Run `npm run build && npm run preview` — verify production bundle.
10. Test mobile (390×844): menu, hero fallback, carousel swipe, form usability.

---

*Fable 5 — last document before full Buzz parity. Work the phases top to bottom; check boxes as you ship.*
