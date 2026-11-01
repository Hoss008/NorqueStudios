# Day 3 Development Log — Norque Studios Website

**Date:** October 21, 2026  
**Objective:** Project optimization, repository decluttering, code readability pass, documentation suite, GitHub repository preparation, design alignment, and universal typography/motion polish.

---

## 🎯 Objectives Completed

1. **Size Optimization & Asset Audit**:
   - Conducted an audit of the entire `D:\Norque website` directory tree.
   - Identified and safely staged **over 200 MB** of unneeded files, old test screenshots, loose extraction scripts, duplicate videos, raw Figma blobs, and unused high-resolution originals into `_cleanup_staging/`.
   - Key decluttering highlights:
     - Root test screenshots removed (~10.6 MB).
     - Figma extraction temporary dumps and scripts staged (~54.8 MB).
     - Old openfig extraction hash directories (`images/`, `page2_figma/`) staged (~34.4 MB).
     - Duplicate 13.5MB background video and 2.39MB gif in `public/assets/` eliminated (Vite directly bundles from `src/assets/`).
     - Unreferenced `-orig` photo files in `public/images/about/` staged (~14.8 MB).
     - Old `.playwright-mcp/` test cache staged (~10.9 MB).
     - Build artifacts (`dist/`) cleaned and freshly rebuilt.
   - Reduced production build time from **22.0 seconds** down to **3.9 seconds** (a 5.6x speedup).
   - Reduced production bundle size in `dist/` from **62 MB** to **31 MB**.

2. **Clean & Developer-Friendly Directory Layout**:
   - Arranged all project files into clean standard directories (`src/`, `public/`, `docs/`).
   - Root directory now only contains core configuration files (`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `.gitignore`, `README.md`, `VERSION.md`).

3. **Code Quality & Section Landmarks**:
   - Cleaned all core React components (`App.jsx`, `HomePage.jsx`, `AboutPage.jsx`, `Navbar.jsx`, `Hero.jsx`, `Showcase.jsx`, `SelectedWorks.jsx`, `Philosophy.jsx`, `NewsSection.jsx`, `Footer.jsx`, `InteractiveInfiniteCarousel.jsx`, `MuteButton.jsx`, `SplashScreen.jsx`, `AboutHero.jsx`, `AboutTeam.jsx`, `AboutNews.jsx`).
   - Replaced noisy per-line comments with clear, structured section banners and component headers so any incoming developer or AI can immediately identify layout sections and logic blocks.

4. **Handover Documentation & UI Refinements**:
   - Reverted original 3-paragraph studio manifesto and caption row under the pinned Showcase reveal.
   - Refined Showcase uncropped reveal geometry to align pixel-perfect with universal margins upon 100% expansion.
   - Enhanced Mute Button with a darker satin frosted glass optical shader while preserving real-time liquid glass refraction and rim specular reflections.
   - Maintained full suite in `docs/` (`HANDOVER.md`, `ARCHITECTURE.md`, `DAY_1_LOG.md`, `DAY_2_LOG.md`, `DAY_3_LOG.md`).

5. **Design Alignment & Reference Adjustments (Phase 2)**:
   - **Showcase Manifesto**: Updated contact link to `"or say hello at hello@norquestudios.com"` (`text-[#747474]`, hover white, no underline, no trailing period), matching `references/Design.png`.
   - **Selected Works Counter**: Updated `(04)` counter beside `SELECTED WORKS` to a superscript alignment (`align-top`, `text-[1.3889vw]`), matching `references/Design 2.png`.
   - **News Section to Footer Spacing**: Added generous bottom spacing (`pb-[8.3333vw]`) below the news section before the footer's top border line, matching `references/Design 3.png`.
   - **News Header Uppercase**: Formatted heading to uppercase `"WHAT’S HAPPENING NOW"`, matching `references/Design 4.png`.
   - **Project Card Typography Spacing**: Increased spacing between the project title (white) and category (grey) from `pt-[0.2083vw]` to `pt-[0.5556vw]` across all project cards (Axis, Fusion Form, MMS, Studio Juzėnas), matching `references/Design 5.png`.
   - **Homepage News Grid**: Replaced rotary infinite carousel with a static 4-column responsive grid and disabled hover image scale zoom, matching `references/Design 3.png`.
   - **Global Pinned Navigation Bar & Scroll Transition (Phase 3)**:
     - Standardized navbar height to exactly `36px` proportionally converted to `2.5vw` (`36 / 1440 * 100vw = 2.5vw`).
     - Restored in-flow header inside `Hero.jsx` (`h-[2.5vw]`) and added a `2.5vw` top spacer in `AboutPage.jsx`, fully compensating for the space eaten out when the navbar became pinned and preventing any layout shifting.
     - Implemented dynamic reveal-driven pinning: on the Home page, the navbar remains at the top of the page in `Hero`, naturally scrolls off during the initial scroll down through the 200vh Showcase GIF reveal, and only reappears and pins (`fixed top-0`, `y: 0`, `bg-black/60 backdrop-blur-md`) once the GIF box reveal is 100% complete (`p >= 0.99`).
     - On secondary pages (`AboutPage`), the navbar remains pinned at all times.

6. **GitHub Repository & GitHub Pages Deployment**:
   - Configured Vite `base: './'` and dynamic asset interpolation (`import.meta.env.BASE_URL`) so assets load without 404s on subpaths (`username.github.io/repo/`) or custom domains.
   - Created official automated deployment workflow `.github/workflows/deploy.yml` using GitHub Actions.
   - Identified and documented the custom domain formatting fix (`norque` is not a valid FQDN; clear the custom domain field in GitHub Pages settings unless using a verified top-level domain).
   - Repository successfully linked to `https://github.com/Anashossam64/Norque-website.git`.

7. **Universal Margins, Word Stagger Hover, Opacity Transitions & Typographic Reveal (Phase 4)**:
   - **Universal 12px (0.8333vw) Margin Enforcement**:
     - Standardized universal left/right margins to strictly `12px` proportionally converted to `0.8333vw` (`px-[0.8333vw]`).
     - Removed restrictive `max-w-[1416px] mx-auto` containers from `AboutHero.jsx`, `AboutTeam.jsx`, and `AboutNews.jsx`, guaranteeing that both Home and About pages maintain edge-to-edge alignment with zero margin deviation.
   - **Word-Level Staggered Nav Button Hover**:
     - Updated `StaggeredNavButton` in `Navbar.jsx` to split and roll text **by word** (not letter-by-letter), exactly matching `references/Hover Stagger reference.mp4` (`0.38s` duration, cubic-bezier `[0, 0.8, 0.2, 1]`).
     - Nav buttons remain permanently in their clean default state, changing only into hover state upon cursor entry.
   - **Opacity-Only Page Crossfade (Scale = 1.0)**:
     - Eliminated zoom/scale animations across page transitions. Pages crossfade purely via opacity (`opacity: 1 -> 0` on exit, `opacity: 0 -> 1` on enter, duration `0.35s`, ease `[0.4, 0, 0.2, 1]`).
     - Navbar opacity is synchronized: it smoothly fades out during page exit and fades back in when the navigated page mounts.
   - **In-Place Exit & Hero Arrival**:
     - Removed immediate scroll snapping from `handleNavigate` in `App.jsx`, ensuring that when navigating while scrolled down, the current page fades out **in-place** without jumping back to the top before fading.
     - Deferred instant scroll resets (`window.scrollTo(0, 0)` and `lenis.scrollTo(0, { immediate: true })`) to Framer Motion's `onExitComplete` hook, ensuring that incoming pages always render cleanly from their hero section.
   - **Universal Masked Word Stagger Component (`MaskedWordStagger.jsx`)**:
     - Created a reusable typography component that splits text into overflow-masked word tokens with descender preservation (`pb-[0.06em]`) and compound child support (embedded links and line breaks).
     - Applied universally across 5 key studio statements:
       1. Brand Statement / Manifesto in `Showcase.jsx` (including interactive links).
       2. Philosophy Section in `Philosophy.jsx`.
       3. Top inquiry callout in `Footer.jsx`.
       4. Manifesto statement in `AboutHero.jsx`.
       5. Multidisciplinary Network Statement in `AboutTeam.jsx`.
     - Standardized universal motion parameters: `duration: 0.65s`, `ease: [0, 0.8, 0.2, 1]`, `staggerChildren: 0.018s`, triggered automatically on viewport entrance (`whileInView` with `amount: 0.15`).
