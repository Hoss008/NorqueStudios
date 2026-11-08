import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskedWordStagger from '../MaskedWordStagger';
import ProjectNextOverscroll from './ProjectNextOverscroll';

// Gallery Images following project guidelines & naming conventions:
// 1) Initials of project (FUSION)
// 2) Hero/cover named "Fusion Cover"
// 3) Numbering system determines order (Fusion 1, Fusion 2, Fusion 3, ...)
// 4) Decimal numbering placed next to each other in Two Columns (Fusion 3.1, Fusion 3.2)
import fusionCover from '../../assets/projects/fusion/Fusion Cover.png';
import fusion1 from '../../assets/projects/fusion/Fusion 1.png';
import fusion2 from '../../assets/projects/fusion/Fusion 2.png';
import fusion31 from '../../assets/projects/fusion/Fusion 3.1.png';
import fusion32 from '../../assets/projects/fusion/Fusion 3.2.png';
import fusion4 from '../../assets/projects/fusion/Fusion 4.png';
import fusion5 from '../../assets/projects/fusion/Fusion 5.png';
import fusion6 from '../../assets/projects/fusion/Fusion 6.png';
import fusion71 from '../../assets/projects/fusion/Fusion 7.1.png';
import fusion72 from '../../assets/projects/fusion/Fusion 7.2.png';

/* ========================================================================= */
/* GALLERY IMAGE COMPONENT                                                   */
/* - Container maintains unscaled boundary with overflow: hidden             */
/* - Only the image inside executes scaling & unblur reveal animation        */
/* - Zero hover animations per guidelines                                    */
/* ========================================================================= */
function GalleryImage({ src, alt, delay = 0, className = '' }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.img 
        src={src}
        alt={alt}
        className="w-full h-auto object-cover block will-change-[transform,filter]"
        initial={{ filter: 'blur(20px)', scale: 1.12 }}
        whileInView={{ filter: 'blur(0px)', scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
        loading="lazy"
      />
    </div>
  );
}

/* ========================================================================= */
/* FUSION FORM® SINGLE PROJECT SHOWCASE PAGE                                 */
/* Background: #0a0a0b (architectural obsidian black tone)                   */
/* Animations: 1:1 match with MMS, AXIS, and Stephenson project pages        */
/* ========================================================================= */
export default function FusionFormProjectPage({ onNavigate }) {
  const heroRef = useRef(null);

  // Parallax scroll tracking for cover image: 0 at top, 1 when hero leaves viewport
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#1B0700';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0b] text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      
      {/* ─── 1. HERO SECTION: Exactly 100% Viewport Height (Cover + Description) ─── */}
      <section ref={heroRef} className="w-full min-h-screen md:h-screen md:min-h-[100dvh] flex flex-col justify-start overflow-hidden">
        
        {/* Full-width Cover image matching height (64.6vh) & object-center scale (1.30) */}
        {/* Parallax wrapper: translates down on scroll while unscaled container maintains boundary */}
        <div className="relative w-full h-[64.6vh] min-h-[320px] overflow-hidden flex-shrink-0">
          <motion.div 
            className="w-full h-full will-change-transform"
            style={{ y: parallaxY }}
          >
            <motion.img 
              src={fusionCover} 
              alt="FUSION FORM® Cover"
              className="w-full h-full object-cover object-center block will-change-[transform,opacity]"
              initial={{ scale: 1.38, opacity: 1 }}
              animate={{ scale: 1.30, opacity: 1 }}
              transition={{
                scale: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              }}
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Project Description beneath Cover Image: 14px (1vw) gap matching hero reference */}
        <div className="w-full px-[12px] md:px-[0.8333vw] pt-[14px] md:pt-[1vw] flex-shrink-0">
          <div className="w-full grid grid-cols-12 gap-x-[16px] md:gap-x-[1.111vw]">
            
            {/* Column 1: Client Title & Metadata Table (3 cols) */}
            <div className="col-span-12 md:col-span-3">
              
              {/* Title with masked slide-up reveal */}
              <div className="overflow-hidden pb-[2px] -mb-[2px]">
                <motion.h1 
                  className="text-[13px] md:text-[0.9vw] font-bold tracking-[-0.03em] uppercase text-white leading-[1.2]"
                  initial={{ y: '110%', opacity: 1 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.25, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  FUSION FORM®<br />
                  Architecture Development
                </motion.h1>
              </div>

              {/* Exact Metadata Table sitting beneath Title with 20px (1.4vw) gap */}
              <div className="mt-[20px] md:mt-[1.4vw] flex flex-col space-y-[4px] md:space-y-[0.3vw]">
                {[
                  { label: 'Year', value: '2024' },
                  { label: 'Location', value: 'Egypt' },
                  { label: 'Tags', value: 'Architecture Development, Web Experience' },
                  { label: 'Purpose', value: 'Architecture Firm' },
                ].map((item, idx) => (
                  <div key={item.label} className="overflow-hidden pb-[1px] -mb-[1px]">
                    <motion.div 
                      className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none py-[1px]"
                      initial={{ y: '110%', opacity: 1 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 1.15, delay: 0.60 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="w-[85px] md:w-[6vw] flex-shrink-0 text-white">{item.label}</span>
                      <span className="text-white">{item.value}</span>
                    </motion.div>
                  </div>
                ))}
              </div>

            </div>

            {/* Column 2: Overview Description (9 cols) */}
            {/* Sequential line-by-line masked stagger cascading continuously across all paragraphs with inter-paragraph spacing */}
            <div className="col-span-12 md:col-span-9 mt-[14px] md:mt-0">
              <MaskedWordStagger
                className="text-[13px] md:text-[0.9vw] font-bold tracking-[-0.03em] text-white leading-[1.38] space-y-[16px] md:space-y-[1.15vw]"
                delay={0.50}
                stagger={0.065}
                duration={1.15}
                ease={[0.16, 1, 0.3, 1]}
              >
                <p>
                  Fusion Form® is a cutting-edge architecture development firm dedicated to harmonizing art, design, functionality, and creativity in every project. We serve both residential and commercial clients, crafting spaces that inspire and elevate everyday experiences.
                </p>
                <p>
                  Creating beyond imagination — we create visionary structures that blend aesthetics, functionality, and sustainability — designed today, but built for the future. From concept to completion, the firm delivers integrated architectural solutions across Designing, Planning, and Engineering, combining creativity, strategic thinking, and technical precision.
                </p>
                <p>
                  Our mission is to transform the architectural landscape by integrating artistic expression with functionality, pushing architectural boundaries through innovative design, practical solutions, and environments that resonate with enduring beauty and purpose.
                </p>
              </MaskedWordStagger>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. SHOWCASE GALLERY: Numbered sequence with decimal 2-column pairings ─── */}
      <div className="w-full px-[12px] md:px-[0.8333vw] space-y-[12px] md:space-y-[0.8333vw] pb-[120px] md:pb-[8.3333vw]">
        
        {/* Gallery Image 1: Fusion 1 (Full Width) */}
        <GalleryImage 
          src={fusion1} 
          alt="FUSION FORM® 1" 
        />

        {/* Gallery Image 2: Fusion 2 (Full Width) */}
        <GalleryImage 
          src={fusion2} 
          alt="FUSION FORM® 2" 
        />

        {/* Gallery Row 3: Two Columns (Fusion 3.1 & Fusion 3.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={fusion31} 
            alt="FUSION FORM® 3.1" 
          />
          <GalleryImage 
            src={fusion32} 
            alt="FUSION FORM® 3.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 4: Fusion 4 (Full Width) */}
        <GalleryImage 
          src={fusion4} 
          alt="FUSION FORM® 4" 
        />

        {/* Gallery Image 5: Fusion 5 (Full Width) */}
        <GalleryImage 
          src={fusion5} 
          alt="FUSION FORM® 5" 
        />

        {/* Gallery Image 6: Fusion 6 (Full Width) */}
        <GalleryImage 
          src={fusion6} 
          alt="FUSION FORM® 6" 
        />

        {/* Gallery Row 7: Two Columns (Fusion 7.1 & Fusion 7.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={fusion71} 
            alt="FUSION FORM® 7.1" 
          />
          <GalleryImage 
            src={fusion72} 
            alt="FUSION FORM® 7.2" 
            delay={0.08}
          />
        </div>

        {/* ─── Threshold-triggered Overscroll (Pull-to-action) to Next Project (MMS) ─── */}
        <ProjectNextOverscroll 
          nextProject="project-mms"
          nextPath="/projects/mms"
          nextTitle="MMS ARCHITECTS™"
          onNavigate={onNavigate}
        />

      </div>

    </div>
  );
}
