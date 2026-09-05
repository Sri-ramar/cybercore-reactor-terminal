import React from 'react';

/**
 * High-Fidelity Botanical Components for the Bio-Terrarium
 * Includes:
 * - Master multi-stop botanical chloroplast gradients (sunlit lime to deep forest emerald)
 * - Photorealistic mature ivy leaves with organic asymmetry, veins, and specular sheen
 * - 3D folded, curled, and hanging leaves
 * - Detailed botanical fern fronds with pinnatifid leaflets
 * - Volumetric velvet moss cushions with stippled sporophytes
 * - Gnarled woody vines with bark shading and coiling tendrils
 * - Micro-sprouts growing out of wooden conduit joints
 */

export const BotanicalDefs: React.FC = () => (
  <>
    {/* Contact Ambient Occlusion & Soft Depth Shadows */}
    <filter id="foliage-soft-ao" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.95" />
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
    </filter>

    <filter id="foliage-heavy-drop" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="4" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.98" />
      <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.9" />
    </filter>

    {/* Chlorophyll Gradients */}
    <linearGradient id="leaf-sunlit-lush" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stopColor="#a8f53b" />
      <stop offset="25%" stopColor="#6dc822" />
      <stop offset="65%" stopColor="#357c15" />
      <stop offset="100%" stopColor="#143808" />
    </linearGradient>

    <linearGradient id="leaf-deep-emerald" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stopColor="#58ad22" />
      <stop offset="40%" stopColor="#307213" />
      <stop offset="80%" stopColor="#18420b" />
      <stop offset="100%" stopColor="#0b2005" />
    </linearGradient>

    <linearGradient id="leaf-young-sprout" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#edff85" />
      <stop offset="40%" stopColor="#96f028" />
      <stop offset="80%" stopColor="#4c9215" />
      <stop offset="100%" stopColor="#1c4208" />
    </linearGradient>

    <linearGradient id="leaf-folded-3d" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#9df034" />
      <stop offset="48%" stopColor="#5cb81e" />
      <stop offset="52%" stopColor="#24520e" />
      <stop offset="100%" stopColor="#102806" />
    </linearGradient>

    <linearGradient id="fern-pinna-grad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stopColor="#92f533" />
      <stop offset="35%" stopColor="#4c9818" />
      <stop offset="75%" stopColor="#24540d" />
      <stop offset="100%" stopColor="#0e2406" />
    </linearGradient>

    <radialGradient id="moss-nodule-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#8ce632" />
      <stop offset="35%" stopColor="#4e911c" />
      <stop offset="70%" stopColor="#25520d" />
      <stop offset="100%" stopColor="#0a1b04" />
    </radialGradient>

    <linearGradient id="woody-bark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#5c4428" />
      <stop offset="35%" stopColor="#3e2d19" />
      <stop offset="75%" stopColor="#261a0d" />
      <stop offset="100%" stopColor="#100b05" />
    </linearGradient>
  </>
);

/**
 * Realistic Mature Ivy Leaf with Natural Contour & Veins
 */
export const MatureIvyLeaf: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  variant?: 'sunlit' | 'deep' | 'young';
  opacity?: number;
}> = ({ x, y, rot = 0, scale = 1, variant = 'sunlit', opacity = 1 }) => {
  const grad =
    variant === 'sunlit'
      ? 'url(#leaf-sunlit-lush)'
      : variant === 'young'
      ? 'url(#leaf-young-sprout)'
      : 'url(#leaf-deep-emerald)';

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
      filter="url(#foliage-soft-ao)"
      opacity={opacity}
    >
      {/* Petiole (Stem) */}
      <path d="M 0 24 Q -3 32 -7 38" fill="none" stroke="#253e0f" strokeWidth="1.6" strokeLinecap="round" />

      {/* Asymmetric 5-Lobed Leaf Blade */}
      <path
        d="M 0 -28 
           C 6 -22, 13 -16, 19 -18 
           C 25 -13, 30 -4, 28 7 
           C 26 14, 21 18, 14 20 
           C 9 21, 4 23, 0 24 
           C -4 23, -9 21, -15 19 
           C -22 17, -27 12, -28 5 
           C -29 -5, -23 -14, -18 -18 
           C -12 -16, -6 -22, 0 -28 Z"
        fill={grad}
        stroke="#1a3b0a"
        strokeWidth="0.8"
      />

      {/* Primary & Secondary Veins */}
      <g stroke="#b8ff66" strokeWidth="0.7" strokeLinecap="round" opacity="0.6">
        <path d="M 0 24 Q 0 0 0 -26" />
        <path d="M 0 10 Q 8 -2 18 -17" />
        <path d="M 0 14 Q 12 10 26 6" />
        <path d="M 0 10 Q -8 -2 -17 -17" />
        <path d="M 0 14 Q -12 9 -26 4" />
      </g>

      {/* Specular Highlight Sheen */}
      <path
        d="M -2 -18 C 4 -14, 8 -8, 8 2 C 8 8, 4 14, 0 16 C 1 8, 1 -8, -2 -18 Z"
        fill="#ffffff"
        opacity="0.2"
      />
    </g>
  );
};

/**
 * 3D Folded / Curled Leaf
 */
export const FoldedCurledLeaf: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  bend?: number;
}> = ({ x, y, rot = 0, scale = 1, bend = 0 }) => {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
      filter="url(#foliage-soft-ao)"
    >
      <path d="M 0 20 Q -2 28 -5 32" fill="none" stroke="#253e0f" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M 0 -22 
           C 10 -15, 18 -5, 16 8 
           C 14 16, 8 19, 0 20 
           C -6 19, -12 15, -14 7 
           C -16 -4, -9 -14, 0 -22 Z"
        fill="url(#leaf-folded-3d)"
        stroke="#1a3b0a"
        strokeWidth="0.8"
      />
      <path d={`M 0 20 Q ${bend} 0 0 -21`} fill="none" stroke="#24520e" strokeWidth="1.2" />
      <path d={`M 0 20 Q ${bend} 0 0 -21`} fill="none" stroke="#b5ff60" strokeWidth="0.5" opacity="0.65" />
    </g>
  );
};

/**
 * Drooping Hanging Leaf
 */
export const DroopingLeaf: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  length?: number;
}> = ({ x, y, rot = 0, scale = 1, length = 24 }) => {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
      filter="url(#foliage-soft-ao)"
    >
      <path d="M 0 0 Q 2 6 3 10" fill="none" stroke="#253e0f" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d={`M 3 10 
            C 8 14, 12 20, 10 ${length + 10} 
            C 8 ${length + 20}, 4 ${length + 24}, 0 ${length + 28} 
            C -4 ${length + 24}, -8 ${length + 20}, -9 ${length + 10} 
            C -10 20, -5 14, 3 10 Z`}
        fill="url(#leaf-sunlit-lush)"
        stroke="#183809"
        strokeWidth="0.8"
      />
      <path d={`M 3 10 Q 0 ${length + 10} 0 ${length + 27}`} fill="none" stroke="#b8ff66" strokeWidth="0.6" opacity="0.55" />
    </g>
  );
};

/**
 * Highly Detailed Botanical Fern Frond
 */
export const BotanicalFernFrond: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  pinnaeCount?: number;
}> = ({ x, y, rot = 0, scale = 1, pinnaeCount = 12 }) => {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}
      filter="url(#foliage-soft-ao)"
    >
      {/* Central Curved Rachis */}
      <path
        d="M 0 120 Q 20 60 50 0"
        fill="none"
        stroke="#2c4e14"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 0 120 Q 20 60 50 0"
        fill="none"
        stroke="#82ea2a"
        strokeWidth="0.7"
        opacity="0.65"
      />

      {/* Lateral Pinnae Pairs with Pinatifid Serrations */}
      {[...Array(pinnaeCount)].map((_, i) => {
        const t = (i + 1) / (pinnaeCount + 1);
        const px = 0 * (1 - t) * (1 - t) + 2 * 20 * (1 - t) * t + 50 * t * t;
        const py = 120 * (1 - t) * (1 - t) + 2 * 60 * (1 - t) * t + 0 * t * t;
        const pSize = (1 - t * 0.62) * 26;

        return (
          <g key={`fern-pinna-${i}`} transform={`translate(${px}, ${py})`}>
            {/* Right Pinna */}
            <path
              d={`M 0 0 C 10 -4, ${pSize} -3, ${pSize + 5} 5 C ${pSize} 8, 8 5, 0 0 Z`}
              fill="url(#fern-pinna-grad)"
              stroke="#163209"
              strokeWidth="0.6"
            />
            {/* Left Pinna */}
            <path
              d={`M 0 0 C -10 -4, -${pSize} -3, -${pSize + 5} 5 C -${pSize} 8, -8 5, 0 0 Z`}
              fill="url(#fern-pinna-grad)"
              stroke="#163209"
              strokeWidth="0.6"
            />
          </g>
        );
      })}
    </g>
  );
};

/**
 * Volumetric Velvet Moss Cushion with Sporophyte Stalks
 */
export const VolumetricMossCushion: React.FC<{
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  density?: number;
  withSporophytes?: boolean;
}> = ({ cx, cy, rx, ry, density = 16, withSporophytes = true }) => {
  return (
    <g transform={`translate(${cx}, ${cy})`} filter="url(#foliage-soft-ao)">
      {/* Dark Contact Base Cushion */}
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="#0d2609" opacity="0.95" />

      {/* Overlapping Volumetric Nodules */}
      {[...Array(density)].map((_, i) => {
        const angle = (i * 137.5 * Math.PI) / 180;
        const dist = Math.sqrt((i + 0.5) / density);
        const noduleX = Math.cos(angle) * rx * dist * 0.85;
        const noduleY = Math.sin(angle) * ry * dist * 0.85;
        const noduleR = (1 - dist * 0.45) * (rx / 4.5);

        return (
          <circle
            key={`moss-nodule-${i}`}
            cx={noduleX}
            cy={noduleY}
            r={Math.max(2.5, noduleR)}
            fill="url(#moss-nodule-grad)"
            opacity="0.96"
          />
        );
      })}

      {/* Delicate Sporophyte Stalks & Spore Capsules */}
      {withSporophytes &&
        [...Array(6)].map((_, i) => {
          const sx = (i - 2.5) * (rx / 3.8);
          const sy = (Math.sin(i * 1.5) * ry) / 2.8;
          return (
            <g key={`sporophyte-${i}`} transform={`translate(${sx}, ${sy})`}>
              <path d="M 0 0 Q -2 -11 1 -18" fill="none" stroke="#6eb028" strokeWidth="0.8" />
              <ellipse cx="1.5" cy="-19" rx="1.6" ry="2.4" fill="#c8ff72" stroke="#2d620d" strokeWidth="0.4" />
            </g>
          );
        })}
    </g>
  );
};

/**
 * Coiling Tendril
 */
export const CoilingTendril: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  coilDir?: 'cw' | 'ccw';
}> = ({ x, y, rot = 0, scale = 1, coilDir = 'cw' }) => {
  const dirMultiplier = coilDir === 'cw' ? 1 : -1;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
      <path
        d={`M 0 0 
            Q ${10 * dirMultiplier} 10, ${18 * dirMultiplier} 8 
            T ${26 * dirMultiplier} 16 
            Q ${30 * dirMultiplier} 24, ${24 * dirMultiplier} 28 
            Q ${18 * dirMultiplier} 30, ${18 * dirMultiplier} 24 
            Q ${18 * dirMultiplier} 18, ${24 * dirMultiplier} 18`}
        fill="none"
        stroke="#529c1a"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx={24 * dirMultiplier} cy="18" r="1.6" fill="#a8ff4e" />
    </g>
  );
};

/**
 * Dense Natural Vine & Foliage Cluster
 */
export const NaturalVineCluster: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
}> = ({ x, y, rot = 0, scale = 1 }) => {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
      {/* Intertwined Woody Vines */}
      <path
        d="M -55 22 Q -22 -16 22 -6 T 65 -28"
        fill="none"
        stroke="url(#woody-bark-grad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        filter="url(#foliage-heavy-drop)"
      />
      <path
        d="M -38 32 Q 0 0 38 16 T 80 -12"
        fill="none"
        stroke="url(#woody-bark-grad)"
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Layer 1: Background Shaded Leaves */}
      <MatureIvyLeaf x={-40} y={6} rot={-35} scale={0.85} variant="deep" opacity={0.92} />
      <MatureIvyLeaf x={32} y={-10} rot={45} scale={0.8} variant="deep" opacity={0.92} />
      <MatureIvyLeaf x={58} y={-26} rot={-15} scale={0.7} variant="deep" opacity={0.88} />

      {/* Layer 2: Main Sunlit Leaves */}
      <MatureIvyLeaf x={-16} y={-14} rot={15} scale={1.1} variant="sunlit" />
      <MatureIvyLeaf x={12} y={-3} rot={-20} scale={1.0} variant="sunlit" />
      <FoldedCurledLeaf x={-44} y={24} rot={60} scale={0.9} bend={3} />
      <FoldedCurledLeaf x={45} y={12} rot={-45} scale={0.85} bend={-3} />

      {/* Layer 3: Young Sprout Highlights & Drooping Leaves */}
      <MatureIvyLeaf x={-3} y={16} rot={120} scale={0.75} variant="young" />
      <DroopingLeaf x={28} y={20} rot={-10} scale={0.8} length={24} />
      <DroopingLeaf x={-28} y={26} rot={20} scale={0.75} length={22} />

      {/* Coiling Tendrils */}
      <CoilingTendril x={66} y={-32} rot={-40} scale={0.75} coilDir="cw" />
      <CoilingTendril x={-52} y={28} rot={135} scale={0.65} coilDir="ccw" />
    </g>
  );
};

/**
 * Micro-Sprout Cluster (Growing directly at conduit joints)
 */
export const ConduitSprout: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
}> = ({ x, y, rot = 0, scale = 1 }) => {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
      <MatureIvyLeaf x={-5} y={0} rot={-32} scale={0.42} variant="young" />
      <MatureIvyLeaf x={5} y={0} rot={32} scale={0.42} variant="young" />
      <FoldedCurledLeaf x={0} y={-5} rot={0} scale={0.48} bend={0} />
    </g>
  );
};
