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
  // Direct tactile state (zero intrusive popups)
  const [cryoPumpActive, setCryoPumpActive] = useState(true);
  const [nutrientFlowActive, setNutrientFlowActive] = useState(true);
  const [freqStep, setFreqStep] = useState(0);
  const [cpuClockStep, setCpuClockStep] = useState(0);
  const [sensorChannel, setSensorChannel] = useState(0);

  const FREQUENCIES = [48.2, 52.8, 63.4, 72.0, 43.2];
  const CPU_CLOCKS = ['4.80 GHz', '5.20 GHz', '5.60 GHz', '4.40 GHz'];
  const SENSOR_MODES = ['ATMOSPHERIC', 'RHIZOSPHERE', 'NUTRIENT-NPK'];

  const currentFreq = FREQUENCIES[freqStep % FREQUENCIES.length];
  const currentClock = CPU_CLOCKS[cpuClockStep % CPU_CLOCKS.length];
  const currentSensorMode = SENSOR_MODES[sensorChannel % SENSOR_MODES.length];

  // Heavy Armored Metallic Conduit Trajectories with Junction Clamps
  const conduitPaths = useMemo(
    () => [
      // 1. Top-Center Stepped Bio-Rail
      'M 800 220 L 800 120 L 760 120 L 760 160 L 710 160 L 710 200 L 640 200 L 640 250 L 590 250',
      // 2. Top-Left Stepped Rail to Upper Left Canopy
      'M 590 250 L 520 250 L 520 180 L 480 180 L 480 140 L 410 140 L 410 95 L 360 95 L 360 65 L 260 65',
      // 3. Top-Left Horizontal Rail Section
      'M 520 250 L 260 250 L 260 220 L 200 220 L 160 250',
      // 4. Top-Center to Top-Right Capsule Header (Plugs into Photodiode Board Port at 1020, 128)
      'M 800 180 L 800 95 L 860 95 L 860 128 L 1020 128',
      // 4b. Capsule Right Exit Port to Heat Exchanger
      'M 1195 128 L 1230 128 L 1230 160 L 1280 160',
      // 5. Top-Right Louver Diagonal Feed
      'M 930 310 L 990 250 L 1090 250 L 1140 215 L 1200 215',
      // 6. Mid-Left Multi-Tier Horizontal Rail (Plugs into CPU Chip Right Port at 306, 355)
      'M 670 380 L 560 380 L 560 355 L 306 355',
      // 6b. CPU Chip Left Exit Port to Margin
      'M 146 355 L 120 355 L 120 390 L 70 390',
      // 7. Mid-Left Lower Horizontal Bar
      'M 660 440 L 540 440 L 500 480 L 440 480 L 400 440 L 260 440 L 220 440 L 180 480 L 110 480',
      // 8. Lower-Left Staircase Bus (Plugs into Console Right Socket at 410, 675)
      'M 710 540 L 630 620 L 570 620 L 540 675 L 410 675',
      // 8b. Lower-Left Console Bottom Exit Socket at 170, 755 to Ground Bus
      'M 170 755 L 120 755 L 90 780 L 50 810 L 15 810',
      // 9. Mid-Right Horizontal Bus (Plugs into Sensor Enclosure Left Port at 1140, 448)
      'M 940 448 L 1140 448',
      // 9b. Sensor Enclosure Right Exit Port at 1350, 448 to Margin
      'M 1350 448 L 1430 448',
      // 10. Lower-Right Descending Wing
      'M 930 510 L 990 565 L 1050 565 L 1090 605 L 1210 605 L 1250 520 L 1410 520',
      // 11. Bottom Stepped Grounding Rail
      'M 800 640 L 800 690 L 760 720 L 690 720 L 670 784 L 1290 784 L 1340 784 L 1380 755 L 1490 755 L 1490 825',
    ],
    []
  );

  // Cast Metal P-Clamp Brackets Anchoring Conduits
  const conduitClamps = useMemo(
    () => [
      { x: 760, y: 120, rot: 0 },
      { x: 710, y: 200, rot: 90 },
      { x: 520, y: 250, rot: 0 },
      { x: 480, y: 140, rot: 90 },
      { x: 860, y: 95, rot: 45 },
      { x: 990, y: 250, rot: 45 },
      { x: 560, y: 380, rot: 90 },
      { x: 120, y: 355, rot: 0 },
      { x: 500, y: 480, rot: 45 },
      { x: 260, y: 440, rot: 0 },
      { x: 630, y: 620, rot: 45 },
      { x: 540, y: 675, rot: 90 },
      { x: 90, y: 780, rot: 45 },
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
          {/* ======================================================== */}
          {/* 1. ULTRA-REALISTIC TEXTURE & MATERIAL GRADIENTS          */}
          {/* ======================================================== */}

          {/* Heavy Machined Brushed Dark Anodized Titanium/Aluminum */}
          <linearGradient id="ultra-brushed-titanium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#323840" />
            <stop offset="15%" stopColor="#252a30" />
            <stop offset="35%" stopColor="#1e2226" />
            <stop offset="55%" stopColor="#2b3138" />
            <stop offset="75%" stopColor="#181b1e" />
            <stop offset="100%" stopColor="#0d0f11" />
          </linearGradient>

          {/* Polished Chrome Chamfer Bevel Highlight */}
          <linearGradient id="ultra-chrome-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a8490" />
            <stop offset="25%" stopColor="#d4dbe4" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#94a0b0" />
            <stop offset="100%" stopColor="#48505a" />
          </linearGradient>

          {/* Chrome Bat Toggle Switch Cylinder */}
          <linearGradient id="ultra-chrome-bat" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#202428" />
            <stop offset="20%" stopColor="#8a94a2" />
            <stop offset="45%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#adb7c4" />
            <stop offset="90%" stopColor="#404650" />
            <stop offset="100%" stopColor="#181a1e" />
          </linearGradient>

          {/* Machined Solid Knurled Brass Dial */}
          <radialGradient id="ultra-brass-knurl" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff2b0" />
            <stop offset="25%" stopColor="#e8bf52" />
            <stop offset="60%" stopColor="#a37920" />
            <stop offset="85%" stopColor="#573e0a" />
            <stop offset="100%" stopColor="#241802" />
          </radialGradient>

          {/* FR4 Circuit Board Solder Mask Substrate */}
          <linearGradient id="ultra-pcb-substrate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d2212" />
            <stop offset="40%" stopColor="#08170c" />
            <stop offset="80%" stopColor="#051008" />
            <stop offset="100%" stopColor="#020603" />
          </linearGradient>

          {/* Electroplated Gold ENIG Trace */}
          <linearGradient id="ultra-gold-enig" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffeaa0" />
            <stop offset="30%" stopColor="#e5bd4e" />
            <stop offset="70%" stopColor="#ad8226" />
            <stop offset="100%" stopColor="#664910" />
          </linearGradient>

          {/* Copper Heat Exchanger Fin Metallic Gradient */}
          <linearGradient id="ultra-copper-metal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd8b0" />
            <stop offset="20%" stopColor="#f29952" />
            <stop offset="55%" stopColor="#d46720" />
            <stop offset="80%" stopColor="#8f3c0c" />
            <stop offset="100%" stopColor="#3d1603" />
          </linearGradient>

          {/* Bourdon Tube Dial Face Parchment Enamel */}
          <radialGradient id="ultra-gauge-dial" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f4f2ea" />
            <stop offset="90%" stopColor="#e2dece" />
            <stop offset="100%" stopColor="#b5af9c" />
          </radialGradient>

          {/* CRT Oscilloscope Screen Phosphor P31 Bed */}
          <radialGradient id="ultra-crt-screen" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#051f0c" />
            <stop offset="60%" stopColor="#021006" />
            <stop offset="90%" stopColor="#010702" />
            <stop offset="100%" stopColor="#000201" />
          </radialGradient>

          {/* VFD Display Vacuum Cavity */}
          <linearGradient id="ultra-vfd-cavity" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#030608" />
            <stop offset="50%" stopColor="#060c10" />
            <stop offset="100%" stopColor="#020406" />
          </linearGradient>

          {/* Green Industrial Polyamide Screw Terminal Block (Phoenix Contact Style) */}
          <linearGradient id="ultra-phoenix-green" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38a832" />
            <stop offset="25%" stopColor="#24841f" />
            <stop offset="75%" stopColor="#185c14" />
            <stop offset="100%" stopColor="#0d360b" />
          </linearGradient>

          {/* Woven Stainless Steel Wire Mesh Pattern (for MQ Gas Sensor Dome) */}
          <pattern id="ultra-wire-mesh-pat" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="#303840" />
            <line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#8896a6" strokeWidth="0.75" />
            <line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#b4c2d2" strokeWidth="0.75" />
            <circle cx="1.5" cy="1.5" r="0.4" fill="#ffffff" opacity="0.6" />
          </pattern>

          {/* Convex Glass Dome Optical Reflection */}
          <linearGradient id="ultra-glass-dome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="20%" stopColor="#dffff0" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="80%" stopColor="#90ffc8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
          </linearGradient>

          {/* Glass Meniscus Liquid in Borosilicate Tube */}
          <linearGradient id="ultra-glass-fluid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0ffa0" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#55e619" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#1d8706" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#082b02" stopOpacity="0.95" />
          </linearGradient>

          {/* Solder Mask Via Hole Ring */}
          <radialGradient id="ultra-via-annular" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe082" />
            <stop offset="60%" stopColor="#8a6519" />
            <stop offset="85%" stopColor="#0f1710" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* SMD Ceramic Capacitor */}
          <linearGradient id="ultra-smd-cap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9caab" />
            <stop offset="45%" stopColor="#a69272" />
            <stop offset="100%" stopColor="#5c4e36" />
          </linearGradient>

          {/* Realistic High-Intensity Glow Filter */}
          <filter id="neon-phosphor-hard" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b1" />
            <feGaussianBlur stdDeviation="3.6" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hardware Drop Shadow Filter */}
          <filter id="chassis-drop-shadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. HEAVY METALLIC CONDUITS & BRAIDED SHIELDED CABLES     */}
        {/* ======================================================== */}
        <g>
          {conduitPaths.map((path, idx) => (
            <g key={`conduit-layer-${idx}`}>
              {/* Outer conduit shadow */}
              <path d={path} fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="18" strokeLinecap="square" strokeLinejoin="miter" />
              {/* Armored sleeve outer collar */}
              <path d={path} fill="none" stroke="#121518" strokeWidth="14" strokeLinecap="square" strokeLinejoin="miter" />
              {/* Brushed steel conduit wall */}
              <path d={path} fill="none" stroke="#282e34" strokeWidth="11" strokeLinecap="square" strokeLinejoin="miter" />
              {/* Internal insulating channel */}
              <path d={path} fill="none" stroke="#06080a" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter" />
              {/* Fluid/photon core */}
              <path d={path} fill="none" stroke="#143216" strokeWidth="5.0" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke={theme.primary} strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" filter="url(#neon-phosphor-hard)" opacity="0.95" />
              <path d={path} fill="none" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="square" strokeLinejoin="miter" opacity="0.95" />
            </g>
          ))}
        </g>

        {/* Cast Steel P-Clamps Securing Conduit to Chassis */}
        <g>
          {conduitClamps.map((clamp, i) => (
            <g key={`p-clamp-${i}`} transform={`translate(${clamp.x}, ${clamp.y}) rotate(${clamp.rot})`}>
              {/* Clamp steel strap */}
              <rect x="-6" y="-8" width="12" height="16" rx="2" fill="url(#ultra-brushed-titanium)" stroke="#0a0c0e" strokeWidth="0.8" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#687482" strokeWidth="0.6" />
              {/* Central hex mounting bolt */}
              <circle cx="0" cy="0" r="2.2" fill="#505a66" stroke="#12161a" strokeWidth="0.5" />
              <polygon points="0 -1.2, 1 -0.6, 1 0.6, 0 1.2, -1 0.6, -1 -0.6" fill="#14181c" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 2. ULTRA-REALISTIC CIRCUIT 1: QUANTUM NEURAL PROCESSOR   */}
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
          filter="url(#chassis-drop-shadow)"
          title={`CIRCUIT 1: QUANTUM NEURAL CO-PROCESSOR (Q-PROC-8X)
General Purpose: High-speed neural computation of cellular photosynthesis & bio-electric telemetry synchronization.
Clock Speed: ${currentClock} (Active)
Architecture: 8-Core Quantum Silicon Die with 48-Pin Gold Gull-Wing Bus
Status: ONLINE // SYNCED
(Click to cycle clock frequency)`}
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

          {/* Surface Mount 0402 Decoupling Capacitors */}
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
                  <rect x="-12" y={y - 1.2} width="6.5" height="2.4" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M -12 ${y} L -4 ${y} L 4 ${y}`} stroke="#ffe082" strokeWidth="1.4" strokeLinecap="round" />
                  <path d={`M -5 ${y} L 4 ${y}`} stroke="#ffffff" strokeWidth="0.5" />
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
                  <rect x={x - 1.2} y="-12" width="2.4" height="6.5" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M ${x} -12 L ${x} -4 L ${x} 4`} stroke="#ffe082" strokeWidth="1.4" strokeLinecap="round" />
                  <path d={`M ${x} -5 L ${x} 4`} stroke="#ffffff" strokeWidth="0.5" />
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
            fill="url(#ultra-brushed-titanium)"
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
        {/* 3. ULTRA-REALISTIC CIRCUIT 2: ANALOG COMMAND TERMINAL    */}
        {/*    Location: Lower-Left (150, 600)                       */}
        {/*    General Purpose: Bio-Acoustic Resonator & Cryo Rack   */}
        {/* ======================================================== */}
        <g
          transform="translate(150, 600)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.4);
            onNodeClick('CONSOLE-05', 'ANALOG COMMAND TERMINAL MK-IV');
          }}
          filter="url(#chassis-drop-shadow)"
          title={`CIRCUIT 2: BIO-ACOUSTIC RESONATOR TERMINAL (AN/URM-482 MK-IV)
General Purpose: Generates sub-audible acoustic standing waves (48.2 Hz) to stimulate plant stomata, and commands high-pressure cryogenic coolant pumps.
Tuning Frequency: ${currentFreq.toFixed(1)} Hz (Active)
Cryo Manifold: ${cryoPumpActive ? 'PRIMARY PUMP ENGAGED' : 'STANDBY'}
Nutrient Sap Flow: ${nutrientFlowActive ? 'CIRCULATING' : 'ISOLATED'}
(Click toggle switches / rotary dial directly to operate hardware)`}
        >
          {/* Heavy 3mm CNC-Milled Dark Brushed Aluminum Faceplate */}
          <rect x="0" y="0" width="254" height="152" rx="7" fill="url(#ultra-brushed-titanium)" stroke="#0c0e10" strokeWidth="2.0" />
          {/* Milled Perimeter Chamfer Highlight */}
          <rect x="2" y="2" width="250" height="148" rx="5.5" fill="none" stroke="url(#ultra-chrome-edge)" strokeWidth="1.0" opacity="0.8" />
          <rect x="5" y="5" width="244" height="142" rx="4" fill="#030406" stroke="#12161a" strokeWidth="1.2" />

          {/* 4 Heavy Countersunk Stainless Steel Hex Screws */}
          {[
            { cx: 10, cy: 10 },
            { cx: 244, cy: 10 },
            { cx: 10, cy: 142 },
            { cx: 244, cy: 142 },
          ].map((screw, idx) => (
            <g key={`term-screw-${idx}`}>
              <circle cx={screw.cx} cy={screw.cy} r="3.4" fill="#444c56" stroke="#12161a" strokeWidth="0.8" />
              <circle cx={screw.cx} cy={screw.cy} r="2.4" fill="#20242a" />
              {/* Internal Hex Star/Socket */}
              <polygon
                points={`
                  ${screw.cx} ${screw.cy - 1.5},
                  ${screw.cx + 1.3} ${screw.cy - 0.75},
                  ${screw.cx + 1.3} ${screw.cy + 0.75},
                  ${screw.cx} ${screw.cy + 1.5},
                  ${screw.cx - 1.3} ${screw.cy + 0.75},
                  ${screw.cx - 1.3} ${screw.cy - 0.75}
                `}
                fill="#0a0c0e"
              />
            </g>
          ))}

          {/* Stamped Military Avionics Nomenclature Plate */}
          <g transform="translate(18, 12)">
            <rect x="0" y="0" width="112" height="12" rx="1.5" fill="#12161a" stroke="#2a323c" strokeWidth="0.8" />
            {/* Rivets holding plate */}
            <circle cx="3" cy="6" r="1.1" fill="#7a8896" stroke="#000000" strokeWidth="0.4" />
            <circle cx="109" cy="6" r="1.1" fill="#7a8896" stroke="#000000" strokeWidth="0.4" />
            <text x="56" y="8.5" fill="#a4b4c4" fontSize="4.6" fontFamily="Rajdhani, sans-serif" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
              AN/URM-482 RESONATOR // MIL-STD-810G
            </text>
          </g>

          {/* Heavy Machined Solid Aluminum Vernier Tuning Dial */}
          <g
            transform="translate(42, 48)"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playServo();
              setFreqStep((prev) => prev + 1);
            }}
            title="Vernier Tuning Dial: Click to step acoustic frequency"
          >
            {/* Radial Graduated Dial Skirt (0 - 100 ticks) */}
            <circle cx="0" cy="0" r="22" fill="#14181c" stroke="#283038" strokeWidth="1.0" />
            {[...Array(24)].map((_, i) => {
              const angle = i * 15;
              const rad = (angle * Math.PI) / 180;
              const isMajor = i % 3 === 0;
              return (
                <line
                  key={`dial-tick-${i}`}
                  x1={Math.cos(rad) * 18}
                  y1={Math.sin(rad) * 18}
                  x2={Math.cos(rad) * (isMajor ? 21.5 : 19.8)}
                  y2={Math.sin(rad) * (isMajor ? 21.5 : 19.8)}
                  stroke={isMajor ? '#ffffff' : '#687888'}
                  strokeWidth={isMajor ? 1.0 : 0.6}
                />
              );
            })}

            {/* Knurled Outer Grip Ring */}
            <circle cx="0" cy="0" r="15" fill="url(#ultra-brass-knurl)" stroke="#120c02" strokeWidth="1.2" />
            {/* Recessed Cap */}
            <circle cx="0" cy="0" r="11" fill="url(#ultra-brushed-titanium)" stroke="#38424e" strokeWidth="0.8" />
            {/* White Index Line */}
            <line x1="0" y1="-3" x2="0" y2="-10.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" filter="url(#neon-phosphor-hard)" />
            {/* Central Brass Cap */}
            <circle cx="0" cy="0" r="2.8" fill="#ffd778" />
          </g>

          {/* TWO APEM-STYLE HEAVY DUTY CHROME BAT TOGGLE SWITCHES */}
          <g transform="translate(85, 26)">
            {/* Switch 1: CRYO PUMP */}
            <g
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick(1.6);
                setCryoPumpActive((prev) => !prev);
              }}
              title="Heavy Toggle: Click to switch Cryo Pump ON / STBY"
            >
              {/* Stamped Aluminum Switch Escutcheon Plate */}
              <rect x="0" y="0" width="32" height="48" rx="2" fill="#14181c" stroke="#323c46" strokeWidth="0.8" />
              <text x="16" y="8" fill="#8898a8" fontSize="4.2" fontFamily="Rajdhani, sans-serif" fontWeight="700" textAnchor="middle">
                CRYO
              </text>
              <text x="16" y="44" fill={cryoPumpActive ? theme.primary : '#4a5864'} fontSize="3.8" fontFamily="Share Tech Mono, monospace" textAnchor="middle">
                {cryoPumpActive ? 'ON' : 'STBY'}
              </text>

              {/* Threaded Hex Nut Bushing */}
              <circle cx="16" cy="24" r="7.5" fill="#505a66" stroke="#101418" strokeWidth="0.9" />
              <circle cx="16" cy="24" r="5.2" fill="#1c2228" stroke="#38424c" strokeWidth="0.6" />

              {/* Metal Bat Lever (physically tilts based on state) */}
              <g transform={cryoPumpActive ? 'translate(16, 24) rotate(-22)' : 'translate(16, 24) rotate(22)'}>
                <rect x="-2.2" y="-14" width="4.4" height="14" rx="2.0" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <circle cx="0" cy="-14" r="3.2" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <line x1="-0.8" y1="-13" x2="-0.8" y2="-2" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              </g>

              {/* Pilot Jewel Lamp with Chrome Bezel */}
              <circle cx="16" cy="35" r="2.8" fill="#1c2024" stroke="#4a5662" strokeWidth="0.6" />
              <circle cx="16" cy="35" r="1.8" fill={cryoPumpActive ? '#4de0ff' : '#143844'} filter={cryoPumpActive ? 'url(#neon-phosphor-hard)' : undefined} />
            </g>

            {/* Switch 2: SAP PUMP */}
            <g
              transform="translate(38, 0)"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick(1.2);
                setNutrientFlowActive((prev) => !prev);
              }}
              title="Heavy Toggle: Click to switch Nutrient Flow ON / OFF"
            >
              {/* Escutcheon Plate */}
              <rect x="0" y="0" width="32" height="48" rx="2" fill="#14181c" stroke="#323c46" strokeWidth="0.8" />
              <text x="16" y="8" fill="#8898a8" fontSize="4.2" fontFamily="Rajdhani, sans-serif" fontWeight="700" textAnchor="middle">
                SAP
              </text>
              <text x="16" y="44" fill={nutrientFlowActive ? '#88ff38' : '#4a5864'} fontSize="3.8" fontFamily="Share Tech Mono, monospace" textAnchor="middle">
                {nutrientFlowActive ? 'FLOW' : 'OFF'}
              </text>

              {/* Threaded Hex Nut Bushing */}
              <circle cx="16" cy="24" r="7.5" fill="#505a66" stroke="#101418" strokeWidth="0.9" />
              <circle cx="16" cy="24" r="5.2" fill="#1c2228" stroke="#38424c" strokeWidth="0.6" />

              {/* Metal Bat Lever */}
              <g transform={nutrientFlowActive ? 'translate(16, 24) rotate(-22)' : 'translate(16, 24) rotate(22)'}>
                <rect x="-2.2" y="-14" width="4.4" height="14" rx="2.0" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <circle cx="0" cy="-14" r="3.2" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <line x1="-0.8" y1="-13" x2="-0.8" y2="-2" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              </g>

              {/* Pilot Jewel Lamp */}
              <circle cx="16" cy="35" r="2.8" fill="#1c2024" stroke="#4a5662" strokeWidth="0.6" />
              <circle cx="16" cy="35" r="1.8" fill={nutrientFlowActive ? theme.primary : '#183814'} filter={nutrientFlowActive ? 'url(#neon-phosphor-hard)' : undefined} />
            </g>
          </g>

          {/* TWO BNC COAXIAL CONNECTORS */}
          <g transform="translate(168, 28)">
            {[
              { label: 'CH1 OUT 50Ω', x: 0 },
              { label: 'EXT SYNC', x: 38 },
            ].map((bnc, i) => (
              <g key={`bnc-${i}`} transform={`translate(${bnc.x}, 0)`}>
                {/* Knurled Outer BNC Collar */}
                <circle cx="15" cy="18" r="9.5" fill="#444d58" stroke="#14181c" strokeWidth="1.0" />
                {/* Bayonet Locking Pins */}
                <rect x="4.5" y="17" width="2" height="2" fill="#d0d8e2" />
                <rect x="23.5" y="17" width="2" height="2" fill="#d0d8e2" />
                {/* White Teflon Dielectric Insulator */}
                <circle cx="15" cy="18" r="6.0" fill="#f0f4f8" stroke="#707c8a" strokeWidth="0.6" />
                {/* Gold Center Pin Receptacle */}
                <circle cx="15" cy="18" r="2.2" fill="#ffc838" stroke="#4a3606" strokeWidth="0.5" />
                <circle cx="15" cy="18" r="0.8" fill="#000000" />
                <text x="15" y="34" fill="#7a8896" fontSize="3.8" fontFamily="Share Tech Mono, monospace" textAnchor="middle">
                  {bnc.label}
                </text>
              </g>
            ))}
          </g>

          {/* TEKTRONIX-STYLE RECESSED CRT OSCILLOSCOPE (P31 PHOSPHOR) */}
          <g transform="translate(16, 78)">
            {/* Molded Bezel Frame */}
            <rect x="0" y="0" width="148" height="58" rx="4" fill="#0a0d10" stroke="#242c34" strokeWidth="1.4" />
            {/* Smoked CRT Faceplate */}
            <rect x="3" y="3" width="142" height="52" rx="3" fill="url(#ultra-crt-screen)" stroke="#122818" strokeWidth="1.0" />

            {/* Internal Precision Graticule (10x8 subdivisions + center ticks) */}
            <g stroke="#0c2e14" strokeWidth="0.5" opacity="0.85">
              {[...Array(9)].map((_, i) => (
                <line key={`crt-v-${i}`} x1={14 + i * 14.2} y1="3" x2={14 + i * 14.2} y2="55" strokeDasharray="1 2" />
              ))}
              {[...Array(5)].map((_, i) => (
                <line key={`crt-h-${i}`} x1="3" y1={11 + i * 10.4} x2="145" y2={11 + i * 10.4} strokeDasharray="1 2" />
              ))}
              {/* Solid Center Crosshair */}
              <line x1="3" y1="29" x2="145" y2="29" stroke="#164e22" strokeWidth="0.8" />
              <line x1="71" y1="3" x2="71" y2="55" stroke="#164e22" strokeWidth="0.8" />
            </g>

            {/* Authentic Cathode-Ray Electron Beam Waveforms */}
            <path
              d="M 6 29 Q 24 9 42 29 T 78 29 T 114 29 T 142 29"
              fill="none"
              stroke={theme.primary}
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#neon-phosphor-hard)"
            />
            <path
              d="M 6 29 Q 24 49 42 29 T 78 29 T 114 29 T 142 29"
              fill="none"
              stroke="#b5ff54"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
              filter="url(#neon-phosphor-hard)"
            />
            {/* Central Optical Focus Node */}
            <circle cx="71" cy="29" r="2.8" fill="#ffffff" filter="url(#neon-phosphor-hard)" />

            {/* Curved Heavy Glass Optical Reflection */}
            <path d="M 3 3 L 145 3 L 125 24 L 3 24 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
          </g>

          {/* VINTAGE LED 7-SEGMENT FREQUENCY DISPLAY & STATUS ANNUNCIATORS */}
          <g transform="translate(172, 78)">
            {/* Display Enclosure with Optical Filter Window */}
            <rect x="0" y="0" width="70" height="28" rx="2.5" fill="#040608" stroke="#1a242c" strokeWidth="1.0" />
            <rect x="2" y="2" width="66" height="24" rx="1.8" fill="#051208" stroke="#103214" strokeWidth="0.8" />

            {/* Glowing Segmented Frequency Text */}
            <text x="35" y="18" fill={theme.primary} fontSize="10.5" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle" filter="url(#neon-phosphor-hard)">
              {currentFreq.toFixed(1)} Hz
            </text>

            {/* 3 Real Faceted Panel Indicator Lamps */}
            <g transform="translate(6, 38)">
              {/* Lamp 1: PHASE LOCK */}
              <circle cx="0" cy="0" r="4.2" fill="#303842" stroke="#0e1216" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.6" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
              <circle cx="0" cy="0" r="0.8" fill="#ffffff" />
              <text x="0" y="9" fill="#7a8894" fontSize="3.2" fontFamily="Share Tech Mono, monospace" textAnchor="middle">PHASE</text>

              {/* Lamp 2: RESONANCE */}
              <circle cx="27" cy="0" r="4.2" fill="#303842" stroke="#0e1216" strokeWidth="0.8" />
              <circle cx="27" cy="0" r="2.6" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
              <circle cx="27" cy="0" r="0.8" fill="#ffffff" />
              <text x="27" y="9" fill="#7a8894" fontSize="3.2" fontFamily="Share Tech Mono, monospace" textAnchor="middle">SYNC</text>

              {/* Lamp 3: CRYO INTERLOCK */}
              <circle cx="54" cy="0" r="4.2" fill="#303842" stroke="#0e1216" strokeWidth="0.8" />
              <circle cx="54" cy="0" r="2.6" fill={cryoPumpActive ? "#4de0ff" : "#ff4d4d"} filter="url(#neon-phosphor-hard)" />
              <circle cx="54" cy="0" r="0.8" fill="#ffffff" />
              <text x="54" y="9" fill="#7a8894" fontSize="3.2" fontFamily="Share Tech Mono, monospace" textAnchor="middle">CRYO</text>
            </g>
          </g>

          {/* Technical Identification Label */}
          <text x="18" y="146" fill="#687684" fontSize="4.6" fontFamily="Rajdhani, sans-serif" fontWeight="700" letterSpacing="1.2">
            AGRI-CORE COMMAND TERMINAL // BIO-ELECTRIC BUS MK-IV // REV 4.2
          </text>
        </g>

        {/* ======================================================== */}
        {/* 4. ULTRA-REALISTIC CIRCUIT 3: PAR SENSOR & HEAT RADIATOR */}
        {/*    Location: Top-Right (1020..1480, 95..220)             */}
        {/*    General Purpose: Photodiode Flux & Fluid Radiator     */}
        {/* ======================================================== */}
        {/* 4A. Discrete Industrial Dual-In-Line LED Bargraph & Photodiode PCB */}
        <g
          transform="translate(1020, 95)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.0);
            onNodeClick('CAPSULE-01', 'PAR PHOTODIODE FLUX SPECTROMETER');
          }}
          filter="url(#chassis-drop-shadow)"
          title="CIRCUIT 3A: PAR PHOTODIODE FLUX SPECTROMETER (OPT-800)
General Purpose: Measures Photosynthetically Active Radiation flux (PPFD: 1,420 µmol/m²s) using hermetic TO-39 photodiode detectors and discrete LED bargraph.
Detector: Dual Silicon PIN Photodiode (400-700 nm)
Display Driver: LM3914N Precision Analog LED Ladder
(Click to calibrate flux integration)"
        >
          {/* FR4 Circuit Board Substrate */}
          <rect x="0" y="0" width="176" height="58" rx="4" fill="url(#ultra-pcb-substrate)" stroke="#16381e" strokeWidth="1.4" />
          <rect x="2" y="2" width="172" height="54" rx="3" fill="none" stroke="#22542e" strokeWidth="0.6" opacity="0.6" />

          {/* 4 Brass PCB Mounting Standoffs */}
          {[
            { cx: 6, cy: 6 },
            { cx: 170, cy: 6 },
            { cx: 6, cy: 52 },
            { cx: 170, cy: 52 },
          ].map((st, i) => (
            <circle key={`pcb-st-${i}`} cx={st.cx} cy={st.cy} r="2.6" fill="url(#ultra-brass-knurl)" stroke="#181204" strokeWidth="0.6" />
          ))}

          {/* TWO TO-39 HERMETIC METAL CAN PHOTODIODES WITH QUARTZ WINDOWS */}
          <g transform="translate(14, 18)">
            {/* Photodiode 1: PAR SPECTRUM */}
            <circle cx="10" cy="11" r="9.0" fill="#d6aa38" stroke="#5a420a" strokeWidth="1.0" />
            <circle cx="10" cy="11" r="7.2" fill="#14181c" stroke="#38424e" strokeWidth="0.6" />
            {/* Silicon chip visible inside */}
            <rect x="7" y="8" width="6" height="6" fill="#080c14" stroke="#445566" strokeWidth="0.5" />
            {/* Gold bonding wire */}
            <line x1="7" y1="9" x2="4" y2="6" stroke="#ffe082" strokeWidth="0.4" />
            {/* Glass quartz reflection */}
            <circle cx="10" cy="11" r="7.2" fill="url(#ultra-glass-dome)" />
            <text x="10" y="26" fill="#7a9684" fontSize="3.6" fontFamily="Share Tech Mono, monospace" textAnchor="middle">PD1:PAR</text>

            {/* Photodiode 2: FAR-RED / IR */}
            <circle cx="34" cy="11" r="9.0" fill="#d6aa38" stroke="#5a420a" strokeWidth="1.0" />
            <circle cx="34" cy="11" r="7.2" fill="#14181c" stroke="#38424e" strokeWidth="0.6" />
            <rect x="31" y="8" width="6" height="6" fill="#080c14" stroke="#445566" strokeWidth="0.5" />
            <line x1="31" y1="9" x2="28" y2="6" stroke="#ffe082" strokeWidth="0.4" />
            <circle cx="34" cy="11" r="7.2" fill="url(#ultra-glass-dome)" />
            <text x="34" y="26" fill="#7a9684" fontSize="3.6" fontFamily="Share Tech Mono, monospace" textAnchor="middle">PD2:NIR</text>
          </g>

          {/* DISCRETE 20-SEGMENT INDUSTRIAL DIP LED BARGRAPH MODULE */}
          <g transform="translate(64, 12)">
            {/* Molded Epoxy Package Housing */}
            <rect x="0" y="0" width="104" height="28" rx="2" fill="#080c0e" stroke="#1c282e" strokeWidth="1.0" />

            {/* 20 Discrete Rectangular Phosphor Segments */}
            {[...Array(20)].map((_, i) => {
              const isPeak = i >= 16;
              const isUnlit = i >= 18;
              return (
                <g key={`dip-bar-${i}`} transform={`translate(${4 + i * 4.8}, 3)`}>
                  {/* Leadframe pin background */}
                  <rect x="0" y="0" width="3.4" height="22" rx="0.5" fill="#101814" stroke="#040806" strokeWidth="0.4" />
                  {/* Active tinted phosphor bar */}
                  <rect
                    x="0.4"
                    y="0.4"
                    width="2.6"
                    height="21.2"
                    rx="0.4"
                    fill={isUnlit ? '#18241a' : isPeak ? '#ffb738' : theme.primary}
                    opacity={isUnlit ? 0.3 : 0.95}
                    filter={!isUnlit ? 'url(#neon-phosphor-hard)' : undefined}
                  />
                  {/* Internal gold wire bond dot */}
                  <circle cx="1.7" cy="11" r="0.4" fill="#ffffff" opacity={isUnlit ? 0.2 : 0.9} />
                </g>
              );
            })}

            {/* Center Reference Alignment Wire */}
            <line x1="4" y1="14" x2="100" y2="14" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
          </g>

          {/* Calibrated Printed Scale & LM3914 Driver Nomenclature */}
          <g fill="#7a9282" fontFamily="Share Tech Mono, monospace" fontSize="4.2">
            <text x="66" y="48">PPFD: 1,420 µmol/m²s</text>
            <text x="132" y="48">LM3914N</text>
          </g>

          {/* Surface Mount Decoupling Capacitor & Gold SMA Coaxial Port */}
          <g transform="translate(164, 26)">
            <rect x="-4" y="-7" width="6" height="14" rx="1.5" fill="url(#ultra-brass-knurl)" stroke="#201402" strokeWidth="0.6" />
            <circle cx="-1" cy="0" r="1.4" fill="#ffc838" />
          </g>
        </g>

        {/* 4B. Heavy Industrial Nutrient Thermal Radiator & High-Pressure Fluid Manifold */}
        <g
          transform="translate(1205, 125)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1200);
            onNodeClick('LOUVER-02', 'NUTRIENT THERMAL RADIATOR MANIFOLD');
          }}
          filter="url(#chassis-drop-shadow)"
          title="CIRCUIT 3B: HIGH-PRESSURE NUTRIENT HEAT EXCHANGER & MANIFOLD
General Purpose: Thermal stabilization of enriched sap circulating through the bioreactor core using extruded copper radiator fins and a borosilicate sight-glass manifold.
System Pressure: 4.8 BAR (70 PSI)
Coolant Delta-T: -4.6°C
(Click to inspect hydraulic loop)"
        >
          {/* Heavy Cast Aluminum Chassis Bracket */}
          <polygon
            points="0 64, 28 0, 204 0, 238 64, 290 64, 290 64"
            fill="url(#ultra-brushed-titanium)"
            stroke="#101418"
            strokeWidth="1.8"
          />

          {/* 14 INDIVIDUAL EXTRUDED METALLIC COPPER RADIATOR FINS */}
          <g transform="translate(32, 6)">
            {[...Array(14)].map((_, i) => (
              <g key={`copper-fin-${i}`}>
                {/* Copper fin body */}
                <rect
                  x={i * 11.8}
                  y="0"
                  width="6.2"
                  height="46"
                  rx="1.2"
                  fill="url(#ultra-copper-metal)"
                  stroke="#301404"
                  strokeWidth="0.8"
                />
                {/* Specular rolled-edge highlight */}
                <line x1={i * 11.8 + 1.2} y1="1" x2={i * 11.8 + 1.2} y2="45" stroke="#ffe2c4" strokeWidth="0.8" opacity="0.8" />
                {/* Airflow cooling louver slot */}
                <rect x={i * 11.8 + 2.2} y="14" width="1.8" height="18" rx="0.9" fill="#140602" />
              </g>
            ))}
          </g>

          {/* HIGH-PRESSURE BOROSILICATE SIGHT-GLASS TUBE WITH LIQUID MENISCUS */}
          <g transform="translate(24, 24)">
            {/* Heavy Brass Hex Compression Fittings (Left & Right Ends) */}
            <rect x="-8" y="-4" width="12" height="20" rx="1.5" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.8" />
            <polygon points="-8 -4, -2 -4, 4 -1, 4 13, -2 16, -8 16" fill="#e8c258" opacity="0.5" />
            <rect x="176" y="-4" width="12" height="20" rx="1.5" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.8" />

            {/* Thick-Wall Glass Outer Tube */}
            <rect x="4" y="0" width="172" height="12" rx="6" fill="#040c06" stroke="#16381e" strokeWidth="1.0" />
            {/* Flowing Bioluminescent Nutrient Fluid */}
            <rect x="6" y="2" width="168" height="8" rx="4" fill="url(#ultra-glass-fluid)" filter="url(#neon-phosphor-hard)" />
            {/* Cylindrical Specular Glass Highlight */}
            <line x1="8" y1="3.5" x2="172" y2="3.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.95" />

            {/* Micro-bubbles inside fluid */}
            <circle cx="34" cy="5" r="1.1" fill="#ffffff" opacity="0.8" />
            <circle cx="78" cy="7" r="1.4" fill="#ffffff" opacity="0.7" />
            <circle cx="122" cy="5" r="1.0" fill="#ffffff" opacity="0.8" />
          </g>

          {/* ULTRA-REALISTIC ANALOG BOURDON TUBE PRESSURE GAUGE */}
          <g transform="translate(262, 38)">
            {/* Knurled Polished Brass Gauge Case */}
            <circle cx="0" cy="0" r="19" fill="url(#ultra-brass-knurl)" stroke="#181002" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="15.5" fill="#14181c" stroke="#323a44" strokeWidth="0.8" />
            {/* Parchment Enamel Dial Face */}
            <circle cx="0" cy="0" r="14" fill="url(#ultra-gauge-dial)" stroke="#606870" strokeWidth="0.6" />

            {/* Dual BAR & PSI Radial Scales */}
            {[...Array(11)].map((_, i) => {
              const angle = -140 + i * 28;
              const rad = (angle * Math.PI) / 180;
              const isOverpressure = i >= 8;
              return (
                <line
                  key={`gauge-mark-${i}`}
                  x1={Math.cos(rad) * 9.5}
                  y1={Math.sin(rad) * 9.5}
                  x2={Math.cos(rad) * 13.0}
                  y2={Math.sin(rad) * 13.0}
                  stroke={isOverpressure ? '#dc2626' : '#14181c'}
                  strokeWidth={i % 2 === 0 ? 1.0 : 0.6}
                />
              );
            })}

            {/* Dial Legend & Manufacturer Mark */}
            <text x="0" y="-4" fill="#1a2028" fontSize="3.2" fontFamily="Rajdhani, sans-serif" fontWeight="700" textAnchor="middle">BAR</text>
            <text x="0" y="8" fill="#505a66" fontSize="2.6" fontFamily="Share Tech Mono, monospace" textAnchor="middle">4.8</text>

            {/* Teardrop Balanced Steel Needle (Pointing at 4.8 BAR) */}
            <g transform="rotate(-15)">
              <line x1="0" y1="3" x2="0" y2="-11.5" stroke="#121518" strokeWidth="1.2" strokeLinecap="round" />
              <polygon points="-1.0 3, 1.0 3, 0 5.5" fill="#121518" />
              <circle cx="0" cy="0" r="2.4" fill="url(#ultra-brass-knurl)" stroke="#120e04" strokeWidth="0.5" />
            </g>

            {/* Convex Curved Crystal Glass Lens Reflection */}
            <path d="M -12 -8 A 14 14 0 0 1 12 -8 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
          </g>

          {/* Silkscreen Identification */}
          <text x="32" y="60" fill="#8898a8" fontSize="4.6" fontFamily="Share Tech Mono, monospace">
            MANIFOLD: 4.8 BAR // COOLANT GRADIENT: -4.6°C
          </text>
        </g>

        {/* ======================================================== */}
        {/* 5. ULTRA-REALISTIC CIRCUIT 4: TELEMETRY SENSOR ENCLOSURE */}
        {/*    Location: Mid-Right (1140, 395)                       */}
        {/*    General Purpose: Rhizosphere & Atmospheric Sensors    */}
        {/* ======================================================== */}
        <g
          transform="translate(1140, 395)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1600);
            setSensorChannel((prev) => prev + 1);
            onNodeClick('DISPLAY-04', 'RHIZOSPHERE TELEMETRY NODE');
          }}
          filter="url(#chassis-drop-shadow)"
          title={`CIRCUIT 4: RHIZOSPHERE & ATMOSPHERIC TELEMETRY NODE (ENV-900)
General Purpose: Multi-channel gas spectrograph and 360° root biosonar radar measuring soil moisture (H2O), CO2 uptake, NPK balance & pH.
Sensors: MQ-135 Electrochemical Gas Mesh Sensor, SHT-31 Barometric Transducer, 6-Band Spectral Array
Active Mode: ${currentSensorMode}
(Click to cycle diagnostic channel)`}
        >
          {/* Heavy Cast Aluminum Instrument Enclosure */}
          <rect x="0" y="0" width="224" height="98" rx="6" fill="url(#ultra-brushed-titanium)" stroke="#0c0e10" strokeWidth="2.0" />
          <rect x="2" y="2" width="220" height="94" rx="5" fill="none" stroke="url(#ultra-chrome-edge)" strokeWidth="0.9" opacity="0.75" />
          <rect x="5" y="5" width="214" height="88" rx="4" fill="#030507" stroke="#121820" strokeWidth="1.2" />

          {/* 4 Knurled Stainless Steel Captive Panel Thumbscrews */}
          {[
            { cx: 9, cy: 9 },
            { cx: 215, cy: 9 },
            { cx: 9, cy: 89 },
            { cx: 215, cy: 89 },
          ].map((ts, idx) => (
            <g key={`encl-ts-${idx}`}>
              <circle cx={ts.cx} cy={ts.cy} r="3.2" fill="#505a66" stroke="#101418" strokeWidth="0.8" />
              <line x1={ts.cx - 2.2} y1={ts.cy} x2={ts.cx + 2.2} y2={ts.cy} stroke="#101418" strokeWidth="0.8" />
              <line x1={ts.cx} y1={ts.cy - 2.2} x2={ts.cx} y2={ts.cy + 2.2} stroke="#101418" strokeWidth="0.8" />
            </g>
          ))}

          {/* ZONE A: REAL PHYSICAL SENSORS (MQ-135 WIRE MESH GAS DOME & SHT-31) */}
          <g transform="translate(16, 14)">
            {/* Sensor Compartment Shield Bay */}
            <rect x="0" y="0" width="56" height="58" rx="2" fill="#06090c" stroke="#1c2630" strokeWidth="1.0" />

            {/* MQ-135 Gas Sensor: Circular Stainless Steel Wire Mesh Dome */}
            <g transform="translate(28, 20)">
              {/* Bakelite mounting base ring */}
              <circle cx="0" cy="0" r="16" fill="#14181c" stroke="#384450" strokeWidth="1.0" />
              <circle cx="0" cy="0" r="13" fill="url(#ultra-wire-mesh-pat)" stroke="#8090a2" strokeWidth="1.0" />
              {/* Internal Glowing Heating Coil Filament */}
              <circle cx="0" cy="0" r="4.5" fill="#ff7014" opacity="0.85" filter="url(#neon-phosphor-hard)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffe294" />
              {/* Cylindrical Dome Highlight */}
              <path d="M -10 -5 A 13 13 0 0 1 10 -5 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
            </g>

            {/* SHT-31 MEMS Sensor Metal LGA Package */}
            <rect x="8" y="40" width="16" height="12" rx="1.2" fill="#d0d8e2" stroke="#44505c" strokeWidth="0.6" />
            <circle cx="12" cy="46" r="1.0" fill="#101418" />
            <text x="28" y="49" fill="#7a8c9e" fontSize="3.8" fontFamily="Share Tech Mono, monospace">SHT-31</text>
            <text x="28" y="55" fill="#586c7c" fontSize="3.4" fontFamily="Share Tech Mono, monospace">CO2/GAS</text>
          </g>

          {/* ZONE B: BIOSONAR ACOUSTIC RADAR SCOPE (360° BEAM SWEEP) */}
          <g transform="translate(78, 14)">
            {/* Deep Radar Recess */}
            <rect x="0" y="0" width="62" height="58" rx="2" fill="#030805" stroke="#102e18" strokeWidth="1.0" />
            {/* Concentric Range Rings */}
            <circle cx="31" cy="29" r="23" fill="none" stroke="#123a18" strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="31" cy="29" r="15" fill="none" stroke="#185222" strokeWidth="0.8" />
            <circle cx="31" cy="29" r="6" fill="#061a0a" stroke={theme.primary} strokeWidth="0.8" />
            <line x1="8" y1="29" x2="54" y2="29" stroke="#14421c" strokeWidth="0.6" />
            <line x1="31" y1="6" x2="31" y2="52" stroke="#14421c" strokeWidth="0.6" />

            {/* 360° Continuously Rotating Biosonar Sweep Beam */}
            <g transform="translate(31, 29)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4.5s"
                repeatCount="indefinite"
              />
              <line x1="0" y1="0" x2="23" y2="0" stroke="#ffffff" strokeWidth="1.4" filter="url(#neon-phosphor-hard)" />
              <polygon points="0 0, 23 -8, 23 0" fill={theme.primary} opacity="0.38" />
            </g>

            {/* Target Root Density Blips */}
            <circle cx="23" cy="20" r="2.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
            <circle cx="41" cy="24" r="2.6" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
            <circle cx="24" cy="38" r="1.8" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
            <circle cx="38" cy="39" r="2.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />

            {/* Curved Radar Glass Glint */}
            <path d="M 8 8 A 23 23 0 0 1 54 8 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
          </g>

          {/* ZONE C: VACUUM FLUORESCENT DISPLAY (VFD) MATRIX */}
          <g transform="translate(146, 14)">
            {/* VFD Vacuum Cavity Tube Housing */}
            <rect x="0" y="0" width="62" height="58" rx="2" fill="url(#ultra-vfd-cavity)" stroke="#162e24" strokeWidth="1.0" />

            {/* Ultra-Fine Cathode Filament Grid Lines */}
            <line x1="2" y1="14" x2="60" y2="14" stroke="#4ade80" strokeWidth="0.25" opacity="0.25" />
            <line x1="2" y1="28" x2="60" y2="28" stroke="#4ade80" strokeWidth="0.25" opacity="0.25" />
            <line x1="2" y1="42" x2="60" y2="42" stroke="#4ade80" strokeWidth="0.25" opacity="0.25" />

            {/* Segmented Glowing VFD Characters */}
            {[
              { label: 'CO2', val: '98.4%', ok: true },
              { label: 'H2O', val: '68.2%', ok: true },
              { label: 'NPK', val: 'OPT', ok: true },
              { label: 'pH', val: '6.42', ok: true },
            ].map((row, r) => (
              <g key={`vfd-row-${r}`} transform={`translate(4, ${4 + r * 13})`}>
                <text x="0" y="9" fill="#68e4a4" fontSize="6.4" fontFamily="Rajdhani, sans-serif" fontWeight="700" filter="url(#neon-phosphor-hard)">
                  {row.label}
                </text>
                <text x="24" y="9" fill="#d2ffea" fontSize="7.0" fontFamily="Share Tech Mono, monospace" fontWeight="bold" filter="url(#neon-phosphor-hard)">
                  {row.val}
                </text>
                <circle cx="48" cy="6" r="1.8" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
              </g>
            ))}
          </g>

          {/* GREEN INDUSTRIAL PHOENIX CONTACT PLUGGABLE TERMINAL BLOCK */}
          <g transform="translate(24, 76)">
            {/* Polyamide Terminal Block Body */}
            <rect x="0" y="0" width="176" height="15" rx="1.8" fill="url(#ultra-phoenix-green)" stroke="#0d320b" strokeWidth="0.9" />

            {/* 6 Individual Screw Terminals with Insulated Wires */}
            {[
              { col: '#ff7020', pin: '+24V' },
              { col: '#20a8ff', pin: 'GND' },
              { col: '#ffdd20', pin: 'SDA' },
              { col: '#4ade80', pin: 'SCL' },
              { col: '#a020f0', pin: 'INT' },
              { col: '#ffffff', pin: 'CAL' },
            ].map((wire, idx) => (
              <g key={`term-pin-${idx}`} transform={`translate(${8 + idx * 28}, 0)`}>
                {/* Screw Well */}
                <rect x="0" y="2" width="16" height="11" rx="1.0" fill="#144812" stroke="#082408" strokeWidth="0.5" />
                {/* Zinc Plated Slotted Screw */}
                <circle cx="8" cy="7.5" r="3.2" fill="#b0bcc8" stroke="#32404c" strokeWidth="0.6" />
                <line x1="6" y1="7.5" x2="10" y2="7.5" stroke="#1c2630" strokeWidth="0.8" />
                {/* Insulated Wire Lead */}
                <rect x="6.5" y="13" width="3" height="7" rx="0.5" fill={wire.col} stroke="#101418" strokeWidth="0.4" />
                <text x="8" y="1" fill="#c0f0c0" fontSize="3.0" fontFamily="Share Tech Mono, monospace" textAnchor="middle">{wire.pin}</text>
              </g>
            ))}
          </g>
        </g>

        {/* ======================================================== */}
        {/* 6. ULTRA-REALISTIC CIRCUIT 5: VERNIER OPTICAL GROUND BUS */}
        {/*    Location: Bottom-Center (670, 770)                    */}
        {/*    General Purpose: Optical Alignment Ground Datum       */}
        {/* ======================================================== */}
        <g
          transform="translate(670, 770)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.0);
            onNodeClick('SCALE-06', 'VERNIER CALIBRATION GROUND BUS');
          }}
          filter="url(#chassis-drop-shadow)"
          title="CIRCUIT 5: VERNIER OPTICAL GROUND BUS (RAIL-06)
General Purpose: Chassis optical alignment datum and multi-bus ground calibration with solid brass sliding caliper.
Linear Span: 620 mm // Accuracy: 99.99%"
        >
          {/* Heavy Black-Anodized Optical Rail Chassis */}
          <rect x="0" y="0" width="620" height="30" rx="3.5" fill="url(#ultra-brushed-titanium)" stroke="#0c0e10" strokeWidth="1.6" />
          <rect x="2" y="2" width="616" height="26" rx="2" fill="#020405" stroke="#12161a" strokeWidth="0.8" />

          {/* Heavy Braided Copper Grounding Strap Terminal (Left End) */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="22" height="18" rx="1.5" fill="url(#ultra-copper-metal)" stroke="#2c1404" strokeWidth="0.8" />
            <circle cx="11" cy="9" r="4.2" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.8" />
            <polygon points="11 6.5, 13 8, 13 10, 11 11.5, 9 10, 9 8" fill="#141004" />
          </g>

          {/* Glowing Optical Centerline Alignment Laser */}
          <line x1="32" y1="15" x2="614" y2="15" stroke={theme.primary} strokeWidth="1.6" filter="url(#neon-phosphor-hard)" />
          <line x1="32" y1="15" x2="614" y2="15" stroke="#ffffff" strokeWidth="0.7" />

          {/* Precision Metric & Sub-Millimeter Graduations */}
          {[...Array(30)].map((_, i) => (
            <line
              key={`ruler-div-${i}`}
              x1={34 + i * 19}
              y1={i % 5 === 0 ? 3 : 8}
              x2={34 + i * 19}
              y2={i % 5 === 0 ? 27 : 22}
              stroke={i % 5 === 0 ? '#ffffff' : '#708496'}
              strokeWidth={i % 5 === 0 ? 1.6 : 0.8}
            />
          ))}

          {/* Machined Solid Brass Vernier Caliper Sliding Clamp */}
          <g transform="translate(565, 0)">
            <rect x="-8" y="-2" width="18" height="34" rx="2.5" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="1.0" />
            <line x1="1" y1="0" x2="1" y2="30" stroke="#ffffff" strokeWidth="1.0" />
            <circle cx="1" cy="6" r="2.0" fill="#2a1e06" />
            <text x="1" y="24" fill="#181204" fontSize="5.2" fontFamily="Rajdhani, sans-serif" fontWeight="700" textAnchor="middle">VERNIER</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
