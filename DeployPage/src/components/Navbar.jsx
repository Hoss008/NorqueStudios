import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CompactLogo from './CompactLogo';

/* ========================================================================= */
/* STAGGERED MASKED NAV LINK BUTTON COMPONENT                                */
/* Words stagger upward while duplicated masked words rise from below        */
/* Reference: References/Hover Stagger reference.mp4                         */
/* ========================================================================= */
function StaggeredNavButton({ label, href, onClick, hasUnderline = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const words = label.split(' ');
  const targetHref = href || `#${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <a
      href={targetHref}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center text-[0.5556vw] font-semibold tracking-normal text-white uppercase cursor-pointer select-none py-[0.1vw] ${
        hasUnderline ? 'border-b border-white pb-[0.05vw]' : ''
      }`}
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
  onOpenContact,
  isPinned = false,
  isVisible = true,
  isPageTransitioning = false
}) {
  /* ─── State: Cairo/Egypt Live GMT Clock ─── */
  const [egyptTime, setEgyptTime] = useState('');
  const hasRevealedOnceRef = useRef(false);

  useEffect(() => {
    if (isVisible && !hasRevealedOnceRef.current) {
      hasRevealedOnceRef.current = true;
    }
  }, [isVisible]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    }
  };

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
        
        setEgyptTime(`EGYPT, ${hour}:${minute}:${second} ${dayPeriod} GMT+2`);
      } catch (e) {
        setEgyptTime('EGYPT, 03:48:10 PM GMT+2');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Transition & Entrance Configurations ─── */
  const isProjectPage = activePage === 'project-mms' || activePage === 'project-axis' || activePage === 'project-stephenson' || activePage === 'project-fusion-form';
  const isProjectReveal = !isPageTransitioning && isProjectPage;
  const isHomeFirstReveal = !isPageTransitioning && activePage === 'home' && isVisible && !hasRevealedOnceRef.current;
  const isInitialSlideDown = isHomeFirstReveal || isProjectReveal;

  const navOpacity = isPageTransitioning ? 0 : (isVisible ? 1 : 0);
  const navY = isPinned ? ((isVisible || isPageTransitioning) ? 0 : '-100%') : (isIntroStarted ? 0 : -50);

  const transitionConfig = {
    y: {
      duration: isProjectReveal ? 1.15 : (isHomeFirstReveal ? 0.8 : (isPageTransitioning ? 0.5 : 0.35)),
      ease: [0.16, 1, 0.3, 1],
      delay: isProjectReveal ? 0.55 : (isHomeFirstReveal ? 0.5 : 0),
    },
    opacity: {
      duration: isProjectReveal ? 1.15 : (isPageTransitioning ? 0.5 : (isHomeFirstReveal ? 0.8 : 0.35)),
      ease: [0.16, 1, 0.3, 1],
      delay: isProjectReveal ? 0.55 : (isHomeFirstReveal ? 0.5 : 0),
    },
  };

  /* ─── Render ─── */
  return (
    <motion.header 
      className={`${
        isPinned 
          ? 'fixed top-0 left-0 right-0 z-40' 
          : 'w-full z-20'
      } bg-transparent mix-blend-difference h-[2.5vw] px-[0.8333vw] flex items-center`}
      style={{ pointerEvents: isPinned && (!isVisible || isPageTransitioning) ? 'none' : 'auto' }}
      initial={
        isPinned 
          ? { y: isInitialSlideDown ? '-100%' : (isVisible ? 0 : '-100%'), opacity: 0 } 
          : { y: isIntroStarted ? 0 : -50, opacity: isIntroStarted ? 1 : 0 }
      }
      animate={{
        y: navY,
        opacity: navOpacity,
      }}
      transition={transitionConfig}
    >
      <div className="w-full grid grid-cols-12 gap-[0.8333vw] items-center">
        {/* Column 1 to 3: Compact Vector Logo (NRQ STDS - Navigate to home page) */}
        <div className="col-span-3 flex items-center">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="inline-flex items-center cursor-pointer" 
            aria-label="Norque Studios Home"
          >
            <CompactLogo className="w-[5.0764vw] h-[0.5417vw] text-white" />
          </a>
        </div>

        {/* Column 4 to 6: Navigation Links with Staggered Masked Text Animation */}
        <nav className="col-span-3 flex items-center space-x-[0.6944vw]" aria-label="Main Navigation">
          <StaggeredNavButton 
            label="ABOUT" 
            href="/about"
            onClick={handleLinkClick('about')} 
            hasUnderline={activePage === 'about'}
          />
          <StaggeredNavButton 
            label="WORKS" 
            href="/projects"
            onClick={handleLinkClick('works')} 
            hasUnderline={activePage === 'works'}
          />
          <StaggeredNavButton 
            label="SERVICES" 
            href="/services"
            onClick={handleLinkClick('services')} 
            hasUnderline={activePage === 'services'}
          />
        </nav>

        {/* Column 7 to 9: Egypt Live GMT Time (Left-aligned in column 7 matching Home Page Hero.png) */}
        <div className="col-span-3 flex items-center">
          <span className="text-[0.5556vw] font-semibold tracking-[-0.03em] text-white tabular-nums select-none uppercase">
            {egyptTime || 'EGYPT, 03:48:10 PM GMT'}
          </span>
        </div>

        {/* Column 10 to 12: Contact Us CTA with Underline (Right-aligned in column 12) */}
        <div className="col-span-3 flex items-center justify-end">
          <StaggeredNavButton 
            label="CONTACT US" 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenContact) {
                onOpenContact();
              } else if (onNavigate) {
                onNavigate(activePage === 'works' || activePage === 'project-mms' || activePage === 'project-axis' || activePage === 'project-stephenson' || activePage === 'project-fusion-form' ? 'home' : activePage, 'contact');
              }
            }} 
            hasUnderline={true}
          />
        </div>
      </div>
    </motion.header>
  );
}
