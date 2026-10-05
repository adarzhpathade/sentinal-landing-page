"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import { Navbar } from "@/components/layout/Navbar";
import AnimatedFooter from "@/components/ui/AnimatedFooter";
import { Container } from "@/components/layout/Container";
import { FeatureCard } from "@/sections/Features";
import ScrambleHover from "@/components/ui/ScrambleHover";
import { Button } from "@/components/ui/Button";
import { RELEASES_CONFIG, getDetectedOs, getPrimaryDownloadUrl } from "@/data/releases";

const CliCommandBox = ({ 
  command, 
  comingSoon = true,
  label = "Package Manager" 
}: { 
  command: string; 
  comingSoon?: boolean;
  label?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6F6F6F]">
          {label}
        </span>
        {comingSoon && (
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#6F6F6F] border border-black/15 bg-black/[0.04] px-2 py-0.5">
            Coming Soon
          </span>
        )}
      </div>
      <div 
        onClick={handleCopy}
        className="group relative w-full h-14 border border-black/10 bg-[#F9F9F9] hover:bg-[#EAEAEA] hover:border-black/30 transition-all duration-300 flex items-center justify-between px-4 cursor-pointer"
        title={comingSoon ? "Copy command (package coming soon)" : "Copy command"}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="font-mono text-[#6F6F6F] text-[11px] font-bold opacity-70">$&gt;</span>
          <span className="font-mono text-xs sm:text-[13px] text-[#141314]/80 truncate">{command}</span>
        </div>
        <div className="shrink-0 ml-4 flex items-center justify-center w-6 h-6 rounded bg-black/5 group-hover:bg-black/10 transition-colors">
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3 text-[#141314]/60 group-hover:text-[#141314]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default function DownloadPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const topGridRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const bottomHeaderRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("auto") === "true") {
        const os = getDetectedOs();
        const url = getPrimaryDownloadUrl(os);
        if (url) {
          setTimeout(() => setDownloadTriggered(true), 0);
          const a = document.createElement("a");
          a.href = url;
          a.rel = "noopener noreferrer";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }
    }
  }, []);
  
  useGSAP(() => {
    // Top Section (Page Load)
    const tl1 = gsap.timeline({ delay: 0.2 });
    
    if (topHeaderRef.current) {
      tl1.from(topHeaderRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    if (topGridRef.current) {
      tl1.from(
        gsap.utils.toArray(topGridRef.current.children),
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // Bottom Section (ScrollTrigger)
    if (bottomSectionRef.current) {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: bottomSectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      if (bottomHeaderRef.current) {
        tl2.from(bottomHeaderRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      if (bottomGridRef.current) {
        tl2.from(
          gsap.utils.toArray(bottomGridRef.current.children),
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }
  }, { scope: containerRef });

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#EFEFEF] text-[#141314]">
      <Navbar theme="light" />
      
      <div ref={containerRef} className="relative z-10 flex flex-col w-full flex-1 pt-32 pb-32 md:pt-48 md:pb-48 bg-[#EFEFEF]">
        <Container>
          <div className="w-full mb-32 md:mb-48">
            {/* Top Section (Downloads) */}
            <div ref={topHeaderRef} className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-start">
              <div className="flex flex-col gap-4">
                <h1 className="font-sans text-[40px] leading-[0.9] font-normal tracking-tight sm:text-[48px] md:text-[56px] text-[#141314]">
                  Available on<br />Mac, Linux and Windows.
                </h1>
                <div className="mt-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-[#141314] uppercase sm:text-[11px]">
                  <div className="h-2 w-2 bg-[#6F6F6F]" />
                  <p>Cross-platform support.</p>
                </div>
              </div>
              <div className="mt-2 font-mono text-[11px] tracking-[0.15em] text-[#6F6F6F] uppercase sm:text-xs md:mt-0">
                {"// DOWNLOAD"}
              </div>
            </div>

            {downloadTriggered && (
              <div className="mb-10 flex items-center justify-between border border-[#ABABAB] bg-[#E3E3E3] px-6 py-4 text-xs font-mono uppercase tracking-wider text-[#141314]">
                <span>Your download should begin automatically. If not, choose your build below.</span>
                <button 
                  type="button" 
                  onClick={() => setDownloadTriggered(false)} 
                  className="text-[#6F6F6F] hover:text-[#141314] font-bold text-sm px-2 cursor-pointer"
                  aria-label="Dismiss notice"
                >
                  ✕
                </button>
              </div>
            )}

            <div ref={topGridRef} className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12 w-full">
              
              {/* MAC */}
              <div className="relative flex flex-col gap-8 w-full md:after:absolute md:after:right-[calc(-1.25rem-0.5px)] lg:after:right-[calc(-1.5rem-0.5px)] md:after:top-0 md:after:h-full md:after:w-[1px] md:after:bg-black/10">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-[#6F6F6F]" />
                  <h2 className="font-sans text-2xl sm:text-3xl md:text-[32px] font-normal tracking-tight text-[#141314]">Mac</h2>
                </div>
                
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between w-full h-14">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="APPLE SILICON (M1-M4)" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.mac.items[0].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.dmg</Button>
                  </div>
                  <div className="flex items-center justify-between w-full h-14 border-t border-black/5">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="INTEL PROCESSOR (x64)" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.mac.items[1].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.dmg</Button>
                  </div>
                  <div className="mt-8">
                    <CliCommandBox command={RELEASES_CONFIG.mac.cliCommand} comingSoon label="Homebrew" />
                  </div>
                </div>
              </div>

              {/* WINDOWS */}
              <div className="relative flex flex-col gap-8 w-full md:after:absolute md:after:right-[calc(-1.25rem-0.5px)] lg:after:right-[calc(-1.5rem-0.5px)] md:after:top-0 md:after:h-full md:after:w-[1px] md:after:bg-black/10">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-[#6F6F6F]" />
                  <h2 className="font-sans text-2xl sm:text-3xl md:text-[32px] font-normal tracking-tight text-[#141314]">Windows</h2>
                </div>
                
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between w-full h-14">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="WINDOWS 10/11 x64 (SETUP)" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.windows.items[0].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.exe</Button>
                  </div>
                  <div className="flex items-center justify-between w-full h-14 border-t border-black/5">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="WINDOWS 10/11 x64 (MSI)" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.windows.items[1].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.msi</Button>
                  </div>
                  <div className="mt-8">
                    <CliCommandBox command={RELEASES_CONFIG.windows.cliCommand} comingSoon label="Windows Package Manager" />
                  </div>
                </div>
              </div>

              {/* LINUX */}
              <div className="flex flex-col gap-8 w-full">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-[#6F6F6F]" />
                  <h2 className="font-sans text-2xl sm:text-3xl md:text-[32px] font-normal tracking-tight text-[#141314]">Linux</h2>
                </div>
                
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between w-full h-14">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="DEBIAN / UBUNTU x64" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.linux.items[0].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.deb</Button>
                  </div>
                  <div className="flex items-center justify-between w-full h-14 border-t border-black/5">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="UNIVERSAL (APPIMAGE)" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.linux.items[1].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.AppImage</Button>
                  </div>
                  <div className="flex items-center justify-between w-full h-14 border-t border-black/5">
                    <ScrambleHover triggerOnView disableHover sequential scrambleSpeed={20} scrambledClassName="text-[#6F6F6F]" text="FEDORA / RHEL x64" className="text-[13px] font-sans tracking-wide uppercase text-[#222]/80" />
                    <Button variant="primary" withSquareIcon href={RELEASES_CONFIG.linux.items[2].url} target="_blank" rel="noopener noreferrer" className="ml-auto h-10 shrink-0">.rpm</Button>
                  </div>
                  <div className="mt-8">
                    <CliCommandBox command={RELEASES_CONFIG.linux.cliCommand} comingSoon label="Install Script" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Section (Use Cases) */}
          <div ref={bottomSectionRef} className="w-full">
            <div ref={bottomHeaderRef} className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-start">
              <div className="flex flex-col gap-4">
                <h1 className="font-sans text-[40px] leading-[0.9] font-normal tracking-tight sm:text-[48px] md:text-[56px] text-[#141314]">
                  Use Cero<br />anytime, anywhere.
                </h1>
                <div className="mt-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-[#141314] uppercase sm:text-[11px]">
                  <div className="h-2 w-2 bg-[#6F6F6F]" />
                  <p>Take your terminal everywhere.</p>
                </div>
              </div>
              <div className="mt-2 font-mono text-[11px] tracking-[0.15em] text-[#6F6F6F] uppercase sm:text-xs md:mt-0">
                {"// USE CASES"}
              </div>
            </div>

            <div ref={bottomGridRef} className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12 w-full">
              {[
                {
                  id: "dl-1",
                  title: "As Terminal",
                  description: "A fast, modern drop-in replacement for your daily terminal workflows."
                },
                {
                  id: "dl-2",
                  title: "As Agent",
                  description: "Delegate complex, multi-step development tasks to the autonomous AI agent."
                },
                {
                  id: "dl-3",
                  title: "As Assistant",
                  description: "Get intelligent, context-aware coding help directly where you work."
                }
              ].map((feature) => (
                <FeatureCard 
                  key={feature.id} 
                  feature={feature} 
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Footer reveal: clip-path container unveils the fixed footer as you scroll */}
      <div
        id="footer"
        className="relative h-[70svh] md:h-[80svh] w-full z-20 mt-auto"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 left-0 h-[70svh] md:h-[80svh] w-full">
          <AnimatedFooter charColor="#8f8f8f" revealOnScroll={false} />
        </div>
      </div>
    </main>
  );
}
