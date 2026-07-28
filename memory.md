# Memory — Sentinel How It Works Section & Lint Cleanups

Last updated: 2026-07-28T21:02:00+05:30

## What was built

- **How It Works Section (`src/sections/HowItWorks.tsx`, `src/data/howItWorks.ts`)**:
  - Implemented the complete "How it works" section matching the design system with square dots.
  - Created a responsive layout: desktop features a horizontal timeline with alternating top/bottom steps, while mobile alternates left/right around a center vertical line.
  - Applied `ScrambleHover` to all step headings, triggered sequentially on desktop by the GSAP timeline and on-view on mobile.
- **GSAP Pinned Timeline Animation (`src/sections/HowItWorks.tsx`)**:
  - Desktop layout pins the section to the top of the viewport (`pin: true`, `end: "+=150%"`) and runs a play-once timeline that draws the line, pops in dots (with 180° rotation), and fades in content.
  - Mobile timeline slides steps in from the left on view.

## Decisions made

- **Typographic System**: Chose to use `font-mono` (Geist Mono) for step headings on both desktop and mobile to introduce a technical, terminal-coded contrast to the editorial Aktiv Grotesk section titles.
- **Timeline Centering**: Centered all step text containers directly above/below the dots with `-translate-x-1/2` and adjusted the desktop padding (`px-8 md:px-24 lg:px-40 xl:px-48`) to keep edge elements from clipping the viewport.
- **Play-Once Pinned Animation**: Designed the scroll-based animation to play once upon entering rather than scrubbing. This ensures that the timeline and text remain fully visible after the animation completes and during reverse scroll.

## Problems solved

- **ESLint & TS Cleanup**: Resolved all 14 linting errors and warnings. Fixed React hook set-state-in-effect errors inside `ScrambleHover` using deferred `setTimeout` state updates, replaced `any` casts in `BlurText` with `HTMLMotionProps` types, and cleaned up unused destructured variables in `heroTimeline.ts`.
- **JSX Comment Node issue**: Fixed the `react/jsx-no-comment-textnodes` lint error in `Features.tsx` and `HowItWorks.tsx` by wrapping the raw `//` comment style process indicators in curly braces `{"// PROCESS"}`.
- **Timeline Disappearance bug**: Solved the issue where elements vanished after animation completion by removing immediate `gsap.set()` calls on mount and using `tl.fromTo()` within the timeline instead.

## Current state

- The Hero, Features, and How It Works sections are fully built, highly responsive, and animate beautifully.
- The project is error-free: `npm run lint` compiles cleanly with zero warnings/errors, and `npm run build` succeeds.
- All code changes are committed and pushed to the remote `main` branch.

## Next session starts with

- Building the next section after "How It Works" based on the design docs and read order in `AGENTS.md`.

## Open questions

- None. The How It Works section is fully finalized, verified, and deployed.
