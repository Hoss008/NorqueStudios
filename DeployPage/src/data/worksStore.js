import { useState, useEffect } from 'react';
import defaultWorks from './works.json';

const STORAGE_KEY = 'norque_works_database';
const EVENT_KEY = 'norque_works_updated';

// In-memory cache to guarantee instant updates regardless of storage quota
let memoryWorks = null;

/**
 * Compress an uploaded image file using an off-screen HTML5 canvas
 * Resizes down to max 1200x800 and compresses as high-quality JPEG (~120KB)
 */
export async function compressImage(file, maxWidth = 1200, maxHeight = 800, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('File is not an image'));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Fuzzy keyword matcher to match items against default works
 */
function findMatchingDefault(item) {
  if (!item) return null;
  const rawId = (item.id || '').toLowerCase();
  const rawTitle = (item.title || '').toLowerCase();

  return (defaultWorks || []).find((def) => {
    const defId = (def.id || '').toLowerCase();
    const defTitle = (def.title || '').toLowerCase();

    // 1. Exact ID or Title match
    if (item.id && def.id && item.id === def.id) return true;
    if (item.title && def.title && item.title === def.title) return true;

    // 2. Fuzzy keyword matches for core portfolio projects
    if ((rawId.includes('mms') || rawTitle.includes('mms')) && (defId.includes('mms') || defTitle.includes('mms'))) return true;
    if ((rawId.includes('juzenas') || rawTitle.includes('juzenas')) && (defId.includes('juzenas') || defTitle.includes('juzenas'))) return true;
    if ((rawId.includes('stephenson') || rawTitle.includes('stephenson')) && (defId.includes('stephenson') || defTitle.includes('stephenson'))) return true;
    if ((rawId.includes('axis') || rawTitle.includes('axis')) && (defId.includes('axis') || defTitle.includes('axis'))) return true;
    if ((rawId.includes('fusion') || rawTitle.includes('fusion')) && (defId.includes('fusion') || defTitle.includes('fusion'))) return true;

    return false;
  });
}

/**
 * Retrieve current works list: memory -> localStorage -> works.json
 */
export function getWorks() {
  if (memoryWorks && Array.isArray(memoryWorks) && memoryWorks.length > 0) {
    return memoryWorks;
  }

  let list = defaultWorks || [];

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let hasRepairs = false;
          const merged = parsed.map((p) => {
            const def = findMatchingDefault(p);
            if (!def) return p;

            // Check if the image is a valid custom data URL with substantive content
            const isCustomDataUrl = typeof p.image === 'string' && p.image.startsWith('data:image/') && p.image.length > 200;
            // If it's a legacy file path (like /images/works/...), empty, or invalid, upgrade to def.image
            const image = isCustomDataUrl ? p.image : def.image;

            if (image !== p.image) {
              hasRepairs = true;
            }

            return {
              ...def,
              ...p,
              id: def.id || p.id,
              title: def.title || p.title,
              image,
              selectedCategory: p.selectedCategory !== undefined ? p.selectedCategory : def.selectedCategory,
              selectedWork: p.selectedWork !== undefined ? p.selectedWork : def.selectedWork
            };
          });

          const existingIds = new Set(merged.map((p) => (p.id || p.title || '').toLowerCase()));
          const missing = (defaultWorks || []).filter((d) => {
            const dKey = (d.id || d.title || '').toLowerCase();
            return !existingIds.has(dKey) && !merged.some((m) => findMatchingDefault(m)?.id === d.id);
          });

          list = [...merged, ...missing];

          // Persist the repaired list back to localStorage so the browser cache is permanently fixed
          if (hasRepairs || missing.length > 0) {
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            } catch (err) {}
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage read warning, falling back to works.json:', e);
    }
  }

  memoryWorks = list;
  return list;
}

/**
 * Save updated works list: updates memory cache, writes to disk via /api/save-works,
 * saves to localStorage, and dispatches real-time DOM update event
 */
export function saveWorks(newWorks) {
  memoryWorks = newWorks;

  // 1. Sync to local disk via Vite dev/preview server middleware if available
  if (typeof window !== 'undefined' && window.fetch) {
    try {
      fetch('/api/save-works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWorks)
      }).catch(() => {
        // Silently ignore if running on static host without backend
      });
    } catch (e) {}
  }

  // 2. Persist to browser LocalStorage (with quota guard)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newWorks));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or unavailable. Retaining in memory cache:', e);
    }
  }

  // 3. Guarantee DOM event dispatch so all React components re-render instantly
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: newWorks }));
    } catch (e) {
      console.error('Failed to dispatch works update event:', e);
    }
  }
}

/**
 * Add a new project to the top of the Works portfolio
 */
export function addProject(projectData) {
  const current = getWorks();
  const id = projectData.id || `project-${Date.now()}`;
  const newProject = {
    ...projectData,
    id,
    selectedWork: projectData.selectedWork ?? false,
    year: projectData.year || new Date().getFullYear().toString()
  };
  const updated = [newProject, ...current];
  saveWorks(updated);
  return updated;
}

/**
 * Update an existing project
 */
export function updateProject(id, updatedFields) {
  const current = getWorks();
  const updated = current.map((p) => {
    if (p.id === id) {
      return { ...p, ...updatedFields };
    }
    return p;
  });
  saveWorks(updated);
  return updated;
}

/**
 * Delete / Drop a project by ID
 */
export function deleteProject(id) {
  const current = getWorks();
  const updated = current.filter((p) => p.id !== id);
  saveWorks(updated);
  return updated;
}

/**
 * Reorder projects (move item at fromIndex to toIndex)
 */
export function reorderProjects(fromIndex, toIndex) {
  const current = getWorks();
  if (fromIndex < 0 || fromIndex >= current.length) return current;
  if (toIndex < 0 || toIndex >= current.length) return current;
  const updated = [...current];
  const [removed] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, removed);
  saveWorks(updated);
  return updated;
}

/**
 * Never wipe user projects to a hardcoded default list
 */
export function resetWorks() {
  return getWorks();
}

/**
 * Export current works as a downloadable works.json file
 */
export function exportWorksJSON() {
  const current = getWorks();
  const jsonStr = JSON.stringify(current, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'works.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Custom React hook for subscribing to works database changes
 */
export function useWorksData() {
  const [works, setWorks] = useState(getWorks);

  useEffect(() => {
    const handler = (e) => {
      const latest = e.detail || getWorks();
      setWorks([...latest]);
    };
    window.addEventListener(EVENT_KEY, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_KEY, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return {
    works,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    resetWorks,
    exportWorksJSON
  };
}
