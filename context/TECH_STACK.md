# TECH_STACK.md

# Sentinel Website - Technology Stack

This document defines the approved technology stack for the Sentinel website.

All implementations must use the technologies defined here unless explicitly instructed otherwise.

---

# Core Framework

## Next.js

Use the latest stable version of Next.js with the App Router.

The project should leverage:

- App Router
- Server Components where appropriate
- Client Components only when required
- Route Groups when beneficial
- Layouts
- Metadata API
- Optimized Image component
- Optimized Font loading

---

# Language

## TypeScript

The entire project must be written in TypeScript.

Avoid JavaScript unless absolutely necessary.

All components, hooks, utilities, and animation helpers should be strongly typed.

Avoid using `any`.

Prefer explicit types and interfaces.

---

# Styling

## Tailwind CSS

Tailwind CSS is the primary styling solution.

Use utility classes whenever possible.

Avoid custom CSS unless:

- animations require it
- complex layouts require it
- browser limitations require it

Never use inline styles.

---

# Animation

Animation is one of the most important parts of this project.

## GSAP

GSAP is the primary animation library.

Use GSAP for:

- Hero animations
- Loader
- Scroll animations
- Text reveals
- Timeline animations
- Section transitions
- Complex sequencing
- Menu transitions
- Page transitions

Do not replace GSAP with CSS animations for major interactions.

---

## ScrollTrigger

Use ScrollTrigger for:

- Pinning sections
- Scroll progress
- Timeline progression
- Horizontal scrolling
- Reveal animations
- Trigger-based animations

Every ScrollTrigger must be properly cleaned up.

---

## Lenis

Lenis is responsible for smooth scrolling.

Requirements:

- Global smooth scrolling
- Integrated with ScrollTrigger
- Maintain consistent scroll velocity
- Never conflict with GSAP

---

## SplitType

SplitType should only be used for large headings.

Use it for:

- Hero title
- Large section titles
- Editorial text reveals

Do NOT use SplitType for paragraphs.

Destroy SplitType instances when no longer needed.

---

## Framer Motion

Framer Motion is reserved for small UI interactions.

Use it for:

- Button hover
- Small fades
- Icon transitions
- Micro interactions

Do NOT use Framer Motion for:

- Scroll animations
- Large timelines
- Hero animations
- Loader
- Pinned sections

Those belong to GSAP.

---

# 3D

## React Three Fiber

Use R3F only if a section requires true 3D.

Examples:

- Interactive terminal visualization
- Floating object
- Abstract scene

Do not use R3F simply for decoration.

---

## Drei

Use Drei utilities whenever appropriate.

Avoid reinventing existing helpers.

---

# Icons

Use:

Lucide React

Maintain consistent icon size and stroke width.

---

# Utility Libraries

Approved utilities:

- clsx
- tailwind-merge
- class-variance-authority (if needed)

Avoid unnecessary helper libraries.

---

# State Management

Prefer React state.

Use:

- useState
- useReducer
- Context API

Avoid introducing global state libraries unless absolutely necessary.

The landing page should remain lightweight.

---

# Data

Static content should live inside dedicated data files.

Example:

/data

features.ts

faq.ts

workflow.ts

navigation.ts

Avoid hardcoding repeated content inside components.

---

# Assets

Organize assets into:

/public

images

videos

icons

fonts

Do not mix assets with source files.

---

# Fonts

Primary

Aktiv Grotesk

Secondary

Geist Mono

Load fonts efficiently.

Avoid unnecessary font weights.

---

# Responsive Development

Desktop-first.

Optimize for:

Desktop

Laptop

Tablet

Mobile

Avoid creating separate mobile layouts unless necessary.

---

# Performance

Always prioritize:

- GPU accelerated animations
- Lazy loading
- Minimal bundle size
- Code splitting
- Image optimization
- Proper cleanup

Maintain smooth performance at 60 FPS.

---

# Accessibility

Every implementation should:

- Respect prefers-reduced-motion
- Support keyboard navigation
- Use semantic HTML
- Include proper ARIA attributes where necessary
- Maintain readable contrast ratios

---

# Folder Organization

Keep code modular.

Separate:

- components
- animations
- hooks
- utils
- data
- sections

Avoid excessively large files.

---

# Code Quality

Always write:

- reusable components
- maintainable code
- strongly typed code
- readable functions
- descriptive variable names

Avoid shortcuts.

---

# AI Agent Instructions

Before implementing any feature:

1. Choose the appropriate library for the task.
2. Do not introduce additional dependencies unless explicitly requested.
3. Reuse existing utilities and components whenever possible.
4. Follow the project's design system and animation guidelines.
5. Prioritize maintainability, readability, and performance over clever implementations.

This document defines the official technology stack and implementation boundaries for the Sentinel website.