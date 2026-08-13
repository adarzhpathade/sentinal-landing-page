"use client";

import React, { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAVIGATION_DATA } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/utils/cn";
import ScrambleHover from "@/components/ui/ScrambleHover";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-transition-router";

export interface NavbarProps {
  className?: string;
  theme?: "dark" | "light";
}

/**
 * Navbar component with a full-width menu panel.
 *
 * Closed state: SENTINAL (left) · MENU ═══ (center) · DOWNLOAD ▪ (right)
 * Open state:   SENTINAL (left) · CLOSE ═══ (center) · DOWNLOAD ▪ (right)
 *               ┌──────────────────────────────────────────────────────────┐
 *               │ Nav links        │ Info column     │ Action column      │
 *               │ ■ Home           │ Developed by    │ Get Sentinel Now   │
 *               │   Features       │                 │ Check Docs         │
 *               │   How it Works ? │                 │                    │
 *               │   FAQ's          │ Any Queries ?   │ github/sentinel    │
 *               │   Get it Now     │                 │                    │
 *               └──────────────────────────────────────────────────────────┘
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, theme = "dark" }, forwardedRef) => {
    const pathname = usePathname();
    const router = useTransitionRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState("home");

    const internalRef = useRef<HTMLElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = (forwardedRef as any) || internalRef;

    // Animation refs
    const menuTl = useRef<gsap.core.Timeline | null>(null);
    const menuPanelRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
    const blockRef = useRef<HTMLDivElement>(null);
    const infoPanelRef = useRef<HTMLDivElement>(null);
    const actionPanelRef = useRef<HTMLDivElement>(null);

    // Build GSAP timeline
    useGSAP(
      () => {
        // Initial entrance animation
        if (internalRef.current) {
          gsap.fromTo(
            internalRef.current,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.1,
              clearProps: "transform,opacity",
            }
          );
        }

        // Menu open/close timeline (paused — driven by toggle)
        menuTl.current = gsap.timeline({ paused: true });

        // 1. Slide the panel down
        menuTl.current.fromTo(
          menuPanelRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.55, ease: "power3.inOut" }
        );

        // 2. Stagger nav items in
        const items = navItemsRef.current.filter(Boolean);
        if (items.length > 0) {
          menuTl.current.fromTo(
            items,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }


        // 4. Info + Action columns fade in
        const sidePanels = [infoPanelRef.current, actionPanelRef.current].filter(
          Boolean
        );
        if (sidePanels.length > 0) {
          menuTl.current.fromTo(
            sidePanels,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.35"
          );
        }
      },
      { scope: internalRef }
    );

    // Drive the timeline on open/close
    useEffect(() => {
      if (isOpen) {
        menuTl.current?.play();
      } else {
        menuTl.current?.reverse();
      }
    }, [isOpen]);

    // Scroll detection: scrolled state, light-mode intersection, footer hide
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);

        let overLight = theme === "light";
        if (theme !== "light") {
          const lightSections = ["features", "how-it-works", "download"];
          lightSections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 80 && rect.bottom >= 0) {
                overLight = true;
              }
            }
          });
        }
        setIsLightMode(overLight);

        const footerEl = document.getElementById("footer");
        if (footerEl) {
          const footerRect = footerEl.getBoundingClientRect();
          setIsHidden(footerRect.bottom <= window.innerHeight + 10);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, [theme]);

    // Close menu on Escape key
    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) setIsOpen(false);
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    const handleNavClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>, itemId: string, href: string) => {
        // If we are NOT on the home page and the link targets the home page
        if (pathname !== "/" && (href === "/" || href.startsWith("/#"))) {
          e.preventDefault();
          setIsOpen(false);
          router.push(href);
          return;
        }

        const targetEl = document.getElementById(itemId);
        
        if (itemId === "home") {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const l = (window as any).lenis;
          if (l) {
            l.scrollTo(0, { duration: 2.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else if (targetEl) {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const l = (window as any).lenis;
          if (l) {
            l.scrollTo(targetEl, { duration: 2.5, easing: (t: number) => 1 - Math.pow(1 - t, 4), offset: -96 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }

        setActivePath(itemId);
        setIsOpen(false);
      },
      [pathname, router]
    );

    // Determine resolved colours
    const barBg = isOpen || isScrolled
      ? isLightMode
        ? "bg-[#d5d5d5]"
        : "bg-[#2a2a2a]"
      : "bg-transparent";

    const textColor =
      isLightMode || theme === "light"
        ? "text-[#141314]"
        : "text-white";

    const textColorMuted =
      isLightMode || theme === "light"
        ? "text-[#141314]/60"
        : "text-white/50";

    const panelBg = isLightMode ? "bg-[#d5d5d5]" : "bg-[#2a2a2a]";

    const dividerColor = isLightMode
      ? "border-[#141314]/10"
      : "border-white/10";

    const hamburgerColor =
      isLightMode || theme === "light"
        ? "bg-[#141314]"
        : "bg-white";

    return (
      <header
        ref={ref}
        data-hero-nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 flex w-full transition-all duration-500",
          isHidden
            ? "-translate-y-[150%] opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100",
          isScrolled ? "py-3 sm:py-4" : "pt-4 pb-6 sm:pt-6 sm:pb-8 md:pt-8 md:pb-10",
          className
        )}
      >
        <Container
          className={cn(
            "transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            isScrolled
              ? "px-6 sm:px-10 md:px-16 lg:px-20"
              : "px-4 sm:px-6 md:px-8"
          )}
        >
          <div className="relative flex w-full flex-col gap-2">
            {/* ── Top Bar ─────────────────────────────────────────── */}
            <div
              className={cn(
                "relative z-10 flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                barBg,
                isOpen || isScrolled ? "px-4 py-3 sm:px-6 sm:py-4" : "px-0 py-0"
              )}
            >
              {/* Left: Brand Wordmark */}
              <a
                href={NAVIGATION_DATA.brandUrl || "/"}
                className={cn(
                  "pointer-events-auto font-sans text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl",
                  textColor
                )}
                aria-label="Sentinel Home"
              >
                {NAVIGATION_DATA.brand}
              </a>

              {/* Center: Menu Trigger */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "group pointer-events-auto flex items-center gap-3 font-mono text-xs font-normal uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB460D] sm:text-sm",
                  textColor,
                  "hover:opacity-70"
                )}
                aria-label="Toggle Navigation Menu"
                aria-expanded={isOpen}
              >
                <span>
                  {isOpen
                    ? NAVIGATION_DATA.menuClose
                    : NAVIGATION_DATA.menuTrigger}
                </span>
                {/* Hamburger / X icon */}
                <span className="flex w-5 flex-col gap-[4px]">
                  <span
                    className={cn(
                      "h-[2px] w-full transition-all duration-300 origin-center group-hover:bg-[#FB460D]",
                      hamburgerColor,
                      isOpen && "translate-y-[3px] rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "h-[2px] w-full transition-all duration-300 origin-center group-hover:bg-[#FB460D]",
                      hamburgerColor,
                      isOpen && "-translate-y-[3px] -rotate-45"
                    )}
                  />
                </span>
              </button>

              {/* Right: Primary CTA */}
              <div className="hidden items-center sm:flex">
                <Button
                  variant="primary"
                  withSquareIcon
                  href={NAVIGATION_DATA.ctaButton.href}
                >
                  {NAVIGATION_DATA.ctaButton.label}
                </Button>
              </div>


            </div>

            {/* ── Menu Panel ──────────────────────────────────────── */}
            <div
              ref={menuPanelRef}
              className={cn(
                "relative z-0 w-full overflow-hidden",
                panelBg
              )}
              style={{ height: 0, opacity: 0 }}
              role="navigation"
              aria-label="Main navigation"
            >
              <div className="px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 md:px-8 md:pb-14 md:pt-12">
                {/* 3-column grid — collapses to stacked on mobile */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-0">
                  {/* ── Column 1: Nav Links ─────────────────────── */}
                  <nav className="flex flex-col gap-4 sm:gap-5">
                    {NAVIGATION_DATA.items.map((item, index) => {
                      const isActive = activePath === item.id;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.id, item.href)}
                          ref={(el) => {
                            navItemsRef.current[index] = el;
                          }}
                          className={cn(
                            "group/link relative flex items-center gap-3 font-sans text-2xl font-medium tracking-tight transition-colors duration-200 sm:text-3xl md:text-[2rem]",
                            isActive
                              ? textColor
                              : cn(textColorMuted, "hover:opacity-100")
                          )}
                          style={{ opacity: 0, transform: "translateY(18px)" }}
                        >
                          {/* Active square indicator */}
                          <div
                            className={cn(
                              "h-[14px] shrink-0 bg-[#FB460D] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                              isActive && isOpen ? "w-[14px] opacity-100" : "w-0 opacity-0"
                            )}
                            style={{ 
                              transitionDelay: isActive && isOpen ? "400ms" : "0ms",
                              marginRight: isActive && isOpen ? "0px" : "-12px" // To avoid pushing text when closed if gap applies
                            }}
                            aria-hidden="true"
                          />
                          <span
                            className="transition-transform duration-300"
                            style={{ 
                              transform: isActive && isOpen ? "translateX(0)" : "translateX(0)",
                              transitionDelay: isActive && isOpen ? "400ms" : "0ms"
                            }}
                          >
                            {item.label}
                          </span>
                        </a>
                      );
                    })}
                  </nav>

                  {/* ── Column 2: Info ──────────────────────────── */}
                  <div
                    ref={infoPanelRef}
                    className={cn(
                      "flex flex-col justify-between border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8",
                      dividerColor
                    )}
                    style={{ opacity: 0, transform: "translateY(12px)" }}
                  >
                    <div className="flex flex-col gap-2">
                      <span
                        className={cn(
                          "font-sans text-sm font-normal sm:text-base",
                          textColorMuted
                        )}
                      >
                        {NAVIGATION_DATA.menuInfo.topLeft.label}
                      </span>
                      <div className="flex flex-col gap-1 mt-0">
                        {NAVIGATION_DATA.menuInfo.developers.map((dev) => (
                          <a
                            key={dev.label}
                            href={dev.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "group flex items-center font-sans text-sm sm:text-base transition-colors",
                              textColor,
                              "hover:opacity-100"
                            )}
                          >
                            <div 
                              className="h-3 w-0 shrink-0 bg-[#FB460D] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:w-3 group-hover:mr-2" 
                              aria-hidden="true" 
                            />
                            <div className="transition-transform duration-300">
                              {dev.label}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col gap-2 md:mt-auto">
                      <span
                        className={cn(
                          "font-sans text-sm font-normal sm:text-base",
                          textColorMuted
                        )}
                      >
                        {NAVIGATION_DATA.menuInfo.bottomLeft.label}
                      </span>
                      <div className="flex flex-col gap-1 mt-0">
                        {NAVIGATION_DATA.menuInfo.emails.map((email) => (
                          <a
                            key={email.label}
                            href={email.href}
                            className={cn(
                              "group flex items-center font-sans text-sm sm:text-base transition-colors",
                              textColor,
                              "hover:opacity-100"
                            )}
                          >
                            <div 
                              className="h-3 w-0 shrink-0 bg-[#FB460D] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:w-3 group-hover:mr-2" 
                              aria-hidden="true" 
                            />
                            <div className="transition-transform duration-300">
                              {email.label}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Column 3: Actions ──────────────────────── */}
                  <div
                    ref={actionPanelRef}
                    className={cn(
                      "flex flex-col justify-between border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8",
                      dividerColor
                    )}
                    style={{ opacity: 0, transform: "translateY(12px)" }}
                  >
                    <div className="flex flex-col gap-2">
                      {NAVIGATION_DATA.menuActions.top.map((action) => (
                        <a
                          key={action.label}
                          href={action.href || "#"}
                          onClick={() => setIsOpen(false)}
                          target={action.external ? "_blank" : undefined}
                          rel={action.external ? "noopener noreferrer" : undefined}
                          className={cn(
                            "group flex items-center font-sans text-sm font-normal transition-colors duration-300 sm:text-base",
                            textColor
                          )}
                        >
                          <div 
                            className="mr-2 h-3 w-3 shrink-0 bg-[#FB460D]" 
                            aria-hidden="true" 
                          />
                          <span>{action.label}</span>
                        </a>
                      ))}
                    </div>
                    <a
                      href={NAVIGATION_DATA.menuActions.bottom.href || "#"}
                      onClick={() => setIsOpen(false)}
                      target={NAVIGATION_DATA.menuActions.bottom.external ? "_blank" : undefined}
                      rel={NAVIGATION_DATA.menuActions.bottom.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "mt-8 font-sans text-sm font-normal transition-colors duration-200 sm:text-base md:mt-auto",
                        textColorMuted,
                        "hover:opacity-100"
                      )}
                    >
                      <ScrambleHover 
                        text={NAVIGATION_DATA.menuActions.bottom.label} 
                        scrambleSpeed={20}
                        sequential
                        scrambledClassName="text-[#FB460D]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
