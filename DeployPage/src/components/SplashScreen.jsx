import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { splashLogoPaths } from './splashLogoPaths';

/* ========================================================================= */
/* SPLASH SCREEN COMPONENT                                                   */
/* 2-second initial brand intro with staggered letter reveals                */
/* ========================================================================= */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 2-second splash screen matching 1:1 with norquestudios.com
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [1, -0.02, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <motion.svg
            width="200"
            viewBox="0 0 113 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'hidden' }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
              exit: { opacity: 0, transition: { duration: 0.6, ease: [0, 0.8, 0.2, 1] } }
            }}
          >
            {splashLogoPaths.map((d, index) => (
              <motion.path
                key={index}
                d={d}
                fill="white"
                variants={{
                  hidden: { y: 12, opacity: 1 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    transition: { duration: 0.6, ease: [0, 0.8, 0.2, 1] } 
                  }
                }}
              />
            ))}
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
