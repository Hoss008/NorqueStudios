import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

import Loading from './components/Loading/Loading.jsx';
import Hero from './components/Hero/Hero.jsx';
import HeroFeature from './components/HeroFeature/HeroFeature.jsx';
import StudioManifesto from './components/StudioManifesto/StudioManifesto.jsx';
import SelectedWorks from './components/SelectedWorks/SelectedWorks.jsx';
import StudioStatement from './components/StudioStatement/StudioStatement.jsx';
import LatestNews from './components/LatestNews/LatestNews.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProjectModal from './components/ProjectModal/ProjectModal.jsx';
import ContactModal from './components/ContactModal/ContactModal.jsx';
import LegalModal from './components/LegalModal/LegalModal.jsx';
import ServiceWheel from './components/ServiceWheel/ServiceWheel.jsx';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [legalType, setLegalType] = useState(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#service' || hash === '#services' || hash === '#services-wheel') {
        setIsServicesOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenServices = () => {
    setIsServicesOpen(true);
  };

  const handleCloseServices = () => {
    setIsServicesOpen(false);
    const hash = window.location.hash.toLowerCase();
    if (hash === '#service' || hash === '#services-wheel') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleOpenContact = (subject = '') => {
    setContactSubject(subject);
    setIsContactOpen(true);
  };

  const handleOpenLegal = (type) => {
    setLegalType(type);
  };

  const handleOpenNews = (newsItem) => {
    setSelectedProject({
      title: newsItem.title,
      subtitle: newsItem.date,
      location: 'Dispatch',
      category: 'Studio News',
      image: newsItem.image,
      description: newsItem.desc,
    });
  };

  return (
    <div className={styles.appWrapper} data-node-id="1:41">
      {/* Intro Loading Animation Screen */}
      <Loading />

      <main className={styles.mainContent}>
        {/* Section 1: Hero & Nav */}
        <Hero
          onNavigate={() => {}}
          onOpenServices={handleOpenServices}
        />

        {/* Section 2: Recent-Works Visual & Manifesto */}
        <HeroFeature onOpenProject={setSelectedProject} />
        <StudioManifesto onContactClick={handleOpenContact} />

        {/* Section 3: Selected Works (04) */}
        <SelectedWorks onOpenProject={setSelectedProject} />

        {/* Section 5: Studio Ethos & Services */}
        <StudioStatement
          onContactClick={handleOpenContact}
          onOpenServices={handleOpenServices}
        />

        {/* Section 4: What's Happening Now */}
        <LatestNews onOpenNews={handleOpenNews} />

        {/* Section: Footer */}
        <Footer
          onContactClick={handleOpenContact}
          onLegalClick={handleOpenLegal}
          onOpenServices={handleOpenServices}
        />
      </main>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={handleOpenContact}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialSubject={contactSubject}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

      {/* Interactive Kinetic Services Wheel */}
      <ServiceWheel
        isOpen={isServicesOpen}
        onClose={handleCloseServices}
      />
    </div>
  );
}
