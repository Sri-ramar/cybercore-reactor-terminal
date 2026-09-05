import React, { useState, useMemo } from 'react';
import { ThemeConfig } from '../../types';
import { soundFx } from '../../utils/soundEngine';

interface ProceduralHardwareLayerProps {
  theme: ThemeConfig;
  powerOutput: number;
  activeSurgeNode: string | null;
  onNodeClick: (nodeId: string, label: string) => void;
}

export const ProceduralHardwareLayer: React.FC<ProceduralHardwareLayerProps> = ({
  theme,
  powerOutput,
  activeSurgeNode,
  onNodeClick,
}) => {
  // Local interactive state (tactile feedback, zero intrusive popups)
  const [cryoPumpActive, setCryoPumpActive] = useState(true);
  const [nutrientFlowActive, setNutrientFlowActive] = useState(true);
  const [freqStep, setFreqStep] = useState(0);
  const [cpuClockStep, setCpuClockStep] = useState(0);
  const [sensorChannel, setSensorChannel] = useState(0);

  const FREQUENCIES = [48.2, 52.8, 63.4, 72.0, 43.2];
  const CPU_CLOCKS = ['4.80 GHz', '5.20 GHz', '5.60 GHz', '4.40 GHz'];
  const SENSOR_MODES = ['ATMOSPHERIC', 'RHIZOSPHERE', 'MICRO-NUTRIENT'];

  const currentFreq = FREQUENCIES[freqStep % FREQUENCIES.length];
  const currentClock = CPU_CLOCKS[cpuClockStep % CPU_CLOCKS.length];
  const currentSensorMode = SENSOR_MODES[sensorChannel % SENSOR_MODES.length];

  // Stepped Non-Linear Metallic Conduit Trajectories (Plugged cleanly into all module ports)
  const conduitPaths = useMemo(
    () => [
      // 1. Top-Center Stepped Bio-Rail
      'M 800 220 L 800 120 L 760 120 L 760 160 L 710 160 L 710 200 L 640 200 L 640 250 L 590 250',
      // 2. Top-Left Stepped Rail to Upper Left Canopy
      'M 590 250 L 520 250 L 520 180 L 480 180 L 480 140 L 410 140 L 410 95 L 360 95 L 360 65 L 260 65',
      // 3. Top-Left Horizontal Rail Section
      'M 520 250 L 260 250 L 260 220 L 200 220 L 160 250',
      // 4. Top-Center to Top-Right Capsule Header (Plugs into Capsule Left Port at 1020, 128)
      'M 800 180 L 800 95 L 860 95 L 860 128 L 1020 128',
      // 4b. Capsule Right Exit Port to Louver
      'M 1185 128 L 1230 128 L 1230 180 L 1400 180',
      // 5. Top-Right Chevron Louver Diagonal (Plugs into Louver Port at 1190, 215)
      'M 930 310 L 990 250 L 1090 250 L 1130 215 L 1190 215',
      // 6. Mid-Left Multi-Tier Horizontal Rail (Plugs into CPU Chip Right Port at 298, 355)
      'M 670 380 L 560 380 L 560 355 L 298 355',
      // 6b. CPU Chip Left Exit Port to Margin
      'M 154 355 L 120 355 L 120 390 L 70 390',
      // 7. Mid-Left Lower Horizontal Bar
      'M 660 440 L 540 440 L 500 480 L 440 480 L 400 440 L 260 440 L 220 440 L 180 480 L 110 480',
      // 8. Lower-Left Staircase Bus (Plugs cleanly into Console Right Socket at 394, 680)
      'M 710 540 L 630 620 L 570 620 L 540 680 L 394 680',
      // 8b. Lower-Left Console Bottom Exit Socket at 170, 720 to Ground Bus
      'M 170 720 L 120 720 L 90 770 L 50 800 L 15 800',
      // 9. Mid-Right Horizontal Bus (Plugs into LED Matrix Left Port at 1140, 448)
      'M 940 448 L 1140 448',
      // 9b. LED Matrix Right Exit Port at 1340, 448 to Margin
      'M 1340 448 L 1420 448',
      // 10. Lower-Right Descending Wing to Ground Rail
      'M 930 510 L 990 565 L 1050 565 L 1090 605 L 1210 605 L 1250 520 L 1410 520',
      // 11. Bottom Stepped Grounding Rail (Continuous through ruler track)
      'M 800 640 L 800 690 L 760 720 L 690 720 L 670 784 L 1290 784 L 1340 784 L 1380 755 L 1490 755 L 1490 825',
    ],
    []
  );

  // Machined Hard Metal Fasteners with Rivets
  const metallicFasteners = useMemo(
    () => [
      { x: 760, y: 120, rot: 0 },
      { x: 710, y: 200, rot: 90 },
      { x: 520, y: 250, rot: 0 },
      { x: 480, y: 140, rot: 90 },
      { x: 860, y: 95, rot: 45 },
      { x: 990, y: 250, rot: 45 },
      { x: 1130, y: 215, rot: 45 },
      { x: 560, y: 380, rot: 90 },
      { x: 120, y: 355, rot: 0 },
      { x: 500, y: 480, rot: 45 },
      { x: 260, y: 440, rot: 0 },
      { x: 630, y: 620, rot: 45 },
      { x: 540, y: 680, rot: 90 },
      { x: 90, y: 770, rot: 45 },
      { x: 990, y: 565, rot: 45 },
      { x: 1090, y: 605, rot: 45 },
      { x: 1210, y: 605, rot: 90 },
      { x: 760, y: 720, rot: 45 },
      { x: 1340, y: 784, rot: 0 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-auto select-none z-15">
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* FR4 Circuit Board Solder Mask Gradient */}
          <linearGradient id="ultra-pcb-substrate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d2212" />
            <stop offset="40%" stopColor="#08170c" />
            <stop offset="80%" stopColor="#051008" />
            <stop offset="100%" stopColor="#020603" />
          </linearGradient>

          {/* Electroplated Gold ENIG Trace Gradient */}
          <linearGradient id="ultra-gold-enig" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe894" />
            <stop offset="25%" stopColor="#e5bd4e" />
            <stop offset="65%" stopColor="#ad8226" />
            <stop offset="100%" stopColor="#664910" />
          </linearGradient>

          {/* Solder Mask Via Hole Gradient */}
          <radialGradient id="ultra-via-annular" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe082" />
            <stop offset="60%" stopColor="#8a6519" />
            <stop offset="85%" stopColor="#0f1710" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* Ceramic SMD Capacitor Gradient */}
          <linearGradient id="ultra-smd-cap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9caab" />
            <stop offset="45%" stopColor="#a69272" />
            <stop offset="100%" stopColor="#5c4e36" />
          </linearGradient>

          {/* Heavy Machined Brushed Dark Titanium Chassis */}
          <linearGradient id="ultra-titanium-chassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3238" />
            <stop offset="25%" stopColor="#1c2024" />
            <stop offset="65%" stopColor="#111316" />
            <stop offset="100%" stopColor="#06080a" />
          </linearGradient>

          {/* Photorealistic Knurled Brass Dial */}
          <radialGradient id="ultra-knurled-brass" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff1a8" />
            <stop offset="30%" stopColor="#d6aa38" />
            <stop offset="70%" stopColor="#8c671b" />
            <stop offset="100%" stopColor="#2e2006" />
          </radialGradient>

          {/* Copper Heat Sink Fin Gradient */}
          <linearGradient id="ultra-copper-fin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb774" />
            <stop offset="35%" stopColor="#d97529" />
            <stop offset="75%" stopColor="#873e0e" />
            <stop offset="100%" stopColor="#381403" />
          </linearGradient>

          {/* CRT Oscilloscope Screen Phosphor P31 Bed */}
          <radialGradient id="ultra-crt-screen" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#041a08" />
            <stop offset="60%" stopColor="#020d04" />
            <stop offset="90%" stopColor="#010602" />
            <stop offset="100%" stopColor="#000201" />
          </radialGradient>

          {/* Glass Lens Optical Sheen with Anti-Reflective Tint */}
          <linearGradient id="ultra-glass-ar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.40" />
            <stop offset="25%" stopColor="#dffff0" stopOpacity="0.10" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="85%" stopColor="#80ffb0" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.22" />
          </linearGradient>

          {/* Fluid Tube Liquid Flow */}
          <linearGradient id="ultra-fluid-flow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e4ff88" />
            <stop offset="35%" stopColor="#64e01c" />
            <stop offset="70%" stopColor="#248408" />
            <stop offset="100%" stopColor="#0c3202" />
          </linearGradient>

          {/* Neon Phosphor Core Glow Filter */}
          <filter id="neon-phosphor-hard" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b1" />
            <feGaussianBlur stdDeviation="3.6" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. STEPPED HEAVY METALLIC CONDUITS & GLOWING FLUID RAILS */}
        {/* ======================================================== */}
        <g>
          {conduitPaths.map((path, idx) => (
            <g key={`conduit-layer-${idx}`}>
              <path d={path} fill="none" stroke="rgba(0,0,0,0.85)" strokeWidth="18" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke="#181a1e" strokeWidth="14" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke="#2a2e34" strokeWidth="11" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke="#06080a" strokeWidth="8.5" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke="#163214" strokeWidth="5.0" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke={theme.primary} strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" filter="url(#neon-phosphor-hard)" opacity="0.95" />
              <path d={path} fill="none" stroke="#ffffff" strokeWidth="1.0" strokeLinecap="square" strokeLinejoin="miter" opacity="0.95" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 2. PRECISION MACHINED HARD BRASS FASTENERS               */}
        {/* ======================================================== */}
        <g>
          {metallicFasteners.map((f, i) => (
            <g key={`fastener-hard-${i}`} transform={`translate(${f.x}, ${f.y}) rotate(${f.rot})`}>
              <rect x="-5.5" y="-6.5" width="11" height="13" rx="1.8" fill="url(#ultra-knurled-brass)" stroke="#181204" strokeWidth="0.8" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
              <circle cx="-2.6" cy="-3.2" r="0.9" fill="#080602" />
              <circle cx="2.6" cy="-3.2" r="0.9" fill="#080602" />
              <circle cx="-2.6" cy="3.2" r="0.9" fill="#080602" />
              <circle cx="2.6" cy="3.2" r="0.9" fill="#080602" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 3. ULTRA-REALISTIC CIRCUIT 1: QUANTUM NEURAL PROCESSOR   */}
        {/*    Location: Mid-Left (170, 300)                         */}
        {/*    General Purpose: Neural Photosynthesis Co-Processor   */}
        {/* ======================================================== */}
        <g
          transform="translate(170, 300)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1800);
            setCpuClockStep((prev) => prev + 1);
            onNodeClick('CHIP-03', 'Q-PROC-8X NEURAL CO-PROCESSOR');
          }}
          title={`CIRCUIT 1: QUANTUM NEURAL CO-PROCESSOR (Q-PROC-8X)
General Purpose: High-speed neural computation of cellular photosynthesis, genomic synthesis & photon flux.
Clock Speed: ${currentClock} (Active)
Architecture: 8-Core Quantum Die with 48-Pin Gold Gull-Wing Bus
Status: ONLINE // SYNCED`}
        >
          {/* Multi-Layer FR4 Glass-Epoxy Printed Circuit Board */}
          <rect x="-24" y="-24" width="160" height="160" rx="6" fill="url(#ultra-pcb-substrate)" stroke="#102c18" strokeWidth="1.6" />
          <rect x="-22" y="-22" width="156" height="156" rx="5" fill="none" stroke="#1e4a28" strokeWidth="0.6" opacity="0.5" />

          {/* Precision Mitered 45° ENIG Gold Circuit Traces */}
          <g stroke="url(#ultra-gold-enig)" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            {/* Top-Left Trace Group */}
            <path d="M -16 6 L -8 6 L 6 -8 L 6 -16" />
            <path d="M -18 18 L -10 18 L 16 -8 L 16 -18" />
            <path d="M -20 30 L -12 30 L 26 -8 L 26 -20" />
            {/* Top-Right Trace Group */}
            <path d="M 128 6 L 120 6 L 106 -8 L 106 -16" />
            <path d="M 130 18 L 122 18 L 96 -8 L 96 -18" />
            <path d="M 132 30 L 124 30 L 86 -8 L 86 -20" />
            {/* Bottom-Left Trace Group */}
            <path d="M -16 106 L -8 106 L 6 120 L 6 128" />
            <path d="M -18 94 L -10 94 L 16 120 L 16 130" />
            <path d="M -20 82 L -12 82 L 26 120 L 26 132" />
            {/* Bottom-Right Trace Group */}
            <path d="M 128 106 L 120 106 L 106 120 L 106 128" />
            <path d="M 130 94 L 122 94 L 96 120 L 96 130" />
            <path d="M 132 82 L 124 82 L 86 120 L 86 132" />
          </g>

          {/* Test Points & Ground Stitching Vias with Exposed Annular Rings */}
          {[
            { cx: -14, cy: -14, label: 'TP1' },
            { cx: 126, cy: -14, label: 'TP2' },
            { cx: -14, cy: 126, label: 'TP3' },
            { cx: 126, cy: 126, label: 'TP4' },
            { cx: 56, cy: -18, label: 'CLK' },
            { cx: 56, cy: 130, label: 'GND' },
          ].map((tp, idx) => (
            <g key={`pcb-tp-${idx}`}>
              <circle cx={tp.cx} cy={tp.cy} r="2.6" fill="url(#ultra-via-annular)" stroke="#2c2008" strokeWidth="0.5" />
              <circle cx={tp.cx} cy={tp.cy} r="0.9" fill="#000000" />
              <text x={tp.cx + 3.5} y={tp.cy + 2} fill="#588a62" fontSize="4" fontFamily="Share Tech Mono, monospace">
                {tp.label}
              </text>
            </g>
          ))}

          {/* Surface Mount 0402 Decoupling Capacitors Flanking the Chip */}
          {[
            { x: -16, y: 44, rot: 90 },
            { x: -16, y: 58, rot: 90 },
            { x: -16, y: 72, rot: 90 },
            { x: 124, y: 44, rot: 90 },
            { x: 124, y: 58, rot: 90 },
            { x: 124, y: 72, rot: 90 },
            { x: 44, y: -16, rot: 0 },
            { x: 68, y: -16, rot: 0 },
            { x: 44, y: 124, rot: 0 },
            { x: 68, y: 124, rot: 0 },
          ].map((smd, idx) => (
            <g key={`smd-cap-${idx}`} transform={`translate(${smd.x}, ${smd.y}) rotate(${smd.rot})`}>
              <rect x="-4" y="-2" width="8" height="4" rx="0.6" fill="url(#ultra-smd-cap)" stroke="#1c1810" strokeWidth="0.4" />
              <rect x="-4" y="-2" width="2" height="4" fill="#d0d6dc" />
              <rect x="2" y="-2" width="2" height="4" fill="#d0d6dc" />
              <line x1="-2" y1="-2" x2="-2" y2="2" stroke="#8a9098" strokeWidth="0.3" />
              <line x1="2" y1="-2" x2="2" y2="2" stroke="#8a9098" strokeWidth="0.3" />
            </g>
          ))}

          {/* 48-Lead Gold Gull-Wing Leads with Solder Fillets */}
          <g>
            {[...Array(12)].map((_, i) => {
              const y = 11 + i * 7.5;
              return (
                <React.Fragment key={`cpu-lead-lr-${i}`}>
                  {/* Left Lead */}
                  <rect x="-12" y={y - 1.2} width="6.5" height="2.4" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M -12 ${y} L -4 ${y} L 4 ${y}`} stroke="#ffe082" strokeWidth="1.4" strokeLinecap="round" />
                  <path d={`M -5 ${y} L 4 ${y}`} stroke="#ffffff" strokeWidth="0.5" />
                  {/* Right Lead */}
                  <rect x="117.5" y={y - 1.2} width="6.5" height="2.4" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M 124 ${y} L 116 ${y} L 108 ${y}`} stroke="#ffe082" strokeWidth="1.4" strokeLinecap="round" />
                  <path d={`M 117 ${y} L 108 ${y}`} stroke="#ffffff" strokeWidth="0.5" />
                </React.Fragment>
              );
            })}
            {[...Array(12)].map((_, i) => {
              const x = 11 + i * 7.5;
              return (
                <React.Fragment key={`cpu-lead-tb-${i}`}>
                  {/* Top Lead */}
                  <rect x={x - 1.2} y="-12" width="2.4" height="6.5" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M ${x} -12 L ${x} -4 L ${x} 4`} stroke="#ffe082" strokeWidth="1.4" strokeLinecap="round" />
                  <path d={`M ${x} -5 L ${x} 4`} stroke="#ffffff" strokeWidth="0.5" />
                  {/* Bottom Lead */}
                  <rect x={x - 1.2} y="117.5" width="2.4" height="6.5" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M ${x} 124 L ${x} 116 L ${x} 108`} stroke="#ffe082" strokeWidth="1.4" strokeLinecap="round" />
                  <path d={`M ${x} 117 L ${x} 108`} stroke="#ffffff" strokeWidth="0.5" />
                </React.Fragment>
              );
            })}
          </g>

          {/* Chamfered Matte Black Ceramic QFP IC Package Body */}
          <rect x="4" y="4" width="104" height="104" rx="5" fill="#080a0c" stroke="#1c2024" strokeWidth="1.4" />
          <polygon
            points="
              14 12, 98 12, 102 16, 102 96, 98 100, 14 100, 10 96, 10 16
            "
            fill="url(#ultra-titanium-chassis)"
            stroke="#383d44"
            strokeWidth="0.9"
          />

          {/* Pin 1 Index Notch (Gold Triangle) */}
          <polygon points="12 14, 18 14, 12 20" fill="#ffe082" />

          {/* High-Resolution Laser-Etched Typography */}
          <g fill="#cfc6b4" fontFamily="Rajdhani, sans-serif" fontWeight="700" letterSpacing="1" opacity="0.85">
            <text x="56" y="22" fontSize="6" textAnchor="middle">QUANTUM-BIO // Q-PROC-8X</text>
            <text x="56" y="29" fontSize="4.2" fill="#8aa290" textAnchor="middle" letterSpacing="1.5">PURPOSE: NEURAL CO-PROCESSOR</text>
            <text x="56" y="88" fontSize="5.2" fill={theme.accent} textAnchor="middle">{currentClock} // 8-CORE ACTIVE</text>
            <text x="56" y="94" fontSize="4" fill="#68767e" textAnchor="middle">DIE TEMP: 28.4°C // LOT: 2026-REV3</text>
          </g>

          {/* Recessed Silicon Die Cavity with Microscopic Logic Matrix */}
          <g transform="translate(34, 34)">
            <rect x="0" y="0" width="44" height="44" rx="2" fill="#020406" stroke="#182026" strokeWidth="1.0" />
            {/* Step Cavity Bevels */}
            <polygon points="0 0, 4 4, 40 4, 44 0" fill="#080c10" />
            <polygon points="44 0, 40 4, 40 40, 44 44" fill="#04070a" />
            <polygon points="44 44, 40 40, 4 40, 0 44" fill="#010304" />
            <polygon points="0 44, 4 40, 4 4, 0 0" fill="#060a0e" />

            {/* Gold Wire Bond Traces Connecting Package Shelf to Silicon Die */}
            <g stroke="#ffe082" strokeWidth="0.45" fill="none" opacity="0.8">
              <line x1="4" y1="10" x2="10" y2="12" />
              <line x1="4" y1="22" x2="10" y2="22" />
              <line x1="4" y1="34" x2="10" y2="32" />
              <line x1="40" y1="10" x2="34" y2="12" />
              <line x1="40" y1="22" x2="34" y2="22" />
              <line x1="40" y1="34" x2="34" y2="32" />
              <line x1="10" y1="4" x2="12" y2="10" />
              <line x1="22" y1="4" x2="22" y2="10" />
              <line x1="34" y1="4" x2="32" y2="10" />
              <line x1="10" y1="40" x2="12" y2="34" />
              <line x1="22" y1="40" x2="22" y2="34" />
              <line x1="34" y1="40" x2="32" y2="34" />
            </g>

            {/* Central Silicon Die with Optical Quantum Lattice Core */}
            <rect x="10" y="10" width="24" height="24" rx="1.2" fill="#010804" stroke="#183a1c" strokeWidth="0.8" />
            {/* Microscopic Circuit Graticule */}
            <g stroke="#184e20" strokeWidth="0.3" opacity="0.7">
              <line x1="14" y1="10" x2="14" y2="34" />
              <line x1="18" y1="10" x2="18" y2="34" />
              <line x1="22" y1="10" x2="22" y2="34" />
              <line x1="26" y1="10" x2="26" y2="34" />
              <line x1="30" y1="10" x2="30" y2="34" />
              <line x1="10" y1="14" x2="34" y2="14" />
              <line x1="10" y1="18" x2="34" y2="18" />
              <line x1="10" y1="22" x2="34" y2="22" />
              <line x1="10" y1="26" x2="34" y2="26" />
              <line x1="10" y1="30" x2="34" y2="30" />
            </g>

            {/* Glowing Active Neural Optical Core */}
            <rect
              x="15"
              y="15"
              width="14"
              height="14"
              rx="1"
              fill={theme.primary}
              filter="url(#neon-phosphor-hard)"
              opacity="0.9"
            />
            <rect x="17" y="17" width="10" height="10" rx="0.8" fill="#ffffff" opacity="0.95" />
            <circle cx="22" cy="22" r="2.2" fill={theme.accent} />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 4. ULTRA-REALISTIC CIRCUIT 2: COMMAND TERMINAL & SINE DECK */}
        {/*    Location: Bottom-Left (160, 605)                      */}
        {/*    General Purpose: Harmonic Resonance & Cryo Controller */}
        {/* ======================================================== */}
        <g
          transform="translate(160, 605)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.4);
            onNodeClick('CONSOLE-05', 'COMMAND TERMINAL MK-IV');
          }}
          title={`CIRCUIT 2: BIO-HARMONIC COMMAND TERMINAL (MK-IV)
General Purpose: Synthesizes biological acoustic resonance (48.2 Hz) and manages cryo-coolant pump manifolds.
Frequency: ${currentFreq.toFixed(1)} Hz (Phase-Locked)
Cryo Pump: ${cryoPumpActive ? 'ENGAGED' : 'STANDBY'}
Nutrient Flow: ${nutrientFlowActive ? 'FLOWING' : 'IDLE'}
(Click switches/knob directly to interact)`}
        >
          {/* Heavy CNC-Machined Sloped Dark Titanium Faceplate */}
          <rect x="0" y="0" width="236" height="138" rx="6" fill="url(#ultra-titanium-chassis)" stroke="#383e44" strokeWidth="1.6" />
          <rect x="3" y="3" width="230" height="132" rx="4.5" fill="#030506" stroke="#12161a" strokeWidth="1.0" />

          {/* 4 Countersunk Solid Brass Allen Screws */}
          {[
            { cx: 8, cy: 8 },
            { cx: 228, cy: 8 },
            { cx: 8, cy: 130 },
            { cx: 228, cy: 130 },
          ].map((screw, idx) => (
            <g key={`console-screw-${idx}`}>
              <circle cx={screw.cx} cy={screw.cy} r="2.6" fill="url(#ultra-knurled-brass)" stroke="#141004" strokeWidth="0.6" />
              {/* Hex Socket Recess */}
              <polygon
                points={`
                  ${screw.cx} ${screw.cy - 1.2},
                  ${screw.cx + 1.0} ${screw.cy - 0.6},
                  ${screw.cx + 1.0} ${screw.cy + 0.6},
                  ${screw.cx} ${screw.cy + 1.2},
                  ${screw.cx - 1.0} ${screw.cy + 0.6},
                  ${screw.cx - 1.0} ${screw.cy - 0.6}
                `}
                fill="#060402"
              />
            </g>
          ))}

          {/* Top Deck: Solid Brass Knurled Potentiometer Knob */}
          <g
            transform="translate(30, 28)"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playServo();
              setFreqStep((prev) => prev + 1);
            }}
            title="Potentiometer: Click to adjust resonance frequency"
          >
            {/* Radial Detents */}
            {[...Array(11)].map((_, i) => {
              const angle = -140 + i * 28;
              const rad = (angle * Math.PI) / 180;
              return (
                <circle
                  key={`knob-dot-${i}`}
                  cx={Math.cos(rad) * 17}
                  cy={Math.sin(rad) * 17}
                  r="1.1"
                  fill={i <= 7 ? theme.primary : '#2e3840'}
                  filter={i <= 7 ? 'url(#neon-phosphor-hard)' : undefined}
                />
              );
            })}
            {/* Knurled Outer Bezel */}
            <circle cx="0" cy="0" r="13" fill="url(#ultra-knurled-brass)" stroke="#100c04" strokeWidth="1.0" />
            <circle cx="0" cy="0" r="9.5" fill="#0e1216" stroke="#242a30" strokeWidth="0.8" />
            {/* Active Indicator Notch */}
            <line x1="0" y1="-2" x2="0" y2="-9" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" filter="url(#neon-phosphor-hard)" />
            <circle cx="0" cy="0" r="2.2" fill="#ffd778" />
          </g>

          {/* Tactile Illuminated Rocker Switches (CRYO & SAP PUMP) */}
          <g transform="translate(64, 15)">
            {/* Rocker 1: CRYO PUMP */}
            <g
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick(1.6);
                setCryoPumpActive((prev) => !prev);
              }}
              title="Click to toggle Cryo Cooling Pump"
            >
              <rect x="0" y="0" width="24" height="26" rx="2.5" fill="#080a0c" stroke="#262c32" strokeWidth="0.8" />
              <rect x="2" y={cryoPumpActive ? 2 : 12} width="20" height="12" rx="1.5" fill="#1c2228" stroke="#404a54" strokeWidth="0.6" />
              <line x1="4" y1={cryoPumpActive ? 8 : 18} x2="20" y2={cryoPumpActive ? 8 : 18} stroke={cryoPumpActive ? "#70d8ff" : "#324450"} strokeWidth="1.6" filter="url(#neon-phosphor-hard)" />
              <text x="12" y="23" fill={cryoPumpActive ? "#a8e4ff" : "#546674"} fontSize="4.6" textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontWeight="700">
                CRYO
              </text>
            </g>

            {/* Rocker 2: SAP PUMP */}
            <g
              transform="translate(28, 0)"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick(1.2);
                setNutrientFlowActive((prev) => !prev);
              }}
              title="Click to toggle Nutrient Sap Flow"
            >
              <rect x="0" y="0" width="24" height="26" rx="2.5" fill="#080a0c" stroke="#262c32" strokeWidth="0.8" />
              <rect x="2" y={nutrientFlowActive ? 2 : 12} width="20" height="12" rx="1.5" fill="#1c2228" stroke="#404a54" strokeWidth="0.6" />
              <line x1="4" y1={nutrientFlowActive ? 8 : 18} x2="20" y2={nutrientFlowActive ? 8 : 18} stroke={nutrientFlowActive ? theme.primary : "#284422"} strokeWidth="1.6" filter="url(#neon-phosphor-hard)" />
              <text x="12" y="23" fill={nutrientFlowActive ? "#b8f888" : "#4a6642"} fontSize="4.6" textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontWeight="700">
                PUMP
              </text>
            </g>
          </g>

          {/* 10-Key Tactile Ergonomic Silicone Macro Keys (2x5 Grid) */}
          <g transform="translate(126, 14)">
            {[...Array(2)].map((_, r) =>
              [...Array(5)].map((_, c) => (
                <g key={`console-key-${r}-${c}`} transform={`translate(${c * 19.5}, ${r * 13})`}>
                  <rect x="0" y="0" width="17" height="11" rx="1.5" fill="#030405" stroke="#181c20" strokeWidth="0.7" />
                  <rect x="1" y="1" width="15" height="9" rx="1.2" fill="#14171a" stroke={c === 0 ? '#446e22' : '#282d32'} strokeWidth="0.5" />
                  <line x1="2" y1="2" x2="14" y2="2" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
                  <circle cx="8.5" cy="5.5" r="1.2" fill={c === 0 ? theme.primary : '#323a42'} filter={c === 0 ? 'url(#neon-phosphor-hard)' : undefined} />
                </g>
              ))
            )}
          </g>

          {/* CRT Vector Oscilloscope Display Screen */}
          <g transform="translate(12, 50)">
            {/* CRT Housing Screen with Glass Bevel */}
            <rect x="0" y="0" width="145" height="52" rx="4" fill="url(#ultra-crt-screen)" stroke="#122818" strokeWidth="1.2" />
            
            {/* Calibrated Phosphor Graticule Grid (8x6 sub-divisions) */}
            <g stroke="#0c2a12" strokeWidth="0.6" opacity="0.85">
              <line x1="0" y1="13" x2="145" y2="13" strokeDasharray="2 2" />
              <line x1="0" y1="26" x2="145" y2="26" strokeWidth="0.8" />
              <line x1="0" y1="39" x2="145" y2="39" strokeDasharray="2 2" />
              <line x1="29" y1="0" x2="29" y2="52" strokeDasharray="2 2" />
              <line x1="58" y1="0" x2="58" y2="52" strokeDasharray="2 2" />
              <line x1="72.5" y1="0" x2="72.5" y2="52" strokeWidth="0.8" />
              <line x1="87" y1="0" x2="87" y2="52" strokeDasharray="2 2" />
              <line x1="116" y1="0" x2="116" y2="52" strokeDasharray="2 2" />
            </g>

            {/* Glowing Harmonic Bio-Acoustic Waveforms */}
            <path
              d="M 4 26 Q 22 7 40 26 T 76 26 T 112 26 T 141 26"
              fill="none"
              stroke={theme.primary}
              strokeWidth="2.0"
              filter="url(#neon-phosphor-hard)"
            />
            <path
              d="M 4 26 Q 22 45 40 26 T 76 26 T 112 26 T 141 26"
              fill="none"
              stroke="#d4ff78"
              strokeWidth="1.1"
              opacity="0.9"
              filter="url(#neon-phosphor-hard)"
            />
            {/* Central Resonance Node */}
            <circle cx="72.5" cy="26" r="2.8" fill="#ffffff" filter="url(#neon-phosphor-hard)" />

            {/* CRT Glass Reflection Glint */}
            <rect x="0" y="0" width="145" height="24" rx="4" fill="url(#ultra-glass-ar)" pointerEvents="none" />
          </g>

          {/* Digital Telemetry Frequency Meter & Diodes */}
          <g transform="translate(165, 50)">
            <rect x="0" y="0" width="60" height="24" rx="2.5" fill="#020604" stroke="#16321a" strokeWidth="0.9" />
            <text x="6" y="16" fill={theme.primary} fontSize="9.5" fontFamily="Share Tech Mono, monospace" fontWeight="bold" filter="url(#neon-phosphor-hard)">
              {currentFreq.toFixed(1)} Hz
            </text>

            {/* 3 Status Diodes */}
            <g transform="translate(6, 34)">
              <circle cx="0" cy="0" r="3.8" fill="#040a06" stroke="#183c18" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.4" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
              <circle cx="0" cy="0" r="0.8" fill="#ffffff" />

              <circle cx="18" cy="0" r="3.8" fill="#040a06" stroke="#183c18" strokeWidth="0.8" />
              <circle cx="18" cy="0" r="2.4" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
              <circle cx="18" cy="0" r="0.8" fill="#ffffff" />

              <circle cx="36" cy="0" r="3.8" fill="#06080a" stroke="#262c32" strokeWidth="0.8" />
              <circle cx="36" cy="0" r="2.4" fill="#70d8ff" filter="url(#neon-phosphor-hard)" />
              <circle cx="36" cy="0" r="0.8" fill="#ffffff" />
            </g>

            {/* Output Gain Level Gauge */}
            <rect x="-2" y="46" width="58" height="6" rx="1.5" fill="#030805" stroke="#143216" strokeWidth="0.7" />
            <rect x="0" y="47.5" width="46" height="3" rx="1" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
          </g>

          {/* Technical Identification Label */}
          <text x="12" y="128" fill="#707c88" fontSize="5.8" fontFamily="Rajdhani, sans-serif" fontWeight="700" letterSpacing="1.2">
            AGRI-CORE // COMMAND TERMINAL MK-IV // BIO-ELECTRIC BUS
          </text>
        </g>

        {/* ======================================================== */}
        {/* 5. ULTRA-REALISTIC CIRCUIT 3: PHOTOBIOREACTOR & LOUVER   */}
        {/*    Location: Top-Right (1020..1400, 105..220)            */}
        {/*    General Purpose: PPFD Light Flux & Thermal Radiator   */}
        {/* ======================================================== */}
        {/* 3A. Photobioreactor LED Segment Ladder Display */}
        <g
          transform="translate(1020, 105)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.0);
            onNodeClick('CAPSULE-01', 'PAR PHOTOBIOREACTOR FLUX METER');
          }}
          title="CIRCUIT 3A: PAR PHOTOBIOREACTOR FLUX METER
General Purpose: Measures Photosynthetically Active Radiation flux (PPFD: 14,200 LUX) across 32 calibrated spectral bands.
Status: SPECTRAL OUTPUT NOMINAL
(Click to calibrate flux)"
        >
          {/* Titanium Frame Chassis */}
          <rect x="0" y="0" width="168" height="48" rx="4.5" fill="url(#ultra-titanium-chassis)" stroke="#383e44" strokeWidth="1.4" />
          <rect x="3" y="3" width="162" height="42" rx="3" fill="#020503" stroke="#142818" strokeWidth="1.0" />

          {/* 32 Individual Precision Rectangular LED Phosphor Bars */}
          <g>
            {[...Array(32)].map((_, i) => {
              const isPeak = i > 25;
              return (
                <rect
                  key={`photometer-bar-${i}`}
                  x={8 + i * 4.8}
                  y="8"
                  width="2.8"
                  height="32"
                  rx="0.8"
                  fill={isPeak ? '#ffe082' : theme.primary}
                  stroke="#0a180c"
                  strokeWidth="0.4"
                  filter="url(#neon-phosphor-hard)"
                  opacity={i > 29 ? 0.4 : 0.95}
                />
              );
            })}
          </g>

          {/* Center Zero-Reference Datum Line */}
          <line x1="8" y1="24" x2="160" y2="24" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />

          {/* Calibrated Tick Ruler on Lens Frame */}
          {[...Array(9)].map((_, i) => (
            <line key={`lux-tick-${i}`} x1={8 + i * 19} y1="4" x2={8 + i * 19} y2="7" stroke="#8aa290" strokeWidth="0.8" />
          ))}

          {/* Glass Faceplate Sheen */}
          <rect x="3" y="3" width="162" height="22" rx="3" fill="url(#ultra-glass-ar)" pointerEvents="none" />

          {/* Silkscreen Badge */}
          <text x="8" y="43" fill="#7a8e80" fontSize="4.8" fontFamily="Share Tech Mono, monospace">
            PPFD FLUX: 14,200 LUX // PAR SPECTROMETER
          </text>
        </g>

        {/* 3B. Hydraulic Thermal Radiator with Copper Cooling Fins & Manifold */}
        <g
          transform="translate(1185, 140)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1200);
            onNodeClick('LOUVER-02', 'NUTRIENT THERMAL RADIATOR MANIFOLD');
          }}
          title="CIRCUIT 3B: NUTRIENT THERMAL RADIATOR & MANIFOLD
General Purpose: Dissipates thermal surplus from circulating nutrient fluids through copper radiator fins.
Manifold Pressure: 4.8 BAR
Coolant Temperature: -4.6°C Gradient
(Click to probe coolant bus)"
        >
          {/* Base Chassis with Cooling Ports */}
          <polygon
            points="0 52, 32 0, 168 0, 198 52, 235 52, 260 20, 285 52"
            fill="url(#ultra-titanium-chassis)"
            stroke="#383e44"
            strokeWidth="1.6"
          />

          {/* 12 Vertical Precision Copper Radiator Heat Fins */}
          <g transform="translate(34, 8)">
            {[...Array(12)].map((_, i) => (
              <g key={`copper-fin-${i}`}>
                <rect
                  x={i * 11.5}
                  y="0"
                  width="5.5"
                  height="36"
                  rx="1.2"
                  fill="url(#ultra-copper-fin)"
                  stroke="#2c1202"
                  strokeWidth="0.6"
                />
                <line x1={i * 11.5 + 1.2} y1="1" x2={i * 11.5 + 1.2} y2="35" stroke="#ffd8a8" strokeWidth="0.6" opacity="0.75" />
              </g>
            ))}
          </g>

          {/* Central Borosilicate Sight-Glass Tube with Flowing Nutrient Sap */}
          <g transform="translate(26, 22)">
            <rect x="0" y="0" width="148" height="12" rx="6" fill="#020803" stroke="#16381a" strokeWidth="0.9" />
            <rect x="2" y="2" width="144" height="8" rx="4" fill="url(#ultra-fluid-flow)" filter="url(#neon-phosphor-hard)" />
            <line x1="4" y1="3.5" x2="142" y2="3.5" stroke="#ffffff" strokeWidth="1.0" strokeLinecap="round" opacity="0.95" />
          </g>

          {/* Precision Analog Bourdon Tube Pressure Gauge */}
          <g transform="translate(258, 34)">
            <circle cx="0" cy="0" r="15" fill="url(#ultra-knurled-brass)" stroke="#140e02" strokeWidth="1.0" />
            <circle cx="0" cy="0" r="12" fill="#040608" stroke="#383d44" strokeWidth="0.8" />
            {/* Dial Scale */}
            {[...Array(9)].map((_, i) => {
              const angle = -140 + i * 35;
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={`gauge-tick-${i}`}
                  x1={Math.cos(rad) * 7.5}
                  y1={Math.sin(rad) * 7.5}
                  x2={Math.cos(rad) * 10.5}
                  y2={Math.sin(rad) * 10.5}
                  stroke={i > 6 ? '#ff4d4d' : '#88e024'}
                  strokeWidth="0.8"
                />
              );
            })}
            {/* Pressure Needle */}
            <line x1="0" y1="0" x2="7.0" y2="-7.0" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" filter="url(#neon-phosphor-hard)" />
            <circle cx="0" cy="0" r="2.4" fill="#ffd778" />
            {/* Glass Glint */}
            <path d="M -8 -8 A 12 12 0 0 1 8 -8 Z" fill="rgba(255,255,255,0.4)" />
          </g>

          <text x="34" y="49" fill="#8898a8" fontSize="4.6" fontFamily="Share Tech Mono, monospace">
            MANIFOLD: 4.8 BAR // COOLANT GRADIENT: -4.6°C
          </text>
        </g>

        {/* ======================================================== */}
        {/* 6. ULTRA-REALISTIC CIRCUIT 4: TELEMETRY SENSOR HUD       */}
        {/*    Location: Mid-Right (1140, 410)                       */}
        {/*    General Purpose: Soil & Atmospheric Telemetry         */}
        {/* ======================================================== */}
        <g
          transform="translate(1140, 410)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1600);
            setSensorChannel((prev) => prev + 1);
            onNodeClick('DISPLAY-04', 'SOIL & ATMOSPHERE TELEMETRY NODE');
          }}
          title={`CIRCUIT 4: RHIZOSPHERE & ATMOSPHERIC TELEMETRY SENSOR
General Purpose: Continuous monitoring of soil moisture (H2O), CO2 absorption, NPK nutrients & pH balance.
Active Channel: ${currentSensorMode}
Readings: CO2: 98.4% | H2O: 68.2% | NPK: OPT | pH: 6.42
(Click to cycle diagnostic mode)`}
        >
          {/* CNC-Machined Heavy Titanium Faceplate */}
          <rect x="0" y="0" width="200" height="78" rx="5.5" fill="url(#ultra-titanium-chassis)" stroke="#383e44" strokeWidth="1.6" />
          <rect x="4" y="4" width="192" height="70" rx="4" fill="#020403" stroke="#102214" strokeWidth="1.2" />

          {/* 4 Corner Screws */}
          {[
            { cx: 8, cy: 8 },
            { cx: 192, cy: 8 },
            { cx: 8, cy: 70 },
            { cx: 192, cy: 70 },
          ].map((sc, idx) => (
            <circle key={`tele-sc-${idx}`} cx={sc.cx} cy={sc.cy} r="1.8" fill="#1c2024" stroke="#4a5058" strokeWidth="0.6" />
          ))}

          {/* Zone A: 6-Channel Biological Spectrograph Equalizer Bars */}
          <g transform="translate(14, 12)">
            <rect x="0" y="0" width="48" height="52" rx="2.5" fill="#010402" stroke="#122816" strokeWidth="0.8" />
            {[
              { h: 32, label: '450' },
              { h: 42, label: '520' },
              { h: 26, label: '660' },
              { h: 38, label: '730' },
              { h: 22, label: 'PAR' },
              { h: 30, label: 'UV' },
            ].map((col, c) => (
              <g key={`spectro-bar-${c}`} transform={`translate(${4 + c * 7.2}, 5)`}>
                {/* Background Slot */}
                <line x1="1.8" y1="0" x2="1.8" y2="42" stroke="#061608" strokeWidth="3.5" strokeLinecap="round" />
                {/* Glowing Level Bar */}
                <line
                  x1="1.8"
                  y1="42"
                  x2="1.8"
                  y2={42 - col.h}
                  stroke={c === 1 || c === 3 ? '#d2ff70' : theme.primary}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#neon-phosphor-hard)"
                />
                {/* Peak Indicator Dot */}
                <circle cx="1.8" cy={42 - col.h} r="1.3" fill="#ffffff" />
              </g>
            ))}
          </g>

          {/* Zone B: 360° Biosonar Radar Scanner with Rotating Beam */}
          <g transform="translate(70, 12)">
            <rect x="0" y="0" width="60" height="52" rx="2.5" fill="#010402" stroke="#122816" strokeWidth="0.8" />
            {/* Concentric Range Rings */}
            <circle cx="30" cy="26" r="21" fill="none" stroke="#123214" strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="30" cy="26" r="14" fill="none" stroke="#1c4e20" strokeWidth="0.8" />
            <circle cx="30" cy="26" r="5" fill="#061808" stroke={theme.primary} strokeWidth="0.8" />
            <line x1="9" y1="26" x2="51" y2="26" stroke="#143616" strokeWidth="0.6" />
            <line x1="30" y1="5" x2="30" y2="47" stroke="#143616" strokeWidth="0.6" />

            {/* Continuous 360° Rotating Radar Sweep Beam */}
            <g transform="translate(30, 26)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4.5s"
                repeatCount="indefinite"
              />
              <line x1="0" y1="0" x2="21" y2="0" stroke="#ffffff" strokeWidth="1.4" filter="url(#neon-phosphor-hard)" />
              <polygon points="0 0, 21 -7, 21 0" fill={theme.primary} opacity="0.35" />
            </g>

            {/* Target Root Density Blips */}
            <circle cx="24" cy="18" r="2.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
            <circle cx="38" cy="22" r="2.6" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
            <circle cx="23" cy="33" r="1.8" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
            <circle cx="35" cy="35" r="2.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
          </g>

          {/* Zone C: Agritech Status Annunciator Matrix */}
          <g transform="translate(138, 12)">
            <rect x="0" y="0" width="50" height="52" rx="2.5" fill="#010302" stroke="#102414" strokeWidth="0.8" />
            {[
              { label: 'CO2', val: '98.4%', ok: true },
              { label: 'H2O', val: '68.2%', ok: true },
              { label: 'NPK', val: 'OPT', ok: true },
              { label: 'PH', val: '6.42', ok: true },
            ].map((row, r) => (
              <g key={`annunc-row-${r}`} transform={`translate(4, ${5 + r * 11.5})`}>
                <text x="0" y="8" fill="#88a878" fontSize="6.2" fontFamily="Rajdhani, sans-serif" fontWeight="700">
                  {row.label}
                </text>
                <text x="24" y="8" fill="#ffffff" fontSize="6.8" fontFamily="Share Tech Mono, monospace">
                  {row.val}
                </text>
                <circle cx="40" cy="5.5" r="2.0" fill={row.ok ? theme.primary : '#ff4444'} filter="url(#neon-phosphor-hard)" />
              </g>
            ))}
          </g>

          {/* Optical Glass Lens Cover Sheen */}
          <rect x="4" y="4" width="192" height="30" rx="4" fill="url(#ultra-glass-ar)" pointerEvents="none" />

          {/* Designation Text */}
          <text x="14" y="72" fill="#627680" fontSize="5.2" fontFamily="Share Tech Mono, monospace">
            TELEMETRY-03 // MODE: {currentSensorMode}
          </text>
        </g>

        {/* ======================================================== */}
        {/* 7. ULTRA-REALISTIC CIRCUIT 5: VERNIER CALIBRATION RULER  */}
        {/*    Location: Bottom-Center (670, 770)                    */}
        {/*    General Purpose: Optical Alignment Ground Bus         */}
        {/* ======================================================== */}
        <g
          transform="translate(670, 770)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.0);
            onNodeClick('SCALE-06', 'VERNIER CALIBRATION GROUND BUS');
          }}
          title="CIRCUIT 5: VERNIER OPTICAL GROUND BUS (RAIL-06)
General Purpose: Chassis optical alignment datum and multi-bus ground calibration.
Linear Span: 620 mm // Accuracy: 99.99%"
        >
          <rect x="0" y="0" width="620" height="30" rx="3.5" fill="url(#ultra-titanium-chassis)" stroke="#383e44" strokeWidth="1.4" />
          <rect x="2" y="2" width="616" height="26" rx="2" fill="#020405" stroke="#12161a" strokeWidth="0.8" />
          <line x1="0" y1="15" x2="620" y2="15" stroke={theme.primary} strokeWidth="1.6" filter="url(#neon-phosphor-hard)" />
          <line x1="0" y1="15" x2="620" y2="15" stroke="#ffffff" strokeWidth="0.7" />

          {/* Millimeter & Half-Millimeter Divisions */}
          {[...Array(32)].map((_, i) => (
            <line
              key={`ruler-div-${i}`}
              x1={i * 20}
              y1={i % 5 === 0 ? 3 : 8}
              x2={i * 20}
              y2={i % 5 === 0 ? 27 : 22}
              stroke={i % 5 === 0 ? '#ffffff' : theme.accent}
              strokeWidth={i % 5 === 0 ? 1.6 : 0.9}
            />
          ))}

          {/* Sliding Machined Solid Brass Vernier Caliper Clamp */}
          <g transform="translate(580, 0)">
            <rect x="-7" y="-2" width="16" height="34" rx="2" fill="url(#ultra-knurled-brass)" stroke="#181204" strokeWidth="0.9" />
            <line x1="1" y1="0" x2="1" y2="30" stroke="#ffffff" strokeWidth="0.9" />
            <circle cx="1" cy="6" r="1.8" fill="#2a1e06" />
          </g>
        </g>
      </svg>
    </div>
  );
};
