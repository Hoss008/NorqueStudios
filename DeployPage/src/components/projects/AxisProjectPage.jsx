import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../Footer';

/* ========================================================================= */
/* AXIS® RE PROJECT SHOWCASE PAGE                                            */
/* 1:1 implementation from 'References/Axis Page.fig'                        */
/* ========================================================================= */

export default function AxisProjectPage({ onNavigate, onOpenCMS }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* ─── Top Spacer for pinned Navbar (2.5vw = 36px) ─── */}
      <div className="w-full h-[2.5vw]" aria-hidden="true" />

      {/* ─── 1. Hero Image (1440x473) with Gold Star Emblem ─── */}
      <motion.div 
        className="w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
      >
        <img 
          src="/images/projects/axis/axis-hero.png" 
          alt="AXIS® RE Emblem Hero"
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
              AXIS® — RE<br />Real Estate Company
            </h1>

            {/* Metadata Table (Year, Location, Tags, Purpose) */}
            <div className="w-full divide-y divide-white/10 text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#a0a0a0]">
              <div className="py-[0.4vw] flex justify-between items-center">
                <span className="text-[#6f6f6f] uppercase">Year</span>
                <span className="text-white">2026</span>
              </div>
              <div className="py-[0.4vw] flex justify-between items-center">
                <span className="text-[#6f6f6f] uppercase">Location</span>
                <span className="text-white">Egypt</span>
              </div>
              <div className="py-[0.4vw] flex justify-between items-start">
                <span className="text-[#6f6f6f] uppercase flex-shrink-0 mr-[1vw]">Tags</span>
                <span className="text-white text-right">Brand Development, Content Direction</span>
              </div>
              <div className="py-[0.4vw] flex justify-between items-center">
                <span className="text-[#6f6f6f] uppercase">Purpose</span>
                <span className="text-white">Real Estate Company</span>
              </div>
            </div>
          </div>

          {/* Columns 2-4: Overview Manifesto Paragraph */}
          <div className="md:col-span-3 md:pl-[2vw]">
            <p className="text-[0.9722vw] font-bold tracking-[-0.03em] leading-[1.38] text-white/90">
              AXIS Real Estate is an innovative development and consultancy firm committed to delivering iconic, forward-looking architectural ventures and high-value investment opportunities. By combining strategic market foresight with uncompromising architectural discipline, AXIS shapes living and commercial destinations that set new regional benchmarks for refinement, functionality, and enduring cultural resonance.
            </p>
          </div>

        </div>
      </section>

      {/* ─── 3. Showcase Image Stream ─── */}
      <section className="w-full px-[0.8333vw] space-y-[1.5vw]">
        
        {/* Row 1: Full-Width Identity Showcase (1416x709) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/axis/axis-row1.png" 
            alt="AXIS RE Brand Identity"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 2: Split 2-Column Red / White Lockup (703x546 each) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[0.8333vw]">
          <div className="w-full rounded-[2px] overflow-hidden bg-[#3b0808] border border-white/5">
            <img 
              src="/images/projects/axis/axis-row2-left.png" 
              alt="AXIS Crimson Lockup"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full rounded-[2px] overflow-hidden bg-white border border-white/5">
            <img 
              src="/images/projects/axis/axis-row2-right.png" 
              alt="AXIS Clean White Lockup"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 3: Centered Typographic Statement */}
        <div className="w-full py-[5vw] px-[2vw] flex justify-center items-center">
          <div className="max-w-[57vw] text-center">
            <p className="text-[1.1vw] font-bold tracking-[-0.03em] leading-[1.4] text-white/90">
              AXIS establishes itself as a visionary force in modern real estate consultancy — creating work that stands quietly confident, visually powerful, and unmistakably refined across every cultural touchpoint.
            </p>
          </div>
        </div>

        {/* Row 4: Emblem Vector Graphic on White (1416x648) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-white border border-white/5">
          <img 
            src="/images/projects/axis/axis-row4.png" 
            alt="AXIS Graphic Emblem"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 5: Giant Cropped AXIS Typography (1416x796) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/axis/axis-row5.png" 
            alt="AXIS Giant Typographic Crop"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 6: Split 2-Column Stationery & Business Cards (703x339 each) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[0.8333vw]">
          <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
            <img 
              src="/images/projects/axis/axis-row6-left.png" 
              alt="AXIS Stationery Black Card"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full rounded-[2px] overflow-hidden bg-[#f0f0f0] border border-white/5">
            <img 
              src="/images/projects/axis/axis-row6-right.png" 
              alt="AXIS Stationery Detail"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 7: Monochrome Light & Shadow Texture (1416x709) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/axis/axis-row7.png" 
            alt="AXIS Monochrome Light Texture"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 8: Outdoor Architectural Flags (1416x709) */}
        <div className="w-full rounded-[2px] overflow-hidden bg-[#0c0c0c] border border-white/5">
          <img 
            src="/images/projects/axis/axis-row8.png" 
            alt="AXIS Outdoor Architectural Banners"
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
            onClick={() => onNavigate && onNavigate('project-mms')}
            className="text-[0.9722vw] font-bold tracking-[-0.03em] uppercase text-white hover:opacity-75 transition-opacity cursor-pointer flex items-center space-x-[0.5vw]"
          >
            <span>Next Project: MMS ARCHITECTS™</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ─── 5. Universal Studio Footer ─── */}
      <Footer onOpenCMS={onOpenCMS} />
    </div>
  );
}
