import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Navbar.module.css';

import logoPartGroup3 from '../../assets/group3.svg';
import logoPartVector2 from '../../assets/vector2.svg';
import logoPartGroup2 from '../../assets/group2.svg';
import logoPartVector1 from '../../assets/vector1.svg';

export default function Navbar({ onNavigate, onOpenServices }) {
  const [timeString, setTimeString] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      // Calculate Egypt time (Cairo is UTC+2 or UTC+3, usually Africa/Cairo)
      const options = {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.format(new Date());
      // Match the exact format: "Egypt, 03:48:10 PM GMT"
      setTimeString(`Egypt, ${parts} GMT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <motion.header
      className={styles.navContainer}
      data-node-id="1:43"
      initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1], delay: shouldReduceMotion ? 0 : 2.5 }}
    >
      <div className={styles.navGrid}>
        <div className={styles.col1} data-node-id="1:44">
          <a
            href="#top"
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Norque Studios Home"
            data-node-id="1:45"
          >
            <div className={styles.compactLogo}>
              <img src={logoPartGroup3} alt="" className={styles.logoPart1} />
              <img src={logoPartVector2} alt="" className={styles.logoPart2} />
              <img src={logoPartGroup2} alt="" className={styles.logoPart3} />
              <img src={logoPartVector1} alt="" className={styles.logoPart4} />
            </div>
          </a>
        </div>

        <div className={styles.col2} data-node-id="1:60">
          <nav className={styles.navLinks} data-node-id="1:61" aria-label="Main Navigation">
            <button
              type="button"
              className={styles.navLink}
              onClick={() => handleScroll('manifesto')}
              data-node-id="1:62"
            >
              About
            </button>
            <button
              type="button"
              className={styles.navLink}
              onClick={() => handleScroll('works')}
              data-node-id="1:63"
            >
              Work
            </button>
            <button
              type="button"
              className={styles.navLink}
              onClick={() => {
                if (onOpenServices) {
                  onOpenServices();
                } else {
                  handleScroll('services');
                }
              }}
              data-node-id="1:64"
            >
              Services
            </button>
          </nav>
        </div>

        <div className={styles.col3} data-node-id="1:65" />

        <div className={styles.col4} data-node-id="1:66">
          <span className={styles.timeDisplay} data-node-id="1:67">
            {timeString || 'Egypt, 03:48:10 PM GMT'}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
