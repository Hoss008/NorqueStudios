import mmsCover from '../../assets/projects/mms/MMS Cover.webp';
import axisCover from '../../assets/projects/axis/AXIS Cover.webp';
import stpnCover from '../../assets/projects/stephenson/STPN Cover.webp';
import fusionCover from '../../assets/projects/fusion/Fusion Cover.png';

export const PROJECT_SEQUENCE = [
  {
    id: 'project-mms',
    path: '/projects/mms',
    title: 'MMS ARCHITECTS™',
    subtitle: 'Architecture Studio',
    bg: '#0a0e17',
    cover: mmsCover,
    coverScale: 1.3,
    next: 'project-axis'
  },
  {
    id: 'project-axis',
    path: '/projects/axis',
    title: 'AXIS® — RE',
    subtitle: 'Real Estate Company',
    bg: '#170103',
    cover: axisCover,
    coverScale: 1.3,
    next: 'project-stephenson'
  },
  {
    id: 'project-stephenson',
    path: '/projects/stephenson',
    title: 'STEPHENSON®',
    subtitle: 'Clothing Brand',
    bg: '#100C0B',
    cover: stpnCover,
    coverScale: 1,
    next: 'project-fusion-form'
  },
  {
    id: 'project-fusion-form',
    path: '/projects/fusion-form',
    title: 'FUSION FORM®',
    subtitle: 'Architecture Development',
    bg: '#0a0a0b',
    cover: fusionCover,
    coverScale: 1.3,
    next: 'project-mms'
  }
];

export function getProjectMeta(id) {
  return PROJECT_SEQUENCE.find((p) => p.id === id) || null;
}

export function getNextProjectMeta(currentId) {
  const cur = getProjectMeta(currentId);
  if (!cur) return PROJECT_SEQUENCE[0];
  return getProjectMeta(cur.next) || PROJECT_SEQUENCE[0];
}

function parseHexRgb(hex) {
  const clean = (hex || '#000000').replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function lerpHexColor(fromHex, toHex, t) {
  const clamped = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = parseHexRgb(fromHex);
  const [r2, g2, b2] = parseHexRgb(toHex);
  const r = Math.round(r1 + (r2 - r1) * clamped);
  const g = Math.round(g1 + (g2 - g1) * clamped);
  const b = Math.round(b1 + (b2 - b1) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}
