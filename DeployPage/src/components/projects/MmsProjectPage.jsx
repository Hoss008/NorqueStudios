<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskedWordStagger from '../MaskedWordStagger';
import ProjectNextOverscroll from './ProjectNextOverscroll';

// Gallery Images following project guidelines & naming conventions:
// 1) Initials of project (MMS)
// 2) Hero/cover named "MMS Cover"
// 3) Numbering system determines order (MMS 1, MMS 2, MMS 3, ...)
// 4) Decimal numbering placed next to each other in Two Columns (MMS 4.1, MMS 4.2)
import mmsCover from '../../assets/projects/mms/MMS Cover.webp';
import mms1 from '../../assets/projects/mms/MMS 1.webp';
import mms2 from '../../assets/projects/mms/MMS 2.webp';
import mms3 from '../../assets/projects/mms/MMS 3.webp';
import mms41 from '../../assets/projects/mms/MMS 4.1.webp';
import mms42 from '../../assets/projects/mms/MMS 4.2.webp';
import mms5 from '../../assets/projects/mms/MMS 5.webp';
import mms6 from '../../assets/projects/mms/MMS 6.webp';
import mms7 from '../../assets/projects/mms/MMS 7.webp';
import mms8 from '../../assets/projects/mms/MMS 8.webp';
import mms91 from '../../assets/projects/mms/MMS 9.1.webp';
import mms92 from '../../assets/projects/mms/MMS 9.2.webp';
import mms10 from '../../assets/projects/mms/MMS 10.webp';
import mms111 from '../../assets/projects/mms/MMS 11.1.webp';
import mms112 from '../../assets/projects/mms/MMS 11.2.webp';
import mms12 from '../../assets/projects/mms/MMS 12.webp';
import mms13 from '../../assets/projects/mms/MMS 13.webp';
import mms14 from '../../assets/projects/mms/MMS 14.webp';

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
/* MMS ARCHITECTS™ SINGLE PROJECT SHOWCASE PAGE                              */
/* Background: #0a0e17 (dark navy architecture studio tone)                  */
/* Intro Animation: 1:1 match with Project Intro Reference.mp4               */
/* ========================================================================= */
export default function MmsProjectPage({ onNavigate }) {
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
    document.body.style.backgroundColor = '#0a0e17';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0a0e17] text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      
      {/* ─── 1. HERO SECTION: Exactly 100% Viewport Height (Cover + Description) ─── */}
      {/* Zero peeking of below gallery images when opening the page; 1:1 match with hero reference.png */}
      <section ref={heroRef} className="w-full min-h-screen md:h-screen md:min-h-[100dvh] flex flex-col justify-start overflow-hidden">
        
        {/* Full-width Cover image matching height (64.6vh) & object-center scale (1.30) making 'MMS ARCHITECTS' centered & big */}
        {/* Parallax wrapper: translates down on scroll while unscaled container maintains boundary */}
        <div className="relative w-full h-[64.6vh] min-h-[320px] overflow-hidden flex-shrink-0">
          <motion.div 
            className="w-full h-full will-change-transform"
            style={{ y: parallaxY }}
          >
            <motion.img 
              src={mmsCover} 
              alt="MMS ARCHITECTS™ Cover"
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
            {/* Positioned together at the top (no vertical stretch/justify-between) matching hero reference */}
            <div className="col-span-12 md:col-span-3">
              
              {/* Title with masked slide-up reveal */}
              <div className="overflow-hidden pb-[2px] -mb-[2px]">
                <motion.h1 
                  className="text-[13px] md:text-[0.9vw] font-bold tracking-[-0.03em] uppercase text-white leading-[1.2]"
                  initial={{ y: '110%', opacity: 1 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.25, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  MMS ARCHITECTS™<br />
                  Architecture Studio
                </motion.h1>
              </div>

              {/* Exact Metadata Table sitting beneath Title with 20px (1.4vw) gap matching reference */}
              <div className="mt-[20px] md:mt-[1.4vw] flex flex-col space-y-[4px] md:space-y-[0.3vw]">
                {[
                  { label: 'Year', value: '2025' },
                  { label: 'Location', value: 'Italy' },
                  { label: 'Tags', value: 'Brand Development, Content Creation' },
                  { label: 'Purpose', value: 'Architecture Studio' },
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
        
        {/* Gallery Image 1: MMS 1 (Full Width) */}
        <GalleryImage 
          src={mms1} 
          alt="MMS ARCHITECTS™ 1" 
        />

        {/* Gallery Image 2: MMS 2 (Full Width) */}
        <GalleryImage 
          src={mms2} 
          alt="MMS ARCHITECTS™ 2" 
        />

        {/* Gallery Image 3: MMS 3 (Full Width) */}
        <GalleryImage 
          src={mms3} 
          alt="MMS ARCHITECTS™ 3" 
        />

        {/* Gallery Row 4: Two Columns (MMS 4.1 & MMS 4.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={mms41} 
            alt="MMS ARCHITECTS™ 4.1" 
          />
          <GalleryImage 
            src={mms42} 
            alt="MMS ARCHITECTS™ 4.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 5: MMS 5 (Full Width) */}
        <GalleryImage 
          src={mms5} 
          alt="MMS ARCHITECTS™ 5" 
        />

        {/* Gallery Image 6: MMS 6 (Full Width) */}
        <GalleryImage 
          src={mms6} 
          alt="MMS ARCHITECTS™ 6" 
        />

        {/* Gallery Image 7: MMS 7 (Full Width) */}
        <GalleryImage 
          src={mms7} 
          alt="MMS ARCHITECTS™ 7" 
        />

        {/* Gallery Image 8: MMS 8 (Full Width) */}
        <GalleryImage 
          src={mms8} 
          alt="MMS ARCHITECTS™ 8" 
        />

        {/* Gallery Row 9: Two Columns (MMS 9.1 & MMS 9.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={mms91} 
            alt="MMS ARCHITECTS™ 9.1" 
          />
          <GalleryImage 
            src={mms92} 
            alt="MMS ARCHITECTS™ 9.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 10: MMS 10 (Full Width) */}
        <GalleryImage 
          src={mms10} 
          alt="MMS ARCHITECTS™ 10" 
        />

        {/* Gallery Row 11: Two Columns (MMS 11.1 & MMS 11.2 side by side) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[0.8333vw]">
          <GalleryImage 
            src={mms111} 
            alt="MMS ARCHITECTS™ 11.1" 
          />
          <GalleryImage 
            src={mms112} 
            alt="MMS ARCHITECTS™ 11.2" 
            delay={0.08}
          />
        </div>

        {/* Gallery Image 12: MMS 12 (Full Width) */}
        <GalleryImage 
          src={mms12} 
          alt="MMS ARCHITECTS™ 12" 
        />

        {/* Gallery Image 13: MMS 13 (Full Width) */}
        <GalleryImage 
          src={mms13} 
          alt="MMS ARCHITECTS™ 13" 
        />

        {/* Gallery Image 14: MMS 14 (Full Width) */}
        <GalleryImage 
          src={mms14} 
          alt="MMS ARCHITECTS™ 14" 
        />

        {/* ─── Threshold-triggered Overscroll (Pull-to-action) to Next Project (Axis) ─── */}
        <ProjectNextOverscroll 
          nextProject="project-axis"
          nextPath="/projects/axis"
          nextTitle="AXIS® — RE"
          onNavigate={onNavigate}
        />

      </div>

=======
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../Footer';

/* ========================================================================= */
/* MMS ARCHITECTS™ PROJECT SHOWCASE PAGE                                     */
/* 1:1 implementation from 'References/MMS Page.fig'                         */
/* ========================================================================= */

export default function MmsProjectPage({ onNavigate, onOpenCMS }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* ─── Top Spacer for pinned Navbar (2.5vw = 36px) ─── */}
      <div className="w-full h-[2.5vw]" aria-hidden="true" />

      {/* ─── 1. Hero Image (1440x473) ─── */}
      <motion.div 
        className="w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
      >
        <img 
          src="/images/projects/mms/mms-hero.png" 
          alt="MMS ARCHITECTS™ Hero"
          className="w-full h-auto object-cover max-h-[32.85vw]"
          loading="eager"
        />
      </motion.div>

      {/* ─── 2. Project Metadata & Overview Statement ─── */}
      <section className="w-full px-[0.8333vw] mt-[2.5vw] mb-[4.5vw]">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-x-[0.8333vw] gap-y-[2vw]">
          
          {/* Column 1: Client Title & Metadata Table */}
          <div className="flex flex-col">
            <h1 className="text-[0.9722vw] font-bold tracking-[-0.03em] uppercase text-white leading-tight mb-[1.2vw]">
              MMS ARCHITECTS™<br />Architecture Studio
            </h1>

            {/* Metadata Table (Year, Location, Tags, Purpose) */}
            <div className="w-full divide-y divide-white/10 text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#a0a0a0]">
              <div className="py-[0.4vw] flex justify-between items-center">
                <span className="text-[#6f6f6f] uppercase">Year</span>
                <span className="text-white">2025</span>
              </div>
              <div className="py-[0.4vw] flex justify-between items-center">
                <span className="text-[#6f6f6f] uppercase">Location</span>
                <span className="text-white">Italy</span>
              </div>
              <div className="py-[0.4vw] flex justify-between items-start">
                <span className="text-[#6f6f6f] uppercase flex-shrink-0 mr-[1vw]">Tags</span>
                <span className="text-white text-right">Brand Development, Content Direction</span>
              </div>
              <div className="py-[0.4vw] flex justify-between items-center">
                <span className="text-[#6f6f6f] uppercase">Purpose</span>
                <span className="text-white">Architecture Studio</span>
              </div>
            </div>
          </div>

          {/* Columns 2-4: Overview Manifesto Paragraph */}
          <div className="md:col-span-3 md:pl-[2vw]">
            <p className="text-[0.9722vw] font-bold tracking-[-0.03em] leading-[1.38] text-white/90">
              MMS ARCHITECTS is a modern architectural and interior design studio focused on creating refined, calm, and luxurious spaces through minimal design. The studio believes that true luxury is not found in excess, but in clarity, balance, and thoughtful simplicity. Specializing in modern villas, residential architecture, and interior design, MMS delivers spaces that feel elegant, functional, and timeless. Each project is treated as a unique artistic composition — where form, space, light, and proportion work together seamlessly. With international experience across different cultures and building codes, MMS Architecture offers a global design perspective while maintaining a strong, recognizable minimal identity. From concept to execution, the studio provides fully integrated design solutions that balance aesthetics, practicality, and technical precision. MMS ARCHITECTS aims to establish itself as a globally recognized name in modern minimal architecture — creating work that stands quietly confident, visually powerful, and unmistakably refined.
            </p>
          </div>

        </div>
      </section>

      {/* ─── 3. Showcase Image Stream ─── */}
      <section className="w-full px-[0.8333vw] space-y-[1.5vw]">
        
        {/* Row 1: Stationery Showcase (1416x709) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/mms/mms-row1.png" 
            alt="MMS Architecture Stationery"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 2: Large Ribbon Structure Showcase (1416x1100) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/mms/mms-row2.png" 
            alt="MMS Architecture Ribbon Structure"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 3: Centered Typographic Philosophy Quote Block */}
        <div className="w-full py-[5vw] px-[2vw] flex justify-center items-center">
          <div className="max-w-[57vw] text-center">
            <p className="text-[1.1vw] font-bold tracking-[-0.03em] leading-[1.4] text-white/90">
              MMS ARCHITECTS is a modern architectural and interior design studio focused on creating refined, calm, and luxurious spaces through minimal design. The studio believes that true luxury is not found in excess, but in clarity, balance, and thoughtful simplicity. Specializing in modern villas, residential architecture, and interior design, MMS delivers spaces that feel elegant, functional, and timeless.
            </p>
          </div>
        </div>

        {/* Row 4: Printed Architecture Booklet (1416x944) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/mms/mms-row4.png" 
            alt="MMS Printed Portfolio Booklet"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 5: Giant Outlined Typographic MMS Structure (1416x796) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/mms/mms-row5.png" 
            alt="MMS Giant Typographic Structure"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 6: Color Palette & Brand Mark Variants (1416x682) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/mms/mms-row6.png" 
            alt="MMS Brand Mark Variants and Colors"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 7: Brand Standards & Water Crystals Composition (1416x709) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/mms/mms-row7.png" 
            alt="MMS Brand Standards Composition"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

      </section>

      {/* ─── 4. Next Project & Navigation Bar ─── */}
      <section className="w-full px-[0.8333vw] my-[5vw] border-t border-b border-white/10 py-[2vw]">
        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('works')}
            className="text-[0.6944vw] font-semibold tracking-[-0.03em] uppercase text-[#797979] hover:text-white transition-colors cursor-pointer flex items-center space-x-[0.4vw]"
          >
            <span>←</span>
            <span>Back to Works</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('project-axis')}
            className="text-[0.9722vw] font-bold tracking-[-0.03em] uppercase text-white hover:opacity-75 transition-opacity cursor-pointer flex items-center space-x-[0.5vw]"
          >
            <span>Next Project: AXIS® RE</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ─── 5. Universal Studio Footer ─── */}
      <Footer onOpenCMS={onOpenCMS} />
>>>>>>> ffffe88 (feat: add dedicated project showcase pages for MMS and Axis matching Figma references)
    </div>
  );
}
