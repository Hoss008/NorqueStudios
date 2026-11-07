import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ========================================================================= */
/* PROJECT NEXT OVERSCROLL (PULL-TO-ACTION) COMPONENT                        */
/* - Appears at the bottom of single project pages                           */
/* - Displays: "Scroll to load the next project" in Beausite Semibold        */
/* - Detects when the user is scrolled all the way to the bottom             */
/* - Tracks accumulated overscroll pull / wheel / touch delta                */
/* - When the user scrolls hard enough past the threshold, loads next project*/
/* ========================================================================= */

const SCROLL_THRESHOLD = 260; // Delta needed to trigger next project

export default function ProjectNextOverscroll({ 
  nextProject, 
  nextPath, 
  nextTitle, 
  onNavigate 
}) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  
  const currentDeltaRef = useRef(0);
  const hasTriggeredRef = useRef(false);
  const decayRafRef = useRef(null);
  const touchStartYRef = useRef(0);

  const triggerNext = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsTriggered(true);
    setProgress(1);

    setTimeout(() => {
      if (onNavigate) {
        onNavigate(nextProject);
      } else if (nextPath) {
        navigate(nextPath);
      }
    }, 220);
  };

  useEffect(() => {
    // Check if user is scrolled to the absolute bottom of the document
    const isAtBottom = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const fullHeight = document.documentElement.scrollHeight;
      // 18px buffer to account for subpixel / Lenis rounding
      return windowHeight + scrollY >= fullHeight - 18;
    };

    // Wheel listener
    const handleWheel = (e) => {
      if (hasTriggeredRef.current) return;

      if (isAtBottom()) {
        if (e.deltaY > 0) {
          // Scrolling down at the bottom -> accumulate overscroll
          const delta = Math.min(Math.max(e.deltaY, 0), 100);
          currentDeltaRef.current = Math.min(SCROLL_THRESHOLD, currentDeltaRef.current + delta);
          const p = currentDeltaRef.current / SCROLL_THRESHOLD;
          setProgress(p);

          if (currentDeltaRef.current >= SCROLL_THRESHOLD) {
            triggerNext();
          }
        } else if (e.deltaY < -2) {
          // Scrolling up -> reset immediately
          currentDeltaRef.current = Math.max(0, currentDeltaRef.current + e.deltaY * 2);
          setProgress(currentDeltaRef.current / SCROLL_THRESHOLD);
        }
      }
    };

    // Touch listener for mobile
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (hasTriggeredRef.current) return;

      if (isAtBottom()) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartYRef.current - currentY;
        if (diff > 0) {
          // Pulling up at bottom
          currentDeltaRef.current = Math.min(SCROLL_THRESHOLD, currentDeltaRef.current + diff * 1.5);
          const p = currentDeltaRef.current / SCROLL_THRESHOLD;
          setProgress(p);
          touchStartYRef.current = currentY;

          if (currentDeltaRef.current >= SCROLL_THRESHOLD) {
            triggerNext();
          }
        }
      }
    };

    // Decay loop: smoothly drain delta back to 0 when user stops scrolling
    const decay = () => {
      if (!hasTriggeredRef.current && currentDeltaRef.current > 0) {
        currentDeltaRef.current = Math.max(0, currentDeltaRef.current * 0.91 - 1.5);
        setProgress(currentDeltaRef.current / SCROLL_THRESHOLD);
      }
      decayRafRef.current = requestAnimationFrame(decay);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    decayRafRef.current = requestAnimationFrame(decay);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (decayRafRef.current) cancelAnimationFrame(decayRafRef.current);
    };
  }, [nextProject, nextPath, onNavigate]);

  return (
    <div 
      onClick={triggerNext}
      className="w-full pt-[40px] md:pt-[3vw] pb-[80px] md:pb-[5.5vw] flex flex-col items-center justify-center text-center select-none cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Scroll or click to load next project: ${nextTitle || ''}`}
    >
      <motion.div 
        className="flex flex-col items-center will-change-transform"
        style={{
          y: -progress * 14,
        }}
      >
        {/* Message: Beausite Semibold, "Scroll to load the next project" */}
        <p className="font-beausite font-semibold text-[11px] md:text-[0.76vw] 2xl:text-[13px] tracking-[-0.02em] text-white/80 group-hover:text-white transition-colors duration-200 uppercase">
          {isTriggered ? `Loading ${nextTitle || 'Next Project'}...` : 'Scroll to load the next project'}
        </p>

        {/* Threshold Progress Bar / Track directly beneath the message */}
        <div className="relative w-[140px] md:w-[9.72vw] 2xl:w-[160px] h-[2px] bg-white/20 rounded-full overflow-hidden mt-[10px] md:mt-[0.7vw]">
          <motion.div 
            className="h-full bg-white rounded-full will-change-[width]"
            style={{ 
              width: `${Math.round(progress * 100)}%`,
              transition: isTriggered ? 'width 0.2s ease-out' : 'none'
            }}
          />
        </div>

        {/* Subtle arrow indicator that pulses with pull progress */}
        <motion.div 
          className="mt-[8px] md:mt-[0.55vw] text-white/50 group-hover:text-white transition-colors"
          style={{
            opacity: Math.max(0.4, progress),
            y: progress * 4,
          }}
        >
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[9px] h-[6px]">
            <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
