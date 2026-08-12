"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ArchitecturePage() {
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
          Architecture & Capabilities
        </h1>
        <div className="docs-content-header text-[#FB460D] tracking-widest text-sm mt-2">
          {"// CAPABILITIES"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Sentinel is engineered from the ground up to empower everyday developer workflows 
            with zero friction and visual excellence.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-6" />
        
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">The Explicit &gt; AI Trigger</h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Sentinel never gets in the way of your standard muscle memory. When you type traditional command 
            syntax (<code>ls -la</code>, <code>git status</code>, <code>npm run dev</code>), Sentinel executes directly 
            in your high-speed PTY session with zero overhead.
          </p>
          <p>
            When you want to summon conversational intelligence, simply prefix your prompt with the <code className="text-[#FB460D] font-bold">&gt; </code> symbol:
          </p>
          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-4 md:p-6 my-4 space-y-4 text-xs md:text-sm overflow-x-auto">
            <div>
              <p className="text-white/40 light:text-black/40 mb-1"># Standard shell command</p>
              <code className="text-white light:text-black break-words">pranav@MacBook ~ % ls -l /Applications</code>
            </div>
            <div>
              <p className="text-white/40 light:text-black/40 mb-1"># AI Automation command</p>
              <code className="text-[#FB460D] break-words">&gt; open this folder inside antigravity</code>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-6" />

        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">Universal IDE Launchers</h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Sentinel natively connects with your favorite coding tools and development environments. Using 
            intelligent natural language grammar resolution and native macOS Launch Services.
          </p>
          <ul className="space-y-5 mt-6">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Natural Phrase Resolution:</span>{" "}
                Speak naturally—phrases like &quot;this folder&quot; or &quot;here&quot; are instantly translated to your current working directory.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Resilient Resolution:</span>{" "}
                Strips leading articles and maps conversational aliases to exact system bundle names (e.g. &quot;Vs Code&quot;, &quot;Cursor&quot;, &quot;xcode&quot;).
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-6" />

        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">Smart Security</h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Sentinel incorporates a powerful <strong className="text-white light:text-black">Zero-Trust Security & Risk Engine</strong> that guards 
            your system against destructive commands.
          </p>
          <ul className="space-y-5 mt-6">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Trivial Whitelisting:</span>{" "}
                Harmless read-only operational inquiries execute immediately without triggering disruptive authentication holds.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Gated Destructive Operations:</span>{" "}
                High-risk actions immediately trigger an interactive visual security hold requiring mandatory explicit user consent.
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-6" />

        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">Clean Screen & Aesthetics</h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            When you command Sentinel to clear your workspace (<code className="text-white light:text-black">&gt; clear terminal</code>), Sentinel invokes 
            a direct xterm buffer wipe and completely suppresses end-of-workflow summary logs.
          </p>
          <p>
            Built with premium glassmorphic visual treatments, Sentinel lets you switch effortlessly between 
            <strong className="text-white light:text-black"> Classic Dark</strong>, <strong className="text-white light:text-black">Minimalist White</strong>, and vibrant <strong className="text-white light:text-black">Cyberpunk Neon</strong> themes.
          </p>
        </div>
      </div>
    </div>
  );
}
