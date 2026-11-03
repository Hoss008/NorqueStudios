import React from 'react';
import projectAxis from '../assets/project-axis.png';
import projectFusionForm from '../assets/project-fusion-form.png';
import projectStudioJuzenas from '../assets/project-studio-juzenas.png';
import projectMms from '../assets/project-mms.png';

/* ========================================================================= */
/* SELECTED WORKS COMPONENT                                                  */
/* 2-column showcase grid presenting primary studio case studies             */
/* ========================================================================= */
const projects = [
  {
    id: 'axis',
    title: 'AXIS® - Real Estate Consultancy',
    location: 'Egypt',
    category: 'Brand Development',
    image: projectAxis,
  },
  {
    id: 'fusion-form',
    title: 'Fusion Form® - Architecture Development',
    location: 'Egypt',
    category: 'UI/UX Design & Web Development',
    image: projectFusionForm,
  },
  {
    id: 'studio-juzenas',
    title: 'STUDIO JUZĖNAS® - Architecture Studio',
    location: 'Lithuania',
    category: 'Brand Development | UI/UX Design & Web Development',
    image: projectStudioJuzenas,
  },
  {
    id: 'mms-architects',
    title: 'MMS ARCHITECTS™',
    location: 'Egypt',
    category: 'Brand Development',
    image: projectMms,
  },
];

export default function SelectedWorks() {
  return (
    <section id="works" className="w-full bg-black py-[2.7778vw]">
      {/* Universal Container Margin: 12px (0.8333vw) */}
      <div className="w-full px-[0.8333vw]">
        {/* Section Heading */}
        <h2 className="text-[3.1944vw] font-medium tracking-[-0.03em] leading-none text-white mb-[1.6667vw] flex items-start motion-blur-target">
          <span>SELECTED WORKS</span>
          <span className="text-[1.3889vw] font-medium ml-[0.35vw] leading-none tracking-[-0.03em] select-none">(04)</span>
        </h2>

        {/* 2-Column Responsive Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[0.8333vw] gap-y-[2.5vw]">
          {projects.map((project) => (
            <article key={project.id} className="group cursor-pointer">
              {/* Media Card */}
              <div className="w-full overflow-hidden rounded-[0.1389vw] bg-[#121212]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full aspect-[702/434] object-cover rounded-[0.1389vw] transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  loading="lazy"
                />
              </div>

              {/* Project Meta Details */}
              <div className="pt-[0.6944vw] motion-blur-target">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none vertical-trim">
                    {project.title}
                  </h3>
                  <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-none vertical-trim">
                    {project.location}
                  </span>
                </div>
                <p className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] pt-[0.5vw] leading-none vertical-trim">
                  {project.category}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ─── CTA: Discover more projects! ─── */}
        <div className="w-full mt-[3.2639vw] flex flex-col items-center text-center select-none">
          {/* CTA Heading */}
          <h3 className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-none text-white motion-blur-target">
            Discover more projects!
          </h3>

          {/* CTA Link Button */}
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-[1.1111vw] inline-flex items-center gap-x-[0.2778vw] text-[0.6944vw] font-semibold tracking-[-0.03em] text-white hover:opacity-70 transition-opacity"
          >
            <span className="underline underline-offset-[0.2083vw] decoration-white">
              Discover more
            </span>
            {/* 7.025px x 7.025px diagonal up-right arrow extracted from Homepage.fig */}
            <svg 
              viewBox="0 0 7.03 7.03" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[0.4879vw] h-[0.4879vw] shrink-0 text-white transition-transform duration-300 group-hover:translate-x-[0.0694vw] group-hover:-translate-y-[0.0694vw]"
            >
              <path 
                d="M0 6.17L4.97 1.2L1.06 1.2L1.06 0L7.03 0L7.03 5.96L5.82 5.96L5.82 2.05L0.85 7.03L0 6.17Z" 
                fill="currentColor" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
