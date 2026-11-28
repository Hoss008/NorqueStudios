import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const PITCH_DECK_URL = `${base}NORQUE%20STUDIOS%20-%20Pitch%20Deck.pdf`;
const PITCH_DECK_FILENAME = 'NORQUE STUDIOS - Pitch Deck.pdf';

import { useContactForm } from '../hooks/useContactForm';
import { useInvalidSubmitShake } from '../hooks/useInvalidSubmitShake';
import { PROJECT_TYPES, BUDGET_OPTIONS, SOURCE_OPTIONS } from '../hooks/contactOptions';
import ContactFieldError from './ContactFieldError';
import CountryCodeSelect from './CountryCodeSelect';
/* ========================================================================= */
/* CONTACT US SLIDING SIDE TAB COMPONENT                                     */
/* Reference: References/Contact us/Contact Us reference.png                 */
/* Figma: References/Contact us/Contact Us Side Page.fig                     */
/* Thank You Figma: References/Contact us/Contact Us Side Page - Thank You Message.fig */
/* Thank You Video: References/Contact us/Thank You Message Reference.mp4    */
/* ========================================================================= */

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: '0%',
    transition: {
      duration: 0.8,
      ease: [0.61, 0, 0, 0.98],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.6,
      ease: [0.61, 0, 0, 0.98],
    },
  },
};

/* ─── Masked Vertical Stagger Item Variants for Form & Drawer Opening ─── */
const maskedItemVariants = {
  hidden: {
    y: '105%',
    opacity: 1,
  },
  visible: (i = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.12 + i * 0.035,
    },
  }),
};

/* ─── Thank You Message Variants (Reference: Thank You Message Reference.mp4) ─── */
const thankYouIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.18, 1],
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const checkmarkPathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: 0.22,
      ease: 'easeOut',
    },
  },
};

const thankYouMaskedVariants = {
  hidden: { y: '105%', opacity: 1 },
  visible: (delay = 0.22) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ContactTab({ isOpen, onClose }) {
  // Form state
  const {
    id, inputProps, errors, spamField, handleSubmit, isSubmitting, isSubmitted, reset, clearFormErrors,
    countryIso, setCountryIso,
    selectedTypes, toggleProjectType, selectedBudget, handleBudgetSelect, source, setSource, errorMessage,
  } = useContactForm();
  const { isShaking, notifySubmitAttempt } = useInvalidSubmitShake({ errors, isSubmitting, isSubmitted });
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getLabelClass = (hasError, spacing = 'mb-[4px] md:mb-[min(0.4167vw,0.7vh)]') =>
    `block text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] ${spacing} leading-none transition-colors ${
      hasError ? 'text-[#DC2626]' : 'text-black'
    }`;

  const getInputClass = (hasError, widthClass = 'w-full') =>
    `${widthClass} h-[30px] md:h-[min(1.6667vw,3.15vh)] rounded-[2px] md:rounded-[0.1389vw] px-[10px] md:px-[0.6944vw] text-[11px] md:text-[0.6944vw] font-semibold text-black placeholder:text-[#bcbcbc] placeholder:font-semibold outline-none transition-all ${
      hasError
        ? 'bg-[#FEF2F2] ring-1 ring-inset ring-[#DC2626] focus:ring-[#DC2626]'
        : 'bg-[#f0f0f0] focus:ring-1 focus:ring-inset focus:ring-black/20'
    }`;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSourceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When tab is closed (or reopened rapidly), clear validation errors and reset submitted view
  useEffect(() => {
    if (isOpen) {
      if (!isSubmitted) {
        clearFormErrors();
      }
      return;
    }

    setIsSourceOpen(false);
    setIsCountryOpen(false);
    const timer = setTimeout(() => {
      if (isSubmitted) {
        reset();
      } else {
        clearFormErrors();
      }
    }, 650);
    return () => clearTimeout(timer);
  }, [isOpen, isSubmitted, reset, clearFormErrors]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-beausite selection:bg-black selection:text-white">
          
          {/* ─── Dimmed Background Overlay ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-[3px] cursor-pointer"
            aria-hidden="true"
          />

          {/* ─── Sliding White Contact Tab (Half screen width on desktop: 50vw) ─── */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent="true"
            className="relative z-10 w-full md:w-[50vw] max-w-full h-full bg-white text-black shadow-2xl flex flex-col overflow-y-auto overscroll-contain select-none"
            style={{ overscrollBehavior: 'contain' }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact Us"
          >
            <div 
              data-lenis-prevent="true"
              className="w-full min-h-full px-[18px] md:px-[1.25vw] py-[14px] md:py-[min(1.0417vw,1.7vh)] flex flex-col justify-between"
            >
              
              {/* ─── TOP SECTION: Header (Always visible) ─── */}
              <div className="w-full shrink-0 overflow-hidden pb-[12px] md:pb-[min(1.25vw,2vh)]">
                <motion.div 
                  variants={maskedItemVariants}
                  custom={0}
                  className="w-full flex items-center justify-between"
                >
                  <h2 className="text-[22px] md:text-[1.65vw] font-bold tracking-[-0.03em] uppercase text-[#0a0a0a] leading-none">
                    CONTACT US
                  </h2>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-[5px] md:gap-[0.35vw] text-[10px] md:text-[0.6944vw] font-bold uppercase tracking-[-0.03em] text-[#0a0a0a] hover:opacity-60 transition-opacity p-[3px] cursor-pointer"
                    aria-label="Close Contact Tab"
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[7px] h-[7px] md:w-[0.4861vw] md:h-[0.4861vw]">
                      <path d="M1 1L6 6M6 1L1 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span>Close</span>
                  </button>
                </motion.div>
              </div>

              {/* ─── MIDDLE SECTION: Form OR Thank You Message (Animated Switch) ─── */}
              <div className={`w-full grow shrink-0 flex flex-col ${isSubmitted ? 'items-center justify-center py-[20px] md:py-[3vh]' : 'justify-start'}`}>
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    /* ─── FORM VIEW ─── */
                    <motion.form
                      key="form"
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }}
                      noValidate
                      onSubmit={(e) => {
                        notifySubmitAttempt();
                        return handleSubmit(e);
                      }}
                      className="w-full flex flex-col"
                    >
                      <input type="text" {...spamField} hidden tabIndex={-1} autoComplete="off" aria-hidden="true" />
                      {/* Inner Form Fields (Stack Spacing: 1.25vw = 18px at 1440px, capped by 2.15vh so all elements fit without scrolling) */}
                      <div className="w-full space-y-[12px] md:space-y-[min(1.25vw,2.15vh)]">
                        {/* Field 1: Name */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={1} className="w-full">
                            <label htmlFor={id + 'name'} className={getLabelClass(errors.name)}>
                              Name*
                            </label>
                            <input
                              type="text"
                              {...inputProps('name')}
                              placeholder="e.g. John Mark"
                              className={getInputClass(errors.name)}
                            />
                            <ContactFieldError id={id + 'name-error'} error={errors.name} />
                          </motion.div>
                        </div>

                        {/* Field 2: Phone Number */}
                        <div className={isCountryOpen ? 'w-full relative z-30 overflow-visible' : 'w-full relative overflow-hidden'}>
                          <motion.div variants={maskedItemVariants} custom={2} className="w-full">
                            <label htmlFor={id + 'phone'} className={getLabelClass(errors.phone)}>
                              Phone Number*
                            </label>
                            <div className="flex items-stretch gap-[6px] md:gap-[0.4167vw] w-full">
                              <CountryCodeSelect
                                value={countryIso}
                                onChange={setCountryIso}
                                onOpenChange={setIsCountryOpen}
                                variant="light"
                                hasError={Boolean(errors.phone)}
                                triggerClassName="w-auto min-w-[84px] md:min-w-[5.2vw] h-[30px] md:h-[min(1.6667vw,3.15vh)] rounded-[2px] md:rounded-[0.1389vw] px-[8px] md:px-[0.55vw] text-[11px] md:text-[0.6944vw] font-semibold"
                              />
                              <input
                                type="tel"
                                inputMode="numeric"
                                {...inputProps('phone')}
                                placeholder="e.g. 501234567"
                                className={getInputClass(errors.phone, 'flex-1 min-w-0')}
                              />
                            </div>
                            <ContactFieldError id={id + 'phone-error'} error={errors.phone} />
                          </motion.div>
                        </div>

                        {/* Field 3: Email */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={3} className="w-full">
                            <label htmlFor={id + 'email'} className={getLabelClass(errors.email)}>
                              Email*
                            </label>
                            <input
                              type="email"
                              {...inputProps('email')}
                              placeholder="e.g. jo.......@gmail.com"
                              className={getInputClass(errors.email)}
                            />
                            <ContactFieldError id={id + 'email-error'} error={errors.email} />
                          </motion.div>
                        </div>

                        {/* Field 4: Company Name */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={4} className="w-full">
                            <label htmlFor={id + 'company'} className={getLabelClass(errors.company)}>
                              Company Name (optional)
                            </label>
                            <input
                              type="text"
                              {...inputProps('company')}
                              placeholder="e.g. PLATO Design House"
                              className={getInputClass(errors.company)}
                            />
                            <ContactFieldError id={id + 'company-error'} error={errors.company} />
                          </motion.div>
                        </div>

                        {/* Field 5: Your Website Link */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={5} className="w-full">
                            <label htmlFor={id + 'website'} className={getLabelClass(errors.website)}>
                              Your Website Link (optional)
                            </label>
                            <input
                              type="url"
                              {...inputProps('website')}
                              placeholder="Add your URL here"
                              className={getInputClass(errors.website)}
                            />
                            <ContactFieldError id={id + 'website-error'} error={errors.website} />
                          </motion.div>
                        </div>

                        {/* Field 6: Project Type Pills */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={6} className="w-full">
                            <label className={getLabelClass(errors.projectTypes, 'mb-[6px] md:mb-[min(0.6944vw,1.15vh)]')}>
                              Project Type*
                            </label>
                            <div role="group" aria-label="Project Type (required)" aria-describedby={errors.projectTypes ? id + 'projectTypes-error' : undefined} className="flex flex-wrap items-center gap-[6px] md:gap-[0.6944vw]">
                              {PROJECT_TYPES.map((type) => {
                                const isSelected = selectedTypes.includes(type);
                                return (
                                  <button
                                    type="button"
                                    key={type}
                                    aria-pressed={isSelected}
                                    onClick={() => toggleProjectType(type)}
                                    className={`h-[28px] md:h-[min(1.5972vw,3vh)] px-[12px] md:px-[0.8333vw] rounded-full text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                                      isSelected
                                        ? 'bg-black text-white'
                                        : errors.projectTypes
                                          ? 'bg-[#FEF2F2] text-[#B91C1C] ring-1 ring-inset ring-[#DC2626]/60 hover:bg-[#FEE2E2]'
                                          : 'bg-[#f0f0f0] text-black hover:bg-[#e4e4e4]'
                                    }`}
                                  >
                                    {type}
                                  </button>
                                );
                              })}
                            </div>
                            <ContactFieldError id={id + 'projectTypes-error'} error={errors.projectTypes} />
                          </motion.div>
                        </div>

                        {/* Field 7: Expected Budget Pills */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={7} className="w-full">
                            <label className={getLabelClass(errors.budget, 'mb-[6px] md:mb-[min(0.6944vw,1.15vh)]')}>
                              Expected Budget*
                            </label>
                            <div role="group" aria-label="Expected Budget (required)" aria-describedby={errors.budget ? id + 'budget-error' : undefined} className="flex flex-wrap items-center gap-[6px] md:gap-[0.6944vw]">
                              {BUDGET_OPTIONS.map((budget) => {
                                const isSelected = selectedBudget === budget;
                                return (
                                  <button
                                    type="button"
                                    key={budget}
                                    aria-pressed={isSelected}
                                    onClick={() => handleBudgetSelect(budget)}
                                    className={`h-[28px] md:h-[min(1.5972vw,3vh)] px-[12px] md:px-[0.8333vw] rounded-full text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                                      isSelected
                                        ? 'bg-black text-white'
                                        : errors.budget
                                          ? 'bg-[#FEF2F2] text-[#B91C1C] ring-1 ring-inset ring-[#DC2626]/60 hover:bg-[#FEE2E2]'
                                          : 'bg-[#f0f0f0] text-black hover:bg-[#e4e4e4]'
                                    }`}
                                  >
                                    {budget}
                                  </button>
                                );
                              })}
                            </div>
                            <ContactFieldError id={id + 'budget-error'} error={errors.budget} />
                          </motion.div>
                        </div>

                        {/* Field 8: How did you hear about us? */}
                        <div className={isSourceOpen ? "w-full relative overflow-visible" : "w-full relative overflow-hidden"}>
                          <motion.div variants={maskedItemVariants} custom={8} className="w-full relative" ref={dropdownRef}>
                            <label className="block text-[11px] md:text-[0.6944vw] font-semibold text-black tracking-[-0.03em] mb-[4px] md:mb-[min(0.4167vw,0.7vh)] leading-none">
                              How did you hear about us?
                            </label>
                            <button
                              type="button"
                              onClick={() => setIsSourceOpen((prev) => !prev)}
                              className="w-full h-[30px] md:h-[min(1.6667vw,3.15vh)] bg-[#f0f0f0] rounded-[2px] md:rounded-[0.1389vw] px-[10px] md:px-[0.6944vw] text-[11px] md:text-[0.6944vw] font-semibold text-black flex items-center justify-between outline-none cursor-pointer text-left"
                            >
                              <span className={source === 'Select your option' ? 'text-[#bcbcbc]' : 'text-black'}>
                                {source}
                              </span>
                              <svg viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-[7px] h-[4px] md:w-[0.4861vw] md:h-[0.2778vw] transition-transform duration-200 ${isSourceOpen ? 'rotate-180' : ''}`}>
                                <path d="M1 1L3.5 3L6 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>

                            {/* Dropdown Options */}
                            {isSourceOpen && (
                              <div className="absolute top-full left-0 right-0 bg-white border border-[#e5e5e5] rounded-[2px] md:rounded-[0.1389vw] shadow-lg z-20 py-[4px] md:py-[0.2778vw] mt-[2px] md:mt-[0.1389vw]">
                                {SOURCE_OPTIONS.slice(1).map((opt) => (
                                  <div
                                    key={opt}
                                    onClick={() => {
                                      setSource(opt);
                                      setIsSourceOpen(false);
                                    }}
                                    className="px-[10px] md:px-[0.6944vw] py-[5px] md:py-[0.4167vw] text-[11px] md:text-[0.6944vw] font-semibold text-black hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                                  >
                                    {opt}
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>

                        {/* Field 9: Something specific you want to talk about? */}
                        <div className="w-full overflow-hidden">
                          <motion.div variants={maskedItemVariants} custom={9} className="w-full">
                            <label htmlFor={id + 'details'} className={getLabelClass(errors.details)}>
                              Something specific you want to talk about?
                            </label>
                            <div className="relative w-full">
                              <textarea
                                rows={3}
                                {...inputProps('details')}
                                placeholder="Add more details..."
                                className={`w-full h-[76px] md:h-[min(4.9306vw,8.8vh)] rounded-[2px] md:rounded-[0.1389vw] p-[10px] md:p-[min(0.6944vw,1.1vh)] text-[11px] md:text-[0.6944vw] font-semibold text-black placeholder:text-[#bcbcbc] placeholder:font-semibold outline-none resize-none transition-all leading-tight block ${
                                  errors.details
                                    ? 'bg-[#FEF2F2] ring-1 ring-inset ring-[#DC2626] focus:ring-[#DC2626]'
                                    : 'bg-[#f0f0f0] focus:ring-1 focus:ring-inset focus:ring-black/20'
                                }`}
                              />
                              <div className="absolute bottom-[6px] right-[6px] md:bottom-[0.4167vw] md:right-[0.4167vw] pointer-events-none select-none">
                                <svg viewBox="0 0 6 6" fill="none" className="w-[6px] h-[6px] md:w-[0.4167vw] md:h-[0.4167vw]">
                                  <line x1="5.5" y1="0.5" x2="0.5" y2="5.5" stroke="#bcbcbc" strokeWidth="1" strokeLinecap="round" />
                                  <line x1="5.5" y1="3.5" x2="3.5" y2="5.5" stroke="#bcbcbc" strokeWidth="1" strokeLinecap="round" />
                                </svg>
                              </div>
                            </div>
                            <ContactFieldError id={id + 'details-error'} error={errors.details} />
                          </motion.div>
                        </div>

                        {errorMessage && (
                          <p role="alert" className="font-beausite text-[#DC2626] text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.03em]">
                            {errorMessage}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="overflow-hidden px-[8px] -mx-[8px] mt-[16px] md:mt-[min(1.6667vw,2.6vh)] pt-[1px] pb-[2px]">
                        <motion.div variants={maskedItemVariants} custom={10}>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-[116px] md:w-[7.5694vw] h-[30px] md:h-[min(1.6667vw,3.15vh)] rounded-full bg-black text-white text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.03em] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center ${
                              isShaking ? 'animate-norque-shake ring-2 ring-[#DC2626]/45' : ''
                            }`}
                          >
                            {isSubmitting ? 'Sending…' : 'Submit Your Info'}
                          </button>
                        </motion.div>
                      </div>
                    </motion.form>
                  ) : (
                    /* ─── THANK YOU MESSAGE VIEW (References/Contact us/Thank You Message Reference.mp4) ─── */
                    <motion.div
                      key="thank-you"
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.2, ease: 'easeIn' } }}
                      className="w-full flex flex-col items-center justify-center text-center select-none"
                    >
                      {/* Frame 50: Width: 244px, Gap: 10px */}
                      <div className="w-[244px] md:w-[17vw] 2xl:w-[260px] flex flex-col items-center space-y-[10px] md:space-y-[1.1vh]">
                        
                        {/* 1. Frame 48: 20x20 Checkmark Circle (Spring Scale + Stroke Draw) */}
                        <motion.div
                          variants={thankYouIconVariants}
                          className="w-[20px] h-[20px] md:w-[1.4vw] md:h-[1.4vw] 2xl:w-[22px] 2xl:h-[22px] bg-black rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[11px] h-[8px] md:w-[0.76vw] md:h-[0.55vw]"
                          >
                            <motion.path
                              d="M1.5 4.2L4.2 6.8L9.5 1.5"
                              stroke="white"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              variants={checkmarkPathVariants}
                            />
                          </svg>
                        </motion.div>

                        {/* 2. Text: "Thank you!\nWe will contact you just before you finish your coffee!" (Masked Reveal) */}
                        <div className="w-full overflow-hidden py-[1px]">
                          <motion.div
                            variants={thankYouMaskedVariants}
                            custom={0.22}
                            className="w-full"
                          >
                            <p className="text-[10px] md:text-[0.69vw] 2xl:text-[11px] font-bold tracking-[-0.03em] text-[#0a0a0a] text-center leading-[1.35]">
                              Thank you!<br />
                              We will contact you just before you finish your coffee!
                            </p>
                          </motion.div>
                        </div>

                        {/* 3. Frame 49: Two Action Buttons ("Back to form" & "Close") (Masked Reveal) */}
                        <div className="w-full overflow-hidden pt-[2px]">
                          <motion.div
                            variants={thankYouMaskedVariants}
                            custom={0.36}
                            className="flex items-center justify-center gap-[6px] w-full"
                          >
                            {/* Check 4: Back to form */}
                            <button
                              type="button"
                              onClick={() => reset()}
                              className="w-[119px] md:w-[8.26vw] 2xl:w-[126px] h-[23px] md:h-[2.5vh] 2xl:h-[25px] rounded-full bg-black text-white text-[10px] md:text-[0.69vw] font-semibold tracking-[-0.03em] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
                            >
                              Back to form
                            </button>

                            {/* Check 6: Close */}
                            <button
                              type="button"
                              onClick={onClose}
                              className="w-[119px] md:w-[8.26vw] 2xl:w-[126px] h-[23px] md:h-[2.5vh] 2xl:h-[25px] rounded-full bg-[#f0f0f0] text-black text-[10px] md:text-[0.69vw] font-semibold tracking-[-0.03em] hover:bg-[#e4e4e4] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
                            >
                              Close
                            </button>
                          </motion.div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ─── BOTTOM SECTION: Company Data / Contacts Footer (Always visible) ─── */}
              <div className="w-full shrink-0 overflow-hidden pt-[10px] md:pt-[min(1.0417vw,1.6vh)] border-t border-[#e5e5e5]/80 mt-[14px] md:mt-[min(1.25vw,1.9vh)]">
                <motion.div 
                  variants={maskedItemVariants}
                  custom={11}
                  className="w-full flex items-end justify-between"
                >
                  {/* Left: Socials & Pitch Deck */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col space-y-[1px]">
                      <a
                        href="https://instagram.com/norquestudios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11.5px] md:text-[0.82vw] font-semibold text-black hover:opacity-50 transition-opacity leading-[1.25]"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://behance.net/norquestudios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11.5px] md:text-[0.82vw] font-semibold text-black hover:opacity-50 transition-opacity leading-[1.25]"
                      >
                        Behance
                      </a>
                      <a
                        href="https://linkedin.com/company/norquestudios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11.5px] md:text-[0.82vw] font-semibold text-black hover:opacity-50 transition-opacity leading-[1.25]"
                      >
                        LinkedIn
                      </a>
                    </div>

                    <a
                      href={PITCH_DECK_URL}
                      download={PITCH_DECK_FILENAME}
                      className="flex items-center gap-[5px] text-[9px] md:text-[0.62vw] font-semibold text-[#737373] hover:text-black transition-colors mt-[6px] md:mt-[0.5vw]"
                    >
                      <svg width="8" height="10" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[8px] h-[10px] flex-shrink-0">
                        <path d="M5.5 1V9M5.5 9L2 5.5M5.5 9L9 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 12H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      <span>Download our Pitch Deck [PDF]</span>
                    </a>
                  </div>

                  {/* Right: Phone Numbers & Direct Email */}
                  <div className="text-right flex flex-col space-y-[1px]">
                    <a
                      href="tel:+971585240159"
                      className="text-[13px] md:text-[0.92vw] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2]"
                    >
                      +971 58 524 0159
                    </a>
                    <a
                      href="tel:+201100263391"
                      className="text-[13px] md:text-[0.92vw] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2]"
                    >
                      +20 110 0263391
                    </a>
                    <a
                      href="tel:+201145620801"
                      className="text-[13px] md:text-[0.92vw] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2]"
                    >
                      +20 114 5620801
                    </a>
                    <a
                      href="mailto:norquestudios@gmail.com"
                      className="text-[13px] md:text-[0.92vw] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2] pt-[1px]"
                    >
                      norquestudios@gmail.com
                    </a>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.aside>

        </div>
      )}
    </AnimatePresence>
  );
}
