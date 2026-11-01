import React from 'react';
import MaskedWordStagger from '../MaskedWordStagger';

/* ========================================================================= */
/* ABOUT HERO SECTION                                                        */
/* Manifesto statement, Services directory, and international presence       */
/* ========================================================================= */
const SERVICES = [
  'Brand Identity',
  'Website Design',
  'Web Development',
  'Creative Strategy',
  'Graphic Design',
  'Product Design',
  'Art Direction',
  'Consultation',
];

const COUNTRIES = [
  'Egypt',
  'United States',
  'Lithuania',
  'United Arab Emirates',
  'Saudi Arabia',
  'Jordan',
  'Qatar',
];

export default function AboutHero() {
  return (
    <section className="w-full pt-[1vw] pb-[6.25vw] px-[0.8333vw] motion-blur-target">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-[0.8333vw]">
        {/* ─── Column 1-6: Manifesto & Aesthetics Media ─── */}
        <div className="sm:col-span-2 lg:col-span-6 flex flex-col justify-between">
          <div className="w-full">
            <span className="block text-[11px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] uppercase mb-[1.0417vw] select-none">
              [ ABOUT ]
            </span>
            <MaskedWordStagger className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-[1.2] selection:bg-white selection:text-black space-y-[1.5278vw]">
              <p>
                — An independent creative studio built around design, digital experiences and the ideas that connect them. We work with brands, businesses and people who care about how things look, feel and exist in the real world.
              </p>
              <p>
                From brand identities and creative direction to UI/UX, web design and development, we bring different disciplines together to create work that is clear, intentional and built with purpose. No fixed formulas, no unnecessary layers — just the right thinking, design and execution for each project.
              </p>
            </MaskedWordStagger>
          </div>

          <div className="mt-8 sm:mt-[9.9306vw]">
            <img 
              src={`${import.meta.env.BASE_URL}images/about/about-intro-image.png`} 
              alt="Norque visual aesthetics" 
              className="w-[180px] h-[242px] sm:w-[15.0069vw] sm:h-[20.2083vw] object-cover rounded-[4px] grayscale hover:grayscale-0 transition-all duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* ─── Column 7: Grid Alignment Spacer ─── */}
        <div className="hidden lg:block lg:col-span-1" aria-hidden="true" />

        {/* ─── Column 8-9: Services Directory ─── */}
        <div className="sm:col-span-1 lg:col-span-2">
          <span className="block text-[11px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] uppercase mb-[1.0417vw] select-none vertical-trim">
            [ SERVICES ]
          </span>
          <ul className="space-y-[3px] sm:space-y-[0.35vw]">
            {SERVICES.map((service) => (
              <li 
                key={service}
                className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-tight select-none vertical-trim"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Column 10-12: Countries Directory ─── */}
        <div className="sm:col-span-1 lg:col-span-3">
          <span className="block text-[11px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] uppercase mb-[1.0417vw] select-none vertical-trim">
            [ COUNTRIES WE WORKED IN ]
          </span>
          <ul className="space-y-[3px] sm:space-y-[0.35vw]">
            {COUNTRIES.map((country) => (
              <li 
                key={country}
                className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-tight select-none vertical-trim"
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
