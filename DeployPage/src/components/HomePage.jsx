import React, { useEffect } from 'react';
import Hero from './Hero';
import Showcase from './Showcase';
import SelectedWorks from './SelectedWorks';
import NewsSection from './NewsSection';
import Philosophy from './Philosophy';
import DoneByHumans from './DoneByHumans';
import Footer from './Footer';

/* ========================================================================= */
/* HOMEPAGE VIEW COMPONENT                                                   */
/* Assembles the primary landing experience of NORQUE STUDIOS™               */
/* Updated per Homepage.fig hierarchy & design specifications                */
/* ========================================================================= */
export default function HomePage({ 
  onNavigate, 
  hasIntroPlayed = false, 
  onIntroComplete,
  onBoxRevealComplete,
  onOpenCMS
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

      {/* 3. Selected Works: 4-project 2-column showcase grid with CTA */}
      <SelectedWorks onNavigate={onNavigate} />

      {/* 4. News Section: "What's happening now" interactive infinite carousel */}
      <NewsSection />

      {/* 5. Philosophy: Typographic manifesto statement with circular seal logo */}
      <Philosophy />

      {/* 6. Done By Humans: Cinematic visual break with manifesto statement */}
      <DoneByHumans />

      {/* 7. Universal Footer: Contact callout, brand mark & directory */}
      <Footer onOpenCMS={onOpenCMS} />
    </div>
  );
}
