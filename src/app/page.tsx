import { Hero } from "@/sections/Hero";
import { Features } from "@/sections/Features";
import { HowItWorks } from "@/sections/HowItWorks";
import { Faq } from "@/sections/Faq";
import { Download } from "@/sections/Download";
import AnimatedFooter from "@/components/ui/AnimatedFooter";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#141314]">
      <Navbar />
      <div className="relative z-10 flex flex-col w-full bg-[#141314]">
        {/* Sticky wrapper for Hero so it stays pinned while Features scrolls over it */}
        <div id="home" className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <Hero />
        </div>

        {/* Features section overlapping the Hero */}
        <div id="features" className="scroll-mt-24">
          <Features />
        </div>

        {/* How it works section */}
        <div id="how-it-works" className="scroll-mt-24">
          <HowItWorks />
        </div>

        {/* FAQ section */}
        <div id="faq" className="scroll-mt-24">
          <Faq />
        </div>

        {/* Download section — natural height */}
        <div id="download" className="scroll-mt-24">
          <Download />
        </div>

        {/* Footer reveal: clip-path container unveils the fixed footer as you scroll */}
        <div
          id="footer"
          className="relative h-[70svh] md:h-[80svh] w-full z-20"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <div className="fixed bottom-0 left-0 h-[70svh] md:h-[80svh] w-full">
            <AnimatedFooter charColor="#b34a00" revealOnScroll={false} />
          </div>
        </div>
      </div>
    </main>
  );
}
