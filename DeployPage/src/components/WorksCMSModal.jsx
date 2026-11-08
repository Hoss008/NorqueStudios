import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorksData, compressImage } from '../data/worksStore';

/* ========================================================================= */
/* WORKS PORTFOLIO CMS MODAL COMPONENT                                      */
/* Interactive manager to add, edit, drop, and reorder Works page projects   */
/* ========================================================================= */

const PRESET_BADGE_COLORS = [
  { label: 'Dark (#171717)', value: '#171717' },
  { label: 'Amber Gold (#a87f2f)', value: '#a87f2f' },
  { label: 'Pure White (#ffffff)', value: '#ffffff' },
  { label: 'Crimson (#991b1b)', value: '#991b1b' },
  { label: 'Emerald (#065f46)', value: '#065f46' },
];

export default function WorksCMSModal({ isOpen, onClose, onNavigate, onLogout }) {
  const { 
    works, 
    addProject, 
    updateProject, 
    deleteProject, 
    reorderProjects, 
    exportWorksJSON 
  } = useWorksData();

  const [activeFormMode, setActiveFormMode] = useState(null); // null | 'ADD' | 'EDIT'
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Change Password Modal State
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [passError, setPassError] = useState(null);

  const handleSavePassword = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem('norque_admin_password') || 'norque2026';
    if (currentPassInput !== stored) {
      setPassError('Current password is incorrect.');
      return;
    }
    if (newPassInput.trim().length < 4) {
      setPassError('New password must be at least 4 characters.');
      return;
    }
    localStorage.setItem('norque_admin_password', newPassInput.trim());
    setIsChangePassOpen(false);
    setCurrentPassInput('');
    setNewPassInput('');
    setPassError(null);
    showToast('Admin password successfully updated');
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'Branding',
    selectedCategory: '',
    image: '',
    badge: '',
    badgeBg: '#171717',
    subtitle: '',
    year: '2025',
    link: '#',
    selectedWork: false
  });

  const fileInputRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeFormMode) {
          setActiveFormMode(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeFormMode, onClose]);

  // Toast Notification Helper
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  // Open Form for Adding New Project
  const handleOpenAdd = () => {
    setFormData({
      title: '',
      location: '',
      category: 'Branding',
      selectedCategory: '',
      image: '',
      badge: '',
      badgeBg: '#171717',
      subtitle: '',
      year: new Date().getFullYear().toString(),
      link: '#',
      selectedWork: false
    });
    setEditingProjectId(null);
    setActiveFormMode('ADD');
  };

  // Open Form for Editing an Existing Project
  const handleOpenEdit = (project) => {
    const isWeb = (project.category || '').toLowerCase().includes('web');
    setFormData({
      title: project.title || '',
      location: project.location || '',
      category: isWeb ? 'Websites' : 'Branding',
      selectedCategory: project.selectedCategory || '',
      image: project.image || '',
      badge: project.badge || '',
      badgeBg: project.badgeBg || '#171717',
      subtitle: project.subtitle || '',
      year: project.year || '2025',
      link: project.link || '#',
      selectedWork: Boolean(project.selectedWork)
    });
    setEditingProjectId(project.id);
    setActiveFormMode('EDIT');
  };

  // Handle Image Upload / Drag-and-drop with auto compression
  const handleImageFileChange = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      showToast('Optimizing image...');
      const compressedDataUrl = await compressImage(file);
      setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
      showToast('Image loaded successfully');
    } catch (err) {
      console.error('Image compression failed, using standard reader:', err);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
        showToast('Image loaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Submission (Add or Update)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const projectPayload = {
      title: formData.title.trim(),
      location: formData.location.trim() || 'Worldwide',
      category: formData.category === 'Websites' ? 'Websites' : 'Branding',
      selectedCategory: formData.selectedCategory.trim() ? formData.selectedCategory.trim() : null,
      image: formData.image || '/images/works/studio-juzenas.png',
      badge: formData.badge.trim() ? formData.badge.trim() : null,
      badgeBg: formData.badge.trim() ? formData.badgeBg : null,
      subtitle: formData.subtitle.trim() ? formData.subtitle.trim() : null,
      year: formData.year.trim() || '2025',
      link: formData.link.trim() || '#',
      selectedWork: Boolean(formData.selectedWork)
    };

    if (activeFormMode === 'ADD') {
      addProject(projectPayload);
      showToast(`Added "${projectPayload.title}" to Works portfolio`);
    } else if (activeFormMode === 'EDIT' && editingProjectId) {
      updateProject(editingProjectId, projectPayload);
      showToast(`Updated "${projectPayload.title}"`);
    }

    setActiveFormMode(null);
  };

  // Handle Project Drop / Deletion
  const handleDelete = (project) => {
    if (window.confirm(`Are you sure you want to drop "${project.title}" from the Works page?`)) {
      deleteProject(project.id);
      showToast(`Dropped "${project.title}" from Works portfolio`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-[1.5vw] bg-black/80 backdrop-blur-md font-beausite"
        style={{ touchAction: 'auto' }}
        onWheel={(e) => e.stopPropagation()}
      >
        
        {/* Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[2vw] z-50 px-[1.2vw] py-[0.6vw] bg-white text-black font-semibold text-[0.6944vw] rounded-[2px] shadow-2xl tracking-[-0.03em] uppercase flex items-center space-x-[0.5vw]"
            >
              <span>✓</span>
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Window Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.3, ease: [0, 0.8, 0.2, 1] }}
          className="relative w-full max-w-[75vw] max-h-[90vh] bg-[#0c0c0c] border border-white/10 rounded-[6px] shadow-2xl flex flex-col overflow-hidden text-white"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* ─── Header Bar ─── */}
          <div className="px-[1.8vw] py-[1.2vw] border-b border-white/10 flex items-center justify-between bg-black/50 flex-shrink-0">
            <div className="flex items-center space-x-[1vw]">
              <span className="text-[0.625vw] font-bold tracking-widest text-[#a87f2f] uppercase border border-[#a87f2f]/30 px-[0.4vw] py-[0.1vw] rounded-[2px]">
                STUDIO CMS
              </span>
              <div>
                <h2 className="text-[1.25vw] font-semibold tracking-[-0.03em] uppercase text-white leading-tight">
                  Works Portfolio Manager
                </h2>
                <p className="text-[0.5556vw] text-[#797979] tracking-normal">
                  Add, drop, or reorder projects displayed on the standalone Works page.
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center space-x-[0.8vw]">
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('works');
                  }}
                  className="px-[0.85vw] py-[0.45vw] bg-[#a87f2f] hover:bg-[#c2953a] text-black text-[0.625vw] font-bold tracking-[-0.03em] uppercase rounded-[2px] transition-all flex items-center space-x-[0.3vw] cursor-pointer shadow-md"
                >
                  <span>Go to Works Page →</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleOpenAdd}
                className="px-[0.9vw] py-[0.45vw] bg-white text-black hover:bg-white/90 text-[0.625vw] font-bold tracking-[-0.03em] uppercase rounded-[2px] transition-all flex items-center space-x-[0.3vw] cursor-pointer shadow-md"
              >
                <span>+</span>
                <span>New Project</span>
              </button>

              <button
                type="button"
                onClick={exportWorksJSON}
                title="Download current database as works.json"
                className="px-[0.8vw] py-[0.45vw] bg-[#171717] hover:bg-[#252525] text-white/90 text-[0.625vw] font-semibold tracking-[-0.03em] uppercase rounded-[2px] border border-white/10 transition-colors cursor-pointer"
              >
                Export JSON
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsChangePassOpen(true);
                  setPassError(null);
                  setCurrentPassInput('');
                  setNewPassInput('');
                }}
                title="Change administrator password"
                className="px-[0.8vw] py-[0.45vw] bg-[#171717] hover:bg-[#252525] text-[#888888] hover:text-white text-[0.625vw] font-semibold tracking-[-0.03em] uppercase rounded-[2px] border border-white/10 transition-colors cursor-pointer"
              >
                Password
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Lock CMS and log out"
                  className="px-[0.8vw] py-[0.45vw] bg-[#171717] hover:bg-red-950/40 text-[#888888] hover:text-red-400 text-[0.625vw] font-semibold tracking-[-0.03em] uppercase rounded-[2px] border border-white/10 transition-colors cursor-pointer"
                >
                  Lock
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-[2vw] h-[2vw] flex items-center justify-center rounded-[2px] bg-[#171717] hover:bg-[#262626] text-white/70 hover:text-white text-[0.8vw] transition-colors cursor-pointer"
                aria-label="Close CMS Modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Change Password Dialog Overlay */}
          <AnimatePresence>
            {isChangePassOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
                style={{ touchAction: 'auto' }}
                onWheel={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                  className="w-full max-w-sm bg-[#121212] border border-white/10 rounded-[6px] p-6 shadow-2xl space-y-4 text-white"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h3 className="text-sm font-semibold tracking-[-0.02em] uppercase text-white">
                      Change Admin Password
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsChangePassOpen(false)}
                      className="text-[#888] hover:text-white text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSavePassword} className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#888] block mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassInput}
                        onChange={(e) => setCurrentPassInput(e.target.value)}
                        placeholder="Current password"
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 focus:border-[#a87f2f] text-xs font-mono text-white rounded outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#888] block mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassInput}
                        onChange={(e) => setNewPassInput(e.target.value)}
                        placeholder="Minimum 4 characters"
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 focus:border-[#a87f2f] text-xs font-mono text-white rounded outline-none"
                        required
                      />
                    </div>

                    {passError && (
                      <p className="text-red-400 text-[11px] font-medium">
                        {passError}
                      </p>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase rounded cursor-pointer transition-colors"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsChangePassOpen(false)}
                        className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] text-[#aaa] hover:text-white text-xs font-bold uppercase rounded cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Main Content Area ─── */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain p-[1.8vw] space-y-[1.5vw]"
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: 'rgba(255,255,255,0.2) transparent',
              WebkitOverflowScrolling: 'touch'
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            
            {/* Table / Project Cards List */}
            <div className="w-full">
              <div className="flex items-center justify-between pb-[0.8vw] border-b border-white/10 text-[0.5556vw] font-semibold tracking-[-0.03em] text-[#6f6f6f] uppercase">
                <div className="w-[4%]">#</div>
                <div className="w-[11%]">PREVIEW</div>
                <div className="w-[24%]">PROJECT TITLE & SUBTITLE</div>
                <div className="w-[13%]">CATEGORY</div>
                <div className="w-[11%]">LOCATION</div>
                <div className="w-[11%]">BADGE / STATUS</div>
                <div className="w-[13%] text-center">SELECTED WORKS</div>
                <div className="w-[13%] text-right">ACTIONS</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {works.length === 0 ? (
                  <div className="py-[4vw] text-center text-[#747474] text-[0.8vw]">
                    No projects found in the Works database. Click "+ New Project" above to add one.
                  </div>
                ) : (
                  works.map((project, index) => (
                    <div 
                      key={project.id || index}
                      className="py-[0.8vw] flex items-center justify-between group hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Index & Reorder Controls */}
                      <div className="w-[4%] flex items-center space-x-[0.3vw]">
                        <span className="text-[0.625vw] font-mono text-[#6f6f6f]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col space-y-[2px]">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => reorderProjects(index, index - 1)}
                            className="text-[0.45vw] text-white/40 hover:text-white disabled:opacity-10 cursor-pointer disabled:cursor-not-allowed leading-none"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={index === works.length - 1}
                            onClick={() => reorderProjects(index, index + 1)}
                            className="text-[0.45vw] text-white/40 hover:text-white disabled:opacity-10 cursor-pointer disabled:cursor-not-allowed leading-none"
                            title="Move Down"
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      {/* Preview Image */}
                      <div className="w-[11%] pr-[1vw]">
                        <div className="w-full aspect-[345/230] rounded-[2px] overflow-hidden bg-[#1a1a1a] border border-white/10 relative">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/works/studio-juzenas.png';
                            }}
                          />
                        </div>
                      </div>

                      {/* Project Title & Subtitle */}
                      <div className="w-[24%] pr-[1vw]">
                        <span className="text-[0.7639vw] font-semibold tracking-[-0.03em] uppercase text-white block truncate">
                          {project.title}
                        </span>
                        {project.subtitle && (
                          <span className="text-[0.625vw] text-[#747474] tracking-[-0.03em] block truncate">
                            {project.subtitle}
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <div className="w-[13%]">
                        <span className="text-[0.625vw] font-semibold tracking-[-0.03em] text-[#a0a0a0] px-[0.5vw] py-[0.15vw] rounded-[2px] bg-[#171717] border border-white/5">
                          {project.category}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="w-[11%]">
                        <span className="text-[0.625vw] font-semibold tracking-[-0.03em] uppercase text-[#a0a0a0]">
                          {project.location}
                        </span>
                      </div>

                      {/* Badge / Status */}
                      <div className="w-[11%]">
                        {project.badge ? (
                          <span 
                            className="text-[0.5vw] font-bold tracking-[-0.03em] uppercase px-[0.4vw] py-[0.1vw] rounded-[2px] text-white shadow-sm inline-block"
                            style={{ backgroundColor: project.badgeBg || '#171717' }}
                          >
                            {project.badge}
                          </span>
                        ) : (
                          <span className="text-[0.55vw] text-[#555555]">—</span>
                        )}
                      </div>

                      {/* Selected Works (Homepage) Toggle */}
                      <div className="w-[13%] flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !project.selectedWork;
                            updateProject(project.id, { selectedWork: nextState });
                            showToast(
                              nextState 
                                ? `Added "${project.title}" to Selected Works (Homepage)` 
                                : `Removed "${project.title}" from Selected Works`
                            );
                          }}
                          className={`px-[0.6vw] py-[0.25vw] rounded-full text-[0.5vw] font-bold tracking-[-0.03em] uppercase transition-all cursor-pointer flex items-center space-x-[0.3vw] ${
                            project.selectedWork
                              ? 'bg-[#a87f2f] text-black hover:bg-[#c2953a] shadow-sm'
                              : 'bg-[#1a1a1a] text-[#6f6f6f] hover:text-white hover:bg-[#252525] border border-white/5'
                          }`}
                          title={project.selectedWork ? 'Shown on Homepage Selected Works (Click to remove)' : 'Hidden from Homepage Selected Works (Click to feature)'}
                        >
                          <span>{project.selectedWork ? '★ HOMEPAGE' : '+ FEATURE'}</span>
                        </button>
                      </div>

                      {/* Action Buttons: Edit & Drop */}
                      <div className="w-[13%] flex items-center justify-end space-x-[0.6vw]">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(project)}
                          className="px-[0.6vw] py-[0.3vw] rounded-[2px] bg-[#1a1a1a] hover:bg-white hover:text-black text-[0.5556vw] font-semibold tracking-[-0.03em] uppercase transition-colors cursor-pointer border border-white/10"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project)}
                          className="px-[0.6vw] py-[0.3vw] rounded-[2px] bg-red-950/40 hover:bg-red-600 text-red-200 hover:text-white text-[0.5556vw] font-semibold tracking-[-0.03em] uppercase transition-colors cursor-pointer border border-red-500/20"
                        >
                          Drop
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* ─── Footer Status Bar ─── */}
          <div className="px-[1.8vw] py-[0.8vw] bg-black/60 border-t border-white/10 flex items-center justify-between text-[0.5556vw] text-[#6f6f6f] flex-shrink-0">
            <span>
              Total: {works.length} projects loaded in Works database
            </span>
            <span>
              Changes are immediately synchronized with the Works Page
            </span>
          </div>
        </motion.div>

        {/* ─── Add / Edit Project Sub-Modal / Drawer ─── */}
        <AnimatePresence>
          {activeFormMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-[2vw]"
              style={{ touchAction: 'auto' }}
              onWheel={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.25, ease: [0, 0.8, 0.2, 1] }}
                className="w-full max-w-[48vw] max-h-[90vh] bg-[#111111] border border-white/15 rounded-[4px] shadow-2xl p-[2vw] text-white flex flex-col space-y-[1.2vw] overflow-y-auto overscroll-contain"
                style={{ 
                  scrollbarWidth: 'thin', 
                  scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                  WebkitOverflowScrolling: 'touch'
                }}
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Form Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-[1vw]">
                  <div>
                    <h3 className="text-[1.1vw] font-semibold tracking-[-0.03em] uppercase text-white">
                      {activeFormMode === 'ADD' ? 'Add New Project' : 'Edit Project'}
                    </h3>
                    <p className="text-[0.5556vw] text-[#797979]">
                      Fill in the project details. Changes save directly to the Works page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveFormMode(null)}
                    className="text-[#797979] hover:text-white text-[0.9vw] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Form Fields Grid */}
                <form onSubmit={handleSubmitForm} className="space-y-[1.2vw]">
                  <div className="grid grid-cols-2 gap-x-[1.2vw] gap-y-[1vw]">
                    
                    {/* 1. Title */}
                    <div className="space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. STUDIO JUZENAS®"
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    {/* 2. Location */}
                    <div className="space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Location / Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. LITHUANIA or Egypt"
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    {/* 3. Works Filter Category (Websites | Branding) */}
                    <div className="space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Works Filter Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                      >
                        <option value="Branding">Branding</option>
                        <option value="Websites">Websites</option>
                      </select>
                      <span className="text-[0.4861vw] text-[#6f6f6f] block">
                        Controlled by the filter on Works page (Branding / Websites).
                      </span>
                    </div>

                    {/* 4. Release Year */}
                    <div className="space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Year
                      </label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="e.g. 2025"
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    {/* 5. Selected Works Category (Custom Text Box) */}
                    <div className="col-span-2 space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Selected Works Category (Homepage)
                      </label>
                      <input
                        type="text"
                        value={formData.selectedCategory}
                        onChange={(e) => setFormData({ ...formData, selectedCategory: e.target.value })}
                        placeholder="e.g. Brand Development | UI/UX Design & Web Development"
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors"
                      />
                      <span className="text-[0.4861vw] text-[#6f6f6f] block">
                        Custom category text displayed directly under project title in the Homepage Selected Works showcase.
                      </span>
                    </div>

                    {/* 6. Subtitle (Optional, for Works Page) */}
                    <div className="col-span-2 space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Works Page Subtitle (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="e.g. Brand Development or Digital Experience"
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    {/* 6. Image Upload & Preview */}
                    <div className="col-span-2 space-y-[0.4vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Project Image (Drop file or enter path)
                      </label>
                      <div className="flex items-start space-x-[1.2vw]">
                        {/* Drop Zone Box */}
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files?.[0]) {
                              handleImageFileChange(e.dataTransfer.files[0]);
                            }
                          }}
                          className="flex-1 border border-dashed border-white/20 hover:border-white/50 rounded-[2px] p-[1.2vw] flex flex-col items-center justify-center cursor-pointer bg-[#141414] hover:bg-[#181818] transition-colors text-center"
                        >
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleImageFileChange(e.target.files[0]);
                              }
                            }}
                            className="hidden" 
                          />
                          <span className="text-[1.2vw] text-white/50 mb-[0.3vw]">🖼</span>
                          <span className="text-[0.625vw] font-semibold text-white/90">
                            Click or Drag image file here
                          </span>
                          <span className="text-[0.4861vw] text-[#6f6f6f] mt-[0.2vw]">
                            Supports PNG, JPG, WebP (Ideal aspect 3:2 / 345×230)
                          </span>
                        </div>

                        {/* Image Preview Box */}
                        <div className="w-[10vw] flex-shrink-0">
                          <div className="w-full aspect-[345/230] rounded-[2px] overflow-hidden bg-black border border-white/15 relative">
                            {formData.image ? (
                              <img 
                                src={formData.image} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[0.5556vw] text-[#555555]">
                                No Image Selected
                              </div>
                            )}
                          </div>
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/images/works/my-file.png"
                            className="w-full mt-[0.3vw] bg-[#171717] border border-white/10 rounded-[2px] px-[0.4vw] py-[0.25vw] text-[0.5556vw] text-[#a0a0a0] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 7. Badge & Color Preset */}
                    <div className="space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Badge Text (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="e.g. AWARDED or IN THE WORKS"
                        className="w-full bg-[#171717] border border-white/10 rounded-[2px] px-[0.7vw] py-[0.45vw] text-[0.6944vw] text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div className="space-y-[0.3vw]">
                      <label className="text-[0.5556vw] font-semibold text-[#a0a0a0] tracking-[-0.03em] uppercase block">
                        Badge Color
                      </label>
                      <div className="flex items-center space-x-[0.5vw]">
                        {PRESET_BADGE_COLORS.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, badgeBg: color.value })}
                            style={{ backgroundColor: color.value }}
                            className={`w-[1.4vw] h-[1.4vw] rounded-full border cursor-pointer transition-transform ${
                              formData.badgeBg === color.value 
                                ? 'scale-110 border-white ring-2 ring-white/30' 
                                : 'border-white/20'
                            }`}
                            title={color.label}
                          />
                        ))}
                        <input
                          type="color"
                          value={formData.badgeBg}
                          onChange={(e) => setFormData({ ...formData, badgeBg: e.target.value })}
                          className="w-[1.6vw] h-[1.6vw] rounded-[2px] bg-transparent cursor-pointer border border-white/10"
                          title="Custom Color"
                        />
                      </div>
                    </div>

                    {/* 8. Show in Selected Works (Homepage) Toggle */}
                    <div className="col-span-2 pt-[0.8vw] border-t border-white/10 flex items-center justify-between">
                      <div>
                        <label className="text-[0.625vw] font-semibold text-white tracking-[-0.03em] uppercase block">
                          Featured in Selected Works (Homepage)
                        </label>
                        <span className="text-[0.5vw] text-[#797979] block">
                          Display this project card in the "Selected Works" section on the homepage.
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={Boolean(formData.selectedWork)}
                          onChange={(e) => setFormData({ ...formData, selectedWork: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-[2.4vw] h-[1.3vw] bg-[#222222] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.15vw] after:left-[0.2vw] after:bg-white after:rounded-full after:h-[1vw] after:w-[1vw] after:transition-all peer-checked:bg-[#a87f2f]"></div>
                      </label>
                    </div>

                  </div>

                  {/* Form Action Buttons */}
                  <div className="border-t border-white/10 pt-[1.2vw] flex items-center justify-end space-x-[0.8vw]">
                    <button
                      type="button"
                      onClick={() => setActiveFormMode(null)}
                      className="px-[1vw] py-[0.45vw] rounded-[2px] bg-[#1a1a1a] hover:bg-[#252525] text-white/80 text-[0.625vw] font-semibold tracking-[-0.03em] uppercase transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-[1.2vw] py-[0.45vw] rounded-[2px] bg-white text-black hover:bg-white/90 text-[0.625vw] font-bold tracking-[-0.03em] uppercase transition-colors cursor-pointer shadow-md"
                    >
                      {activeFormMode === 'ADD' ? 'Save New Project' : 'Update Project'}
                    </button>
                  </div>
                </form>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
}
