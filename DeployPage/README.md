# NORQUE STUDIOS™ — Official Website

> A 1:1 pixel-perfect recreation of the Figma design for **NORQUE STUDIOS™** built with React 18, Vite, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📚 Handover & Architecture Documentation

For complete technical specifications, component workflows, sound physics, and daily sprint logs, refer to the documentation suite in [`docs/`](./docs/):

- **[`docs/HANDOVER.md`](./docs/HANDOVER.md)** — Master onboarding guide for AI models & developers.
- **[`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)** — System diagrams, page transition lifecycle, and carousel geometry.
- **[`docs/DAY_1_LOG.md`](./docs/DAY_1_LOG.md)** — Day 1 development log (Genesis & Homepage).
- **[`docs/DAY_2_LOG.md`](./docs/DAY_2_LOG.md)** — Day 2 development log (Version 0.2v: About Page, Infinite Carousels, Audio Engine).
- **[`docs/DAY_3_LOG.md`](./docs/DAY_3_LOG.md)** — Day 3 development log (Size Optimization, Project Reorganization, Handover Docs).
- **[`docs/DAY_4_LOG.md`](./docs/DAY_4_LOG.md)** — Day 4 development log (Line-by-Line Stagger, Isolated Scroll Motion Blur).
- **[`docs/DAY_5_LOG.md`](./docs/DAY_5_LOG.md)** — Day 5 development log (Figma Updates, CTA, Done by Humans, Parallax, Day 5 Revisions).

---

## 🗂 Project Structure

```
norque-studios/
├── docs/                        # AI & Developer Handover Documentation
├── public/                      # Static assets (audio SFX & About photos)
│   ├── audio/
│   └── images/about/
├── src/
│   ├── assets/                  # Brand vectors, video, case study media, Beausite fonts
│   │   └── fonts/
│   ├── components/              # Modular UI components
│   │   ├── about/               # About page sub-components (Hero, Team, News)
│   │   ├── AboutPage.jsx        # About view
│   │   ├── HomePage.jsx         # Homepage view
│   │   ├── Hero.jsx             # Video hero with sequential typography
│   │   ├── Showcase.jsx         # 200vh pinned uncropped reveal
│   │   ├── SelectedWorks.jsx    # 4-project portfolio grid + CTA
│   │   ├── NewsSection.jsx      # Infinite loop news carousel
│   │   ├── Philosophy.jsx       # Studio manifesto with circular seal logo
│   │   ├── DoneByHumans.jsx     # Cinematic section with parallax background
│   │   ├── DoneByHumansLogo.jsx # 12-glyph vector brand mark
│   │   ├── NorqueCircleLogo.jsx # Circled "N" brand seal logo
│   │   ├── Footer.jsx           # Universal inquiry footer with magnet lines
│   │   ├── MagnetLines.jsx      # Magnetic particle field
│   │   ├── MaskedWordStagger.jsx# Line-by-line masked typography stagger
│   │   └── SplashScreen.jsx     # Brand intro with scroll locking
│   ├── App.jsx                  # Root router, audio engine & page transitions
│   ├── index.css                # Global styles, fonts & motion blur
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template
├── package.json                 # Dependency manifests (v0.4.0)
└── VERSION.md                   # Version milestone changelog
```
