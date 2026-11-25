import React, { useState, useEffect, useRef } from 'react';
import './ServicesMobile.css';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const CARD_IMAGE = `${base}images/services/bef77eb0ee5df99230996515e2cc1941c59c92e0.png`;

const EXPERIENCE_CARDS = [
  {
    id: 'always-in-the-loop',
    title: 'Always in the loop',
    subtitle: "You shouldn't have to ask what's happening.",
    image: CARD_IMAGE,
    description:
      "Regular project updates keep you informed about recent progress, completed milestones, ongoing tasks, and what's coming next."
  },
  {
    id: 'clarity-in-every-decision',
    title: 'Clarity in every decision',
    subtitle: 'No guessing. No unnecessary back and forth.',
    image: CARD_IMAGE,
    description:
      "Every important decision is supported by context, reasoning, and a clear direction. You'll understand not only what we're doing, but why we're doing it."
  },
  {
    id: 'nothing-gets-lost-in-translation',
    title: 'Nothing gets lost in translation',
    subtitle: 'From the first conversation to the final handover.',
    image: CARD_IMAGE,
    description:
      'Files, decisions, updates, and project materials are organized and accessible, so everything stays connected throughout the journey.'
  },
  {
    id: 'built-to-move-forward',
    title: 'Built to move forward',
    subtitle: "The relationship doesn't end at delivery.",
    image: CARD_IMAGE,
    description:
      "We make sure you have what you need to take things further, with the right files, documentation, and guidance to make the most of what we've created together."
  }
];

// ─── EXPERIENCE SECTION CONFIGURATION ───────────────────────────────────────
// Adjust the card background image opacity here (0.0 to 1.0):
export const CARD_BG_OPACITY = 0.5;

// Card width (32.8vw) + horizontal gap (3.4vw) = 36.2vw center-to-center step
const CARD_STEP_VW = 36.2;

// Horizontal slide range in vw (higher TRACK_START_VW = cards start further to the right):
export const TRACK_START_VW = 93;
export const TRACK_END_VW = -93;

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
      const curX = TRACK_START_VW - progress * (TRACK_START_VW - TRACK_END_VW);
      const centerOffset = (EXPERIENCE_CARDS.length - 1) / 2;
      const rawIdx = Math.round(centerOffset - curX / CARD_STEP_VW);
      const idx = Math.max(0, Math.min(EXPERIENCE_CARDS.length - 1, rawIdx));
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

    const centerOffset = (EXPERIENCE_CARDS.length - 1) / 2;
    const targetX = (centerOffset - index) * CARD_STEP_VW;
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
      className="services-cards-section relative w-full h-[300vh] bg-black text-white pt-[10vw]"
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

                {/* Card Bottom-Left Title & Subtitle */}
                <div className="absolute bottom-[1.5vw] left-[1.5vw] right-[1.5vw] z-10 pointer-events-none max-md:p-[20px] max-md:bottom-0 max-md:left-0 max-md:right-0">
                  <span className="text-[1.3889vw] font-semibold tracking-[-0.03em] text-white leading-none block max-md:text-[22px] max-md:tracking-[-0.66px]">
                    {card.title}
                  </span>
                  {card.subtitle && (
                    <span className="block text-[0.8333vw] font-semibold tracking-[-0.02em] text-white/90 leading-[1.3] mt-[0.35vw] max-md:text-[14px] max-md:font-bold max-md:tracking-[-0.42px] max-md:leading-normal max-md:mt-[10px]">
                      {card.subtitle}
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
