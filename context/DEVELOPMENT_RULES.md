# DEVELOPMENT_RULES.md

# Sentinel Website - Development Rules

This document defines the engineering standards for the Sentinel website.

Every AI agent and developer contributing to this project must follow these rules.

The goal is to maintain a clean, scalable, performant, and production-ready codebase.

---

# General Principles

Always prioritize:

- Readability
- Maintainability
- Scalability
- Performance
- Reusability

Never sacrifice code quality for speed.

---

# Code Philosophy

Write code as if another developer will maintain it for years.

Avoid shortcuts.

Every component should be:

- Predictable
- Modular
- Reusable
- Easy to understand

---

# Language

Use:

TypeScript

Avoid:

JavaScript

Strong typing is mandatory.

Never use:

```ts
any
```

Prefer:

- interfaces
- types
- generics
- utility types

---

# Component Philosophy

Every component should have a single responsibility.

Do not create components that perform multiple unrelated tasks.

Prefer composition over large monolithic components.

---

# Component Structure

Keep components small.

Recommended size:

100–200 lines

If a component exceeds ~250 lines, consider splitting it.

---

# Folder Organization

Organize components by feature.

Example:

src/

components/

sections/

animations/

hooks/

lib/

utils/

data/

types/

providers/

Do not place unrelated files together.

---

# Naming Convention

Components

```tsx
HeroSection.tsx

Navbar.tsx

Loader.tsx
```

Hooks

```ts
useLenis.ts

useScrollAnimation.ts

useHeroTimeline.ts
```

Utilities

```ts
formatDate.ts

createTimeline.ts

clamp.ts
```

Animation helpers

```ts
heroAnimation.ts

loaderTimeline.ts

workflowTimeline.ts
```

---

# File Naming

Use:

PascalCase

for React components.

Use:

camelCase

for utilities and hooks.

---

# Imports

Group imports.

Example:

React

↓

Next.js

↓

Libraries

↓

Components

↓

Hooks

↓

Utilities

↓

Types

↓

Styles

Maintain consistent order.

---

# Styling

Use:

Tailwind CSS

Avoid:

Large CSS files

Avoid:

Inline styles

Use custom CSS only when required for advanced animations.

---

# Responsive Development

Desktop-first.

Then optimize:

Laptop

↓

Tablet

↓

Mobile

Never build mobile and desktop separately unless necessary.

---

# Animation Organization

Never place large GSAP timelines directly inside components.

Instead:

Create dedicated animation functions.

Example:

animations/

heroTimeline.ts

workflowTimeline.ts

loaderTimeline.ts

Components should initialize timelines, not define them.

---

# GSAP Rules

Always:

- use refs
- clean up timelines
- kill ScrollTriggers
- revert SplitType

Never leave animations mounted after component unmount.

---

# Refs

Avoid:

document.querySelector()

Instead use:

React refs

for every animated element.

---

# State Management

Prefer:

React state

Context API

Avoid unnecessary global state.

Do not introduce Redux, Zustand, or similar libraries unless explicitly required.

---

# Static Content

Never hardcode repeated text.

Store content inside dedicated data files.

Example:

data/

features.ts

faq.ts

workflow.ts

navigation.ts

Components should render data rather than contain it.

---

# Reusability

If a pattern appears more than twice,

convert it into a reusable component.

Examples:

Buttons

Containers

Section headings

Dividers

Cards

Timeline items

---

# Utility Functions

Keep utilities pure.

Avoid side effects.

Utility functions should never depend on React.

---

# Hooks

Custom hooks should encapsulate logic,

not UI.

Example:

useLenis()

useScrollDirection()

useSplitText()

---

# Comments

Write comments only when necessary.

Good code should explain itself.

Avoid commenting obvious code.

---

# Error Handling

Always handle:

- null values
- undefined values
- missing refs
- failed animations

Fail gracefully.

---

# Accessibility

Every component should:

- use semantic HTML
- support keyboard navigation
- include ARIA attributes where needed
- maintain focus visibility

Accessibility is not optional.

---

# Performance

Always:

- lazy load heavy assets
- optimize images
- minimize re-renders
- memoize expensive calculations when appropriate
- clean up event listeners
- clean up animations

Avoid unnecessary work.

---

# Git Philosophy

Every commit should represent a logical unit of work.

Avoid mixing unrelated changes.

Write meaningful commit messages.

---

# Dependency Management

Before adding a dependency ask:

1. Is this already possible with existing libraries?
2. Does it significantly improve the project?
3. Is it actively maintained?
4. Is the bundle size justified?

Avoid dependency bloat.

---

# AI Agent Rules

When generating code:

- Never duplicate logic.
- Reuse existing components.
- Reuse existing hooks.
- Reuse existing animation helpers.
- Keep files modular.
- Follow the design system.
- Follow animation guidelines.
- Prefer readability over cleverness.
- Write production-ready code only.
- Do not introduce experimental patterns unless explicitly requested.

---

# Final Principle

Every line of code should contribute to one of these goals:

- Better maintainability
- Better performance
- Better readability
- Better scalability
- Better user experience

If it doesn't, it shouldn't be added.