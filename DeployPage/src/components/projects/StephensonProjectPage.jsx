import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskedWordStagger from '../MaskedWordStagger';
import ProjectNextOverscroll from './ProjectNextOverscroll';

// Gallery Images following project guidelines & naming conventions:
// 1) Initials of project (STPN)
// 2) Hero/cover named "STPN Cover"
// 3) Numbering system determines order (STPN 1, STPN 2, STPN 3, ...)
// 4) Decimal numbering placed next to each other in Two Columns (STPN 3.1, STPN 3.2)
import stpnCover from '../../assets/projects/stephenson/STPN Cover.webp';
import stpn1 from '../../assets/projects/stephenson/STPN 1.webp';
import stpn2 from '../../assets/projects/stephenson/STPN 2.webp';
import stpn31 from '../../assets/projects/stephenson/STPN 3.1.webp';
import stpn32 from '../../assets/projects/stephenson/STPN 3.2.webp';
import stpn4 from '../../assets/projects/stephenson/STPN 4.webp';
import stpn51 from '../../assets/projects/stephenson/STPN 5.1.webp';
import stpn52 from '../../assets/projects/stephenson/STPN 5.2.webp';
import stpn6 from '../../assets/projects/stephenson/STPN 6.webp';
import stpn71 from '../../assets/projects/stephenson/STPN 7.1.webp';
import stpn72 from '../../assets/projects/stephenson/STPN 7.2.webp';
import stpn81 from '../../assets/projects/stephenson/STPN 8.1.webp';
import stpn82 from '../../assets/projects/stephenson/STPN 8.2.webp';
import stpn9 from '../../assets/projects/stephenson/STPN 9.webp';
import stpn101 from '../../assets/projects/stephenson/STPN 10.1.webp';
import stpn102 from '../../assets/projects/stephenson/STPN 10.2.webp';
import stpn11 from '../../assets/projects/stephenson/STPN 11.webp';
import stpn121 from '../../assets/projects/stephenson/STPN 12.1.webp';
import stpn122 from '../../assets/projects/stephenson/STPN 12.2.webp';
import stpn131 from '../../assets/projects/stephenson/STPN 13.1.webp';
import stpn132 from '../../assets/projects/stephenson/STPN 13.2.webp';
import stpn14 from '../../assets/projects/stephenson/STPN 14.webp';

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
/* STEPHENSON® SINGLE PROJECT SHOWCASE PAGE                                  */
/* Background: #0c0d0e (quiet luxury Japanese minimalist tone)              */
/* Animations: 1:1 match with MMS and AXIS project page animations           */
/* ========================================================================= */
export default function StephensonProjectPage({ onNavigate }) {
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
    document.body.style.backgroundColor = '#100C0B';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#100C0B] text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      
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
              src={stpnCover} 
              alt="STEPHENSON® Cover"
              className="w-full h-full object-cover object-center block will-change-[transform,opacity]"
              initial={{ scale: 1.38, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
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
                  STEPHENSON®<br />
                  Clothing Brand
                </motion.h1>
              </div>

              {/* Exact Metadata Table sitting beneath Title with 20px (1.4vw) gap */}
              <div className="mt-[20px] md:mt-[1.4vw] flex flex-col space-y-[4px] md:space-y-[0.3vw]">
                {[
                  { label: 'Year', value: '2025' },
                  { label: 'Location', value: 'Saudi Arabia' },
                  { label: 'Tags', value: 'Brand Development, Art Direction' },
                  { label: 'Purpose', value: 'Clothing Brand' },
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
                  Classic heritage meets modern Japanese restraint. Stephenson is a wearable identity — a quiet form of luxury that draws from the calm confidence of the Stephenson star and the philosophy of Japanese minimalism. This brand is conceived for individuals who express presence without noise.
                </p>
                <p>
                  Reflecting a refined fusion of Japanese minimalism and contemporary tailoring, the silhouette is calm and intentional, built around relaxed structure and uninterrupted form. Wide, fluid trousers and a wrap-style top create a sense of ease while maintaining architectural precision. The garment moves naturally with the body, emphasizing comfort without compromising elegance.
                </p>
                <p>
                  Materials are selected for durability and tactile warmth, designed to age beautifully and develop character over time. From Riyadh to the global stage, Stephenson stands as an understated uniform — a quiet expression of discipline, presence, and modern restraint.
                </p>
              </MaskedWordStagger>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. SHOWCASE GALLERY: Numbered sequence with decimal 2-column pairings ─── */}
      <div className="w-full px-[12px] md:px-[0.8333vw] space-y-[12px] md:space-y-[0.8333vw] pb-[120px] md:pb-[8.3333vw]">
        
        {/* Gallery Image 1: STPN 1 (Full Width) */}
        <GalleryImage 
          src={stpn1} 
          alt="STEPHENSON® 1" 
        />

        {/* Gallery Image 2: STPN 2 (Full Width) */}
        <GalleryImage 
          src={stpn2} 
          alt="STEPHENSON® 2" 
        />

        {/* Gallery Row 3: Two Columns (STPN 3.1 & STPN 3.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn31} 
            alt="STEPHENSON® 3.1" 
          />
          <GalleryImage 
            src={stpn32} 
            alt="STEPHENSON® 3.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 4: STPN 4 (Full Width) */}
        <GalleryImage 
          src={stpn4} 
          alt="STEPHENSON® 4" 
        />

        {/* Gallery Row 5: Two Columns (STPN 5.1 & STPN 5.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn51} 
            alt="STEPHENSON® 5.1" 
          />
          <GalleryImage 
            src={stpn52} 
            alt="STEPHENSON® 5.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 6: STPN 6 (Full Width) */}
        <GalleryImage 
          src={stpn6} 
          alt="STEPHENSON® 6" 
        />

        {/* Gallery Row 7: Two Columns (STPN 7.1 & STPN 7.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn71} 
            alt="STEPHENSON® 7.1" 
          />
          <GalleryImage 
            src={stpn72} 
            alt="STEPHENSON® 7.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Row 8: Two Columns (STPN 8.1 & STPN 8.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn81} 
            alt="STEPHENSON® 8.1" 
          />
          <GalleryImage 
            src={stpn82} 
            alt="STEPHENSON® 8.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 9: STPN 9 (Full Width) */}
        <GalleryImage 
          src={stpn9} 
          alt="STEPHENSON® 9" 
        />

        {/* Gallery Row 10: Two Columns (STPN 10.1 & STPN 10.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn101} 
            alt="STEPHENSON® 10.1" 
          />
          <GalleryImage 
            src={stpn102} 
            alt="STEPHENSON® 10.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 11: STPN 11 (Full Width) */}
        <GalleryImage 
          src={stpn11} 
          alt="STEPHENSON® 11" 
        />

        {/* Gallery Row 12: Two Columns (STPN 12.1 & STPN 12.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn121} 
            alt="STEPHENSON® 12.1" 
          />
          <GalleryImage 
            src={stpn122} 
            alt="STEPHENSON® 12.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Row 13: Two Columns (STPN 13.1 & STPN 13.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={stpn131} 
            alt="STEPHENSON® 13.1" 
          />
          <GalleryImage 
            src={stpn132} 
            alt="STEPHENSON® 13.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 14: STPN 14 (Full Width) */}
        <GalleryImage 
          src={stpn14} 
          alt="STEPHENSON® 14" 
        />

        {/* ─── Threshold-triggered Overscroll (Pull-to-action) to Next Project (Fusion Form) ─── */}
        <ProjectNextOverscroll 
          nextProject="project-fusion-form"
          nextPath="/projects/fusion-form"
          nextTitle="FUSION FORM®"
          onNavigate={onNavigate}
        />

      </div>

    </div>
  );
}
