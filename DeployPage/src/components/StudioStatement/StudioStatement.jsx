import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './StudioStatement.module.css';

export default function StudioStatement({ onContactClick, onOpenServices }) {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToWorks = (e) => {
    e.preventDefault();
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="services"
      className={styles.statementSection}
      data-node-id="1:140"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
    >
      <div className={styles.grid}>
        <div className={styles.textWrapper} data-node-id="1:141">
          <div data-node-id="1:142">
            <p className={styles.paragraph}>
              NORQUE STUDIOS™ — A creative studio for brands that want to build something real.
              Based between ideas, design and digital, we work across branding, creative direction,
              UI/UX and web development.
            </p>
            <p className={styles.paragraph}>
              We collaborate with ambitious brands, businesses and creative partners to shape
              identities, digital experiences and visual systems that feel considered, distinctive
              and built to last. From the first idea to the final detail, we bring strategy,
              design and development together under one roof.
            </p>
            <p className={styles.paragraph}>
              Feel free to explore our{' '}
              <a href="#works" onClick={handleScrollToWorks} className={styles.link}>
                Works
              </a>
              {onOpenServices && (
                <>
                  {', spin our '}
                  <button
                    type="button"
                    onClick={onOpenServices}
                    className={styles.link}
                  >
                    Services Wheel
                  </button>
                </>
              )}
              {', check our '}
              <a
                href="https://www.behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Behance
              </a>{' '}
              or say hello at{' '}
              <button
                type="button"
                onClick={() => onContactClick && onContactClick('hello@norquestudios.com')}
                className={styles.link}
              >
                hello@norquestudios.com
              </button>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
