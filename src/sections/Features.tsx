"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import ScrambleHover from "@/components/ui/ScrambleHover";
import { FEATURES_DATA } from "@/data/features";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export interface FeaturesProps {
  className?: string;
}

export const Features: React.FC<FeaturesProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate header elements
      tl.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate grid items
      const cards = gsap.utils.toArray(gridRef.current.children);
      tl.from(
        cards,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-20 w-full bg-[#F4F4F4] py-16 text-[#141314] sm:py-24 md:py-32",
        className
      )}
      aria-label="Features Section"
    >
      <Container>
        <div className="w-full max-w-[1400px]">
          {/* Header Row */}
          <div
            ref={headerRef}
            className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-start"
          >
            <div className="flex flex-col gap-4">
              <h2 className="font-sans text-[40px] leading-[0.9] font-normal tracking-tight sm:text-[48px] md:text-[56px]">
                Powerful Features.
              </h2>
              <div className="mt-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-[#141314] uppercase sm:text-[11px]">
                <div className="h-2 w-2 bg-[#FB460D]" />
                <p>Explore the capabilities.</p>
              </div>
            </div>

            <div className="mt-2 font-mono text-[11px] tracking-[0.15em] text-[#FB460D] uppercase sm:text-xs md:mt-0">
              // FEATURES
            </div>
          </div>

          {/* Features Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12"
          >
            {FEATURES_DATA.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

Features.displayName = "Features";

const FeatureCard = ({ feature }: { feature: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Match the -10% margin used inside ScrambleHover for perfect sync
  const { useInView } = require("motion/react");
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const triggerMobile = isMobile && isInView;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      ref={ref}
      className="group flex cursor-pointer flex-col"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="mb-4 flex w-fit items-center">
        <div
          className={cn(
            "h-2 overflow-hidden bg-[#FB460D] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            triggerMobile
              ? "mr-3 w-2"
              : "mr-0 w-0 md:group-hover:mr-3 md:group-hover:w-2"
          )}
        />
        <h3
          className={cn(
            "font-mono text-[11px] tracking-[0.15em] text-[#141314] uppercase transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xs",
            triggerMobile
              ? "translate-x-1"
              : "translate-x-0 md:group-hover:translate-x-1"
          )}
        >
          <ScrambleHover
            text={feature.title}
            sequential={true}
            scrambledClassName="text-[#FB460D]"
            triggerOnView="mobileOnly"
            customHoverState={isHovered}
          />
        </h3>
      </div>
      <div className="mb-4 h-[1px] w-full bg-[#141314]/10" />
      <p className="max-w-[320px] font-sans text-[12px] leading-relaxed font-normal whitespace-pre-line text-[#141314]/50 sm:text-[13px]">
        {feature.description}
      </p>
    </div>
  );
};
