import React from 'react';

/* ========================================================================= */
/* NORQUE CIRCLE BRAND MARK (CIRCLED "N")                                     */
/* Extracted 1:1 from Homepage.fig (Group 5)                                 */
/* ========================================================================= */
export default function NorqueCircleLogo({ className = "w-full h-auto text-white" }) {
  return (
    <svg 
      viewBox="0 0 89.05 87.38" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Norque Studios Brand Mark"
    >
      {/* Outer Ring Circle */}
      <path 
        d="M0 43.51C0 17.28 19.79 0 44.7 0C69.26 0 89.05 17.17 89.05 43.51C89.05 70.21 69.26 87.38 44.7 87.38C19.79 87.38 0 71.05 0 43.51ZM44.46 77.25C63.42 77.25 77.6 63.78 77.6 43.63C77.6 23.13 63.06 10.01 44.46 10.01C25.15 10.01 11.32 23.84 11.32 43.39C11.32 64.13 25.15 77.25 44.46 77.25Z" 
        fill="currentColor" 
      />
      {/* Inner Letter "N" */}
      <path 
        d="M10.17 34.71L0 34.71L0 0L13.13 0C20.83 12.44 23.4 16.93 25.67 21.43L25.87 21.43C25.52 18.12 25.57 11.85 25.57 6.12L25.57 0L35.69 0L35.69 34.71L23.3 34.71C20.59 29.87 12.05 15.11 9.97 10.86L9.82 10.86C10.12 14.81 10.17 19.45 10.17 26.26L10.17 34.71Z" 
        transform="translate(26.678, 26.336)" 
        fill="currentColor" 
      />
    </svg>
  );
}
