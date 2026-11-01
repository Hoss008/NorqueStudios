# Day 1 Development Log — Norque Studios Website

**Date:** October 19, 2026  
**Objective:** Genesis of the project, foundation setup, and 1:1 pixel-perfect recreation of the Homepage from Figma.

---

## 🎯 Objectives Completed

1. **Environment & Tooling Setup**:
   - Initialized Vite + React 18 project with Tailwind CSS 3 and Framer Motion.
   - Configured Vite development server on port 3000.
   - Installed openfig-core and Figma extraction utilities to parse `HOME PAGE FIGMA.fig.zip`.

2. **Brand & Typography Architecture**:
   - Unpacked the full **Beausite Classic** font family (8 weights from Thin 100 to Ultra Black 900) into `src/assets/fonts/`.
   - Mapped all font faces in `src/index.css` with exact font-display configurations.
   - Set global letter-spacing to `-0.03em` (`-3%`) to match the Figma typographic hierarchy.

3. **Lossless Vector Logo Extraction**:
   - Extracted the binary vector blobs from Figma into raw mathematical SVG bezier paths.
   - Built `MainLogo.jsx` (full-width 1368x145 brand mark).
   - Built `CompactLogo.jsx` (top navigation brand mark).
   - Generated `logoPaths.js` and `splashLogoPaths.js` for path-based staggered rise animations.

4. **Homepage Sections Implementation**:
   - **Splash Screen (`SplashScreen.jsx`)**: 2.0-second initial load screen with staggered letter animations that gracefully fades out.
   - **Hero Section (`Hero.jsx`)**:
     - 2.5-second sequential text-rising animation.
     - 100vh full-screen background video fade-in.
     - Live Cairo/Egypt GMT clock ticking in real-time in the navigation bar.
   - **Showcase Section (`Showcase.jsx`)**:
     - 200vh pinned scroll track.
     - Scroll distance mathematically drives clip-path reveal from cropped (0%) to uncropped (100%).
     - Counter-parallax scale on recent works GIF to anchor visual center.
     - Under-showcase brand manifesto text.
   - **Selected Works (`SelectedWorks.jsx`)**:
     - 4-project portfolio grid (AXIS, Fusion Form, Studio Juzenas, MMS Architects).
     - Responsive 2-column layout with hover scale transitions and client metadata.
   - **Philosophy Section (`Philosophy.jsx`)**:
     - Typographic statement on intention and simplicity.
   - **News Section (`NewsSection.jsx`)**:
     - "What's happening now" editorial section.
   - **Footer (`Footer.jsx`)**:
     - Project inquiry contact callout (`hello@norquestudios.com`).
     - Giant bottom brand vector mark.
     - Social directory links (Behance, LinkedIn, Instagram) and legal notice.

5. **Smooth Scrolling**:
   - Integrated Lenis Smooth Scroll across the application with custom deceleration curve.
