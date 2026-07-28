import { Hero } from "@/sections/Hero";
import { Features } from "@/sections/Features";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#141314]">
      {/* Sticky wrapper for Hero so it stays pinned while Features scrolls over it */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <Hero />
      </div>

      {/* Features section overlapping the Hero */}
      <Features />
    </main>
  );
}
