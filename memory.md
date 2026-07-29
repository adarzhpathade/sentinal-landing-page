# Memory — Common Questions (FAQ) Section

Last updated: 2026-07-29

## What was built

- Created the `Common Questions` section in `src/sections/Faq.tsx` and the underlying data schema in `src/data/faq.ts`.
- Integrated `ScrambleHover` to trigger a synchronized scramble text effect across all questions exactly when the section scrolls into view.
- Added a custom stagger blur-up (`filter: blur`) animation to the answers when the accordion expands.
- Adjusted vertical spacing below the `HowItWorks` section to seamlessly connect into the FAQ.

## Decisions made

- Decoupled hover states from the text scramble effect to keep interactions snappy. Expanding a question instantly swaps the text color natively without re-triggering the scramble animation.
- Modified the FAQ accordion to default to a completely collapsed state (`openId: null`).
- Sped up the text scramble by explicitly passing `scrambleSpeed={20}`.

## Problems solved

- Resolved an issue where expanding questions would trigger a visual re-scramble of the text. Tied the scramble trigger strictly to the `isSectionInView` scroll trigger instead of the `customHoverState`.

## Current state

- The `Common Questions` section is fully built, cleanly animated, and responsive.
- Code has been formatted, linted, successfully built (`next build`), and pushed to the `main` branch.

## Next session starts with

- Moving on to the next major component or section of the Sentinel landing page (e.g., CTA, Footer, or Pricing) depending on the next design spec provided.

## Open questions

- None at the moment.
