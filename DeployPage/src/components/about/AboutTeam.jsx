import React from 'react';
import MaskedWordStagger from '../MaskedWordStagger';

/* ========================================================================= */
/* ABOUT TEAM SECTION                                                        */
/* "PPL BEHIND NRQ™" - Founders showcase and core multidisciplinary team     */
/* ========================================================================= */
const base = import.meta.env.BASE_URL || './';

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
    name: 'Anas El Sharief',
    role: 'Product Owner & Client Management',
    image: `${base}images/about/team-anas-el-sharief.png`,
  },
  {
    name: 'Marwan Yasser',
    role: 'Video Editor',
    image: `${base}images/about/team-marwan-yasser.png`,
  },
];

export default function AboutTeam() {
  return (
    <section className="w-full py-[4.1667vw] px-[0.8333vw] motion-blur-target">
      <div className="w-full">
        {/* Section Heading */}
        <h2 className="text-[32px] sm:text-[3.1944vw] font-semibold text-white tracking-[-0.03em] leading-none mb-[3.4722vw] uppercase">
          PPL BEHIND NRQ™
        </h2>

        {/* ─── 1. Founders Grid (2 Equal Columns) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[0.8333vw] mb-[4.1667vw]">
          {/* Founder 1: Mostafa Yasser */}
          <div className="relative w-full aspect-[702/628] rounded-[4px] overflow-hidden group">
            <img 
              src={`${base}images/about/founder-mostafa-yasser.png`} 
              alt="Mostafa Yasser - Co-Founder" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
            <div className="absolute bottom-[1.4653vw] left-[1.4653vw] z-10">
              <h3 className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-tight">
                Mostafa Yasser
              </h3>
              <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/90 tracking-[-0.03em] mt-[0.2778vw]">
                Co-Founder / Brand Designer / UI/UX Designer
              </p>
            </div>
          </div>

          {/* Founder 2: Hossam Hassan */}
          <div className="relative w-full aspect-[702/628] rounded-[4px] overflow-hidden group">
            <img 
              src={`${base}images/about/founder-hossam-hassan.png`} 
              alt="Hossam Hassan - Co-Founder" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
            <div className="absolute bottom-[1.4653vw] left-[1.4653vw] z-10">
              <h3 className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-tight">
                Hossam Hassan
              </h3>
              <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/90 tracking-[-0.03em] mt-[0.2778vw]">
                Co-Founder / Full-Stack Developer
              </p>
            </div>
          </div>
        </div>

        {/* ─── 2. Multidisciplinary Network Statement ─── */}
        <div className="max-w-[73.3333vw] mb-[4.1667vw]">
          <MaskedWordStagger className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-[1.2]">
            Behind NORQUE is a growing network of designers, developers, creatives and specialists who bring their own way of thinking to the table. Different backgrounds, different disciplines, one shared obsession with making things that feel right.
          </MaskedWordStagger>
        </div>

        {/* ─── 3. Core Team Grid (4 Columns) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[0.8333vw]">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col group">
              <div className="w-full aspect-[345/266.6] rounded-[4px] overflow-hidden mb-[0.6944vw] bg-[#121214]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-snug">
                {member.name}
              </h3>
              <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] mt-[0.1389vw]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
