import React from 'react';
import MaskedWordStagger from '../MaskedWordStagger';

/* ========================================================================= */
/* ABOUT TEAM SECTION                                                        */
/* "PPL BEHIND NRQ™" - Founders showcase and core multidisciplinary team     */
/* ========================================================================= */
const base = import.meta.env.BASE_URL || './';

const FOUNDERS = [
  {
    name: 'Mostafa Yasser',
    role: 'Co-Founder / Brand Designer / UI/UX Designer',
    image: `${base}images/about/founder-mostafa-yasser.png`,
  },
  {
    name: 'Hossam Hassan',
    role: 'Co-Founder / Head of Development / Software Engineer',
    image: `${base}images/about/founder-hossam-hassan.png`,
  },
  {
    name: 'Anas El Sharief',
    role: 'Co-Founder / Web Developer / Product Owner',
    image: `${base}images/about/team-anas-el-sharief.png`,
  },
];

const TEAM = [
  {
    name: 'Alaa Kabil',
    role: 'Graphic Designer',
    image: `${base}images/about/team-alaa-kabil.png`,
  },
  {
    name: 'Okaby',
    role: 'Art Director / Photographer',
    image: `${base}images/about/team-okaby.jpg`,
  },
  {
    name: 'Marwan Yasser',
    role: 'Video Editor',
    image: `${base}images/about/team-marwan-yasser.png`,
  },
];

export default function AboutTeam() {
  return (
    <section className="w-full py-[4.1667vw] px-[0.8333vw]">
      <div className="w-full">
        {/* Section Heading */}
        <h2 className="text-[32px] sm:text-[3.1944vw] font-semibold text-white tracking-[-0.03em] leading-none mb-[3.4722vw] uppercase motion-blur-target">
          PPL BEHIND NRQ™
        </h2>

        {/* ─── 1. Founders Grid (3 Equal Columns) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-[0.8333vw] mb-[3.4722vw]">
          {FOUNDERS.map((founder) => (
            <div key={founder.name} className="relative w-full aspect-[242/314] rounded-[4px] overflow-hidden group bg-[#121214]">
              <img 
                src={founder.image} 
                alt={`${founder.name} - ${founder.role}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 sm:bottom-[1.1111vw] sm:left-[1.1111vw] z-10 motion-blur-target pr-3">
                <h3 className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-tight">
                  {founder.name}
                </h3>
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/90 tracking-[-0.03em] mt-[0.2778vw]">
                  {founder.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 2. Multidisciplinary Network Statement ─── */}
        <div className="max-w-[74vw] mb-[3.4722vw]">
          <MaskedWordStagger className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-[1.2] motion-blur-target pt-[2.4vw]">
            Behind NORQUE is a growing network of designers, developers, creatives and specialists who bring their own way of thinking to the table. Different backgrounds, different disciplines, one shared obsession with making things that feel right.
          </MaskedWordStagger>
        </div>

        {/* ─── 3. Core Team Grid (4 Columns, 3 Members) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[0.8333vw]">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col group">
              <div className="w-full aspect-[345/266.6] rounded-[4px] overflow-hidden mb-[0.6944vw] bg-[#121214]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover  group-hover:scale-[1]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="motion-blur-target">
                <h3 className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-snug">
                  {member.name}
                </h3>
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] mt-[0.1389vw]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
