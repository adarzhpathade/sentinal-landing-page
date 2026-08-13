"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function InstallationPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(
      ".docs-content-title",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0
    );

    tl.from(
      ".docs-content-header",
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=0.4"
    );

    tl.from(
      ".docs-content-body",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, { scope: contentRef, dependencies: [] });

  return (
    <div ref={contentRef} className="pt-16 px-6 md:pt-32 md:px-12 lg:px-24 pb-24 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="docs-content-title text-3xl md:text-[2.75rem] leading-none font-normal tracking-tight">
          Installation
        </h1>
        <div className="docs-content-header text-[#FB460D] tracking-widest text-sm mt-2">
          {"// GETTING STARTED"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Getting started with Sentinel is designed to be as frictionless as possible. 
            Currently, Sentinel is supported on macOS and Linux environments.
          </p>
          
          <p className="text-white/60 light:text-black/60 leading-relaxed">
            Because Sentinel relies on local LLM execution to maintain privacy and offline capabilities, 
            we recommend having at least 16GB of RAM for optimal performance, though it can run on 8GB with smaller models.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-6" />
        
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">Quick Install</h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            The easiest way to install Sentinel is via our official install script. It automatically detects 
            your OS and architecture, downloads the correct binary, and sets up the necessary environment paths.
          </p>

          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-6 my-4 flex items-center justify-between">
            <code className="text-[#FB460D] font-mono text-sm">
              curl -fsSL https://sentinel.dev/install | bash
            </code>
          </div>

          <p>
          </p>

          <h3 className="text-xl text-white light:text-black font-normal tracking-tight mt-12 mb-4">Manual Installation</h3>
          <p className="text-white/60 light:text-black/60">
            If you prefer to install Sentinel manually or compile from source, you can find the detailed build 
            instructions on our <a href="https://github.com/NetPranav/Sentinal-Terminal" target="_blank" rel="noopener noreferrer" className="text-[#FB460D] hover:underline transition-all">GitHub repository</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
