import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../types';

interface CentralApertureCoreProps {
  theme: ThemeConfig;
  powerOutput: number;
  rpm: number;
  resonanceActive: boolean;
  onCoreClick: () => void;
}

export const CentralApertureCore: React.FC<CentralApertureCoreProps> = ({
  theme,
  powerOutput,
  rpm,
  resonanceActive,
  onCoreClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Rotation duration based on RPM (higher RPM = faster rotation)
  const rotationDuration = Math.max(1.8, (60 / (rpm || 4800)) * 120);

  const handleClick = () => {
    setIsPulsing(true);
    onCoreClick();
    setTimeout(() => setIsPulsing(false), 800);
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] aspect-square cursor-pointer select-none group z-20 flex items-center justify-center"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Quantum Bio-Reactor Core — Click to Trigger Spore Surge"
    >
      <svg className="w-full h-full" viewBox="0 0 500 500">
        <defs>
          {/* Bioluminescent Green Aperture Torus Bloom */}
          <radialGradient id="aperture-neon-torus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="68%" stopColor={theme.secondary} stopOpacity="0.4" />
            <stop offset="78%" stopColor={theme.primary} />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="92%" stopColor={theme.accent} />
            <stop offset="98%" stopColor={theme.primary} stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Inner Sharp Neon Ring */}
          <radialGradient id="inner-core-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="68%" stopColor="#000000" stopOpacity="0" />
            <stop offset="78%" stopColor="#ffffff" />
            <stop offset="86%" stopColor={theme.accent} />
            <stop offset="94%" stopColor={theme.primary} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Pitch-Black Singularity Void */}
          <radialGradient id="singularity-void-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="78%" stopColor="#000000" />
            <stop offset="92%" stopColor="#020802" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0.8" />
          </radialGradient>

          {/* High-Intensity Emerald Glow Filters */}
          <filter id="core-emerald-glow-master" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b1" />
            <feGaussianBlur stdDeviation="6" result="b2" />
            <feGaussianBlur stdDeviation="14" result="b3" />
            <feMerge>
              <feMergeNode in="b3" />
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Volumetric Green Ambient Glow behind Torus */}
        <circle
          cx="250"
          cy="250"
          r="160"
          fill={theme.primary}
          opacity={0.12 + (powerOutput / 100) * 0.12 + (isHovered ? 0.08 : 0)}
          filter="url(#core-emerald-glow-master)"
        />

        {/* 2. Interactive Hover Halo Ring */}
        <circle
          cx="250"
          cy="250"
          r="230"
          fill="none"
          stroke={theme.primary}
          strokeWidth={isHovered ? '2' : '0'}
          strokeDasharray="6 6"
          opacity={isHovered ? 0.7 : 0}
          className="transition-all duration-300"
        />

        {/* 3. RADIANT EMERALD APERTURE TORUS RING (Enhanced Glow) */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="url(#aperture-neon-torus)"
          filter="url(#core-emerald-glow-master)"
          opacity={0.75 + (powerOutput / 100) * 0.25}
        />

        {/* Brilliant Lime Core Arc Ring */}
        <circle
          cx="250"
          cy="250"
          r="125"
          fill="none"
          stroke={theme.accent}
          strokeWidth="3.5"
          filter="url(#core-emerald-glow-master)"
          opacity="0.85"
        />

        {/* 4. ROTATING CHRONOMETER / RADIAL GAUGE RETICLE */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            dur={`${rotationDuration}s`}
            repeatCount="indefinite"
          />
          {/* Guide Rings */}
          <circle cx="250" cy="250" r="108" fill="none" stroke={theme.accent} strokeWidth="0.8" opacity="0.65" />
          <circle
            cx="250"
            cy="250"
            r="98"
            fill="none"
            stroke="#90ff5b"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            opacity="0.8"
          />
          <circle cx="250" cy="250" r="82" fill="none" stroke={theme.primary} strokeWidth="0.8" opacity="0.65" />

          {/* 64 Precision Radial Tick Lines */}
          {[...Array(64)].map((_, i) => {
            const angle = (i * 360) / 64;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 8 === 0;
            const isSemi = i % 4 === 0;
            const rStart = isMajor ? 82 : isSemi ? 90 : 96;
            const rEnd = 108;

            const x1 = 250 + Math.cos(rad) * rStart;
            const y1 = 250 + Math.sin(rad) * rStart;
            const x2 = 250 + Math.cos(rad) * rEnd;
            const y2 = 250 + Math.sin(rad) * rEnd;

            return (
              <line
                key={`reticle-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#ffffff' : isSemi ? theme.accent : theme.primary}
                strokeWidth={isMajor ? 1.6 : isSemi ? 1.0 : 0.65}
                opacity={isMajor ? 0.95 : 0.75}
              />
            );
          })}
        </g>

        {/* Counter-rotating Inner Scale Ring */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 250 250"
            to="0 250 250"
            dur={`${rotationDuration * 1.6}s`}
            repeatCount="indefinite"
          />
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x = 250 + Math.cos(rad) * 72;
            const y = 250 + Math.sin(rad) * 72;
            return (
              <circle
                key={`inner-dial-dot-${i}`}
                cx={x}
                cy={y}
                r={i % 3 === 0 ? '1.4' : '0.8'}
                fill={i % 3 === 0 ? '#ffffff' : theme.accent}
                opacity="0.8"
              />
            );
          })}
        </g>

        {/* 5. INNER RADIANT GLOWING LIME TORUS */}
        <circle
          cx="250"
          cy="250"
          r="76"
          fill="url(#inner-core-flare)"
          filter="url(#core-emerald-glow-master)"
          opacity={0.88 + (powerOutput / 100) * 0.12}
        />
        {/* Razor-Sharp White Inner Rim */}
        <circle cx="250" cy="250" r="64" fill="none" stroke="#ffffff" strokeWidth="2.2" opacity="0.9" />
        <circle
          cx="250"
          cy="250"
          r="64"
          fill="none"
          stroke={theme.accent}
          strokeWidth="5"
          filter="url(#core-emerald-glow-master)"
          opacity="0.85"
        />

        {/* 6. PITCH-BLACK CENTRAL SINGULARITY VOID */}
        <circle cx="250" cy="250" r="54" fill="url(#singularity-void-center)" />
        <circle cx="250" cy="250" r="42" fill="#000000" />

        {/* Tiny Central Quantum Spark */}
        <circle
          cx="250"
          cy="250"
          r={isPulsing ? '4' : '1.8'}
          fill="#ffffff"
          filter="url(#core-emerald-glow-master)"
          className="transition-all duration-300"
        />

        {/* 7. Dynamic Resonance Shockwave Waveform on Core Pulse */}
        {(resonanceActive || isPulsing) && (
          <motion.circle
            cx="250"
            cy="250"
            r="64"
            fill="none"
            stroke={theme.accent}
            strokeWidth="3"
            animate={{ r: [64, 210], opacity: [0.9, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            pointerEvents="none"
          />
        )}
      </svg>
    </div>
  );
};
