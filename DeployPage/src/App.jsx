import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import WorksPage from './components/WorksPage';
import WorksCMSModal from './components/WorksCMSModal';
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
  const [isSplashComplete, setIsSplashComplete] = useState(globalIntroHasPlayed);
  const [isNavScrollVisible, setIsNavScrollVisible] = useState(true);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
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

  const handleSplashComplete = () => {
    setIsSplashComplete(true);
  };

  /* ─── Disable scrolling until splash screen finishes and hero is visible ─── */
  useEffect(() => {
    if (isSplashComplete) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.start();
      }
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.stop();
    }

    const preventScroll = (e) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });

    const fallbackTimer = setTimeout(() => {
      setIsSplashComplete(true);
    }, 3200);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
      clearTimeout(fallbackTimer);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isSplashComplete]);

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
    setIsNavScrollVisible(true);
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
    if (!isSplashComplete) {
      lenis.stop();
    }

    let targetBlur = 0;
    let currentBlur = 0;
    let animationFrameId = null;
    let lastScrollY = 0;
    let accumulatedDelta = 0;

    lenis.on('scroll', ({ velocity, scroll }) => {
      // Map scroll velocity to an intensified vertical blur (clamped up to 3.8px)
      const absV = Math.abs(velocity || 0);
      targetBlur = Math.min(absV * 0.22, 3.8);

      const currentScroll = scroll;
      const diff = currentScroll - lastScrollY;

      if (currentScroll <= 15) {
        setIsNavScrollVisible(true);
        accumulatedDelta = 0;
      } else if (diff > 0) {
        // Scrolling down: hide when accumulated downward movement exceeds 10px
        accumulatedDelta = Math.max(0, accumulatedDelta) + diff;
        if (accumulatedDelta > 10) {
          setIsNavScrollVisible(false);
        }
      } else if (diff < 0) {
        // Scrolling up a tiny bit: reappear when upward movement exceeds 8px
        accumulatedDelta = Math.min(0, accumulatedDelta) + diff;
        if (accumulatedDelta < -8) {
          setIsNavScrollVisible(true);
        }
      }

      lastScrollY = currentScroll;
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
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [currentPage, pendingSection]);

  // Handle Lenis and document overflow lock for no-scroll pages (e.g. Works page)
  useEffect(() => {
    if (currentPage === 'works') {
      if (lenisRef.current) lenisRef.current.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else if (isSplashComplete) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [currentPage, isSplashComplete]);

  /* ======================================================================= */
  /* MAIN RENDER WITH CINEMATIC PAGE TRANSITIONS                             */
  /* ======================================================================= */
  return (
    <div className="relative min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* Initial splash screen on page load */}
      {!globalIntroHasPlayed && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Pinned Global Header Navigation (36px = 2.5vw proportional ratio) */}
      <Navbar 
        isPinned={true}
        isVisible={(currentPage === 'about' || currentPage === 'works' || isBoxRevealComplete) && isNavScrollVisible}
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
          <filter id="scroll-motion-blur" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur id="scroll-motion-blur-fe" in="SourceGraphic" stdDeviation="0 0" edgeMode="duplicate" />
          </filter>
        </defs>
      </svg>

      {/* ─── Page Content (Excludes Pinned Navbar and Pinned GIF) ─── */}
      <main className="w-full">
        {/* Seamless Page Transition: Increased duration for cinematic, atmospheric crossfade */}
        <AnimatePresence 
          mode="wait"
          onExitComplete={() => {
            window.scrollTo(0, 0);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(0, { immediate: true });
            }
            setIsNavScrollVisible(true);
            setIsPageTransitioning(false);
          }}
        >
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              transition: {
                duration: 0.65,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{ 
              opacity: 0, 
              transition: {
                duration: 0.65,
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
                onOpenCMS={() => setIsCmsOpen(true)}
              />
            ) : currentPage === 'works' ? (
              <WorksPage 
                onNavigate={handleNavigate} 
                onOpenCMS={() => setIsCmsOpen(true)} 
              />
            ) : (
              <AboutPage 
                onNavigate={handleNavigate} 
                onOpenCMS={() => setIsCmsOpen(true)} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Works CMS Portfolio Management Modal ─── */}
      <WorksCMSModal 
        isOpen={isCmsOpen} 
        onClose={() => setIsCmsOpen(false)} 
        onNavigate={handleNavigate}
      />

    </div>
  );
}
