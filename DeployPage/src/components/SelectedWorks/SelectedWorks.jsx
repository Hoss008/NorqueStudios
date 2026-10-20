import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './SelectedWorks.module.css';

import imgAxis from '../../assets/image8.png';
import imgFusion from '../../assets/image9.png';
import imgJuzenas from '../../assets/image10.png';
import imgMms from '../../assets/image11.png';

export default function SelectedWorks({ onOpenProject }) {
  const shouldReduceMotion = useReducedMotion();

  const projects = [
    {
      id: 'axis',
      title: 'AXIS® - Real Estate Consultancy',
      location: 'Egypt',
      category: 'Brand Development',
      image: imgAxis,
      isCropped: true,
      description:
        'Comprehensive brand strategy and identity system created for a premiere real estate advisory firm operating throughout the MENA region.',
      year: '2025',
    },
    {
      id: 'fusion',
      title: 'Fusion Form® - Architecture Development',
      location: 'Egypt',
      category: 'UI/UX Design & Web Development',
      image: imgFusion,
      isCropped: false,
      description:
        'Interactive digital portfolio and custom web platform built for high-end architectural development projects and modern urban designs.',
      year: '2025',
    },
    {
      id: 'juzenas',
      title: 'STUDIO JUZėNAS® - Architecture Studio',
      location: 'Lithuania',
      category: 'Brand Development | UI/UX Design & Web Development',
      image: imgJuzenas,
      isCropped: false,
      description:
        'Holistic branding, spatial graphics, and bespoke digital experience created for the acclaimed Lithuanian architecture practice of Justas Juzėnas.',
      year: '2026',
    },
    {
      id: 'mms',
      title: 'MMS ARCHITECTS™',
      location: 'Egypt',
      category: 'Brand Development',
      image: imgMms,
      isCropped: false,
      description:
        'Visual identity system, editorial design standards, and brand collateral engineered for an award-winning architectural and engineering practice.',
      year: '2025',
    },
  ];

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0, 0.8, 0.2, 1] },
    },
  };

  return (
    <section id="works" className={styles.worksSection} data-node-id="1:107">
      <motion.div
        className={styles.headingRow}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
      >
        <h2 className={styles.heading} data-node-id="1:108">
          SELECTED WORKS <span className={styles.counter}>(04)</span>
        </h2>
      </motion.div>

      <div className={styles.projectsContainer} data-node-id="1:109">
        {/* Row 1: Cat 1 */}
        <div className={styles.projectRow} data-node-id="1:110">
          <motion.div
            className={styles.projectCard}
            data-node-id="1:111"
            onClick={() => onOpenProject && onOpenProject(projects[0])}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className={styles.imageContainer} data-node-id="1:112">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className={styles.imageCropped1}
              />
            </div>
            <div className={styles.metaContainer} data-node-id="1:113">
              <div className={styles.titleLocationRow} data-node-id="1:114">
                <p className={styles.projectTitle} data-node-id="1:115">
                  {projects[0].title}
                </p>
                <p className={styles.projectLocation} data-node-id="1:116">
                  {projects[0].location}
                </p>
              </div>
              <p className={styles.projectCategory} data-node-id="1:117">
                {projects[0].category}
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.projectCard}
            data-node-id="1:118"
            onClick={() => onOpenProject && onOpenProject(projects[1])}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className={styles.imageContainer} data-node-id="1:119">
              <img
                src={projects[1].image}
                alt={projects[1].title}
                className={styles.imageCover}
              />
            </div>
            <div className={styles.metaContainer} data-node-id="1:120">
              <div className={styles.titleLocationRow} data-node-id="1:121">
                <p className={styles.projectTitle} data-node-id="1:122">
                  {projects[1].title}
                </p>
                <p className={styles.projectLocation} data-node-id="1:123">
                  {projects[1].location}
                </p>
              </div>
              <p className={styles.projectCategory} data-node-id="1:124">
                {projects[1].category}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Cat 2 */}
        <div className={styles.projectRow} data-node-id="1:125">
          <motion.div
            className={styles.projectCard}
            data-node-id="1:126"
            onClick={() => onOpenProject && onOpenProject(projects[2])}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className={styles.imageContainer} data-node-id="1:127">
              <img
                src={projects[2].image}
                alt={projects[2].title}
                className={styles.imageCover}
              />
            </div>
            <div className={styles.metaContainer} data-node-id="1:128">
              <div className={styles.titleLocationRow} data-node-id="1:129">
                <p className={styles.projectTitle} data-node-id="1:130">
                  {projects[2].title}
                </p>
                <p className={styles.projectLocation} data-node-id="1:131">
                  {projects[2].location}
                </p>
              </div>
              <p className={styles.projectCategory} data-node-id="1:132">
                {projects[2].category}
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.projectCard}
            data-node-id="1:133"
            onClick={() => onOpenProject && onOpenProject(projects[3])}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className={styles.imageContainer} data-node-id="1:134">
              <img
                src={projects[3].image}
                alt={projects[3].title}
                className={styles.imageCover}
              />
            </div>
            <div className={styles.metaContainer} data-node-id="1:135">
              <div className={styles.titleLocationRow} data-node-id="1:136">
                <p className={styles.projectTitle} data-node-id="1:137">
                  {projects[3].title}
                </p>
                <p className={styles.projectLocation} data-node-id="1:138">
                  {projects[3].location}
                </p>
              </div>
              <p className={styles.projectCategory} data-node-id="1:139">
                {projects[3].category}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
