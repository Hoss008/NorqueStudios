import React from 'react';
import Modal from '../Modal/Modal.jsx';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose, onContactClick }) {
  if (!project) return null;

  return (
    <Modal isOpen={Boolean(project)} onClose={onClose}>
      <div className={styles.projectModalContent}>
        <div className={styles.modalImageWrapper}>
          <img src={project.image} alt={project.title} className={styles.modalImage} />
        </div>

        <div className={styles.modalHeader}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.title}</h3>
            {project.location && <span className={styles.location}>{project.location}</span>}
          </div>
          {project.category && <p className={styles.category}>{project.category}</p>}
        </div>

        {project.description && <p className={styles.description}>{project.description}</p>}

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.contactBtn}
            onClick={() => {
              onClose();
              if (onContactClick) onContactClick(`Project inquiry: ${project.title}`);
            }}
          >
            Inquire About This Project
          </button>
        </div>
      </div>
    </Modal>
  );
}
