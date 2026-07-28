# Local Font Setup - Aktiv Grotesk

This project is configured to use **Aktiv Grotesk** as the primary font and **Geist Mono** as the secondary font, as specified in the Design System.

## Adding Local Font Files

If local font files for Aktiv Grotesk are available, place the following `.woff2` files inside this directory (`public/fonts/`):

- `AktivGrotesk-Light.woff2` (Weight: 300)
- `AktivGrotesk-Regular.woff2` (Weight: 400)
- `AktivGrotesk-Medium.woff2` (Weight: 500)
- `AktivGrotesk-Semibold.woff2` (Weight: 600)
- `AktivGrotesk-Bold.woff2` (Weight: 700)

The CSS `@font-face` definitions in `src/styles/fonts.css` are already pre-configured to automatically load these files as soon as they are placed here. Until the files are added, the browser will gracefully fall back to the secondary variable sans font without breaking the application build or runtime.
