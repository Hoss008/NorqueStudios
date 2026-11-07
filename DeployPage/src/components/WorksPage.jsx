import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorksData } from '../data/worksStore';

/* ========================================================================= */
/* WORKS PAGE VIEW COMPONENT                                                 */
/* 1:1 conversion of 'References/Works Page.fig'                             */
/* Fixed single viewport dashboard loaded from local JSON database          */
/* Zero page scroll room strictly enforced                                   */
/* ========================================================================= */

export default function WorksPage({ onNavigate, onOpenCMS }) {
  const { works } = useWorksData();

  /* ─── Dynamic Categories derived from JSON database ─── */
  const categories = useMemo(() => {
    const set = new Set();
    works.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [works]);

  /* ─── State Management ─── */
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('SLIDER'); // 'SLIDER' | 'LIST'
  const [sliderX, setSliderX] = useState(0);
  const [hoveredListProject, setHoveredListProject] = useState(null);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  /* ─── Prevent all document / window scrolling strictly ─── */
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  /* ─── Filtered projects ─── */
  const filteredProjects = useMemo(() => {
    return works.filter((p) => {
      if (activeCategory === 'All') return true;
      return p.category?.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [works, activeCategory]);

  /* ─── Project Navigation Handler ─── */
  const handleProjectClick = (project) => {
    if (!onNavigate) return;
    const id = (project.id || '').toLowerCase();
    const title = (project.title || '').toLowerCase();
    if (id.includes('mms') || title.includes('mms')) {
      onNavigate('project-mms');
    } else if (id.includes('axis') || title.includes('axis')) {
      onNavigate('project-axis');
    }
  };

  /* ─── Calculate Drag & Scroll Bounds ─── */
  const [maxDrag, setMaxDrag] = useState(0);

  const updateBounds = () => {
    if (!trackRef.current || !containerRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const containerWidth = containerRef.current.clientWidth;
    const overflow = Math.max(0, trackWidth - containerWidth);
    setMaxDrag(overflow);
    setSliderX((prev) => Math.max(-overflow, Math.min(0, prev)));
  };

  useEffect(() => {
    updateBounds();
    const handleResize = () => updateBounds();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filteredProjects, viewMode]);

  /* ─── Reset / Clamp slider on category change ─── */
  useEffect(() => {
    setSliderX(0);
  }, [activeCategory]);

  /* ─── Horizontal Wheel / Trackpad Handling (Global across entire page) ─── */
  const maxDragRef = useRef(0);
  maxDragRef.current = maxDrag;

  useEffect(() => {
    if (viewMode !== 'SLIDER') return;

    const handleWheel = (e) => {
      // Prevent default page scrolling gestures
      e.preventDefault();

      // Prioritize horizontal delta if available, otherwise translate vertical scroll to horizontal
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      setSliderX((prev) => {
        const next = prev - delta * 0.9;
        return Math.max(-maxDragRef.current, Math.min(0, next));
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [viewMode]);

  return (
    <div 
      className="w-full h-screen h-[100dvh] overflow-hidden bg-black text-white font-beausite selection:bg-white selection:text-black flex flex-col justify-between relative select-none"
      style={{ touchAction: 'none' }}
    >
      {/* ─── Top Spacer for pinned Navbar (2.5vw = 36px) ─── */}
      <div className="w-full h-[2.5vw] flex-shrink-0" aria-hidden="true" />

      {/* ─── Main Content Container (Padded to 12px / 0.8333vw horizontal grid) ─── */}
      <div className="w-full flex-1 flex flex-col justify-between px-[0.8333vw] pt-[1.8vw] pb-[3.5vw] overflow-hidden">
        
        {/* ─── Header Section (Title + Controls Bar) ─── */}
        <div className="w-full flex-shrink-0">
          
          {/* Section 3: Big "WORKS" Header (Beausite Classic Semibold, 46px = 3.1944vw, tracking -3%) */}
          <div className="w-full mb-[2.5vw]">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0, 0.8, 0.2, 1] }}
              className="text-[3.1944vw] font-semibold tracking-[-0.03em] leading-none text-white select-none uppercase"
            >
              WORKS
            </motion.h1>
          </div>

          {/* Section 2: Controls Bar (Category Filters + Toggle Btns + Scroll Hint) */}
          <div className="w-full flex items-center justify-between border-b border-transparent pb-[0.5vw]">
            
            {/* Left Controls: Category Tabs + Pill Toggle */}
            <div className="flex items-center space-x-[1.8vw]">
              
              {/* Category Filter Tabs */}
              <div className="flex items-center space-x-[0.8333vw]">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`relative text-[1.5278vw] font-semibold tracking-[-0.03em] leading-tight transition-colors duration-200 cursor-pointer ${
                        isActive ? 'text-white' : 'text-[#6f6f6f] hover:text-white/80'
                      }`}
                    >
                      <span>{cat}</span>
                      {/* Active Underline matching Figma */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryUnderline"
                          className="absolute -bottom-[2px] left-0 right-0 h-[1.5px] bg-white"
                          transition={{ duration: 0.25, ease: [0, 0.8, 0.2, 1] }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* View Toggle Buttons ("LIST" | "SLIDER") */}
              <div className="flex items-center bg-transparent pl-[0.4vw]">
                <div className="inline-flex items-center p-[2px] rounded-full bg-transparent space-x-[0.35vw]">
                  {/* LIST Button */}
                  <button
                    type="button"
                    onClick={() => setViewMode('LIST')}
                    className={`h-[1.11vw] px-[0.65vw] rounded-full text-[0.5556vw] font-bold tracking-[-0.03em] uppercase flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      viewMode === 'LIST'
                        ? 'bg-white text-black'
                        : 'bg-[#171717] text-[#6f6f6f] hover:text-white'
                    }`}
                  >
                    LIST
                  </button>

                  {/* SLIDER Button */}
                  <button
                    type="button"
                    onClick={() => setViewMode('SLIDER')}
                    className={`h-[1.11vw] px-[0.75vw] rounded-full text-[0.5556vw] font-bold tracking-[-0.03em] uppercase flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      viewMode === 'SLIDER'
                        ? 'bg-white text-black'
                        : 'bg-[#171717] text-[#6f6f6f] hover:text-white'
                    }`}
                  >
                    SLIDER
                  </button>
                </div>
              </div>

            </div>

            {/* Right Hint: "SCROLL TO SEE MORE" & CMS Access */}
            <div className="flex items-center justify-end space-x-[1vw]">
              <span className="text-[0.5556vw] font-semibold tracking-[-0.03em] text-white select-none uppercase">
                {viewMode === 'SLIDER' 
                  ? (maxDrag > 10 ? 'SCROLL TO SEE MORE' : `${filteredProjects.length} PROJECTS`)
                  : `${filteredProjects.length} PROJECTS`
                }
              </span>
            </div>

          </div>

        </div>

        {/* ─── Center / Bottom Content Area: SLIDER or LIST View ─── */}
        <div className="w-full flex-1 flex flex-col justify-end mt-[2vw]">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: HORIZONTAL PROJECTS SLIDER */}
            {viewMode === 'SLIDER' && (
              <motion.div
                key="slider-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: [0, 0.8, 0.2, 1] }}
                ref={containerRef}
                className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-[0.5vw]"
              >
                <motion.div
                  ref={trackRef}
                  className="flex space-x-[0.8333vw] will-change-transform"
                  drag="x"
                  dragConstraints={{ left: -maxDrag, right: 0 }}
                  dragElastic={0.06}
                  animate={{ x: sliderX }}
                  onDragEnd={(e, { offset }) => {
                    setSliderX((prev) => Math.max(-maxDrag, Math.min(0, prev + offset.x)));
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 38 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={`${activeCategory}-${project.id}`}
                      onClick={() => handleProjectClick(project)}
                      className="flex-shrink-0 w-[23.9583vw] group select-none cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.06, 
                        ease: [0, 0.8, 0.2, 1] 
                      }}
                    >
                      {/* Project Image Card (345x230 ratio = 1.5 aspect, rounded-[2px]) */}
                      <div className="relative w-full aspect-[345/230] rounded-[2px] overflow-hidden bg-[#111111] border border-white/5">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover  group-hover:scale-[1]"
                          loading="eager"
                          draggable={false}
                        />

                        {/* Optional Status Badge (e.g. "IN THE WORKS" / "AWARDED") */}
                        {project.badge && (
                          <div 
                            className="absolute top-[0.55vw] right-[0.55vw] rounded-[2px] px-[0.55vw] py-[0.2vw] flex items-center justify-center select-none shadow-md"
                            style={{ backgroundColor: project.badgeBg || '#171717' }}
                          >
                            <span className="text-[0.5556vw] font-bold tracking-[-0.03em] text-white uppercase leading-none">
                              {project.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Meta Footer (10px = 0.6944vw Semibold, left: title, right: location) */}
                      <div className="w-full mt-[0.625vw] flex items-start justify-between">
                        <div className="flex flex-col">
                          <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] uppercase text-white leading-tight">
                            {project.title}
                          </span>
                          {project.subtitle && (
                            <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] leading-tight mt-[0.1vw]">
                              {project.subtitle}
                            </span>
                          )}
                        </div>
                        <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] uppercase text-white leading-tight text-right flex-shrink-0 ml-[1vw]">
                          {project.location}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* VIEW 2: FULL-WIDTH CLEAN LIST VIEW */}
            {viewMode === 'LIST' && (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: [0, 0.8, 0.2, 1] }}
                className="w-full flex flex-col justify-end pb-[1vw]"
              >
                {/* List Table Header */}
                <div className="w-full grid grid-cols-12 text-[0.5556vw] font-semibold tracking-[-0.03em] text-[#6f6f6f] uppercase pb-[0.6vw] border-b border-white/10 select-none">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">PROJECT</div>
                  <div className="col-span-3">CATEGORY</div>
                  <div className="col-span-2">LOCATION</div>
                  <div className="col-span-1 text-right">YEAR</div>
                </div>

                {/* List Rows */}
                <div className="w-full divide-y divide-white/5">
                  {filteredProjects.map((project, idx) => (
                    <motion.div
                      key={`${activeCategory}-${project.id}`}
                      onClick={() => handleProjectClick(project)}
                      onMouseEnter={() => setHoveredListProject(project)}
                      onMouseLeave={() => setHoveredListProject(null)}
                      className="group w-full grid grid-cols-12 items-center py-[0.9vw] transition-colors duration-200 hover:bg-white/[0.02] cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                    >
                      {/* Column 1: Index Number */}
                      <div className="col-span-1 text-[0.6944vw] font-mono text-[#6f6f6f] group-hover:text-white transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      {/* Column 2: Title & Badges */}
                      <div className="col-span-5 flex items-center space-x-[0.8vw]">
                        <span className="text-[0.9722vw] font-semibold tracking-[-0.03em] uppercase text-white group-hover:translate-x-[0.3vw] transition-transform duration-200">
                          {project.title}
                        </span>
                        {project.badge && (
                          <span 
                            className="text-[0.4861vw] font-bold tracking-[-0.03em] uppercase px-[0.4vw] py-[0.1vw] rounded-[2px] text-white"
                            style={{ backgroundColor: project.badgeBg || '#171717' }}
                          >
                            {project.badge}
                          </span>
                        )}
                        {project.subtitle && (
                          <span className="text-[0.6944vw] font-normal text-[#747474] tracking-[-0.03em]">
                            ({project.subtitle})
                          </span>
                        )}
                      </div>

                      {/* Column 3: Category */}
                      <div className="col-span-3 text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#6f6f6f] group-hover:text-white transition-colors">
                        {project.category}
                      </div>

                      {/* Column 4: Location */}
                      <div className="col-span-2 text-[0.6944vw] font-semibold tracking-[-0.03em] uppercase text-[#6f6f6f] group-hover:text-white transition-colors">
                        {project.location}
                      </div>

                      {/* Column 5: Year */}
                      <div className="col-span-1 text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#6f6f6f] group-hover:text-white transition-colors text-right">
                        {project.year}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Floating Hover Thumbnail for List View */}
      <AnimatePresence>
        {viewMode === 'LIST' && hoveredListProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-30 bottom-[6vw] right-[3vw] w-[16vw] aspect-[345/230] rounded-[4px] overflow-hidden border border-white/20 shadow-2xl bg-black"
          >
            <img 
              src={hoveredListProject.image} 
              alt={hoveredListProject.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
