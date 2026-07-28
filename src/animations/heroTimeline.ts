import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroTimelineTargets {
  container: HTMLElement;
  navElement: HTMLElement | null;
  titleElement: HTMLElement | null;
  descriptionElement: HTMLElement | null;
  buttonsContainer: HTMLElement | null;
  bottomBarElement: HTMLElement | null;
  backgroundElement: HTMLElement | null;
  parallaxElement?: HTMLElement | null;
}

/**
 * Creates and manages the GSAP entrance sequence and scroll transition for the Hero section.
 * Orchestrates Navbar -> Paragraph -> Buttons -> Bottom Bar -> Interactive Background.
 * (Title entrance is handled by React Bits BlurText component).
 */
export function createHeroTimeline({
  container,
  navElement,
  titleElement,
  descriptionElement,
  buttonsContainer,
  bottomBarElement,
  backgroundElement,
  parallaxElement,
}: HeroTimelineTargets) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
      normalMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions as {
        isDesktop: boolean;
        isMobile: boolean;
        reduceMotion: boolean;
        normalMotion: boolean;
      };

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // Set initial hidden states
      if (navElement)
        gsap.set(navElement, { opacity: 0, y: reduceMotion ? 0 : -20 });
      if (descriptionElement)
        gsap.set(descriptionElement, { opacity: 0, y: reduceMotion ? 0 : 20 });
      if (buttonsContainer)
        gsap.set(buttonsContainer, {
          opacity: 0,
          scale: reduceMotion ? 1 : 0.96,
        });
      if (bottomBarElement)
        gsap.set(bottomBarElement, { opacity: 0, y: reduceMotion ? 0 : 15 });
      if (backgroundElement) gsap.set(backgroundElement, { opacity: 0 });

      // 1. Reveal Navbar
      if (navElement) {
        tl.to(
          navElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.1
        );
      }

      // 2. Reveal Paragraph
      if (descriptionElement) {
        tl.to(
          descriptionElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.4
        );
      }

      // 4. Reveal Buttons
      if (buttonsContainer) {
        tl.to(
          buttonsContainer,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // 5. Reveal Bottom Bar (Logos/Badges)
      if (bottomBarElement) {
        tl.to(
          bottomBarElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // 6. Reveal Interactive Background
      if (backgroundElement) {
        tl.to(
          backgroundElement,
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // Scroll parallax transition: Move hero elements down slightly as the next section scrolls over them
      if (!reduceMotion && typeof window !== "undefined" && parallaxElement) {
        gsap.fromTo(
          parallaxElement,
          { y: 0, opacity: 1 },
          {
            y: 150, // Premium parallax push down
            opacity: 0, // Smooth fade out
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: window.innerHeight,
              scrub: true, // synchronous scrubbing ensures it perfectly resets on scroll up
            },
          }
        );
      }
    }
  );

  return () => {
    mm.revert();
  };
}
