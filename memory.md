# Memory — Animated Footer & Parallax Enhancements

Last updated: 2026-07-29

## What was built

- Built out the `AnimatedFooter.tsx` with a responsive layout: ASCII art banner is presented on desktop, while mobile receives a cleanly structured standard layout.
- Integrated smooth scrolling functionality into the footer's internal anchor links using `Lenis` (with a native `scrollIntoView` fallback).
- Replaced placeholder emails and legal links with developer GitHub credits and Source Code links, applying a sleek animated underline hover effect to them.
- Added a subtle, cohesive GSAP ScrollTrigger parallax drift (`yPercent: -3`, scrubbed) to the inner content of all main sections (`Features`, `HowItWorks`, `Faq`, `Download`) to create a premium sense of depth while scrolling.

## Decisions made

- Applied the GSAP scrub parallax effect individually inside each section's component (using `contentRef` wrappers) rather than applying a blanket parallax over the entire page layout. This preserved existing complex clip-path reveal mechanisms and native layout animations.

## Problems solved

- Fixed footer overlapping and layout issues on mobile viewports.
- Resolved TypeScript ESLint errors relating to `any` type casting on the globally attached `window.lenis` instance.

## Current state

- The landing page layout is complete, fully animated, responsive, and features subtle parallax depth across all sections.
- Code has been linted cleanly (`npm run lint`), compiled successfully (`npm run build`), and pushed to the remote `main` branch.

## Next session starts with

- Reviewing the full end-to-end site experience for any final design polish or moving on to deployment/marketing tasks.

## Open questions

- None at the moment.
