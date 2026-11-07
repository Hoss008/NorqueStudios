import React from 'react';
import MaskedWordStagger from './MaskedWordStagger';
import NorqueCircleLogo from './NorqueCircleLogo';

/* ========================================================================= */
/* PHILOSOPHY SECTION COMPONENT                                              */
/* Typographic intention manifesto reflecting studio design core beliefs     */
/* Extracted 1:1 from Homepage.fig (Section 5)                               */
/* ========================================================================= */
export default function Philosophy() {
  return (
    <section className="w-full bg-black py-[10vw] motion-blur-target">
      {/* Universal Container Margin: 12px (0.8333vw) */}
      <div className="w-full px-[0.8333vw]">
        <div className="w-full flex justify-between items-start">
          {/* Left Text Block: exact Figma width 701.625px (48.7243vw) */}
          <div className="w-[48.7243vw] shrink-0">
            <MaskedWordStagger className="w-full text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white space-y-[1.5278vw]">
              <p>
                Not every problem needs more complexity, and not every idea needs more to become meaningful. Sometimes, the most valuable decision is knowing what to keep, what to change, and what to leave behind.
              </p>
              <p>
                Our approach is rooted in clarity, thoughtful execution, and an appreciation for the details that make the whole.
              </p>
            </MaskedWordStagger>
          </div>

          {/* Right Brand Mark Logo: exact Figma width 89.05px (6.1838vw), flush with right margin */}
          <div className="w-[6.1838vw] shrink-0 self-start select-none">
            <NorqueCircleLogo className="w-full h-auto text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
