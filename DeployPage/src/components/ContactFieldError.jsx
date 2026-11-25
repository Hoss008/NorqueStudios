import React from 'react';

export default function ContactFieldError({ id, error, variant = 'light', className = '' }) {
  if (!error) return null;

  const toneClass =
    variant === 'dark'
      ? 'text-[#F87171] text-[11px] md:text-[0.625vw] mt-[4px] md:mt-[0.3vw]'
      : 'text-[#DC2626] text-[9.5px] md:text-[0.62vw] mt-[3px]';

  return (
    <p
      id={id}
      role="alert"
      className={`font-beausite font-semibold tracking-[-0.03em] leading-tight flex items-center gap-[4px] md:gap-[0.28vw] ${toneClass} ${className}`}
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className="w-[10px] h-[10px] md:w-[0.65vw] md:h-[0.65vw] flex-shrink-0"
      >
        <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 3.3V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6" cy="8.6" r="0.65" fill="currentColor" />
      </svg>
      <span>{error.message}</span>
    </p>
  );
}
