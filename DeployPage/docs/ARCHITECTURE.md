# NORQUE STUDIOS™ — Technical Architecture

This document outlines the software design, component hierarchy, page routing lifecycle, audio engine physics, and infinite carousel buffer geometry of the NORQUE STUDIOS™ website.

---

## 1. System Component Hierarchy

```mermaid
flowchart TD
    Root[React Root: main.jsx] --> App[Root Orchestrator: App.jsx]
    
    App --> Splash[SplashScreen.jsx]
    App --> Mute[MuteButton.jsx with Liquid Glass Shader]
    App --> Lenis[Lenis Smooth Scroll Engine]
    App --> Sound[Dual-Layer Audio Engine]
    
    App --> Transitions{Cinematic AnimatePresence Mode: wait}
    
    Transitions -->|currentPage == 'home'| Home[HomePage.jsx]
    Transitions -->|currentPage == 'about'| About[AboutPage.jsx]
    
    Home --> Hero[Hero.jsx]
    Home --> Showcase[Showcase.jsx - 200vh Pinned Reveal]
    Home --> SelectedWorks[SelectedWorks.jsx - 2-Column Grid]
    Home --> Philosophy[Philosophy.jsx - Manifesto Statement]
    Home --> HomeNews[NewsSection.jsx]
    Home --> HomeFooter[Footer.jsx]
    
    Hero --> NavHome[Navbar.jsx - Live Cairo GMT Clock]
    Hero --> HeroLogo[logoPaths.js Bezier Animation]
    HomeNews --> CarouselHome[InteractiveInfiniteCarousel.jsx]
    HomeFooter --> MainLogoHome[MainLogo.jsx]
    
    About --> NavAbout[Navbar.jsx - Active Link State]
    About --> AboutHero[AboutHero.jsx - Manifesto & Countries]
    About --> AboutTeam[AboutTeam.jsx - Founders & Team Grid]
    About --> AboutNews[AboutNews.jsx - Latest Updates]
    About --> AboutFooter[Footer.jsx]
    
    AboutNews --> CarouselAbout[InteractiveInfiniteCarousel.jsx]
    AboutFooter --> MainLogoAbout[MainLogo.jsx]
```

---

## 2. Cinematic Page Transition Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Nav as Navbar / Link
    participant App as App.jsx Router
    participant ExitPage as Current Page (e.g. Home)
    participant EnterPage as Target Page (e.g. About)
    participant Lenis as Lenis Scroll Engine
    
    User->>Nav: Clicks "About" or "Works"
    Nav->>App: handleNavigate('about')
    App->>ExitPage: Animate exit (scale: 0.94, opacity: 0, duration: 0.45s)
    ExitPage-->>App: Exit animation complete (onExitComplete)
    App->>Lenis: scrollTo(0, { immediate: true }) + window.scrollTo(0,0)
    App->>EnterPage: Mount target page (initial: scale: 0.94, opacity: 0)
    EnterPage->>EnterPage: Animate enter (scale: 1.0, opacity: 1, duration: 0.5s)
    Note over EnterPage: Smooth deceleration zoom-in to viewport
```

---

## 3. Audio Physics & Interaction Architecture

```mermaid
flowchart LR
    subgraph AudioEngine [Global Audio Orchestration]
        Ambience["SFX Norque.mp3 (Layer 1: Ambience)"]
        ClickSFX["SFX Norque_2.mp3 (Layer 2: Click SFX)"]
        MuteToggle["MuteButton.jsx (Global State: isMuted)"]
    end

    subgraph UserTriggers [User Interactions]
        FirstInteraction["First Click / Unlock"]
        NavClick["Button / Link Click"]
        CarouselDrag["Carousel Drag / Swipe"]
    end

    FirstInteraction -->|Triggers Once| Ambience
    Ambience -->|Continues Seamlessly| Transitions["Page Transitions (Home <-> About)"]
    
    NavClick -->|Interactive Element| ClickSFX
    CarouselDrag -->|Sets window.__norqueCarouselDragged| Suppress["Suppress ClickSFX & Links"]
    
    MuteToggle -.->|Mutes / Unmutes| Ambience
```

---

## 4. Infinite Carousel Multi-Buffer Geometry

To eliminate visual seams, jumps, or empty cards during continuous auto-play, pointer dragging, or horizontal flick gestures, the carousel utilizes a 5-track layout:

```
[ Track 0: Buffer Left ] [ Track 1: Center Active Track ] [ Track 2: Buffer Right 1 ] [ Track 3: Buffer Right 2 ] [ Track 4: Buffer Right 3 ]
<--------------------------------------------- Total Rendered Width --------------------------------------------->
                                   ▲
                             Viewport Center
```

- **Wrap Interval**: Offset continuously wraps within `[-2 * TrackWidth, -TrackWidth]`.
- **Drag Velocity Calculation**: Instantaneous velocity calculated over normalized 16.6ms frames, transitioning smoothly into friction glide (`velocity *= 0.95^dt`).
- **Drag vs. Click**: If movement exceeds `4px`, the drag flag activates and trailing window click events are intercepted and suppressed in the capture phase.

---

## 5. Viewport Math & Scaling Standard

The Norque design language is pixel-matched to a **1440px desktop grid**:

$$\text{CSS Size (vw)} = \left(\frac{\text{Figma Pixels}}{1440}\right) \times 100$$

| Element | Figma Value | Calculated Value |
| :--- | :--- | :--- |
| Container Margin | `24px` | `1.6667vw` |
| Standard Gap | `12px` | `0.8333vw` |
| Main Section Heading | `46px` | `3.1944vw` |
| Sub-headings | `22px` | `1.5278vw` |
| Body / Captions | `10px` | `0.6944vw` |
| Compact Nav Logo | `73.1px` | `5.0764vw` |
