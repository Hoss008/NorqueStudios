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

  const [itemHeight, setItemHeight] = useState(120);
  
  useEffect(() => {
    const updateHeight = () => setItemHeight(window.innerWidth > 768 ? 120 : 90);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const totalHeight = services.length * itemHeight;

  const virtualY = useMotionValue(0);
  
  // Physics tuned for a nice glide that can still snap into place gracefully
  const smoothY = useSpring(virtualY, {
    stiffness: 80,   
    damping: 30,     
    mass: 1.2        
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
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;
    let settleTimeout;

    // The Soft Settle Function
    const settleToNearest = () => {
      clearTimeout(settleTimeout);
      // Wait 300ms after the user stops scrolling to let the momentum start fading
      settleTimeout = setTimeout(() => {
        const current = virtualY.get();
        // Calculate the mathematically perfect center of the closest item
        const nearestSlot = Math.round(current / itemHeight) * itemHeight;
        // Update the target. The spring physics will handle the smooth, magnetic pull to center.
        virtualY.set(nearestSlot);
      }, 300); 
    };

    const handleWheel = (e) => {
      e.preventDefault();
      virtualY.set(virtualY.get() - e.deltaY * 2.5);
      settleToNearest(); // Trigger the settle timer
    };

    const handleTouchStart = (e) => {
      clearTimeout(settleTimeout); // Cancel settling if they touch again
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      touchStartY = touchY;
      virtualY.set(virtualY.get() - delta * 2.5);
      settleToNearest(); // Trigger the settle timer
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(settleTimeout);
    };
  }, [virtualY, itemHeight]); // Added itemHeight to dependencies so math stays perfect on resize

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