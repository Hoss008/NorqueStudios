# NORQUE STUDIOS™ — Version Log

## Version 0.6.0 (Dedicated Project Showcase Pages: MMS Architects & AXIS RE)
**Date:** November 5, 2026  
**Status:** 1:1 Implementation of 'MMS Page.fig' and 'Axis Page.fig', Full Cross-Linking between Homepage, Works Page, and Project Showcase Pages, Smooth Navigation and Next Project Routing

### Key Deliverables in 0.6.0
- **MMS Architects™ Case Study Showcase (`MmsProjectPage.jsx`)**:
  - 1:1 faithful implementation matching `References/MMS Page.fig` (1440x6282).
  - **Hero Media**: Full-width architectural hero header (`1440x473`).
  - **4-Column Metadata Table & Studio Overview Manifesto**:
    - Project Title: `MMS ARCHITECTS™ / Architecture Studio`.
    - Metadata: Year `2025`, Location `Italy`, Tags `Brand Development, Content Direction`, Purpose `Architecture Studio`.
    - Detailed studio philosophy manifesto set in Beausite Classic regular.
  - **Showcase Gallery Rows**:
    - Row 1: Brand Stationery & Business Cards composition (`1416x709`).
    - Row 2: Ribbon Structure graphic lockup (`1416x1100`).
    - Row 3: Centered editorial quote callout.
    - Row 4: Printed portfolio booklet and catalog mockup (`1416x944`).
    - Row 5: MMS giant typographic identity structure (`1416x796`).
    - Row 6: Brand mark variants and color systems (`1416x682`).
    - Row 7: Brand standards composition & water crystal visual identity (`1416x709`).
  - **Next Project & Return Navigation**:
    - `← Back to Works`: Returns directly to the Works page.
    - `Next Project: AXIS® RE →`: Instantly opens the AXIS project showcase.
  - **Integrated Universal Footer**: Contact callout, brand mark, directory navigation, and CMS access.

- **AXIS® RE Case Study Showcase (`AxisProjectPage.jsx`)**:
  - 1:1 faithful implementation matching `References/Axis Page.fig` (1440x5810).
  - **Hero Media**: Full-bleed gold star emblem hero header (`1440x473`).
  - **4-Column Metadata Table & Studio Overview Manifesto**:
    - Project Title: `AXIS® — RE / Real Estate Company`.
    - Metadata: Year `2026`, Location `Egypt`, Tags `Brand Development, Content Direction`, Purpose `Real Estate Company`.
    - High-level commercial destination manifesto set in Beausite Classic regular.
  - **Showcase Gallery Rows**:
    - Row 1: Brand Identity & stationery envelope mockup (`1416x709`).
    - Row 2: Split 2-column grid (`703x546` each) featuring crimson emblem lockup & clean white emblem lockup.
    - Row 3: Centered editorial quote callout.
    - Row 4: Graphic emblem on white background (`1416x648`).
    - Row 5: Giant cropped AXIS typographic branding structure (`1416x796`).
    - Row 6: Split 2-column grid (`703x339` each) displaying black luxury business card & stationery detail.
    - Row 7: Monochrome light & shadow architectural texture (`1416x709`).
    - Row 8: Outdoor architectural billboard banners (`1416x709`).
  - **Next Project & Return Navigation**:
    - `← Back to Works`: Returns directly to the Works page.
    - `Next Project: MMS ARCHITECTS™ →`: Instantly opens the MMS project showcase.
  - **Integrated Universal Footer**: Contact callout, brand mark, directory navigation, and CMS access.

- **Universal Project Linking**:
  - **Homepage**: Clicking the MMS or Axis cards in the Selected Works section (`SelectedWorks.jsx`) immediately opens their respective project showcase pages with a smooth 0.65s atmospheric crossfade.
  - **Works Page**: Clicking MMS or Axis cards in the horizontal slider (`SLIDER` mode) or in the table rows (`LIST` mode) immediately navigates to their respective showcase pages.
  - **Back Navigation**: Returning to Works from any project automatically restores the fixed zero-scroll dashboard state and preserves user preferences.
  - **Lenis Smooth Scroll Sync**: Automatically unlocks vertical scrolling when viewing project showcase pages, and locks overflow when returning to the Works page.

---

## Version 0.5.1 (Works CMS Management UI)
**Date:** November 5, 2026  
**Status:** Interactive Works CMS Modal Added, Direct UI Project Management (Add, Drop, Edit, Reorder), Footer Access Button, Real-Time Synchronized State

### Key Deliverables in 0.5.1
- **Universal Footer CMS Access**:
  - Added `"• CMS"` action button immediately after `"• privacy & policy"` in [`Footer.jsx`](./src/components/Footer.jsx).
  - Also added quick-access `CMS` trigger on the Works Page navigation header for convenience.
- **Interactive Studio CMS UI (`WorksCMSModal.jsx`)**:
  - Full-featured studio portfolio manager matching Norque Studios dark design language.
  - **Add New Project**: Interactive form with Title, Location, Category dropdown & custom input, Year, Subtitle, Drag & Drop image file upload with immediate preview, and custom Tag/Badge with color presets (`#171717`, `#a87f2f`, `#ffffff`, etc.).
  - **Drop / Delete Project**: Instant project removal with confirmation.
  - **Edit Project**: Update any existing project fields in place.
  - **Reorder Projects**: `▲` and `▼` controls to reorder projects on the slider and list view.
  - **Export JSON**: Download updated `works.json` file with 1 click.
  - **Reset Defaults**: Option to restore initial 5 Figma projects anytime.
- **Persistent State Store (`worksStore.js`)**:
  - Automatically persists changes in `localStorage` and triggers synchronized updates across components without requiring a page refresh.
  - Leaves the Homepage *Selected Works* completely unaffected.

---

## Version 0.5.0 (Works Page Implementation)
**Date:** November 5, 2026  
**Status:** Standalone Works Page 1:1 Implementation from 'Works Page.fig', Fixed Viewport Zero-Scroll Dashboard, Interactive Horizontal Slider & Full-Width List View Toggle

### Key Deliverables in 0.5.0
- **Standalone Works Page Component (`WorksPage.jsx`)**:
  - Converted `References/Works Page.fig` 1:1 into a dedicated full-bleed viewport dashboard.
  - **Zero Vertical Page Overflow**: Strictly locked to 100% viewport height (`h-screen overflow-hidden`) with zero vertical scrolling permitted. Lenis smooth scroll and document overflow automatically paused/disabled when entering Works page.
- **Header & Category Controls Bar**:
  - `WORKS` title in Beausite Classic Semibold (`46px` / `3.1944vw`, `tracking-[-0.03em]`, uppercase white).
  - Category Filter Tabs (`All`, `Websites`, `Branding`) in Beausite Classic Semibold (`22px` / `1.5278vw`) with active underline animation and muted inactive state (`#6f6f6f`).
  - View Toggle Pill Buttons (`LIST` / `SLIDER`) with active/inactive pill styling.
  - Column 4 Right-aligned indicator: `"SCROLL TO SEE MORE"` / project count.
- **Projects Horizontal Slider (`SLIDER` Mode)**:
  - 5 project cards extracted directly from Figma assets:
    1. `STUDIO JUZENAS®` (Lithuania, Websites)
    2. `AXIS® RE` (Egypt, Branding, with `IN THE WORKS` badge)
    3. `MMS ARCHITECTS™` (Italy, Websites, with `AWARDED` amber badge)
    4. `FUSION FORM®` (Egypt, Branding)
    5. `AXIS® - Real Estate Consultancy` (Egypt, Branding, with `Brand Development` subtitle)
  - Card aspect ratio `345/230` (`1.5`), `rounded-[2px]`, subtle border, image hover zoom (`scale-[1.03]`).
  - Smooth horizontal navigation: supports Framer Motion horizontal drag constraints (`drag="x"`), elastic bounce, and native mouse wheel / trackpad horizontal gliding.
- **Clean Table List View (`LIST` Mode)**:
  - Toggle to an elegant full-width table view with columns `#`, `PROJECT`, `CATEGORY`, `LOCATION`, and `YEAR`.
  - Micro-interactions: row hover highlights and floating thumbnail preview capsule.
- **Global Navigation & Routing Integration**:
  - Updated `Navbar.jsx` so `"WORKS"` routes directly to `WorksPage` (`currentPage === 'works'`).
  - Pinned navbar visible with seamless in-place opacity crossfade transitions.

---

## Version 0.4.1 (Day 6 Sprint: Hero & Navigation Polish)
**Date:** November 5, 2026  
**Status:** Hero Repositioning & Sequenced Stagger, Scroll-Direction Responsive Navbar, Extended Cinematic Page Transitions, 100vh Full Viewport Footer

### Key Deliverables in 0.4.1
- **Hero Middle Statement Sequenced Stagger**:
  - Repositioned `"BUILT FOR BRANDS THAT WANT / SOMETHING REAL"` and `"CREATING WORLDWIDE ©"` to `top-[44.53%]` matching `Home Page Hero.png` 1:1.
  - Stagger animation chained to reveal exactly `0.5s` after `"NORQUE STUDIOS™"` begins rising, masked below `{ y: "105%", opacity: 0 }` so it remains completely hidden until triggered.
- **Scroll-Direction Responsive Navbar**:
  - Pinned navbar automatically hides on scroll down (`y: -100%`, `opacity: 0`) and slides into view upon scrolling up a tiny bit (`y: 0`, `opacity: 1`) using the signature `[0, 0.8, 0.2, 1]` curve.
  - Cairo GMT clock relocated to Column 3 (50.8% width) and added `"CONTACT US"` CTA with clean underline in Column 4 matching reference 1:1.
- **Cinematic Page Transitions**:
  - Extended in-place opacity crossfade from `0.35s` to `0.65s` (`ease: [0.4, 0, 0.2, 1]`) with synchronized navbar fading for a more atmospheric, luxury feel.
- **100vh Viewport-Filling Footer**:
  - Configured footer with `min-h-screen flex flex-col justify-between`, expanding the interactive MagnetLines canvas (`flex-1`) to fill the entire screen height when scrolled all the way to the bottom.

---

## Version 0.4.0 (Day 5 Complete)
**Date:** November 2, 2026 (End of Day 5 Sprint)  
**Status:** Design Revisions Complete, Selected Works CTA, Philosophy Repositioning & Circular Seal, "Done by Humans" with Parallax, Zero-Opacity Stagger, Splash Scroll Guard, MagnetLines Resolution Consistency

### Overview
Version `0.4.0` concludes Day 5 with complete implementation of client design revisions and new UI elements from `Homepage.fig`. It enforces resolution consistency for the footer magnet lines using pure `vw` units, locks typography stagger opacity to `1` across all animation states, prevents scrolling during the splash screen, isolates motion blur from case study images, adds the Selected Works CTA button with vector arrow, repositioned the Philosophy section with the circular seal brand mark, and integrates the cinematic "Done by humans" section with smooth background parallax.

### Key Deliverables in 0.4.0
- **Footer MagnetLines Resolution Consistency**:
  - Replaced fixed pixel dimensions and gaps with proportional `vw` units (`lineWidth: '0.1389vw'`, `lineHeight: '1.25vw'`, `spacing: '2.0833vw'`, `radius: '13.8889vw'`).
  - Standardized the magnet line count across all screen resolutions and densities.
- **Typography Stagger Opacity Locking (`MaskedWordStagger.jsx`)**:
  - Locked opacity to `1` across all stagger animation states (`hidden: { y: '105%', opacity: 1 }`, `visible: { y: '0%', opacity: 1 }`).
  - Clean vertical masked slide retained with zero opacity fading on text.
- **Splash Screen Scroll Lock & Hero Transition**:
  - Locked `overflow: hidden`, Lenis smooth scroll (`lenis.stop()`), and blocked user scroll events until splash screen finishes.
  - Page resets cleanly to `(0, 0)` with the Hero section visible before enabling scroll.
- **Motion Blur Image Quality & Bitrate Protection**:
  - Scoped `.motion-blur-target` strictly to headings and text landmarks.
  - Added CSS hardware-acceleration and rasterization isolation guards to keep case study images 100% sharp during scroll.
- **HTML Artifact Cleanup**:
  - Removed lingering `//test` debug string from `index.html`.
- **Selected Works CTA**:
  - Added `"Discover more projects!"` heading (`text-[1.5278vw] font-bold`) and `"Discover more"` link button with diagonal arrow vector (`w-[0.4879vw] h-[0.4879vw]`).
- **Philosophy Section Hierarchy & Circular Seal Mark**:
  - Reordered Philosophy to follow the "What's happening now" News Section.
  - Converted to 2-column flex layout with manifesto text on the left and `NorqueCircleLogo` (`w-[6.1838vw]`) on the right.
- **"Done by Humans" Section with Parallax**:
  - Created `DoneByHumans.jsx` (`h-[49.0278vw]`, `mb-[10.8333vw]`).
  - Extracted 12-glyph vector mark `DoneByHumansLogo.jsx` across the top (`w-[92.5243vw]`).
  - Centered bottom statement block with circular brand mark and manifesto text in `MaskedWordStagger`.
  - Added smooth background image parallax (`useScroll`, `useTransform` translateY -10% to +10%) with 130% bleed height, keeping text layers static.

---

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
