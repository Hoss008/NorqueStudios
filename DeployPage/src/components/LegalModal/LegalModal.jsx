import React from 'react';
import Modal from '../Modal/Modal.jsx';
import styles from './LegalModal.module.css';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <Modal isOpen={Boolean(type)} onClose={onClose}>
      <div className={styles.legalContent}>
        <h3 className={styles.title}>
          {isTerms ? 'Terms & Conditions' : 'Privacy Policy'}
        </h3>
        <div className={styles.body}>
          {isTerms ? (
            <>
              <p>
                Welcome to NORQUE STUDIOS™. By accessing or commissioning work from NORQUE STUDIOS™, you agree to abide by our standard operational terms and commercial intellectual property agreements.
              </p>
              <p>
                All creative concepts, digital architectures, and brand designs delivered remain protected under international copyright treaties until final contractual settlement.
              </p>
              <p>
                For custom licensing terms or enterprise service inquiries, please contact legal@norquestudios.com.
              </p>
            </>
          ) : (
            <>
              <p>
                At NORQUE STUDIOS™, we respect your privacy and process client data with strict adherence to confidential design principles and GDPR standards.
              </p>
              <p>
                We do not sell, rent, or distribute personal information to third parties. Information submitted via our inquiry channels is strictly utilized for project communication and contract fulfillment.
              </p>
              <p>
                You may request complete data erasure or portfolio attribution changes at any time by contacting hello@norquestudios.com.
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
