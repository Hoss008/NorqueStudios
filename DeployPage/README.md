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
│   │   ├── SelectedWorks.jsx    # 4-project portfolio grid
│   │   ├── Philosophy.jsx       # Studio manifesto
│   │   ├── NewsSection.jsx      # Infinite loop news carousel
│   │   ├── Footer.jsx           # Universal inquiry footer
│   │   ├── Navbar.jsx           # Header with real-time Cairo GMT clock
│   │   ├── MuteButton.jsx       # Optical Liquid Glass refraction toggle
│   │   ├── SplashScreen.jsx     # Initial load brand reveal
│   │   └── InteractiveInfiniteCarousel.jsx # Multi-buffer physics carousel
│   ├── App.jsx                  # Main router, audio orchestrator, cinematic transitions
│   ├── index.css                # Base Tailwind & custom typography rules
│   └── main.jsx                 # React root entry
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── VERSION.md
```
