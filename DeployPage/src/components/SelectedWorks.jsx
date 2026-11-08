import React, { useState, useMemo } from 'react';
import { useWorksData } from '../data/worksStore';

/* ========================================================================= */
/* SELECTED WORKS COMPONENT                                                  */
/* 2-column showcase grid synchronized with Works CMS database               */
/* Matches the visual card styling of the Works portfolio page               */
/* ========================================================================= */

export default function SelectedWorks({ onNavigate }) {
  const { works } = useWorksData();
  const [hoveredId, setHoveredId] = useState(null);

  /* ─── Projects selected in CMS for the Homepage showcase ─── */
  const selectedProjects = useMemo(() => {
    const featured = works.filter((p) => p.selectedWork);
    return featured.length > 0 ? featured : works.slice(0, 4);
  }, [works]);

  const countFormatted = selectedProjects.length < 10 
    ? `0${selectedProjects.length}` 
    : `${selectedProjects.length}`;

  const handleProjectClick = (project) => {
    if (!onNavigate) return;
    const id = (project.id || '').toLowerCase();
    const title = (project.title || '').toLowerCase();
    if (id.includes('mms') || title.includes('mms')) {
      onNavigate('project-mms');
    } else if (id.includes('axis') || title.includes('axis')) {
      onNavigate('project-axis');
    } else if (id.includes('stephenson') || title.includes('stephenson')) {
      onNavigate('project-stephenson');
    } else if (id.includes('fusion') || title.includes('fusion')) {
      onNavigate('project-fusion-form');
    } else if (project.link && project.link !== '#') {
      window.open(project.link, '_blank');
    } else {
      onNavigate('works');
    }
  };

  return (
    <section id="works" className="w-full bg-black py-[2.7778vw]">
      {/* Universal Container Margin: 12px (0.8333vw) */}
      <div className="w-full px-[0.8333vw]">
        {/* Section Heading */}
        <h2 className="text-[3.1944vw] font-medium tracking-[-0.03em] leading-none text-white mb-[1.6667vw] flex items-start motion-blur-target">
          <span>SELECTED WORKS</span>
          <span className="text-[1.3889vw] font-medium ml-[0.35vw] leading-none tracking-[-0.03em] select-none">
            ({countFormatted})
          </span>
        </h2>

        {/* 2-Column Responsive Portfolio Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.8333vw] gap-y-[2.5vw]"
          onMouseLeave={() => setHoveredId(null)}
        >
          {selectedProjects.map((project) => {
            const isOtherHovered = hoveredId !== null && hoveredId !== project.id;
            return (
              <article 
                key={project.id || project.title} 
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer select-none"
              >
                {/* Media Card (345x230 ratio = 1.5 aspect, rounded-[2px], matching Works Page) */}
                <div className="relative w-full aspect-[345/230] rounded-[2px] overflow-hidden bg-[#111111] border border-white/5">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-[filter,opacity] duration-500 will-change-[filter,opacity] ${
                      isOtherHovered 
                        ? 'blur-[2px] opacity-100 scale-100' 
                        : 'blur-0 opacity-100 scale-100 group-hover:scale-[1]'
                    }`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = '/images/works/studio-juzenas.png';
                    }}
                  />

                  {/* Optional Status Badge (e.g. "IN THE WORKS" / "AWARDED") */}
                  {project.badge && (
                    <div 
                      className="absolute top-[0.55vw] right-[0.55vw] rounded-[2px] px-[0.55vw] py-[0.2vw] flex items-center justify-center select-none shadow-md z-10"
                      style={{ backgroundColor: project.badgeBg || '#171717' }}
                    >
                      <span className="text-[0.5556vw] font-bold tracking-[-0.03em] text-white uppercase leading-none">
                        {project.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Meta Details (Matching Works Page typography & layout) */}
                <div className="w-full mt-[0.625vw] flex items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-[0.6944vw] font-semibold tracking-[-0.03em] uppercase text-white leading-tight">
                      {project.title}
                    </h3>
                    {(project.selectedCategory || project.subtitle || project.category) && (
                      <p className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] leading-tight mt-[0.1vw]">
                        {project.selectedCategory || project.subtitle || project.category}
                      </p>
                    )}
                  </div>
                  <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] uppercase text-white leading-tight text-right">
                    {project.location}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* ─── CTA: Discover more projects! ─── */}
        <div className="w-full mt-[3.2639vw] flex flex-col items-center text-center select-none">
          {/* CTA Heading */}
          <h3 className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-none text-white motion-blur-target">
            Discover more projects!
          </h3>

          {/* CTA Link Button */}
          <a
            href="https://www.behance.net/norquestudios/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-[1.1111vw] inline-flex items-center gap-x-[0.2778vw] text-[0.6944vw] font-semibold tracking-[-0.03em] text-white hover:opacity-70 transition-opacity"
          >
            <span className="underline underline-offset-[0.2083vw] decoration-white">
              Discover more
            </span>
            {/* 45-degree arrow vector */}
            <svg 
              className="w-[0.4879vw] h-[0.4879vw] text-white transition-transform duration-300 group-hover:translate-x-[0.1vw] group-hover:-translate-y-[0.1vw]" 
              viewBox="0 0 10 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M1 9L9 1M9 1H2M9 1V8" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
