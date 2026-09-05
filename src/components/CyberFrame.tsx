import React from 'react';
import { ThemeConfig } from '../types';

interface CyberFrameProps {
  theme: ThemeConfig;
  mousePos: { x: number; y: number };
  children: React.ReactNode;
}

export const CyberFrame: React.FC<CyberFrameProps> = ({
  theme,
  mousePos,
  children,
}) => {
  return (
    <div
      className="relative w-full h-full p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Tiltable Industrial Chassis Container */}
      <div
        className="relative w-full h-full max-w-[1600px] max-h-[900px] rounded-2xl md:rounded-3xl metal-bevel-chassis flex flex-col justify-between overflow-hidden border border-[#2a303c]"
        style={{
          transform: `rotateX(${mousePos.y * -3.5}deg) rotateY(${mousePos.x * 3.5}deg)`,
          transition: 'transform 0.15s ease-out',
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.95),
            0 0 40px ${theme.bgTint},
            inset 0 1px 2px rgba(255, 255, 255, 0.15),
            inset 0 -2px 4px rgba(0, 0, 0, 0.8)
          `,
        }}
      >
        {/* ======================================================== */}
        {/* CORNER INDUSTRIAL HEX BOLTS WITH GOLD SPECULAR GLEAM    */}
        {/* ======================================================== */}

        {/* Top-Left Bolt */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-8 h-8 sm:w-11 sm:h-11 rounded-full metal-bolt z-30 flex items-center justify-center border border-[#3a4454]">
          <div
            className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center"
            style={{ borderColor: theme.borderRgba, backgroundColor: '#13161c' }}
          >
            <div className="w-2.5 h-1 bg-[#2b3340] rounded-sm" />
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: `0 0 12px ${theme.glowRgba}` }}
          />
        </div>

        {/* Top-Right Bolt */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-11 sm:h-11 rounded-full metal-bolt z-30 flex items-center justify-center border border-[#3a4454]">
          <div
            className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center"
            style={{ borderColor: theme.borderRgba, backgroundColor: '#13161c' }}
          >
            <div className="w-2.5 h-1 bg-[#2b3340] rounded-sm" />
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: `0 0 12px ${theme.glowRgba}` }}
          />
        </div>

        {/* Bottom-Left Bolt */}
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-8 h-8 sm:w-11 sm:h-11 rounded-full metal-bolt z-30 flex items-center justify-center border border-[#3a4454]">
          <div
            className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center"
            style={{ borderColor: theme.borderRgba, backgroundColor: '#13161c' }}
          >
            <div className="w-2.5 h-1 bg-[#2b3340] rounded-sm" />
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: `0 0 12px ${theme.glowRgba}` }}
          />
        </div>

        {/* Bottom-Right Bolt */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-8 h-8 sm:w-11 sm:h-11 rounded-full metal-bolt z-30 flex items-center justify-center border border-[#3a4454]">
          <div
            className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center"
            style={{ borderColor: theme.borderRgba, backgroundColor: '#13161c' }}
          >
            <div className="w-2.5 h-1 bg-[#2b3340] rounded-sm" />
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: `0 0 12px ${theme.glowRgba}` }}
          />
        </div>

        {/* ======================================================== */}
        {/* BEZEL MILLED COOLING VENTS & INDUSTRIAL EMBOSS DETAILS   */}
        {/* ======================================================== */}

        {/* Top Metallic Rail */}
        <div className="w-full h-8 sm:h-12 bg-gradient-to-b from-[#1c212a] to-[#0f1217] border-b border-[#252b36] flex items-center justify-between px-16 sm:px-24 z-20">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary, boxShadow: `0 0 8px ${theme.primary}` }} />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#8894a8]">
              MK-IV CYBER-TERMINAL // CHASSIS-A09
            </span>
          </div>

          {/* Top Cooling Vent Slots */}
          <div className="hidden sm:flex space-x-1.5">
            {[...Array(12)].map((_, i) => (
              <div key={`vent-t-${i}`} className="w-4 h-2.5 metal-recessed-groove rounded-[1px]" />
            ))}
          </div>

          <div className="flex items-center space-x-3 text-[10px] sm:text-xs font-mono text-[#8894a8]">
            <span className="hidden md:inline">QUANTUM FIELD: STABLE</span>
            <span className="px-1.5 py-0.5 rounded bg-[#10141b] border border-[#2b3444] text-[#ffd260]">
              AUTH: SEC-LVL 4
            </span>
          </div>
        </div>

        {/* Main Center Chamber Container */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-[#07080b]">
          {/* Detailed Dark Motherboard Mechanical Relief Texture */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Left Bezel Side Heat-Sinks */}
          <div className="absolute left-2 top-1/4 bottom-1/4 w-3 hidden lg:flex flex-col justify-between pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <div key={`vent-l-${i}`} className="w-full h-2 metal-recessed-groove rounded-[1px]" />
            ))}
          </div>

          {/* Right Bezel Side Heat-Sinks */}
          <div className="absolute right-2 top-1/4 bottom-1/4 w-3 hidden lg:flex flex-col justify-between pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <div key={`vent-r-${i}`} className="w-full h-2 metal-recessed-groove rounded-[1px]" />
            ))}
          </div>

          {/* Content (Circuit Canvas + Reactor Core + HUD Panels) */}
          {children}

          {/* Subtle CRT Scanlines & Optical Vignette */}
          <div className="absolute inset-0 scanlines-overlay pointer-events-none opacity-35" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
            }}
          />
        </div>

        {/* Bottom Metallic Rail */}
        <div className="w-full h-8 sm:h-12 bg-gradient-to-t from-[#1c212a] to-[#0f1217] border-t border-[#252b36] flex items-center justify-between px-16 sm:px-24 z-20">
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-[#8894a8]">
            <span className="text-[#e2a82b]">⚡ CORE HYPERDRIVE</span>
            <span className="hidden sm:inline">// BUS LATENCY: 0.12ms</span>
          </div>

          {/* Bottom Vent Slots */}
          <div className="hidden sm:flex space-x-1.5">
            {[...Array(12)].map((_, i) => (
              <div key={`vent-b-${i}`} className="w-4 h-2.5 metal-recessed-groove rounded-[1px]" />
            ))}
          </div>

          <div className="text-[10px] sm:text-xs font-mono text-[#e0b040] flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold tracking-wider">NEURAL LINK ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
