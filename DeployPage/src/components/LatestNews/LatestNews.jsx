import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './LatestNews.module.css';

import imgNews1 from '../../assets/image12.png';
import imgNews2 from '../../assets/image13.png';
import imgNews3 from '../../assets/image14.png';
import imgNews4 from '../../assets/image8.png';

export default function LatestNews({ onOpenNews }) {
  const shouldReduceMotion = useReducedMotion();

  const newsItems = [
    {
      id: 'news-1',
      title: 'Next chapter of an architecture studio in Lithuania',
      desc: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
      image: imgNews1,
      isCropped: true,
      date: 'OCT 2026',
    },
    {
      id: 'news-2',
      title: 'Catch us in Saudi Arabia',
      desc: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
      image: imgNews2,
      isCropped: false,
      date: 'SEP 2026',
    },
    {
      id: 'news-3',
      title: 'Developing a Lithuanian architecture studio’s visual Identity',
      desc: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
      image: imgNews3,
      isCropped: false,
      date: 'AUG 2026',
    },
    {
      id: 'news-4',
      title: 'Next chapter of an architecture studio in Lithuania',
      desc: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
      image: imgNews4,
      isCropped: false,
      isCropped4: true,
      date: 'JUL 2026',
    },
  ];

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0, 0.8, 0.2, 1], delay: shouldReduceMotion ? 0 : i * 0.1 },
    }),
  };

  return (
    <section id="news" className={styles.newsSection} data-node-id="1:146">
      <motion.div
        className={styles.headerRow}
        data-node-id="1:147"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
      >
        <h2 className={styles.title} data-node-id="1:148">
          What’s happening now
        </h2>
        <span className={styles.subtitle} data-node-id="1:149">
          Below you will find latest news
        </span>
      </motion.div>

      <div className={styles.cardsGrid} data-node-id="1:150">
        {newsItems.map((item, idx) => (
          <motion.div
            key={item.id + idx}
            className={styles.newsCard}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            data-node-id={
              idx === 0
                ? '1:151'
                : idx === 1
                ? '1:156'
                : idx === 2
                ? '1:161'
                : '1:166'
            }
            onClick={() => onOpenNews && onOpenNews(item)}
          >
            <div className={styles.imageContainer}>
              <img
                src={item.image}
                alt={item.title}
                className={
                  item.isCropped
                    ? styles.imageCropped
                    : item.isCropped4
                    ? styles.imageCropped4
                    : styles.imageCover
                }
              />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
