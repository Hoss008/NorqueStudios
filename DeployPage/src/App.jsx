import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';

let globalIntroHasPlayed = false;

/* ========================================================================= */
/* ROOT APPLICATION COMPONENT                                                */
/* ========================================================================= */
export default function App() {
  /* ─── State Management ─── */
  const [currentPage, setCurrentPage] = useState('home');
  const [pendingSection, setPendingSection] = useState(null);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(globalIntroHasPlayed);
  const [isIntroStarted, setIsIntroStarted] = useState(globalIntroHasPlayed);
  const [isBoxRevealComplete, setIsBoxRevealComplete] = useState(false);
  const lenisRef = useRef(null);

  /* ─── Intro Animation Synchronization ─── */
  useEffect(() => {
    if (globalIntroHasPlayed) {
      setIsIntroStarted(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsIntroStarted(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    globalIntroHasPlayed = true;
    setHasIntroPlayed(true);
  };

  /* ======================================================================= */
  /* 3. NAVIGATION & SMOOTH SCROLL (LENIS)                                   */
  /* ======================================================================= */
  const handleNavigate = (targetPage, sectionId = null) => {
    if (targetPage === currentPage) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 1 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    // When switching pages, trigger seamless in-place fade out without scroll jumps
    setIsPageTransitioning(true);
    setPendingSection(sectionId);
    setCurrentPage(targetPage);
  };

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh/mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Lenis Smooth Scroll with velocity-driven vertical motion blur
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenis.scrollTo(0, { immediate: true });
    lenisRef.current = lenis;

    let targetBlur = 0;
    let currentBlur = 0;
    let animationFrameId = null;

    lenis.on('scroll', ({ velocity }) => {
      // Map scroll velocity to an intensified vertical blur (clamped up to 3.8px)
      const absV = Math.abs(velocity || 0);
      targetBlur = Math.min(absV * 0.22, 3.8);
    });

    function raf(time) {
      lenis.raf(time);

      // Smooth lerp decay for organic, filmic shutter motion blur
      currentBlur += (targetBlur - currentBlur) * 0.28;
      targetBlur *= 0.92;

      const feBlur = document.getElementById('scroll-motion-blur-fe');

      if (feBlur) {
        if (currentBlur > 0.08) {
          feBlur.setAttribute('stdDeviation', `0 ${currentBlur.toFixed(2)}`);
          if (!document.body.classList.contains('is-scrolling')) {
            document.body.classList.add('is-scrolling');
          }
        } else if (document.body.classList.contains('is-scrolling')) {
          document.body.classList.remove('is-scrolling');
          feBlur.setAttribute('stdDeviation', '0 0');
          currentBlur = 0;
          targetBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('is-scrolling');
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle pending scroll target after page transition completes
  useEffect(() => {
    if (currentPage === 'home' && pendingSection) {
      const timer = setTimeout(() => {
        const el = document.getElementById(pendingSection);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setPendingSection(null);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [currentPage, pendingSection]);

  /* ======================================================================= */
  /* MAIN RENDER WITH CINEMATIC PAGE TRANSITIONS                             */
  /* ======================================================================= */
  return (
    <div className="relative min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* Initial splash screen on page load */}
      <SplashScreen />

      {/* Pinned Global Header Navigation (36px = 2.5vw proportional ratio) */}
      <Navbar 
        isPinned={true}
        isVisible={currentPage === 'about' || isBoxRevealComplete}
        isIntroStarted={true}
        activePage={currentPage} 
        onNavigate={handleNavigate}
        isPageTransitioning={isPageTransitioning}
      />

      {/* ─── Directional Vertical Motion Blur Filter Definition ─── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
      >
        <defs>
          <filter id="scroll-motion-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur id="scroll-motion-blur-fe" in="SourceGraphic" stdDeviation="0 0" />
          </filter>
        </defs>
      </svg>

      {/* ─── Page Content (Excludes Pinned Navbar and Pinned GIF) ─── */}
      <main className="w-full">
        {/* Seamless Page Transition: Opacity-only crossfade (no scale distortion) */}
        <AnimatePresence 
          mode="wait"
          onExitComplete={() => {
            window.scrollTo(0, 0);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(0, { immediate: true });
            }
            setIsPageTransitioning(false);
          }}
        >
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              transition: {
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{ 
              opacity: 0, 
              transition: {
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            className="w-full"
          >
            {currentPage === 'home' ? (
              <HomePage 
                onNavigate={handleNavigate} 
                hasIntroPlayed={hasIntroPlayed}
                onIntroComplete={handleIntroComplete}
                onBoxRevealComplete={setIsBoxRevealComplete}
              />
            ) : (
              <AboutPage onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
