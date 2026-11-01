import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ========================================================================= */
/* UNIVERSAL MASKED LINE STAGGER COMPONENT                                   */
/* Automatically detects line breaks across text, paragraphs & inline links  */
/* Staggers line-by-line in sequential order across all paragraphs           */
/* Preserves inter-paragraph spacing (e.g. space-y-[1.5278vw])                */
/* Universal Motion Curve: [0, 0.8, 0.2, 1] | Delay: 0.2s | Stagger: 0.05s   */
/* ========================================================================= */

const lineVariants = {
  hidden: {
    y: '105%',
    opacity: 0,
  },
  visible: (custom = {}) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0, 0.8, 0.2, 1],
      delay: (custom.delay ?? 0.2) + (custom.index ?? 0) * (custom.stagger ?? 0.05),
    },
  }),
};

function tokenizeNode(node) {
  const tokens = [];

  function walk(child) {
    if (child == null || child === false) return;

    if (typeof child === 'string' || typeof child === 'number') {
      const str = String(child);
      const parts = str.split(/(\s+)/);
      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          tokens.push({ type: 'space', value: ' ' });
        } else {
          tokens.push({ type: 'word', value: part });
        }
      });
    } else if (React.isValidElement(child)) {
      if (child.type === 'br') {
        tokens.push({ type: 'br', value: child });
      } else {
        tokens.push({ type: 'element', value: child });
      }
    } else if (Array.isArray(child)) {
      child.forEach(walk);
    }
  }

  walk(node);
  return tokens;
}

export default function MaskedWordStagger({
  children,
  className = '',
  delay = 0.2,
  stagger = 0.1,
  amount = 0.15,
  as: Component = 'div',
}) {
  const containerRef = useRef(null);
  const [lineLayout, setLineLayout] = useState(null);

  // Normalize children into array of paragraphs
  const rawChildren = React.Children.toArray(children);
  const hasBlockParagraphs = rawChildren.some(
    (c) => React.isValidElement(c) && (c.type === 'p' || c.type === 'div')
  );

  // Extract spacing class (e.g. space-y-[1.5278vw]) or default for block paragraphs
  const spaceMatch = className.match(/\bspace-y-\S+/);
  const spaceClass = spaceMatch
    ? spaceMatch[0]
    : hasBlockParagraphs
    ? 'space-y-[1.5278vw]'
    : '';

  // Clean container className so space-y is applied directly to the paragraphs wrapper
  const containerClassName = spaceMatch
    ? className.replace(spaceMatch[0], '').trim()
    : className;

  const paragraphs = hasBlockParagraphs
    ? rawChildren
        .filter((c) => React.isValidElement(c))
        .map((c) => ({
          key: c.key,
          className: c.props.className || '',
          tokens: tokenizeNode(c.props.children),
        }))
    : [
        {
          key: 'p-0',
          className: '',
          tokens: tokenizeNode(children),
        },
      ];

  const measureLines = () => {
    if (!containerRef.current) return;

    const paragraphEls = containerRef.current.querySelectorAll('[data-p-idx]');
    if (!paragraphEls || paragraphEls.length === 0) return;

    let globalLineCount = 0;
    const computedParagraphs = [];

    paragraphEls.forEach((pEl, pIdx) => {
      const paragraphData = paragraphs[pIdx];
      if (!paragraphData) return;

      const tokenEls = Array.from(pEl.querySelectorAll('[data-t-idx], [data-t-br]'));
      const lines = [];
      let currentLine = [];
      let currentLineTop = null;

      tokenEls.forEach((el) => {
        if (el.hasAttribute('data-t-br')) {
          if (currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = [];
            currentLineTop = null;
          }
          return;
        }

        const tIdx = parseInt(el.getAttribute('data-t-idx'), 10);
        const top = Math.round(el.getBoundingClientRect().top);

        if (currentLineTop === null || Math.abs(top - currentLineTop) > 4) {
          if (currentLine.length > 0) {
            lines.push(currentLine);
          }
          currentLine = [tIdx];
          currentLineTop = top;
        } else {
          currentLine.push(tIdx);
        }
      });

      if (currentLine.length > 0) {
        lines.push(currentLine);
      }

      // Convert index arrays to token slice ranges
      const resolvedLines = lines.map((tokenIdxList) => {
        const start = tokenIdxList[0];
        const end = tokenIdxList[tokenIdxList.length - 1];
        const lineTokens = paragraphData.tokens.slice(start, end + 1);
        const lineGlobalIndex = globalLineCount++;
        return {
          globalIndex: lineGlobalIndex,
          tokens: lineTokens,
        };
      });

      computedParagraphs.push({
        key: paragraphData.key,
        className: paragraphData.className,
        lines: resolvedLines,
      });
    });

    setLineLayout(computedParagraphs);
  };

  useLayoutEffect(() => {
    measureLines();
    if (document.fonts) {
      document.fonts.ready.then(() => {
        measureLines();
      });
    }
  }, [children]);

  useEffect(() => {
    if (!containerRef.current) return;

    let lastWidth = containerRef.current.clientWidth;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (Math.abs(width - lastWidth) > 2) {
          lastWidth = width;
          measureLines();
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [paragraphs]);

  return (
    <Component className={`relative ${containerClassName}`}>
      <motion.div
        ref={containerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        className="w-full relative"
      >
        {/* Permanent hidden measurement DOM rendered with exact text metrics & spacing */}
        <div
          className={`opacity-0 pointer-events-none select-none absolute top-0 left-0 w-full ${spaceClass}`}
          aria-hidden="true"
        >
          {paragraphs.map((p, pIdx) => (
            <div key={p.key || pIdx} data-p-idx={pIdx} className={p.className}>
              {p.tokens.map((token, tIdx) => {
                if (token.type === 'space') {
                  return ' ';
                }
                if (token.type === 'br') {
                  return <br key={tIdx} data-t-br="true" />;
                }
                return (
                  <span key={tIdx} data-t-idx={tIdx} className="inline">
                    {token.value}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Active Line-by-Line Stagger DOM with inter-paragraph spacing */}
        {lineLayout && (
          <div className={spaceClass}>
            {lineLayout.map((p, pIdx) => (
              <div key={p.key || pIdx} className={p.className}>
                {p.lines.map((line) => (
                  <div
                    key={line.globalIndex}
                    className="overflow-hidden pb-[0.08em] -mb-[0.08em] block"
                  >
                    <motion.div
                      variants={lineVariants}
                      custom={{ index: line.globalIndex, delay, stagger }}
                      className="block whitespace-nowrap"
                    >
                      {line.tokens.map((token, i) => {
                        if (token.type === 'space') {
                          return ' ';
                        }
                        if (token.type === 'br') {
                          return null;
                        }
                        return (
                          <React.Fragment key={i}>
                            {token.value}
                          </React.Fragment>
                        );
                      })}
                    </motion.div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </Component>
  );
}

export { MaskedWordStagger as MaskedLineStagger };
