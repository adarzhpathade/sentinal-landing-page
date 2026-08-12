"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CommandsPage() {
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

  const commands = [
    {
      domain: "Development & IDEs",
      command: "> open this folder in the Vs Code",
      tool: "developer.vscode",
      result: "Resolves target to . and launches Visual Studio Code."
    },
    {
      domain: "Development & IDEs",
      command: "> Open this folder inside antigravity",
      tool: "application.open",
      result: "Resolves app to Antigravity IDE and opens current directory."
    },
    {
      domain: "Development & IDEs",
      command: "> open current directory in cursor",
      tool: "developer.cursor",
      result: "Launches Cursor AI with your active project path."
    },
    {
      domain: "System Operations",
      command: "> clear terminal",
      tool: "system.clear",
      result: "Invokes direct xterm buffer wipe."
    }
  ];

  return (
    <div ref={contentRef} className="pt-16 px-6 md:pt-32 md:px-12 lg:px-24 pb-24 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="docs-content-title text-3xl md:text-[2.75rem] leading-none font-normal tracking-tight">
          Command Reference
        </h1>
        <div className="docs-content-header text-[#FB460D] tracking-widest text-sm mt-2">
          {"// DICTIONARY"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-4xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Try typing these real example commands into Sentinel today! Simply start your instruction with 
            the <code className="text-[#FB460D] font-bold">&gt; </code> symbol to experience instantaneous conversational orchestration.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-12" />
        
        <div className="space-y-8 font-mono">
          {commands.map((cmd, idx) => (
            <div key={idx} className="border border-white/10 light:border-black/10 p-6 md:p-8 hover:border-white/20 light:hover:border-black/20 transition-colors bg-transparent light:bg-gray-100/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <span className="text-[#FB460D] text-xs font-semibold tracking-widest uppercase mb-2 md:mb-0">
                  {cmd.domain}
                </span>
                <span className="text-white/40 light:text-black/40 text-xs">
                  TOOL: {cmd.tool}
                </span>
              </div>
              <div className="space-y-4">
                <div className="text-white light:text-black text-[1.1rem] font-medium">{cmd.command}</div>
                <p className="text-sm text-white/50 light:text-black/50">{cmd.result}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
