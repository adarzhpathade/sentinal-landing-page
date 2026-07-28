# AGENTS.md

# Sentinel Website — AI Agent Instructions

This document is the primary instruction set for any AI agent contributing to the Sentinel website.

Before generating, modifying, or refactoring any code, you MUST read all project context documents.

---

# Read Order

Before writing any code, read the following files in this exact order.

```
context/

1. PROJECT_CONTEXT.md
2. DESIGN_SYSTEM.md
3. TECH_STACK.md
4. ANIMATION_GUIDELINES.md
5. DEVELOPMENT_RULES.md
6. COMPONENT_GUIDELINES.md
7. PERFORMANCE_GUIDELINES.md
8. FOLDER_STRUCTURE.md
```

After reading the global context, read the page specification you are currently implementing.

Example

```
design/pages/

03_HERO.md
```

Every page has its own specification.

These documents override assumptions.

Never invent interactions that contradict them.

---

# Visual References

Before implementing a section, inspect all reference images inside

```
design/sections/
```

These images define layout, spacing, typography, interaction style, and overall visual direction.

Treat them as implementation references.

---

# Project Overview

Sentinel is an AI-native terminal built for developers.

The website is a premium product landing page designed to showcase the product through typography, motion, and thoughtful interactions.

It is NOT:

- a SaaS dashboard
- an admin panel
- a generic landing page
- a template

The experience should feel closer to:

- Linear
- Cursor
- Warp
- Raycast
- Vercel
- Framer

---

# Primary Objective

Every implementation should improve one or more of these:

- User Experience
- Performance
- Accessibility
- Maintainability
- Readability
- Design Consistency

Avoid unnecessary complexity.

---

# Design Philosophy

The website is:

- Minimal
- Editorial
- Technical
- Premium
- Spacious
- Typography-first

Whitespace is intentional.

Motion replaces decoration.

Every element must have a purpose.

---

# Development Rules

Always write:

- Clean code
- Modular code
- Strongly typed TypeScript
- Reusable components
- Production-ready implementations

Never duplicate logic.

Reuse existing components whenever possible.

---

# Before Writing Code

Before implementing any feature, verify:

- Does a reusable component already exist?
- Can an existing animation be reused?
- Can an existing hook solve this?
- Can the implementation be simplified?
- Does it match the design system?

Only create new files when necessary.

---

# Animation

This project is animation-first.

Use:

GSAP

for:

- Loader
- Hero
- ScrollTrigger
- Timelines
- Section reveals
- Text animations
- Menu transitions

Use:

Framer Motion

only for:

- Button hover
- Small UI interactions
- Simple fades

Do not mix animation libraries for the same interaction.

---

# Performance

Always target:

- 60 FPS
- GPU accelerated transforms
- Clean animation lifecycle
- Lazy loading where appropriate

Always clean up:

- GSAP timelines
- ScrollTriggers
- Event listeners
- SplitType instances

Never leak memory.

---

# Styling

Use:

- Tailwind CSS
- CSS Variables
- Design System tokens

Avoid:

- Inline styles
- Magic values
- Random spacing
- Random colours

---

# Responsiveness

Desktop-first.

Support:

- Desktop
- Laptop
- Tablet
- Mobile

Do not simply shrink layouts.

Adapt spacing and typography appropriately.

---

# Accessibility

Every implementation should:

- Support keyboard navigation
- Respect prefers-reduced-motion
- Maintain focus states
- Use semantic HTML
- Preserve readability

Accessibility is mandatory.

---

# Folder Structure

Follow the official project structure.

Never create arbitrary folders.

Never duplicate utilities.

Never duplicate hooks.

Every file must live in its intended location.

---

# Component Philosophy

Components should have one responsibility.

Separate:

- UI
- Animation
- Data
- Logic

Keep components small and reusable.

---

# Static Content

Never hardcode repeated content.

Store reusable content inside

```
data/
```

Components should render data.

They should not own data.

---

# When Implementing a Page

Always follow this workflow:

1. Read the required context files.
2. Read the page specification.
3. Study the reference image(s).
4. Identify reusable components.
5. Build the layout.
6. Implement animations.
7. Verify responsiveness.
8. Verify accessibility.
9. Optimise performance.
10. Wait for further instructions.

---

# Code Quality

Always prefer:

- Simplicity
- Readability
- Reusability
- Performance

Avoid clever code.

Write code another engineer can maintain years later.

---

# If Something Is Undefined

Do not invent a completely new design.

Instead:

- Follow the existing design language.
- Maintain visual consistency.
- Keep the solution minimal.
- Ask for clarification only if absolutely necessary.

---

# Success Criteria

A successful implementation should feel like it belongs to the same product from the first section to the last.

Every animation, layout, spacing decision, and interaction should reinforce the Sentinel brand.

The website should feel calm, premium, engineered, and intentional.

Never optimise for visual complexity.

Always optimise for clarity, quality, and craftsmanship.
