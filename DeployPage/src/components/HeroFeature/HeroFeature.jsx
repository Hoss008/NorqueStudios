import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './HeroFeature.module.css';
import recentWorksImg from '../../assets/recent-works-1.png';

export default function HeroFeature({ onOpenProject }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={styles.featureSection}
      data-node-id="1:96"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
    >
      <div
        className={styles.imageWrapper}
        data-node-id="1:97"
        onClick={() =>
          onOpenProject &&
          onOpenProject({
            title: 'NORQUE STUDIOS™ — Recent Showcase',
            subtitle: 'Recent work of branding, web design & development',
            location: 'Global',
            image: recentWorksImg,
            year: '2026',
            description:
              'A curated visual overview of our ongoing design systems, brand identities, and immersive web experiences created for forward-thinking clients worldwide.',
          })
        }
      >
        <img
          src={recentWorksImg}
          alt="Recent work of branding, web design & development by NORQUE STUDIOS™"
          className={styles.featureImage}
        />
      </div>

      <div className={styles.captionRow} data-node-id="1:98">
        <p className={styles.captionLeft} data-node-id="1:99">
          Recent work of branding, web design & development by NORQUE STUDIOS™
        </p>
        <p className={styles.captionRight} data-node-id="1:100">
          ©2026
        </p>
      </div>
    </motion.section>
  );
}
