import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DoneByHumansLogo from './DoneByHumansLogo';
import NorqueCircleLogo from './NorqueCircleLogo';
import MaskedWordStagger from './MaskedWordStagger';
import doneByHumansBg from '../assets/done-by-humans-bg.webp';

/* ========================================================================= */
/* DONE BY HUMANS SECTION COMPONENT                                          */
/* Full-bleed cinematic visual break with parallax background & manifesto   */
/* Extracted 1:1 from Homepage.fig (pure flat aesthetics, zero shadows)      */
/* ========================================================================= */
export default function DoneByHumans() {
  const containerRef = useRef(null);

  // Parallax scroll tracking: 0 when section enters bottom, 1 when section leaves top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation: background moves smoothly as user scrolls past
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="w-full bg-black mb-[10.8333vw]">
      {/* ─── 1. Cinematic Background Image Container (706px / 1440px = 49.0278vw) ─── */}
      <div className="relative w-full h-[49.0278vw] overflow-hidden flex flex-col justify-between select-none">
        {/* Parallax background wrapper: ONLY the image moves with parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ y, willChange: 'transform' }}
        >
          <img 
            src={doneByHumansBg} 
            alt="Done by Humans" 
            className="absolute -top-[15%] left-0 w-full h-[130%] object-cover brightness-[0.9] contrast-[0.95]"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* ─── 2. Top "DONE BY HUMANS" Vector Mark (Static, unaffected by parallax) ─── */}
        <div className="relative z-10 w-full pt-[4.1667vw] px-[3.737vw] flex justify-center motion-blur-target">
          <div className="w-full max-w-[92.5243vw]">
            <DoneByHumansLogo className="w-full h-auto text-white" />
          </div>
        </div>

        {/* ─── 3. Bottom Centered Circle Mark & Statement (Static, unaffected by parallax) ─── */}
        <div className="relative z-10 w-full pb-[4.1667vw] px-[0.8333vw] flex flex-col items-center motion-blur-target">
          {/* Centered Circle Mark (47.27px / 1440px = 3.2825vw) */}
          <div className="w-[3.2825vw] h-auto mb-[1.8056vw]">
            <NorqueCircleLogo className="w-full h-auto text-white" />
          </div>

          {/* Centered Manifesto Statement (887px / 1440px = 61.5979vw) */}
          <div className="w-full max-w-[61.5979vw]">
            <MaskedWordStagger className="text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-[1.2] text-center selection:bg-white selection:text-black">
              We believe the best work happens when human perspective meets thoughtful execution. Every idea begins with a conversation, every decision has a reason, and every detail is considered. Because behind every project, there are people, and behind every meaningful result, there is a partnership built on understanding.
            </MaskedWordStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
