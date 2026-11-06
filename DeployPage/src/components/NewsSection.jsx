import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import studioJuzenasWebsiteGif from '../assets/news/Studio-Juzenas-Website.gif';
import studioJuzenasWebsitePoster from '../assets/news/Studio-Juzenas-Website-poster.jpg';
import modishStudioGif from '../assets/news/Modish-Studio.gif';
import modishStudioPoster from '../assets/news/Modish-Studio-poster.jpg';
import studioJuzenasBrandingGif from '../assets/news/Studio-Juzenas-Branding.gif';
import studioJuzenasBrandingPoster from '../assets/news/Studio-Juzenas-Branding-poster.jpg';
import stephensonFeatureGif from '../assets/news/STEPHENSON-Feature.gif';
import stephensonFeaturePoster from '../assets/news/STEPHENSON-Feature-poster.jpg';

/* ========================================================================= */
/* NEWS SECTION COMPONENT ("WHAT’S HAPPENING NOW")                           */
/* 4-column studio updates showcase matching Figma / reference specification  */
/* ========================================================================= */
const newsItems = [
  {
    id: 1,
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'We’re working alongside Lithuanian architect Justas Južėnas to shape the next chapter of his architecture studio. From its visual identity to its digital presence.',
    image: studioJuzenasWebsiteGif,
    poster: studioJuzenasWebsitePoster,
    alt: 'Studio Juzėnas Website Preview',
  },
  {
    id: 2,
    title: 'Catch us in Saudi Arabia',
    description: 'A new collaboration with Modish Studio. We’re working on refining the studio’s brand presence, bringing its architectural approach into a more distinctive and cohesive visual language.',
    image: modishStudioGif,
    poster: modishStudioPoster,
    alt: 'Modish Studio Project Preview',
  },
  {
    id: 3,
    title: 'Building an Identity Around Architecture',
    description: 'Currently developing the visual identity for a Lithuanian architecture studio. An exercise in restraint, exploring the relationship between typography, composition, and architectural thinking.',
    image: studioJuzenasBrandingGif,
    poster: studioJuzenasBrandingPoster,
    alt: 'Studio Juzėnas Branding Identity Preview',
  },
  {
    id: 4,
    title: 'Featured by Behance',
    description: 'One of our projects has been selected and featured by the Behance curation team in the Branding category. A milestone we’re proud of and another reminder that thoughtful design finds its way.',
    image: stephensonFeatureGif,
    poster: stephensonFeaturePoster,
    alt: 'Stephenson Feature by Behance Preview',
  },
];

// Container variant - reveals child cards smoothly
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Smooth card animation variant
const cardVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ─── Individual News Card: Plays animated GIF only on hover ─── */
function NewsCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const handleMouseEnter = () => {
    setPlayCount((prev) => prev + 1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.article 
      variants={cardVariants}
      className="w-full will-change-[transform,opacity] flex flex-col group cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Frame - 1:1 Aspect Ratio with Rounded Corners */}
      <div className="relative w-full overflow-hidden rounded-[2px] bg-[#121212] aspect-square">
        <div className="w-full h-full relative transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          {/* 1. Static Freeze-Frame: Pre-rendered crisp frame 0 poster (zero runtime overhead) */}
          <img
            src={item.poster}
            alt={item.alt}
            className="w-full h-full object-cover rounded-[2px] select-none absolute inset-0 z-0 pointer-events-none"
            loading="lazy"
          />

          {/* 2. Animated GIF: Seamless crossfade in on hover, smooth dissolve out on unhover */}
          <AnimatePresence>
            {isHovered && (
              <motion.img 
                key={playCount}
                src={item.image} 
                alt={item.alt} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover rounded-[2px] select-none absolute inset-0 z-10 pointer-events-none"
                loading="eager"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Text Metadata */}
      <div className="pt-[0.6944vw] space-y-[0.3472vw] motion-blur-target">
        <h3 className="text-[13px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-[1.25]">
          {item.title}
        </h3>
        <p className="text-[12px] md:text-[0.625vw] font-normal tracking-[-0.02em] text-[#747474] leading-[1.35]">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

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
          <span className="text-[0.6944vw] font-normal tracking-[-0.03em] text-[#747474] pb-[0.2778vw] select-none">
            Below you will find latest news
          </span>
        </div>

        {/* 4-Column Updates Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[0.8333vw]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
