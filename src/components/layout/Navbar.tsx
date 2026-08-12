"use client";

import React, { useState, useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAVIGATION_DATA } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/utils/cn";

export interface NavbarProps {
  className?: string;
  theme?: "dark" | "light";
}

/**
 * Reusable Navbar component implementing the exact header layout of the reference design:
 * Left: Bold boxy wordmark, Center: MENU == trigger, Right: Primary CTA button with square box.
 * Becomes sticky and forms a background box on scroll.
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, theme = "dark" }, forwardedRef) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activePath, setActivePath] = useState("home");

    const internalRef = useRef<HTMLElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = (forwardedRef as any) || internalRef;
    
    // Animation refs
    const tl = useRef<gsap.core.Timeline | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<Array<HTMLAnchorElement>>([]);
    const blockRef = useRef<HTMLDivElement>(null);
    const openTimeout = useRef<NodeJS.Timeout | null>(null);

    useGSAP(() => {
      // Initial Entrance animation
      if (internalRef.current) {
        gsap.fromTo(
          internalRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1, clearProps: "transform,opacity" }
        );
      }
      
      // Dropdown timeline
      tl.current = gsap.timeline({ 
        paused: true,
        onReverseComplete: () => {
          setIsAnimating(false);
        }
      });
      
      tl.current
        .to(menuRef.current, { height: "auto", opacity: 1, duration: 0.6, ease: "power3.inOut" })
        .to(itemsRef.current, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.3")
        .to(blockRef.current, { width: 12, marginRight: 16, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.2");
        
    }, { scope: internalRef });

    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
        const delay = !isScrolled ? 400 : 0; // Wait partially for width expansion if unscrolled
        openTimeout.current = setTimeout(() => {
          tl.current?.play();
        }, delay);
      } else {
        if (openTimeout.current) clearTimeout(openTimeout.current);
        tl.current?.reverse();
      }
    }, [isOpen, isScrolled]);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);

        // Check if navbar is over a light theme section
        let overLight = theme === "light";
        if (theme !== "light") {
          const lightSections = ["features", "how-it-works", "download"];
          lightSections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              // Navbar is ~80px tall. If section top is above 80 and bottom below 0, it's intersecting
              if (rect.top <= 80 && rect.bottom >= 0) {
                overLight = true;
              }
            }
          });
        }
        setIsLightMode(overLight);

        // Check if footer is fully revealed (bottom of the page reached)
        const footerEl = document.getElementById("footer");
        if (footerEl) {
          const footerRect = footerEl.getBoundingClientRect();
          // Hide only when the entire footer is visible (bottom of footer is in viewport)
          setIsHidden(footerRect.bottom <= window.innerHeight + 10);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      // Initialize on mount
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }, [theme]);

    const isExpandedPill = isScrolled || isOpen || isAnimating;

    return (
      <header
        ref={ref}
        data-hero-nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50 flex w-full transition-all duration-500",
          isHidden ? "-translate-y-[150%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
          isScrolled
            ? "py-4 sm:py-5"
            : "pt-4 pb-6 sm:pt-6 sm:pb-8 md:pt-8 md:pb-10",
          className
        )}
      >
        <Container>
          <div className="relative flex w-full items-center justify-between">
            {/* Left: Brand Wordmark */}
            <a
              href={NAVIGATION_DATA.brandUrl || "/"}
              className={cn(
                "pointer-events-auto font-sans text-xl font-bold tracking-tight transition-all duration-500 md:text-2xl",
                theme === "light" ? "text-black" : "text-white",
                isExpandedPill
                  ? "pointer-events-none -translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
              aria-label="Sentinel Home"
            >
              {NAVIGATION_DATA.brand}
            </a>

            {/* Center: Menu Trigger & Dropdown */}
            <div className="pointer-events-none absolute right-0 top-1/2 z-20 flex w-full -translate-y-1/2 flex-col items-end sm:left-1/2 sm:max-w-[400px] sm:-translate-x-1/2 sm:items-center">
              <div 
                className={cn(
                  "relative flex flex-col justify-end sm:justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]", 
                  isExpandedPill ? "w-[calc(100vw-32px)] sm:w-[400px]" : "w-[44px] sm:w-[85px]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    transition:
                      "background-color 200ms ease, color 200ms ease",
                  }}
                  className={cn(
                    "w-full group pointer-events-auto flex items-center justify-between font-mono text-xs font-normal uppercase tracking-[0.05em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB460D] md:text-sm",
                    isExpandedPill
                      ? cn(
                          "px-6 py-4 shadow-2xl",
                          isLightMode
                            ? "bg-[#d5d5d5] text-[#141314] hover:text-[#141314]/70"
                            : "bg-[#262626] text-white/90 hover:text-white"
                        )
                      : cn("bg-transparent px-0 py-2", theme === "light" ? "text-black hover:text-black/70" : "text-white/90 hover:text-white")
                  )}
                  aria-label="Toggle Navigation Menu"
                >
                  <span
                    className={cn(
                      "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                      isExpandedPill
                        ? "max-w-[100px] opacity-100"
                        : "max-w-0 opacity-0 sm:max-w-[100px] sm:opacity-100"
                    )}
                  >
                    {NAVIGATION_DATA.menuTrigger}
                  </span>
                  <span className="flex w-4 flex-col gap-[3px]">
                    <span
                      className={cn(
                        "h-[2px] w-full transition-all duration-200 group-hover:bg-[#FB460D]",
                        (isExpandedPill && isLightMode) || (theme === "light" && !isExpandedPill) ? "bg-[#141314]" : "bg-white",
                        isOpen ? "translate-y-[2.5px] rotate-45" : ""
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] w-full transition-all duration-200 group-hover:bg-[#FB460D]",
                        (isExpandedPill && isLightMode) || (theme === "light" && !isExpandedPill) ? "bg-[#141314]" : "bg-white",
                        isOpen ? "-translate-y-[2.5px] -rotate-45" : ""
                      )}
                    />
                  </span>
                </button>

                {/* Expanded Menu Dropdown */}
                <div 
                  ref={menuRef}
                  className={cn(
                    "absolute top-full left-0 mt-2 w-full pointer-events-auto overflow-hidden shadow-2xl",
                    isLightMode ? "bg-[#d5d5d5]" : "bg-[#262626]"
                  )}
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="flex flex-col py-8 px-10 gap-6">
                    {NAVIGATION_DATA.items.map((item, index) => {
                      const isActive = activePath === item.id;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => { setActivePath(item.id); setIsOpen(false); }}
                          ref={(el) => {
                            if (el) itemsRef.current[index] = el;
                          }}
                          className="relative flex items-center font-sans text-3xl font-medium tracking-tight"
                          style={{ opacity: 0, transform: "translateX(-20px)" }}
                        >
                          {/* Active Indicator Block pushing text */}
                          {isActive && (
                            <div
                              ref={blockRef}
                              className="h-3 bg-[#FB460D] shrink-0"
                              style={{ width: 0, marginRight: 0, opacity: 0 }}
                            />
                          )}
                          
                          <span
                            className={cn(
                              "transition-colors duration-300",
                              isActive 
                                ? "text-[#FB460D]" 
                                : isLightMode ? "text-[#141314]/70 hover:text-[#141314]" : "text-white/70 hover:text-white"
                            )}
                          >
                            {item.label}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Primary CTA */}
            <div
              className={cn(
                "relative z-10 hidden items-center transition-all duration-500 sm:flex",
                isExpandedPill
                  ? "pointer-events-none translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            >
              <Button
                variant="primary"
                withSquareIcon
                href={NAVIGATION_DATA.ctaButton.href}
              >
                {NAVIGATION_DATA.ctaButton.label}
              </Button>
            </div>
          </div>
        </Container>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
