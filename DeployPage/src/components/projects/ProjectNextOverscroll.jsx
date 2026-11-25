import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { normalizeWheelDelta } from '../../utils/wheelStepper';
import { preloadPage } from '../../utils/mediaPreloader';
import {
  getProjectMeta,
  getNextProjectMeta,
  lerpHexColor
} from './projectSequence';

/* ========================================================================= */
/* PROJECT NEXT OVERSCROLL (PEEK + COLOR TRANSITION + RUBBER BAND)           */
/* - Preloads current & next project media + chunk on mount                  */
/* - Reveals a full-bleed peek of the next project at the bottom             */
/* - Smoothly transitions page background color toward next project's color  */
/* - Triggers on total overscroll distance past the end (rubber-band feel)   */
/* ========================================================================= */

const PULL_THRESHOLD = 460; // Cumulative overscroll px past the end to trigger
const TOUCH_PULL_MULTIPLIER = 1.6;
const IDLE_BEFORE_SNAP_BACK_MS = 280;
const ARRIVAL_SETTLE_MS = 160;
const MAX_RUBBER_LIFT_PX = 46;

export default function ProjectNextOverscroll({
  currentProject,
  nextProject,
  nextPath,
  nextTitle,
  onNavigate
}) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const coverBoxRef = useRef(null);
  const coverImgRef = useRef(null);
  const headerRef = useRef(null);

  const [isTriggered, setIsTriggered] = useState(false);

  const currentMeta = getProjectMeta(currentProject) || {
    id: currentProject || 'project-mms',
    bg: '#0a0e17'
  };
  const nextMeta =
    getProjectMeta(nextProject) ||
    getNextProjectMeta(currentProject) || {
      id: nextProject,
      path: nextPath,
      title: nextTitle,
      subtitle: '',
      bg: '#000000',
      cover: null,
      coverScale: 1.3
    };

  const rawPullRef = useRef(0);
  const visualPullRef = useRef(0);
  const visualRevealRef = useRef(0);
  const hasTriggeredRef = useRef(false);
  const lastPullAtRef = useRef(0);
  const isTouchingRef = useRef(false);
  const wasAtBottomRef = useRef(false);
  const arrivalIgnoreUntilRef = useRef(0);
  const rafRef = useRef(null);
  const touchStartYRef = useRef(0);

  // Preload all media of current project + next project immediately on mount
  useEffect(() => {
    preloadPage(currentMeta.id, { skipMinTimer: true });
    preloadPage(nextMeta.id, { skipMinTimer: true });
  }, [currentMeta.id, nextMeta.id]);

  const triggerNext = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsTriggered(true);
    rawPullRef.current = PULL_THRESHOLD;

    const coverRect = coverBoxRef.current?.getBoundingClientRect();
    const pageRoot = rootRef.current?.closest('.project-page-root');
    const appShell = document.querySelector('#root > div');
    if (pageRoot) {
      pageRoot.style.backgroundColor = nextMeta.bg;
    }
    if (appShell) {
      appShell.style.backgroundColor = nextMeta.bg;
    }
    document.body.style.backgroundColor = nextMeta.bg;
    document.documentElement.style.backgroundColor = nextMeta.bg;

    if (onNavigate) {
      onNavigate(nextMeta.id, null, { coverRect, nextMeta });
    } else if (nextMeta.path) {
      navigate(nextMeta.path, { state: { seamlessProjectEntry: true } });
    }
  };

  useEffect(() => {
    const getPageRoot = () => rootRef.current?.closest('.project-page-root') || null;
    const getAppShell = () => document.querySelector('#root > div');
    const getGalleryEl = () => rootRef.current?.previousElementSibling || null;

    const applyVisualState = (revealP, pullP) => {
      const pageRoot = getPageRoot();
      const appShell = getAppShell();
      const galleryEl = getGalleryEl();
      const colorT = Math.min(1, revealP * 0.28 + pullP * 0.72);
      const blendedBg = lerpHexColor(currentMeta.bg, nextMeta.bg, colorT);

      if (pageRoot) {
        pageRoot.style.backgroundColor = blendedBg;
        if (pullP > 0.001) {
          const damped = (1 - Math.exp(-2.2 * pullP)) / (1 - Math.exp(-2.2));
          const liftPx = damped * MAX_RUBBER_LIFT_PX;
          pageRoot.style.willChange = 'transform';
          pageRoot.style.transform = `translate3d(0, -${liftPx.toFixed(2)}px, 0)`;
        } else if (pageRoot.style.transform) {
          pageRoot.style.transform = '';
          pageRoot.style.willChange = '';
        }
      }
      if (appShell) {
        appShell.style.backgroundColor = blendedBg;
      }
      document.body.style.backgroundColor = blendedBg;
      document.documentElement.style.backgroundColor = blendedBg;

      if (galleryEl) {
        galleryEl.style.opacity = pullP > 0.001 ? String((1 - pullP * 0.28).toFixed(3)) : '';
      }

      if (headerRef.current) {
        const headerOpacity = Math.min(1, 0.55 + revealP * 0.35 + pullP * 0.1);
        headerRef.current.style.opacity = String(headerOpacity.toFixed(3));
      }

      if (coverImgRef.current) {
        const baseScale = nextMeta.coverScale || 1.3;
        const imgScale = baseScale + (1 - pullP) * 0.06;
        const imgOpacity = Math.min(1, 0.52 + revealP * 0.2 + pullP * 0.28);
        coverImgRef.current.style.transform = `scale(${imgScale.toFixed(4)})`;
        coverImgRef.current.style.opacity = String(imgOpacity.toFixed(3));
      }
    };

    const computeRevealProgress = () => {
      const el = rootRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const entered = vh - rect.top;
      const total = Math.max(rect.height, 1);
      return Math.max(0, Math.min(1, entered / total));
    };

    const isAtBottom = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const fullHeight = document.documentElement.scrollHeight;
      return windowHeight + scrollY >= fullHeight - 18;
    };

    const updateBottomArrival = () => {
      const atBottom = isAtBottom();
      if (atBottom && !wasAtBottomRef.current) {
        arrivalIgnoreUntilRef.current = performance.now() + ARRIVAL_SETTLE_MS;
      } else if (!atBottom && wasAtBottomRef.current) {
        rawPullRef.current = 0;
      }
      wasAtBottomRef.current = atBottom;
      return atBottom;
    };

    const handleScroll = () => {
      updateBottomArrival();
    };

    const handleWheel = (e) => {
      if (hasTriggeredRef.current) return;

      const atBottom = updateBottomArrival();
      if (!atBottom) return;

      const now = performance.now();
      const delta = normalizeWheelDelta(e);

      if (delta > 0) {
        if (now < arrivalIgnoreUntilRef.current && rawPullRef.current === 0) {
          return;
        }
        rawPullRef.current = Math.min(PULL_THRESHOLD, rawPullRef.current + delta);
        lastPullAtRef.current = now;

        if (rawPullRef.current >= PULL_THRESHOLD) {
          triggerNext();
        }
      } else if (delta < 0 && rawPullRef.current > 0) {
        rawPullRef.current = Math.max(0, rawPullRef.current + delta * 1.1);
      }
    };

    const handleTouchStart = (e) => {
      isTouchingRef.current = true;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (hasTriggeredRef.current) return;

      const atBottom = updateBottomArrival();
      if (!atBottom) return;

      const currentY = e.touches[0].clientY;
      const diff = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      if (diff > 0) {
        rawPullRef.current = Math.min(
          PULL_THRESHOLD,
          rawPullRef.current + diff * TOUCH_PULL_MULTIPLIER
        );
        lastPullAtRef.current = performance.now();

        if (rawPullRef.current >= PULL_THRESHOLD) {
          triggerNext();
        }
      } else if (diff < 0 && rawPullRef.current > 0) {
        rawPullRef.current = Math.max(0, rawPullRef.current + diff * TOUCH_PULL_MULTIPLIER);
      }
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      lastPullAtRef.current = performance.now() - IDLE_BEFORE_SNAP_BACK_MS;
    };

    const tick = () => {
      if (!hasTriggeredRef.current) {
        const now = performance.now();
        const isIdle = !isTouchingRef.current && now - lastPullAtRef.current > IDLE_BEFORE_SNAP_BACK_MS;

        if (isIdle && rawPullRef.current > 0) {
          rawPullRef.current = Math.max(0, rawPullRef.current * 0.84 - 2);
        }

        const targetPull = Math.min(1, rawPullRef.current / PULL_THRESHOLD);
        const targetReveal = computeRevealProgress();

        const curPull = visualPullRef.current;
        const curReveal = visualRevealRef.current;

        const nextPull =
          Math.abs(targetPull - curPull) < 0.002
            ? targetPull
            : curPull + (targetPull - curPull) * 0.24;
        const nextReveal =
          Math.abs(targetReveal - curReveal) < 0.002
            ? targetReveal
            : curReveal + (targetReveal - curReveal) * 0.22;

        if (nextPull !== curPull || nextReveal !== curReveal) {
          visualPullRef.current = nextPull;
          visualRevealRef.current = nextReveal;
          applyVisualState(nextReveal, nextPull);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    updateBottomArrival();
    applyVisualState(computeRevealProgress(), 0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (!hasTriggeredRef.current) {
        const pageRoot = getPageRoot();
        if (pageRoot) {
          pageRoot.style.transform = '';
          pageRoot.style.willChange = '';
          pageRoot.style.backgroundColor = '';
        }
        const appShell = getAppShell();
        if (appShell) {
          appShell.style.backgroundColor = '';
        }
        document.documentElement.style.backgroundColor = '';
      }
      const galleryEl = getGalleryEl();
      if (galleryEl) {
        galleryEl.style.opacity = '';
      }
    };
  }, [currentMeta.bg, nextMeta.bg, nextMeta.coverScale, nextMeta.id, nextMeta.path]);

  return (
    <section
      ref={rootRef}
      onClick={triggerNext}
      className="w-full pt-[32px] md:pt-[2.5vw] flex flex-col justify-end select-none cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerNext();
        }
      }}
      aria-label={`Scroll past bottom or click to open next project: ${nextMeta.title || ''}`}
    >
      {/* Next Project Header Row */}
      <div
        ref={headerRef}
        className="w-full px-[12px] md:px-[0.8333vw] pb-[14px] md:pb-[1vw] flex items-end justify-between"
      >
        <div className="flex flex-col">
          <span className="font-beausite font-semibold text-[10px] md:text-[0.625vw] tracking-[-0.02em] uppercase text-white/50">
            Next Project
          </span>
          <h2 className="font-beausite font-bold text-[16px] md:text-[1.25vw] tracking-[-0.03em] uppercase text-white leading-[1.15] mt-[4px] md:mt-[0.28vw]">
            {nextMeta.title}
            {nextMeta.subtitle ? (
              <span className="font-semibold text-white/60 ml-[8px] md:ml-[0.6vw]">
                — {nextMeta.subtitle}
              </span>
            ) : null}
          </h2>
        </div>

        <span className="font-beausite font-semibold text-[10px] md:text-[0.6944vw] tracking-[-0.03em] text-white/60 group-hover:text-white transition-colors uppercase">
          {isTriggered ? 'Loading…' : 'Keep scrolling'}
        </span>
      </div>

      {/* Full-Width Live Peek of the Next Project Cover */}
      <div
        ref={coverBoxRef}
        className="relative w-full h-[24vh] min-h-[170px] md:h-[28vh] overflow-hidden"
      >
        {nextMeta.cover && (
          <img
            ref={coverImgRef}
            src={nextMeta.cover}
            alt={`${nextMeta.title || 'Next project'} Preview`}
            className="w-full h-full object-cover object-center block will-change-[transform,opacity]"
            loading="eager"
            decoding="async"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 45%)'
          }}
        />
      </div>
    </section>
  );
}
