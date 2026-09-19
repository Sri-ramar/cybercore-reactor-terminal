import React, { useState } from 'react';
import { ThemeConfig } from '../../types';

interface ProceduralCoreOrbProps {
  theme: ThemeConfig;
  powerOutput: number;
  rpm: number;
  resonanceActive: boolean;
  onCoreClick: () => void;
  isPlayingMusic?: boolean;
}

/**
 * ProceduralCoreOrb (GPU-Accelerated VFX):
 * 1. High-speed orbital neon plasma arc sweep (360 deg continuous rotation)
 * 2. Counter-rotating precision chronometer reticles
 * 3. Gravitational singularity breathing pulse & event horizon flare
 */
export const ProceduralCoreOrb: React.FC<ProceduralCoreOrbProps> = ({
  theme,
  powerOutput: _powerOutput,
  rpm,
  onCoreClick,
  isPlayingMusic = false,
}) => {
  const [, setIsHovered] = useState(false);

  const outerRotationDuration = Math.max(45, (60 / (rpm || 4800)) * 6000);
  const innerRotationDuration = Math.max(60, (60 / (rpm || 4800)) * 7500);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px] cursor-pointer select-none z-20"
      onClick={onCoreClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isPlayingMusic ? "Quantum Bio-Reactor Core — Playing Soothing BGM (Click to Stop)" : "Quantum Bio-Reactor Core — Click to Play Soothing BGM"}
      role="button"
      tabIndex={0}
    >
      <svg className="w-full h-full" viewBox="0 0 500 500">
        <defs>
          <filter id="core-neon-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.0" result="b1" />
            <feGaussianBlur stdDeviation="6.0" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>{`
            @keyframes coreSweepSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes singularityPulse {
              0%, 100% { transform: scale(1.0); opacity: 0.85; }
              50% { transform: scale(1.08); opacity: 1.0; }
            }
            .core-orbital-sweep {
              animation: coreSweepSpin 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              transform-origin: 250px 250px;
              will-change: transform;
            }
            .core-singularity-glow {
              animation: singularityPulse 2.4s ease-in-out infinite;
              transform-origin: 250px 250px;
              will-change: transform, opacity;
            }
          `}</style>
        </defs>

        {/* 1. High-Speed Sweeping Orbital Neon Arc (Cyan & White Trail) */}
        <g className="core-orbital-sweep" filter="url(#core-neon-glow)">
          <path
            d="M 250 18 A 232 232 0 0 1 482 250"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="5.5"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M 250 18 A 232 232 0 0 1 482 250"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.98"
          />
          {/* Leading white-hot photon head */}
          <circle cx="482" cy="250" r="4.5" fill="#ffffff" filter="url(#core-neon-glow)" />
          <circle cx="482" cy="250" r="2.0" fill="#00d4ff" />
        </g>

        {/* 2. Counter-Rotating Chronometer Reticles */}
        {/* Outer Clockwise Dial */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            dur={`${outerRotationDuration}s`}
            repeatCount="indefinite"
          />
          <circle cx="250" cy="250" r="108" fill="none" stroke={theme.accent} strokeWidth="0.9" opacity="0.75" />
          <circle cx="250" cy="250" r="98" fill="none" stroke="#164e72" strokeWidth="0.8" opacity="0.65" />

          {[...Array(64)].map((_, i) => {
            const angle = (i * 360) / 64;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 8 === 0;
            const isSemi = i % 4 === 0;
            const rStart = isMajor ? 98 : isSemi ? 102 : 105;
            const rEnd = 108;

            return (
              <line
                key={`outer-tick-${i}`}
                x1={250 + Math.cos(rad) * rStart}
                y1={250 + Math.sin(rad) * rStart}
                x2={250 + Math.cos(rad) * rEnd}
                y2={250 + Math.sin(rad) * rEnd}
                stroke={isMajor ? '#ffffff' : isSemi ? theme.accent : theme.primary}
                strokeWidth={isMajor ? 1.6 : isSemi ? 1.0 : 0.6}
                opacity={isMajor ? 1.0 : 0.8}
              />
            );
          })}

          {[0, 90, 180, 270].map((deg, i) => (
            <g key={`outer-cardinal-${i}`} transform={`translate(250, 250) rotate(${deg})`}>
              <polygon points="0 -98, -3.5 -105, 3.5 -105" fill="#ffffff" filter="url(#core-neon-glow)" />
            </g>
          ))}
        </g>

        {/* Inner Counter-Clockwise Dial */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 250 250"
            to="0 250 250"
            dur={`${innerRotationDuration}s`}
            repeatCount="indefinite"
          />
          <circle cx="250" cy="250" r="94" fill="none" stroke={theme.accent} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.9" />
          <circle cx="250" cy="250" r="82" fill="none" stroke={theme.primary} strokeWidth="0.8" opacity="0.75" />

          {[...Array(32)].map((_, i) => {
            const angle = (i * 360) / 32;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 4 === 0;
            const rStart = isMajor ? 82 : 88;
            const rEnd = 94;

            return (
              <line
                key={`inner-tick-${i}`}
                x1={250 + Math.cos(rad) * rStart}
                y1={250 + Math.sin(rad) * rStart}
                x2={250 + Math.cos(rad) * rEnd}
                y2={250 + Math.sin(rad) * rEnd}
                stroke={isMajor ? '#ffffff' : theme.accent}
                strokeWidth={isMajor ? 1.4 : 0.8}
                opacity={isMajor ? 0.95 : 0.75}
              />
            );
          })}

          {[...Array(8)].map((_, i) => (
            <g key={`inner-spoke-${i}`} transform={`translate(250, 250) rotate(${i * 45})`}>
              <circle cx="0" cy="-88" r="1.4" fill="#ffffff" filter="url(#core-neon-glow)" />
              <line x1="0" y1="-82" x2="0" y2="-76" stroke="#ffffff" strokeWidth="1.2" />
            </g>
          ))}
        </g>

        {/* 3. Singularity Event Horizon Breathing Pulse */}
        <g className="core-singularity-glow" filter="url(#core-neon-glow)">
          <circle cx="250" cy="250" r="76" fill="none" stroke="#00d4ff" strokeWidth="3.2" opacity="0.85" />
          <circle cx="250" cy="250" r="76" fill="none" stroke="#ffffff" strokeWidth="1.0" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
};
