import React from 'react';
import InteractiveInfiniteCarousel from '../InteractiveInfiniteCarousel';
import doneByHumansVideo from '../../assets/about-news/content-01-done-by-humans.webm';
import btsTheStudioCollabVideo from '../../assets/about-news/content-02-bts-the-studio-collab.webm';
import btsEngineeredCodeVideo from '../../assets/about-news/content-03-bts-engineered-code.webm';
import socialMediaDevelopmentGif from '../../assets/about-news/content-04-social-media-development.gif';

/* ========================================================================= */
/* ABOUT NEWS SECTION                                                        */
/* "What happened lately" interactive infinite news carousel                 */
/* ========================================================================= */
const NEWS_ITEMS = [
  {
    
    src: btsEngineeredCodeVideo,
    isVideo: true,
    aspect: 'aspect-[345/438.2]',
    title: 'BTS — Engineered Code',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
  {
    src: btsTheStudioCollabVideo,
    isVideo: true,
    aspect: 'aspect-[345/540]',
    title: 'BTS — THE STUDIO Collab',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
  {
    src: socialMediaDevelopmentGif,
    isVideo: false,
    aspect: 'aspect-[345/423.9]',
    title: 'Social Media Development',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
  {
    src: doneByHumansVideo,
    isVideo: true,
    aspect: 'aspect-[345/540]',
    title: 'Done By Humans',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
];

export default function AboutNews() {
  return (
    <section className="w-full pt-[4.1667vw] pb-[6.9444vw] px-[0.8333vw]">
      <div className="w-full">
        {/* ─── 1. Header with Title & Subtitle ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-[3.4722vw] gap-4 motion-blur-target">
          <h2 className="text-[32px] sm:text-[3.1944vw] font-semibold text-white tracking-[-0.03em] leading-none select-none uppercase">
            WHAT HAPPENED LATELY
          </h2>
          <span className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/70 tracking-[-0.03em] select-none">
            Below you will find latest news
          </span>
        </div>

        {/* ─── 2. Interactive Infinite Loop Carousel ─── */}
        <InteractiveInfiniteCarousel
          items={NEWS_ITEMS}
          gapClass="gap-[0.8333vw]"
          paddingRightClass="pr-[0.8333vw]"
          speed={-0.75}
          interactive={false}
          renderItem={(item) => (
            <article 
              className="w-[280px] sm:w-[23.9583vw] shrink-0 flex flex-col pointer-events-none select-none"
            >
              {/* Media Card */}
              <div className={`w-full ${item.aspect} rounded-[4px] overflow-hidden mb-[0.6944vw] bg-[#121214]`}>
                {item.isVideo ? (
                  <video 
                    src={item.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.play().catch(() => {});
                      }
                    }}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    draggable={false}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Text Info */}
              <div className="flex flex-col space-y-[0.3472vw] select-none pointer-events-none motion-blur-target">
                <h3 className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] leading-normal line-clamp-3">
                  {item.description}
                </p>
              </div>
            </article>
          )}
        />
      </div>
    </section>
  );
}
