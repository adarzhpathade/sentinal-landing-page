"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/data/docs";
import { motion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

interface SidebarContentProps {
  isMobile?: boolean;
  pathname: string;
  isLightMode: boolean;
  toggleTheme: () => void;
}

const SidebarContent = React.memo(({ isMobile = false, pathname, isLightMode, toggleTheme }: SidebarContentProps) => (
  <>
    {DOCS_NAVIGATION.map((group, groupIdx) => (
      <div key={groupIdx} className="flex flex-col gap-3">
        {group.title && (
          <h3 className="docs-sidebar-item text-[#FB460D] tracking-widest text-sm mt-4">
            {group.title}
          </h3>
        )}
        <ul className="flex flex-col gap-2">
          {group.items.map((item) => {
            const isActive =
              item.href === "/docs"
                ? pathname === "/docs"
                : pathname.startsWith(item.href);
            return (
              <li
                key={item.id}
                className={isMobile ? "flex items-center h-10 relative" : "docs-sidebar-item flex items-center h-8 relative"}
              >
                {isActive && (
                  <motion.span
                    layoutId={isMobile ? "mobile-sidebar-active-indicator" : "sidebar-active-indicator"}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-[10px] h-[10px] bg-[#FB460D] absolute left-0 flex-shrink-0"
                  />
                )}
                <Link
                  href={item.href}
                  className={`font-mono transition-colors pl-6 w-full ${isMobile ? "text-lg py-1" : "text-base"} ${
                    isActive
                      ? "text-white light:text-black"
                      : "text-white/50 light:text-black/50 hover:text-white light:hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ))}

    <div className="mt-auto pt-16 flex items-center gap-4 w-full">
      <Button variant="primary" withSquareIcon squareIconType="home" href="/" className="flex-1">
        HOME
      </Button>
      <button
        onClick={toggleTheme}
        className="flex h-9 w-9 items-center justify-center border border-white/20 light:border-black/20 hover:border-white/50 light:hover:border-black/50 transition-colors bg-transparent text-white light:text-black"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        <Sun size={16} className={isLightMode ? "block" : "hidden"} />
        <Moon size={16} className={isLightMode ? "hidden" : "block"} />
      </button>
    </div>
  </>
));
SidebarContent.displayName = "SidebarContent";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Load theme from localStorage on mount and sync with document
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light-mode");
    setTimeout(() => setIsLightMode(isLight), 0);
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("sentinel-theme", newMode ? "light" : "dark");
      if (newMode) {
        document.documentElement.classList.add("light-mode");
      } else {
        document.documentElement.classList.remove("light-mode");
      }
      return newMode;
    });
  };

  // Close mobile menu on route change
  useEffect(() => {
    setTimeout(() => setIsMobileMenuOpen(false), 0);
  }, [pathname]);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Stagger in the sidebar items (Desktop only)
    const sidebarItems = gsap.utils.toArray(".docs-sidebar-item");
    if (sidebarItems.length > 0) {
      tl.from(sidebarItems, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, { scope: sidebarRef, dependencies: [] });



  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#141314] light:bg-[#FAFAFA] text-white light:text-[#111111] font-sans">
        
        {/* Mobile Top Bar */}
        <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-[#141314]/90 light:bg-[#FAFAFA]/90 backdrop-blur-md border-b border-white/5 light:border-black/5">
          <Link href="/" className="font-sans font-medium text-lg tracking-tight">
            Sentinel
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/70 light:text-black/70 hover:text-white light:hover:text-black transition-colors focus:outline-none"
            aria-label="Toggle Documentation Menu"
          >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full-Screen Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-[#141314]/95 light:bg-[#FAFAFA]/95 backdrop-blur-xl overflow-y-auto px-8 py-12 md:hidden flex flex-col gap-10"
          >
            <SidebarContent isMobile pathname={pathname} isLightMode={isLightMode} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden md:flex w-80 flex-shrink-0 pt-32 pl-12 pr-6 pb-12 flex-col gap-6 sticky top-0 h-screen overflow-y-auto border-r border-white/5 light:border-black/5"
      >
        <SidebarContent pathname={pathname} isLightMode={isLightMode} toggleTheme={toggleTheme} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
      </div>
    </>
  );
}
