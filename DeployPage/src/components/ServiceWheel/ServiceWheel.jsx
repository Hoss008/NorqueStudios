import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import styles from "./ServiceWheel.module.css";
import popSound from "../../assets/zapsplatt.wav";

const baseServices = [
  "Web Development",
  "Software Solutions",
  "Consultancy",
  "UI/UX Design",
  "Brand Development",
  "Art Direction",
];

const services = [...baseServices, ...baseServices, ...baseServices];

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ServiceItem = ({ text, index, smoothY, itemHeight, totalHeight }) => {
  const initialY = index * itemHeight;

  const y = useTransform(smoothY, (currentScroll) => {
    const max = totalHeight / 2;
    const min = -max;
    return wrap(min, max, currentScroll + initialY);
  });

  const absY = useTransform(y, Math.abs);

  const opacity = useTransform(absY, [0, itemHeight, itemHeight * 2.5], [1, 0.4, 0.05]);
  const scale = useTransform(absY, [0, itemHeight, itemHeight * 2], [1.1, 0.9, 0.75]);
  const filter = useTransform(
    absY,
    [0, itemHeight, itemHeight * 2],
    ["blur(0px)", "blur(4px)", "blur(12px)"]
  );
  const color = useTransform(
    absY,
    [0, itemHeight, itemHeight * 2],
    ["#ffffff", "#666666", "#111111"]
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        filter,
        color,
        position: "absolute",
        width: "100%",
        height: itemHeight,
        top: "50%",
        marginTop: -(itemHeight / 2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 className={styles.item}>{text}</h2>
    </motion.div>
  );
};

export default function ServiceWheel({ isOpen, onClose }) {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const lastPlayedRef = useRef(null);

  const [itemHeight, setItemHeight] = useState(120);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(popSound);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const updateHeight = () => setItemHeight(window.innerWidth > 768 ? 120 : window.innerWidth > 480 ? 80 : 64);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const totalHeight = services.length * itemHeight;
  const virtualY = useMotionValue(0);

  const smoothY = useSpring(virtualY, {
    stiffness: 80,
    damping: 30,
    mass: 1.2,
  });

  useMotionValueEvent(smoothY, "change", (latest) => {
    const activeSlot = Math.round(-latest / itemHeight);
    if (activeSlot !== lastPlayedRef.current) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      }
      if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(30);
      lastPlayedRef.current = activeSlot;
    }
  });

  useEffect(() => {
    if (!isOpen) return;
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;
    let lastTouchAt = 0;
    let touchVelocity = 0;
    let settleTimeout;

    const settleToNearest = () => {
      clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => {
        const current = virtualY.get();
        const nearestSlot = Math.round(current / itemHeight) * itemHeight;
        virtualY.set(nearestSlot);
      }, 300);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      virtualY.set(virtualY.get() - e.deltaY * 2.5);
      settleToNearest();
    };

    const handleTouchStart = (e) => {
      clearTimeout(settleTimeout);
      touchStartY = e.touches[0].clientY;
      lastTouchAt = performance.now();
      touchVelocity = 0;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      const now = performance.now();
      const elapsed = Math.max(now - lastTouchAt, 1);
      const movement = -delta * 1.4;

      touchVelocity = movement / elapsed;
      touchStartY = touchY;
      lastTouchAt = now;
      virtualY.set(virtualY.get() + movement);
      settleToNearest();
    };

    const handleTouchEnd = () => {
      clearTimeout(settleTimeout);
      const glide = Math.max(-itemHeight * 2.5, Math.min(itemHeight * 2.5, touchVelocity * 170));
      if (Math.abs(touchVelocity) > 0.08) {
        virtualY.set(virtualY.get() + glide);
      }
      settleToNearest();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
      clearTimeout(settleTimeout);
    };
  }, [isOpen, virtualY, itemHeight]);

  if (!isOpen) return null;

  return (
    <div className={styles.serviceOverlay} role="dialog" aria-modal="true">
      <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close services">
        Close ✕
      </button>

      <div className={styles.viewport} ref={containerRef}>
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            text={service}
            index={index}
            smoothY={smoothY}
            itemHeight={itemHeight}
            totalHeight={totalHeight}
          />
        ))}
      </div>

      <div className={styles.hintText}>Scroll or Drag to Explore Services</div>
    </div>
  );
}
