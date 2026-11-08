import React, { useEffect } from 'react';
import ServicesHeroSection from './services/ServicesHeroSection';
import ServicesWorkflowSection from './services/ServicesWorkflowSection';
import ServicesCardsSection from './services/ServicesCardsSection';
import ServicesContactSection from './services/ServicesContactSection';
import Footer from './Footer';

/* ========================================================================= */
/* SERVICES PAGE VIEW COMPONENT                                              */
/* Converted 1:1 from 'Services.fig' & 'SERVICES.png'                        */
/* ========================================================================= */
export default function ServicesPage({ onNavigate, onOpenCMS, onOpenContact }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* Main Content Sections */}
      <main className="w-full">
        {/* Section A: Hero Section with OptionWheel and Masked Stagger Service Description */}
        <ServicesHeroSection />

        {/* Section B: NORQUE's WORKFLOW with Scroll Lock, Step Accordion, and Scale-up Media */}
        <ServicesWorkflowSection />

        {/* Section C: FEEL THE EXPERIENCE Sliding Experience Cards */}
        <ServicesCardsSection />

        {/* Section D: Contact Form & 1:1 Pitch Deck Download Card */}
        <ServicesContactSection />
      </main>

      {/* Shared Footer with Magnet Lines & Brand Mark */}
      <Footer
        onOpenCMS={onOpenCMS}
        onNavigate={onNavigate}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}
