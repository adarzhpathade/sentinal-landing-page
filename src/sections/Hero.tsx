"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { HERO_DATA } from "@/data/hero";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { BlurText } from "@/components/ui/BlurText";
import { GradientBlinds } from "@/components/ui/GradientBlinds";
import { createHeroTimeline } from "@/animations/heroTimeline";
import { cn } from "@/utils/cn";

export interface HeroProps {
  className?: string;
}

/**
 * Complete, production-ready Hero section matching the reference design layout & padding:
 * Sleek left-aligned typography positioned above center, generous vertical/horizontal padding,
 * sharp two-block CTA buttons, bottom compatibility badges anchor, and right-weighted interactive field.
 */
export const Hero: React.FC<HeroProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cleanup = createHeroTimeline({
        container: sectionRef.current,
        navElement: navRef.current,
        titleElement: titleRef.current,
        descriptionElement: descriptionRef.current,
        buttonsContainer: buttonsRef.current,
        bottomBarElement: bottomBarRef.current,
        backgroundElement: bgRef.current,
      });

      return () => {
        if (cleanup) cleanup();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-[100svh] w-full flex-col justify-between overflow-x-hidden bg-[#141314] text-white",
        className
      )}
      aria-label="Sentinel Hero Section"
    >
      {/* Interactive Gradient Blinds Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full">
        <GradientBlinds
          gradientColors={[
            "#0d0c0d",
            "#111011",
            "#161516",
            "#1c1918",
            "#261612",
            "#1c1918",
            "#141314",
            "#0d0c0d",
          ]}
          angle={142}
          noise={0.25}
          blindCount={24}
          blindMinWidth={15}
          spotlightRadius={0.5}
          spotlightSoftness={1.5}
          spotlightOpacity={0.4}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
          className="absolute inset-0 z-0 pointer-events-auto"
        />
      </div>

      {/* Top Navigation Bar */}
      <Navbar ref={navRef} />

      {/* Main Hero Content (Left-aligned, authoritative vertical padding above center) */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-end sm:justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-16 md:pb-24">
        <Container>
          <div className="w-full max-w-[1400px] mt-8 sm:mt-12 md:mt-16 lg:mt-24">
            {/* Sleek Display Title with BlurText reveal */}
            <h1
              ref={titleRef}
              className="text-left font-sans text-[40px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] font-normal sm:font-medium tracking-tight text-white leading-[0.9] select-none"
            >
              <BlurText
                text={HERO_DATA.title.line1}
                delay={100}
                animateBy="words"
                direction="bottom"
                as="div"
                className="block"
              />
              <BlurText
                text={HERO_DATA.title.line2}
                delay={100}
                initialDelay={400}
                animateBy="words"
                direction="bottom"
                as="div"
                className="block text-white/95"
              />
            </h1>

            {/* Compact Editorial Description */}
            <p
              ref={descriptionRef}
              className="text-left mt-2 sm:mt-3 md:mt-4 max-w-[280px] sm:max-w-[380px] md:max-w-[480px] font-sans text-xs sm:text-sm md:text-base font-normal leading-relaxed text-white/50"
            >
              {HERO_DATA.description}
            </p>

            {/* CTA Actions */}
            <div
              ref={buttonsRef}
              className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 md:gap-8"
            >
              <Button
                variant="primary"
                withSquareIcon
                href={HERO_DATA.primaryCta.href}
              >
                {HERO_DATA.primaryCta.label}
              </Button>
              <Button
                variant="secondary"
                href={HERO_DATA.secondaryCta.href}
                className="text-xs sm:text-sm text-white/70 hover:text-white"
              >
                {HERO_DATA.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Anchor Bar (Technical Badges anchored to bottom edge) */}
      <div ref={bottomBarRef} className="relative z-10 mt-auto w-full pb-8 sm:pb-10 md:pb-12">
        <Container>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:gap-x-8 sm:gap-y-4 md:gap-10 text-[11px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.15em] sm:tracking-[0.2em] text-white/30 uppercase select-none">
            <span className="hover:text-white/60 transition-colors">BASH</span>
            <span className="hover:text-white/60 transition-colors">ZSH</span>
            <span className="hover:text-white/60 transition-colors">POWERSHELL</span>
            <span className="hover:text-white/60 transition-colors">FISH</span>
            <span className="text-[#FB460D]/70 hover:text-[#FB460D] transition-colors">
              + 100% LOCAL MODELS
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
