import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const ServicesPage = React.lazy(() => import('./components/ServicesPage'));
const WorksPage = React.lazy(() => import('./components/WorksPage'));
const MmsProjectPage = React.lazy(() => import('./components/projects/MmsProjectPage'));
const AxisProjectPage = React.lazy(() => import('./components/projects/AxisProjectPage'));
const StephensonProjectPage = React.lazy(() => import('./components/projects/StephensonProjectPage'));
const FusionFormProjectPage = React.lazy(() => import('./components/projects/FusionFormProjectPage'));
const WorksCMSModal = React.lazy(() => import('./components/WorksCMSModal'));
const AdminAuthModal = React.lazy(() => import('./components/AdminAuthModal'));
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import PhoneNotice from './components/PhoneNotice';
import ContactTab from './components/ContactTab';

let globalIntroHasPlayed = false;

// Helper to detect if device or viewport is a mobile phone
function checkIsPhone() {
  if (typeof window === 'undefined') return false;
  const isMobileUA = /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth < 768;
  return isMobileUA || isSmallScreen;
}

// Helper to determine logical page identifier from URL pathname
function getLogicalPage(pathname) {
  const p = (pathname || '').replace(/\/+$/, '').toLowerCase();
  if (!p || p === '') return 'home';
  if (p === '/about') return 'about';
  if (p === '/services') return 'services';
  if (p === '/projects' || p === '/works') return 'works';
  if (p === '/projects/mms' || p === '/project-mms') return 'project-mms';
  if (p === '/projects/axis' || p === '/project-axis') return 'project-axis';
  if (p === '/projects/stephenson' || p === '/project-stephenson') return 'project-stephenson';
  if (p === '/projects/fusion-form' || p === '/project-fusion-form' || p === '/projects/fusion') return 'project-fusion-form';
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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('norque_admin_authenticated') === 'true';
  });
  const lenisRef = useRef(null);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

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

  /* ─── Pause page smooth-scroll when CMS or Auth modal is active ─── */
  useEffect(() => {
    if (isCmsOpen || isAuthModalOpen) {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      if (lenisRef.current && currentPage !== 'works' && isSplashComplete) {
        lenisRef.current.start();
      }
    }
  }, [isCmsOpen, isAuthModalOpen, currentPage, isSplashComplete]);

  /* ─── Hash Listeners: #contact & #admin/#cms ─── */
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === 'undefined') return;
      if (window.location.hash === '#contact') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        setIsContactOpen(true);
      } else if (window.location.hash === '#admin' || window.location.hash === '#cms') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        handleOpenCMS();
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, [isAdminAuthenticated]);

  /* ─── Scroll Locking when Contact Tab is Open ─── */
  useEffect(() => {
    if (isContactOpen) {
      if (lenisRef.current) lenisRef.current.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      if (currentPage !== 'works') {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        if (lenisRef.current && isSplashComplete) {
          lenisRef.current.start();
        }
      }
    }
  }, [isContactOpen, currentPage, isSplashComplete]);

  /* ─── Stealth CMS Listeners: Ctrl+Shift+A / Cmd+Shift+A ─── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenCMS();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  /* ─── Idle Route Preloading: Download secondary routes after initial load ─── */
  useEffect(() => {
    const preload = () => {
      import('./components/AboutPage');
      import('./components/ServicesPage');
      import('./components/WorksPage');
      import('./components/projects/MmsProjectPage');
      import('./components/projects/AxisProjectPage');
      import('./components/projects/StephensonProjectPage');
      import('./components/projects/FusionFormProjectPage');
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload);
    } else {
      setTimeout(preload, 2500);
    }
  }, []);

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
      services: '/services',
      works: '/projects',
      projects: '/projects',
      'project-mms': '/projects/mms',
      'project-axis': '/projects/axis',
      'project-stephenson': '/projects/stephenson',
      'project-fusion-form': '/projects/fusion-form'
    };

    const targetPath = pageToPath[targetPage] || (targetPage.startsWith('/') ? targetPage : `/${targetPage}`);

    const isCurrent = 
      targetPath === location.pathname || 
      (targetPath === '/services' && location.pathname === '/services') ||
      (targetPath === '/projects' && location.pathname === '/works') ||
      (targetPath === '/projects/mms' && location.pathname === '/project-mms') ||
      (targetPath === '/projects/axis' && location.pathname === '/project-axis') ||
      (targetPath === '/projects/stephenson' && location.pathname === '/project-stephenson') ||
      (targetPath === '/projects/fusion-form' && (location.pathname === '/project-fusion-form' || location.pathname === '/projects/fusion'));

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
    window.lenis = lenis;
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
      window.lenis = null;
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

  /* ─── Mobile Phone Gate State ─── */
  const [isPhone, setIsPhone] = useState(checkIsPhone);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(checkIsPhone());
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isPhone) {
      if (lenisRef.current) lenisRef.current.stop();
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }, [isPhone]);

  /* ======================================================================= */
  /* MAIN RENDER WITH CINEMATIC PAGE TRANSITIONS                             */
  /* ======================================================================= */
  if (isPhone) {
    return <PhoneNotice />;
  }

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
        key={currentPage}
        isPinned={true}
        isVisible={
          (currentPage === 'home'
            ? (isIntroStarted || hasIntroPlayed)
            : true) && isNavScrollVisible
        }
        isIntroStarted={true}
        activePage={currentPage} 
        onNavigate={handleNavigate}
        onOpenContact={handleOpenContact}
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
            <React.Suspense fallback={<div className="w-full min-h-screen bg-black" />}>
              <Routes location={location}>
                <Route 
                  path="/" 
                  element={
                    <HomePage 
                      onNavigate={handleNavigate} 
                      onOpenContact={handleOpenContact}
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
                      onOpenContact={handleOpenContact}
                      onOpenCMS={handleOpenCMS} 
                    />
                  } 
                />
                <Route 
                  path="/services" 
                  element={
                    <ServicesPage 
                      onNavigate={handleNavigate} 
                      onOpenContact={handleOpenContact}
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
                  path="/projects/stephenson" 
                  element={
                    <StephensonProjectPage 
                      onNavigate={handleNavigate} 
                      onOpenCMS={handleOpenCMS} 
                    />
                  } 
                />
                <Route 
                  path="/project-stephenson" 
                  element={
                    <StephensonProjectPage 
                      onNavigate={handleNavigate} 
                      onOpenCMS={handleOpenCMS} 
                    />
                  } 
                />
                <Route 
                  path="/projects/fusion-form" 
                  element={
                    <FusionFormProjectPage 
                      onNavigate={handleNavigate} 
                      onOpenCMS={handleOpenCMS} 
                    />
                  } 
                />
                <Route 
                  path="/project-fusion-form" 
                  element={
                    <FusionFormProjectPage 
                      onNavigate={handleNavigate} 
                      onOpenCMS={handleOpenCMS} 
                    />
                  } 
                />
                <Route 
                  path="/projects/fusion" 
                  element={
                    <FusionFormProjectPage 
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
            </React.Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Admin Authentication Gate ─── */}
      {isAuthModalOpen && (
        <React.Suspense fallback={null}>
          <AdminAuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            onSuccess={() => {
              setIsAdminAuthenticated(true);
              setIsAuthModalOpen(false);
              setIsCmsOpen(true);
            }}
          />
        </React.Suspense>
      )}

      {/* ─── Works CMS Portfolio Management Modal ─── */}
      {isCmsOpen && (
        <React.Suspense fallback={null}>
          <WorksCMSModal 
            isOpen={isCmsOpen} 
            onClose={() => setIsCmsOpen(false)} 
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        </React.Suspense>
      )}

      {/* ─── Global Sliding Contact Us Side Tab ─── */}
      <ContactTab 
        isOpen={isContactOpen} 
        onClose={handleCloseContact} 
      />

    </div>
  );
}
