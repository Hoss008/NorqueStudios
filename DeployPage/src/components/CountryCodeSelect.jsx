import React, { useEffect, useMemo, useRef, useState } from 'react';
import { COUNTRY_CODES, DEFAULT_COUNTRY_ISO } from '../hooks/contactOptions';

/**
 * Searchable country calling code selector shared by ContactTab (light) and
 * ServicesContactSection (dark).
 */
export default function CountryCodeSelect({
  value = DEFAULT_COUNTRY_ISO,
  onChange,
  onOpenChange,
  variant = 'light',
  hasError = false,
  className = '',
  triggerClassName = '',
  ariaLabel = 'Country code',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  const selected = useMemo(
    () =>
      COUNTRY_CODES.find((c) => c.iso === value) ||
      COUNTRY_CODES.find((c) => c.iso === DEFAULT_COUNTRY_ISO) ||
      COUNTRY_CODES[0],
    [value]
  );

  const filtered = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return COUNTRY_CODES;
    const digitsQuery = raw.replace(/^\+/, '');
    return COUNTRY_CODES.filter((c) => {
      const dialDigits = c.dial.replace(/^\+/, '');
      return (
        c.name.toLowerCase().includes(raw) ||
        c.iso.toLowerCase().includes(raw) ||
        c.dial.includes(raw) ||
        (digitsQuery && dialDigits.startsWith(digitsQuery)) ||
        (c.keywords && c.keywords.includes(raw))
      );
    });
  }, [query]);

  const setOpen = (next) => {
    setIsOpen(next);
    onOpenChange?.(next);
    if (!next) {
      setQuery('');
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const idx = filtered.findIndex((c) => c.iso === selected.iso);
      setActiveIndex(idx >= 0 ? idx : 0);
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const item = listRef.current.children[activeIndex];
    if (item && typeof item.scrollIntoView === 'function') {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  const handleSelect = (country) => {
    onChange?.(country.iso);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) {
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        handleSelect(filtered[activeIndex]);
      }
    }
  };

  const isDark = variant === 'dark';

  const triggerTone = isDark
    ? hasError
      ? 'bg-[#261414] text-white ring-1 ring-inset ring-[#F87171]'
      : 'bg-[#171717] text-white hover:bg-[#1f1f1f] focus:ring-1 focus:ring-inset focus:ring-white/20'
    : hasError
      ? 'bg-[#FEF2F2] text-black ring-1 ring-inset ring-[#DC2626]'
      : 'bg-[#f0f0f0] text-black hover:bg-[#e7e7e7] focus:ring-1 focus:ring-inset focus:ring-black/20';

  const menuTone = isDark
    ? 'bg-[#171717] border border-white/10 text-white'
    : 'bg-white border border-[#e5e5e5] text-black';

  const searchTone = isDark
    ? 'bg-[#222222] text-white placeholder:text-[#777777] border-b border-white/10'
    : 'bg-[#f6f6f6] text-black placeholder:text-[#999999] border-b border-[#e5e5e5]';

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative shrink-0 ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center justify-between gap-[4px] md:gap-[0.3vw] outline-none cursor-pointer transition-colors select-none ${triggerTone} ${triggerClassName}`}
      >
        <span className="truncate leading-none">
          {selected.iso} {selected.dial}
        </span>
        <svg
          viewBox="0 0 7 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-[7px] h-[4px] md:w-[0.4861vw] md:h-[0.2778vw] shrink-0 transition-transform duration-200 ${
            isDark ? 'text-[#666666]' : 'text-current'
          } ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1L3.5 3L6 1"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          data-lenis-prevent="true"
          className={`absolute top-full left-0 mt-[2px] md:mt-[0.1389vw] w-[230px] md:w-[17vw] rounded-[2px] md:rounded-[0.1389vw] shadow-2xl z-50 overflow-hidden ${menuTone}`}
        >
          <div className="p-[6px] md:p-[0.4167vw]">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code..."
              aria-label="Search country code"
              className={`w-full h-[26px] md:h-[1.6667vw] px-[8px] md:px-[0.55vw] rounded-[2px] md:rounded-[0.1389vw] text-[11px] md:text-[0.6944vw] font-semibold outline-none ${searchTone}`}
            />
          </div>

          <div
            ref={listRef}
            role="listbox"
            data-lenis-prevent="true"
            className="max-h-[180px] md:max-h-[12.5vw] overflow-y-auto overscroll-contain pb-[4px] md:pb-[0.2778vw]"
            style={{ overscrollBehavior: 'contain' }}
          >
            {filtered.length > 0 ? (
              filtered.map((country, idx) => {
                const isSelected = country.iso === selected.iso;
                const isHighlighted = idx === activeIndex;
                return (
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    key={country.iso}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleSelect(country)}
                    className={`w-full px-[10px] md:px-[0.6944vw] py-[5px] md:py-[0.38vw] text-left flex items-center justify-between gap-[8px] text-[11px] md:text-[0.6944vw] font-semibold tracking-[-0.02em] cursor-pointer transition-colors ${
                      isDark
                        ? isHighlighted || isSelected
                          ? 'bg-white/10 text-white'
                          : 'text-[#aaaaaa] hover:text-white hover:bg-white/5'
                        : isHighlighted || isSelected
                          ? 'bg-[#f0f0f0] text-black'
                          : 'text-black/80 hover:bg-[#f5f5f5] hover:text-black'
                    }`}
                  >
                    <span className="truncate">
                      <span className="opacity-55 mr-[5px]">{country.iso}</span>
                      {country.name}
                    </span>
                    <span className="shrink-0 tabular-nums opacity-75">{country.dial}</span>
                  </button>
                );
              })
            ) : (
              <div
                className={`px-[10px] md:px-[0.6944vw] py-[8px] md:py-[0.5vw] text-[11px] md:text-[0.6944vw] font-semibold ${
                  isDark ? 'text-[#666666]' : 'text-[#999999]'
                }`}
              >
                No matches found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
