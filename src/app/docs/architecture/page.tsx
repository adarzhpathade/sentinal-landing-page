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
          Architecture &amp; Capabilities
        </h1>
        <div className="docs-content-header text-[#ABABAB] light:text-[#6F6F6F] tracking-widest text-sm mt-2">
          {"// CAPABILITIES"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Cero is an AI-native terminal engineered with a high-performance Tauri v2 + Rust backend, 
            hardware-accelerated WebGL frontend, and local llama.cpp embedded inference engine.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />
        
        {/* Core System Architecture */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          System Architecture
        </h2>

        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Cero pairs the speed of low-level system utilities with an embedded language model 
            layer while preserving the raw execution latency developers expect from a modern terminal.
          </p>

          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-6 space-y-4">
            <h3 className="text-[#ABABAB] light:text-[#6F6F6F] text-xs uppercase tracking-widest font-semibold">Architecture Layers</h3>
            <ul className="space-y-3 text-xs md:text-sm">
              <li className="flex items-start gap-3">
                <span className="text-white light:text-black font-bold">1. UI &amp; Display:</span>
                <span>Tauri v2 + WebGL xterm.js terminal canvas with zero-latency input rendering and multi-pane support.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white light:text-black font-bold">2. Rust Core &amp; PTY:</span>
                <span>Asynchronous pseudo-terminal multiplexer communicating directly with bash, zsh, fish, or PowerShell.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white light:text-black font-bold">3. Local Inference Engine:</span>
                <span>Embedded llama.cpp with Metal acceleration on Apple Silicon and Vulkan / CPU acceleration on Windows and Linux.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white light:text-black font-bold">4. Zero-Trust Security:</span>
                <span>Pre-execution risk analyzer enforcing interactive permission gates for destructive disk, network, or policy changes.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* The Explicit > AI Trigger */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          The Explicit &gt; AI Trigger
        </h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Cero never gets in the way of muscle memory. When you type traditional command 
            syntax (<code>ls -la</code>, <code>git status</code>, <code>npm run dev</code>), Cero executes directly 
            in your high-speed PTY session with zero overhead.
          </p>
          <p>
            When you want to summon conversational automation, simply prefix your prompt with the <code className="text-[#ABABAB] light:text-[#6F6F6F] font-bold">&gt; </code> symbol:
          </p>
          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-4 md:p-6 my-4 space-y-4 text-xs md:text-sm overflow-x-auto">
            <div>
              <p className="text-white/40 light:text-black/40 mb-1"># Standard shell command (zero interception)</p>
              <code className="text-white light:text-black break-words">pranav@MacBook ~ % ls -l /Applications</code>
            </div>
            <div>
              <p className="text-white/40 light:text-black/40 mb-1"># AI Automation command</p>
              <code className="text-[#ABABAB] light:text-[#6F6F6F] break-words">&gt; open this folder inside cursor</code>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* SERL Engine */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          Self-Evolving Diagnostics (SERL)
        </h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Cero features a <strong className="text-white light:text-black">Self-Evolving Reinforcement Learning (SERL)</strong> feedback 
            loop that monitors runtime errors, nonzero exit codes, and stderr emissions.
          </p>
          <ul className="space-y-5 mt-6">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
              <p>
                <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">3-Strike Self-Healing:</span>{" "}
                When a command fails, Cero parses the stderr diagnostic output, formulates an auto-remediation patch, and offers to retry.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
              <p>
                <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Unconditional Refusal Interception:</span>{" "}
                Intercepts evasive generic model responses (&quot;as an AI language model I cannot...&quot;) and actively computes executable solutions.
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Universal IDE Launchers */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          Universal IDE Launchers
        </h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Cero natively connects with your favorite coding tools and development environments using 
            intelligent natural language grammar resolution and native operating system launch services.
          </p>
          <ul className="space-y-5 mt-6">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
              <p>
                <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Natural Phrase Resolution:</span>{" "}
                Speak naturally—phrases like &quot;this folder&quot; or &quot;here&quot; are instantly translated to your current working directory.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
              <p>
                <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Resilient Alias Mapping:</span>{" "}
                Strips leading articles and maps conversational aliases to exact system bundle names (e.g. &quot;VS Code&quot;, &quot;Cursor&quot;, &quot;Xcode&quot;, &quot;IntelliJ&quot;).
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Smart Security */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          Zero-Trust Security &amp; Key Vault
        </h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Cero guards your system with a visual, interactive security gate and encrypted OS credential storage.
          </p>
          <ul className="space-y-5 mt-6">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
              <p>
                <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">Gated Destructive Operations:</span>{" "}
                High-risk actions (e.g. recursive removals, partition changes, permission revokes) immediately trigger an interactive security hold requiring explicit approval.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#ABABAB] light:bg-[#6F6F6F] flex-shrink-0" />
              <p>
                <span className="text-[#ABABAB] light:text-[#6F6F6F] font-semibold tracking-wide">OS Keychain Storage:</span>{" "}
                If you configure cloud endpoints, your API keys are stored in the macOS Keychain or Windows Credential Manager—never in plaintext files or browser cookies.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
