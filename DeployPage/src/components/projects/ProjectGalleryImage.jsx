import React from 'react';
import { motion } from 'framer-motion';

/**
 * Unblur & scale-settle gallery image for project showcase pages.
 * Uses eager loading with async decoding since project assets are preloaded.
 */
export default function ProjectGalleryImage({ src, alt, delay = 0, className = '' }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover block will-change-[transform,filter]"
        initial={{ filter: 'blur(10px)', scale: 1.08 }}
        whileInView={{ filter: 'blur(0px)', scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
