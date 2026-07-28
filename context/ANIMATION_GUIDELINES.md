# ANIMATION_GUIDELINES.md

# Sentinel Website - Animation Guidelines

Animation is one of the core pillars of the Sentinel experience.

It should never exist for decoration alone.

Every animation must communicate hierarchy, improve usability, guide attention, or create immersion.

The website should feel like interacting with a premium desktop application rather than a traditional marketing website.

---

# Motion Philosophy

The motion language should be:

- Minimal
- Intentional
- Fluid
- Premium
- Editorial
- Responsive
- Confident

Avoid playful animations.

Avoid exaggerated motion.

Avoid unnecessary movement.

If an animation does not improve the experience, remove it.

---

# Motion Principles

Every animation should satisfy at least one of these goals:

- Reveal information
- Guide the user's attention
- Explain relationships
- Provide feedback
- Improve navigation
- Enhance storytelling

Animation should never feel random.

---

# Motion Style

The website should feel:

- Calm
- Smooth
- Engineered
- Elegant

Not:

- Bouncy
- Cartoonish
- Hyperactive
- Gamified

---

# Animation Library Responsibilities

## GSAP

Primary animation engine.

Responsible for:

- Loader
- Hero reveal
- Scroll animations
- Timelines
- Section transitions
- Navigation animations
- Text reveals
- Complex sequences
- Pinned sections

---

## ScrollTrigger

Responsible for:

- Scroll progress
- Pinning
- Reveal triggers
- Horizontal sections
- Progress indicators
- Timeline synchronization

Always destroy ScrollTriggers on component unmount.

---

## Framer Motion

Reserved for:

- Hover interactions
- Button states
- Small fades
- Icon animations
- Tiny UI transitions

Never use Framer Motion for scroll-driven animations.

---

## Lenis

Responsible only for smooth scrolling.

It should remain invisible.

Users should notice the experience—not the library.

---

# Animation Timing

Fast

150ms–250ms

Examples:

- Button hover
- Icon fade
- Link underline

---

Medium

300ms–600ms

Examples:

- Cards
- Navigation
- Hero content

---

Long

700ms–1200ms

Examples:

- Hero sequence
- Section reveals
- Workflow transitions

---

Very Long

1500ms+

Reserved only for:

- Loader
- Major storytelling moments

Never overuse long animations.

---

# Easing

Preferred easing:

```text
power2.out

power3.out

power4.out

expo.out

circ.out
```

For entrance animations.

---

For timelines:

```text
power2.inOut

power3.inOut
```

---

Avoid:

- bounce
- elastic
- back
- spring-like easing

Unless specifically required.

---

# Animation Properties

Always animate:

- opacity
- transform
- x
- y
- scale
- rotate
- clip-path
- filter (sparingly)

Avoid animating:

- width
- height
- top
- left
- margin
- padding

These trigger unnecessary layout recalculations.

---

# Staggering

Use stagger frequently.

Preferred stagger:

```text
0.04s

0.06s

0.08s

0.1s
```

Never stagger too slowly.

The interface should remain responsive.

---

# Hero Animation

Hero animations should:

- establish hierarchy
- create anticipation
- feel cinematic

Suggested sequence:

Navigation

↓

Hero title

↓

Description

↓

CTA

↓

Supporting visual

↓

Background details

Never animate everything simultaneously.

---

# Text Reveal

Large headings may use:

- SplitType
- Character reveal
- Word reveal
- Line reveal

Paragraphs should use:

Simple fade

or

Fade + translateY

Avoid character animations on long paragraphs.

---

# Scroll Animations

Scroll animations should feel connected to scrolling.

Avoid:

Elements flying from random directions.

Prefer:

- fade
- slight translate
- scale
- clipping
- masking

---

# ScrollTrigger

Pin only when storytelling requires it.

Avoid excessive pinning.

Each pinned section should feel meaningful.

---

# Loader

The loader should:

- establish branding
- create anticipation
- transition naturally into the hero

Never exceed 2.5 seconds.

---

# Navigation

Navigation should:

- fade smoothly
- slide minimally
- remain subtle

Avoid oversized menu animations.

---

# Buttons

Hover effects should include:

- subtle background transitions
- icon movement
- opacity
- slight scaling (optional)

Avoid:

Large scaling

Excessive glow

Rotation

---

# Cards

Cards should animate only when entering the viewport.

Preferred animation:

Opacity

-

TranslateY

20px

Avoid:

Large rotations

3D flips

Elastic motion

---

# Images

Images should reveal using:

- fade
- clip-path
- scale
- masking

Avoid zooming aggressively.

---

# Section Transitions

Sections should flow naturally.

Use:

- spacing
- subtle overlap
- scroll continuity

Avoid abrupt visual changes.

---

# Micro Interactions

Micro interactions should feel immediate.

Examples:

- Link underline
- Cursor response
- Active navigation
- FAQ expansion
- Button hover

Target duration:

150–250ms

---

# Hover Philosophy

Hover should communicate:

"This element is interactive."

Not:

"Look at this animation."

---

# Cursor

If a custom cursor exists:

Keep it lightweight.

Do not obstruct content.

Avoid excessive scaling.

Avoid lag.

---

# Performance Rules

Every animation should:

- use transforms
- use opacity
- leverage GPU acceleration
- clean up after itself
- avoid layout thrashing

Target:

Consistent 60 FPS.

---

# Accessibility

Respect:

prefers-reduced-motion

Provide simplified animations when reduced motion is enabled.

The website should remain fully usable without animations.

---

# Animation Consistency

Every section should feel like it belongs to the same product.

Avoid introducing completely different motion styles between sections.

Maintain:

- consistent easing
- consistent durations
- consistent rhythm

---

# Animation Don'ts

Do NOT use:

- Bounce animations
- Elastic effects
- Infinite floating
- Random rotations
- Flashing elements
- Excessive blur
- Excessive glow
- Overlapping animations
- Long delays
- Constant motion

---

# Animation Do's

Always prioritize:

- Smoothness
- Readability
- Storytelling
- User focus
- Premium feel
- Intentional motion
- Visual hierarchy

---

# AI Agent Instructions

Before implementing any animation, ask:

1. Does this animation improve the experience?
2. Does it guide attention?
3. Is it consistent with the site's motion language?
4. Can it maintain 60 FPS?
5. Is GSAP the appropriate tool for this interaction?
6. Does it respect reduced-motion preferences?

If the answer to any of these questions is "No", redesign or simplify the animation.

Every animation should contribute to making Sentinel feel like a premium, engineering-focused product.
