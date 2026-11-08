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
    description: 'We make sure the code is just as good as the design. Every build is shaped around the brand\'s look and feel, with a focus on keeping things fast, smooth, and consistent across every platform. No unnecessary stuff, just a website that looks good and works even better.',
  },
  {
    src: btsTheStudioCollabVideo,
    isVideo: true,
    aspect: 'aspect-[345/540]',
    title: 'BTS — THE STUDIO Collab',
    description: (
      <>
        We teamed up with{' '}
        <a
          href="https://www.instagram.com/the.studio_eg/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline u text-white/70 hover:text-white/50 transition-colors duration-200 pointer-events-auto cursor-pointer"
        >
          THE STUDIO
        </a>
        , a photography and videography studio that knows how to bring ideas to life. Together, we worked on a campaign for AXIS - RE, bringing the creative direction to the screen through some great visuals.
      </>
    ),
  },
  {
    src: socialMediaDevelopmentGif,
    isVideo: false,
    aspect: 'aspect-[345/423.9]',
    title: 'Social Media Development',
    description: (
      <>
        Developed a creative direction for MMS ARCHITECTS social media that goes beyond just showing finished projects. The idea was to bring their design thinking to life, giving them room to share concepts, showcase their work, and offer useful tips and insights on interior and exterior design.{' '}
        <br />
        <a
          href="https://www.instagram.com/mmsarchitects/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline u text-white/70 hover:text-white/50 transition-colors duration-200 pointer-events-auto cursor-pointer"
        >
          Click here to explore MMS on Instagram.
        </a>
      </>
    ),
  },
  {
    src: doneByHumansVideo,
    isVideo: true,
    aspect: 'aspect-[345/540]',
    title: 'Done By Humans',
    description: 'No shortcuts, no copy-paste thinking, no letting AI do all the talking. Just real people, putting real thought into every detail. From the first idea to the final pixel, everything is made with intention, curiosity, and a little bit of obsession. Because good work should have a human touch, always.',
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
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] leading-[1.2] line-clamp-6">
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
