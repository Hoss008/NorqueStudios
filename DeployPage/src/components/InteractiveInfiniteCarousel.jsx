import React, { useRef, useEffect, useState } from 'react';

/* ========================================================================= */
/* INTERACTIVE INFINITE CAROUSEL                                             */
/* - Continuous bidirectional infinite autoplay                              */
/* - Physics-based pointer drag (mouse & touch) + inertia glide              */
/* - Horizontal trackpad swipe support                                       */
/* - Multi-track buffer geometry prevents snapping / seams                   */
/* - Safe drag-vs-click discriminator with microsecond SFX suppression      */
/* ========================================================================= */
export default function InteractiveInfiniteCarousel({
  items,
  renderItem,
  gapClass = "gap-[0.8333vw]",
  paddingRightClass = "pr-[0.8333vw]",
  className = "",
  speed = -0.75, // pixels per frame at 60fps
  interactive = true,
}) {
  /* ─── DOM & Animation Refs ─── */
  const outerRef = useRef(null);
  const trackContainerRef = useRef(null);
  const track1Ref = useRef(null);

  const offsetRef = useRef(0);
  const singleTrackWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const rafIdRef = useRef(null);
  const isInitializedRef = useRef(false);
  const interactiveRef = useRef(interactive);
  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  /* ======================================================================= */
  /* 1. DYNAMIC WIDTH CALCULATION (RESIZE OBSERVER)                          */
  /* ======================================================================= */
  useEffect(() => {
    const track = track1Ref.current;
    if (!track) return;

    const updateWidth = () => {
      const rect = track.getBoundingClientRect();
      if (rect.width > 0) {
        const prevWidth = singleTrackWidthRef.current;
        singleTrackWidthRef.current = rect.width;

        // On first initialization, center offset at -width so left buffer track exists
        if (!isInitializedRef.current) {
          offsetRef.current = -rect.width;
          isInitializedRef.current = true;
          if (trackContainerRef.current) {
            trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
          }
        } else if (prevWidth > 0 && prevWidth !== rect.width) {
          // Scale current offset proportionally if screen resized
          offsetRef.current = (offsetRef.current / prevWidth) * rect.width;
        }
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(track);

    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  /* ======================================================================= */
  /* 2. RAF PHYSICS ANIMATION LOOP                                           */
  /* ======================================================================= */
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 16.667, 2); // Normalized frame delta
      lastTime = time;

      if (!isDraggingRef.current) {
        // Inertia decay if velocity exists from drag release
        if (interactiveRef.current && Math.abs(velocityRef.current) > 0.05) {
          offsetRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.95, dt); // Friction decay
        } else if (!interactiveRef.current || !isHoveredRef.current) {
          // Normal continuous auto-scroll speed
          offsetRef.current += speed * dt;
        }

        // Seamless bidirectional infinite wrap within [-2w, -w]
        const w = singleTrackWidthRef.current;
        if (w > 0) {
          while (offsetRef.current <= -2 * w) {
            offsetRef.current += w;
          }
          while (offsetRef.current > -w) {
            offsetRef.current -= w;
          }
        }

        if (trackContainerRef.current) {
          trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [speed]);

  /* ======================================================================= */
  /* 3. POINTER DRAG & INERTIA FLING HANDLERS                                */
  /* ======================================================================= */
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    window.__norqueCarouselDragged = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    velocityRef.current = 0;
    setIsCursorGrabbing(true);

    const onPointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = moveEvent.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
        window.__norqueCarouselDragged = true;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTimeRef.current);
      const instantVelocity = ((moveEvent.clientX - lastXRef.current) / dt) * 16.667;
      velocityRef.current = velocityRef.current * 0.35 + instantVelocity * 0.65;
      lastXRef.current = moveEvent.clientX;
      lastMoveTimeRef.current = now;

      offsetRef.current = dragStartOffsetRef.current + deltaX;

      // Real-time wrap in [-2w, -w] during drag with zero visual jump
      const w = singleTrackWidthRef.current;
      if (w > 0) {
        while (offsetRef.current <= -2 * w) {
          offsetRef.current += w;
          dragStartOffsetRef.current += w;
        }
        while (offsetRef.current > -w) {
          offsetRef.current -= w;
          dragStartOffsetRef.current -= w;
        }
      }

      if (trackContainerRef.current) {
        trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsCursorGrabbing(false);

      if (hasDraggedRef.current) {
        window.__norqueCarouselDragged = true;

        // Intercept and swallow the trailing click event
        const preventClick = (clickEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
          clickEvent.stopImmediatePropagation?.();
          window.removeEventListener('click', preventClick, true);
        };
        window.addEventListener('click', preventClick, true);

        setTimeout(() => {
          window.removeEventListener('click', preventClick, true);
          hasDraggedRef.current = false;
          window.__norqueCarouselDragged = false;
        }, 80);
      } else {
        window.__norqueCarouselDragged = false;
      }

      // If user paused before release (>60ms), cancel fling velocity
      if (performance.now() - lastMoveTimeRef.current > 60) {
        velocityRef.current = 0;
      }

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
  };

  /* ======================================================================= */
  /* 4. TRACKPAD SWIPE & WHEEL HANDLER                                       */
  /* ======================================================================= */
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      e.preventDefault();
      offsetRef.current -= e.deltaX * 0.8;

      const w = singleTrackWidthRef.current;
      if (w > 0) {
        while (offsetRef.current <= -2 * w) offsetRef.current += w;
        while (offsetRef.current > -w) offsetRef.current -= w;
      }

      if (trackContainerRef.current) {
        trackContainerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
    }
  };

  /* ======================================================================= */
  /* 5. MULTI-BUFFER TRACK RENDER                                            */
  /* ======================================================================= */
  return (
    <div
      ref={outerRef}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onClickCapture={interactive ? (e) => {
        if (hasDraggedRef.current || window.__norqueCarouselDragged) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation?.();
        }
      } : undefined}
      onWheel={interactive ? handleWheel : undefined}
      onMouseEnter={interactive ? () => { isHoveredRef.current = true; } : undefined}
      onMouseLeave={interactive ? () => { isHoveredRef.current = false; } : undefined}
      className={`w-full overflow-hidden select-none ${
        interactive
          ? `touch-pan-y ${isCursorGrabbing ? 'cursor-grabbing [&_*]:!cursor-grabbing' : 'cursor-grab'}`
          : 'pointer-events-none'
      } ${className}`}
    >
      <div
        ref={trackContainerRef}
        className="flex flex-nowrap w-max will-change-transform"
      >
        {/* Track 0: Left Buffer (Seamless cards when dragging right) */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t0-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 1: Primary Center Track (Width measurement anchor) */}
        <div
          ref={track1Ref}
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t1-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 2: Right Buffer 1 */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t2-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 3: Right Buffer 2 (Wide screen buffer) */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t3-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 4: Right Buffer 3 (Ultra-wide / rapid flick buffer) */}
        <div
          className={`flex shrink-0 ${gapClass} ${paddingRightClass}`}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <React.Fragment key={`t4-${idx}`}>
              {renderItem(item, idx, hasDraggedRef)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
