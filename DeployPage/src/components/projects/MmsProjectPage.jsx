import React, { useEffect } from 'react';

/* ========================================================================= */
/* MMS ARCHITECTS™ PROJECT SHOWCASE PAGE                                     */
/* 1:1 Implementation from 'References/MMS Page.fig'                         */
/* Background Color: #0a0e17 (rgba(10, 14, 23, 1))                           */
/* ========================================================================= */

export default function MmsProjectPage() {
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
      
      {/* ─── Screen 1: Exactly 100% Viewport Height (Hero Image + Project Info) ─── */}
      <section className="w-full h-screen flex flex-col justify-between pb-[12px] md:pb-[0.8333vw]">
        {/* Full-width Hero image starting at top: 0, completely filling behind the fixed Navbar */}
        <div className="relative w-full flex-1 min-h-0 overflow-hidden">
          <img 
            src="/images/projects/mms/mms-hero.png" 
            alt="MMS ARCHITECTS™ Hero"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Project Data beneath Hero Image with exact Figma gap (12px) */}
        <div className="w-full px-[12px] md:px-[0.8333vw] pt-[12px] md:pt-[0.8333vw] flex-shrink-0">
          <div className="w-full grid grid-cols-12 gap-x-[12px] md:gap-x-[0.8333vw]">
            
            {/* Column 1: Client Title & Metadata (3 cols / 345px) */}
            <div className="col-span-12 md:col-span-3 flex flex-col">
              <h1 className="text-[14px] md:text-[0.9722vw] font-bold tracking-[-0.03em] uppercase text-white leading-[1.2] mb-[26px] md:mb-[1.8055vw]">
                MMS ARCHITECTS™<br />
                Architecture Studio
              </h1>

              {/* Exact Figma Metadata Table (Fixed 119px label column, pure white text, no borders) */}
              <div className="flex flex-col space-y-[2px]">
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Year</span>
                  <span>2025</span>
                </div>
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Location</span>
                  <span>Italy</span>
                </div>
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Tags</span>
                  <span>Brand Development, Content Direction</span>
                </div>
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Purpose</span>
                  <span>Architecture Studio</span>
                </div>
              </div>
            </div>

            {/* Columns 2-4: Overview Description (9 cols / 1060px) */}
            <div className="col-span-12 md:col-span-9 mt-[16px] md:mt-0">
              <p className="text-[14px] md:text-[0.9722vw] font-bold tracking-[-0.03em] text-white leading-[1.2]">
                MMS ARCHITECTS is a modern architectural and interior design studio focused on creating refined, calm, and luxurious spaces through minimal design. The studio believes that true luxury&nbsp;is not found in excess, but in clarity, balance, and thoughtful simplicity. Specializing in modern villas, residential architecture, and interior design, MMS delivers spaces&nbsp; that feel elegant, functional, and timeless. Each project is treated as a unique artistic&nbsp;composition — where form, space, light, and proportion work together seamlessly. With international experience across different cultures and building codes, MMS Architecture&nbsp;offers a global design perspective while maintaining a strong, recognizable minimal identity.&nbsp;From concept to execution, the studio provides fully integrated design solutions that balance aesthetics, practicality, and technical precision. MMS ARCHITECTS aims to establish itself as a globally recognized name in modern minimal&nbsp;architecture — creating work that stands quietly confident, visually powerful, and unmistakably&nbsp;refined.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Subsequent Showcase Gallery (Rows 1 to 7) ─── */}
      <div className="w-full px-[12px] md:px-[0.8333vw] space-y-[12px] md:space-y-[0.8333vw] pb-[156px] md:pb-[10.8333vw]">
        
        {/* Row 1: Stationery Composition (1416x709) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/mms/mms-row1.png" 
            alt="MMS Architecture Stationery"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 2: Ribbon Structure (1416x1100) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/mms/mms-row2.png" 
            alt="MMS Architecture Ribbon Structure"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 3: Editorial Manifesto Statement (1179x365, centered) */}
        <div className="w-full flex justify-center py-[72px] md:py-[5vw]">
          <div className="w-full max-w-[1179px] text-[14px] md:text-[0.9722vw] font-bold tracking-[-0.03em] text-white leading-[1.2] space-y-[1.2em]">
            <p>
              MMS ARCHITECTS is a modern architectural and interior design studio focused on creating refined, calm, and luxurious spaces through minimal design. The studio believes that true luxury&nbsp;is not found in excess, but in clarity, balance, and thoughtful simplicity. Specializing in modern villas, residential architecture, and interior design, MMS delivers spaces&nbsp; that feel elegant, functional, and timeless. Each project is treated as a unique artistic&nbsp;composition — where form, space, light, and proportion work together seamlessly.
            </p>
            <p>
              With international experience across different cultures and building codes, MMS Architecture&nbsp;offers a global design perspective while maintaining a strong, recognizable minimal identity.&nbsp;From concept to execution, the studio provides fully integrated design solutions that balance aesthetics, practicality, and technical precision.
            </p>
            <p>
              MMS ARCHITECTS aims to establish itself as a globally recognized name in modern minimal&nbsp;architecture — creating work that stands quietly confident, visually powerful, and unmistakably&nbsp;refined.
            </p>
          </div>
        </div>

        {/* Row 4: Printed Booklet (1416x944) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/mms/mms-row4.png" 
            alt="MMS Printed Portfolio Booklet"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 5: Giant Typographic Structure (1416x796) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/mms/mms-row5.png" 
            alt="MMS Giant Typographic Structure"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 6: Logo Variants & Colorways (1416x682) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/mms/mms-row6.png" 
            alt="MMS Brand Mark Variants and Colors"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 7: Brand Standards & Water Crystal Composition (1416x709) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/mms/mms-row7.png" 
            alt="MMS Brand Standards Composition"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

      </div>

    </div>
  );
}
