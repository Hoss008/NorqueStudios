import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Footer.module.css';

import logoNor from '../../assets/group1.svg';
import logoQue from '../../assets/group.svg';
import logoTm from '../../assets/vector.svg';

export default function Footer({ onContactClick, onLegalClick, onOpenServices }) {
  const shouldReduceMotion = useReducedMotion();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={styles.footerContainer} data-node-id="1:2">
      <motion.div
        className={styles.topSection}
        data-node-id="1:3"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
      >
        <div className={styles.dividerLine} data-node-id="1:4" />
        <div className={styles.contactPrompt} data-node-id="1:5">
          <p className={styles.promptLine}>Got a project on mind?</p>
          <p className={styles.promptLine}>Let’s make it alive!</p>
          <p className={styles.promptLine}>
            <button
              type="button"
              className={styles.emailLink}
              onClick={() => onContactClick && onContactClick('hello@norquestudios.com')}
            >
              hello@norquestudios.com
            </button>
          </p>
        </div>
      </motion.div>

      <motion.div
        className={styles.bottomSection}
        data-node-id="1:6"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1], delay: 0.15 }}
      >
        <div className={styles.logoWrapper}>
          <div
            className={styles.mainLogo}
            data-node-id="1:7"
            onClick={scrollToTop}
            style={{ cursor: 'pointer' }}
            title="Back to top"
          >
            <img src={logoNor} alt="NOR" className={styles.logoNor} />
            <img src={logoQue} alt="QUE" className={styles.logoQue} />
            <img src={logoTm} alt="TM" className={styles.logoTm} />
          </div>
        </div>

        <div className={styles.footerNav} data-node-id="1:25">
          <div className={styles.col1} data-node-id="1:26">
            <div className={styles.navButtons} data-node-id="1:27">
              <button
                type="button"
                className={styles.navItem}
                onClick={() => handleScroll('manifesto')}
                data-node-id="1:28"
              >
                About
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => handleScroll('works')}
                data-node-id="1:29"
              >
                Works
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => {
                  if (onOpenServices) {
                    onOpenServices();
                  } else {
                    handleScroll('services');
                  }
                }}
                data-node-id="1:30"
              >
                services
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => onContactClick && onContactClick('hello@norquestudios.com')}
                data-node-id="1:31"
              >
                contact
              </button>
              <a
                href="https://www.behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navItem}
                data-node-id="1:32"
              >
                Behance
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navItem}
                data-node-id="1:33"
              >
                Linked in
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navItem}
                data-node-id="1:34"
              >
                Instagram
              </a>
              <button
                type="button"
                className={styles.legalItem}
                onClick={() => onLegalClick && onLegalClick('terms')}
                data-node-id="1:35"
              >
                • terms & conditions
              </button>
              <button
                type="button"
                className={styles.legalItem}
                onClick={() => onLegalClick && onLegalClick('privacy')}
                data-node-id="1:36"
              >
                • privacy & policy
              </button>
            </div>
          </div>

          <div className={styles.col4} data-node-id="1:39">
            <p className={styles.copyright} data-node-id="1:40">
              © 2026 norquestudios. all rights reserved
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
