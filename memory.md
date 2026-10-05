# Memory — Rebrand to Cero, Releases Integration & Docs Expansion

Last updated: 2026-10-05 14:07:00

## What was built

- **Rebranded to Cero**:
  - Replaced Sentinel with Cero across the entire codebase (navbar, hero, FAQ, how-it-works, footer, docs, and metadata).
  - Updated repository links to `https://github.com/NetPranav/Cero-Terminal`.
- **Direct GitHub Releases Linking & Option Cleanup**:
  - Created [src/data/releases.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/releases.ts) containing structured URLs for all published assets in `NetPranav/Cero-Terminal` (macOS v2.2.0, Windows v2.2.0, Linux v2.2.3) and client-side OS detection.
  - **Removed nonexistent download options**: Dropped Windows x86 and Windows ARM64 options that have no release assets on GitHub.
  - **Added real release options**: Added Apple Silicon (`.dmg`) & Intel (`.dmg`) for Mac, Setup (`.exe`) & MSI Package (`.msi`) for Windows, and Debian (`.deb`), Universal (`.AppImage`), and Fedora/RHEL (`.rpm`) for Linux.
  - **Auto-download trigger**: Added `auto=true` support on `/download` and connected Hero / Navbar / Homepage CTA buttons to `/download?auto=true` for 1-click downloads with a dismissible feedback notice.
- **Coming Soon Badges for CLI Package Managers**:
  - Updated `CliCommandBox` in [src/app/download/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/download/page.tsx) with a clean `Coming Soon` badge and clear labels (`Homebrew`, `Windows Package Manager`, `Install Script`).
  - Added a `Coming Soon` tag in [src/app/docs/installation/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/docs/installation/page.tsx) for unreleased package manager formulas while maintaining pre-built desktop instructions.
- **Homepage Data Alignment (Features, FAQ, How It Works)**:
  - Updated [src/data/features.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/features.ts) to highlight Cero's flagship v2.2 capabilities:
    1. Natural Shell & OS Control (`> turn wifi off`, dark mode, audio)
    2. Self-Healing SERL Engine (3-strike diagnostic remediation)
    3. 100% Offline Local Models (0.5B to 4B tiers with Metal/Vulkan)
    4. Declarative .flow Automation (`cero setup.flow`)
    5. Universal IDE Launchers (VS Code, Cursor, Antigravity, Xcode)
    6. Zero-Trust Security Gate (Destructive operation holds & OS Keychain vault)
  - Updated [src/data/faq.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/faq.ts) with direct answers to developer questions:
    - Supported platforms & release package formats (DMG, EXE, MSI, DEB, RPM, AppImage)
    - Hardware RAM recommendations (8GB for 0.5B/1.5B, 16GB+ for 3B/4B)
    - How the SERL self-healing feedback loop works
    - Native OS system settings control
    - The `@netpranav/cero-cli` global companion launcher & `.flow` files
    - Zero-Trust security & OS Keychain credential storage
  - Updated [src/data/howItWorks.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/howItWorks.ts) to reflect the explicit `>` prompt prefix, zero-trust permission checks, and the SERL self-healing loop.
- **Comprehensive Documentation Expansion**:
  - Created [src/data/commands.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/commands.ts) with categorized dictionary data for Cero's full feature set.
  - Rebuilt [src/app/docs/commands/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/docs/commands/page.tsx) with category filter pills, real-time live search, interactive 1-click clipboard copy with status feedback, and tool mapping tags.
  - Updated [src/app/docs/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/docs/page.tsx) with offline local model details, SERL overview, and interactive cards linking to subpages.
  - Updated [src/app/docs/installation/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/docs/installation/page.tsx) with macOS unnotarized "Open Anyway" instructions, Windows SmartScreen bypass, Linux package manager installation commands, companion `@netpranav/cero-cli` launcher, and build from source steps.
  - Updated [src/app/docs/releases/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/docs/releases/page.tsx) to reflect v2.2.0/v2.2.3 milestone.
  - Updated [src/app/docs/architecture/page.tsx](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/app/docs/architecture/page.tsx) detailing Tauri v2 + Rust core, WebGL xterm.js canvas, embedded llama.cpp local inference (Metal/Vulkan), SERL diagnostics, and OS keychain credential security.

## Decisions made

- Sourced binary URLs directly from GitHub Releases CDN (`https://github.com/NetPranav/Cero-Terminal/releases/download/...`) to avoid API rate limits and provide instant file downloads upon clicking.
- Separated static dictionary data from components into [src/data/commands.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/commands.ts) and [src/data/releases.ts](file:///e:/Projects/Landing%20Pages/Sentinel%20Landing%20Page/src/data/releases.ts) adhering to `AGENTS.md` guidelines.
- Preserved CLI command previews on the download and documentation pages while clearly identifying them as `Coming Soon` so users aren't confused by unreleased package manager formulas.

## Current state

- Production build (`npm run build`) succeeded with 0 errors across all 8 static pages (`/`, `/_not-found`, `/docs`, `/docs/architecture`, `/docs/commands`, `/docs/installation`, `/docs/releases`, `/download`).
- All homepage copy, documentation pages, and download interactions are 100% synchronized with Cero's latest v2.2 capabilities.

## Next session starts with

- Awaiting user input for any additional styling or features.

## Open questions

- None at this moment.
