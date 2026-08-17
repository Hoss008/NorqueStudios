import React, { useRef, useEffect } from "react";
import styles from "./service.module.css";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import popSound from "../assets/zapsplatt.wav";

const baseServices = [
  "Web Development",
  "UI/UX Design",
  "Brand Development",
  "Consultancy",
  "Art Direction"
];

const singleBlock = [...baseServices, ...baseServices, ...baseServices, ...baseServices];

const ServiceItem = ({ text, containerRef }) => {
  const ref = useRef(null);
  
  const audioRef = useRef(typeof window !== "undefined" ? new Audio(popSound) : null);
  const hasPlayedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  // The visual spring stays active for that floating, fluid color/blur transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,  
    damping: 25,     
    mass: 0.5        
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest > 0.45 && latest < 0.55) {
      if (!hasPlayedRef.current) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.5;
          audioRef.current.play().catch(err => console.log("Audio blocked:", err));
        }
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(50);
        }
        hasPlayedRef.current = true;
      }
    } else {
      hasPlayedRef.current = false;
    }
  });

  const opacity = useTransform(smoothProgress, [0, 0.4, 0.5, 0.6, 1], [0.1, 0.4, 1, 0.4, 0.1]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.5, 0.6, 1], [0.7, 0.9, 1.1, 0.9, 0.7]);
  const color = useTransform(
    smoothProgress,
    [0, 0.4, 0.5, 0.6, 1],
    ["#222222", "#666666", "#ffffff", "#666666", "#222222"]
  );
  
  const filter = useTransform(
    smoothProgress,
    [0, 0.4, 0.5, 0.6, 1],
    ["blur(10px)", "blur(3px)", "blur(0px)", "blur(3px)", "blur(10px)"]
  );

  return (
    <motion.h2 ref={ref} style={{ opacity, scale, color, filter }} className={styles.item}>
      {text}
    </motion.h2>
  );
};

function Service() {
  const scrollContainerRef = useRef(null);
  const blockRef = useRef(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    const blockEl = blockRef.current;
    if (!el || !blockEl) return;

    let reqId;
    let target = 0;
    let current = 0;
    const ease = 0.08; // LOWER number = slower, smoother glide. HIGHER = faster snap.

    // 1. Initial Centering setup
    const screenHalf = el.clientHeight / 2;
    const itemHalf = blockEl.children[0].clientHeight / 2;
    const startPos = blockEl.offsetHeight - screenHalf + itemHalf;
    
    el.scrollTop = startPos;
    target = startPos;
    current = startPos;

    // 2. The Wheel Hijacker
    const handleWheel = (e) => {
      // Check if it's a physical mouse wheel (larger delta values)
      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        target += e.deltaY * 1.5; // Multiply for further travel per click
      } else {
        // If it's a trackpad, keep target perfectly synced with native scroll
        target = el.scrollTop;
      }
    };

    // 3. The Continuous Lerp Engine
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateScroll = () => {
      if (!blockRef.current) return;
      const blockHeight = blockRef.current.offsetHeight;

      // Apply the momentum glide
      if (Math.abs(target - current) > 0.5) {
        current = lerp(current, target, ease);
        el.scrollTop = current;
      } else {
        current = target;
      }

      // The Infinite Loop constraint (Keeps target & current perfectly in sync)
      if (current <= 10) {
        current += blockHeight;
        target += blockHeight;
        el.scrollTop = current;
      } else if (current >= blockHeight * 2 - 10) {
        current -= blockHeight;
        target -= blockHeight;
        el.scrollTop = current;
      }

      reqId = requestAnimationFrame(updateScroll);
    };

    // Initialize listeners and loop
    el.addEventListener("wheel", handleWheel, { passive: false });
    reqId = requestAnimationFrame(updateScroll);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <section className={styles.service}>
      <div className={styles.viewport} ref={scrollContainerRef}>
        <div className={styles.list}>
          
          <div ref={blockRef} className={styles.setBlock}>
            {singleBlock.map((service, index) => (
              <div key={`block1-${index}`} className={styles.itemContainer}>
                <ServiceItem text={service} containerRef={scrollContainerRef} />
              </div>
            ))}
          </div>

          <div className={styles.setBlock}>
            {singleBlock.map((service, index) => (
              <div key={`block2-${index}`} className={styles.itemContainer}>
                <ServiceItem text={service} containerRef={scrollContainerRef} />
              </div>
            ))}
          </div>

          <div className={styles.setBlock}>
            {singleBlock.map((service, index) => (
              <div key={`block3-${index}`} className={styles.itemContainer}>
                <ServiceItem text={service} containerRef={scrollContainerRef} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Service;