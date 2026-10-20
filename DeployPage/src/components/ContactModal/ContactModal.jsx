import React, { useState } from 'react';
import Modal from '../Modal/Modal.jsx';
import styles from './ContactModal.module.css';

export default function ContactModal({ isOpen, onClose, initialSubject }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@norquestudios.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.contactModalContent}>
        <div>
          <h3 className={styles.heading}>Got a project on mind?</h3>
          <p className={styles.subtext}>
            Let’s make it alive. Fill out the brief or reach us directly.
          </p>
        </div>

        {submitted ? (
          <div className={styles.successMessage}>
            Thank you! Your message has been received. We'll be in touch shortly.
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                required
                className={styles.input}
                placeholder="Your name or company"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                required
                className={styles.input}
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Project Scope / Services</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Branding, UI/UX, Web Development"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                required
                className={styles.textarea}
                placeholder="Tell us about the project goals, timeline, and vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Inquiry
            </button>
          </form>
        )}

        <div className={styles.orDivider}>OR</div>

        <button type="button" className={styles.directEmailBtn} onClick={handleCopyEmail}>
          {copied ? 'Copied to Clipboard!' : 'Copy: hello@norquestudios.com'}
        </button>
      </div>
    </Modal>
  );
}
