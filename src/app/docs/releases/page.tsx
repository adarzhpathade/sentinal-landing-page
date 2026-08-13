"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ReleasesPage() {
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
          Release Notes
        </h1>
        <div className="docs-content-header text-[#FB460D] tracking-widest text-sm mt-2">
          {"// UPDATES"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Stay up to date with the latest features, improvements, and bug fixes to the Sentinel AI terminal.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-12" />

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight">Sentinel Public Beta</h2>
            <span className="text-[#FB460D] font-mono text-sm border border-[#FB460D]/30 px-3 py-1 bg-[#FB460D]/10">
              v0.1.0
            </span>
          </div>

          <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
            <p>
              We are thrilled to announce the <strong className="text-white light:text-black">Public Beta release of Sentinel</strong>, 
              the next-generation, AI-native terminal built exclusively for developers, DevOps engineers, and power users.
            </p>
            <p>
              Sentinel bridges the gap between traditional high-speed terminal performance and conversational AI automation, 
              giving you an intelligent interface that doesn&apos;t sacrifice your existing muscle memory.
            </p>

            <h3 className="text-xl text-white light:text-black font-normal tracking-tight mt-12 mb-4">What&apos;s New in the Beta</h3>
            <ul className="space-y-5 mt-6">
              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
                <p>
                  <span className="text-[#FB460D] font-semibold tracking-wide">The Explicit &gt; AI Trigger:</span>{" "}
                  Continue using standard shell commands (<code>ls</code>, <code>npm run</code>, <code>git</code>) with zero overhead. 
                  When you need automation, simply prefix your prompt with <code>&gt;</code> to invoke conversational orchestration.
                </p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
                <p>
                  <span className="text-[#FB460D] font-semibold tracking-wide">Universal IDE Launchers:</span>{" "}
                  Natively integrates with your coding environments (VS Code, Cursor, Xcode) using intelligent natural language grammar resolution. 
                  Sentinel understands contexts like &quot;this folder&quot; or &quot;here&quot; effortlessly.
                </p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
                <p>
                  <span className="text-[#FB460D] font-semibold tracking-wide">Zero-Trust Security Engine:</span>{" "}
                  We&apos;ve implemented a visual, interactive security hold for gated, destructive operations. Harmless inquiries run instantly, 
                  while risky actions demand your explicit visual consent.
                </p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
                <p>
                  <span className="text-[#FB460D] font-semibold tracking-wide">Clean Screen Architecture:</span>{" "}
                  Direct xterm buffer wiping keeps your workspace absolutely clutter-free, stripping away annoying end-of-workflow logs 
                  when you execute <code>&gt; clear terminal</code>.
                </p>
              </li>
            </ul>

            <h3 className="text-xl text-white light:text-black font-normal tracking-tight mt-12 mb-4">Feedback & Bug Reports</h3>
            <p>
              As this is a Beta release, you might encounter some rough edges. We are actively collecting feedback to shape the future of Sentinel.
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-center gap-3">
                <span className="text-[#FB460D]">—</span>
                <p>
                  Found a bug? Open an issue on our <a href="https://github.com/NetPranav/Sentinal-Terminal" target="_blank" rel="noopener noreferrer" className="text-[#FB460D] hover:underline transition-all">GitHub Repository</a>.
                </p>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FB460D]">—</span>
                <p>Have a feature request? Join the discussion and let us know what you&apos;d like to see next!</p>
              </li>
            </ul>
            
            <p className="mt-8 italic text-white/40 light:text-black/40">
              Thank you to all our early testers and contributors. We can&apos;t wait to see how Sentinel accelerates your workflows!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
