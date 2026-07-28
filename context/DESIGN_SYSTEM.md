# DESIGN_SYSTEM.md

# Sentinel Website - Design System

This document defines the global visual language for the Sentinel website. Every page, section, and component must follow these guidelines to ensure consistency across the entire experience.

---

# Design Principles

The design language is based on five core principles:

- Minimal over decorative
- Typography over graphics
- Motion over static layouts
- Whitespace over visual clutter
- Precision over complexity

Every design decision should reinforce these principles.

---

# Visual Identity

The Sentinel website should feel:

- Premium
- Editorial
- Technical
- Minimal
- Modern
- Confident
- Fast
- Purposeful

The interface should never resemble a generic SaaS landing page.

Instead, it should feel closer to premium product websites like:

- Linear
- Warp
- Raycast
- Cursor
- Vercel
- Stripe
- Framer

---

# Color Palette

## Background

Primary Dark

```css
#141314
```

Used for:

- Main website background
- Hero
- Sections
- Footer
- Loader (unless specified)

---

Primary Light

```css
#EEEEEE
```

Used for:

- Light mode sections (if any)
- Documentation previews
- Editorial layouts

---

## Navigation

Dark Navigation

```css
#333333
```

Used for:

- Navigation background
- Overlay panels
- Floating menus

---

Light Navigation

```css
#D5D5D5
```

Used for:

- Light theme navigation
- Menu borders
- Secondary surfaces

---

## Accent

Primary Accent

```css
#FB460D
```

The accent color should be used sparingly.

Reserved for:

- Active navigation items
- CTA buttons
- Interactive highlights
- Timeline progress
- Links
- Focus indicators
- Terminal cursor
- Small decorative elements

Never overuse the accent color.

The interface should remain primarily monochromatic.

---

# Color Usage Ratio

Approximately:

```text
90%
Neutral Colors

8%
Accent

2%
Supporting Elements
```

Accent color should create emphasis, not decoration.

---

# Typography

## Primary Font

Aktiv Grotesk

Used for:

- Headings
- Paragraphs
- Navigation
- Buttons
- Labels
- UI elements

---

## Secondary Font

Geist Mono

Weights:

- Regular
- Medium

Used for:

- Code snippets
- Terminal commands
- Technical labels
- File paths
- Keyboard shortcuts
- Small metadata

---

# Typography Philosophy

Typography is the primary visual element.

Large headings should communicate confidence.

Paragraphs should remain concise.

Avoid unnecessary font variations.

Maintain strong hierarchy through size rather than weight.

---

# Type Scale

Hero Display

```text
96–120px
```

Large Section Heading

```text
64–72px
```

Medium Heading

```text
40–48px
```

Small Heading

```text
28–32px
```

Body Large

```text
20px
```

Body

```text
18px
```

Small Text

```text
16px
```

Labels

```text
14px
```

Micro Labels

```text
12px
```

---

# Font Weight

Light

Used sparingly.

Regular

Default body weight.

Medium

Navigation

Buttons

Labels

Semibold

Section titles

Bold

Hero headings only.

Avoid excessive bold typography.

---

# Spacing System

Base spacing unit

```text
8px
```

Spacing scale

```text
8
16
24
32
40
48
64
80
96
128
160
200
```

Maintain generous whitespace throughout the site.

Never compress sections unnecessarily.

---

# Grid System

Desktop Container

```text
1440px max-width
```

Content Width

```text
1280px
```

Reading Width

```text
700–800px
```

Always align components to the same grid.

---

# Border Radius

Small

```text
8px
```

Medium

```text
12px
```

Large

```text
20px
```

Pill

```text
999px
```

Avoid exaggerated rounded corners.

---

# Borders

Border Color

```css
rgba(255,255,255,0.08)
```

Use subtle borders instead of heavy shadows.

---

# Shadows

Minimal.

Prefer:

- soft ambient shadows
- low opacity

Avoid:

- large floating shadows
- colorful glows

Exception:

Accent glow may be used sparingly around interactive elements.

---

# Buttons

Buttons should feel clean and premium.

Primary Button

- Filled accent background
- Dark text or white text depending on contrast
- Medium radius
- Medium weight

Secondary Button

- Transparent
- Thin border
- Minimal hover effects

Avoid oversized buttons.

---

# Icons

Use:

- Lucide Icons

Icons should remain:

- simple
- thin
- consistent

Avoid filled icon packs.

---

# Cards

Cards should not dominate the layout.

Instead:

- use spacing
- use typography
- use alignment

Cards should only appear when they improve readability.

Avoid card-heavy interfaces.

---

# Images

Images should be:

- high quality
- minimal
- editorial

Avoid:

- stock photography
- overly colorful illustrations
- unnecessary gradients

Whenever possible, prefer product visuals.

---

# Dividers

Use subtle horizontal lines to separate content.

Preferred border:

```css
rgba(255,255,255,0.08)
```

Avoid heavy separators.

---

# Layout

Every section should breathe.

Use generous vertical spacing.

Avoid dense layouts.

Large whitespace creates rhythm.

---

# Scroll Experience

Content should never feel cramped.

Each section should have a clear beginning and ending.

Transitions between sections should feel natural.

---

# Responsive Design

Desktop First

Then optimize for:

- Laptop
- Tablet
- Mobile

Typography should scale smoothly.

Never simply shrink desktop layouts.

---

# Design Don'ts

Do NOT use:

- Glassmorphism
- Neumorphism
- Excessive gradients
- Heavy drop shadows
- Random accent colors
- Bright neon effects
- Excessive blur
- Busy backgrounds
- Oversized icons
- Generic SaaS cards
- Inconsistent spacing

---

# Design Do's

Always prioritize:

- Simplicity
- Readability
- Whitespace
- Typography
- Consistency
- Precision
- Visual rhythm
- Clean alignment
- High contrast
- Premium finishing

---

# AI Agent Instructions

Every component generated for this project must strictly follow this design system.

Do not introduce additional colors, fonts, spacing scales, or visual styles unless explicitly specified in future page documents.

This document is the single source of truth for the visual identity of the Sentinel website.
