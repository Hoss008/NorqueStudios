import React, { useEffect } from 'react';
import AboutHero from './about/AboutHero';
import AboutTeam from './about/AboutTeam';
import AboutNews from './about/AboutNews';
import Footer from './Footer';

/* ========================================================================= */
/* ABOUT PAGE VIEW COMPONENT                                                 */
/* Secondary page converted 1:1 from 'Norque Studios Page 2.fig'             */
/* ========================================================================= */
export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* Spacer to make up for 36px (2.5vw) pinned navigation bar */}
      <div className="w-full h-[2.5vw]" aria-hidden="true" />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* Section A: Manifesto & Working Countries */}
        <AboutHero />

        {/* Section B: Founders & Team Grid ("PPL BEHIND NRQ™") */}
        <AboutTeam />

        {/* Section C: Latest Updates ("What happened lately" carousel) */}
        <AboutNews />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
