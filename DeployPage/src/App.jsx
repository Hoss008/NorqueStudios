import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import WorksPage from './components/WorksPage';
import MmsProjectPage from './components/projects/MmsProjectPage';
import AxisProjectPage from './components/projects/AxisProjectPage';
import WorksCMSModal from './components/WorksCMSModal';
import AdminAuthModal from './components/AdminAuthModal';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';

let globalIntroHasPlayed = false;

// Helper to determine logical page identifier from URL pathname
function getLogicalPage(pathname) {
  const p = (pathname || '').replace(/\/+$/, '').toLowerCase();
  if (!p || p === '') return 'home';
  if (p === '/about') return 'about';
  if (p === '/projects' || p === '/works') return 'works';
  if (p === '/projects/mms' || p === '/project-mms') return 'project-mms';
  if (p === '/projects/axis' || p === '/project-axis') return 'project-axis';
  return 'home';
}

/* ========================================================================= */
/* ROOT APPLICATION COMPONENT                                                */
/* ========================================================================= */
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = getLogicalPage(location.pathname);

  // If visitor directly hits an inner page (e.g. /projects or /services), skip splash intro
  const isDirectNonHome = typeof window !== 'undefined' && location.pathname !== '/' && location.pathname !== '';
  const [hasIntroPlayed, setHasIntroPlayed] = useState(() => globalIntroHasPlayed || isDirectNonHome);
  const [isIntroStarted, setIsIntroStarted] = useState(() => globalIntroHasPlayed || isDirectNonHome);
  const [isBoxRevealComplete, setIsBoxRevealComplete] = useState(false);
  const [isSplashComplete, setIsSplashComplete] = useState(() => globalIntroHasPlayed || isDirectNonHome);

  /* ─── State Management ─── */
  const [pendingSection, setPendingSection] = useState(null);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [isNavScrollVisible, setIsNavScrollVisible] = useState(true);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('norque_admin_authenticated') === 'true';
  });
  const lenisRef = useRef(null);

  const handleOpenCMS = () => {
    if (isAdminAuthenticated) {
      setIsCmsOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('norque_admin_authenticated');
    setIsAdminAuthenticated(false);
    setIsCmsOpen(false);
  };

  /* ─── Stealth CMS Listeners: Ctrl+Shift+A / Cmd+Shift+A & #admin hash ─── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenCMS();
      }
    };

    const handleHash = () => {
      if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.hash === '#cms')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        handleOpenCMS();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);

    handleHash();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [isAdminAuthenticated]);

  /* ─── Intro Animation Synchronization ─── */
  useEffect(() => {
    if (globalIntroHasPlayed || isDirectNonHome) {
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
    globalIntroHasPlayed = true;
    setIsSplashComplete(true);
  };

  /* ─── Disable scrolling until splash screen finishes on home page ─── */
  useEffect(() => {
    if (isSplashComplete) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      if (lenisRef.current && currentPage !== 'works') {
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
  }, [isSplashComplete, currentPage]);

  /* ======================================================================= */
  /* 3. NAVIGATION & SMOOTH SCROLL (LENIS)                                   */
  /* ======================================================================= */
  const handleNavigate = (targetPage, sectionId = null) => {
    const pageToPath = {
      home: '/',
      about: '/about',
      works: '/projects',
      projects: '/projects',
      'project-mms': '/projects/mms',
      'project-axis': '/projects/axis'
    };

    const targetPath = pageToPath[targetPage] || (targetPage.startsWith('/') ? targetPage : `/${targetPage}`);

    const isCurrent = 
      targetPath === location.pathname || 
      (targetPath === '/projects' && location.pathname === '/works') ||
      (targetPath === '/projects/mms' && location.pathname === '/project-mms') ||
      (targetPath === '/projects/axis' && location.pathname === '/project-axis');

    if (isCurrent) {
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

    // Trigger seamless in-place page transition
    setIsPageTransitioning(true);
    setPendingSection(sectionId);
    navigate(targetPath);
    setIsNavScrollVisible(true);
  };

  // Reset Lenis and document overflow lock for zero-scroll pages
  useEffect(() => {
    if (isPageTransitioning) return;
    if (currentPage === 'works') {
      if (lenisRef.current) lenisRef.current.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.resize();
        if (isSplashComplete) {
          lenisRef.current.start();
        }
      }
    }
  }, [currentPage, isSplashComplete, isPageTransitioning]);

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
    if (!isSplashComplete || currentPage === 'works') {
      lenis.stop();
    }

    let targetBlur = 0;
    let currentBlur = 0;
    let animationFrameId = null;
    let lastScrollY = 0;
    let accumulatedDelta = 0;

    lenis.on('scroll', ({ velocity, scroll }) => {
      const absV = Math.abs(velocity || 0);
      targetBlur = Math.min(absV * 0.22, 3.8);

      const currentScroll = scroll;
      const diff = currentScroll - lastScrollY;

      if (currentScroll <= 15) {
        setIsNavScrollVisible(true);
        accumulatedDelta = 0;
      } else if (diff > 0) {
        accumulatedDelta = Math.max(0, accumulatedDelta) + diff;
        if (accumulatedDelta > 10) {
          setIsNavScrollVisible(false);
        }
      } else if (diff < 0) {
        accumulatedDelta = Math.min(0, accumulatedDelta) + diff;
        if (accumulatedDelta < -8) {
          setIsNavScrollVisible(true);
        }
      }

      lastScrollY = currentScroll;
    });

    function raf(time) {
      lenis.raf(time);

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

  // Handle pending scroll target after page navigation completes
  useEffect(() => {
    if (pendingSection) {
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
  }, [location.pathname, pendingSection]);

  /* ======================================================================= */
  /* MAIN RENDER WITH CINEMATIC PAGE TRANSITIONS                             */
  /* ======================================================================= */
  return (
    <div className={`relative min-h-screen ${
      currentPage === 'project-mms' 
        ? 'bg-[#0a0e17]' 
        : currentPage === 'project-axis' 
          ? 'bg-[#170103]' 
          : 'bg-black'
    } text-white font-beausite selection:bg-white selection:text-black overflow-x-clip`}>
      {/* Initial splash screen on first visit to home page */}
      {!globalIntroHasPlayed && !isDirectNonHome && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Pinned Global Header Navigation (36px = 2.5vw proportional ratio) */}
      <Navbar 
        isPinned={true}
        isVisible={
          (currentPage === 'about' || 
           currentPage === 'works' || 
           currentPage === 'project-mms' || 
           currentPage === 'project-axis' || 
           isBoxRevealComplete) && isNavScrollVisible
        }
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
        {/* Seamless Page Transition: Clean atmospheric crossfade */}
        <AnimatePresence 
          mode="wait"
          onExitComplete={() => {
            if (currentPage === 'home') {
              setIsBoxRevealComplete(false);
            }
            if (currentPage !== 'works') {
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
            }
            window.scrollTo(0, 0);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(0, { immediate: true });
              lenisRef.current.resize();
              if (currentPage !== 'works' && isSplashComplete) {
                lenisRef.current.start();
              }
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
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{ 
              opacity: 0, 
              transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            className="w-full"
          >
            <Routes location={location}>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    onNavigate={handleNavigate} 
                    hasIntroPlayed={hasIntroPlayed}
                    onIntroComplete={handleIntroComplete}
                    onBoxRevealComplete={setIsBoxRevealComplete}
                    onOpenCMS={handleOpenCMS}
                  />
                } 
              />
              <Route 
                path="/about" 
                element={
                  <AboutPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="/projects" 
                element={
                  <WorksPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="/works" 
                element={
                  <WorksPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="/projects/mms" 
                element={
                  <MmsProjectPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="/project-mms" 
                element={
                  <MmsProjectPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="/projects/axis" 
                element={
                  <AxisProjectPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="/project-axis" 
                element={
                  <AxisProjectPage 
                    onNavigate={handleNavigate} 
                    onOpenCMS={handleOpenCMS} 
                  />
                } 
              />
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Admin Authentication Gate ─── */}
      <AdminAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsAuthModalOpen(false);
          setIsCmsOpen(true);
        }}
      />

      {/* ─── Works CMS Portfolio Management Modal ─── */}
      <WorksCMSModal 
        isOpen={isCmsOpen} 
        onClose={() => setIsCmsOpen(false)} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

    </div>
  );
}
