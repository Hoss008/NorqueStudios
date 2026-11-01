import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import recentWorksGif from '../assets/recent-works.gif';
import MaskedWordStagger from './MaskedWordStagger';

/* ========================================================================= */
/* SHOWCASE SECTION COMPONENT                                                */
/* Pinned 200vh track with scroll-distance driven reveal of recent works     */
/* ========================================================================= */
export default function Showcase({ onRevealCompleteChange }) {
  const pinTrackRef = useRef(null);
  const scrollProgress = useMotionValue(0);

  /* ─── 1. Scroll-Distance Tracking ─── */
  useEffect(() => {
    let lastComplete = false;

    const handleScroll = () => {
      const el = pinTrackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = el.offsetHeight;
      const vh = window.innerHeight;

      const startY = top;
      const endY = top + height - vh;

      if (endY <= startY) return;

      const p = Math.max(0, Math.min(1, (window.scrollY - startY) / (endY - startY)));
      scrollProgress.set(p);

      const isComplete = p >= 0.99;
      if (isComplete !== lastComplete) {
        lastComplete = isComplete;
        if (onRevealCompleteChange) {
          onRevealCompleteChange(isComplete);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollProgress, onRevealCompleteChange]);

  /* ─── 2. Motion Value Interpolations ─── */
  // Clip path expands smoothly from cropped boundary (0%) to 100% full width matching original margins
  const clipPath = useTransform(scrollProgress, (p) => {
    const insetY = (1 - p) * 16;
    const insetX = (1 - p) * 12;
    const round = (1 - p) * 12;
    return `inset(${insetY.toFixed(2)}% ${insetX.toFixed(2)}% round ${round.toFixed(1)}px)`;
  });

  // Box scale smoothly scales from 0.94 to 1.0 (flush at 100% reveal)
  const boxScale = useTransform(scrollProgress, (p) => {
    return (0.94 + p * 0.06).toFixed(4);
  });

  // Counter-parallax on image anchors visual weight as frame expands
  const imageScale = useTransform(scrollProgress, (p) => {
    return (1.12 - p * 0.12).toFixed(4);
  });

  // Caption smoothly fades in during the last 15% of the scroll track
  const captionOpacity = useTransform(scrollProgress, (p) => {
    if (p <= 0.25) return 0;
    if (p >= 0.85) return 1;
    return ((p - 0.25) / (0.85 - 0.25)).toFixed(3);
  });

  /* ─── Render ─── */
  return (
    <section className="w-full bg-black">
      {/* 200vh Pinning Track */}
      <div ref={pinTrackRef} className="relative w-full h-[200vh]">
        {/* Sticky Fullscreen Viewport Window matching universal 12px (0.8333vw) horizontal margins */}
        <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden px-[0.8333vw] z-10 select-none">
          <div className="w-full flex flex-col">
            {/* Reveal Bounding Box - expands to 100% full width flush with universal margins */}
            <motion.div 
              style={{ clipPath, scale: boxScale }}
              className="w-full aspect-[1416/645.5] overflow-hidden rounded-[0.1389vw] bg-[#121212] will-change-transform shadow-2xl"
            >
              <motion.img 
                style={{ scale: imageScale }}
                src={recentWorksGif} 
                alt="Recent work of branding, web design & development by NORQUE STUDIOS™" 
                className="w-full h-full object-cover rounded-[0.1389vw] block will-change-transform"
                loading="eager"
              />
            </motion.div>

            {/* Subtitle / Caption row under GIF inside pinned container */}
            <motion.div 
              style={{ opacity: captionOpacity }}
              className="w-full flex justify-between items-center mt-[0.5556vw] pt-[0.2778vw]"
            >
              <p className="text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em]">
                Recent work of branding, web design &amp; development by NORQUE STUDIOS™
              </p>
              <p className="text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em]">
                ©2026
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brand Statement / Manifesto follows after unpinning */}
      <div className="w-full px-[0.8333vw] motion-blur-target">
        <div className="pt-[4.1667vw] pb-[9.0278vw]">
          <div className="max-w-[73.3333vw]">
            <MaskedWordStagger className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white space-y-[1.5278vw]">
              <p>
                NORQUE STUDIOS™ — A creative studio for brands that want to build something real. Based between ideas, design and digital, we work across branding, creative direction, UI/UX and web development.
              </p>
              <p>
                We collaborate with ambitious brands, businesses and creative partners to shape identities, digital experiences and visual systems that feel considered, distinctive and built to last. From the first idea to the final detail, we bring strategy, design and development together under one roof.
              </p>
              <p>
                Feel free to explore our{" "}
                <a href="#works" className="text-[#747474] hover:text-white transition-colors duration-300 cursor-pointer">
                  Works
                </a>
                , check our{" "}
                <a 
                  href="https://www.behance.net" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#747474] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Behance
                </a>{" "}
                or say hello at{" "}
                <a 
                  href="mailto:hello@norquestudios.com" 
                  className="text-[#747474] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  hello@norquestudios.com
                </a>
              </p>
            </MaskedWordStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
