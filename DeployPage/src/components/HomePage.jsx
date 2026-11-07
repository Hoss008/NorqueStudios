import React, { useEffect, Suspense, lazy } from 'react';
import Hero from './Hero';
import Showcase from './Showcase';

// Lazy-loaded below-the-fold sections (Hero & Showcase GIF load first)
const SelectedWorks = lazy(() => import('./SelectedWorks'));
const NewsSection = lazy(() => import('./NewsSection'));
const Philosophy = lazy(() => import('./Philosophy'));
const DoneByHumans = lazy(() => import('./DoneByHumans'));
const Footer = lazy(() => import('./Footer'));

/* ========================================================================= */
/* HOMEPAGE VIEW COMPONENT                                                   */
/* Assembles the primary landing experience of NORQUE STUDIOS™               */
/* Updated per Homepage.fig hierarchy & design specifications                */
/* ========================================================================= */
export default function HomePage({ 
  onNavigate, 
  onOpenContact,
  hasIntroPlayed = false, 
  onIntroComplete,
  onBoxRevealComplete,
  onOpenCMS
}) {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Warm up below-the-fold chunks during browser idle time
    const preloadSections = () => {
      import('./SelectedWorks');
      import('./NewsSection');
      import('./Philosophy');
      import('./DoneByHumans');
      import('./Footer');
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadSections);
    } else {
      setTimeout(preloadSections, 1500);
    }
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero: Video background, brand statement & primary logo (Loaded FIRST) */}
      <Hero 
        onNavigate={onNavigate} 
        onOpenContact={onOpenContact}
        hasIntroPlayed={hasIntroPlayed} 
        onIntroComplete={onIntroComplete} 
      />

      {/* 2. Showcase: Pinned scroll-driven uncropped reveal animation with GIF (Loaded FIRST) */}
      <Showcase onRevealCompleteChange={onBoxRevealComplete} />

      {/* 3. Selected Works: Lazy loaded */}
      <Suspense fallback={<div className="w-full min-h-[40vh] bg-black" />}>
        <SelectedWorks onNavigate={onNavigate} />
      </Suspense>

      {/* 4. News Section: Lazy loaded */}
      <Suspense fallback={<div className="w-full min-h-[40vh] bg-black" />}>
        <NewsSection />
      </Suspense>

      {/* 5. Philosophy: Lazy loaded */}
      <Suspense fallback={<div className="w-full min-h-[25vh] bg-black" />}>
        <Philosophy />
      </Suspense>

      {/* 6. Done By Humans: Lazy loaded */}
      <Suspense fallback={<div className="w-full min-h-[49vw] bg-black" />}>
        <DoneByHumans />
      </Suspense>

      {/* 7. Universal Footer: Lazy loaded */}
      <Suspense fallback={<div className="w-full min-h-[30vh] bg-black" />}>
        <Footer onOpenCMS={onOpenCMS} onNavigate={onNavigate} onOpenContact={onOpenContact} />
      </Suspense>
    </div>
  );
}
