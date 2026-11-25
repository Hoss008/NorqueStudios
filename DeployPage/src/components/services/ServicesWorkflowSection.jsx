import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createGestureWheelStepper, normalizeWheelDelta } from '../../utils/wheelStepper';
import './ServicesMobile.css';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/* ========================================================================= */
/* NORQUE WORKFLOW OPTIONS CONFIGURATION ((01) to (05))                      */
/* Format:                                                                   */
/* - title: Option heading (e.g. "Start With Questions")                     */
/* - headline: First line under option (rendered BOLD, animates line 1)      */
/* - body: Array of lines (or multiline string) under headline               */
/*         Animates strictly line by line following the bold headline        */
/* You can edit these texts and line breaks directly below.                  */
/* ========================================================================= */
const WORKFLOW_STEPS = [
  {
    number: '(01)',
    title: 'Start With Questions',
    headline: 'Before we make anything, we make sense of everything.',
    body: [
      'We get to know your business, your ambitions, your audience, and',
      "the challenges you're trying to solve. This is where questions",
      'become clarity and ideas start finding direction.'
    ],
    media: `${base}images/services/workFlow/01.png`,
    bg: `${base}images/services/workFlow/01.png`
  },
  {
    number: '(02)',
    title: 'Find Your Direction',
    headline: 'Good work starts with knowing where to go.',
    body: [
      "We translate what we've learned into a clear strategy, defining the",
      'creative direction, project scope, priorities, and the foundation',
      'that will guide every decision ahead.'
    ],
    media: `${base}images/services/workFlow/02.png`,
    bg: `${base}images/services/workFlow/02.png`
  },
  {
    number: '(03)',
    title: 'Challenge the Obvious',
    headline: 'Where thinking takes its first tangible form.',
    body: [
      'Ideas turn into identities, experiences, interfaces, and visual',
      'systems. We explore, experiment, refine, and challenge the',
      'obvious until everything starts making sense.'
    ],
    media: `${base}images/services/workFlow/03.png`,
    bg: `${base}images/services/workFlow/03.png`
  },
  {
    number: '(04)',
    title: 'Make It Happen',
    headline: 'From what looks right to what works right.',
    body: [
      'We bring the approved direction to life through thoughtful',
      'development and implementation, making sure every detail',
      'performs as beautifully as it presents itself.'
    ],
    media: `${base}images/services/workFlow/04.png`,
    bg: `${base}images/services/workFlow/04.png`
  },
  {
    number: '(05)',
    title: 'Leave It Better',
    headline: "Not just finished. Ready for what's next.",
    body: [
      'We refine, test, prepare, and deliver everything with care.',
      "The result is more than a completed project; it's a foundation",
      'your business can continue building on.'
    ],
    media: `${base}images/services/workFlow/05.png`,
    bg: `${base}images/services/workFlow/05.png`
  }
];

const parseLines = (content) => {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  if (typeof content === 'string') {
    if (content.includes('\n')) {
      return content.split('\n').map((l) => l.trim()).filter(Boolean);
    }
    return [content.trim()];
  }
  return [];
};

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
  const fallbackTimerRef = useRef(null);
  const wheelStepperRef = useRef(null);
  const isLockedRef = useRef(false);
  const unlockedDirectionRef = useRef(null); // 'up' | 'down' | null
  const previousScrollYRef = useRef(0);
  const previousTopRef = useRef(1000);

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

    if (openStepRef.current === null) {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      setOpenStep(newIdx);
    } else {
      // Close the current option first
      setOpenStep(null);

      // Safety fallback in case onExitComplete is interrupted
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = setTimeout(() => {
        setOpenStep(newIdx);
      }, 450);
    }
  };

  const handleExitComplete = () => {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    setOpenStep(activeStepRef.current);
  };

  // Jump to specific step (direct click or wheel notch)
  const handleStepClick = (index) => {
    if (index === activeStepRef.current) return;
    switchStep(index);
  };

  // Wheel interaction:
  // Catches wheel anywhere on screen ONLY when section is locked at 100% of viewport.
  // Unlocks upwards when on option 1 and scrolling up.
  // Unlocks downwards when on option 5 and scrolling down.
  useEffect(() => {
    const stepper = createGestureWheelStepper({
      threshold: 50,
      minCooldownMs: 450,
      settleMs: 140
    });
    wheelStepperRef.current = stepper;

    const unlockPageScroll = (dir) => {
      stepper.reset();
      isLockedRef.current = false;
      unlockedDirectionRef.current = dir;
      previousTopRef.current = dir === 'up' ? 200 : -200;

      if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    };

    const onWheel = (e) => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
      if (!containerRef.current) return;

      // Only intercept if we are locked in 100% of the viewport
      if (!isLockedRef.current) return;

      const delta = normalizeWheelDelta(e);
      const step = stepper.consume(delta);
      const cur = activeStepRef.current;
      const count = WORKFLOW_STEPS.length;

      // 1) On Option 1 and stepping UP, or on Option 5 and stepping DOWN:
      // Release the scroll lock and let Lenis/browser handle the wheel event naturally (no snap/jump)
      if ((cur <= 0 && step < 0) || (cur >= count - 1 && step > 0)) {
        unlockPageScroll(step > 0 ? 'down' : 'up');
        return;
      }

      // Locked in workflow section: prevent native/smooth page scroll
      e.preventDefault();
      e.stopPropagation();

      if (window.lenis && typeof window.lenis.stop === 'function' && !window.lenis.isStopped) {
        window.lenis.stop();
      }

      if (step === 0) return;

      // 2) Within workflow options (0 to count - 1): advance exactly 1 option
      const nextIdx = cur + step;
      if (nextIdx >= 0 && nextIdx < count) {
        handleStepClick(nextIdx);
      }
    };

    // Capture phase ensures unlock calls lenis.start() before Lenis's bubble-phase wheel listener runs
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      stepper.destroy();
      wheelStepperRef.current = null;
      if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    };
  }, []);

  // Monitor scroll progress across the container for background parallax and 100% viewport detection
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const scrollDir = currentScrollY >= previousScrollYRef.current ? 'down' : 'up';
      previousScrollYRef.current = currentScrollY;

      // Continuous parallax
      const parallax = (rect.top - window.innerHeight * 0.25) * WORKFLOW_PARALLAX_SPEED;
      setBgParallaxY(parallax);

      // If we recently unlocked in a direction, wait until scroll moves past a small buffer
      // away from 0 before allowing re-lock, and sync previousTopRef so crossing checks stay accurate
      if (unlockedDirectionRef.current === 'up' || unlockedDirectionRef.current === 'down') {
        if (Math.abs(rect.top) > 10) {
          unlockedDirectionRef.current = null;
          previousTopRef.current = rect.top;
        }
        return;
      }

      // Check whether the section has actually reached 100% of the viewport (rect.top crossed 0)
      // Section is h-screen, so offsetHeight === window.innerHeight
      const enteredFromAbove =
        previousTopRef.current > 0 && rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5;
      const enteredFromBelow =
        previousTopRef.current < 0 && rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
      const isExactlyAligned = Math.abs(rect.top) <= 1;
      const is100Percent = isExactlyAligned || enteredFromAbove || enteredFromBelow;

      if (is100Percent) {
        if (!isLockedRef.current) {
          isLockedRef.current = true;
          const enteringFromAbove = enteredFromAbove || (!enteredFromBelow && (scrollDir === 'down' || previousTopRef.current > 0));
          const enteringFromBelow = enteredFromBelow || (!enteredFromAbove && (scrollDir === 'up' || previousTopRef.current < 0));

          // Lock wheel stepper briefly on arrival so page-scroll inertia settles on entry step
          wheelStepperRef.current?.lock(350, enteringFromAbove ? 1 : -1);

          // Determine entry step:
          // Entering from above: start at Option 1 (0)
          // Entering from below: start at Option 5 (count - 1)
          if (enteringFromAbove && activeStepRef.current !== 0) {
            switchStep(0);
          } else if (enteringFromBelow && activeStepRef.current !== WORKFLOW_STEPS.length - 1) {
            switchStep(WORKFLOW_STEPS.length - 1);
          }

          // Stop Lenis smooth scroll while locked
          if (window.lenis && typeof window.lenis.stop === 'function') {
            window.lenis.stop();
          }

          // Align flush to section top if scroll overshot 0 by a few pixels in this frame
          if (Math.abs(rect.top) > 0.5) {
            const docTop = containerRef.current.offsetTop;
            window.scrollTo({ top: docTop, behavior: 'instant' });
            if (window.lenis && typeof window.lenis.scrollTo === 'function') {
              window.lenis.scrollTo(docTop, { immediate: true });
            }
          }
        }
      } else {
        // Outside 100% of viewport
        previousTopRef.current = rect.top;
        if (isLockedRef.current) {
          isLockedRef.current = false;
          wheelStepperRef.current?.reset();
        }
        if (window.lenis && typeof window.lenis.start === 'function' && window.lenis.isStopped) {
          window.lenis.start();
        }
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
      if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
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
      className="services-workflow-section relative w-full h-screen bg-black text-white overflow-hidden"
    >
      {/* Viewport Container: Locks when 100% of viewport height */}
      <div
        ref={stickyRef}
        className="services-workflow-sticky relative h-screen w-full overflow-hidden flex flex-col justify-between px-[0.8333vw] py-[2.5vw] z-10 select-none"
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
          <h2 className="services-workflow-title text-[3.1944vw] font-semibold tracking-[-0.03em] leading-none text-white">
            NORQUE’s WORKFLOW
          </h2>
        </div>

        {/* Section Body: Divided into Left Side (Steps on Column 3) & Right Side (Media Preview on Column 7) */}
        <div className="services-workflow-grid w-full grid grid-cols-12 gap-[0.8333vw] items-center flex-1 z-10 my-[1.5vw]">
          
          {/* Left Side: Interactive Step List starting at Column 3 (spans Columns 3, 4, 5, 6) */}
          <div className="services-workflow-steps col-start-3 col-span-4 flex flex-col justify-center space-y-[0.5vw]">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const headlineLines = parseLines(step.headline);
              const bodyLines = parseLines(step.body);

              return (
                <div
                  key={step.title}
                  onClick={() => handleStepClick(idx)}
                  className="services-workflow-step flex flex-col cursor-pointer transition-opacity duration-300 group"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  {/* Step Header */}
                  <div className="flex items-baseline space-x-[0.6vw]">
                    <span className="services-workflow-step-title text-[1.5278vw] font-semibold tracking-[-0.03em] text-white">
                      {step.number} {step.title}
                    </span>
                  </div>

                  {/* Expandable Paragraph beneath active step */}
                  <AnimatePresence onExitComplete={handleExitComplete}>
                    {openStep === idx && (
                      <motion.div
                        key={step.title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                          }
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                          }
                        }}
                        style={{ overflow: 'hidden' }}
                        className="overflow-hidden"
                      >
                        <div className="services-workflow-step-desc pt-[0.6vw] pb-[0.8vw] max-w-[28vw] flex flex-col">
                          {/* Bold Headline Lines (Line by Line reveal) */}
                          {headlineLines.map((line, hIdx) => (
                            <div key={`hl-${hIdx}`} className="overflow-hidden py-[1px] block">
                              <motion.p
                                initial={{
                                  y: direction > 0 ? '100%' : '-100%',
                                  opacity: 0
                                }}
                                animate={{
                                  y: '0%',
                                  opacity: 1,
                                  transition: {
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.08 + hIdx * 0.07
                                  }
                                }}
                                exit={{
                                  y: direction > 0 ? '-100%' : '100%',
                                  opacity: 0,
                                  transition: {
                                    duration: 0.25,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: hIdx * 0.03
                                  }
                                }}
                                className="services-workflow-step-headline text-[1.0417vw] font-bold text-white tracking-[-0.03em] leading-[1.3] block"
                              >
                                {line}
                              </motion.p>
                            </div>
                          ))}

                          {/* Distance between headline and body, followed by Body Lines strictly line by line */}
                          {bodyLines.length > 0 && (
                            <div className="flex flex-col mt-[10px] sm:mt-[0.6944vw]">
                              {bodyLines.map((line, bIdx) => {
                                const lineDelay = 0.08 + (headlineLines.length + bIdx) * 0.07;
                                const exitDelay = (headlineLines.length + bIdx) * 0.03;

                                return (
                                  <div key={`b-${bIdx}`} className="overflow-hidden py-[1px] block">
                                    <motion.p
                                      initial={{
                                        y: direction > 0 ? '100%' : '-100%',
                                        opacity: 0
                                      }}
                                      animate={{
                                        y: '0%',
                                        opacity: 1,
                                        transition: {
                                          duration: 0.45,
                                          ease: [0.22, 1, 0.36, 1],
                                          delay: lineDelay
                                        }
                                      }}
                                      exit={{
                                        y: direction > 0 ? '-100%' : '100%',
                                        opacity: 0,
                                        transition: {
                                          duration: 0.25,
                                          ease: [0.22, 1, 0.36, 1],
                                          delay: exitDelay
                                        }
                                      }}
                                      className="services-workflow-step-body text-[0.8333vw] font-normal text-white/80 tracking-[-0.03em] leading-[1.4] block"
                                    >
                                      {line}
                                    </motion.p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Side: Media Preview on Column 7 (spans Columns 7 to 12) */}
          <div className="services-workflow-preview-col col-start-7 col-span-6 flex items-center justify-center relative">
            {/* Outer Frame (Rectangle 39) */}
            {/* <div className="w-[36.65vw] h-[27.12vw] rounded-[0.416vw] border border-white/10 ]  flex items-center justify-center p-[1.5vw] shadow-2xl relative overflow-hidden"> */}
              
              {/* Inner Media Viewport (Preview) */}
              <div className="services-workflow-preview-inner w-[30.92vw] h-[22.18vw] rounded-[0.278vw] relative overflow-hidden bg-black/60 shadow-inner">
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
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentStepData.media}
                    className="absolute inset-0 w-full h-full origin-center"
                    initial={{ scale: 0.95, opacity: 0 }}
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
