import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ========================================================================= */
/* CONTACT US SLIDING SIDE TAB COMPONENT                                     */
/* Reference: References/Contact us/Contact Us reference.png                 */
/* Figma: References/Contact us/Contact Us Side Page.fig                     */
/* Thank You Figma: References/Contact us/Contact Us Side Page - Thank You Message.fig */
/* Thank You Video: References/Contact us/Thank You Message Reference.mp4    */
/* ========================================================================= */

const PROJECT_TYPES = [
  'Full Website',
  'Branding',
  'UI/UX',
  'Web Development',
  'Social Media',
  'Consulting',
];

const BUDGET_OPTIONS = [
  '< $1000',
  '$1,000 — $2,000',
  '$2,000 — $3,000',
  '$3,000 — $5,000',
  '+$5,000',
];

const SOURCE_OPTIONS = [
  'Select your option',
  'Social Media (Instagram / LinkedIn)',
  'Behance',
  'Google / Search',
  'Recommendation / Referral',
  'Other',
];

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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [source, setSource] = useState('Select your option');
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [details, setDetails] = useState('');

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dropdownRef = useRef(null);

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

  // When tab is closed, reset submission state after exit transition completes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleProjectType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBudgetSelect = (b) => {
    setSelectedBudget((prev) => (prev === b ? '' : b));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitted(true);
  };

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

          {/* ─── Sliding White Contact Tab (Width: 561px in Figma / 38.95vw) ─── */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent="true"
            className="relative z-10 w-full sm:w-[540px] md:w-[38.9583vw] max-w-full h-full bg-white text-black shadow-2xl flex flex-col overflow-y-auto overscroll-contain select-none"
            style={{ overscrollBehavior: 'contain' }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact Us"
          >
            <div 
              data-lenis-prevent="true"
              className="w-full min-h-full px-[18px] md:px-[1.25vw] py-[14px] md:py-[1.5vh] 2xl:py-[18px] flex flex-col justify-between"
            >
              
              {/* ─── TOP SECTION: Header (Always visible) ─── */}
              <div className="w-full overflow-hidden pb-[8px] md:pb-[0.9vh]">
                <motion.div 
                  variants={maskedItemVariants}
                  custom={0}
                  className="w-full flex items-center justify-between"
                >
                  <h2 className="text-[22px] md:text-[1.65vw] 2xl:text-[26px] font-bold tracking-[-0.03em] uppercase text-[#0a0a0a] leading-none">
                    CONTACT US
                  </h2>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-[5px] text-[10px] md:text-[0.68vw] font-bold uppercase tracking-[-0.03em] text-[#0a0a0a] hover:opacity-60 transition-opacity p-[3px] cursor-pointer"
                    aria-label="Close Contact Tab"
                  >
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[7px] h-[7px]">
                      <path d="M1 1L6 6M6 1L1 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span>Close</span>
                  </button>
                </motion.div>
              </div>

              {/* ─── MIDDLE SECTION: Form OR Thank You Message (Animated Switch) ─── */}
              <div className={`w-full flex-1 flex flex-col ${isSubmitted ? 'items-center justify-center py-[20px] md:py-[3vh]' : 'justify-start'}`}>
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    /* ─── FORM VIEW ─── */
                    <motion.form
                      key="form"
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }}
                      onSubmit={handleSubmit}
                      className="w-full space-y-[6px] md:space-y-[0.7vh] 2xl:space-y-[9px]"
                    >
                      {/* Field 1: Name */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={1} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Name*
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John Mark"
                            className="w-full h-[20px] md:h-[2.2vh] 2xl:h-[23px] bg-[#f0f0f0] rounded-[2px] px-[8px] md:px-[0.55vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black placeholder:text-[#bcbcbc] outline-none focus:ring-1 focus:ring-black/20 transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* Field 2: Phone Number */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={2} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +971 XX XXX XXXX"
                            className="w-full h-[20px] md:h-[2.2vh] 2xl:h-[23px] bg-[#f0f0f0] rounded-[2px] px-[8px] md:px-[0.55vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black placeholder:text-[#bcbcbc] outline-none focus:ring-1 focus:ring-black/20 transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* Field 3: Email */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={3} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Email*
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. jo.......@gmail.com"
                            className="w-full h-[20px] md:h-[2.2vh] 2xl:h-[23px] bg-[#f0f0f0] rounded-[2px] px-[8px] md:px-[0.55vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black placeholder:text-[#bcbcbc] outline-none focus:ring-1 focus:ring-black/20 transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* Field 4: Company Name */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={4} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. PLATO Design House"
                            className="w-full h-[20px] md:h-[2.2vh] 2xl:h-[23px] bg-[#f0f0f0] rounded-[2px] px-[8px] md:px-[0.55vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black placeholder:text-[#bcbcbc] outline-none focus:ring-1 focus:ring-black/20 transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* Field 5: Your Website Link */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={5} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Your Website Link (optional)
                          </label>
                          <input
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Add your URL here"
                            className="w-full h-[20px] md:h-[2.2vh] 2xl:h-[23px] bg-[#f0f0f0] rounded-[2px] px-[8px] md:px-[0.55vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black placeholder:text-[#bcbcbc] outline-none focus:ring-1 focus:ring-black/20 transition-all"
                          />
                        </motion.div>
                      </div>

                      {/* Field 6: Project Type Pills */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={6} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Project Type
                          </label>
                          <div className="flex flex-wrap gap-[4px] md:gap-[0.32vw]">
                            {PROJECT_TYPES.map((type) => {
                              const isSelected = selectedTypes.includes(type);
                              return (
                                <button
                                  type="button"
                                  key={type}
                                  onClick={() => toggleProjectType(type)}
                                  className={`h-[19px] md:h-[2.1vh] 2xl:h-[22px] px-[9px] md:px-[0.6vw] rounded-full text-[9px] md:text-[0.62vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                                    isSelected
                                      ? 'bg-black text-white'
                                      : 'bg-[#f0f0f0] text-black hover:bg-[#e4e4e4]'
                                  }`}
                                >
                                  {type}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      </div>

                      {/* Field 7: Expected Budget Pills */}
                      <div className="w-full overflow-hidden">
                        <motion.div variants={maskedItemVariants} custom={7} className="w-full">
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Expected Budget
                          </label>
                          <div className="flex flex-wrap gap-[4px] md:gap-[0.32vw]">
                            {BUDGET_OPTIONS.map((budget) => {
                              const isSelected = selectedBudget === budget;
                              return (
                                <button
                                  type="button"
                                  key={budget}
                                  onClick={() => handleBudgetSelect(budget)}
                                  className={`h-[19px] md:h-[2.1vh] 2xl:h-[22px] px-[9px] md:px-[0.6vw] rounded-full text-[9px] md:text-[0.62vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                                    isSelected
                                      ? 'bg-black text-white'
                                      : 'bg-[#f0f0f0] text-black hover:bg-[#e4e4e4]'
                                  }`}
                                >
                                  {budget}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      </div>

                      {/* Field 8: How did you hear about us? */}
                      <div className={isSourceOpen ? "w-full relative overflow-visible" : "w-full relative overflow-hidden"}>
                        <motion.div variants={maskedItemVariants} custom={8} className="w-full relative" ref={dropdownRef}>
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            How did you hear about us?
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsSourceOpen((prev) => !prev)}
                            className="w-full h-[20px] md:h-[2.2vh] 2xl:h-[23px] bg-[#f0f0f0] rounded-[2px] px-[8px] md:px-[0.55vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black flex items-center justify-between outline-none cursor-pointer text-left"
                          >
                            <span className={source === 'Select your option' ? 'text-[#bcbcbc]' : 'text-black'}>
                              {source}
                            </span>
                            <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-200 ${isSourceOpen ? 'rotate-180' : ''}`}>
                              <path d="M1 1L3.5 3L6 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                          {/* Dropdown Options */}
                          {isSourceOpen && (
                            <div className="absolute top-[105%] left-0 w-full bg-white border border-[#e5e5e5] rounded-[2px] shadow-lg z-20 py-[4px] mt-[2px]">
                              {SOURCE_OPTIONS.slice(1).map((opt) => (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setSource(opt);
                                    setIsSourceOpen(false);
                                  }}
                                  className="px-[8px] py-[4px] text-[9.5px] md:text-[0.64vw] font-semibold text-black hover:bg-[#f5f5f5] cursor-pointer transition-colors"
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
                          <label className="block text-[9.5px] md:text-[0.64vw] font-semibold text-black tracking-[-0.03em] mb-[1.5px] leading-tight">
                            Something specific you want to talk about?
                          </label>
                          <textarea
                            rows={2}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Add more details..."
                            className="w-full h-[42px] md:h-[4.6vh] 2xl:h-[55px] bg-[#f0f0f0] rounded-[2px] p-[5px] md:p-[0.4vw] text-[9.5px] md:text-[0.64vw] font-semibold text-black placeholder:text-[#bcbcbc] outline-none focus:ring-1 focus:ring-black/20 resize-none transition-all leading-tight"
                          />
                        </motion.div>
                      </div>

                      {/* Submit Button */}
                      <div className="overflow-hidden pt-[1px]">
                        <motion.div variants={maskedItemVariants} custom={10}>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="h-[21px] md:h-[2.3vh] 2xl:h-[23px] px-[16px] md:px-[1.1vw] rounded-full bg-black text-white text-[9.5px] md:text-[0.64vw] font-semibold tracking-[-0.03em] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
                          >
                            Submit Your Info
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
                              onClick={() => setIsSubmitted(false)}
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
              <div className="w-full overflow-hidden pt-[10px] md:pt-[2vh] border-t border-[#e5e5e5]/80 mt-[12px] md:mt-[1.5vh] 2xl:mt-[20px]">
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
                        className="text-[11.5px] md:text-[0.82vw] 2xl:text-[13px] font-semibold text-black hover:opacity-50 transition-opacity leading-[1.25]"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://behance.net/norquestudios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11.5px] md:text-[0.82vw] 2xl:text-[13px] font-semibold text-black hover:opacity-50 transition-opacity leading-[1.25]"
                      >
                        Behance
                      </a>
                      <a
                        href="https://linkedin.com/company/norquestudios"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11.5px] md:text-[0.82vw] 2xl:text-[13px] font-semibold text-black hover:opacity-50 transition-opacity leading-[1.25]"
                      >
                        LinkedIn
                      </a>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center gap-[5px] text-[9px] md:text-[0.62vw] font-semibold text-[#737373] hover:text-black transition-colors mt-[6px] md:mt-[0.7vh]"
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
                      className="text-[13px] md:text-[0.92vw] 2xl:text-[15px] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2]"
                    >
                      +971 58 524 0159
                    </a>
                    <a
                      href="tel:+201100263391"
                      className="text-[13px] md:text-[0.92vw] 2xl:text-[15px] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2]"
                    >
                      +20 110 0263391
                    </a>
                    <a
                      href="tel:+201145620801"
                      className="text-[13px] md:text-[0.92vw] 2xl:text-[15px] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2]"
                    >
                      +20 114 5620801
                    </a>
                    <a
                      href="mailto:hello@norquestudios.com"
                      className="text-[13px] md:text-[0.92vw] 2xl:text-[15px] font-bold text-black tracking-[-0.03em] hover:opacity-60 transition-opacity leading-[1.2] pt-[1px]"
                    >
                      hello@norquestudios
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
