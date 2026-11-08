import React, { useRef, useState, useCallback, useEffect } from 'react';
import './OptionWheel.css';

export default function OptionWheel({
  items = [],
  defaultSelected = 0,
  selectedIndex: controlledIndex,
  onChange,
  textColor = '#555555',
  activeColor = '#ffffff',
  side = 'left',
  fontSize = 3, // in vw
  spacing = 1.5,
  curve = 1.6,
  tilt = 12,
  blur = 2,
  fade = 0.3,
  minOpacity = 0.08,
  smoothing = 390,
  inset = 180,
  loop = false,
  draggable = false,
  className = ''
}) {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef(defaultSelected);
  const wheelTimerRef = useRef(null);
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  // Sync controlled index if provided
  useEffect(() => {
    if (controlledIndex !== undefined && controlledIndex !== selectedRef.current) {
      targetRef.current = controlledIndex;
      selectedRef.current = controlledIndex;
      setSelectedIndex(controlledIndex);
      startLoop();
    }
  }, [controlledIndex]);

  const getVwPx = () => {
    if (typeof window === 'undefined') return 27;
    return (window.innerWidth * fontSize) / 100;
  };

  onChangeRef.current = onChange;
  cfgRef.current = {
    count: items.length,
    items,
    rowH: Math.max(getVwPx() * spacing, 24),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    draggable
  };

  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const cfg = cfgRef.current;
    const tau = Math.max(cfg.smoothing, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    const target = targetRef.current;
    const cur = posRef.current;
    let next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    posRef.current = next;

    const els = itemRefs.current;
    const n = cfg.count;
    const mirror = cfg.side === 'right' ? -1 : 1;
    const tiltRad = (cfg.tilt * Math.PI) / 180;
    const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - next;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      const dist = Math.abs(d);
      let x = 0;
      let y = d * cfg.rowH;
      let rot = 0;
      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
        y = R * Math.sin(ang);
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }
      el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      el.style.filter = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : 'none';
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }

    rafRef.current = settled ? null : requestAnimationFrame(runFrame);
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const applyTarget = useCallback(
    (value, snap) => {
      const cfg = cfgRef.current;
      let v = value;
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
      if (snap) v = Math.round(v);
      targetRef.current = v;
      const idx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
      if (idx !== selectedRef.current) {
        selectedRef.current = idx;
        setSelectedIndex(idx);
        onChangeRef.current?.(idx, cfg.items[idx]);
      }
      startLoop();
    },
    [startLoop]
  );

  // Helper to check if the hero section is currently 100% filling the viewport
  const isHeroFillingViewport = () => {
    if (typeof window === 'undefined') return true;
    if (window.scrollY <= 5) return true;

    const heroSec = rootRef.current?.closest('section');
    if (!heroSec) return window.scrollY <= 5;

    const rect = heroSec.getBoundingClientRect();
    return rect.top >= -10 && rect.top <= 10;
  };

  // Wheel / touchpad scrolling, registered on rootRef only so it requires hovering over wheel
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let accumulatedDelta = 0;

    const onWheel = (e) => {
      const cfg = cfgRef.current;
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const cur = targetRef.current;
      const isAtFinalOption = cur >= cfg.count - 1 - 0.05;

      // 1) When scrolling down: if the wheel reaches the final option ("Consultation"),
      // allow the page to scroll down freely even if hovering on the wheel
      if (isAtFinalOption && delta > 0) {
        return;
      }

      // 2) When scrolling up: if the hero section is NOT 100% filling the viewport (page is scrolled down),
      // allow the page to scroll up until the hero section is 100% filling the viewport,
      // even if hovering on the wheel
      if (delta < 0 && !isHeroFillingViewport()) {
        return;
      }

      // 3) Otherwise (hero fills viewport & moving within wheel options):
      // strictly scroll only the wheel and prevent page scroll
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }

      accumulatedDelta += delta;

      // Calculate step threshold
      const threshold = cfg.rowH * 0.45;
      if (Math.abs(accumulatedDelta) >= threshold) {
        const step = accumulatedDelta > 0 ? 1 : -1;
        applyTarget(Math.round(cur) + step, true);
        accumulatedDelta = 0;
      }

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        applyTarget(targetRef.current, true);
        accumulatedDelta = 0;
      }, 120);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [applyTarget]);

  const handlePointerDown = useCallback((e) => {
    if (!cfgRef.current.draggable) return;
    dragRef.current = { y: e.clientY, start: targetRef.current, id: e.pointerId };
    dragMovedRef.current = false;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dy = e.clientY - drag.y;
      if (!dragMovedRef.current && Math.abs(dy) > 4) {
        dragMovedRef.current = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (dragMovedRef.current) {
        applyTarget(drag.start - dy / cfgRef.current.rowH, false);
      }
    },
    [applyTarget]
  );

  const handlePointerEnd = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsDragging(false);
    if (dragMovedRef.current) applyTarget(targetRef.current, true);
  }, [applyTarget]);

  const handleItemClick = useCallback(
    (index) => {
      if (dragMovedRef.current) return;
      applyTarget(index, true);
    },
    [applyTarget]
  );

  const handleKeyDown = useCallback(
    (e) => {
      let delta = null;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1;
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1;
      if (delta == null) return;
      e.preventDefault();
      applyTarget(Math.round(targetRef.current) + delta, true);
    },
    [applyTarget]
  );

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, loop, smoothing, applyTarget]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    []
  );

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Service wheel"
      className={`service-option-wheel${side === 'right' ? ' service-option-wheel--right' : ''}${isDragging ? ' service-option-wheel--dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ow-text-color': textColor,
        '--ow-active-color': activeColor,
        '--ow-font-size': `${fontSize}vw`,
        '--ow-inset': `${inset}px`
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`service-option-wheel__item${selectedIndex === index ? ' service-option-wheel__item--selected' : ''}`}
          onClick={() => handleItemClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
