import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompactLogo from './CompactLogo';

/* ========================================================================= */
/* STAGGERED MASKED NAV LINK BUTTON COMPONENT                                */
/* Words stagger upward while duplicated masked words rise from below        */
/* Reference: References/Hover Stagger reference.mp4                         */
/* ========================================================================= */
function StaggeredNavButton({ label, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const words = label.split(' ');

  return (
    <a
      href={`#${label.toLowerCase()}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center text-[0.5556vw] font-semibold tracking-normal text-white uppercase cursor-pointer select-none py-[0.1vw]"
    >
      <span className="inline-flex overflow-hidden leading-tight">
        {words.map((word, index) => (
          <span 
            key={index} 
            className="relative inline-block overflow-hidden mr-[0.25em] last:mr-0"
          >
            {/* Primary Word: Rolls upward out of masked boundary on hover */}
            <motion.span
              className="inline-block"
              initial={false}
              animate={{ y: isHovered ? '-100%' : '0%' }}
              transition={{
                duration: 0.38,
                ease: [0, 0.8, 0.2, 1],
                delay: isHovered ? 0.1 + index * 0.1 : (words.length - 1 - index) * 0.05,
              }}
            >
              {word}
            </motion.span>

            {/* Masked Duplicate Word: Rolls in from bottom into view on hover */}
            <motion.span
              className="absolute top-0 left-0 inline-block text-white"
              initial={false}
              animate={{ y: isHovered ? '0%' : '100%' }}
              transition={{
                duration: 0.38,
                ease: [0, 0.01, 0.01, 1],
                delay: isHovered ? 0.1 + index * 0.1 : (words.length - 1 - index) * 0.05,
              }}
              aria-hidden="true"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </a>
  );
}

/* ========================================================================= */
/* NAVBAR COMPONENT                                                          */
/* 4-column responsive header with universal 12px (0.8333vw) margins         */
/* ========================================================================= */
export default function Navbar({ 
  isIntroStarted = false, 
  activePage = 'home', 
  onNavigate,
  isPinned = false,
  isVisible = true,
  isPageTransitioning = false
}) {
  /* ─── State: Cairo/Egypt Live GMT Clock ─── */
  const [egyptTime, setEgyptTime] = useState('');

  const handleLinkClick = (page, sectionId) => (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        const hour = parts.find(p => p.type === 'hour')?.value || '12';
        const minute = parts.find(p => p.type === 'minute')?.value || '00';
        const second = parts.find(p => p.type === 'second')?.value || '00';
        const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase() || 'PM';
        
        setEgyptTime(`EGYPT, ${hour}:${minute}:${second} ${dayPeriod} GMT`);
      } catch (e) {
        setEgyptTime('EGYPT, 03:48:10 PM GMT');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Transition & Entrance Configurations ─── */
  const navOpacity = isPageTransitioning ? 0 : (isVisible ? 1 : 0);
  const navY = isPinned ? (isVisible ? 0 : '-100%') : (isIntroStarted ? 0 : -50);
  const isHomeFirstReveal = !isPageTransitioning && activePage === 'home' && isVisible;

  const transitionConfig = {
    y: {
      duration: isHomeFirstReveal ? 0.8 : 0.35,
      ease: [0, 0.8, 0.2, 1],
      delay: isHomeFirstReveal ? 0.5 : 0,
    },
    opacity: {
      duration: isHomeFirstReveal ? 0.8 : 0.35,
      ease: [0, 0.8, 0.2, 1],
      delay: isHomeFirstReveal ? 0.5 : 0,
    },
  };

  /* ─── Render ─── */
  return (
    <motion.header 
      className={`${
        isPinned 
          ? 'fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md' 
          : 'w-full z-20'
      } h-[2.5vw] px-[0.8333vw] flex items-center transition-colors duration-300`}
      style={{ pointerEvents: isPinned && (!isVisible || isPageTransitioning) ? 'none' : 'auto' }}
      initial={
        isPinned 
          ? { y: isVisible ? 0 : '-100%', opacity: 0 } 
          : { y: isIntroStarted ? 0 : -50, opacity: isIntroStarted ? 1 : 0 }
      }
      animate={{
        y: navY,
        opacity: navOpacity,
      }}
      transition={transitionConfig}
    >
      <div className="w-full grid grid-cols-4 items-center">
        {/* Column 1: Compact Vector Logo */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={handleLinkClick('home')}
            className="inline-flex items-center cursor-pointer" 
            aria-label="Norque Studios Home"
          >
            <CompactLogo className="w-[5.0764vw] h-[0.5417vw] text-white" />
          </a>
        </div>

        {/* Column 2: Navigation Links with Staggered Masked Text Animation */}
        <nav className="flex items-center space-x-[0.6944vw]" aria-label="Main Navigation">
          <StaggeredNavButton 
            label="ABOUT" 
            onClick={handleLinkClick('about')} 
          />
          <StaggeredNavButton 
            label="WORKS" 
            onClick={handleLinkClick('home', 'works')} 
          />
          <StaggeredNavButton 
            label="SERVICES" 
            onClick={handleLinkClick('home', 'services')} 
          />
        </nav>

        {/* Column 3: Grid Balance Spacer */}
        <div></div>

        {/* Column 4: Egypt Live GMT Time */}
        <div className="text-right">
          <span className="text-[0.5556vw] font-semibold tracking-[-0.03em] text-white tabular-nums select-none uppercase">
            {egyptTime || 'EGYPT, 03:48:10 PM GMT'}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
