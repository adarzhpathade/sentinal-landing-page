"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

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
        <div className="docs-content-header text-[#ABABAB] light:text-[#6F6F6F] tracking-widest text-sm mt-2">
          {"// UPDATES"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Stay up to date with the latest features, improvements, and cross-platform releases for Cero.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Current Major Release: v2.2.x */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight">
              Cero 2.2 — Cross-Platform &amp; SERL Engine
            </h2>
            <span className="text-[#ABABAB] light:text-[#6F6F6F] font-mono text-sm border border-[#ABABAB]/30 light:border-[#6F6F6F]/45 px-3 py-1 bg-[#ABABAB]/10 light:bg-[#6F6F6F]/15">
              v2.2.0 / v2.2.3
            </span>
          </div>

          <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
            <p>
              This landmark release brings the official rebrand from <strong className="text-white light:text-black">Sentinel Terminal to Cero</strong>, 
              delivering full native support across <strong className="text-white light:text-black">macOS (Apple Silicon &amp; Intel)</strong>,{" "}
              <strong className="text-white light:text-black">Windows 10/11 x64</strong>, and{" "}
              <strong className="text-white light:text-black">Linux</strong> (.deb, .rpm, .AppImage, .pkg.tar.zst).
            </p>

            <h3 className="text-xl text-white light:text-black font-normal tracking-tight mt-10 mb-4">What&apos;s New in v2.2</h3>
            
            <ul className="space-y-6 mt-6">
              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
                <p>
                  <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Self-Evolving Reinforcement Learning (SERL):</span>{" "}
                  An autonomous self-healing diagnostics feedback loop that automatically catches nonzero exit codes and stderr streams with a 3-strike self-remediation cycle.
                </p>
              </li>

              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
                <p>
                  <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Cross-Platform Desktop Installers:</span>{" "}
                  Native DMG packages for macOS, standalone EXE setups and MSI installers for Windows, and comprehensive Linux distribution packaging (Debian, Fedora, Arch, Universal AppImage).
                </p>
              </li>

              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
                <p>
                  <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Native System Settings by Request:</span>{" "}
                  Execute system requests naturally: <code className="text-white light:text-black">&gt;turn wifi off</code>, <code className="text-white light:text-black">&gt;dark mode</code>, <code className="text-white light:text-black">&gt;set volume to 60%</code>, or <code className="text-white light:text-black">&gt;bluetooth</code>. Cero transparently translates requests to native OS APIs.
                </p>
              </li>

              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
                <p>
                  <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Companion Shell Launcher (@netpranav/cero-cli):</span>{" "}
                  Launch Cero anywhere using the global <code className="text-white light:text-black">cero</code> CLI command or run automated <code className="text-white light:text-black">.flow</code> multi-step workflows.
                </p>
              </li>

              <li className="flex gap-4 items-start">
                <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
                <p>
                  <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Flexible AI Engine:</span>{" "}
                  Choose between 4 quantized local model tiers (0.5B, 1.5B, 3B, 4B) accelerated by Metal or Vulkan, local Ollama, or secure cloud API keys stored in your OS Keychain / Credential Manager.
                </p>
              </li>
            </ul>

            <div className="pt-4">
              <Link 
                href="/download" 
                className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#141314] bg-[#ABABAB] hover:bg-[#BEBEBE] px-6 py-2.5 transition-colors"
              >
                Download Cero v2.2 →
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Milestone Release: v2.0.0 */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight">
              v2.0.0 — Production Core
            </h2>
            <span className="text-[#ABABAB] light:text-[#6F6F6F] font-mono text-sm border border-[#ABABAB]/30 light:border-[#6F6F6F]/45 px-3 py-1 bg-[#ABABAB]/10 light:bg-[#6F6F6F]/15">
              v2.0.0
            </span>
          </div>

          <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
            <p>
              The foundational release establishing the high-speed Rust + Tauri backend, speculative shadow-PTY simulation, 
              zero-trust gated destructive commands, and glassmorphic WebGL multi-pane terminal interface.
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Feedback Section */}
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <h3 className="text-xl text-white light:text-black font-normal tracking-tight mb-4">Feedback &amp; Bug Reports</h3>
          <p>
            Have an issue, feature request, or feedback? All community reports are welcome on our{" "}
            <a 
              href="https://github.com/NetPranav/Cero-Terminal/issues" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#ABABAB] light:text-[#6F6F6F] hover:underline"
            >
              GitHub Issue Tracker
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
