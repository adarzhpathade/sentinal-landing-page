# Memory — How It Works Section & Scramble Animation Fix

Last updated: 2026-07-28T21:07:00+05:30

## What was built

- Refactored `src/sections/HowItWorks.tsx` to feature a pinned GSAP `ScrollTrigger` animation sequence. The line draws, dots pop, and text fades in sequentially — and elements remain visible after completion instead of reverting on scroll.
- Integrated the `ScrambleHover` effect into `HowItWorks.tsx` so text scrambles in when revealed.
- Fixed a state-lag bug in `src/components/ui/ScrambleHover.tsx` when `sequential={true}` that was causing the final character of a scrambled string to remain scrambled.
- Mobile alignment and text sizing adjustments applied to the `HowItWorks` section.
- Checks (format, lint, build) were run and changes were pushed to the `main` Git branch (commit `0a3b97d`).

## Decisions made

- Unlinked the `HowItWorks` timeline from direct scroll scrub progress, opting for a play-once pinned timeline instead so that elements stay visible persistently.
- Handled React state batching and ref synchronicity inside the `ScrambleHover`'s `setInterval` by manually advancing and checking the updated `revealedIndicesRef` synchronously to ensure clean text resolution.

## Problems solved

- **Disappearing text in HowItWorks:** Replaced `scrub: 1` with a play-once pinned trigger so the section freezes while animating but stays in the final visual state.
- **Scramble text spelling error:** Fixed the `ScrambleHover` logic so it explicitly resets `setDisplayText(text)` when all characters are revealed.

## Current state

- The `HowItWorks` section animations are polished and fully working on both desktop and mobile views.
- The `ScrambleHover` effect works perfectly without leaving random trailing characters.
- The codebase is clean, formatted, linted, and up to date on `main`.

## Next session starts with

- Moving on to the next major section of the Sentinel landing page, or addressing further design feedback from the user.

## Open questions

- None at the moment. Wait for the user's next design or feature request.
