# Day 6 Development Log — Norque Studios Website

**Date:** November 9, 2026  
**Objective:** 1:1 Implementation and complete fidelity alignment of the **Services Page** (`/services`) based on the Figma specification (`Services.fig.zip`) and visual reference assets (`SERVICES.png`, `exp section.png`, `coloumn system.png`, and `Contact.png`).

---

## 🎯 Objectives Completed

### 1. Universal 12-Column Grid Alignment (`coloumn system.png`)
- **System Specifications (1440px Canvas):**
  - Left/Right Margins: `0.8333vw` (`12px`)
  - Gutters (11 gutters): `0.8333vw` (`12px`)
  - Column Width (12 columns): `7.4305vw` (`107px`)
  - Pitch (1 Column + 1 Gutter): `8.2638vw` (`119px`)
- **Universal Navbar (`Navbar.jsx`):**
  - Converted the header grid to `grid-cols-12 gap-[0.8333vw]`:
    - Columns 1–3: NRQ STDS Logo.
    - Columns 4–6: Navigation links (ABOUT, WORKS, SERVICES).
    - Columns 7–11: Live Egypt Time GMT+2 (starting flush at Column 7).
    - Column 12: Contact Us CTA.

### 2. Services Hero & OptionWheel Section (`ServicesHeroSection.jsx`)
- **12-Column Alignment:**
  - Left Side (OptionWheel): Spans Columns 1–6 (`col-span-6`).
  - Right Side (Description): Starts flush on **Column 7** (`col-start-7 col-span-6`), directly aligned under the Navbar live clock.
- **Animation & Variable Fidelity:**
  - Strictly preserved user-customized animation parameters (`duration: 1.5`, `ease: [0.315, -0.011, 0, 0.986]`, exit `0.8`, `y: 105%` $\to$ `0%` $\to$ `-105%`).
  - Fixed top-side anchoring ensuring description height expands downwards without shifting layout.

### 3. NORQUE’s Workflow Section (`ServicesWorkflowSection.jsx`)
- **Seamless Cross-Dissolve Transitions:**
  - Added `absolute inset-0` to the background image `<motion.img>` wrapper with `initial={{ opacity: 0 }}` and `exit={{ opacity: 0 }}`.
  - Added preloading on mount for all workflow background imagery.
  - Eliminated vertical jumps and content dipping during step changes.
- **Continuous Bidirectional Parallax Effect:**
  - Controlled by `WORKFLOW_PARALLAX_SPEED = 0.16`.
  - When scrolling down, the background smoothly drifts upwards across the full section lifecycle; scrolling up moves it downwards.
- **12-Column Alignment:**
  - Section Title `"NORQUE's WORKFLOW"` on Column 1 (`col-span-2`).
  - Interactive Workflow Steps on Columns 3–6 (`col-start-3 col-span-4`).
  - Scale-up Media Preview on Columns 7–12 (`col-start-7 col-span-6`).

### 4. Experience Cards Section (`ServicesCardsSection.jsx`)
- **Visual Design Matching `exp section.png`:**
  - Resized cards to compact dimensions (`w-[32.8vw] h-[22.2vw]`).
  - Background image dimming configured via `CARD_BG_OPACITY = 0.5` over `bg-[#141414]`, removing bottom gradient overlays.
  - Initial card positioning configured to the far right (`TRACK_START_VW = 75`), sliding continuously across the screen without scroll lock.
  - Centered unchanging title `"FEEL THE EXPERIENCE"` behind the sliding cards with solid, un-dimmed white typography.
  - Centered changing paragraph text (`max-w-[40.64vw] text-center`) with morphing lines removed for clean presentation.
  - Removed all scale and card opacity transitions on scroll so cards slide at constant 100% scale and opacity.

### 5. Contact Section (`ServicesContactSection.jsx`)
- **1:1 Recreation of `Contact.png` and Figma `Section 4`:**
  - **Grid Alignment:** Padded to the universal margin `px-[0.8333vw]` with `grid grid-cols-12 gap-[0.8333vw]`.
  - **Full `vw` Unit Conversion:** Every dimension (margins, paddings, gaps, font sizes, border radii) converted strictly to `vw` units on the 1440px base.
  - **Left Side (`col-span-12 lg:col-span-6`):**
    - Bold statement copy set in `1.5278vw` (`22px`) Beausite Classic Bold, tracking `-0.03em`, line-height `1.14`.
    - 1:1 Pitch Deck Download Card (`Frame 51: w-[15.4861vw] h-[6.7361vw]`):
      - Top Badge: `3.75vw x 1.3194vw`, `text-[0.6944vw]`, `bg-black/55 backdrop-blur-[0.1389vw]`.
      - Bottom Bar: Chain link SVG icon + underlined `Download` + `Norque’s Pitch Deck [PDF]` in `text-[0.6944vw]`.
      - Bottom-aligned to match the baseline of the Submit button on the right.
  - **Right Side Form (`col-span-12 lg:col-span-6`):**
    - Sized to `max-w-[46.0417vw]` (`663px`) with `1.25vw` (`18px`) vertical field spacing.
    - Input text boxes: `h-[1.6667vw]` (`24px`), `bg-[#171717]`, `rounded-[0.1389vw]`, `text-[0.6944vw]`, placeholder in `#666666`.
    - Project Type & Expected Budget pills: `h-[1.5972vw]`, `rounded-full`, `px-[0.8333vw]`, `gap-[0.6944vw]`, active white capsule with black text.
    - Dropdown: `h-[1.6667vw]`, right chevron `w-[0.4861vw] h-[0.2778vw]`, `#171717` popdown menu.
    - Textarea: `h-[4.9306vw]` (`71px`) with Figma diagonal resize gripper lines in bottom right.
    - Submit Button: `w-[7.5694vw]` (`109px`), `h-[1.6667vw]` (`24px`), `rounded-full bg-white text-black text-[0.6944vw]`.

### 6. System & Infrastructure Fixes
- **Lenis Smooth Scroll Reference Fix:**
  - Resolved `window.lenis.scrollTo is not a function` by globally exposing `window.lenis = lenis` on mount in `App.jsx` and cleaning up on unmount.
- **Vite Build Verification:**
  - Verified 100% clean production builds via `npm run build` (0 warnings, 0 errors).
