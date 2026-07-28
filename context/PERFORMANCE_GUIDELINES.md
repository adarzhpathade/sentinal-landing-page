# PERFORMANCE_GUIDELINES.md

# Sentinel Website - Performance Guidelines

Performance is a core feature of the Sentinel website.

The website should feel instantaneous, fluid, and responsive on modern hardware while maintaining a consistent 60 FPS during interactions and animations.

Every implementation should prioritize efficiency without compromising the visual experience.

---

# Performance Philosophy

Design beautiful experiences.

Engineer fast experiences.

Never sacrifice performance for unnecessary visual effects.

Every animation, component, and asset should justify its existence.

---

# Target Performance

Desktop

- Stable 60 FPS
- No layout shifts
- Smooth scrolling
- Instant interactions

Mobile

- Stable 60 FPS whenever possible
- Graceful degradation for heavy effects

---

# Rendering Rules

Prefer GPU accelerated properties.

Animate only:

- transform
- opacity
- clip-path
- scale
- rotate
- x
- y

Avoid animating:

- width
- height
- margin
- padding
- top
- left
- right
- bottom

These properties trigger layout recalculations.

---

# Animation Performance

All animations should:

- Use GSAP transforms
- Avoid excessive DOM updates
- Be cleaned up on unmount
- Be interruptible
- Respect reduced-motion preferences

Never leave inactive animations running.

---

# Scroll Performance

Scroll should remain smooth at all times.

Requirements:

- Lenis handles scrolling
- ScrollTrigger synchronised correctly
- No scroll jank
- No excessive listeners

Avoid nested scrolling unless absolutely necessary.

---

# GSAP Best Practices

Always:

- kill timelines
- kill ScrollTriggers
- revert SplitType
- remove listeners

Never leave animations mounted after navigation.

---

# Images

Use Next.js Image component.

Requirements:

- Lazy load by default
- Proper width & height
- Responsive sizes
- Modern formats when available

Avoid oversized images.

Compress assets before adding them.

---

# Videos

Videos should:

- Autoplay only when appropriate
- Be muted
- Loop efficiently
- Lazy load when possible

Avoid multiple autoplay videos on the same viewport.

---

# Fonts

Load only required font weights.

Avoid loading unnecessary variants.

Use font-display: swap when appropriate.

---

# Bundle Size

Keep JavaScript bundles as small as possible.

Before adding a dependency ask:

- Is it necessary?
- Can existing libraries solve this?
- Does the value justify the bundle size?

Avoid dependency bloat.

---

# Code Splitting

Lazy load:

- Heavy sections
- Large animations
- Three.js scenes
- Non-critical components

Only load what the user needs.

---

# React Performance

Avoid unnecessary re-renders.

Use:

- memo
- useMemo
- useCallback

Only when they provide measurable benefits.

Do not over-optimise prematurely.

---

# State Management

Keep state local whenever possible.

Avoid unnecessary global state.

Minimise component updates.

---

# DOM Management

Keep the DOM shallow.

Avoid deeply nested structures.

Remove unused elements.

Do not render hidden components unnecessarily.

---

# Event Listeners

Every listener must:

- Be cleaned up
- Be throttled or debounced when needed
- Avoid duplicate registrations

Never attach listeners inside render cycles.

---

# ScrollTrigger Optimisation

Create only the triggers that are needed.

Destroy them immediately when the component unmounts.

Avoid excessive pinning.

Avoid hundreds of triggers.

---

# Three.js

If React Three Fiber is used:

- Pause rendering when off-screen
- Dispose of unused geometries
- Dispose of materials
- Dispose of textures

Only render when necessary.

---

# Network Optimisation

Minimise requests.

Combine assets when appropriate.

Use caching where possible.

Avoid duplicate downloads.

---

# Accessibility & Motion

Respect:

prefers-reduced-motion

Provide lightweight alternatives for users who disable animations.

Performance should improve automatically when reduced motion is enabled.

---

# Mobile Performance

Reduce:

- Blur effects
- Heavy shadows
- Particle density
- Complex timelines

Maintain the same visual identity while reducing rendering cost.

---

# Memory Management

Always clean up:

- Timelines
- ScrollTriggers
- SplitType instances
- Event listeners
- Intervals
- Timeouts
- Animation frames

Never leak memory.

---

# Testing Checklist

Before considering a feature complete, verify:

- Smooth scrolling
- No dropped frames
- No layout shifts
- No memory leaks
- Responsive behaviour
- Keyboard accessibility
- Reduced motion support

---

# Lighthouse Goals

Aim for:

Performance: 95+

Accessibility: 100

Best Practices: 100

SEO: 100

These are targets, not strict requirements, but should guide implementation decisions.

---

# AI Agent Instructions

When implementing any feature:

1. Choose the most performant solution.
2. Prefer CSS and GPU transforms over expensive DOM manipulation.
3. Lazy load non-critical assets.
4. Clean up all animations and listeners.
5. Keep JavaScript lightweight.
6. Optimise before adding visual complexity.

Every feature should enhance the experience without reducing responsiveness.

The Sentinel website should feel as fast as the product it represents.
