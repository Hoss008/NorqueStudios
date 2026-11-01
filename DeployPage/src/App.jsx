import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import MuteButton from './components/MuteButton';

/* ========================================================================= */
/* 1. AUDIO ENGINE & GLOBAL SINGLETONS                                       */
/* ========================================================================= */
// Persistent across StrictMode remounts and seamless page transitions
let introAudioInstance = null;
let introAudioHasStarted = false;
let globalIntroHasPlayed = false;

function playIntroAudio(isMuted = false) {
  if (introAudioHasStarted) return;
  if (!introAudioInstance) {
    const base = import.meta.env.BASE_URL || './';
    introAudioInstance = new Audio(encodeURI(`${base}audio/SFX Norque.mp3`));
    introAudioInstance.loop = false;
    introAudioInstance.volume = 0.25; // Subtle and atmospheric, but clearly listenable
  }
  introAudioInstance.muted = isMuted;
  if (introAudioInstance.paused && !introAudioHasStarted) {
    introAudioInstance.play().then(() => {
      introAudioHasStarted = true;
    }).catch(() => {});
  }
}

/* ========================================================================= */
/* 2. ROOT APPLICATION COMPONENT                                             */
/* ========================================================================= */
export default function App() {
  /* ─── State Management ─── */
  const [currentPage, setCurrentPage] = useState('home');
  const [pendingSection, setPendingSection] = useState(null);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(globalIntroHasPlayed);
  const [isIntroStarted, setIsIntroStarted] = useState(globalIntroHasPlayed);
  const [isBoxRevealComplete, setIsBoxRevealComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
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

  /* ─── Audio Handlers ─── */
  const handleIntroComplete = () => {
    globalIntroHasPlayed = true;
    setHasIntroPlayed(true);
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      if (introAudioInstance) {
        introAudioInstance.muted = next;
      }
      return next;
    });
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
  /* 4. SOUND EFFECTS & INTERACTION TRIGGERS                                 */
  /* ======================================================================= */
  // Ambience SFX: Play "SFX Norque.mp3" on page load/unlock
  useEffect(() => {
    playIntroAudio(isMutedRef.current);

    const handleInitialUnlock = (e) => {
      if (introAudioHasStarted) return;
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isButtonOrLink = Boolean(
        target.closest('button, a, [role="button"], input[type="button"], input[type="submit"], .cursor-pointer, [class*="cursor-pointer"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      // Only trigger intro audio if clicking non-button areas
      if (!isButtonOrLink && introAudioInstance && introAudioInstance.paused && !introAudioHasStarted) {
        introAudioInstance.muted = isMutedRef.current;
        introAudioInstance.play().then(() => {
          introAudioHasStarted = true;
          window.removeEventListener('pointerdown', handleInitialUnlock);
        }).catch(() => {});
      }
    };

    window.addEventListener('pointerdown', handleInitialUnlock, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleInitialUnlock);
    };
  }, []);

  // Click SFX: Play "SFX Norque_2.mp3" strictly on interactive UI clicks
  useEffect(() => {
    const base = import.meta.env.BASE_URL || './';
    const clickAudio = new Audio(encodeURI(`${base}audio/SFX Norque_2.mp3`));
    clickAudio.loop = false;

    const handleClick = (e) => {
      // Prevent sound if user was dragging/scrolling a carousel
      if (window.__norqueCarouselDragged) return;

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive = Boolean(
        target.closest('button, a, [role="button"], input[type="button"], input[type="submit"], .cursor-pointer, [class*="cursor-pointer"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      if (isInteractive) {
        const sound = clickAudio.cloneNode();
        sound.loop = false;
        sound.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  /* ======================================================================= */
  /* 5. MAIN RENDER WITH CINEMATIC PAGE TRANSITIONS                          */
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

      {/* ─── Page Content (Excludes Pinned Navbar, Pinned GIF & Mute Button) ─── */}
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

      {/* Floating persistent Mute Button with Liquid Glass optical behavior */}
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
    </div>
  );
}
