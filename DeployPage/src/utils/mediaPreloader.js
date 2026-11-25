/**
 * NORQUE STUDIOS™ — Unified Page Media & Component Preloader
 *
 * Ensures all media (images, videos, gifs) and lazy React component chunks
 * for a target page are downloaded and decoded in GPU memory BEFORE
 * the page is loaded into the DOM.
 */

// Eagerly glob all project assets so URLs are resolved by Vite
const projectAssets = import.meta.glob('../assets/projects/**/*.{webp,png,jpg,jpeg}', { eager: true, import: 'default' });
const showcaseAssets = import.meta.glob('../assets/showcase/*.webp', { eager: true, import: 'default' });
const newsAssets = import.meta.glob('../assets/news/*.{gif,png,jpg,webp}', { eager: true, import: 'default' });
const aboutNewsAssets = import.meta.glob('../assets/about-news/*.{webm,gif,png,jpg,webp}', { eager: true, import: 'default' });
const rootAssets = import.meta.glob('../assets/*.{mp4,webm,jpg,png,webp}', { eager: true, import: 'default' });

function getPublicUrl(path) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${cleanPath}`;
}

const preloadedCache = new Set();

/**
 * Preload and decode an image URL in browser memory/GPU
 */
export function preloadImage(src) {
  if (!src) return Promise.resolve();
  if (preloadedCache.has(src)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    const finish = () => {
      preloadedCache.add(src);
      resolve();
    };
    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    img.onerror = finish;
    img.src = src;
  });
}

/**
 * Preload video metadata/buffer
 */
export function preloadVideo(src) {
  if (!src) return Promise.resolve();
  if (preloadedCache.has(src)) return Promise.resolve();

  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    let finished = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        preloadedCache.add(src);
        video.removeEventListener('loadeddata', finish);
        video.removeEventListener('canplay', finish);
        video.removeEventListener('error', finish);
        resolve();
      }
    };
    video.addEventListener('loadeddata', finish);
    video.addEventListener('canplay', finish);
    video.addEventListener('error', finish);
    video.src = src;
    video.load();
    // Safety fallback: don't let slow video network hold navigation
    setTimeout(finish, 1500);
  });
}

/**
 * Pre-fetch the lazy-loaded React component chunk for the route
 */
export function preloadPageChunk(page) {
  switch (page) {
    case 'home':
      return Promise.resolve();
    case 'about':
      return import('../components/AboutPage');
    case 'services':
      return import('../components/ServicesPage');
    case 'works':
      return import('../components/WorksPage');
    case 'project-mms':
      return import('../components/projects/MmsProjectPage');
    case 'project-axis':
      return import('../components/projects/AxisProjectPage');
    case 'project-stephenson':
      return import('../components/projects/StephensonProjectPage');
    case 'project-fusion-form':
      return import('../components/projects/FusionFormProjectPage');
    default:
      return Promise.resolve();
  }
}

/**
 * Map logical page to all relevant media URLs
 */
export function getAssetsForPage(page) {
  const images = [];
  const videos = [];

  switch (page) {
    case 'home': {
      Object.entries(rootAssets).forEach(([k, v]) => {
        if (k.includes('hero-background')) videos.push(v);
        if (k.includes('hero-poster') || k.includes('done-by-humans-bg') || k.includes('project-')) {
          images.push(v);
        }
      });
      Object.values(newsAssets).forEach((v) => images.push(v));
      Object.values(showcaseAssets).forEach((v) => images.push(v));
      break;
    }

    case 'about': {
      const publicAbout = [
        'images/about/about-intro-image.png',
        'images/about/founder-mostafa-yasser.png',
        'images/about/founder-hossam-hassan.png',
        'images/about/team-anas-el-sharief.png',
        'images/about/team-qandil.png',
        'images/about/team-alaa-kabil.png',
        'images/about/team-okaby.jpg',
        'images/about/team-marwan-yasser.png',
      ];
      publicAbout.forEach((p) => images.push(getPublicUrl(p)));

      Object.entries(aboutNewsAssets).forEach(([k, v]) => {
        if (k.endsWith('.webm') || k.endsWith('.mp4')) {
          videos.push(v);
        } else {
          images.push(v);
        }
      });
      break;
    }

    case 'services': {
      const publicServices = [
        'images/services/workFlow/01.png',
        'images/services/workFlow/02.png',
        'images/services/workFlow/03.png',
        'images/services/workFlow/04.png',
        'images/services/workFlow/05.png',
        'images/services/bef77eb0ee5df99230996515e2cc1941c59c92e0.png',
        'images/services/2c8f280d0dfe389dee8c6c402c0e37c610f7f335.png',
        'images/services/ee1003dbc63d96edd88458b92a40280bb45f11a0.png',
      ];
      publicServices.forEach((p) => images.push(getPublicUrl(p)));
      break;
    }

    case 'works': {
      const publicWorks = [
        'images/works/mms-architects.png',
        'images/works/axis-consultancy.png',
        'images/works/stephenson.webp',
        'images/works/fusion-form.png',
        'images/works/studio-juzenas.png',
      ];
      publicWorks.forEach((p) => images.push(getPublicUrl(p)));
      Object.entries(rootAssets).forEach(([k, v]) => {
        if (k.includes('project-')) images.push(v);
      });
      break;
    }

    case 'project-mms': {
      Object.entries(projectAssets).forEach(([k, v]) => {
        if (/mms/i.test(k)) images.push(v);
      });
      break;
    }

    case 'project-axis': {
      Object.entries(projectAssets).forEach(([k, v]) => {
        if (/axis/i.test(k)) images.push(v);
      });
      break;
    }

    case 'project-stephenson': {
      Object.entries(projectAssets).forEach(([k, v]) => {
        if (/stephenson/i.test(k) || /stpn/i.test(k)) images.push(v);
      });
      break;
    }

    case 'project-fusion-form': {
      Object.entries(projectAssets).forEach(([k, v]) => {
        if (/fusion/i.test(k)) images.push(v);
      });
      break;
    }

    default:
      break;
  }

  return { images, videos };
}

/**
 * Preload all assets and code for target page before loading into DOM
 */
export async function preloadPage(page, { skipMinTimer = false } = {}) {
  const { images, videos } = getAssetsForPage(page);
  const chunkPromise = preloadPageChunk(page);

  const promises = [chunkPromise];
  images.forEach((src) => promises.push(preloadImage(src)));
  videos.forEach((src) => promises.push(preloadVideo(src)));

  // Safety timeout: max 3200ms so network stalls never block the user indefinitely
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3200));

  // Minimum black screen hold timer to ensure a clean, cinematic transition pace (180ms)
  const minTimer = skipMinTimer
    ? Promise.resolve()
    : new Promise((resolve) => setTimeout(resolve, 180));

  await Promise.race([Promise.all(promises), timeoutPromise]);
  await minTimer;
}
