# Day 4 Development Log — Norque Studios Website

**Date:** October 22, 2026  
**Objective:** Finalize Home and About pages to 100% completion, implement sequential line-by-line typography reveals, refine global stagger parameters, update navbar typography to uppercase, and introduce velocity-driven vertical scroll motion blur with GIF exclusion.

---

## 🎯 Objectives Completed

1. **Global Stagger Timing Synchronization**:
   - Re-calibrated global stagger timing per design specification to `delay = 0.2s` and `stagger = 0.05s`.
   - Synchronized across the navigation bar hover transitions and typographic reveal controllers globally.

2. **Sequential Line-by-Line Typography Reveal (`MaskedWordStagger.jsx`)**:
   - Transformed typographic stagger reveal from word-level split to visual **line-by-line** reveal matching `References/Stragger in pages.mp4`.
   - Built automatic visual line detection:
     - Measures word token offsets (`getBoundingClientRect().top`) against an offscreen, permanently mounted measurement DOM replica.
     - Dynamically regroups words into visual lines based on current viewport dimensions.
     - Listens to container resizing via `ResizeObserver` and font initialization via `document.fonts.ready`.
   - **Continuous Cross-Paragraph Stagger Order**:
     - Resolved concurrent paragraph trigger issue where multi-paragraph sections (Showcase manifesto and Philosophy) triggered paragraphs simultaneously.
     - Unified multi-paragraph blocks under single sequential controllers with continuous global line indices (`delay = 0.2 + globalLineIndex * 0.05`).
   - **Inter-Paragraph Spacing Restoration**:
     - Preserved full typographic rhythm and vertical inter-paragraph spacing (`space-y-[1.5278vw]` / `22px`) across multi-paragraph sections while maintaining individual line overflow masking.

3. **Navbar Typography Uppercase Polish**:
   - Updated navigation link labels to all uppercase: `ABOUT`, `WORKS`, `SERVICES`.
   - Updated Cairo live GMT clock country tag to all uppercase: `EGYPT, HH:MM:SS AM/PM GMT`.

4. **Velocity-Driven Scroll Motion Blur Engine**:
   - Integrated a directional vertical SVG filter `<feGaussianBlur id="scroll-motion-blur-fe" stdDeviation="0 Y">` driven by Lenis smooth scroll velocity.
   - Smooth lerp decay factor (`0.28`) creates an organic, filmic camera shutter blur effect that dynamically scales with scroll speed and settles cleanly to `none` at rest.
   - **Pinned GIF Exclusion**:
     - Decoupled filter styling from the ancestor `<main>` element to avoid mandatory child rasterization.
     - Scoped filter strictly to `.motion-blur-target` via `body.is-scrolling .motion-blur-target`.
     - Pinned 200vh GIF container in `Showcase.jsx`, pinned Navbar, and floating Mute Button remain sharp and untouched by motion blur.
     - Section landmarks across Home and About pages receive crisp vertical motion blur during scroll.

5. **Home & About Pages 100% Completion**:
   - Verified pixel-perfect fidelity, responsiveness, and zero console/build warnings across both Home and About views.
   - Ready for subsequent sprint once UI designs for remaining pages are finalized.

---

## 📦 Deliverables & Files Modified
- [`src/components/MaskedWordStagger.jsx`](file:///D:/Norque%20website/src/components/MaskedWordStagger.jsx) — Line-by-line visual grouping and sequential reveal engine.
- [`src/components/Navbar.jsx`](file:///D:/Norque%20website/src/components/Navbar.jsx) — Uppercase navigation buttons and GMT clock label.
- [`src/components/Showcase.jsx`](file:///D:/Norque%20website/src/components/Showcase.jsx) — Unified multi-paragraph line reveal, inter-paragraph spacing, and GIF motion blur isolation.
- [`src/components/Philosophy.jsx`](file:///D:/Norque%20website/src/components/Philosophy.jsx) — Unified sequential line reveal with preserved spacing and motion blur tag.
- [`src/components/Hero.jsx`](file:///D:/Norque%20website/src/components/Hero.jsx), [`SelectedWorks.jsx`](file:///D:/Norque%20website/src/components/SelectedWorks.jsx), [`NewsSection.jsx`](file:///D:/Norque%20website/src/components/NewsSection.jsx), [`Footer.jsx`](file:///D:/Norque%20website/src/components/Footer.jsx) — Motion blur target tagging.
- [`src/components/about/AboutHero.jsx`](file:///D:/Norque%20website/src/components/about/AboutHero.jsx), [`AboutTeam.jsx`](file:///D:/Norque%20website/src/components/about/AboutTeam.jsx), [`AboutNews.jsx`](file:///D:/Norque%20website/src/components/about/AboutNews.jsx) — Motion blur target tagging for About page.
- [`src/App.jsx`](file:///D:/Norque%20website/src/App.jsx) — SVG filter definition, Lenis velocity listener, and class toggling.
- [`src/index.css`](file:///D:/Norque%20website/src/index.css) — Scoped `body.is-scrolling .motion-blur-target` filter rule.
- [`docs/HANDOVER.md`](file:///D:/Norque%20website/docs/HANDOVER.md), [`VERSION.md`](file:///D:/Norque%20website/VERSION.md), [`package.json`](file:///D:/Norque%20website/package.json) — Version and documentation bump.
