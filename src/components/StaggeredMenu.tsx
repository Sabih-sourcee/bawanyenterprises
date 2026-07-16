import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/src/lib/animations";
import "./StaggeredMenu.css";

export type StaggeredMenuItem = {
  label: string;
  ariaLabel?: string;
  link?: string;
  onClick?: () => void;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

export type StaggeredMenuProps = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  logoUrlOpen?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onLogoClick?: () => void;
};

export default function StaggeredMenu({
  position = "right",
  colors = ["#0a0a0a", "#64ff00"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/assets/bawany-wordmark.svg",
  logoUrlOpen,
  menuButtonColor = "#000",
  openMenuButtonColor = "#000",
  accentColor = "#64ff00",
  changeMenuColorOnOpen = false,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  onLogoClick,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const resolvedLogoUrl = open && logoUrlOpen ? logoUrlOpen : logoUrl;

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  const offscreen = position === "left" ? -100 : 100;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const icon = iconRef.current;
    const textInner = textInnerRef.current;
    if (!panel || !plusH || !plusV || !icon || !textInner) return;

    const preLayers = preContainer
      ? Array.from(preContainer.querySelectorAll<HTMLElement>(".sm-prelayer"))
      : [];
    preLayerElsRef.current = preLayers;

    gsap.set([panel, ...preLayers], { xPercent: offscreen, force3D: true });
    gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
    gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
    gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
    gsap.set(textInner, { yPercent: 0 });
    if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
  }, [menuButtonColor, offscreen]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    gsap.set([panel, ...layers], { xPercent: offscreen, force3D: true });
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(
        el,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: "power4.out", force3D: true },
        i * 0.07,
      );
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out", force3D: true },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [offscreen]);

  const playOpen = useCallback(() => {
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }
    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) {
      busyRef.current = false;
      setOpen(false);
      return;
    }

    busyRef.current = true;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      force3D: true,
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(
          panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
        );
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
        setOpen(false);
        document.body.style.overflow = "";
      },
    });
  }, [offscreen]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.8 : 0.35,
      ease: opening ? "power4.out" : "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn || !changeMenuColorOnOpen) return;
      colorTweenRef.current?.kill();
      colorTweenRef.current = gsap.to(btn, {
        color: opening ? openMenuButtonColor : menuButtonColor,
        delay: 0.18,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [changeMenuColorOnOpen, openMenuButtonColor, menuButtonColor],
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < 3; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + seq.length * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;
    const target = !openRef.current;
    openRef.current = target;

    if (target) {
      setOpen(true);
      document.body.style.overflow = "hidden";
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current || busyRef.current) return;
    openRef.current = false;
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    // Defer so the opening click doesn't immediately close the menu
    let active = false;
    const enable = window.setTimeout(() => {
      active = true;
    }, 50);

    const handlePointer = (event: Event) => {
      if (!active) return;
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        toggleBtnRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("pointerdown", handlePointer);
    return () => {
      window.clearTimeout(enable);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [closeOnClickAway, open, closeMenu]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const handleItemActivate = (item: StaggeredMenuItem) => {
    item.onClick?.();
    closeMenu();
  };

  const prelayerColors = (() => {
    const raw = colors?.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
    const arr = [...raw];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  })();

  return (
    <div
      className={`${className ? `${className} ` : ""}staggered-menu-wrapper${isFixed ? " fixed-wrapper" : ""}`}
      style={accentColor ? ({ ["--sm-accent"]: accentColor } as React.CSSProperties) : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {prelayerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation header">
        <button type="button" className="sm-logo" aria-label="Bawany home" onClick={onLogoClick}>
          <img
            src={resolvedLogoUrl}
            alt="Bawany"
            className="sm-logo-img"
            draggable={false}
            width={110}
            height={32}
          />
        </button>

        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={`${l}-${i}`}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  {it.onClick ? (
                    <button
                      type="button"
                      className="sm-panel-item"
                      aria-label={it.ariaLabel || it.label}
                      data-index={idx + 1}
                      onClick={() => handleItemActivate(it)}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </button>
                  ) : (
                    <a
                      className="sm-panel-item"
                      href={it.link || "#"}
                      aria-label={it.ariaLabel || it.label}
                      data-index={idx + 1}
                      onClick={() => closeMenu()}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </a>
                  )}
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
