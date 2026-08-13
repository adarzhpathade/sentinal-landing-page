"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BlurText } from "@/components/ui/BlurText";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DownloadProps {
  className?: string;
}

export const Download: React.FC<DownloadProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);
  const techStackRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Orange wipe effect
      tl.to(wipeRef.current, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.35,
        ease: "power2.inOut",
      })
      .set(techStackRef.current, { opacity: 1 })
      .to(wipeRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.35,
        ease: "power2.inOut",
      })

      // Buttons stagger in
      tl.from(buttonsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.1");

      // Parallax: subtle upward drift as user scrolls through
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-10 flex w-full overflow-hidden flex-col items-center justify-center bg-[#F8F9FA] text-[#141314] py-20 sm:py-24",
        className
      )}
      aria-label="Download Options"
    >
      <Container>
        <div ref={contentRef} className="flex flex-col items-center justify-center text-center">
          <h2 className="font-sans text-[32px] font-medium leading-[1] tracking-tight sm:text-[44px] md:text-[52px]">
            <BlurText
              text="Built using."
              delay={40}
              animateBy="words"
              direction="bottom"
              as="span"
              className="inline-block"
            />
          </h2>
          
          <div className="relative mt-6 flex items-center justify-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#141314] sm:mt-8 sm:text-[13px]">
            <div ref={wipeRef} className="absolute inset-y-0 -inset-x-3 z-10 origin-left scale-x-0 bg-[#FB460D]" />
            <div ref={techStackRef} className="flex flex-nowrap items-center justify-center whitespace-nowrap opacity-0">
              <span>TYPESCRIPT</span>
              <span className="mx-3 inline-block h-[6px] w-[6px] bg-[#FB460D] sm:mx-5 sm:h-[8px] sm:w-[8px]"></span>
              <span>JAVASCRIPT</span>
              <span className="mx-3 inline-block h-[6px] w-[6px] bg-[#FB460D] sm:mx-5 sm:h-[8px] sm:w-[8px]"></span>
              <span>RUST</span>
            </div>
          </div>

          <div
            ref={buttonsRef}
            className="mt-12 flex flex-col items-center justify-center gap-6"
          >
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Button 
                variant="primary" 
                withSquareIcon 
                className="w-[200px] whitespace-nowrap"
                href="/download"
              >
                DOWNLOAD
              </Button>
              <Button 
                variant="black" 
                className="w-[200px] whitespace-nowrap"
                href="https://github.com/NetPranav/Sentinal-Terminal"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW SOURCE
              </Button>
            </div>
            <p className="font-sans text-xs text-[#141314]/60 sm:text-sm text-center">
              Available for macOS, Windows, and Linux.<br className="sm:hidden" /> Free and open source.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

Download.displayName = "Download";
