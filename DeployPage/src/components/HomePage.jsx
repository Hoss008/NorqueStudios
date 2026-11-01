import React, { useEffect } from 'react';
import Hero from './Hero';
import Showcase from './Showcase';
import SelectedWorks from './SelectedWorks';
import Philosophy from './Philosophy';
import NewsSection from './NewsSection';
import Footer from './Footer';

/* ========================================================================= */
/* HOMEPAGE VIEW COMPONENT                                                   */
/* Assembles the primary landing experience of NORQUE STUDIOS™               */
/* ========================================================================= */
export default function HomePage({ 
  onNavigate, 
  hasIntroPlayed = false, 
  onIntroComplete,
  onBoxRevealComplete 
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero: Video background, brand statement & primary logo */}
      <Hero 
        onNavigate={onNavigate} 
        hasIntroPlayed={hasIntroPlayed} 
        onIntroComplete={onIntroComplete} 
      />

      {/* 2. Showcase: Pinned scroll-driven uncropped reveal animation */}
      <Showcase onRevealCompleteChange={onBoxRevealComplete} />

      {/* 3. Selected Works: 4-project 2-column showcase grid */}
      <SelectedWorks />

      {/* 4. Philosophy: Typographic manifesto statement */}
      <Philosophy />

      {/* 5. News Section: "What's happening now" interactive infinite carousel */}
      <NewsSection />

      {/* 6. Universal Footer: Contact callout, brand mark & directory */}
      <Footer />
    </div>
  );
}
