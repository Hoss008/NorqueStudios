import React from 'react';
import { motion } from 'framer-motion';
import newsLithuania from '../assets/news-lithuania.png';
import newsSaudi from '../assets/news-saudi.png';
import newsIdentity from '../assets/news-identity.png';
import projectAxis from '../assets/project-axis.png';

/* ========================================================================= */
/* NEWS SECTION COMPONENT                                                    */
/* "WHAT’S HAPPENING NOW" 4-column studio updates showcase                   */
/* Smooth simultaneous reveal animation for all cards                         */
/* ========================================================================= */
const newsItems = [
  {
    id: 1,
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: newsLithuania,
  },
  {
    id: 2,
    title: 'Catch us in Saudi Arabia',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: newsSaudi,
  },
  {
    id: 3,
    title: 'Developing a Lithuanian architecture studio’s visual Identity',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: newsIdentity,
  },
  {
    id: 4,
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: projectAxis,
  },
];

// Container variant - reveals all child cards simultaneously without stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
    },
  },
};

// Smooth card animation variant:
// Initial state: y = -50px, Opacity = 0%
// Final state: y = 0px, Opacity = 100%
// Silky smooth easing with fluid deceleration
const cardVariants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function NewsSection() {
  return (
    <section className="w-full bg-black pt-[2.7778vw] pb-[8.3333vw]">
      {/* Universal Container Margin: 12px (0.8333vw) */}
      <div className="w-full px-[0.8333vw]">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-[1.6667vw] motion-blur-target">
          <h2 className="text-[3.1944vw] font-semibold tracking-[-0.03em] leading-none text-white select-none uppercase">
            WHAT’S HAPPENING NOW
          </h2>
          <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] pb-[0.2778vw] select-none">
            Below you will find latest news
          </span>
        </div>

        {/* 4-Column Updates Grid with Smooth Simultaneous Reveal Animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[0.8333vw]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {newsItems.map((item) => (
            <motion.article 
              key={item.id} 
              variants={cardVariants}
              className="w-full will-change-[transform,opacity]"
            >
              {/* Image Frame - Static with no zoom hover animation */}
              <div className="w-full overflow-hidden rounded-[0.1389vw] bg-[#121212]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full aspect-square object-cover rounded-[0.1389vw]"
                  loading="lazy"
                />
              </div>

              {/* Text Metadata */}
              <div className="pt-[0.6944vw] space-y-[0.4167vw] motion-blur-target">
                <h3 className="text-[12px] sm:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-[1.2]">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] leading-[1.2]">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
