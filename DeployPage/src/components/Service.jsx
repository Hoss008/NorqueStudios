import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import styles from "./service.module.css";
import popSound from "../assets/zapsplatt.wav";

const baseServices = [
  "Consultancy",
  "Web Development",
  "UI/UX Design",
  "Brand Development",
  "Art Direction"
];

// Triple the array to cover massive screens from top to bottom
const services = [...baseServices, ...baseServices, ...baseServices];

// The magic formula: Wraps items infinitely without any visual jumping
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ServiceItem = ({ text, index, smoothY, itemHeight, totalHeight }) => {
  const initialY = index * itemHeight;

  // Orbit math: Keeps the item perfectly wrapped around the center
  const y = useTransform(smoothY, (currentScroll) => {
    const max = totalHeight / 2;
    const min = -max;
    return wrap(min, max, currentScroll + initialY);
  });

  // Calculate pure distance from the center (0)
  const absY = useTransform(y, Math.abs);

  // Visuals tied directly to how far the item is from the exact center
  const opacity = useTransform(absY, [0, itemHeight, itemHeight * 2.5], [1, 0.4, 0.05]);
  const scale = useTransform(absY, [0, itemHeight, itemHeight * 2], [1.1, 0.9, 0.75]);
  const filter = useTransform(absY, [0, itemHeight, itemHeight * 2], ["blur(0px)", "blur(4px)", "blur(12px)"]);
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

export default function Service() {
  const containerRef = useRef(null);
  const audioRef = useRef(typeof window !== "undefined" ? new Audio(popSound) : null);
  const lastPlayedRef = useRef(null);

  // Responsive slot height (120px desktop, 90px mobile)
  const [itemHeight, setItemHeight] = useState(120);
  
  useEffect(() => {
    const updateHeight = () => setItemHeight(window.innerWidth > 768 ? 120 : 90);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const totalHeight = services.length * itemHeight;

  // ⚡ CORE ENGINE: The raw scroll target
  const virtualY = useMotionValue(0);
  
  // 🎛️ THE PHYSICS: Looser stiffness and heavier mass creates that long, smooth roulette glide
  const smoothY = useSpring(virtualY, {
    stiffness: 60,   // Lower = looser follow
    damping: 30,     // High friction to stop it from bouncing at the end
    mass: 1.5        // Heavy weight makes it slide away smoothly until it bleeds off speed
  });

  // Crisp Audio Trigger
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

  // Trackpad, Mouse Wheel, and Mobile Swipe listeners
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      // Increase the multiplier (2.5) if you want one mouse wheel click to throw it further
      virtualY.set(virtualY.get() - e.deltaY * 2.5);
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      touchStartY = touchY;
      virtualY.set(virtualY.get() - delta * 2.5);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualY]); 

  return (
    <section className={styles.service}>
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
    </section>
  );
}