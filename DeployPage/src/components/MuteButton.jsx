import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/* ========================================================================= */
/* MUTE BUTTON COMPONENT                                                     */
/* Darker satin liquid glass optical shader + global audio mute toggle       */
/* ========================================================================= */
export default function MuteButton({ isMuted, onToggle }) {
  const [lensDataUrl, setLensDataUrl] = useState('');
  const feImageRef = useRef(null);

  /* ─── 1. Generate Optical Spherical Normal Map ─── */
  useEffect(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Normalized coordinates from -1 to 1 centered at (0, 0)
        const nx = (x / (size - 1)) * 2 - 1;
        const ny = (y / (size - 1)) * 2 - 1;
        const r = Math.sqrt(nx * nx + ny * ny);

        let dx = 0;
        let dy = 0;

        if (r <= 1.0) {
          // Optical dome lens refraction force
          const force = Math.sin(r * Math.PI) * (1.0 - r * 0.2);
          dx = - (r > 0 ? (nx / r) : 0) * force;
          dy = - (r > 0 ? (ny / r) : 0) * force;
        }

        const idx = (y * size + x) * 4;
        imgData.data[idx] = Math.round((dx * 0.5 + 0.5) * 255);     // R: horizontal refraction
        imgData.data[idx + 1] = Math.round((dy * 0.5 + 0.5) * 255); // G: vertical refraction
        imgData.data[idx + 2] = 255;                                 // B: neutral
        imgData.data[idx + 3] = 255;                                 // Alpha
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL();
    setLensDataUrl(dataUrl);

    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', dataUrl);
      feImageRef.current.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', dataUrl);
    }
  }, []);

  /* ─── Render ─── */
  return (
    <>
      {/* ─── Optical SVG Filter Definition ─── */}
      <svg
        className="fixed pointer-events-none -z-50 w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="norque-liquid-lens-circle"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              ref={feImageRef}
              href={lensDataUrl || undefined}
              result="lensMap"
              preserveAspectRatio="xMidYMid slice"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="lensMap"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
              result="refracted"
            />
            <feComposite in="refracted" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* ─── Floating Interactive Button with Dark Satin Glass ─── */}
      <aside 
        aria-label="Audio controls" 
        className="fixed bottom-[0.8333vw] right-[0.8333vw] z-50 pointer-events-auto"
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          style={{
            backdropFilter: lensDataUrl 
              ? 'url(#norque-liquid-lens-circle) blur(6px) brightness(0.82) contrast(1.12)' 
              : 'blur(20px) brightness(0.82)',
            WebkitBackdropFilter: lensDataUrl 
              ? 'url(#norque-liquid-lens-circle) blur(6px) brightness(0.82) contrast(1.12)' 
              : 'blur(20px) brightness(0.82)',
          }}
          className="relative group w-[3.3333vw] h-[3.3333vw] min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-out border border-white/20 hover:border-white/40 bg-[#0c0c0e]/50 hover:bg-[#0c0c0e]/40 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.35),inset_0_-1.5px_3px_rgba(0,0,0,0.6)] active:scale-95 overflow-hidden"
        >
          {/* Dark Satin Frosted Glass Diffusion Layer */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/[0.08] via-black/25 to-black/60 mix-blend-overlay transition-opacity duration-500" 
            aria-hidden="true" 
          />

          {/* Deep Smoked Satin Tint */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none bg-black/25 transition-colors duration-500 group-hover:bg-black/15" 
            aria-hidden="true" 
          />

          {/* Specular Edge Highlights */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.8)]" 
            aria-hidden="true" 
          />

          {/* Audio State Icon */}
          <div className="relative z-10">
            {isMuted ? (
              <VolumeX className="w-[1.25vw] h-[1.25vw] min-w-[18px] min-h-[18px] text-white/70 group-hover:text-white transition-colors" />
            ) : (
              <Volume2 className="w-[1.25vw] h-[1.25vw] min-w-[18px] min-h-[18px] text-white/90 group-hover:text-white transition-colors" />
            )}
          </div>
        </button>
      </aside>
    </>
  );
}
