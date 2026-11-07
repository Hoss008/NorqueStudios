import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { logoPaths } from './logoPaths';
import heroBackgroundVideo from '../assets/hero-background.mp4';
import heroPoster from '../assets/hero-poster.jpg';

/* ========================================================================= */
/* HERO SECTION COMPONENT                                                    */
/* Full-screen video hero with sequential typographic rise & brand vectors   */
/* ========================================================================= */
export default function Hero({ onNavigate, onOpenContact, hasIntroPlayed = false, onIntroComplete }) {
  /* ─── State & Sequence Timers ─── */
  const [isIntroStarted, setIsIntroStarted] = useState(hasIntroPlayed);
  const [isTextStarted, setIsTextStarted] = useState(hasIntroPlayed);
  const [isVideoVisible, setIsVideoVisible] = useState(hasIntroPlayed);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // 1. Splash screen synchronization (2.5s)
  useEffect(() => {
    if (hasIntroPlayed) {
      setIsIntroStarted(true);
      return;
    }

    const introTimer = setTimeout(() => {
      setIsIntroStarted(true);
    }, 2500);

    return () => clearTimeout(introTimer);
  }, [hasIntroPlayed]);

  // 2. Chained intro animation sequence: text reveals 0.5s after logo starts rising
  useEffect(() => {
    if (isIntroStarted) {
      if (hasIntroPlayed) {
        setIsTextStarted(true);
        setIsVideoVisible(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        return;
      }

      // Middle text reveals exactly 0.5s after Norque Studios logo starts rising
      const textTimer = setTimeout(() => {
        setIsTextStarted(true);
      }, 500);

      // Fade in background video 0.7s after text starts revealing (1.2s total)
      const videoTimer = setTimeout(() => {
        setIsVideoVisible(true);
        if (videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.log('Video autoplay blocked:', err);
          });
        }
      }, 1200);

      // Mark intro complete
      const completeTimer = setTimeout(() => {
        if (onIntroComplete) {
          onIntroComplete();
        }
      }, 1300);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(videoTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isIntroStarted, hasIntroPlayed, onIntroComplete]);

  /* ─── Render ─── */
  return (
    <section className="relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* ─── 1. Background Video Layer ─── */}
      <div 
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-[1200ms] z-0 ${
          isVideoVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {/* Instant static poster frame 0: Guarantees immediate visual presence during page fade-in */}
        <img
          src={heroPoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] z-0"
          loading="eager"
          fetchPriority="high"
        />

        {/* Video layer: Seamlessly crossfades in once playback begins */}
        <video
          ref={videoRef}
          autoPlay={hasIntroPlayed}
          muted
          loop
          playsInline
          poster={heroPoster}
          onPlaying={() => setIsVideoPlaying(true)}
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.7] z-10 transition-opacity duration-700 ${
            isVideoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          src={heroBackgroundVideo}
        />
      </div>

      {/* ─── 2. Top Header Navigation (in-flow at top of page) ─── */}
      <Navbar isIntroStarted={isIntroStarted} activePage="home" onNavigate={onNavigate} onOpenContact={onOpenContact} />

      {/* ─── 3. Center Brand Statement (44.53% from top, reveals 1.0s after Norque Studios starts) ─── */}
      <div className="absolute top-[44.53%] left-0 right-0 z-10 w-full px-[0.8333vw] pointer-events-none motion-blur-target">
        <div className="flex justify-between items-start overflow-hidden pointer-events-auto w-full">
          {/* Left Text: "BUILT FOR BRANDS THAT WANT / SOMETHING REAL" */}
          <div className="space-y-[0.15vw]">
            <div className="overflow-hidden">
              <motion.p
                className="text-[0.6944vw] font-semibold tracking-[-0.03em] leading-[1.2] text-white uppercase"
                initial={hasIntroPlayed ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
                animate={isTextStarted ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
                transition={{ duration: 0.7, ease: [0, 0.8, 0.2, 1] }}
              >
                BUILT FOR BRANDS THAT WANT
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="text-[0.6944vw] font-semibold tracking-[-0.03em] leading-[1.2] text-white uppercase"
                initial={hasIntroPlayed ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
                animate={isTextStarted ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
                transition={{ duration: 0.7, ease: [0, 0.8, 0.2, 1], delay: 0.12 }}
              >
                SOMETHING REAL
              </motion.p>
            </div>
          </div>

          {/* Right Text: "CREATING WORLDWIDE ©" */}
          <div className="overflow-hidden">
            <motion.p
              className="text-[0.6944vw] font-semibold tracking-[-0.03em] leading-[1.2] text-white uppercase block"
              initial={hasIntroPlayed ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
              animate={isTextStarted ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0, 0.8, 0.2, 1],
                delay: 0.12
              }}
            >
              CREATING WORLDWIDE ©
            </motion.p>
          </div>
        </div>
      </div>

      {/* ─── 4. Flexible Center Spacer ─── */}
      <div className="flex-1"></div>

      {/* ─── 5. Bottom Main Logo ("Norque Studios" vector stagger) ─── */}
      <div className="relative z-10 w-full px-[0.8333vw] pb-[0.8333vw] motion-blur-target">
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
