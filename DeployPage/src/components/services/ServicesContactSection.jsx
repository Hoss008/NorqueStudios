import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECT_TYPES = [
  'Full Website',
  'Branding',
  'UI/UX',
  'Web Development',
  'Social Media',
  'Consulting'
];

const BUDGET_OPTIONS = [
  '< $1000',
  '$1,000 — $2,000',
  '$2,000 — $3,000',
  '$3,000 — $5,000',
  '+$5,000'
];

const SOURCE_OPTIONS = [
  'Select your option',
  'Social Media (Instagram / LinkedIn)',
  'Behance',
  'Google / Search',
  'Recommendation / Referral',
  'Other'
];

export default function ServicesContactSection() {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dropdownRef = useRef(null);

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

  const toggleProjectType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);
  };

  return (
    <section className="relative w-full min-h-[50.9722vw] py-[5.4167vw] px-[0.8333vw] bg-black text-white flex flex-col justify-center">
      <div className="w-full grid grid-cols-12 gap-[0.8333vw] items-stretch min-h-[40.1389vw]">
        
        {/* Left Side: Statement & Pitch Deck Card (Columns 1 to 6) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between items-start min-h-[40.1389vw]">
          
          {/* Paragraph Statement */}
          <div className="w-full max-w-[48.3333vw]">
            <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.14] text-white">
              We don’t just do some good designs, we actually look for your pain point, work on it and solve it. So the outcome is not just good visually, it is functional as well.
            </p>
            <p className="mt-[1.5278vw] text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.14] text-white">
              Fill the form and let’s talk.
            </p>
          </div>

          {/* 1:1 Pitch Deck Download Card (Frame 51: 223px x 97px -> 15.4861vw x 6.7361vw) */}
          <a
            href="/Norque-Pitch-Deck.pdf"
            download="Norque-Pitch-Deck.pdf"
            className="group relative w-[15.4861vw] h-[6.7361vw] rounded-[0.2778vw] overflow-hidden cursor-pointer select-none block transition-transform duration-300 hover:scale-[1.02] shadow-xl mt-[2.7778vw] lg:mt-0"
            aria-label="Download Norque's Pitch Deck PDF"
          >
            {/* Card Background Image & Dark Overlay */}
            <img
              src="/images/services/ee1003dbc63d96edd88458b92a40280bb45f11a0.png"
              alt="Norque Pitch Deck Preview"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/28 group-hover:bg-black/15 transition-colors" />

            {/* Top Badge: 24.6 MB (Frame 62: 54px x 19px -> 3.75vw x 1.3194vw) */}
            <div className="absolute top-[0.8333vw] left-[0.8333vw] z-10 w-[3.75vw] h-[1.3194vw] bg-black/55 backdrop-blur-[0.1389vw] rounded-[0.2778vw] flex items-center justify-center">
              <span className="text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-none">
                24.6 MB
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

        </div>

        {/* Right Side: Replicated Contact Form (Columns 7 to 12) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-end justify-center min-h-[40.1389vw]">
          <div className="w-full max-w-[46.0417vw] h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col justify-between h-full"
                >
                  {/* Inner Form Fields (Stack Spacing: 1.25vw = 18px) */}
                  <div className="w-full space-y-[1.25vw]">
                    
                    {/* Field 1: Name* */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        Name*
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Mark"
                        required
                        className="w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none focus:ring-1 focus:ring-white/20 transition-all border-none"
                      />
                    </div>

                    {/* Field 2: Phone Number* */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +971 XX XXX XXXX"
                        required
                        className="w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none focus:ring-1 focus:ring-white/20 transition-all border-none"
                      />
                    </div>

                    {/* Field 3: Email* */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        Email*
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jo.......@gmail.com"
                        required
                        className="w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none focus:ring-1 focus:ring-white/20 transition-all border-none"
                      />
                    </div>

                    {/* Field 4: Company Name */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. PLATO Design House"
                        className="w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none focus:ring-1 focus:ring-white/20 transition-all border-none"
                      />
                    </div>

                    {/* Field 5: Your Website Link (optional) */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        Your Website Link (optional)
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Add your URL here"
                        className="w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none focus:ring-1 focus:ring-white/20 transition-all border-none"
                      />
                    </div>

                    {/* Field 6: Project Type Pills */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.6944vw] leading-none">
                        Project Type
                      </label>
                      <div className="flex flex-wrap items-center gap-[0.6944vw]">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = selectedTypes.includes(type);
                          return (
                            <button
                              type="button"
                              key={type}
                              onClick={() => toggleProjectType(type)}
                              className={`h-[1.5972vw] px-[0.8333vw] rounded-full text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-white text-black'
                                  : 'bg-[#171717] text-[#666666] hover:text-[#999999]'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Field 7: Expected Budget Pills */}
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.6944vw] leading-none">
                        Expected Budget
                      </label>
                      <div className="flex flex-wrap items-center gap-[0.6944vw]">
                        {BUDGET_OPTIONS.map((opt) => {
                          const isSelected = selectedBudget === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setSelectedBudget(selectedBudget === opt ? '' : opt)}
                              className={`h-[1.5972vw] px-[0.8333vw] rounded-full text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center transition-colors duration-150 cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-white text-black'
                                  : 'bg-[#171717] text-[#666666] hover:text-[#999999]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Field 8: How did you hear about us? Dropdown */}
                    <div className="w-full relative" ref={dropdownRef}>
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        How did you hear about us?
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSourceOpen(!isSourceOpen)}
                        className="w-full h-[1.6667vw] bg-[#171717] rounded-[0.1389vw] px-[0.6944vw] text-[0.6944vw] font-semibold flex items-center justify-between cursor-pointer border-none outline-none select-none"
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
                    <div className="w-full">
                      <label className="block text-[0.6944vw] font-semibold text-white tracking-[-0.03em] mb-[0.4167vw] leading-none">
                        Something specific you want to talk about?
                      </label>
                      <div className="relative w-full">
                        <textarea
                          rows={3}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Add more details..."
                          className="w-full h-[4.9306vw] bg-[#171717] rounded-[0.1389vw] p-[0.6944vw] text-[0.6944vw] font-semibold text-white placeholder:text-[#666666] placeholder:font-semibold outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none border-none block"
                        />
                        {/* Figma Resize Gripper Icon (Two 45-degree diagonal lines) */}
                        <div className="absolute bottom-[0.4167vw] right-[0.4167vw] pointer-events-none select-none">
                          <svg viewBox="0 0 6 6" fill="none" className="w-[0.4167vw] h-[0.4167vw]">
                            <line x1="5.5" y1="0.5" x2="0.5" y2="5.5" stroke="#666666" strokeWidth="1" strokeLinecap="round" />
                            <line x1="5.5" y1="3.5" x2="3.5" y2="5.5" stroke="#666666" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="text-red-400 text-[0.6944vw] font-semibold tracking-tight">
                        {errorMessage}
                      </p>
                    )}

                  </div>

                  {/* Submit Button (Frame: 109px x 24px -> 7.5694vw x 1.6667vw, Stack Spacing: 1.6667vw below inner form) */}
                  <div className="mt-[1.6667vw] flex items-center justify-start">
                    <button
                      type="submit"
                      className="w-[7.5694vw] h-[1.6667vw] rounded-full bg-white text-black text-[0.6944vw] font-semibold tracking-[-0.03em] flex items-center justify-center cursor-pointer hover:bg-white/90 active:scale-95 transition-all select-none"
                    >
                      Submit Your Info
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
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setCompany('');
                      setWebsite('');
                      setSelectedTypes([]);
                      setSelectedBudget('');
                      setSource('Select your option');
                      setDetails('');
                    }}
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
