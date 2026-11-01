# Day 2 Development Log — Norque Studios Website

**Date:** October 20 - 21, 2026  
**Milestone:** Version 0.2v  
**Objective:** Multi-page routing, complete About Page from `Norque Studios Page 2.fig`, interactive carousels, and dual-layer audio physics.

---

## 🎯 Objectives Completed

1. **Multi-Page Architecture & Cinematic Transitions (`App.jsx`)**:
   - Implemented state-based page routing between `home` and `about`.
   - Built a 1-second cinematic page transition:
     - Page exit: Deceleration zoom-out to black (`scale: 0.94`, `opacity: 0`, `duration: 0.45s`).
     - Content swap: Instant scroll reset to top (`window.scrollTo(0,0)` and `lenis.scrollTo(0, { immediate: true })`).
     - Page entry: Deceleration zoom-in from black (`scale: 1.0`, `opacity: 1`, `duration: 0.5s`).
   - Deep section routing: Navigating to "Works" from the About page automatically switches to the Homepage and smooth-scrolls to the `#works` anchor.

2. **Full About Page Implementation (`AboutPage.jsx` & `src/components/about/`)**:
   - Extracted and converted all components from `Norque Studios Page 2.fig`:
     - **`AboutHero.jsx`**: Studio manifesto statement, aesthetics photo, and 6 working countries list (Egypt, United States, Lithuania, United Arab Emirates, Saudi Arabia, Jordan).
     - **`AboutTeam.jsx`**: Founders cards (Mostafa Yasser & Hossam Hassan) with dark gradient overlays, studio network manifesto, and 4-column multidisciplinary team grid ("PPL BEHIND NRQ™").
     - **`AboutNews.jsx`**: "What happened lately" news carousel featuring editorial photography with exact aspect ratios.

3. **Interactive Infinite Carousel (`InteractiveInfiniteCarousel.jsx`)**:
   - Built a custom physics-driven continuous carousel used across both Homepage and About Page.
   - **Multi-Track Buffer Geometry**:
     - 5 total tracks rendered simultaneously (Left Buffer, Center Measurement Track, and 3 Right Buffers).
     - Eliminates all flickering, blank spots, or visual snapping on any viewport width.
   - **Full Gesture Support**:
     - Mouse drag and touch swipe.
     - Velocity calculation with friction inertia glide on release.
     - Trackpad horizontal swipe and mouse wheel horizontal tilt.
     - Auto-scroll pause on hover.
   - **Click vs. Drag Separation**:
     - Movement threshold of 4px triggers drag mode.
     - Trailing click events upon drag release are immediately swallowed in the window capture phase (`stopImmediatePropagation`).
     - Carousel items do not trigger false clicks or page navigations while dragging.

4. **Dual-Layer Sound System & Optical Liquid Glass Mute Button**:
   - **Layer 1 (Atmospheric Ambience)**:
     - Plays `SFX Norque.mp3` continuously upon initial user unlock.
     - Persists seamlessly across page transitions without restarting.
   - **Layer 2 (Interactive Click SFX)**:
     - Plays `SFX Norque_2.mp3` on deliberate clicks of buttons, links, or interactive elements.
     - Completely suppressed during carousel drag or scroll gestures.
   - **Optical Liquid Glass Refraction (`MuteButton.jsx`)**:
     - Procedurally generates a spherical barrel normal map on an offscreen HTML5 canvas.
     - Injects normal map into an SVG `<feDisplacementMap>` filter (`#norque-liquid-lens-circle`).
     - Delivers realistic curved lens distortion over background elements when scrolling or hovering.

5. **Milestone Verification**:
   - Successfully tagged and documented Version `0.2v` in `VERSION.md`.
   - Verified clean production build with Vite.
