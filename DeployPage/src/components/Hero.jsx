import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { logoPaths } from './logoPaths';
import heroBackgroundVideo from '../assets/hero-background.mp4';

/* ========================================================================= */
/* HERO SECTION COMPONENT                                                    */
/* Full-screen video hero with sequential typographic rise & brand vectors   */
/* ========================================================================= */
export default function Hero({ onNavigate, hasIntroPlayed = false, onIntroComplete }) {
  /* ─── State & Sequence Timers ─── */
  const [isIntroStarted, setIsIntroStarted] = useState(hasIntroPlayed);
  const [isVideoVisible, setIsVideoVisible] = useState(hasIntroPlayed);
  const videoRef = useRef(null);

  useEffect(() => {
    if (hasIntroPlayed) {
      setIsIntroStarted(true);
      setIsVideoVisible(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      return;
    }

    // 2.5s intro animation timer matching 1:1 with norquestudios.com
    const introTimer = setTimeout(() => {
      setIsIntroStarted(true);
      if (onIntroComplete) {
        onIntroComplete();
      }
    }, 2500);

    // After intro animation finishes (1s after intro starts = 3.5s), fade in video
    const videoTimer = setTimeout(() => {
      setIsVideoVisible(true);
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.log('Video autoplay blocked:', err);
        });
      }
    }, 3500);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(videoTimer);
    };
  }, [hasIntroPlayed, onIntroComplete]);

  /* ─── Render ─── */
  return (
    <section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-black select-none motion-blur-target">
      {/* ─── 1. Background Video Layer ─── */}
      <div 
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-[1200ms] z-0 ${
          isVideoVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-[0.7]"
          src={heroBackgroundVideo}
        />
      </div>

      {/* ─── 2. Top Header Navigation (in-flow at top of page) ─── */}
      <Navbar isIntroStarted={isIntroStarted} activePage="home" onNavigate={onNavigate} />

      {/* ─── 3. Flexible Center Spacer ─── */}
      <div className="flex-1"></div>

      {/* ─── 4. Bottom Main Logo & Brand Statement ─── */}
      <div className="relative z-10 w-full px-[0.8333vw] pb-[0.8333vw]">
        {/* Top Text Row Above Giant Logo */}
        <div className="flex justify-between items-end mb-[2.0833vw] overflow-hidden">
          {/* Left Text: "BUILT FOR BRANDS THAT WANT / SOMETHING REAL" */}
          <motion.div
            className="space-y-[0.15vw]"
            initial={hasIntroPlayed ? "visible" : "hidden"}
            animate={isIntroStarted ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: 0.5, staggerChildren: 0.1 } }
            }}
          >
            <div className="overflow-hidden">
              <motion.p
                className="text-[0.6944vw] font-semibold tracking-[-0.03em] leading-[1.2] text-white uppercase"
                variants={{
                  hidden: { y: "100%", opacity: 1 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0, 0.8, 0.2, 1] } }
                }}
              >
                BUILT FOR BRANDS THAT WANT
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="text-[0.6944vw] font-semibold tracking-[-0.03em] leading-[1.2] text-white uppercase"
                variants={{
                  hidden: { y: "100%", opacity: 1 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0, 0.8, 0.2, 1] } }
                }}
              >
                SOMETHING REAL
              </motion.p>
            </div>
          </motion.div>

          {/* Right Text: "CREATING WORLDWIDE ©" */}
          <motion.div
            className="overflow-hidden"
            initial={hasIntroPlayed ? "visible" : "hidden"}
            animate={isIntroStarted ? "visible" : "hidden"}
            variants={{
              hidden: { y: 20, opacity: 1 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0, 0.8, 0.2, 1], delay: 0.9 } }
            }}
          >
            <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-white uppercase">
              CREATING WORLDWIDE ©
            </span>
          </motion.div>
        </div>

        {/* ─── 5. Full-Width Animated Vector Brand Logo ─── */}
        <div className="w-full overflow-hidden">
          <motion.svg
            width="100%"
            viewBox="0 0 1392 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            initial={hasIntroPlayed ? "visible" : "hidden"}
            animate={isIntroStarted ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {logoPaths.map((d, index) => (
              <motion.path
                key={index}
                d={d}
                fill="white"
                variants={{
                  hidden: { y: 110, opacity: 1 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    transition: { duration: 0.8, ease: [0, 0.8, 0.2, 1] } 
                  }
                }}
              />
            ))}
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
