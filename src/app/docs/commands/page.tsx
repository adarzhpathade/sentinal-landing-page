"use client";

import React, { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Copy, Check, Search, Terminal } from "lucide-react";
import {
  COMMAND_CATEGORIES,
  COMMAND_ITEMS,
  CommandCategory,
  CommandItem,
} from "@/data/commands";

export default function CommandsPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useGSAP(
    () => {
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
    },
    { scope: contentRef, dependencies: [] }
  );

  const filteredCommands = useMemo(() => {
    return COMMAND_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (cmd: CommandItem) => {
    navigator.clipboard.writeText(cmd.command);
    setCopiedId(cmd.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div ref={contentRef} className="pt-16 px-6 md:pt-32 md:px-12 lg:px-24 pb-24 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="docs-content-title text-3xl md:text-[2.75rem] leading-none font-normal tracking-tight">
          Command Reference
        </h1>
        <div className="docs-content-header text-[#ABABAB] light:text-[#6F6F6F] tracking-widest text-sm mt-2">
          {"// DICTIONARY"}
        </div>
      </div>

      <div className="docs-content-body mt-16 max-w-4xl">
        <div className="space-y-6 text-sm font-mono text-white/90 light:text-black/90">
          <p className="text-base leading-relaxed font-medium">
            Explore real command patterns and controls available inside Cero. Prefix natural language 
            instructions with <code className="text-[#ABABAB] light:text-[#6F6F6F] font-bold">&gt; </code> for 
            instant local tool execution, use <code className="text-[#ABABAB] light:text-[#6F6F6F] font-bold">/</code> for 
            teaching and memory, or run <code className="text-[#ABABAB] light:text-[#6F6F6F] font-bold">cero</code> directly 
            from your existing shell.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 light:text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands, tools, or descriptions (e.g. wifi, vs code, flow, serl)..."
              className="w-full bg-[#1C1A1C]/70 light:bg-gray-100/70 border border-white/10 light:border-black/10 pl-11 pr-4 py-3.5 text-xs md:text-sm font-mono text-white light:text-black placeholder:text-white/30 light:placeholder:text-black/30 focus:outline-none focus:border-[#ABABAB] light:focus:border-[#6F6F6F] transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {COMMAND_CATEGORIES.map((cat: CommandCategory) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-mono tracking-widest uppercase px-3 py-1.5 transition-colors border ${
                    isActive
                      ? "bg-[#ABABAB] text-[#141314] font-semibold border-[#ABABAB]"
                      : "bg-transparent text-white/60 light:text-black/60 border-white/10 light:border-black/10 hover:border-white/30 light:hover:border-black/30 hover:text-white light:hover:text-black"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#ABABAB]/30 light:bg-[#6F6F6F]/45 mt-12 mb-10" />

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-white/40 light:text-black/40 mb-6">
          <span>SHOWING {filteredCommands.length} COMMANDS</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="hover:text-white light:hover:text-black underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Commands List */}
        <div className="space-y-6 font-mono">
          {filteredCommands.length === 0 ? (
            <div className="border border-white/10 light:border-black/10 p-12 text-center text-white/50 light:text-black/50 text-sm">
              No commands found matching &quot;{searchQuery}&quot;. Try a different query or select ALL.
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const isCopied = copiedId === cmd.id;
              return (
                <div
                  key={cmd.id}
                  className="border border-white/10 light:border-black/10 p-6 md:p-8 hover:border-white/30 light:hover:border-black/30 transition-colors bg-[#1C1A1C]/30 light:bg-gray-100/30 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[#ABABAB] light:text-[#6F6F6F] text-xs font-semibold tracking-widest uppercase">
                        {cmd.categoryLabel}
                      </span>
                      <span className="text-white/20 light:text-black/20 text-xs">•</span>
                      <span className="text-white/40 light:text-black/40 text-xs">
                        PREFIX: <code className="text-white light:text-black font-semibold">{cmd.prefix}</code>
                      </span>
                    </div>
                    <span className="text-white/40 light:text-black/40 text-xs">
                      TOOL: <span className="text-[#ABABAB] light:text-[#6F6F6F]">{cmd.tool}</span>
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 bg-black/40 light:bg-black/5 p-4 border border-white/5 light:border-black/5 mb-4">
                    <div className="text-white light:text-black text-sm md:text-base font-semibold break-all flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#ABABAB] light:text-[#6F6F6F] flex-shrink-0" />
                      <span>{cmd.command}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(cmd)}
                      className="p-1.5 border border-white/10 light:border-black/10 hover:border-white/40 light:hover:border-black/40 text-white/60 light:text-black/60 hover:text-white light:hover:text-black transition-colors flex-shrink-0 flex items-center gap-1.5 text-xs"
                      title="Copy command"
                      aria-label="Copy command"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#ABABAB] light:text-[#6F6F6F]" />
                          <span className="text-[#ABABAB] light:text-[#6F6F6F]">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-white/60 light:text-black/60 leading-relaxed">
                    {cmd.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
