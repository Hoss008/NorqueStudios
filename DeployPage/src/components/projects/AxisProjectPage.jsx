import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskedWordStagger from '../MaskedWordStagger';
import ProjectNextOverscroll from './ProjectNextOverscroll';

// Gallery Images following project guidelines & naming conventions:
// 1) Initials of project (AXIS)
// 2) Hero/cover named "AXIS Cover"
// 3) Numbering system determines order (AXIS 1, AXIS 2, AXIS 3, ...)
// 4) Decimal numbering placed next to each other in Two Columns (AXIS 2.1, AXIS 2.2)
import axisCover from '../../assets/projects/axis/AXIS Cover.webp';
import axis1 from '../../assets/projects/axis/AXIS 1.webp';
import axis21 from '../../assets/projects/axis/AXIS 2.1.webp';
import axis22 from '../../assets/projects/axis/AXIS 2.2.webp';
import axis3 from '../../assets/projects/axis/AXIS 3.webp';
import axis41 from '../../assets/projects/axis/AXIS 4.1.webp';
import axis42 from '../../assets/projects/axis/AXIS 4.2.webp';
import axis51 from '../../assets/projects/axis/AXIS 5.1.webp';
import axis52 from '../../assets/projects/axis/AXIS 5.2.webp';
import axis6 from '../../assets/projects/axis/AXIS 6.webp';
import axis7 from '../../assets/projects/axis/AXIS 7.webp';
import axis8 from '../../assets/projects/axis/AXIS 8.webp';
import axis9 from '../../assets/projects/axis/AXIS 9.webp';
import axis10 from '../../assets/projects/axis/AXIS 10.webp';

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
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.35, delay, ease: [0.16, 1, 0.3, 1] }}
        loading="lazy"
      />
    </div>
  );
}

/* ========================================================================= */
/* AXIS® — RE SINGLE PROJECT SHOWCASE PAGE                                   */
/* Background: #170103 (dark crimson tone preserved per guidelines)          */
/* Animations: 1:1 match with MMS Project Page animations                    */
/* ========================================================================= */
export default function AxisProjectPage({ onNavigate }) {
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
    document.body.style.backgroundColor = '#170103';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#170103] text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      
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
              src={axisCover} 
              alt="AXIS® — RE Cover"
              className="w-full h-full object-cover object-center block will-change-[transform,opacity]"
              initial={{ scale: 1.38, opacity: 0 }}
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
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.25, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  AXIS® — RE<br />
                  Real Estate Company
                </motion.h1>
              </div>

              {/* Exact Metadata Table sitting beneath Title with 20px (1.4vw) gap */}
              <div className="mt-[20px] md:mt-[1.4vw] flex flex-col space-y-[4px] md:space-y-[0.3vw]">
                {[
                  { label: 'Year', value: '2026' },
                  { label: 'Location', value: 'Egypt' },
                  { label: 'Tags', value: 'Brand Development, Content Direction' },
                  { label: 'Purpose', value: 'Real Estate Company' },
                ].map((item, idx) => (
                  <div key={item.label} className="overflow-hidden pb-[1px] -mb-[1px]">
                    <motion.div 
                      className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none py-[1px]"
                      initial={{ y: '110%', opacity: 0 }}
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
                  MMS ARCHITECTS is a modern architectural and interior design studio focused on creating refined, calm, and luxurious spaces through minimal design. The studio believes that true luxury is not found in excess, but in clarity, balance, and thoughtful simplicity. Specializing in modern villas, residential architecture, and interior design, MMS delivers spaces that feel elegant, functional, and timeless. Each project is treated as a unique artistic composition — where form, space, light, and proportion work together seamlessly.
                </p>
                <p>
                  With international experience across different cultures and building codes, MMS Architecture offers a global design perspective while maintaining a strong, recognizable minimal identity. From concept to execution, the studio provides fully integrated design solutions that balance aesthetics, practicality, and technical precision.
                </p>
                <p>
                  MMS ARCHITECTS aims to establish itself as a globally recognized name in modern minimal architecture — creating work that stands quietly confident, visually powerful, and unmistakably refined.
                </p>
              </MaskedWordStagger>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. SHOWCASE GALLERY: Numbered sequence with decimal 2-column pairings ─── */}
      <div className="w-full px-[12px] md:px-[0.8333vw] space-y-[12px] md:space-y-[0.8333vw] pb-[120px] md:pb-[8.3333vw]">
        
        {/* Gallery Image 1: AXIS 1 (Full Width) */}
        <GalleryImage 
          src={axis1} 
          alt="AXIS® — RE 1" 
        />

        {/* Gallery Row 2: Two Columns (AXIS 2.1 & AXIS 2.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={axis21} 
            alt="AXIS® — RE 2.1" 
          />
          <GalleryImage 
            src={axis22} 
            alt="AXIS® — RE 2.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 3: AXIS 3 (Full Width) */}
        <GalleryImage 
          src={axis3} 
          alt="AXIS® — RE 3" 
        />

        {/* Gallery Row 4: Two Columns (AXIS 4.1 & AXIS 4.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={axis41} 
            alt="AXIS® — RE 4.1" 
          />
          <GalleryImage 
            src={axis42} 
            alt="AXIS® — RE 4.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Row 5: Two Columns (AXIS 5.1 & AXIS 5.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={axis51} 
            alt="AXIS® — RE 5.1" 
          />
          <GalleryImage 
            src={axis52} 
            alt="AXIS® — RE 5.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 6: AXIS 6 (Full Width) */}
        <GalleryImage 
          src={axis6} 
          alt="AXIS® — RE 6" 
        />

        {/* Gallery Image 7: AXIS 7 (Full Width) */}
        <GalleryImage 
          src={axis7} 
          alt="AXIS® — RE 7" 
        />

        {/* Gallery Image 8: AXIS 8 (Full Width) */}
        <GalleryImage 
          src={axis8} 
          alt="AXIS® — RE 8" 
        />

        {/* Gallery Image 9: AXIS 9 (Full Width) */}
        <GalleryImage 
          src={axis9} 
          alt="AXIS® — RE 9" 
        />

        {/* Gallery Image 10: AXIS 10 (Full Width) */}
        <GalleryImage 
          src={axis10} 
          alt="AXIS® — RE 10" 
        />

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
