import React, { useState, useMemo } from 'react';
import { ThemeConfig } from '../../types';

interface ProceduralCoreOrbProps {
  theme: ThemeConfig;
  powerOutput: number;
  rpm: number;
  resonanceActive: boolean;
  onCoreClick: () => void;
  isPlayingMusic?: boolean;
}

export const ProceduralCoreOrb: React.FC<ProceduralCoreOrbProps> = ({
  theme,
  powerOutput,
  rpm,
  onCoreClick,
  isPlayingMusic = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Stately, slow rotation durations for the dual counter-rotating dials
  const outerRotationDuration = Math.max(50, (60 / (rpm || 4800)) * 6000);
  const innerRotationDuration = Math.max(65, (60 / (rpm || 4800)) * 7500);

  // 1. Bio-Fluid Algae Water Micro-Spore Suspension
  const algaeSpores = useMemo(() => {
    const list = [];
    let seed = 49281;
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < 95; i++) {
      const angle = rng() * Math.PI * 2;
      const dist = 65 + rng() * 140;
      const cx = 250 + Math.cos(angle) * dist;
      const cy = 250 + Math.sin(angle) * dist;
      const r = 1.0 + rng() * 2.2;
      const alpha = 0.25 + rng() * 0.55;
      const isLime = rng() > 0.4;
      list.push({ cx, cy, r, alpha, isLime });
    }
    return list;
  }, []);

  // 2. 8 Precision Radial Bio-Injector Mechanical Caliper Brackets
  const injectorCalipers = useMemo(() => {
    const calipers = [];
    for (let i = 0; i < 8; i++) {
      const angleDeg = i * 45;
      calipers.push({ angleDeg });
    }
    return calipers;
  }, []);

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
          {/* Heavy Dark Bronze / Titanium Outer Bezel Gradients */}
          <radialGradient id="heavy-bronze-bezel-grad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#4a3e2a" />
            <stop offset="28%" stopColor="#322818" />
            <stop offset="62%" stopColor="#1e180e" />
            <stop offset="88%" stopColor="#120e08" />
            <stop offset="100%" stopColor="#080603" />
          </radialGradient>

          <linearGradient id="bronze-lip-specular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4b878" />
            <stop offset="45%" stopColor="#8c7442" />
            <stop offset="100%" stopColor="#2c2210" />
          </linearGradient>

          {/* Deep Bio-Fluid Algae Water Chamber Base */}
          <radialGradient id="algae-fluid-cavity-dark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#010402" />
            <stop offset="45%" stopColor="#030c04" />
            <stop offset="70%" stopColor="#081e0a" />
            <stop offset="88%" stopColor="#0e2c10" />
            <stop offset="100%" stopColor="#041005" />
          </radialGradient>

          {/* Multi-Tiered Concentric Radiant Emerald Energy Plasma Bands */}
          <radialGradient id="concentric-plasma-glow-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="48%" stopColor="#000000" stopOpacity="0" />
            <stop offset="58%" stopColor="#1a6e14" stopOpacity="0.4" />
            <stop offset="68%" stopColor="#3ebd18" />
            <stop offset="76%" stopColor="#76f028" />
            <stop offset="84%" stopColor="#ffffff" />
            <stop offset="92%" stopColor="#76f028" />
            <stop offset="98%" stopColor="#1a6e14" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Mechanical Caliper Metal Gradients */}
          <linearGradient id="caliper-titanium-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a3020" />
            <stop offset="40%" stopColor="#241e12" />
            <stop offset="100%" stopColor="#100c06" />
          </linearGradient>

          <linearGradient id="caliper-brass-bracket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4b46c" />
            <stop offset="50%" stopColor="#8c7036" />
            <stop offset="100%" stopColor="#3c2c10" />
          </linearGradient>

          {/* Glass Overlay Spherical Tint */}
          <radialGradient id="glass-spherical-dome-wet" cx="36%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#e5ffe2" stopOpacity="0.06" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="90%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="96%" stopColor={theme.accent} stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.26" />
          </radialGradient>

          <linearGradient id="specular-glare-sheen-wet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Core Arc Glow Filter */}
          <filter id="core-emerald-glow-shiny" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.0" result="b1" />
            <feGaussianBlur stdDeviation="6.0" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Volumetric Green Ambient Glow behind Orb */}
        <circle
          cx="250"
          cy="250"
          r="238"
          fill={theme.primary}
          opacity={0.16 + (powerOutput / 100) * 0.08}
          filter="url(#core-emerald-glow-shiny)"
        />

        {/* ======================================================== */}
        {/* 2. HEAVY INDUSTRIAL STEPPED BRONZE & TITANIUM BEZEL      */}
        {/* ======================================================== */}
        <g>
          {/* Outermost rim */}
          <circle cx="250" cy="250" r="242" fill="url(#heavy-bronze-bezel-grad)" stroke="#040302" strokeWidth="4.0" />
          
          {/* Concentric metallic bevel steps */}
          <circle cx="250" cy="250" r="242" fill="none" stroke="url(#bronze-lip-specular)" strokeWidth="1.6" />
          <circle cx="250" cy="250" r="238" fill="none" stroke="#ffe090" strokeWidth="0.6" opacity="0.5" />
          
          <circle cx="250" cy="250" r="226" fill="#140f08" stroke="#060402" strokeWidth="2.5" />
          <circle cx="250" cy="250" r="224" fill="none" stroke="#8a703c" strokeWidth="1.0" opacity="0.85" />
          
          {/* Knurled inner ring */}
          <circle
            cx="250"
            cy="250"
            r="218"
            fill="none"
            stroke="#d4b46c"
            strokeWidth="0.9"
            strokeDasharray="2 4"
            opacity="0.8"
          />

          {/* Micro-Etched Technical Laser Markings along Bezel */}
          <g opacity="0.45" fill="#e0c070" fontSize="7" fontFamily="Rajdhani, sans-serif" fontWeight="600" letterSpacing="2">
            <text x="250" y="46" textAnchor="middle">CORE 01 // MAG-LOCK // ISO-9001</text>
            <text x="250" y="464" textAnchor="middle">TORQUE: 45 N.m // HARMONIC BIO-CORE</text>
          </g>

          {/* 4 Heavy Countersunk Hex-Socket Bolts (12, 3, 6, 9 o'clock) */}
          {[
            { cx: 250, cy: 22 },
            { cx: 478, cy: 250 },
            { cx: 250, cy: 478 },
            { cx: 22, cy: 250 },
          ].map((bolt, idx) => (
            <g key={`bolt-hex-${idx}`}>
              <circle cx={bolt.cx} cy={bolt.cy} r="13" fill="url(#heavy-bronze-bezel-grad)" stroke="#060402" strokeWidth="1.6" />
              <circle cx={bolt.cx} cy={bolt.cy} r="13" fill="none" stroke="#d4b46c" strokeWidth="0.8" opacity="0.9" />
              <circle cx={bolt.cx} cy={bolt.cy} r="8.5" fill="#060402" stroke="#22180c" strokeWidth="1.2" />
              <polygon
                points={`
                  ${bolt.cx} ${bolt.cy - 4.5},
                  ${bolt.cx + 3.9} ${bolt.cy - 2.25},
                  ${bolt.cx + 3.9} ${bolt.cy + 2.25},
                  ${bolt.cx} ${bolt.cy + 4.5},
                  ${bolt.cx - 3.9} ${bolt.cy + 2.25},
                  ${bolt.cx - 3.9} ${bolt.cy - 2.25}
                `}
                fill="#18120a"
                stroke="#a68444"
                strokeWidth="0.8"
              />
              <circle cx={bolt.cx} cy={bolt.cy} r="1.4" fill="#ffd778" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 3. DEEP BIO-FLUID ALGAE WATER SUSPENSION CHAMBER         */}
        {/* ======================================================== */}
        <circle cx="250" cy="250" r="214" fill="url(#algae-fluid-cavity-dark)" />

        {/* Swirling Algae Micro-Spore Suspension */}
        <g>
          {algaeSpores.map((spore, idx) => (
            <circle
              key={`algae-spore-${idx}`}
              cx={spore.cx}
              cy={spore.cy}
              r={spore.r}
              fill={spore.isLime ? '#78f028' : '#3ea81c'}
              opacity={spore.alpha}
            />
          ))}
        </g>

        {/* ======================================================== */}
        {/* 4. MULTI-TIERED CONCENTRIC RADIANT PLASMA ENERGY RINGS   */}
        {/* ======================================================== */}
        <circle
          cx="250"
          cy="250"
          r="156"
          fill="url(#concentric-plasma-glow-1)"
          filter="url(#core-emerald-glow-shiny)"
          opacity={0.94 + (powerOutput / 100) * 0.06}
        />

        <circle cx="250" cy="250" r="148" fill="none" stroke="#1c6e14" strokeWidth="5.0" opacity="0.8" />
        <circle cx="250" cy="250" r="140" fill="none" stroke="#48d61a" strokeWidth="4.5" opacity="0.9" />
        <circle cx="250" cy="250" r="132" fill="none" stroke="#88f830" strokeWidth="6.0" filter="url(#core-emerald-glow-shiny)" />
        <circle cx="250" cy="250" r="132" fill="none" stroke="#ffffff" strokeWidth="2.2" opacity="0.95" />
        <circle cx="250" cy="250" r="124" fill="none" stroke="#52e01c" strokeWidth="4.5" opacity="0.9" />
        <circle cx="250" cy="250" r="116" fill="none" stroke="#227a18" strokeWidth="4.0" opacity="0.85" />

        {/* ======================================================== */}
        {/* 5. 8 RADIAL BIO-INJECTOR MECHANICAL CALIPER BRACKETS     */}
        {/* ======================================================== */}
        <g>
          {injectorCalipers.map((cal, idx) => (
            <g key={`injector-caliper-${idx}`} transform={`translate(250, 250) rotate(${cal.angleDeg})`}>
              <line x1="0" y1="-214" x2="0" y2="-175" stroke="#4a3e28" strokeWidth="2.0" />
              <line x1="0" y1="-214" x2="0" y2="-175" stroke="#d4b46c" strokeWidth="0.6" opacity="0.8" />

              <rect
                x="-7.5"
                y="-180"
                width="15"
                height="38"
                rx="2"
                fill="url(#caliper-titanium-body)"
                stroke="#080603"
                strokeWidth="1.2"
              />
              <rect
                x="-7.5"
                y="-180"
                width="15"
                height="38"
                rx="2"
                fill="none"
                stroke="url(#caliper-brass-bracket)"
                strokeWidth="0.8"
              />

              <circle cx="0" cy="-174" r="1.8" fill="#d4b46c" stroke="#080603" strokeWidth="0.5" />
              <circle cx="0" cy="-148" r="1.8" fill="#d4b46c" stroke="#080603" strokeWidth="0.5" />

              <rect x="-1.8" y="-168" width="3.6" height="15" rx="1" fill="#040a04" stroke="#12300c" strokeWidth="0.6" />
              <rect x="-1.0" y="-166" width="2.0" height="11" rx="0.5" fill="#88f830" filter="url(#core-emerald-glow-shiny)" />
              <line x1="0" y1="-165" x2="0" y2="-156" stroke="#ffffff" strokeWidth="0.8" />

              <polygon
                points="
                  -3.5 -142,
                  3.5 -142,
                  1.5 -132,
                  -1.5 -132
                "
                fill="#2c2214"
                stroke="#a68444"
                strokeWidth="0.7"
              />
              <circle cx="0" cy="-132" r="1.5" fill="#ffffff" filter="url(#core-emerald-glow-shiny)" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 6. DUAL OPPOSITE-ROTATING MECHANICAL CHRONOMETER DIALS   */}
        {/* ======================================================== */}
        <circle cx="250" cy="250" r="110" fill="#020804" stroke="#143612" strokeWidth="2.0" />

        {/* DIAL 1: OUTER CLOCKWISE ROTATING TACHOMETER DIAL (Radius 98 to 110) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            dur={`${outerRotationDuration}s`}
            repeatCount="indefinite"
          />
          {/* Outer Guide Ring */}
          <circle cx="250" cy="250" r="108" fill="none" stroke={theme.accent} strokeWidth="0.9" opacity="0.75" />
          <circle cx="250" cy="250" r="98" fill="none" stroke="#2c5a18" strokeWidth="0.8" opacity="0.65" />

          {/* 64 Precision Outer Radial Ticks */}
          {[...Array(64)].map((_, i) => {
            const angle = (i * 360) / 64;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 8 === 0;
            const isSemi = i % 4 === 0;
            const rStart = isMajor ? 98 : isSemi ? 102 : 105;
            const rEnd = 108;

            const x1 = 250 + Math.cos(rad) * rStart;
            const y1 = 250 + Math.sin(rad) * rStart;
            const x2 = 250 + Math.cos(rad) * rEnd;
            const y2 = 250 + Math.sin(rad) * rEnd;

            return (
              <line
                key={`outer-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#ffffff' : isSemi ? theme.accent : theme.primary}
                strokeWidth={isMajor ? 1.6 : isSemi ? 1.0 : 0.6}
                opacity={isMajor ? 1.0 : 0.8}
              />
            );
          })}

          {/* 4 Cardinal Diamond Pointers on Outer Dial */}
          {[0, 90, 180, 270].map((deg, i) => (
            <g key={`outer-cardinal-${i}`} transform={`translate(250, 250) rotate(${deg})`}>
              <polygon points="0 -108, 3 -102, -3 -102" fill="#ffffff" filter="url(#core-emerald-glow-shiny)" />
            </g>
          ))}
        </g>

        {/* DIAL 2: INNER COUNTER-CLOCKWISE ROTATING VERNIER DIAL (Radius 76 to 96 - OPPOSITE DIRECTION!) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 250 250"
            to="0 250 250"
            dur={`${innerRotationDuration}s`}
            repeatCount="indefinite"
          />
          {/* Inner Dashed Vernier Ring */}
          <circle
            cx="250"
            cy="250"
            r="94"
            fill="none"
            stroke="#88f04e"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.9"
          />
          <circle cx="250" cy="250" r="82" fill="none" stroke={theme.primary} strokeWidth="0.8" opacity="0.75" />

          {/* 32 Inner Vernier Radial Tick Lines */}
          {[...Array(32)].map((_, i) => {
            const angle = (i * 360) / 32;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 4 === 0;
            const rStart = isMajor ? 82 : 88;
            const rEnd = 94;

            const x1 = 250 + Math.cos(rad) * rStart;
            const y1 = 250 + Math.sin(rad) * rStart;
            const x2 = 250 + Math.cos(rad) * rEnd;
            const y2 = 250 + Math.sin(rad) * rEnd;

            return (
              <line
                key={`inner-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#ffffff' : theme.accent}
                strokeWidth={isMajor ? 1.4 : 0.8}
                opacity={isMajor ? 0.95 : 0.75}
              />
            );
          })}

          {/* 8 Mechanical Vernier Spoke Markers on Inner Dial */}
          {[...Array(8)].map((_, i) => (
            <g key={`inner-spoke-${i}`} transform={`translate(250, 250) rotate(${i * 45})`}>
              <circle cx="0" cy="-88" r="1.4" fill="#ffffff" filter="url(#core-emerald-glow-shiny)" />
              <line x1="0" y1="-82" x2="0" y2="-76" stroke="#ffffff" strokeWidth="1.2" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 7. INNER RADIANT GLOWING LIME TORUS & SINGULARITY VOID   */}
        {/* ======================================================== */}
        <circle cx="250" cy="250" r="76" fill="none" stroke="#ffffff" strokeWidth="2.4" opacity="0.95" />
        <circle
          cx="250"
          cy="250"
          r="76"
          fill="none"
          stroke={theme.accent}
          strokeWidth="6.0"
          filter="url(#core-emerald-glow-shiny)"
          opacity="0.9"
        />

        {/* Pitch-Black Central Singularity Void */}
        <circle cx="250" cy="250" r="66" fill="#010402" />
        <circle cx="250" cy="250" r="54" fill="#000000" />

        {/* Steady White Center Focal Point */}
        <circle cx="250" cy="250" r="1.6" fill="#ffffff" />

        {/* ======================================================== */}
        {/* 8. 3D CONVEX WET CRYSTAL GLASS DOME OVERLAY              */}
        {/* ======================================================== */}
        <circle cx="250" cy="250" r="214" fill="url(#glass-spherical-dome-wet)" pointerEvents="none" />

        <circle cx="250" cy="250" r="213" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.75" pointerEvents="none" />
        <circle cx="250" cy="250" r="210" fill="none" stroke={theme.accent} strokeWidth="0.8" opacity="0.45" pointerEvents="none" />

        {/* TOP-RIGHT HIGH-CONTRAST CRESCENT SPECULAR GLARE REFLECTION */}
        <path
          d="M 235 52 A 192 192 0 0 1 442 235"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6.0"
          strokeLinecap="round"
          filter="url(#core-emerald-glow-shiny)"
          opacity="0.95"
          pointerEvents="none"
        />
        <path
          d="M 246 55 A 192 192 0 0 1 434 226"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="1.0"
          pointerEvents="none"
        />

        {/* Soft Secondary Specular Glint Across Upper Dome */}
        <path
          d="M 145 125 Q 250 65 355 125 Q 250 90 145 125 Z"
          fill="url(#specular-glare-sheen-wet)"
          opacity="0.45"
          pointerEvents="none"
        />

        {/* Lower-Left Subtle Fresnel Reflection Arc */}
        <path
          d="M 85 315 A 192 192 0 0 0 215 445"
          fill="none"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="2.2"
          strokeLinecap="round"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};
