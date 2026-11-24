import React, { useState, useEffect, useRef } from 'react';
import './ServicesMobile.css';

const EXPERIENCE_CARDS = [
  {
    id: 'proposals',
    title: 'Always in the loop',
    mobileSubtitle: "You shouldn't have to ask what's happening.",
    image: '/images/services/bef77eb0ee5df99230996515e2cc1941c59c92e0.png',
    description: "Regular project updates keep you informed about recent progress, completed milestones, ongoing tasks, and what's coming next."
  },
  {
    id: 'project-updates',
    title: 'Clarity in every decision',
    mobileSubtitle: 'No guessing. No unnecessary back and forth.',
    image: '/images/services/2c8f280d0dfe389dee8c6c402c0e37c610f7f335.png',
    description: '— Real-time progress updates, continuous feedback loops, and transparent milestones. We iterate together to build products that exceed benchmarks and stand the test of time.'
  },
  {
    id: 'project-handover',
    title: 'Nothing gets lost in translation',
    mobileSubtitle: 'From the first conversation to the final handover.',
    image: '/images/services/bef77eb0ee5df99230996515e2cc1941c59c92e0.png',
    description: '— Complete ownership of pristine production codebases, modular design tokens, and structured documentation. Ready for scale from the very first deploy.'
  }
];

// ─── EXPERIENCE SECTION CONFIGURATION ───────────────────────────────────────
// Adjust the card background image opacity here (0.0 to 1.0):
export const CARD_BG_OPACITY = 0.5;

// Horizontal slide range in vw (higher TRACK_START_VW = cards start further to the right):
export const TRACK_START_VW = 75;
export const TRACK_END_VW = -75;

export default function ServicesCardsSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalDist = containerRef.current.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(progress);

      // Determine active card based on track position relative to viewport center
      // Card 0 centered at +36.2vw, Card 1 at 0vw, Card 2 at -36.2vw
      const curX = TRACK_START_VW - progress * (TRACK_START_VW - TRACK_END_VW);
      let idx = 1;
      if (curX > 18.1) {
        idx = 0;
      } else if (curX < -18.1) {
        idx = 2;
      }
      setActiveCardIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    let unLenis = null;
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', handleScroll);
      unLenis = () => {
        if (window.lenis && typeof window.lenis.off === 'function') {
          window.lenis.off('scroll', handleScroll);
        }
      };
    }
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (unLenis) unLenis();
    };
  }, []);

  // Track horizontal translation: starts far right (TRACK_START_VW) and glides left to TRACK_END_VW
  const trackTranslateX = TRACK_START_VW - scrollProgress * (TRACK_START_VW - TRACK_END_VW);

  const handleCardClick = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const docTop = rect.top + window.scrollY;
    const totalDist = containerRef.current.offsetHeight - window.innerHeight;
    
    // Card centers: Card 0 at +36.2vw, Card 1 at 0vw, Card 2 at -36.2vw
    const targetX = (1 - index) * 36.2;
    const targetProgress = Math.max(0, Math.min(1, (TRACK_START_VW - targetX) / (TRACK_START_VW - TRACK_END_VW)));
    const targetTop = docTop + targetProgress * totalDist;

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(targetTop, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  const currentCard = EXPERIENCE_CARDS[activeCardIndex] || EXPERIENCE_CARDS[0];

  return (
    <section
      ref={containerRef}
      className="services-cards-section relative w-full h-[250vh] bg-black text-white pt-[10vw]"
    >
      {/* Sticky Viewport Container: Locks while previewing cards */}
      <div className="services-cards-sticky sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-[0.8333vw] py-[2.5vw] z-10 select-none">
        
        {/* Center Title Display: Fully white, un-dimmed, centered vertically and horizontally */}
        <div className="services-cards-title-display absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[2.5vw] font-semibold tracking-[-0.03em] leading-none text-white uppercase whitespace-nowrap select-none">
            FEEL THE EXPERIENCE
          </h2>
        </div>

        {/* Sliding Cards Track: Controlled by scroll with no scale or opacity changes */}
        <div className="services-cards-track-wrap w-full flex-1 flex items-center justify-center relative overflow-visible z-10 my-[1vw]">
          <div
            className="services-cards-track flex items-center space-x-[3.4vw] will-change-transform"
            style={{
              transform: typeof window !== 'undefined' && window.innerWidth <= 768 ? 'none' : `translate3d(${trackTranslateX}vw, 0px, 0px)`
            }}
          >
            {EXPERIENCE_CARDS.map((card, idx) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className="services-card-item relative w-[32.8vw] h-[22.2vw] rounded-[0.278vw] overflow-hidden flex-shrink-0 cursor-pointer shadow-2xl bg-[#141414]"
              >
                {/* Card Background Image (Dimmed) */}
                <img
                  src={card.image}
                  alt={card.title}
                  style={{ opacity: CARD_BG_OPACITY }}
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                />

                {/* Card Bottom-Left Title */}
                <div className="absolute bottom-[1.5vw] left-[1.5vw] z-10 pointer-events-none max-md:p-[20px] max-md:bottom-0 max-md:left-0 max-md:right-0">
                  <span className="text-[1.3889vw] font-semibold tracking-[-0.03em] text-white leading-none block max-md:text-[22px] max-md:tracking-[-0.66px]">
                    {card.title}
                  </span>
                  {card.mobileSubtitle && (
                    <span className="hidden max-md:block text-[14px] font-bold tracking-[-0.42px] text-white leading-normal mt-[10px]">
                      {card.mobileSubtitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Centered changing paragraph in the middle, no morphing lines */}
        <div className="services-card-bottom-text w-full flex items-center justify-center z-10 pb-[1.5vw]">
          <div className="max-w-[40.64vw] max-md:max-w-full text-center min-h-[3.8vw] flex items-center justify-center">
            <p className="text-[0.9722vw] max-md:text-[14px] font-normal max-md:font-bold leading-[1.38] text-white tracking-[-0.03em] max-md:tracking-[-0.42px]">
              {currentCard.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
