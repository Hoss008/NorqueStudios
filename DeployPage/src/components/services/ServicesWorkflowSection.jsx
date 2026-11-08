import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORKFLOW_STEPS = [
  {
    number: '(01)',
    title: 'Discovery Call',
    description: 'An independent creative studio built around design, digital experiences and the ideas that connect them. We work with brands, businesses and people who care about how things look, feel and exist in the real world.',
    lines: [
      'An independent creative studio built around design, digital',
      'experiences and the ideas that connect them. We work with',
      'brands, businesses and people who care about how things look,',
      'feel and exist in the real world.'
    ],
    media: '/images/services/4790c2cbcd7b54c241fb7736e773d86d89980a7c.png',
    bg: '/images/services/efcfef54d9efebe1ff712ebb452895ef316778ca.png'
  },
  {
    number: '(02)',
    title: 'Strategy Planning',
    description: 'We dissect core goals, target audiences, and market whitespace to establish a definitive creative brief. Every subsequent design decision is anchored in strategic clarity and measurable impact.',
    lines: [
      'We dissect core goals, target audiences, and market whitespace to',
      'establish a definitive creative brief. Every subsequent design',
      'decision is anchored in strategic clarity and measurable impact.'
    ],
    media: '/images/services/31a01b8b963d7135d022516caec5893950da23e8.png',
    bg: '/images/services/31a01b8b963d7135d022516caec5893950da23e8.png'
  },
  {
    number: '(03)',
    title: 'Bespoke Architecture',
    description: 'Crafting bespoke digital layouts, wireframes, and design architectures. We establish tactile interaction models and typography hierarchies that elevate the user journey.',
    lines: [
      'Crafting bespoke digital layouts, wireframes, and design',
      'architectures. We establish tactile interaction models and',
      'typography hierarchies that elevate the user journey.'
    ],
    media: '/images/services/e8d8bb69c86062580e6ea2e9b569463105084b86.png',
    bg: '/images/services/e8d8bb69c86062580e6ea2e9b569463105084b86.png'
  },
  {
    number: '(04)',
    title: 'Execution',
    description: 'Bringing wireframes and prototypes to life with production-grade precision. High-performance code, fluid motion transitions, and pixel-perfect design-to-development fidelity.',
    lines: [
      'Bringing wireframes and prototypes to life with production-grade',
      'precision. High-performance code, fluid motion transitions, and',
      'pixel-perfect design-to-development fidelity.'
    ],
    media: '/images/services/eb6d207b88fd65f90291715af2625e9e9808fc49.png',
    bg: '/images/services/eb6d207b88fd65f90291715af2625e9e9808fc49.png'
  },
  {
    number: '(05)',
    title: 'Project Handover',
    description: 'Seamless handover of production assets, design systems, style guides, and clean repository code. We ensure your team is empowered to scale and maintain the product effortlessly.',
    lines: [
      'Seamless handover of production assets, design systems, style',
      'guides, and clean repository code. We ensure your team is',
      'empowered to scale and maintain the product effortlessly.'
    ],
    media: '/images/services/bef77eb0ee5df99230996515e2cc1941c59c92e0.png',
    bg: '/images/services/bef77eb0ee5df99230996515e2cc1941c59c92e0.png'
  }
];

// ─── WORKFLOW SECTION CONFIGURATION ─────────────────────────────────────────
// Adjust the background image opacity here (0.0 to 1.0):
export const WORKFLOW_BG_OPACITY = 0.1;
// Adjust the background parallax speed here (higher = more movement):
export const WORKFLOW_PARALLAX_SPEED = 0.3;

export default function ServicesWorkflowSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openStep, setOpenStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgParallaxY, setBgParallaxY] = useState(0);

  const activeStepRef = useRef(0);
  const openStepRef = useRef(0);
  openStepRef.current = openStep;
  const isAutoScrollingRef = useRef(false);
  const autoScrollTimeoutRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const isCooldownRef = useRef(false);
  const cooldownTimerRef = useRef(null);

  // Transition from current option to next option:
  // Previous option finishes its exit animation before next option opens
  const switchStep = (newIdx) => {
    if (newIdx === activeStepRef.current) return;
    const cur = activeStepRef.current;
    const dir = newIdx > cur ? 1 : -1;
    setDirection(dir);
    setPrevStep(cur);
    activeStepRef.current = newIdx;
    setActiveStep(newIdx);

    // Close the current option first
    setOpenStep(null);

    // Safety fallback in case onExitComplete is interrupted
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = setTimeout(() => {
      setOpenStep(newIdx);
    }, 450);
  };

  const handleExitComplete = () => {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    setOpenStep(activeStepRef.current);
  };

  // Jump to specific step
  const handleStepClick = (index) => {
    if (!containerRef.current) return;
    if (index === activeStepRef.current) return;

    switchStep(index);

    const rect = containerRef.current.getBoundingClientRect();
    const docTop = rect.top + window.scrollY;
    const totalDist = containerRef.current.offsetHeight - window.innerHeight;
    const stepProgress = (index + 0.5) / WORKFLOW_STEPS.length;
    const targetTop = docTop + stepProgress * totalDist;

    isAutoScrollingRef.current = true;
    if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    autoScrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 1200);

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(targetTop, {
        duration: 0.8,
        onComplete: () => {
          isAutoScrollingRef.current = false;
        }
      });
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  };

  // Normal scroll: single wheel notch or swipe transitions directly to next option
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    let wheelAcc = 0;

    const onWheel = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Locked when section fills the viewport
      const isLocked = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!isLocked) return;

      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const cur = activeStepRef.current;

      // Reaching final step downwards: release scroll to continue to next section
      if (cur >= WORKFLOW_STEPS.length - 1 && delta > 0) {
        return;
      }

      // Reaching first step upwards: release scroll to continue to hero section
      if (cur <= 0 && delta < 0) {
        return;
      }

      // Inside workflow options: scroll only transitions the options
      e.preventDefault();
      e.stopPropagation();

      if (isCooldownRef.current) return;

      wheelAcc += delta;

      // Normal scroll threshold: 45px (one standard wheel notch or light trackpad scroll)
      if (Math.abs(wheelAcc) >= 45) {
        const nextIdx = wheelAcc > 0 ? cur + 1 : cur - 1;
        wheelAcc = 0;

        if (nextIdx >= 0 && nextIdx < WORKFLOW_STEPS.length) {
          isCooldownRef.current = true;
          if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
          cooldownTimerRef.current = setTimeout(() => {
            isCooldownRef.current = false;
          }, 450);

          handleStepClick(nextIdx);
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  // Monitor scroll progress across the pinned container for background parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Continuous parallax: active even before the section is 100% in viewport
      // When scrolling down, rect.top decreases -> bgParallaxY decreases (background moves UP)
      // When scrolling up, rect.top increases -> bgParallaxY increases (background moves DOWN)
      const parallax = (rect.top - window.innerHeight * 0.25) * WORKFLOW_PARALLAX_SPEED;
      setBgParallaxY(parallax);

      const totalDist = containerRef.current.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(progress);

      if (isAutoScrollingRef.current) return;

      const stepIdx = Math.min(
        WORKFLOW_STEPS.length - 1,
        Math.max(0, Math.floor(progress * WORKFLOW_STEPS.length))
      );

      if (stepIdx !== activeStepRef.current) {
        switchStep(stepIdx);
      }
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
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  // Preload all workflow background and media assets for instantaneous cross-dissolves
  useEffect(() => {
    WORKFLOW_STEPS.forEach((s) => {
      if (s.bg) {
        const img = new Image();
        img.src = s.bg;
      }
      if (s.media) {
        const m = new Image();
        m.src = s.media;
      }
    });
  }, []);

  const activeStepData = WORKFLOW_STEPS[activeStep];
  const displayedStep = openStep ?? prevStep;
  const currentStepData = WORKFLOW_STEPS[displayedStep];
  const prevStepData = WORKFLOW_STEPS[prevStep];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-black text-white"
    >
      {/* Sticky Viewport Container: Locks when 100% of viewport height */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-[0.8333vw] py-[2.5vw] z-10 select-none"
      >
        
        {/* Full-Section Ambient Background: Previews active step media with cross-dissolve & parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            className="absolute inset-0 w-full h-[135%] -top-[17.5%]"
            style={{
              transform: `translate3d(0, ${bgParallaxY}px, 0)`
            }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={activeStepData.bg}
                src={activeStepData.bg}
                alt="Section Background"
                initial={{ opacity: 0 }}
                animate={{ opacity: WORKFLOW_BG_OPACITY }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.315, -0.011, 0, 0.986] }}
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />
            </AnimatePresence>
          </motion.div>
      
          
        </div>

        {/* Section Header Title */}
        <div className="w-full flex items-center justify-between z-10">
          <h2 className="text-[3.1944vw] font-semibold tracking-[-0.03em] leading-none text-white">
            NORQUE’s WORKFLOW
          </h2>
        </div>

        {/* Section Body: Divided into Left Side (Steps on Column 3) & Right Side (Media Preview on Column 7) */}
        <div className="w-full grid grid-cols-12 gap-[0.8333vw] items-center flex-1 z-10 my-[1.5vw]">
          
          {/* Left Side: Interactive Step List starting at Column 3 (spans Columns 3, 4, 5, 6) */}
          <div className="col-start-3 col-span-4 flex flex-col justify-center space-y-[0.5vw]">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.title}
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col cursor-pointer transition-opacity duration-300 group"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  {/* Step Header */}
                  <div className="flex items-baseline space-x-[0.6vw]">
                    <span className="text-[1.5278vw] font-semibold tracking-[-0.03em] text-white">
                      {step.number} {step.title}
                    </span>
                  </div>

                  {/* Expandable Paragraph beneath active step */}
                  <AnimatePresence onExitComplete={handleExitComplete}>
                    {openStep === idx && (
                      <motion.div
                        key={step.title}
                        initial={{ height: 0, opacity: 1 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.45, ease: [0.315, -0.011, 0, 0.986] },
                            opacity: { duration: 0.35, delay: 0.1 }
                          }
                        }}
                        exit={{
                          height: 0,
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.315, -0.011, 0, 0.986] },
                            opacity: { duration: 0.2 }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-[0.2vw] pb-[0.5vw] max-w-[28vw] flex flex-col space-y-[0.1vw]">
                          {/* Masked stagger animation by line in direction of next step (top/bottom) */}
                          {(step.lines || [step.description]).map((line, lineIdx) => {
                            const lineCount = (step.lines || [step.description]).length;
                            const staggerIdx = direction > 0 ? lineIdx : (lineCount - 1 - lineIdx);
                            return (
                              <div key={lineIdx} className="overflow-hidden pb-[0.08em] -mb-[0.08em] block">
                                <motion.div
                                  initial={{
                                    y: direction > 0 ? '105%' : '-105%',
                                    opacity: 1
                                  }}
                                  animate={{
                                    y: '0%',
                                    opacity: 1,
                                    transition: {
                                      duration: 0.55,
                                      ease: [0.315, -0.011, 0, 0.986],
                                      delay: 0.15 + staggerIdx * 0.035
                                    }
                                  }}
                                  exit={{
                                    y: direction > 0 ? '-105%' : '105%',
                                    opacity: 1,
                                    transition: {
                                      duration: 0.35,
                                      ease: [0.315, -0.011, 0, 0.986],
                                      delay: staggerIdx * 0.02
                                    }
                                  }}
                                  className="text-[0.8333vw] font-normal leading-[1] text-white/80 tracking-[-0.03em] whitespace-nowrap block"
                                >
                                  {line}
                                </motion.div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Side: Media Preview on Column 7 (spans Columns 7 to 12) */}
          <div className="col-start-7 col-span-6 flex items-center justify-center relative">
            {/* Outer Frame (Rectangle 39) */}
            {/* <div className="w-[36.65vw] h-[27.12vw] rounded-[0.416vw] border border-white/10 ]  flex items-center justify-center p-[1.5vw] shadow-2xl relative overflow-hidden"> */}
              
              {/* Inner Media Viewport (Preview) */}
              <div className="w-[30.92vw] h-[22.18vw] rounded-[0.278vw] relative overflow-hidden bg-black/60 shadow-inner">
                {/* Previous Media Underneath */}
                {prevStep !== displayedStep && (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={prevStepData.media}
                      alt={prevStepData.title}
                      className="w-full h-full object-cover rounded-[0.278vw]"
                    />
                  </div>
                )}

                {/* New Media Overlapping and Scaling Up from 0% to 100% */}
                <AnimatePresence>
                  <motion.div
                    key={currentStepData.media}
                    className="absolute inset-0 w-full h-full origin-center"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.85,
                        ease: [1, 0.03, 0, 0.976]
                      }
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src={currentStepData.media}
                      alt={currentStepData.title}
                      className="w-full h-full object-cover rounded-[0.278vw]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

        

      {/* </div> */}
    </section>
  );
}
