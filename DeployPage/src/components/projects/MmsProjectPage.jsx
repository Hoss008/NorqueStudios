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
    </div>
  );
}
