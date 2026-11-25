import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../../hooks/useContactForm';
import { useInvalidSubmitShake } from '../../hooks/useInvalidSubmitShake';
import { PROJECT_TYPES, BUDGET_OPTIONS, SOURCE_OPTIONS } from '../../hooks/contactOptions';
import ContactFieldError from '../ContactFieldError';
import './ServicesMobile.css';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const PITCH_DECK_URL = `${base}NORQUE%20STUDIOS%20-%20Pitch%20Deck.pdf`;
const PITCH_DECK_FILENAME = 'NORQUE STUDIOS - Pitch Deck.pdf';

export default function ServicesContactSection() {
  const {
    id, inputProps, errors, spamField, handleSubmit, isSubmitting, isSubmitted, reset,
    selectedTypes, toggleProjectType, selectedBudget, handleBudgetSelect, source, setSource, errorMessage,
  } = useContactForm();
  const { isShaking, notifySubmitAttempt } = useInvalidSubmitShake({ errors, isSubmitting, isSubmitted });
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getLabelClass = (hasError, spacing = 'mb-[0.4167vw]') =>
    `services-form-label block text-[0.6944vw] font-semibold tracking-[-0.03em] ${spacing} leading-none transition-colors ${
      hasError ? 'text-[#F87171]' : 'text-white'
    }`;

  const getInputClass = (hasError) =>
    `services-form-input w-full h-[1.6667vw] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none transition-all border-none ${
      hasError
        ? 'bg-[#261414] ring-1 ring-inset ring-[#F87171] focus:ring-[#F87171]'
        : 'bg-[#171717] focus:ring-1 focus:ring-inset focus:ring-white/20'
    }`;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSourceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="services-contact-section relative w-full min-h-[50.9722vw] py-[5.4167vw] px-[0.8333vw] bg-black text-white flex flex-col justify-center">
      <div className="services-contact-grid w-full grid grid-cols-12 gap-[0.8333vw] items-stretch min-h-[40.1389vw]">
        
        {/* Left Side: Statement & Pitch Deck Card (Columns 1 to 6) */}
        <div className="services-contact-left col-span-12 lg:col-span-6 flex flex-col justify-between items-start min-h-[40.1389vw]">
          
          {/* Paragraph Statement */}
          <div className="services-contact-intro-statement w-full max-w-[48.3333vw]">
            <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.14] text-white">
              We don’t just do some good designs, we actually look for your pain point, work on it and solve it. So the outcome is not just good visually, it is functional as well.
            </p>
            <p className="mt-[1.5278vw] text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.14] text-white">
              Fill the form and let’s talk.
            </p>
          </div>

          {/* 1:1 Pitch Deck Download Card (Desktop: Frame 51) */}
          <a
            href={PITCH_DECK_URL}
            download={PITCH_DECK_FILENAME}
            className="group relative w-[15.4861vw] h-[6.7361vw] rounded-[0.2778vw] overflow-hidden cursor-pointer select-none block transition-transform duration-300 hover:scale-[1.02] shadow-xl mt-[2.7778vw] lg:mt-0 max-md:hidden"
            aria-label="Download Norque's Pitch Deck PDF"
          >
            {/* Card Background Image & Dark Overlay */}
            <img
              src="/images/services/ee1003dbc63d96edd88458b92a40280bb45f11a0.png"
              alt="Norque Pitch Deck Preview"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/28 group-hover:bg-black/15 transition-colors" />

            {/* Top Badge: 30.1 MB (Frame 62: 54px x 19px -> 3.75vw x 1.3194vw) */}
            <div className="absolute top-[0.8333vw] left-[0.8333vw] z-10 w-[3.75vw] h-[1.3194vw] bg-black/55 backdrop-blur-[0.1389vw] rounded-[0.2778vw] flex items-center justify-center">
              <span className="text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-none">
                30.1 MB
              </span>
            </div>

            {/* Bottom Bar: Download + Norque's Pitch Deck [PDF] */}
            <div className="absolute bottom-[0.8333vw] left-[0.8333vw] right-[0.8333vw] z-10 flex items-center justify-between">
              {/* Left: Download CTA with Chain Link Icon */}
              <div className="flex items-center space-x-[0.2778vw] group-hover:opacity-85 transition-opacity">
                <svg
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[0.6944vw] h-[0.6944vw] text-white flex-shrink-0"
                >
                  <path
                    d="M4.8 6.2C5.1 6.5 5.5 6.7 6.0 6.7C6.5 6.7 6.9 6.5 7.2 6.2L8.6 4.8C9.3 4.1 9.3 3.0 8.6 2.3C7.9 1.6 6.8 1.6 6.1 2.3L5.4 3.0"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.2 4.8C5.9 4.5 5.5 4.3 5.0 4.3C4.5 4.3 4.1 4.5 3.8 4.8L2.4 6.2C1.7 6.9 1.7 8.0 2.4 8.7C3.1 9.4 4.2 9.4 4.9 8.7L5.6 8.0"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-none underline decoration-1 underline-offset-[0.1389vw]">
                  Download
                </span>
              </div>

              {/* Right: Pitch Deck Title */}
              <span className="text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-none">
                Norque’s Pitch Deck [PDF]
              </span>
            </div>
          </a>

          {/* 1:1 Mobile Pitch Deck Download Card (Figma Node 26:686) */}
          <a
            href={PITCH_DECK_URL}
            download={PITCH_DECK_FILENAME}
            className="services-pitch-deck-card hidden max-md:flex bg-[#3c3c3c] h-[56px] items-center justify-between px-[14px] py-[10px] rounded-[4px] w-full cursor-pointer hover:bg-[#484848] transition-colors"
            aria-label="Download Norque's Pitch Deck PDF"
          >
            <div className="flex gap-[13px] items-center">
              <svg className="w-[24px] h-[24px] text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="text-[16px] font-semibold tracking-[-0.48px] text-white">
                NORQUE’s Pitch Deck
              </span>
            </div>
            <div className="bg-black/50 px-[12px] py-[8px] rounded-[4px] flex items-center justify-center">
              <span className="text-[12px] font-semibold tracking-[-0.36px] text-white leading-none">
                PDF - 30.1 MB
              </span>
            </div>
          </a>

        </div>

        {/* Right Side: Replicated Contact Form (Columns 7 to 12) */}
        <div className="services-contact-right col-span-12 lg:col-span-6 flex flex-col items-end justify-center min-h-[40.1389vw]">
          <div className="services-contact-form-wrap w-full max-w-[46.0417vw] h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  noValidate
                  onSubmit={(e) => {
                    notifySubmitAttempt();
                    return handleSubmit(e);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col justify-between h-full"
                >
                  <input type="text" {...spamField} hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {/* Inner Form Fields (Stack Spacing: 1.25vw = 18px) */}
                  <div className="services-form-field-group w-full space-y-[1.25vw]">
                    
                    {/* Field 1: Name* */}
                    <div className="services-form-item w-full">
                      <label htmlFor={id + 'name'} className={getLabelClass(errors.name)}>
                        Name*
                      </label>
                      <input
                        type="text"
                        {...inputProps('name')}
                        placeholder="e.g. John Mark"
                        required
                        className={getInputClass(errors.name)}
                      />
                      <ContactFieldError id={id + 'name-error'} error={errors.name} variant="dark" />
                    </div>

                    {/* Field 2: Phone Number* */}
                    <div className="services-form-item w-full">
                      <label htmlFor={id + 'phone'} className={getLabelClass(errors.phone)}>
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        {...inputProps('phone')}
                        placeholder="e.g. 971501234567"
                        required
                        className={getInputClass(errors.phone)}
                      />
                      <ContactFieldError id={id + 'phone-error'} error={errors.phone} variant="dark" />
                    </div>

                    {/* Field 3: Email* */}
                    <div className="services-form-item w-full">
                      <label htmlFor={id + 'email'} className={getLabelClass(errors.email)}>
                        Email*
                      </label>
                      <input
                        type="email"
                        {...inputProps('email')}
                        placeholder="e.g. jo.......@gmail.com"
                        required
                        className={getInputClass(errors.email)}
                      />
                      <ContactFieldError id={id + 'email-error'} error={errors.email} variant="dark" />
                    </div>

                    {/* Field 4: Company Name */}
                    <div className="services-form-item w-full">
                      <label htmlFor={id + 'company'} className={getLabelClass(errors.company)}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        {...inputProps('company')}
                        placeholder="e.g. PLATO Design House"
                        className={getInputClass(errors.company)}
                      />
                      <ContactFieldError id={id + 'company-error'} error={errors.company} variant="dark" />
                    </div>

                    {/* Field 5: Your Website Link (optional) */}
                    <div className="services-form-item w-full">
                      <label htmlFor={id + 'website'} className={getLabelClass(errors.website)}>
                        Your Website Link (optional)
                      </label>
                      <input
                        type="url"
                        {...inputProps('website')}
                        placeholder="Add your URL here"
                        className={getInputClass(errors.website)}
                      />
                      <ContactFieldError id={id + 'website-error'} error={errors.website} variant="dark" />
                    </div>

                    {/* Field 6: Project Type Pills */}
                    <div className="services-form-item w-full">
                      <label className={getLabelClass(errors.projectTypes, 'mb-[0.6944vw]')}>
                        Project Type*
                      </label>
                      <div role="group" aria-label="Project Type (required)" aria-describedby={errors.projectTypes ? id + 'projectTypes-error' : undefined} className="services-form-pills flex flex-wrap items-center gap-[0.6944vw]">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = selectedTypes.includes(type);
                          return (
                            <button
                              type="button"
                              key={type}
                              aria-pressed={isSelected}
                              onClick={() => toggleProjectType(type)}
                              className={`services-pill-btn h-[1.5972vw] px-[0.8333vw] rounded-full text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-white text-black'
                                  : errors.projectTypes
                                    ? 'bg-[#261414] text-[#FCA5A5] ring-1 ring-inset ring-[#F87171]/70 hover:text-white'
                                    : 'bg-[#171717] text-[#666666] hover:text-[#999999]'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                      <ContactFieldError id={id + 'projectTypes-error'} error={errors.projectTypes} variant="dark" />
                    </div>

                    {/* Field 7: Expected Budget Pills */}
                    <div className="services-form-item w-full">
                      <label className={getLabelClass(errors.budget, 'mb-[0.6944vw]')}>
                        Expected Budget*
                      </label>
                      <div role="group" aria-label="Expected Budget (required)" aria-describedby={errors.budget ? id + 'budget-error' : undefined} className="services-form-pills flex flex-wrap items-center gap-[0.6944vw]">
                        {BUDGET_OPTIONS.map((opt) => {
                          const isSelected = selectedBudget === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              aria-pressed={isSelected}
                              onClick={() => handleBudgetSelect(opt)}
                              className={`services-pill-btn h-[1.5972vw] px-[0.8333vw] rounded-full text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-white text-black'
                                  : errors.budget
                                    ? 'bg-[#261414] text-[#FCA5A5] ring-1 ring-inset ring-[#F87171]/70 hover:text-white'
                                    : 'bg-[#171717] text-[#666666] hover:text-[#999999]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      <ContactFieldError id={id + 'budget-error'} error={errors.budget} variant="dark" />
                    </div>

                    {/* Field 8: How did you hear about us? Dropdown */}
                    <div className="services-form-item w-full relative" ref={dropdownRef}>
                      <label className="services-form-label block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        How did you hear about us?
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSourceOpen(!isSourceOpen)}
                        className="services-form-input w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold flex items-center justify-between cursor-pointer border-none outline-none select-none"
                      >
                        <span className={source === 'Select your option' ? 'text-[#666666]' : 'text-white'}>
                          {source}
                        </span>
                        <svg
                          viewBox="0 0 7 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-[0.4861vw] h-[0.2778vw] text-[#666666] transition-transform duration-200 ${isSourceOpen ? 'rotate-180' : ''}`}
                        >
                          <path
                            d="M1 1L3.5 3L6 1"
                            stroke="#666666"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {isSourceOpen && (
                        <div className="absolute top-full left-0 right-0 mt-[0.1389vw] bg-[#171717] border border-white/10 rounded-[0.1389vw] py-[0.2778vw] z-50 shadow-2xl">
                          {SOURCE_OPTIONS.filter((s) => s !== 'Select your option').map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setSource(opt);
                                setIsSourceOpen(false);
                              }}
                              className="px-[0.6944vw] py-[0.4167vw] text-[0.6944vw] font-semibold text-[#888888] hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Field 9: Something specific you want to talk about? */}
                    <div className="services-form-item w-full">
                      <label htmlFor={id + 'details'} className={getLabelClass(errors.details)}>
                        Something specific you want to talk about?
                      </label>
                      <div className="relative w-full">
                        <textarea
                          rows={3}
                          {...inputProps('details')}
                          placeholder="Add more details..."
                          className={`services-form-textarea w-full h-[4.9306vw] rounded-[0.1389vw] p-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none transition-all resize-none border-none block ${
                            errors.details
                              ? 'bg-[#261414] ring-1 ring-inset ring-[#F87171] focus:ring-[#F87171]'
                              : 'bg-[#171717] focus:ring-1 focus:ring-inset focus:ring-white/20'
                          }`}
                        />
                        {/* Figma Resize Gripper Icon (Two 45-degree diagonal lines) */}
                        <div className="absolute bottom-[0.4167vw] right-[0.4167vw] pointer-events-none select-none">
                          <svg viewBox="0 0 6 6" fill="none" className="w-[0.4167vw] h-[0.4167vw]">
                            <line x1="5.5" y1="0.5" x2="0.5" y2="5.5" stroke="#666666" strokeWidth="1" strokeLinecap="round" />
                            <line x1="5.5" y1="3.5" x2="3.5" y2="5.5" stroke="#666666" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      <ContactFieldError id={id + 'details-error'} error={errors.details} variant="dark" />
                    </div>

                    {errorMessage && (
                      <p role="alert" className="font-beausite text-[#F87171] text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.03em]">
                        {errorMessage}
                      </p>
                    )}

                  </div>

                  {/* Submit Button */}
                  <div className="mt-[1.6667vw] flex items-center justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`services-form-submit-btn w-[7.5694vw] h-[1.6667vw] rounded-full bg-white text-black text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center cursor-pointer hover:bg-white/90 active:scale-95 transition-all select-none ${
                        isShaking ? 'animate-norque-shake ring-2 ring-[#F87171]/60' : ''
                      }`}
                    >
                      {isSubmitting ? 'Sending…' : 'Submit Your Info'}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Thank You Message */
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-[2.7778vw] flex flex-col items-start space-y-[1.1111vw]"
                >
                  <div className="w-[2.2222vw] h-[2.2222vw] rounded-full bg-white/10 flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[1.1111vw] h-[1.1111vw]">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-[1.3889vw] font-bold text-white tracking-[-0.03em]">
                    Thank you! We received your inquiry.
                  </h3>
                  <p className="text-[0.8333vw] text-white/70 tracking-[-0.03em] max-w-[25vw] leading-relaxed">
                    Our partners will review your project requirements and respond within 24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-[1.1111vw] text-[0.7639vw] font-semibold text-white/60 hover:text-white underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
