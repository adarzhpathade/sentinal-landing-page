"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { HOW_IT_WORKS_DATA, type TimelineStep } from "@/data/howItWorks";
import { cn } from "@/utils/cn";
import ScrambleHover from "@/components/ui/ScrambleHover";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface HowItWorksProps {
  className?: string;
}

const TimelineContent = ({
  step,
  isTop,
}: {
  step: TimelineStep;
  isTop: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleTrigger = () => setIsActive(true);
    el.addEventListener("scrambleStart", handleTrigger);
    return () => el.removeEventListener("scrambleStart", handleTrigger);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "timeline-content absolute left-[10px] flex w-max max-w-[280px] -translate-x-1/2 flex-col items-center text-center",
        isTop ? "bottom-full pb-[24px]" : "top-full pt-[24px]"
      )}
    >
      <h3 className="font-mono text-[20px] leading-tight font-normal text-[#141314]">
        <ScrambleHover
          text={step.title}
          sequential={true}
          scrambledClassName="text-[#FB460D]"
          customHoverState={isActive}
          className="font-mono text-[20px] leading-tight font-normal text-[#141314]"
        />
      </h3>
      {step.description && (
        <p className="mt-2 text-[12px] leading-relaxed whitespace-pre-line text-[#141314]/50">
          {step.description}
        </p>
      )}
    </div>
  );
};

export const HowItWorks: React.FC<HowItWorksProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const desktopTimelineRef = useRef<HTMLDivElement | null>(null);
  const mobileTimelineRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current) return;

      // Header animation
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Desktop: pin the section, play the timeline once, elements stay visible
      if (desktopTimelineRef.current) {
        const line = desktopTimelineRef.current.querySelector(".timeline-line");
        const largeDots = Array.from(
          desktopTimelineRef.current.querySelectorAll(".timeline-dot.large")
        );
        const smallDots = Array.from(
          desktopTimelineRef.current.querySelectorAll(".timeline-dot.small")
        );
        const contents = Array.from(
          desktopTimelineRef.current.querySelectorAll(".timeline-content")
        );

        if (line && largeDots.length > 0) {
          // Build the reveal timeline (paused — triggered by ScrollTrigger)
          const tl = gsap.timeline({ paused: true });

          // 1. Draw the line across
          tl.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, ease: "none", duration: 1.2 }
          );

          // 2. Each large dot pops in with rotation
          largeDots.forEach((dot, i) => {
            tl.fromTo(
              dot,
              { scale: 0, opacity: 0, rotation: 180 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                ease: "back.out(2)",
                duration: 0.4,
              },
              0.3 + i * 0.5
            );
          });

          // 3. Small interstitial dots appear between large dots
          smallDots.forEach((dot, i) => {
            tl.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, ease: "power2.out", duration: 0.3 },
              0.55 + i * 0.5
            );
          });

          // 4. Content blocks fade in after each large dot + trigger scramble
          contents.forEach((content, i) => {
            const isTop = (content as HTMLElement).classList.contains(
              "bottom-full"
            );
            tl.fromTo(
              content,
              { y: isTop ? 20 : -20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                duration: 0.4,
                onStart: () => {
                  content.dispatchEvent(new CustomEvent("scrambleStart"));
                },
              },
              0.4 + i * 0.5
            );
          });

          // Trigger the animation when the header reaches 70% down the viewport
          ScrollTrigger.create({
            trigger: headerRef.current,
            start: "top 70%",
            onEnter: () => tl.play(),
          });

          // Pin the section when it reaches the top
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            anticipatePin: 1,
          });
        }
      }

      // Mobile: animate dot and content separately
      if (mobileTimelineRef.current) {
        const nodes =
          mobileTimelineRef.current.querySelectorAll(".mobile-node");
        nodes.forEach((node) => {
          const dot = node.querySelector(".mobile-dot");
          const content = node.querySelector(".mobile-content");
          const isLeft = node.classList.contains("flex-row");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          if (dot) {
            tl.fromTo(
              dot,
              { xPercent: -50, scale: 0, opacity: 0, rotation: 180 },
              {
                xPercent: -50,
                scale: 1,
                opacity: 1,
                rotation: 0,
                ease: "back.out(2)",
                duration: 0.4,
              }
            );
          }

          if (content) {
            tl.fromTo(
              content,
              { x: isLeft ? -16 : 16, opacity: 0 },
              { x: 0, opacity: 1, ease: "power2.out", duration: 0.5 },
              "-=0.2"
            );
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-20 w-full bg-[#F4F4F4] pb-24 text-[#141314] sm:pb-32 md:pb-40",
        className
      )}
      aria-label="How it works Section"
    >
      <Container>
        <div className="w-full">
          {/* Header Row */}
          <div
            ref={headerRef}
            className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-start"
          >
            <div className="flex flex-col gap-4">
              <h2 className="font-sans text-[48px] leading-[0.9] font-normal tracking-tight md:text-[64px]">
                How it works.
              </h2>
              <div className="mt-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-[#141314] uppercase sm:text-[11px]">
                <div className="h-2 w-2 bg-[#FB460D]" />
                <p>From prompt to execution.</p>
              </div>
            </div>
            <div className="mt-2 font-mono text-[11px] tracking-[0.15em] text-[#FB460D] uppercase sm:text-xs md:mt-0">
              {"// PROCESS"}
            </div>
          </div>

          {/* Desktop Timeline */}
          <div
            ref={desktopTimelineRef}
            className="relative mt-32 mb-48 hidden w-full md:mt-48 md:mb-72 md:block"
          >
            <div className="w-full px-8 md:px-24 lg:px-40 xl:px-48">
              <div className="relative flex w-full items-center justify-between">
                {/* Horizontal Line */}
                <div className="timeline-line absolute top-1/2 right-0 left-0 h-[1px] -translate-y-1/2 bg-[#FB460D]" />

                {HOW_IT_WORKS_DATA.map((step, index) => {
                  const isTop = step.position === "top";

                  return (
                    <React.Fragment key={step.id}>
                      {/* Timeline Node */}
                      <div className="relative z-10">
                        {/* Large Square */}
                        <div className="timeline-dot large h-5 w-5 rounded-none bg-[#FB460D]" />

                        {/* Content Container */}
                        <TimelineContent step={step} isTop={isTop} />
                      </div>

                      {/* Small interstitial dot */}
                      {index < HOW_IT_WORKS_DATA.length - 1 && (
                        <div className="timeline-dot small relative z-10 h-2 w-2 rounded-none bg-[#FB460D]" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Alternating Timeline */}
          <div ref={mobileTimelineRef} className="relative mt-24 md:hidden">
            {/* Center vertical line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#FB460D]" />

            <div className="flex flex-col gap-12">
              {HOW_IT_WORKS_DATA.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <React.Fragment key={step.id}>
                    <div
                      className={cn(
                        "mobile-node relative flex items-start",
                        isLeft ? "flex-row" : "flex-row-reverse"
                      )}
                    >
                      {/* Dot on center line */}
                      <div className="mobile-dot absolute top-1 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-none bg-[#FB460D]" />

                      {/* Content */}
                      <div
                        className={cn(
                          "mobile-content w-[calc(50%-20px)]",
                          isLeft ? "pr-2 text-right" : "pl-2 text-left"
                        )}
                      >
                        <h3 className="font-mono text-[16px] leading-tight font-normal text-[#141314]">
                          <ScrambleHover
                            text={step.title}
                            sequential={true}
                            scrambledClassName="text-[#FB460D]"
                            triggerOnView={true}
                            className="font-mono text-[16px] leading-tight font-normal text-[#141314]"
                          />
                        </h3>
                        {step.description && (
                          <p className="mt-1.5 text-[11px] leading-relaxed text-[#141314]/50">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

HowItWorks.displayName = "HowItWorks";
