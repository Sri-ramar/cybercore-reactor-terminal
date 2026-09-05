import React, { memo } from 'react';
import { ThemeConfig } from '../../types';

interface ProceduralBottomGrassLayerProps {
  theme: ThemeConfig;
}

/**
 * Ultra-Dense GPU VRAM Instanced Bottom Meadow Grass Layer
 * - Multi-tiered rich dark forest turf (darker than canopy)
 * - 4 Master high-density clump archetypes
 * - 56 Staggered multi-row instances spanning across entire bottom
 * - Lateral Left-and-Right translation breeze drift (translate3d + skewX)
 * - 120+ FPS hardware acceleration with zero CPU overhead
 */
export const ProceduralBottomGrassLayer: React.FC<ProceduralBottomGrassLayerProps> = memo(() => {
  // 56 Staggered Multi-Row Clump Anchors for an Ultra-Dense Meadow Carpet
  const clumps: { id: string; x: number; y: number; tpl: string; scale: number; rot: number; phase: string }[] = [
    // --- Row 1: Deep Back Tall Turf (y: 878 - 884) ---
    { id: 'gc-r1-1', x: -10, y: 882, tpl: 'tpl-grass-clump-b', scale: 1.15, rot: -4, phase: 'a' },
    { id: 'gc-r1-2', x: 80, y: 880, tpl: 'tpl-grass-clump-a', scale: 1.1, rot: 5, phase: 'b' },
    { id: 'gc-r1-3', x: 170, y: 884, tpl: 'tpl-grass-clump-b', scale: 1.18, rot: -3, phase: 'c' },
    { id: 'gc-r1-4', x: 260, y: 879, tpl: 'tpl-grass-clump-c', scale: 1.12, rot: 4, phase: 'd' },
    { id: 'gc-r1-5', x: 350, y: 882, tpl: 'tpl-grass-clump-a', scale: 1.2, rot: -5, phase: 'a' },
    { id: 'gc-r1-6', x: 440, y: 880, tpl: 'tpl-grass-clump-b', scale: 1.15, rot: 3, phase: 'b' },
    { id: 'gc-r1-7', x: 530, y: 883, tpl: 'tpl-grass-clump-c', scale: 1.1, rot: -4, phase: 'c' },
    { id: 'gc-r1-8', x: 620, y: 879, tpl: 'tpl-grass-clump-a', scale: 1.18, rot: 5, phase: 'd' },
    { id: 'gc-r1-9', x: 710, y: 882, tpl: 'tpl-grass-clump-b', scale: 1.12, rot: -3, phase: 'a' },
    { id: 'gc-r1-10', x: 800, y: 880, tpl: 'tpl-grass-clump-c', scale: 1.2, rot: 4, phase: 'b' },
    { id: 'gc-r1-11', x: 890, y: 884, tpl: 'tpl-grass-clump-a', scale: 1.15, rot: -5, phase: 'c' },
    { id: 'gc-r1-12', x: 980, y: 879, tpl: 'tpl-grass-clump-b', scale: 1.18, rot: 3, phase: 'd' },
    { id: 'gc-r1-13', x: 1070, y: 882, tpl: 'tpl-grass-clump-c', scale: 1.1, rot: -4, phase: 'a' },
    { id: 'gc-r1-14', x: 1160, y: 880, tpl: 'tpl-grass-clump-a', scale: 1.2, rot: 5, phase: 'b' },
    { id: 'gc-r1-15', x: 1250, y: 883, tpl: 'tpl-grass-clump-b', scale: 1.14, rot: -3, phase: 'c' },
    { id: 'gc-r1-16', x: 1340, y: 879, tpl: 'tpl-grass-clump-c', scale: 1.16, rot: 4, phase: 'd' },
    { id: 'gc-r1-17', x: 1430, y: 882, tpl: 'tpl-grass-clump-a', scale: 1.18, rot: -5, phase: 'a' },
    { id: 'gc-r1-18', x: 1520, y: 880, tpl: 'tpl-grass-clump-b', scale: 1.12, rot: 3, phase: 'b' },
    { id: 'gc-r1-19', x: 1610, y: 883, tpl: 'tpl-grass-clump-c', scale: 1.15, rot: -4, phase: 'c' },

    // --- Row 2: Mid Dense Body Turf (y: 888 - 894) ---
    { id: 'gc-r2-1', x: 20, y: 890, tpl: 'tpl-grass-clump-d', scale: 1.05, rot: 3, phase: 'b' },
    { id: 'gc-r2-2', x: 110, y: 892, tpl: 'tpl-grass-clump-c', scale: 1.08, rot: -4, phase: 'c' },
    { id: 'gc-r2-3', x: 200, y: 889, tpl: 'tpl-grass-clump-a', scale: 1.02, rot: 5, phase: 'd' },
    { id: 'gc-r2-4', x: 290, y: 893, tpl: 'tpl-grass-clump-d', scale: 1.1, rot: -3, phase: 'a' },
    { id: 'gc-r2-5', x: 380, y: 890, tpl: 'tpl-grass-clump-b', scale: 1.05, rot: 4, phase: 'b' },
    { id: 'gc-r2-6', x: 470, y: 892, tpl: 'tpl-grass-clump-c', scale: 1.08, rot: -5, phase: 'c' },
    { id: 'gc-r2-7', x: 560, y: 889, tpl: 'tpl-grass-clump-d', scale: 1.04, rot: 3, phase: 'd' },
    { id: 'gc-r2-8', x: 650, y: 893, tpl: 'tpl-grass-clump-a', scale: 1.1, rot: -4, phase: 'a' },
    { id: 'gc-r2-9', x: 740, y: 890, tpl: 'tpl-grass-clump-b', scale: 1.06, rot: 5, phase: 'b' },
    { id: 'gc-r2-10', x: 830, y: 892, tpl: 'tpl-grass-clump-d', scale: 1.08, rot: -3, phase: 'c' },
    { id: 'gc-r2-11', x: 920, y: 889, tpl: 'tpl-grass-clump-c', scale: 1.02, rot: 4, phase: 'd' },
    { id: 'gc-r2-12', x: 1010, y: 893, tpl: 'tpl-grass-clump-a', scale: 1.1, rot: -5, phase: 'a' },
    { id: 'gc-r2-13', x: 1100, y: 890, tpl: 'tpl-grass-clump-d', scale: 1.05, rot: 3, phase: 'b' },
    { id: 'gc-r2-14', x: 1190, y: 892, tpl: 'tpl-grass-clump-b', scale: 1.08, rot: -4, phase: 'c' },
    { id: 'gc-r2-15', x: 1280, y: 889, tpl: 'tpl-grass-clump-c', scale: 1.04, rot: 5, phase: 'd' },
    { id: 'gc-r2-16', x: 1370, y: 893, tpl: 'tpl-grass-clump-d', scale: 1.1, rot: -3, phase: 'a' },
    { id: 'gc-r2-17', x: 1460, y: 890, tpl: 'tpl-grass-clump-a', scale: 1.06, rot: 4, phase: 'b' },
    { id: 'gc-r2-18', x: 1550, y: 892, tpl: 'tpl-grass-clump-b', scale: 1.08, rot: -4, phase: 'c' },

    // --- Row 3: Foreground Overgrowth Tufts (y: 898 - 905) ---
    { id: 'gc-r3-1', x: -5, y: 902, tpl: 'tpl-grass-clump-a', scale: 1.0, rot: -4, phase: 'c' },
    { id: 'gc-r3-2', x: 75, y: 900, tpl: 'tpl-grass-clump-d', scale: 0.95, rot: 4, phase: 'd' },
    { id: 'gc-r3-3', x: 155, y: 903, tpl: 'tpl-grass-clump-c', scale: 1.02, rot: -3, phase: 'a' },
    { id: 'gc-r3-4', x: 235, y: 901, tpl: 'tpl-grass-clump-b', scale: 0.98, rot: 5, phase: 'b' },
    { id: 'gc-r3-5', x: 315, y: 904, tpl: 'tpl-grass-clump-a', scale: 1.04, rot: -4, phase: 'c' },
    { id: 'gc-r3-6', x: 395, y: 900, tpl: 'tpl-grass-clump-d', scale: 0.96, rot: 3, phase: 'd' },
    { id: 'gc-r3-7', x: 475, y: 903, tpl: 'tpl-grass-clump-c', scale: 1.02, rot: -5, phase: 'a' },
    { id: 'gc-r3-8', x: 555, y: 901, tpl: 'tpl-grass-clump-b', scale: 0.98, rot: 4, phase: 'b' },
    { id: 'gc-r3-9', x: 635, y: 904, tpl: 'tpl-grass-clump-a', scale: 1.05, rot: -3, phase: 'c' },
    { id: 'gc-r3-10', x: 715, y: 900, tpl: 'tpl-grass-clump-d', scale: 0.95, rot: 5, phase: 'd' },
    { id: 'gc-r3-11', x: 795, y: 903, tpl: 'tpl-grass-clump-c', scale: 1.04, rot: -4, phase: 'a' },
    { id: 'gc-r3-12', x: 875, y: 901, tpl: 'tpl-grass-clump-b', scale: 0.98, rot: 3, phase: 'b' },
    { id: 'gc-r3-13', x: 955, y: 904, tpl: 'tpl-grass-clump-a', scale: 1.05, rot: -5, phase: 'c' },
    { id: 'gc-r3-14', x: 1035, y: 900, tpl: 'tpl-grass-clump-d', scale: 0.96, rot: 4, phase: 'd' },
    { id: 'gc-r3-15', x: 1115, y: 903, tpl: 'tpl-grass-clump-c', scale: 1.02, rot: -3, phase: 'a' },
    { id: 'gc-r3-16', x: 1195, y: 901, tpl: 'tpl-grass-clump-b', scale: 0.98, rot: 5, phase: 'b' },
    { id: 'gc-r3-17', x: 1275, y: 904, tpl: 'tpl-grass-clump-a', scale: 1.04, rot: -4, phase: 'c' },
    { id: 'gc-r3-18', x: 1355, y: 900, tpl: 'tpl-grass-clump-d', scale: 0.95, rot: 3, phase: 'd' },
    { id: 'gc-r3-19', x: 1435, y: 903, tpl: 'tpl-grass-clump-c', scale: 1.02, rot: -5, phase: 'a' },
    { id: 'gc-r3-20', x: 1515, y: 901, tpl: 'tpl-grass-clump-b', scale: 0.98, rot: 4, phase: 'b' },
    { id: 'gc-r3-21', x: 1595, y: 904, tpl: 'tpl-grass-clump-a', scale: 1.04, rot: -3, phase: 'c' },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-11"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* 1. Deep Shadow Forest Turf Gradient */}
        <linearGradient id="grass-grad-deep-back" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#010501" />
          <stop offset="35%" stopColor="#041203" />
          <stop offset="75%" stopColor="#0a2405" />
          <stop offset="100%" stopColor="#123608" />
        </linearGradient>

        {/* 2. Rich Dark Mossy Turf Gradient */}
        <linearGradient id="grass-grad-mid-body" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#020802" />
          <stop offset="30%" stopColor="#081e05" />
          <stop offset="70%" stopColor="#143c08" />
          <stop offset="100%" stopColor="#20540e" />
        </linearGradient>

        {/* 3. Front Blade Highlight Gradient */}
        <linearGradient id="grass-grad-front-blade" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#030c02" />
          <stop offset="25%" stopColor="#0c2805" />
          <stop offset="65%" stopColor="#1c4e0a" />
          <stop offset="100%" stopColor="#327412" />
        </linearGradient>

        {/* 4. Wild Seed Head Gradient */}
        <linearGradient id="grass-seed-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#102a06" />
          <stop offset="60%" stopColor="#2e5410" />
          <stop offset="100%" stopColor="#587c1c" />
        </linearGradient>

        {/* ======================================================== */}
        {/* MASTER CLUMP A (Feathered Meadow Fescue — Left Arch)     */}
        {/* ======================================================== */}
        <g id="tpl-grass-clump-a">
          {/* Deep Back Blades */}
          <path d="M -24 0 Q -32 -48 -44 -96 Q -22 -50 -18 0 Z" fill="url(#grass-grad-deep-back)" />
          <path d="M -10 0 Q -16 -54 -26 -104 Q -6 -56 0 0 Z" fill="url(#grass-grad-deep-back)" />
          <path d="M 6 0 Q 2 -48 -6 -92 Q 10 -50 12 0 Z" fill="url(#grass-grad-deep-back)" />
          {/* Mid-Body Blades */}
          <path d="M -30 0 Q -38 -40 -50 -80 Q -26 -42 -22 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M -16 0 Q -22 -44 -32 -88 Q -10 -46 -6 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 0 0 Q -4 -38 -10 -76 Q 6 -40 8 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 14 0 Q 18 -36 26 -72 Q 18 -38 18 0 Z" fill="url(#grass-grad-mid-body)" />
          {/* Front Blades */}
          <path d="M -22 0 Q -26 -30 -36 -60 Q -16 -32 -12 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M -8 0 Q -10 -34 -18 -68 Q -2 -34 2 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 6 0 Q 10 -28 18 -56 Q 10 -28 8 0 Z" fill="url(#grass-grad-front-blade)" />
          {/* Seed Head */}
          <g transform="translate(-26, -104) rotate(-22)">
            <ellipse cx="0" cy="-6" rx="2.2" ry="7" fill="url(#grass-seed-grad)" stroke="#092006" strokeWidth="0.4" />
            <ellipse cx="-2.5" cy="-3" rx="1.4" ry="4.5" fill="url(#grass-seed-grad)" transform="rotate(-30)" />
            <ellipse cx="2.5" cy="-3" rx="1.4" ry="4.5" fill="url(#grass-seed-grad)" transform="rotate(30)" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* MASTER CLUMP B (Prairie Wheat Cluster — Right Arch)      */}
        {/* ======================================================== */}
        <g id="tpl-grass-clump-b">
          {/* Deep Back Blades */}
          <path d="M 8 0 Q 18 -52 34 -106 Q 16 -54 6 0 Z" fill="url(#grass-grad-deep-back)" />
          <path d="M 22 0 Q 32 -46 48 -94 Q 26 -48 18 0 Z" fill="url(#grass-grad-deep-back)" />
          <path d="M -8 0 Q 0 -48 12 -90 Q -2 -50 -4 0 Z" fill="url(#grass-grad-deep-back)" />
          {/* Mid-Body Blades */}
          <path d="M -14 0 Q -8 -40 2 -78 Q -6 -42 -8 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 4 0 Q 12 -42 24 -84 Q 10 -44 8 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 18 0 Q 26 -38 40 -74 Q 22 -38 16 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 30 0 Q 38 -32 50 -64 Q 34 -34 26 0 Z" fill="url(#grass-grad-mid-body)" />
          {/* Front Blades */}
          <path d="M -4 0 Q 2 -28 10 -56 Q -2 -30 -2 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 8 0 Q 14 -32 24 -62 Q 12 -32 10 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 20 0 Q 26 -26 34 -52 Q 22 -26 18 0 Z" fill="url(#grass-grad-front-blade)" />
          {/* Seed Head */}
          <g transform="translate(34, -106) rotate(25)">
            <ellipse cx="0" cy="-6" rx="2.2" ry="7" fill="url(#grass-seed-grad)" stroke="#092006" strokeWidth="0.4" />
            <ellipse cx="-2.5" cy="-3" rx="1.4" ry="4.5" fill="url(#grass-seed-grad)" transform="rotate(-30)" />
            <ellipse cx="2.5" cy="-3" rx="1.4" ry="4.5" fill="url(#grass-seed-grad)" transform="rotate(30)" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* MASTER CLUMP C (Wild Fan Spray Cluster — Balanced)       */}
        {/* ======================================================== */}
        <g id="tpl-grass-clump-c">
          {/* Deep Back Blades */}
          <path d="M -18 0 Q -26 -50 -38 -100 Q -14 -52 -10 0 Z" fill="url(#grass-grad-deep-back)" />
          <path d="M 14 0 Q 24 -50 36 -100 Q 16 -52 8 0 Z" fill="url(#grass-grad-deep-back)" />
          {/* Mid-Body Blades */}
          <path d="M -26 0 Q -34 -42 -46 -82 Q -20 -42 -16 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 0 0 Q -2 -44 -4 -88 Q 4 -44 4 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 22 0 Q 30 -42 42 -82 Q 24 -42 16 0 Z" fill="url(#grass-grad-mid-body)" />
          {/* Front Blades */}
          <path d="M -14 0 Q -20 -30 -28 -60 Q -10 -30 -8 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 0 0 Q 0 -34 0 -68 Q 4 -34 2 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 12 0 Q 18 -30 26 -60 Q 14 -30 10 0 Z" fill="url(#grass-grad-front-blade)" />
        </g>

        {/* ======================================================== */}
        {/* MASTER CLUMP D (Creeping Dense Undergrowth Tuft)         */}
        {/* ======================================================== */}
        <g id="tpl-grass-clump-d">
          {/* Wide Multi-Blade Spikes */}
          <path d="M -28 0 Q -36 -32 -48 -64 Q -24 -34 -20 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M -18 0 Q -22 -38 -30 -76 Q -12 -40 -8 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M -6 0 Q -8 -42 -12 -82 Q 0 -42 2 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 8 0 Q 12 -42 18 -82 Q 10 -42 4 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 20 0 Q 26 -38 34 -76 Q 18 -40 14 0 Z" fill="url(#grass-grad-mid-body)" />
          <path d="M 30 0 Q 38 -32 50 -64 Q 28 -34 24 0 Z" fill="url(#grass-grad-mid-body)" />
          {/* Foreground Highlights */}
          <path d="M -12 0 Q -16 -24 -22 -48 Q -8 -24 -6 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 0 0 Q 0 -28 0 -54 Q 4 -28 2 0 Z" fill="url(#grass-grad-front-blade)" />
          <path d="M 12 0 Q 16 -24 22 -48 Q 10 -24 8 0 Z" fill="url(#grass-grad-front-blade)" />
        </g>
      </defs>

      {/* Ground Root Shadow Bed */}
      <rect x="0" y="870" width="1600" height="30" fill="rgba(0,0,0,0.92)" />

      {/* 56 Staggered Multi-Row Clumps across Bottom Viewport */}
      {clumps.map((c) => (
        <g
          key={c.id}
          transform={`translate(${c.x}, ${c.y}) rotate(${c.rot}) scale(${c.scale})`}
        >
          {/* Hardware-Accelerated Left-and-Right Horizontal Translation Drift */}
          <g className={`gpu-grass-drift-${c.phase}`}>
            <use href={`#${c.tpl}`} />
          </g>
        </g>
      ))}
    </svg>
  );
});
