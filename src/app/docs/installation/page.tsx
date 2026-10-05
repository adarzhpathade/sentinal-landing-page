"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

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
        <div className="docs-content-header text-[#ABABAB] light:text-[#6F6F6F] tracking-widest text-sm mt-2">
          {"// GETTING STARTED"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Cero is a cross-platform desktop terminal application available for macOS, Windows, and Linux.
            All release binaries are standalone and come with an optional shell launcher CLI.
          </p>
          
          <p className="text-white/60 light:text-black/60 leading-relaxed">
            Because Cero can run 100% local LLMs directly on your device, we recommend 16GB RAM for optimal
            performance with 3B/4B parameters. Smaller models (0.5B and 1.5B) run smoothly on 8GB machines, 
            or you can connect to local Ollama or your own cloud API keys.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Desktop Installers */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          Pre-built Desktop Binaries
        </h2>

        <div className="space-y-8 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Download the appropriate installer for your operating system directly from our{" "}
            <Link href="/download" className="text-[#ABABAB] light:text-[#6F6F6F] hover:underline font-semibold">
              Download Page
            </Link>{" "}
            or the official{" "}
            <a 
              href="https://github.com/NetPranav/Cero-Terminal/releases" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#ABABAB] light:text-[#6F6F6F] hover:underline font-semibold"
            >
              GitHub Releases
            </a>.
          </p>

          {/* macOS */}
          <div className="border border-white/10 light:border-black/10 p-6 space-y-4 bg-[#1C1A1C]/50 light:bg-gray-100/50">
            <h3 className="text-white light:text-black font-semibold text-base">macOS (Apple Silicon & Intel)</h3>
            <p>
              1. Download <code className="text-[#ABABAB] light:text-[#6F6F6F]">Cero.Terminal_2.2.0_aarch64.dmg</code> (M1/M2/M3/M4) or <code className="text-[#ABABAB] light:text-[#6F6F6F]">Cero_2.2.0_x64.dmg</code> (Intel).<br />
              2. Open the disk image and drag <strong className="text-white light:text-black font-medium">Cero.app</strong> into your <code className="text-[#ABABAB] light:text-[#6F6F6F]">/Applications</code> folder.<br />
              3. <strong className="text-white light:text-black">First Launch:</strong> Because early community releases are not Apple notarized, macOS may prompt with a security warning. Open <code className="text-white light:text-black">System Settings → Privacy & Security</code> and click <strong className="text-white light:text-black">Open Anyway</strong>.
            </p>
          </div>

          {/* Windows */}
          <div className="border border-white/10 light:border-black/10 p-6 space-y-4 bg-[#1C1A1C]/50 light:bg-gray-100/50">
            <h3 className="text-white light:text-black font-semibold text-base">Windows 10 (1803+) & Windows 11</h3>
            <p>
              1. Download either the executable installer (<code className="text-[#ABABAB] light:text-[#6F6F6F]">Cero_2.2.0_x64-setup.exe</code>) or the Windows Installer package (<code className="text-[#ABABAB] light:text-[#6F6F6F]">Cero_2.2.0_x64_en-US.msi</code>).<br />
              2. Run the installer and follow setup prompts.<br />
              3. <strong className="text-white light:text-black">First Launch:</strong> Windows SmartScreen may display &quot;Windows protected your PC&quot;. Click <strong className="text-white light:text-black">More info</strong>, then select <strong className="text-white light:text-black">Run anyway</strong>.
            </p>
          </div>

          {/* Linux */}
          <div className="border border-white/10 light:border-black/10 p-6 space-y-4 bg-[#1C1A1C]/50 light:bg-gray-100/50">
            <h3 className="text-white light:text-black font-semibold text-base">Linux Distributions</h3>
            <p className="mb-2">Install using your system package manager (requires WebKitGTK 4.1):</p>
            <div className="space-y-3">
              <div>
                <p className="text-white/40 light:text-black/40 text-xs mb-1"># Ubuntu 22.04+, Debian 12, Mint, Pop!_OS (.deb)</p>
                <code className="text-[#ABABAB] light:text-[#6F6F6F] block bg-black/40 light:bg-black/5 p-3 overflow-x-auto">
                  sudo apt install ./Cero_2.2.3_amd64.deb
                </code>
              </div>
              <div>
                <p className="text-white/40 light:text-black/40 text-xs mb-1"># Fedora 38+, openSUSE, RHEL (.rpm)</p>
                <code className="text-[#ABABAB] light:text-[#6F6F6F] block bg-black/40 light:bg-black/5 p-3 overflow-x-auto">
                  sudo dnf install ./Cero-2.2.3-1.x86_64.rpm
                </code>
              </div>
              <div>
                <p className="text-white/40 light:text-black/40 text-xs mb-1"># Arch Linux, Manjaro, EndeavourOS (.pkg.tar.zst)</p>
                <code className="text-[#ABABAB] light:text-[#6F6F6F] block bg-black/40 light:bg-black/5 p-3 overflow-x-auto">
                  sudo pacman -U ./cero-terminal-bin-2.2.3-1-x86_64.pkg.tar.zst
                </code>
              </div>
              <div>
                <p className="text-white/40 light:text-black/40 text-xs mb-1"># Standalone AppImage (Any x86_64 Linux)</p>
                <code className="text-[#ABABAB] light:text-[#6F6F6F] block bg-black/40 light:bg-black/5 p-3 overflow-x-auto">
                  chmod +x Cero_2.2.3_amd64.AppImage &amp;&amp; ./Cero_2.2.3_amd64.AppImage
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Optional CLI Launcher */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          Companion CLI Launcher
        </h2>

        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Cero includes an optional lightweight CLI command (<code className="text-white light:text-black">cero</code>) 
            that allows you to open Cero in your current working directory or execute automated <code className="text-white light:text-black">.flow</code> files 
            directly from any existing shell (bash, zsh, fish, PowerShell).
          </p>

          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-6 space-y-4">
            <p className="text-white/40 light:text-black/40 text-xs"># Install the global CLI launcher</p>
            <code className="text-[#ABABAB] light:text-[#6F6F6F] block overflow-x-auto">
              npm install -g @netpranav/cero-cli --registry=https://npm.pkg.github.com
            </code>
          </div>

          <p>Once installed, you can use the launcher anywhere:</p>

          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-4 space-y-2 text-xs">
            <p><code className="text-white light:text-black">cero</code> <span className="text-white/40 light:text-black/40"># Opens Cero in current folder</span></p>
            <p><code className="text-white light:text-black">cero ~/projects/api</code> <span className="text-white/40 light:text-black/40"># Opens Cero inside target directory</span></p>
            <p><code className="text-white light:text-black">cero setup.flow</code> <span className="text-white/40 light:text-black/40"># Runs a workflow automation script</span></p>
            <p><code className="text-white light:text-black">cero --version</code> <span className="text-white/40 light:text-black/40"># Outputs current Cero version</span></p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-16 mb-12" />

        {/* Build from Source */}
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">
          Build from Source
        </h2>

        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            Developers wanting to hack on Cero can build directly from source using Node.js 20+, Rust (stable), 
            and Tauri v2 prerequisites:
          </p>

          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-6 space-y-3">
            <code className="text-[#ABABAB] light:text-[#6F6F6F] block">git clone https://github.com/NetPranav/Cero-Terminal.git</code>
            <code className="text-[#ABABAB] light:text-[#6F6F6F] block">cd Cero-Terminal</code>
            <code className="text-[#ABABAB] light:text-[#6F6F6F] block">npm install</code>
            <code className="text-[#ABABAB] light:text-[#6F6F6F] block">npm run tauri dev</code>
          </div>
        </div>
      </div>
    </div>
  );
}
