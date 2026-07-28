# COMPONENT_GUIDELINES.md

# Sentinel Website - Component Guidelines

This document defines how reusable components should be designed, structured, and implemented throughout the Sentinel website.

Every component should follow these guidelines to maintain consistency, scalability, and maintainability.

---

# Component Philosophy

Every component should have one responsibility.

A component should either:

- Display UI
- Handle interaction
- Control animation
- Manage layout

Avoid components that perform multiple unrelated responsibilities.

---

# Component Categories

The project consists of four major component types.

## 1. Layout Components

Responsible for page structure.

Examples:

- Container
- Section
- Grid
- Stack
- Spacer

These components should never contain business logic.

---

## 2. UI Components

Reusable visual elements.

Examples:

- Button
- Badge
- Heading
- Divider
- Card
- Tag
- Input
- Link

These should be completely reusable.

---

## 3. Section Components

Represent an entire section of the landing page.

Examples:

- Hero
- Features
- Workflow
- Security
- FAQ
- Footer

Each section should be independent.

---

## 4. Animation Components

Components whose primary responsibility is motion.

Examples:

- Loader
- Cursor
- Marquee
- Reveal
- Text Split
- Progress Indicator

Keep animation logic isolated.

---

# Component Structure

Every component should follow a predictable structure.

```tsx
Component

↓

Imports

↓

Types

↓

Refs

↓

Hooks

↓

Animation

↓

Handlers

↓

Render
```

Maintain this order across the project.

---

# Component Size

Small Components

<100 lines

Medium Components

100–200 lines

Large Components

200–300 lines

If a component exceeds 300 lines,

consider splitting it.

---

# Reusability

Before creating a new component, ask:

Can an existing component be reused?

If yes,

extend it instead of duplicating functionality.

---

# Props

Props should be:

- Explicit
- Strongly typed
- Minimal

Avoid passing unnecessary props.

Prefer descriptive prop names.

Example

Good

```tsx
<Button variant="primary" />
```

Bad

```tsx
<Button type={1} />
```

---

# Children

Use children only when it improves flexibility.

Avoid deeply nested component trees.

---

# Variants

Components with multiple visual styles should use variants.

Example

Primary

Secondary

Outline

Ghost

Danger

Avoid creating separate components for simple style differences.

---

# Styling

Use Tailwind utilities.

Avoid inline styles.

Avoid large CSS modules.

Custom CSS should exist only when necessary.

---

# Layout Responsibility

A reusable component should not decide page spacing.

Spacing belongs to the parent.

Bad

```tsx
<Card className="mt-20" />
```

Good

```tsx
<section className="mt-20">
  <Card />
</section>
```

---

# Animation Responsibility

Animations should remain independent from UI logic.

Complex GSAP timelines should never be written directly inside reusable UI components.

Instead:

Component

↓

Animation Hook

↓

Timeline

---

# Icons

Icons should be passed as components.

Example

```tsx
<Button icon={ArrowRight} />
```

Avoid hardcoding icons inside reusable components.

---

# Images

Use Next.js Image component whenever possible.

Always provide:

- width
- height
- alt text

Lazy load images by default.

---

# Accessibility

Every reusable component should support:

- Keyboard interaction
- Focus states
- Semantic HTML
- Proper ARIA labels

Accessibility should be built in from the beginning.

---

# Buttons

Buttons should support:

- Loading state
- Disabled state
- Hover state
- Focus state
- Active state

Avoid creating multiple button components.

---

# Forms

Although the landing page has minimal forms,

future forms should:

- Validate input
- Show clear errors
- Support keyboard navigation

---

# Containers

All major sections should use the shared Container component.

Avoid creating custom width wrappers inside each section.

---

# Section Headings

Create a reusable heading component.

It should support:

- Label
- Title
- Description

Instead of manually recreating headings for every section.

---

# Cards

Cards should remain generic.

Never create feature-specific card layouts unless absolutely necessary.

---

# Terminal Components

Any terminal UI should be modular.

Separate:

- Window
- Header
- Prompt
- Command
- Output
- Cursor

This allows reuse across multiple sections.

---

# Data Separation

Never hardcode repeated data inside components.

Store content in dedicated data files.

Components should render data,

not own data.

---

# Client Components

Use Client Components only when necessary.

If a component has:

- GSAP
- State
- Event listeners
- Lenis
- ScrollTrigger

then it should be a Client Component.

Otherwise,

prefer Server Components.

---

# Memoization

Use memoization only when it provides measurable benefits.

Avoid premature optimization.

---

# Naming

Component names should clearly describe their purpose.

Good

HeroHeading

WorkflowTimeline

FAQAccordion

Bad

Item

Box

Thing

Widget

---

# Component API

A component's API should remain intuitive.

Developers should understand its usage without reading internal code.

---

# Documentation

Complex reusable components should include brief comments describing:

- Purpose
- Expected props
- Usage

Avoid excessive comments.

---

# AI Agent Instructions

When creating new components:

1. Check if a reusable component already exists.
2. Keep responsibilities focused.
3. Separate UI and animation logic.
4. Follow the design system.
5. Use strong TypeScript typing.
6. Prioritize readability over abstraction.
7. Build components that can be reused across multiple sections.

Every component should contribute to a consistent, scalable, and production-ready design system.
