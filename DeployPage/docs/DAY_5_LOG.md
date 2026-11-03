# Day 5 Development Log — Norque Studios Website

**Date:** November 2, 2026  
**Objective:** Execute Day 5 design revisions and new UI features from Figma: Footer MagnetLines resolution consistency (`vw`), typography stagger opacity locking (`opacity: 1`), splash screen scroll guard, image bitrate protection during scroll, Selected Works CTA, Philosophy section repositioning with circular seal mark, and the "Done by humans" section with smooth background parallax.

---

## 🎯 Objectives Completed

### 1. Footer MagnetLines Resolution Consistency (`vw`)
- **Problem:** On different screen resolutions and high-DPI displays, fixed pixel values caused the number of interactive magnet lines to fluctuate unexpectedly.
- **Solution:** Converted all MagnetLines configuration metrics from fixed `px` to proportional viewport units (`vw` on a 1440px baseline):
  - `lineWidth: '0.1389vw'` (~2px)
  - `lineHeight: '1.25vw'` (~18px)
  - `spacing: '2.0833vw'` (~30px)
  - `radius: '13.8889vw'` (~200px)
- **Result:** Consistent line count and magnetic interaction radius preserved proportionally across all monitors and viewport sizes.

### 2. Typography Stagger Opacity Locking (`MaskedWordStagger.jsx`)
- **Specification:** Remove opacity fade transition during text stagger reveals; opacity must remain `1` at all times while retaining the fluid vertical masked slide.
- **Implementation:**
  - Modified `lineVariants` in `MaskedWordStagger.jsx`:
    - `hidden`: `{ y: '105%', opacity: 1 }`
    - `visible`: `{ y: '0%', opacity: 1 }`
  - All headings, manifesto statements, and body copy across Home and About pages now reveal with sharp, solid 100% opacity driven by the universal cubic-bezier curve `[0, 0.8, 0.2, 1]`.

### 3. Splash Screen Scroll Lock & Hero Transition
- **Problem:** Users could scroll during the initial splash screen animation, causing the page to mount scrolled past the Hero section.
- **Solution:**
  - Synchronized scroll locking across Lenis and window events in `App.jsx` until `isSplashComplete` is true.
  - Locked `overflow: hidden` on `<html>` and `<body>`, paused Lenis (`lenis.stop()`), and blocked `wheel`, `touchmove`, and navigation keys during intro playback.
  - Clean release automatically resets `window.scrollTo(0, 0)` and resumes Lenis smooth scrolling once the hero section is visible.

### 4. HTML Artifact Cleanup
- Removed an accidental lingering `//test` debug string located directly after the footer element in `index.html`.

### 5. Motion Blur Image Bitrate Protection
- **Problem:** Velocity-driven vertical motion blur during scrolling caused subtle bitrate degradation and blur bleeding on raster case study thumbnails and media.
- **Solution:**
  - Strictly scoped `.motion-blur-target` exclusively to typography headings and text landmarks.
  - Added CSS hardware-acceleration and rasterization isolation guards (`image-rendering: -webkit-optimize-contrast`, `backface-visibility: hidden`, `transform: translateZ(0)`) to ensure all portfolio images remain 100% razor-sharp during scroll.

### 6. Selected Works CTA Implementation (`Homepage.fig`)
- **Heading:** Centered `"Discover more projects!"` (`text-[1.5278vw] font-bold tracking-[-0.03em] leading-none text-white mt-[3.2639vw]`).
- **Button:** Centered `"Discover more"` link button (`text-[0.6944vw] font-semibold text-white mt-[1.1111vw]`) with an underline offset (`underline underline-offset-[0.2083vw]`) and the 7.025px diagonal arrow vector (`w-[0.4879vw] h-[0.4879vw]`) extracted from Figma.

### 7. Philosophy Section Hierarchy & Circular Seal Mark
- **Hierarchy Reorder:** Shifted Philosophy section to sit directly below the "What's happening now" News Section carousel.
- **Layout:** Re-engineered as a 2-column flex row (`justify-between items-start`):
  - **Left Statement:** 2-paragraph manifesto (`w-[48.7243vw]`, `text-[1.5278vw] font-bold`, `leading-[1.18]`, `space-y-[1.5278vw]`) wrapped in sequential line stagger.
  - **Right Seal Logo:** Extracted the studio's circular brand mark into `NorqueCircleLogo.jsx` (`w-[6.1838vw]`), positioned flush with the right 12px margin.

### 8. "Done by Humans" Section with Background Parallax
- **Component Architecture:** Created `DoneByHumans.jsx` mounted between Philosophy and Footer.
- **Card Container:** Sized to `h-[49.0278vw]` with `mb-[10.8333vw]` bottom spacing, matching Figma frame 191 (`706px` height, `156px` bottom padding).
- **Header Mark:** Extracted all 12 lossless vector glyphs from Figma into `DoneByHumansLogo.jsx` rendered at `w-[92.5243vw]`.
- **Bottom Statement Block:** Centered `NorqueCircleLogo` (`w-[3.2825vw]`) and centered manifesto text (`w-[61.5979vw]`, `text-[1.5278vw] font-bold`) inside `MaskedWordStagger`.
- **Cinematic Background Parallax:**
  - Sized background photo (`done-by-humans-bg.png`) to `h-[130%]` (`-top-[15%]`) inside an `overflow-hidden` container.
  - Attached `useScroll` with `offset: ["start end", "end start"]` to smoothly interpolate `translateY` from `-10%` to `+10%` on a hardware-accelerated layer (`will-change: transform`).
  - Text layers remain on an independent `z-10` plane, ensuring parallax movement affects exclusively the background image.

---

## 📦 Deliverables & Files Modified

- [`src/components/Footer.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/Footer.jsx) — Proportional `vw` MagnetLines configuration for cross-resolution consistency.
- [`src/components/MaskedWordStagger.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/MaskedWordStagger.jsx) — Opacity locked to `1` across all stagger animation states.
- [`src/App.jsx`](file:///D:/NorqueStudios/DeployPage/src/App.jsx) — Comprehensive splash screen scroll lock and Lenis lifecycle management.
- [`index.html`](file:///D:/NorqueStudios/DeployPage/index.html) — Removed lingering `//test` string.
- [`src/components/SelectedWorks.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/SelectedWorks.jsx) — CTA heading, button, and diagonal arrow vector.
- [`src/components/Philosophy.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/Philosophy.jsx) — 2-column flex layout with manifesto and right-aligned circular seal mark.
- [`src/components/NorqueCircleLogo.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/NorqueCircleLogo.jsx) — Reusable circular seal brand mark SVG extracted from Figma.
- [`src/components/DoneByHumansLogo.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/DoneByHumansLogo.jsx) — Lossless 12-glyph vector mark for "DONE BY HUMANS".
- [`src/components/DoneByHumans.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/DoneByHumans.jsx) — Full-bleed cinematic section with background parallax and manifesto.
- [`src/assets/done-by-humans-bg.png`](file:///D:/NorqueStudios/DeployPage/src/assets/done-by-humans-bg.png) — High-resolution cinematic background photograph.
- [`src/components/HomePage.jsx`](file:///D:/NorqueStudios/DeployPage/src/components/HomePage.jsx) — Updated section order to match Figma hierarchy.
- [`package.json`](file:///D:/NorqueStudios/DeployPage/package.json) — Version bump to `0.4.0`.
- [`VERSION.md`](file:///D:/NorqueStudios/DeployPage/VERSION.md), [`docs/HANDOVER.md`](file:///D:/NorqueStudios/DeployPage/docs/HANDOVER.md), [`docs/ARCHITECTURE.md`](file:///D:/NorqueStudios/DeployPage/docs/ARCHITECTURE.md), [`README.md`](file:///D:/NorqueStudios/DeployPage/README.md) — Documentation update.
