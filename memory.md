# Memory — UI Bug Fixes and Page Transitions

Last updated: 2026-08-12

## What was built
- Restored proper navigation globally by using absolute hash links (`/#features` instead of `#features`) inside `navigation.ts`.
- Unified the text scramble effect on the `/download` page to identically match the fast, sequential orange reveal seen on the FAQ section.
- Corrected mobile spacing on the `/download` page by standardizing the `winget` command box top-margin and removing redundant bottom margins on OS containers to rely strictly on grid gap spacing.
- Fixed a sub-pixel rendering artifact (1px dark line bleed) between the `Features` and `HowItWorks` sections by introducing a `-mt-[1px]` overlap between the two identical-color blocks.
- Fixed the `ChessGridTransition` logic so the initial "loader" animation is bypassed on the `/docs` page without breaking the live transition animations when navigating between pages.
- Resolved multiple React and ESLint warnings across the app (unescaped quotes, comment text nodes, `set-state-in-effect` issues) and successfully deployed a clean `npm run build` to git.

## Decisions made
- Resolved the FOUC "red screen" on `/docs` bypass by adding an inline React `transform` during SSR, which is then removed immediately after component mount so that GSAP retains full control over the DOM elements during live navigation.

## Problems solved
- **Transition Vanishing:** Fixed a bug where navigating away from a page caused the transition grid blocks to instantly teleport off-screen. This was caused by the `useEffect` listening to `pathname` changes and overriding the live GSAP transition timeline.
- **Background Bleed:** Solved the annoying sub-pixel background bleed (line) between sections using a negative margin technique commonly used in Tailwind CSS.

## Current state
- The download page and global navigation are perfectly responsive and functional.
- Page transitions are fully operational and skip initial loading correctly on the docs page.
- Codebase is lint-free, built successfully, and pushed to `main`.

## Next session starts with
- Awaiting the developer's next set of feature requests or design tweaks for the landing page or application logic.

## Open questions
- None at this time.
