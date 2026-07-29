# Memory — How It Works Production Bug Fixes & Refinements

Last updated: 2026-07-29T08:43:00+05:30

## What was built

- Extracted the scramble state in `src/sections/HowItWorks.tsx` into a `TimelineContent` subcomponent, using `dispatchEvent(new CustomEvent("scrambleStart"))` to trigger animations instead of React state.
- Split the desktop timeline `ScrollTrigger` into two distinct triggers: one to play the timeline when the header reaches 70% down the viewport, and another to pin the section when it hits the top.
- Refined the mobile animation so the center dots now "pop and spin" (scaling and rotating), matching the desktop aesthetic, followed by the content sliding in.
- Registered the `useGSAP` plugin in both `HowItWorks.tsx` and `Features.tsx`.
- Ran format, lint (fixing a small `TimelineStep` type import), build checks, and pushed the updates to the `main` branch.

## Decisions made

- **State Isolation:** Used DOM event dispatching (`scrambleStart`) instead of React state updates in the main `<section>` component to prevent React from re-rendering the wrapper and overwriting GSAP's inline styles.
- **GSAP Transforms vs Tailwind:** Switched to using `xPercent: -50` in GSAP for the mobile dot animation to prevent GSAP from overwriting Tailwind's `-translate-x-1/2` utility class.
- **Decoupled ScrollTriggers:** Allowed the animation timeline to start playing before the section actually pins to satisfy specific scroll-timing requirements.

## Problems solved

- **Next.js Production Pin Breaking:** Solved a critical bug where React 18's aggressive production reconciler was stripping the inline styles (`position`, `inset`, `margin`) injected by GSAP's `ScrollTrigger` pin spacer whenever the component re-rendered.
- **Missing Plugin Context:** Registered `useGSAP` to prevent Next.js tree-shaking from dropping the GSAP-React context in production.
- **Mobile Animation Positioning:** Kept the mobile dot perfectly centered during its rotation animation by using `xPercent`.

## Current state

- The `HowItWorks` section is robust, working flawlessly in both development and optimized production builds.
- Desktop and mobile animations have been perfected and timed according to exact preferences.
- The codebase is clean, successfully builds, and is fully pushed to the remote repository.

## Next session starts with

- Building the next major section of the Sentinel landing page, or addressing further design and animation requirements.

## Open questions

- None at the moment. Wait for the user's next feature request.
