# Memory — Sentinel Layout & Premium Animations

Last updated: 2026-07-28T01:17:00+05:30

## What was built

- **Navbar Alignment & Spacing (`src/components/layout/Navbar.tsx`)**:
  - Re-architected the Navbar to inherit the exact same `<Container>` component used in the Hero, guaranteeing pixel-perfect left alignment.
  - Removed artificial `justify-center` and `max-w-[1400px]` constraints, allowing the right-side "DOWNLOAD" button to naturally lock to the far right edge of the viewport.
  - Restored precise vertical padding for the un-scrolled transparent state.
- **Hero Typography Density (`src/sections/Hero.tsx`)**:
  - Tightened the Hero text density by dropping the `h1` line height to `0.9`, drastically reducing the margin below the title, and shifting the CTA button group upward for a highly compact, editorial lockup.
- **Premium Secondary Button Interaction (`src/components/ui/Button.tsx`)**:
  - Built a custom "swipe" hover animation for the "Tell us More" link.
  - Configured a dim line to slide out while a bright line slides in from the left, using a perfectly staggered 80% time delay (`240ms` offset on a `300ms` duration) to create a continuous chasing effect with a fixed 20% gap.
- **Mechanical Primary Button Interaction (`src/components/ui/Button.tsx`)**:
  - Completely re-engineered the primary `DOWNLOAD` button to feature a tactile, physical "push" hover interaction.
  - Replaced standard opacity fading with structural flex manipulation: a hidden left square expands (`w-0` to `w-9`) while the right square collapses (`w-9` to `w-0`), smoothly shoving the main text block across the button.
  - Attached horizontal translations and 180-degree rotations to the SVG icons as they enter/exit their bounding boxes, simulating a physical block sliding straight through the button.
  - Upgraded the entire interaction to a `500ms` duration with a premium `cubic-bezier(0.22,1,0.36,1)` (ease-out-quint) curve for a buttery smooth, snappy-to-fluid feel.

## Decisions made

- **Structural Animation over Fades**: Explicitly moved away from opacity fades for the primary button, choosing to manipulate DOM width (`w-0` to `w-9`) and SVG translations to create a purely mechanical, physical "pushing" sensation.
- **Component Consistency**: Enforced the use of the `<Container>` abstraction in the Navbar instead of recreating padding manually, locking the global layout alignment.

## Problems solved

- **Layout Misalignment**: Solved the visual disconnect between the Navbar and the Hero content by fixing their container logic.
- **Hover Ghosting**: Removed the ghosting appearance of the primary CTA's icons by applying solid, translation-based exit/entry animations.

## Current state

- The Navbar, Hero section, and UI Buttons are fully styled, tightly aligned, and feature highly polished, buttery smooth micro-interactions.
- The local dev server is running cleanly and the current aesthetic perfectly aligns with the premium "Sentinel" brand guidelines.

## Next session starts with

- Proceeding to implement the next major section of the landing page (following the Hero) based on the design specification docs, ensuring the same level of typographic density and interaction quality is maintained.

## Open questions

- None. The Hero UI and component animations are complete and approved.
