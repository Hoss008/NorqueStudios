import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, X, KeyRound, ShieldCheck } from 'lucide-react';

/* ========================================================================= */
/* NORQUE STUDIOS - ADMIN AUTHENTICATION GATE MODAL                         */
/* Protects the Works CMS from unauthorized public access                   */
/* ========================================================================= */

const DEFAULT_ADMIN_PASSWORD = 'norque2026';

export default function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);
  const inputRef = useRef(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const storedPassword = localStorage.getItem('norque_admin_password') || DEFAULT_ADMIN_PASSWORD;

    if (password.trim() === storedPassword) {
      setError(false);
      sessionStorage.setItem('norque_admin_authenticated', 'true');
      onSuccess();
    } else {
      setError(true);
      setShake(prev => prev + 1);
      if (inputRef.current) {
        inputRef.current.select();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            key={shake}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: error ? [0, -8, 8, -6, 6, -3, 3, 0] : 0 
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] bg-[#0d0d0d] border border-white/10 rounded-[8px] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a87f2f] to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-[4px] bg-[#171717] hover:bg-[#252525] text-[#888] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            {/* Header / Brand */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[#a87f2f] mb-3 shadow-inner">
                <Lock size={20} />
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#a87f2f] uppercase mb-1">
                Norque Studios
              </span>
              <h2 className="text-lg font-semibold tracking-[-0.02em] uppercase text-white">
                CMS Access Gate
              </h2>
              <p className="text-xs text-[#737373] mt-1 max-w-[280px]">
                Enter the administrator password to unlock the studio portfolio manager.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#555]">
                    <KeyRound size={15} />
                  </div>
                  <input
                    ref={inputRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Administrator password"
                    className={`w-full pl-9 pr-10 py-2.5 bg-[#141414] border ${
                      error ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#a87f2f]'
                    } rounded-[4px] text-white placeholder-[#555] text-xs font-mono tracking-wider outline-none transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#666] hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[11px] mt-2 font-medium flex items-center space-x-1"
                  >
                    <span>⚠</span>
                    <span>Invalid password. Please check your credentials.</span>
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-white hover:bg-[#eaeaea] text-black text-xs font-bold tracking-[-0.02em] uppercase rounded-[4px] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <ShieldCheck size={14} />
                <span>Unlock CMS</span>
              </button>
            </form>

            {/* Keyboard shortcut hint */}
            <div className="mt-6 pt-4 border-t border-white/5 text-center">
              <p className="text-[10px] text-[#555] leading-relaxed">
                Shortcut: <span className="text-[#888] font-mono">Ctrl + Shift + A</span> (or <span className="text-[#888] font-mono">#admin</span> in URL)
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
