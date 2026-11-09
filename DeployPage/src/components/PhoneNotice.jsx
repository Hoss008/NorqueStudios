import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SplashScreen from './SplashScreen';
import MaskedWordStagger from './MaskedWordStagger';
import heroBackgroundVideo from '../assets/hero-background.mp4';
import heroPoster from '../assets/hero-poster.jpg';

/* ========================================================================= */
/* PHONE VERSION NOTICE VIEW                                                 */
/* Displayed when visitor accesses the site from a mobile phone              */
/* Starts with brand splash screen, reveals content with paragraph stagger,  */
/* and loops cinematic hero background video behind it                       */
/* ========================================================================= */
export default function PhoneNotice() {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const videoRef = useRef(null);

  // Guarantee background video autoplay on mobile browsers (iOS WebKit / Android)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full min-h-[100dvh] bg-black text-white flex flex-col justify-between p-6 sm:p-10 z-[9999999] select-none font-beausite font-semibold overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* ─── 1. Splash Screen Animation ─── */}
      {!isSplashComplete && (
        <SplashScreen onComplete={() => setIsSplashComplete(true)} />
      )}

      {/* ─── 2. Looping Background Video ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          className="w-full h-full object-cover brightness-[0.55] opacity-75"
          src={heroBackgroundVideo}
        />
        {/* Subtle vignette/dark overlay for optimal typographic legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ─── 3. Top Header ─── */}
      <motion.div 
        className="relative z-10 w-full flex justify-between items-center text-[12px] tracking-[-0.03em] uppercase text-[#747474]"
        initial={{ opacity: 0, y: -10 }}
        animate={isSplashComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.6, ease: [0, 0.8, 0.2, 1] }}
      >
        <span>NORQUE STUDIOS™</span>
      </motion.div>

      {/* ─── 4. Centered Message with Line/Word Stagger Effect ─── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto px-4">
        {isSplashComplete && (
          <MaskedWordStagger 
            delay={0.12}
            stagger={0.07}
            className="w-full max-w-[340px] sm:max-w-[380px] text-center"
          >
            <p className="text-[19px] sm:text-[22px] font-semibold text-white tracking-[-0.03em] leading-[1.32] text-center selection:bg-white selection:text-black">
              Phone version is still in the works, please open from your desktop browser for better experience
            </p>
          </MaskedWordStagger>
        )}
      </div>

      {/* ─── 5. Bottom Footer ─── */}
      <motion.div 
        className="relative z-10 w-full flex justify-between items-center text-[11px] tracking-[-0.03em] text-[#747474]"
        initial={{ opacity: 0, y: 10 }}
        animate={isSplashComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: [0, 0.8, 0.2, 1] }}
      >
        <span>NORQUE™</span>
        <span>© {new Date().getFullYear()}</span>
      </motion.div>
    </div>
  );
}
