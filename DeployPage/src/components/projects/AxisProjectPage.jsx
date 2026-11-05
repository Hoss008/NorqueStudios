import React, { useEffect } from 'react';

/* ========================================================================= */
/* AXIS® RE PROJECT SHOWCASE PAGE                                            */
/* 1:1 Implementation from 'References/Axis Page.fig'                        */
/* Background Color: #170103 (rgba(23, 1, 3, 1))                             */
/* ========================================================================= */

export default function AxisProjectPage() {
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
      
      {/* ─── Screen 1: Exactly 100% Viewport Height (Hero Image + Project Info) ─── */}
      <section className="w-full h-screen flex flex-col justify-between pb-[12px] md:pb-[0.8333vw]">
        {/* Full-width Hero image starting at top: 0, completely filling behind the fixed Navbar */}
        <div className="relative w-full flex-1 min-h-0 overflow-hidden">
          <img 
            src="/images/projects/axis/axis-hero.png" 
            alt="AXIS® RE Emblem Hero"
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
                AXIS® — RE
              </h1>

              {/* Exact Figma Metadata Table (Fixed 119px label column, pure white text, no borders) */}
              <div className="flex flex-col space-y-[2px]">
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Year</span>
                  <span>2026</span>
                </div>
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Location</span>
                  <span>Egypt</span>
                </div>
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Tags</span>
                  <span>Brand Development, Content Direction</span>
                </div>
                <div className="flex items-center text-[10px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none">
                  <span className="w-[119px] md:w-[8.2639vw] flex-shrink-0">Purpose</span>
                  <span>Real Estate Company</span>
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

      {/* ─── Subsequent Showcase Gallery (Rows 1 to 8) ─── */}
      <div className="w-full px-[12px] md:px-[0.8333vw] space-y-[12px] md:space-y-[0.8333vw] pb-[156px] md:pb-[10.8333vw]">
        
        {/* Row 1: Brand Identity Envelope Mockup (1416x709) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/axis/axis-row1.png" 
            alt="AXIS RE Brand Identity"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 2: Split 2-Column Grid (703x546 each) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[0.6944vw]">
          <div className="w-full overflow-hidden">
            <img 
              src="/images/projects/axis/axis-row2-left.png" 
              alt="AXIS Crimson Lockup"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full overflow-hidden">
            <img 
              src="/images/projects/axis/axis-row2-right.png" 
              alt="AXIS Clean White Lockup"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
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

        {/* Row 4: Graphic Emblem (1416x648) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/axis/axis-row4.png" 
            alt="AXIS Graphic Emblem"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 5: Giant Typographic Crop (1416x796) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/axis/axis-row5.png" 
            alt="AXIS Giant Typographic Crop"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 6: Split 2-Column Grid Stationery (703x339 each) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[0.6944vw]">
          <div className="w-full overflow-hidden">
            <img 
              src="/images/projects/axis/axis-row6-left.png" 
              alt="AXIS Stationery Black Card"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full overflow-hidden">
            <img 
              src="/images/projects/axis/axis-row6-right.png" 
              alt="AXIS Stationery Detail"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Row 7: Monochrome Light Texture (1416x709) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/axis/axis-row7.png" 
            alt="AXIS Monochrome Light Texture"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Row 8: Outdoor Architectural Banners (1416x709) */}
        <div className="w-full overflow-hidden">
          <img 
            src="/images/projects/axis/axis-row8.png" 
            alt="AXIS Outdoor Architectural Banners"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

      </div>

    </div>
  );
}
