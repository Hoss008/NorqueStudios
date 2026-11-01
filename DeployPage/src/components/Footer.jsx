import React from 'react';
import MainLogo from './MainLogo';
import MaskedWordStagger from './MaskedWordStagger';
import MagnetLines from './MagnetLines';

/* ========================================================================= */
/* MAGNET LINES CONFIGURATION VARIABLES                                      */
/* Custom controls for https://reactbits.dev/backgrounds/magnet-lines        */
/* Adjust these parameters below to change how the interactive field behaves */
/* ========================================================================= */
const MAGNET_LINES_CONFIG = {
  // Visuals & Layout
  lineColor: '#ffffff',       // Line color (hex, rgb, or css color)
  accentColor: undefined,     // Highlight accent color on cursor interaction (e.g. '#ffffff' or '#f43f5e')
  lineWidth: 2,               // Thickness of each line in pixels
  lineHeight: 18,             // Length of each line in pixels
  spacing: 30,                // Spacing distance between lines in pixels
  rows: undefined,            // Number of rows (leave undefined for auto-fill)
  columns: undefined,         // Number of columns (leave undefined for auto-fill)
  shape: 'line',              // Shape of elements: 'line' | 'arrow' | 'needle'
  baseAngle: -10,             // Resting angle of lines in degrees (e.g. -10, 0, 45)
  fade: 0.65,                 // Distance-based opacity fade (0 to 1)
  edgeFade: 0,                // Edge vignette / fade at container boundaries (0 to 1)
  rainbow: false,             // Rainbow spectral color mode (true | false)

  // Motion & Physics
  mode: 'orbit',              // Magnetic pattern: 'orbit' | 'attract' | 'spiral' | 'dipole'
  radius: 200,                // Radius of cursor interaction zone in pixels
  reach: 0,                   // Effective distance lines follow cursor (0 = entire field)
  scatter: 0,                 // Random angle scatter at rest (0 to 1)
  stretch: 0.4,               // Line elongation when moving (0 to 2)
  inertia: 0.35,              // Smoothness / swing delay (0 = instant, 1 = heavy lag)
  bounce: 0.3,                // Overshoot wobble when settling (0 = none, 1 = high bounce)
  ripple: 0.3,                // Radial outward delay from cursor (0 to 1)

  // Behaviors & Animation
  clickPulse: true,           // Send outward spin shockwave on mouse click
  intro: true,                // Staggered reveal animation when element first loads
  idle: false,                // Ambient floating motion when cursor leaves the area

  // 3D Perspective Tilt
  tiltX: 0,                   // 3D tilt around X-axis in degrees (-70 to 70)
  tiltY: 0,                   // 3D tilt around Y-axis in degrees (-70 to 70)
  maxDevicePixelRatio: 2,     // Maximum device pixel ratio for performance
};

/* ========================================================================= */
/* UNIVERSAL FOOTER COMPONENT                                                */
/* Project inquiry callout, interactive magnet lines, vector logo & links    */
/* ========================================================================= */
export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-black motion-blur-target">
      {/* Universal Container Margin: 12px (0.8333vw) */}
      <div className="w-full px-[0.8333vw]">
        {/* ─── 1. Top Callout Section ─── */}
        <div className="border-t border-[#363636] pt-[1.6667vw]">
          <div className="max-w-[23.9583vw]">
            <MaskedWordStagger className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
              Got a project on mind?<br />
              Let’s make it alive!<br />
              <a 
                href="mailto:hello@norquestudios.com" 
                className="hover:opacity-70 transition-opacity"
              >
                hello@norquestudios.com
              </a>
            </MaskedWordStagger>
          </div>
        </div>

        {/* ─── 2. Interactive Magnet Lines Element (Fits Red Box) ─── */}
        <div className="w-full mt-[1.49vw] mb-[2.4vw] h-[28.05vw] overflow-hidden">
          <MagnetLines
            {...MAGNET_LINES_CONFIG}
            className="w-full h-full"
          />
        </div>

        {/* ─── 3. Bottom Giant Brand Mark & Legal Directory ─── */}
        <div>
          {/* Full-Width Brand Vector */}
          <div className="w-full mb-[0.6944vw]">
            <MainLogo className="w-full h-auto text-white" />
          </div>

          {/* Directory Bar & Copyright Notice */}
          <div className="pt-[0.6944vw] pb-[1.6667vw] flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4">
            {/* Primary Navigation & Social Directory */}
            <div className="flex flex-wrap items-center gap-x-[0.9722vw] text-[0.6944vw] font-semibold tracking-normal text-white">
              <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
              <a href="#works" className="hover:opacity-60 transition-opacity">Works</a>
              <a href="#services" className="hover:opacity-60 transition-opacity">services</a>
              <a href="#contact" className="hover:opacity-60 transition-opacity">contact</a>
              <a 
                href="https://www.behance.net" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-60 transition-opacity"
              >
                Behance
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-60 transition-opacity"
              >
                Linked in
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a href="#terms" className="text-[#797979] hover:text-white transition-colors">
                • terms &amp; conditions
              </a>
              <a href="#privacy" className="text-[#797979] hover:text-white transition-colors">
                • privacy &amp; policy
              </a>
            </div>

            {/* Copyright */}
            <div className="text-right">
              <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-white">
                © 2026 norquestudios. all rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
