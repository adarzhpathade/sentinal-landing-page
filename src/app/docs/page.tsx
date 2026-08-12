"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function DocsPage() {
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
      0 // Start immediately
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
          What is Sentinel
        </h1>
        <div className="docs-content-header text-[#FB460D] tracking-widest text-sm mt-2">
          {"// GETTING STARTED"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-3xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Sentinel is a next-generation, AI-native terminal designed for developers, DevOps engineers, 
            and power users that aims to enhance your local workflow.
          </p>
          
          <p className="text-white/60 light:text-black/60 leading-relaxed">
            This is not your typical command-line interface, which means you won&apos;t find a standard set of 
            generic prompt behaviors or unpredictable cloud dependencies here.
          </p>
          
          <p className="text-white/60 light:text-black/60 leading-relaxed">
            Basically, this terminal is here to help you automate complex workflows and system administration 
            tasks by leveraging natural language, without ever leaving your keyboard.
          </p>
        </div>

        <div className="w-full h-[1px] bg-[#FB460D]/30 mt-16 mb-6" />
        
        <h2 className="text-2xl md:text-[2rem] text-white light:text-black font-normal tracking-tight mb-6">Core Philosophy</h2>
        
        <div className="space-y-6 text-sm text-white/60 light:text-black/60 leading-relaxed font-mono">
          <p>
            The goal of Sentinel is simple - provide a flexible, blazingly fast, and completely private 
            terminal that takes your productivity to the next level.
          </p>
          
          <p>
            To make that happen, the project is committed to the following principles:
          </p>

          <ul className="space-y-5 mt-6 mb-12">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Offline First:</span>{" "}
                By leveraging local LLMs, it provides intelligent auto-completion without relying on an internet connection.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Privacy Focused:</span>{" "}
                Your environment variables, API keys, and proprietary code never leave your machine.
              </p>
            </li>
          </ul>

          <ul className="space-y-5 mt-6 mb-12">
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Keyboard Centric:</span>{" "}
                Built for speed and efficiency, allowing you to control your entire desktop using only your keyboard.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="mt-[0.6rem] w-[6px] h-[6px] bg-[#FB460D] flex-shrink-0" />
              <p>
                <span className="text-[#FB460D] font-semibold tracking-wide">Natural Language Execution:</span>{" "}
                Execute complex shell commands and automate workflows simply by describing what you want to achieve.
              </p>
            </li>
          </ul>

          <div className="bg-[#1C1A1C] light:bg-gray-100/50 border border-white/10 light:border-black/10 p-8 mt-12 mb-12">
            <h3 className="text-[#FB460D] font-mono text-sm tracking-widest mb-4">
              {"// DESIGN PRINCIPLES"}
            </h3>
            <ul className="space-y-4 text-sm font-mono text-white/80 light:text-black/80">
              <li className="flex items-start gap-3">
                <span className="text-[#FB460D] mt-1">01.</span>
                <p>Zero configuration. It should just work.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FB460D] mt-1">02.</span>
                <p>Keyboard first. Mouse optional.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FB460D] mt-1">03.</span>
                <p>Performance over features. Speed is a feature.</p>
              </li>
            </ul>
          </div>

          <h3 className="text-xl text-white light:text-black font-normal tracking-tight mt-12 mb-4">Local Execution</h3>
          <p className="font-mono">
            Every command you generate and execute runs securely on your machine, giving you full visibility 
            and control over the AI&apos;s actions, not just a black box output.
          </p>
        </div>
      </div>
    </div>
  );
}
