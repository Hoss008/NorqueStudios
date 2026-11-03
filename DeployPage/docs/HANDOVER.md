# NORQUE STUDIOS™ — AI & Developer Handover Guide

> **Quick Context for AI Models & Developers:**  
> This file is the primary entry point to immediately understand the NORQUE STUDIOS™ website codebase, architecture, design rules, state machines, and historical progress without needing to re-parse the entire repository.

---

## ⚡ Fast Reference

| Property | Value |
| :--- | :--- |
| **Project Name** | Norque Studios Website |
| **Current Milestone** | `Version 0.4.0` (Day 5 Complete: Footer Magnet Consistency, Zero-Opacity Stagger, Splash Scroll Guard, Image Bitrate Protection, Selected Works CTA, Philosophy Repositioning & Circular Seal, Done by Humans with Parallax) |
| **Tech Stack** | React 18, Vite 6, Tailwind CSS 3, Framer Motion 14, Lenis Smooth Scroll, Lucide Icons |
| **Design Reference** | 1:1 Pixel-perfect recreation of Figma designs (`1440px` baseline grid) |
| **Local Dev Server** | `http://localhost:3000/` (`npm run dev` or `npm.cmd run dev` on Windows) |
| **Build Target** | `npm run build` -> output in `dist/` |

---

## 🧭 Project Architecture & Directory Layout

```
norque-studios/
├── docs/                             # AI & Human Handover Documentation
│   ├── HANDOVER.md                   # Master handover guide (this file)
│   ├── ARCHITECTURE.md               # Technical systems, diagrams & data flows
│   ├── DAY_1_LOG.md                  # Day 1 sprint summary (Genesis & Homepage)
│   ├── DAY_2_LOG.md                  # Day 2 sprint summary (About Page, Carousels, Audio)
│   ├── DAY_3_LOG.md                  # Day 3 sprint summary (Optimization, Cleanup, Git Setup, Polish)
│   ├── DAY_4_LOG.md                  # Day 4 sprint summary (Line-by-Line Stagger, Motion Blur, 100% Home & About)
│   └── DAY_5_LOG.md                  # Day 5 sprint summary (Figma Updates, CTA, Done by Humans, Parallax, Revisions)
├── public/                           # Unbundled static assets
│   ├── audio/                        # Sound engine audio files
│   │   ├── SFX Norque.mp3            # Atmospheric background ambient track (continuous)
│   │   └── SFX Norque_2.mp3          # UI click interactive feedback track
│   └── images/
│       └── about/                    # High-resolution raster images for About page
│           ├── about-intro-image.png
│           ├── founder-mostafa-yasser.png
│           ├── founder-hossam-hassan.png
│           ├── team-alaa-kabil.png
│           ├── team-okaby.jpg
│           ├── team-anas-el-sharief.png
│           ├── team-marwan-yasser.png
│           ├── news-lithuania-chapter-1.png
│           ├── news-lithuania-chapter-2.png
│           ├── news-saudi-arabia.png
│           └── news-lithuania-identity.png
├── src/                              # React application source
│   ├── assets/                       # Bundled static media & webfonts
│   │   ├── fonts/                    # Beausite Classic TTF typography suite
│   │   ├── compact-logo.svg          # Secondary compact brand vector
│   │   ├── main-logo.svg             # Primary full brand vector
│   │   ├── hero-background.mp4       # Hero background cinematic video
│   │   ├── recent-works.gif          # Showcase pinned reveal media
│   │   ├── done-by-humans-bg.png     # Cinematic Done by Humans background photo
│   │   ├── project-axis.png          # Selected works case study
│   │   ├── project-fusion-form.png   # Selected works case study
│   │   ├── project-mms.png           # Selected works case study
│   │   ├── project-studio-juzenas.png# Selected works case study
│   │   ├── news-identity.png         # Homepage news thumbnail
│   │   ├── news-lithuania.png        # Homepage news thumbnail
│   │   └── news-saudi.png            # Homepage news thumbnail
│   ├── components/                   # Modular React UI components
│   │   ├── about/                    # About page sub-components
│   │   │   ├── AboutHero.jsx         # Manifesto & countries worked in
│   │   │   ├── AboutNews.jsx         # "What happened lately" infinite carousel
│   │   │   └── AboutTeam.jsx         # Founders & "PPL BEHIND NRQ™" team grid
│   │   ├── AboutPage.jsx             # About page container view
│   │   ├── CompactLogo.jsx           # Vector compact SVG logo component
│   │   ├── DoneByHumans.jsx          # Cinematic visual break with background parallax & manifesto
│   │   ├── DoneByHumansLogo.jsx      # Lossless 12-glyph vector brand mark
│   │   ├── Footer.jsx                # Universal contact callout & directory footer (consistent vw magnet lines)
│   │   ├── Hero.jsx                  # Hero section with sequential intro & video
│   │   ├── HomePage.jsx              # Homepage container view
│   │   ├── InteractiveInfiniteCarousel.jsx # Multi-buffer physics drag/swipe carousel
│   │   ├── logoPaths.js              # Bezier path vectors for hero logo
│   │   ├── MagnetLines.css           # Styling for interactive magnet lines
│   │   ├── MagnetLines.jsx           # Interactive canvas/DOM magnetic particle field
│   │   ├── MainLogo.jsx              # Vector main brand mark component
│   │   ├── MaskedWordStagger.jsx     # Universal line-by-line masked stagger typography component (opacity: 1)
│   │   ├── MuteButton.jsx            # Optical Liquid Glass refraction audio toggle
│   │   ├── Navbar.jsx                # Pinned global header with live Cairo GMT clock & word hover stagger
│   │   ├── NewsSection.jsx           # Homepage "WHAT’S HAPPENING NOW" interactive infinite carousel
│   │   ├── NorqueCircleLogo.jsx      # Reusable circular seal brand mark component (circled "N")
│   │   ├── Philosophy.jsx            # Typographic intention statement with right-aligned circular seal mark
│   │   ├── SelectedWorks.jsx         # 4-project 2-column showcase grid with CTA button & arrow
│   │   ├── Showcase.jsx              # 200vh pinned uncropped reveal container
│   │   ├── splashLogoPaths.js        # Vector paths for splash screen
│   │   └── SplashScreen.jsx          # Initial load brand introduction with scroll locking
│   ├── App.jsx                       # Root view, router, audio manager & in-place transitions
│   ├── index.css                     # Font definitions, Lenis rules & scrollbar hides
│   └── main.jsx                      # React 18 DOM mount point
├── index.html                        # HTML root template
├── package.json                      # Dependency manifests & scripts (v0.4.0)
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind theme extensions & font mappings
├── vite.config.js                    # Vite bundler configuration (port 3000)
├── README.md                         # Project overview
└── VERSION.md                        # Version milestone changelog
```

---

## 🎨 Design Rules & Styling Conventions

1. **Grid & Viewport Math**:
   - The design is anchored to a standard **1440px desktop canvas**.
   - Proportional scaling is achieved using exact `vw` values: `(pixel_value / 1440) * 100vw`.
   - **Universal Horizontal Margins**: Strictly **`12px` = `0.8333vw` (`px-[0.8333vw]`)** applied universally across all pages (Home & About) and sections. Restrictive fixed-width containers (`max-w-[1416px]`) are prohibited so layouts expand edge-to-edge flush with the universal margin.
   - Standard Grid Gutters: `12px` = `0.8333vw` (`gap-[0.8333vw]`).
   - Headline text sizes: `46px` = `3.1944vw`.
   - Body text sizes: `10px` = `0.6944vw`.
   - **Footer MagnetLines**: Configured strictly in `vw` units (`lineWidth: 0.1389vw`, `lineHeight: 1.25vw`, `spacing: 2.0833vw`, `radius: 13.8889vw`) ensuring total density and visual consistency across all monitor resolutions.
2. **Typography System**:
   - Font Family: **Beausite Classic** (weights 100 through 900 loaded in `@font-face`).
   - Standard Tracking: **`-0.03em` (`-3%`)** across all headings and captions.
3. **Color Palette**:
   - Background: Pure Pitch Black (`#000000`).
   - Cards / Frames: Deep Charcoal (`#121212` / `#121214`).
   - Structural Borders: Subtle Muted Grey (`#262626` / `#363636`).
   - Subtitles / Metadata: `#747474` and `#797979`.
   - Text & Accents: Pure White (`#FFFFFF`).

---

## 🔄 Core Technical Systems

### 1. Multi-Page Routing & In-Place Opacity Transitions (`App.jsx`)
- State-driven single-page router: `currentPage` (`'home'` | `'about'`).
- **Scale-Free Opacity Crossfade (Scale = 1.0)**:
  - Scale remains strictly 1.0 (no scale or zoom distortion).
  - Exit: Current page fades out in-place (`opacity: 1 -> 0`, `duration: 0.35s`, `ease: [0.4, 0, 0.2, 1]`).
  - Transition: Navbar opacity fades out synchronously with the page (`opacity: 0`).
  - Arrival: In `onExitComplete`, instant scroll reset occurs (`window.scrollTo(0, 0)` and `lenis.scrollTo(0, { immediate: true })`), followed by the navigated page and navbar fading in (`opacity: 0 -> 1`, `duration: 0.35s`).
  - Result: Destination pages always start cleanly from the hero section, while the user experiences zero upward snapping on exit.
- Deep Navigation: Clicking "Works" from the About page switches to Home and smoothly scrolls down to `#works` via Lenis.
- **Splash Scroll Guard**: Scrolling is locked (`overflow: hidden`, `lenis.stop()`, event blocking) until the splash screen completes and the hero section is completely visible.

### 2. Universal Masked Line Stagger (`MaskedWordStagger.jsx`)
- Automatically detects visual lines via offscreen measurement replica and animates line-by-line across multi-paragraph statements.
- **Opacity Locked to 1**: Opacity remains strictly `1` at all times (`hidden: { y: '105%', opacity: 1 }`, `visible: { y: '0%', opacity: 1 }`). Clean vertical slide only, without opacity fades.
- Universal Motion Curve: `[0, 0.8, 0.2, 1]`, `duration: 0.75s`, `delay: 0.2s`, `stagger: 0.05s`.

### 3. Pinned Navbar & Word-Level Hover Stagger (`Navbar.jsx`)
- **Proportional Height**: Exactly `36px` proportionally converted to `2.5vw` (`h-[2.5vw]`).
- **Reveal-Driven Pinning**: On Home page, header scrolls off naturally with Hero and only reappears / pins with a 0.5s delayed entrance (`[0, 0.8, 0.2, 1]`) once the Showcase GIF box reveal reaches 100%. On About page, it is pinned continuously.
- **Word-Level Hover Stagger**: Nav buttons animate by word (upward roll out of masked boundary with duplicate replacement rising from below) matching `references/Hover Stagger reference.mp4` (`duration: 0.38s`, `ease: [0, 0.8, 0.2, 1]`). Nav buttons remain permanently in default state with no sticky selection.

### 4. Dual-Layer Sound System (`App.jsx`, `MuteButton.jsx`)
- **Layer 1: Ambient Background (`SFX Norque.mp3`)**: Plays continuously and persists seamlessly across page transitions.
- **Layer 2: Interactive UI SFX (`SFX Norque_2.mp3`)**: Triggers on click of any interactive element. Completely suppressed during carousel drag via `window.__norqueCarouselDragged`.
- **Mute Button**: Real-time optical "Liquid Glass" refraction via canvas normal map displacement filter, finished with a satin frosted glass tint.

### 5. Velocity-Driven Scroll Motion Blur Engine (`App.jsx`, `index.css`)
- Directional vertical SVG filter `<feGaussianBlur id="scroll-motion-blur-fe">` tied to Lenis smooth scroll velocity.
- Scoped strictly to `.motion-blur-target` on typography headings and text landmarks.
- All portfolio thumbnails, project case studies, GIF media, and background assets are completely excluded with GPU hardware-acceleration guards to guarantee 100% native image bitrate and zero blur degradation.

### 6. "Done by Humans" Background Parallax (`DoneByHumans.jsx`)
- Integrated smooth scroll parallax via `useScroll` and `useTransform` (`translateY: -10% -> +10%`) applied exclusively to the background photo container (`h-[130%]`, `-top-[15%]`, `will-change: transform`).
- Text layers, the 12-glyph header vector, and the circular seal logo remain pinned on independent `z-10` planes, unaffected by parallax movement.

---

## 🚀 How to Continue Development

When starting a new session or chat:
1. Review `docs/HANDOVER.md` (this file) and `docs/ARCHITECTURE.md`.
2. Check `VERSION.md` to see the current active milestone (`0.4.0`).
3. Start the dev server: `npm.cmd run dev` (runs on `http://localhost:3000`).
4. At the end of each sprint/day:
   - Add a new log in `docs/DAY_X_LOG.md`.
   - Update `VERSION.md`.
   - Verify build: `npm.cmd run build`.
   - Commit and push to `main` on GitHub.
