import React, { memo } from 'react';
import { ThemeConfig } from '../../types';
import { FoliageSprayItem, DEFAULT_FOLIAGE_LAYOUT } from '../../data/defaultFoliageLayout';

interface ProceduralBotanicalEngineProps {
  theme: ThemeConfig;
  layer?: 'back' | 'front' | 'both';
  foliageList?: FoliageSprayItem[];
}

export type LeafShadeVariant = 'deep-shade' | 'mature-olive' | 'sunlit-emerald' | 'young-chartreuse' | 'golden-russet';

export const RealCreviceMossPatch: React.FC<{ cx: number; cy: number; rx: number; ry: number; density?: number }> = ({ cx, cy, rx, ry }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0a2206" opacity={0.75} />
);

// 1. Single Photorealistic Tree Leaf (Instanced from GPU VRAM Geometry Cache)
export const TreeBranchLeaf: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  variant?: LeafShadeVariant;
  flip?: boolean;
  animGroup?: 'a' | 'b' | 'c' | 'd';
}> = memo(({ x, y, rot = 0, scale = 1, variant = 'mature-olive', flip = false, animGroup = 'a' }) => (
  <g
    transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale * (flip ? -1 : 1)}, ${scale})`}
    className="pointer-events-none select-none"
  >
    <g className={`gpu-leaf-sway-${animGroup}`}>
      <use href={`#tpl-leaf-${variant}`} />
    </g>
  </g>
));

export const RealIvyLeaf = TreeBranchLeaf;
export const CordateHeartLeaf = TreeBranchLeaf;
export const OvalLanceolateLeaf = TreeBranchLeaf;

// 2. High-Density Canopy Foliage Spray (Structured for True Back/Front Z-Occlusion)
export const DenseCanopySpray: React.FC<{
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  density?: 'medium' | 'dense' | 'ultra';
  flip?: boolean;
  layer?: 'back' | 'front' | 'both';
}> = memo(({ x, y, rot = 0, scale = 1, density = 'dense', flip = false, layer = 'both' }) => {
  // Leaves sorted cleanly into Back Layer (Bulk dense body) vs Front Layer (Delicate overlapping tips)
  const backLeaves: { dx: number; dy: number; r: number; s: number; v: LeafShadeVariant; grp: 'a' | 'b' | 'c' | 'd' }[] = [
    // 1. Deep Shade Understory
    { dx: -12, dy: 6, r: -48, s: 0.92, v: 'deep-shade', grp: 'a' },
    { dx: 14, dy: 8, r: 52, s: 0.92, v: 'deep-shade', grp: 'b' },
    { dx: 0, dy: 14, r: 6, s: 0.98, v: 'deep-shade', grp: 'c' },
    { dx: -24, dy: 16, r: -72, s: 0.85, v: 'deep-shade', grp: 'd' },
    { dx: 26, dy: 14, r: 70, s: 0.85, v: 'deep-shade', grp: 'a' },

    // 2. Mid-Tier Mature Olive Body (Lives cleanly in back layer behind circuits)
    { dx: -18, dy: -6, r: -32, s: 1.05, v: 'mature-olive', grp: 'b' },
    { dx: 18, dy: -4, r: 36, s: 1.05, v: 'mature-olive', grp: 'c' },
    { dx: -6, dy: -14, r: -14, s: 1.08, v: 'mature-olive', grp: 'd' },
    { dx: 8, dy: -12, r: 18, s: 1.08, v: 'mature-olive', grp: 'a' },
    { dx: -28, dy: 4, r: -58, s: 0.95, v: 'mature-olive', grp: 'b' },
    { dx: 30, dy: 2, r: 64, s: 0.95, v: 'mature-olive', grp: 'c' },
    { dx: -15, dy: -35, r: -32, s: 0.82, v: 'golden-russet', grp: 'd' },
    { dx: 16, dy: -34, r: 30, s: 0.82, v: 'golden-russet', grp: 'a' },
  ];

  // Foreground Canopy Highlights (Only 3-4 delicate leaves that gently cross circuit edges)
  const frontLeaves: { dx: number; dy: number; r: number; s: number; v: LeafShadeVariant; grp: 'a' | 'b' | 'c' | 'd' }[] = [
    { dx: -10, dy: -24, r: -22, s: 0.95, v: 'sunlit-emerald', grp: 'd' },
    { dx: 12, dy: -22, r: 24, s: 0.95, v: 'sunlit-emerald', grp: 'a' },
    { dx: 0, dy: -32, r: 0, s: 0.98, v: 'sunlit-emerald', grp: 'b' },
    { dx: 0, dy: -46, r: 2, s: 0.76, v: 'young-chartreuse', grp: 'c' },
  ];

  const activeLeaves =
    layer === 'back'
      ? (density === 'medium' ? backLeaves.slice(0, 8) : backLeaves)
      : layer === 'front'
      ? (density === 'medium' ? frontLeaves.slice(0, 2) : frontLeaves)
      : [...backLeaves, ...frontLeaves];

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale * (flip ? -1 : 1)}, ${scale})`} className="pointer-events-none select-none">
      {/* Central Woody Spray Node Twig with GPU Hardware-Accelerated Bough Undulation */}
      {(layer === 'back' || layer === 'both') && (
        <g className="gpu-twig-sway">
          <path d="M 0 16 Q -1 0 0 -24" fill="none" stroke="#1c1006" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 0 16 Q -1 0 0 -24" fill="none" stroke="#483018" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )}

      {activeLeaves.map((l, i) => (
        <TreeBranchLeaf
          key={`spray-leaf-${i}`}
          x={l.dx}
          y={l.dy}
          rot={l.r}
          scale={l.s}
          variant={l.v}
          animGroup={l.grp}
        />
      ))}
    </g>
  );
});

// 3. Agricultural Spherical Green Bio-Berries (Nestled in Branch Forks)
export const AgriBerryPodCluster: React.FC<{
  x: number;
  y: number;
  scale?: number;
}> = memo(({ x, y, scale = 1 }) => {
  const berries = [
    { cx: -18, cy: 4, r: 6.5 },
    { cx: -10, cy: -5, r: 7.8 },
    { cx: -4, cy: 7, r: 8.2 },
    { cx: 4, cy: -6, r: 8.5 },
    { cx: 8, cy: 5, r: 8.0 },
    { cx: 16, cy: -3, r: 7.2 },
    { cx: -14, cy: 12, r: 6.8 },
    { cx: 0, cy: 2, r: 9.0 },
    { cx: 12, cy: 8, r: 7.2 },
  ];

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} className="pointer-events-none select-none">
      <ellipse cx="0" cy="4" rx="28" ry="14" fill="#040e04" opacity={0.65} />
      {berries.map((b, i) => (
        <g key={`berry-${i}`}>
          <path d={`M ${b.cx} ${b.cy} Q ${b.cx + 2} ${b.cy - 6} ${b.cx + 3} ${b.cy - 10}`} fill="none" stroke="#4a8614" strokeWidth="0.8" />
          <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#agri-berry-3d-grad)" stroke="#0e2808" strokeWidth="0.4" />
          <circle cx={b.cx - b.r * 0.35} cy={b.cy - b.r * 0.35} r={b.r * 0.28} fill="#ffffff" opacity="0.85" />
        </g>
      ))}
    </g>
  );
});

// 4. Main Woody Spine Bark
export const MainWoodyBoughSpine: React.FC<{ spinePath: string }> = memo(({ spinePath }) => (
  <g>
    <path d={spinePath} fill="none" stroke="rgba(0,0,0,0.65)" strokeWidth="8.0" strokeLinecap="round" strokeLinejoin="round" transform="translate(2, 4)" />
    <path d={spinePath} fill="none" stroke="#160c04" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d={spinePath} fill="none" stroke="#382210" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d={spinePath} fill="none" stroke="#684624" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
  </g>
));

export const ProceduralBotanicalEngine: React.FC<ProceduralBotanicalEngineProps> = memo(({
  theme,
  layer = 'both',
  foliageList = DEFAULT_FOLIAGE_LAYOUT,
}) => {
  const showBack = layer === 'back' || layer === 'both';
  const showFront = layer === 'front' || layer === 'both';

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${layer === 'front' ? 'z-18' : 'z-10'}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* 1. DEEP SHADE (Background Layer Foliage - Dark Forest Emerald) */}
        <linearGradient id="tree-leaf-deep-shade" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#1e5210" />
          <stop offset="40%" stopColor="#103608" />
          <stop offset="80%" stopColor="#082004" />
          <stop offset="100%" stopColor="#030c02" />
        </linearGradient>
        <linearGradient id="tree-vein-deep-shade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3c8218" />
          <stop offset="60%" stopColor="#245a0e" />
          <stop offset="100%" stopColor="#103206" />
        </linearGradient>

        {/* 2. MATURE OLIVE (Mid-Tonal Foliage - Rich Chlorophyll) */}
        <linearGradient id="tree-leaf-mature-olive" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#58a816" />
          <stop offset="35%" stopColor="#3c800e" />
          <stop offset="75%" stopColor="#225408" />
          <stop offset="100%" stopColor="#0e2c04" />
        </linearGradient>
        <linearGradient id="tree-vein-mature-olive" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#96ea34" />
          <stop offset="60%" stopColor="#62b41c" />
          <stop offset="100%" stopColor="#326c0c" />
        </linearGradient>

        {/* 3. SUNLIT EMERALD (Foreground Vibrant Blades) */}
        <linearGradient id="tree-leaf-sunlit-emerald" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#8ee828" />
          <stop offset="35%" stopColor="#5ec216" />
          <stop offset="75%" stopColor="#368c0c" />
          <stop offset="100%" stopColor="#164e06" />
        </linearGradient>
        <linearGradient id="tree-vein-sunlit-emerald" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2ff78" />
          <stop offset="60%" stopColor="#aff038" />
          <stop offset="100%" stopColor="#64ba18" />
        </linearGradient>

        {/* 4. YOUNG CHARTREUSE (Fresh Glowing Tip Leaflets) */}
        <linearGradient id="tree-leaf-young-chartreuse" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#d8ff5c" />
          <stop offset="35%" stopColor="#a8f428" />
          <stop offset="70%" stopColor="#64b010" />
          <stop offset="100%" stopColor="#286808" />
        </linearGradient>
        <linearGradient id="tree-vein-young-chartreuse" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e4ff88" />
          <stop offset="100%" stopColor="#9ae820" />
        </linearGradient>

        {/* 5. GOLDEN RUSSET (Warm Sun-Bleached Solar Tint) */}
        <linearGradient id="tree-leaf-golden-russet" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#d8da32" />
          <stop offset="35%" stopColor="#98a816" />
          <stop offset="75%" stopColor="#586c0c" />
          <stop offset="100%" stopColor="#283404" />
        </linearGradient>
        <linearGradient id="tree-vein-golden-russet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffff98" />
          <stop offset="60%" stopColor="#d4da38" />
          <stop offset="100%" stopColor="#829612" />
        </linearGradient>

        {/* Specular Waxy Sheen */}
        <linearGradient id="tree-leaf-glint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>

        {/* 3D Green Bio-Berries */}
        <radialGradient id="agri-berry-3d-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e2ff78" />
          <stop offset="25%" stopColor="#9ee824" />
          <stop offset="60%" stopColor="#48a80c" />
          <stop offset="90%" stopColor="#1c5406" />
          <stop offset="100%" stopColor="#082202" />
        </radialGradient>

        {/* GPU VRAM MASTER LEAF TEMPLATES (Parsed ONCE in GPU memory) */}
        {(['deep-shade', 'mature-olive', 'sunlit-emerald', 'young-chartreuse', 'golden-russet'] as LeafShadeVariant[]).map((v) => {
          const isBack = v === 'deep-shade';
          return (
            <g id={`tpl-leaf-${v}`} key={`tpl-${v}`} opacity={isBack ? 0.85 : 1.0}>
              <path d="M 0 0 C -10 -7, -14 -22, 0 -38 C 14 -22, 10 -7, 0 0 Z" fill="rgba(0, 0, 0, 0.55)" transform="translate(1.8, 3.2)" />
              <path d="M 0 11 Q -0.5 5 0 0" fill="none" stroke="#221608" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 0 11 Q -0.5 5 0 0" fill="none" stroke="#486e18" strokeWidth="0.8" strokeLinecap="round" />
              <path
                d="M 0 0 C -11 -6, -15 -18, -12 -30 C -9 -37, -3 -43, 0 -47 C 3 -43, 9 -37, 12 -30 C 15 -18, 11 -6, 0 0 Z"
                fill={`url(#tree-leaf-${v})`}
                stroke={isBack ? '#040e02' : '#0a1a04'}
                strokeWidth="0.5"
              />
              <path d="M 0 0 Q -0.5 -24 0 -45" fill="none" stroke={`url(#tree-vein-${v})`} strokeWidth="0.95" strokeLinecap="round" />
              <path d="M 0 0 Q -0.5 -24 0 -45" fill="none" stroke="#ffffff" strokeWidth="0.25" opacity="0.45" />
              <path d="M 0 -9 Q -5 -15 -10 -22" fill="none" stroke={`url(#tree-vein-${v})`} strokeWidth="0.6" opacity="0.85" />
              <path d="M 0 -9 Q 5 -15 10 -22" fill="none" stroke={`url(#tree-vein-${v})`} strokeWidth="0.85" opacity="0.85" />
              <path d="M 0 -20 Q -4 -25 -9 -32" fill="none" stroke={`url(#tree-vein-${v})`} strokeWidth="0.55" opacity="0.8" />
              <path d="M 0 -20 Q 4 -25 9 -32" fill="none" stroke={`url(#tree-vein-${v})`} strokeWidth="0.55" opacity="0.8" />
              {!isBack && (
                <path
                  d="M -1 -8 C -4 -16, -9 -24, -7 -32 C -5 -38, -2 -42, 0 -44 C -2 -39, -5 -27, -1 -8 Z"
                  fill="url(#tree-leaf-glint)"
                  opacity="0.4"
                />
              )}
            </g>
          );
        })}
      </defs>

      {/* 1. Main Woody Spines (Rendered in Back Layer behind hardware) */}
      {showBack && (
        <g className="pointer-events-none select-none">
          <MainWoodyBoughSpine spinePath="M 0 45 Q 220 65 440 90 T 780 135" />
          <MainWoodyBoughSpine spinePath="M 460 170 Q 590 180 720 170 T 820 130" />
          <MainWoodyBoughSpine spinePath="M 1600 35 Q 1380 55 1180 85 T 880 120" />
          <MainWoodyBoughSpine spinePath="M 940 300 Q 1060 260 1180 225 T 1320 220" />
          <MainWoodyBoughSpine spinePath="M 0 340 Q 160 305 320 310 T 640 375" />
          <MainWoodyBoughSpine spinePath="M 640 540 Q 480 600 320 625 T 60 780" />
          <MainWoodyBoughSpine spinePath="M 1600 520 Q 1360 550 1140 540 T 920 525" />
          <MainWoodyBoughSpine spinePath="M 680 730 Q 940 755 1200 765 T 1500 780" />
        </g>
      )}

      {/* 2. Dynamic Foliage Sprays (User Layout with Live Positioning) */}
      {foliageList.map((spray) => (
        <DenseCanopySpray
          key={spray.id}
          x={spray.x}
          y={spray.y}
          rot={spray.rot}
          scale={spray.scale}
          density={spray.density}
          flip={spray.flip}
          layer={layer}
        />
      ))}

      {/* 3. Static Bio-Berries in Key Branch Forks */}
      {showFront && (
        <>
          <AgriBerryPodCluster x={275} y={76} scale={0.85} />
          <AgriBerryPodCluster x={1325} y={72} scale={0.85} />
          <AgriBerryPodCluster x={375} y={325} scale={0.8} />
          <AgriBerryPodCluster x={1285} y={552} scale={0.9} />
          <AgriBerryPodCluster x={1045} y={538} scale={0.82} />
          <AgriBerryPodCluster x={1185} y={768} scale={0.82} />
        </>
      )}
    </svg>
  );
});
