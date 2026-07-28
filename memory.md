# Memory — Sentinel Features Section & Parallax Polish

Last updated: 2026-07-28T08:52:11+05:30

## What was built

- **Features Section (`src/sections/Features.tsx`, `src/data/features.ts`)**:
  - Built the new Features grid layout matching the premium editorial design.
  - Implemented responsive edge-to-edge layout styling on ultra-wide screens, removing max-width constraints so the content fluidly fills the monitor.
- **Scramble & Shimmer Interactions (`src/components/ui/ScrambleHover.tsx`)**:
  - Upgraded the `ScrambleHover` component to support dynamic text shifting and a structural layout box that slides in from the left on hover.
  - Built a synchronized red "wiping" shimmer effect using sequential character scrambling that wipes left-to-right as the scrambled characters resolve.
  - Made the effect fully responsive: on mobile, the box and text shift are static, but the scramble animation auto-plays once using a custom `triggerOnView="mobileOnly"` property triggered by scroll view.
- **Hero Parallax Scrolling (`src/animations/heroTimeline.ts`, `src/sections/Hero.tsx`)**:
  - Implemented a smooth parallax push-down and fade-out effect for the Hero content as the page scrolls down and the Features section slides over it.

## Decisions made

- **Animation Architecture**: Instead of animating the individual Hero elements (which conflict with initial load animations), isolated the scroll parallax into a dedicated `parallaxRef` wrapper within `Hero.tsx`. This avoids all GSAP tween conflicts when scrubbing scroll positions.
- **Mobile Animation Strategy**: Used `useInView` linked to the scroll position on mobile to auto-play hover interactions exactly once, ensuring touch users get to see the premium motion design without needing cursor hover states.
- **Widescreen Layout**: Completely removed `max-w-[1400px]` from the Features wrapper, deciding on an absolute edge-to-edge fluid layout that maximizes the width of ultra-wide monitors.

## Problems solved

- **Parallax Disappearance Bug**: Fixed a critical GSAP conflict where `ScrollTrigger` and timeline animations targeted the same properties (`y`, `opacity`) on the same elements, causing them to get stuck and permanently disappear. Solved by wrapping elements and animating the wrapper with `gsap.fromTo`.
- **Props Extraction Bug**: Fixed a runtime `ReferenceError` in `ScrambleHover` by properly extracting the `customHoverState` prop before passing the rest of the props down to the DOM element.

## Current state

- The Hero and Features sections are fully built, highly responsive, and feature complex scroll and hover animations.
- The project successfully builds (`npm run build`) with zero linting or TypeScript errors.
- All code is formatted, committed, and pushed to the remote `main` branch.

## Next session starts with

- Building the next section after "Features" based on the design docs, or continuing to refine remaining UI states if requested.

## Open questions

- None. The Features section is complete, fully interactive, and pushed to production.
