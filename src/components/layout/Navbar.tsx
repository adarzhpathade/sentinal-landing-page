"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { NAVIGATION_DATA } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/utils/cn";

export interface NavbarProps {
  className?: string;
}

/**
 * Reusable Navbar component implementing the exact header layout of the reference design:
 * Left: Bold boxy wordmark, Center: MENU == trigger, Right: Primary CTA button with square box.
 * Becomes sticky and forms a background box on scroll.
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(({ className }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      data-hero-nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex w-full transition-all duration-300",
        isScrolled 
          ? "bg-[#282828] py-4 sm:py-5 shadow-2xl" 
          : "bg-transparent pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-10",
        className
      )}
    >
      <Container>
        <div className="flex w-full items-center justify-between">
          {/* Left: Brand Wordmark */}
          <a
            href="#"
            className="font-sans text-xl font-bold tracking-[0.1em] text-white uppercase transition-opacity hover:opacity-80 md:text-2xl"
            aria-label="Sentinel Home"
          >
            {NAVIGATION_DATA.brand}
          </a>

          {/* Center: Menu Trigger (MENU ==) */}
          <button
            type="button"
            className="group flex items-center gap-3 py-2 text-xs md:text-sm font-mono font-normal tracking-[0.05em] text-white/90 uppercase transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB460D]"
            aria-label="Open Navigation Menu"
          >
            <span>{NAVIGATION_DATA.menuTrigger}</span>
            <span className="flex flex-col gap-[3px] w-4">
              <span className="h-[2px] w-full bg-white transition-all duration-200 group-hover:bg-[#FB460D]" />
              <span className="h-[2px] w-full bg-white transition-all duration-200 group-hover:bg-[#FB460D]" />
            </span>
          </button>
          
          {/* Right: Primary CTA with square addon box (Hidden on extra small screens to prevent crowding) */}
          <div className="hidden sm:flex items-center">
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
});

Navbar.displayName = "Navbar";
