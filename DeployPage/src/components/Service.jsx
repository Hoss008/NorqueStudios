import React, { useRef, useEffect } from "react";
import styles from "./service.module.css";
// Added useMotionValueEvent
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import popSound from "../assets/zapsplatt.wav"; 

const baseServices = [
  "Web Development",
  "UI/UX Design",
  "Brand Development",
  "Consultancy",
  "Art Direction"
];

// 1. Create one "Block" of services large enough to overflow the screen height
const singleBlock = [...baseServices, ...baseServices, ...baseServices, ...baseServices];

const ServiceItem = ({ text, containerRef }) => {
  const ref = useRef(null);
  
  // Audio setup
  const audioRef = useRef(typeof window !== "undefined" ? new Audio(popSound) : null);
  const hasPlayedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  // Watch the scroll position and trigger sound
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45 && latest < 0.55) {
      if (!hasPlayedRef.current) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.5;
          audioRef.current.play().catch(err => console.log("Audio blocked:", err));
        }
        hasPlayedRef.current = true;
      }
    } else {
      hasPlayedRef.current = false;
    }
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.1, 0.4, 1, 0.4, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.7, 0.9, 1.1, 0.9, 0.7]);
  const color = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    ["#222222", "#666666", "#ffffff", "#666666", "#222222"]
  );
  
  const filter = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    ["blur(10px)", "blur(3px)", "blur(0px)", "blur(3px)", "blur(10px)"]
  );

  return (
    <motion.h2
      ref={ref}
      style={{ opacity, scale, color, filter }}
      className={styles.item}
    >
      {text}
    </motion.h2>
  );
};

function Service() {
  const scrollContainerRef = useRef(null);
  const blockRef = useRef(null); // Reference to measure the height of one block

  useEffect(() => {
    const el = scrollContainerRef.current;
    const blockEl = blockRef.current;
    if (!el || !blockEl) return;

    // 1. Get half the height of the user's screen
    const screenHalf = el.clientHeight / 2;
    
    // 2. Get half the height of a single text item (for pixel-perfect centering)
    const itemHalf = blockEl.children[0].clientHeight / 2;

    // 3. Offset the initial scroll position so the first item lands dead-center
    el.scrollTop = blockEl.offsetHeight - screenHalf + itemHalf;
  }, []);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    const blockEl = blockRef.current;
    if (!el || !blockEl) return;

    const blockHeight = blockEl.offsetHeight;

    // 3. The Infinite Loop Math:
    // If the user scrolls up and is about to hit the absolute top
    if (el.scrollTop <= 10) {
      el.scrollTop += blockHeight;
    } 
    // If the user scrolls down and is about to hit the end of the 3rd block
    else if (el.scrollTop >= blockHeight * 2 - 10) {
      el.scrollTop -= blockHeight;
    }
  };

  return (
    <section className={styles.service}>
      <div 
        className={styles.viewport} 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
      >
        <div className={styles.list}>
          
          {/* Render exactly 3 identical blocks to create the endless treadmill */}
          
          {/* Block 1 (Top buffer) */}
          <div ref={blockRef} className={styles.setBlock}>
            {singleBlock.map((service, index) => (
              <div key={`block1-${index}`} className={styles.itemContainer}>
                <ServiceItem text={service} containerRef={scrollContainerRef} />
              </div>
            ))}
          </div>

          {/* Block 2 (The starting middle ground) */}
          <div className={styles.setBlock}>
            {singleBlock.map((service, index) => (
              <div key={`block2-${index}`} className={styles.itemContainer}>
                <ServiceItem text={service} containerRef={scrollContainerRef} />
              </div>
            ))}
          </div>

          {/* Block 3 (Bottom buffer) */}
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