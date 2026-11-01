# NORQUE STUDIOS™ — Version Log

## Version 0.3.0 (Day 4 Complete)
**Date:** October 22, 2026 (End of Day 4 Sprint)  
**Status:** Home & About Pages 100% Finalized, Sequential Line-by-Line Stagger, Scroll Motion Blur Isolated

### Overview
Version `0.3.0` concludes Day 4 with Home and About pages 100% completed, verified, and locked in. It transitions typography stagger from word-level to dynamic sequential line-by-line masked reveals, synchronizes global stagger timing (`delay = 0.2s`, `stagger = 0.05s`), updates all navbar action links and timezone labels to uppercase, and introduces velocity-responsive vertical scroll motion blur with explicit exclusion of the pinned GIF.

### Key Deliverables in 0.3.0
- **Line-by-Line Typography Stagger (`MaskedWordStagger.jsx`)**:
  - Transformed reveal from word-split to visual line-by-line grouping based on client reference clip `References/Stragger in pages.mp4`.
  - Automatic line detection with offscreen measurement DOM responding to container resize and font loading (`document.fonts.ready`).
  - Unified multi-paragraph blocks in `Showcase.jsx` and `Philosophy.jsx` so lines reveal in continuous order across paragraphs rather than triggering concurrently.
  - Preserved multi-paragraph vertical spacing (`space-y-[1.5278vw]`).
- **Global Stagger Timing Synchronization**:
  - Global stagger configuration updated to `delay = 0.2s` and `stagger = 0.05s`.
- **Navbar Uppercase Polish**:
  - All navigation links updated to uppercase (`ABOUT`, `WORKS`, `SERVICES`).
  - Cairo GMT clock country label updated to uppercase (`EGYPT, HH:MM:SS AM/PM GMT`).
- **Velocity-Driven Scroll Motion Blur Engine**:
  - Integrated SVG `<feGaussianBlur>` tied to Lenis scroll velocity with organic RAF lerp decay (`0.28`).
  - Decoupled filter from `<main>` and scoped strictly via `.motion-blur-target`.
  - Pinned GIF in `Showcase.jsx`, pinned Navbar, and floating Mute Button remain 100% sharp with zero motion blur.
- **Sprint Milestone**:
  - Home and About pages 100% completed and ready for remaining page designs.

---

## Version 0.2.2 (Day 3 Complete)
**Date:** October 21, 2026 (End of Day 3 Sprint)  
**Status:** Design Aligned, Universal Typography Stagger, Production Verified

### Overview
Version `0.2.2` finalizes Day 3 with complete design alignment against Figma and reference clips, universal 12px margins across all pages, word-level nav hover stagger, in-place opacity crossfade page transitions with synchronous navbar fading, and universal masked word stagger reveals across all manifesto and philosophy statements.

### Key Deliverables in 0.2.2
- **Universal Horizontal Margins**:
  - Enforced strict `12px` = `0.8333vw` (`px-[0.8333vw]`) margin across all views and sections.
  - Eliminated `max-w-[1416px] mx-auto` restrictions on About page sub-sections so layouts sit edge-to-edge flush with universal margins.
- **Word-Level Staggered Nav Buttons**:
  - Re-engineered nav link hover animation to roll by word with masked duplicate replacement from below matching `references/Hover Stagger reference.mp4` (`0.38s` duration, `[0, 0.8, 0.2, 1]` ease).
  - Nav links remain permanently in default state with no sticky active selection.
- **Scale-Free Opacity Page Transitions**:
  - Transition operates purely via opacity (`1 -> 0` exit, `0 -> 1` enter, `0.35s` duration).
  - Removed pre-emptive scroll jump from `handleNavigate`; page fades out in place wherever scrolled.
  - Synchronized navbar opacity: fades out during transition, and fades in when the destination page mounts.
  - Scroll reset to top is deferred to `onExitComplete`, ensuring destination pages always start cleanly from the hero section.
- **Universal Masked Word Stagger (`MaskedWordStagger.jsx`)**:
  - Deployed universal component across 5 statements:
    1. Showcase Brand Statement / Manifesto (`Showcase.jsx`).
    2. Philosophy Section (`Philosophy.jsx`).
    3. Footer Project Inquiry Callout (`Footer.jsx`).
    4. About Hero Manifesto (`AboutHero.jsx`).
    5. Multidisciplinary Network Statement (`AboutTeam.jsx`).
  - Standardized universal values: `0.65s` duration, `[0, 0.8, 0.2, 1]` ease, `0.018s` stagger, `overflow-hidden` mask with descender padding.
- **Documentation Suite Updated**:
  - `docs/HANDOVER.md`, `docs/DAY_3_LOG.md`, `docs/ARCHITECTURE.md`, `VERSION.md`.

---

## Version 0.2.1 (Day 3 Milestone)
**Date:** October 21, 2026 (Day 3 Optimization Sprint)  
**Status:** Lean, Developer-Friendly, Handover-Ready

### Overview
Version `0.2.1` optimized the workspace size, removed over 200 MB of redundant files, structured the code with developer-friendly section landmarks, and introduced the dedicated documentation suite in `docs/` for seamless AI and human developer handovers.

---

## Version 0.2.0 (Day 2 Milestone)
**Date:** October 21, 2026 (End of Day 2)  
**Status:** Stable, Production Build Verified

### Overview
Version `0.2.0` marked the completion of the multi-page architecture, the full About Page implementation based on Figma designs, unified interactive carousels, and perfected audio interaction physics.
