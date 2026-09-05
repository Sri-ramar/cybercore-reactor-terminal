import React, { useState, useMemo } from 'react';
import { ThemeConfig } from '../../types';
import { soundFx } from '../../utils/soundEngine';
import { Cpu, Zap, CheckCircle2, X } from 'lucide-react';

interface ProceduralHardwareLayerProps {
  theme: ThemeConfig;
  powerOutput: number;
  activeSurgeNode: string | null;
  onNodeClick: (nodeId: string, label: string) => void;
}

interface ActiveNodeDetail {
  id: string;
  name: string;
  category: string;
  status: string;
  metric1: string;
  metric2: string;
  metric3: string;
  x: number;
  y: number;
}

export const ProceduralHardwareLayer: React.FC<ProceduralHardwareLayerProps> = ({
  theme,
  powerOutput,
  activeSurgeNode,
  onNodeClick,
}) => {
  const [selectedModule, setSelectedModule] = useState<ActiveNodeDetail | null>(null);

  // Stepped Non-Linear Metallic Conduit Trajectories (Plugged cleanly into all module ports)
  const conduitPaths = useMemo(
    () => [
      // 1. Top-Center Stepped Bio-Rail
      'M 800 220 L 800 120 L 760 120 L 760 160 L 710 160 L 710 200 L 640 200 L 640 250 L 590 250',
      // 2. Top-Left Stepped Rail to Upper Left Canopy
      'M 590 250 L 520 250 L 520 180 L 480 180 L 480 140 L 410 140 L 410 95 L 360 95 L 360 65 L 260 65',
      // 3. Top-Left Horizontal Rail Section
      'M 520 250 L 260 250 L 260 220 L 200 220 L 160 250',
      // 4. Top-Center to Top-Right Capsule Header (Plugs into Capsule Left Port)
      'M 800 180 L 800 95 L 860 95 L 860 128 L 1020 128',
      // 4b. Capsule Right Exit Port to Louver
      'M 1185 128 L 1230 128 L 1230 180 L 1400 180',
      // 5. Top-Right Chevron Louver Diagonal (Plugs into Louver Port)
      'M 930 310 L 990 250 L 1090 250 L 1130 215 L 1190 215',
      // 6. Mid-Left Multi-Tier Horizontal Rail (Plugs into CPU Chip Right Port)
      'M 670 380 L 560 380 L 560 355 L 298 355',
      // 6b. CPU Chip Left Exit Port to Margin
      'M 154 355 L 120 355 L 120 390 L 70 390',
      // 7. Mid-Left Lower Horizontal Bar
      'M 660 440 L 540 440 L 500 480 L 440 480 L 400 440 L 260 440 L 220 440 L 180 480 L 110 480',
      // 8. Lower-Left Staircase Bus (Plugs cleanly into Console Right Socket at 390, 680)
      'M 710 540 L 630 620 L 570 620 L 540 680 L 394 680',
      // 8b. Lower-Left Console Bottom Exit Socket at 170, 720 to Ground Bus
      'M 170 720 L 120 720 L 90 770 L 50 800 L 15 800',
      // 9. Mid-Right Horizontal Bus (Plugs into LED Matrix Left Port at 1150, 448)
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

  // Skeuomorphic Hardware Modules Registry
  const modulesList: ActiveNodeDetail[] = useMemo(
    () => [
      {
        id: 'CAPSULE-01',
        name: 'PHOTOSYNTHESIS CHAMBER',
        category: 'MODULE-01',
        status: 'ACTIVE',
        metric1: 'LUMEN FLUX: 14,200 LUX',
        metric2: 'CO2 ABSORPTION: 98.4%',
        metric3: 'CHLOROPHYLL REACTION: NOMINAL',
        x: 1100,
        y: 128,
      },
      {
        id: 'LOUVER-02',
        name: 'THERMAL RADIATOR & MANIFOLD',
        category: 'MODULE-02',
        status: 'FLOWING',
        metric1: 'MANIFOLD PRESSURE: 4.8 BAR',
        metric2: 'COOLANT GRADIENT: -4.6°C',
        metric3: 'RADIATOR COPPER FINS: NOMINAL',
        x: 1290,
        y: 180,
      },
      {
        id: 'CHIP-03',
        name: '3D QUANTUM CERAMIC CPU',
        category: 'PROCESSOR-03',
        status: 'SYNCED',
        metric1: 'CLOCK: 4.80 GHz (QUANTUM)',
        metric2: '48-PIN GULL-WING BUS: 100%',
        metric3: 'DIE TEMPERATURE: 28.4°C',
        x: 226,
        y: 356,
      },
      {
        id: 'DISPLAY-04',
        name: 'CELLULAR BIO-SPECTROGRAPH',
        category: 'DIAGNOSTICS-04',
        status: 'ONLINE',
        metric1: 'SPECTROGRAPH: 6 CHANNELS ACTIVE',
        metric2: 'CHLOROPHYLL FLUX: 94.2%',
        metric3: 'MOISTURE LEVEL: OPTIMAL (68%)',
        x: 1240,
        y: 448,
      },
      {
        id: 'CONSOLE-05',
        name: 'SOLARPUNK COMMAND DECK',
        category: 'INTERFACE-05',
        status: 'READY',
        metric1: 'HARMONIC SINE-WAVE: 48.2 Hz',
        metric2: 'POTENTIOMETER: DETENT 7/10',
        metric3: 'BUS IMPEDANCE: 50.0 Ω',
        x: 280,
        y: 680,
      },
      {
        id: 'SCALE-06',
        name: 'VERNIER CALIBRATION RULER',
        category: 'RAIL-06',
        status: 'CALIBRATED',
        metric1: 'VERNIER OFFSET: +0.02 mm',
        metric2: 'LINEAR SPAN: 620 mm',
        metric3: 'SCALE ACCURACY: 99.99%',
        x: 980,
        y: 785,
      },
    ],
    []
  );

  const handleModuleClick = (mod: ActiveNodeDetail) => {
    soundFx.playClick(1.2);
    setSelectedModule(mod);
    onNodeClick(mod.id, mod.name);
  };

  return (
    <div className="absolute inset-0 pointer-events-auto select-none z-15">
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Hard Gunmetal & Black Titanium Channel Gradient */}
          <linearGradient id="hard-black-metal-channel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22262a" />
            <stop offset="25%" stopColor="#14181a" />
            <stop offset="60%" stopColor="#0a0c0e" />
            <stop offset="100%" stopColor="#040506" />
          </linearGradient>

          {/* Hard Metal Module Chassis Gradient (Brushed Dark Titanium) */}
          <linearGradient id="hard-black-metal-chassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2d30" />
            <stop offset="35%" stopColor="#1c1e20" />
            <stop offset="75%" stopColor="#101214" />
            <stop offset="100%" stopColor="#060708" />
          </linearGradient>

          {/* Heavy Machined Beveled Plate Gradient */}
          <linearGradient id="machined-bevel-plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#32363a" />
            <stop offset="20%" stopColor="#1e2226" />
            <stop offset="80%" stopColor="#121416" />
            <stop offset="100%" stopColor="#080a0c" />
          </linearGradient>

          {/* Soft Matte Silicone Keycap Gradient */}
          <linearGradient id="soft-matte-keycap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222528" />
            <stop offset="50%" stopColor="#141618" />
            <stop offset="100%" stopColor="#0a0c0e" />
          </linearGradient>

          {/* Knurled Brass Dial Gradient */}
          <radialGradient id="knurled-brass-dial" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe680" />
            <stop offset="40%" stopColor="#c89e34" />
            <stop offset="80%" stopColor="#7a5c18" />
            <stop offset="100%" stopColor="#2a1c06" />
          </radialGradient>

          {/* Copper Radiator Fin Gradient */}
          <linearGradient id="copper-radiator-fin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="30%" stopColor="#d47832" />
            <stop offset="70%" stopColor="#8a4414" />
            <stop offset="100%" stopColor="#3a1804" />
          </linearGradient>

          {/* Machined Hard Brass Clamps */}
          <linearGradient id="hard-machined-brass-clamp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c89e34" />
            <stop offset="45%" stopColor="#8a6c20" />
            <stop offset="100%" stopColor="#2c2008" />
          </linearGradient>

          {/* High-Clarity Glassy LED Lens Reflection */}
          <linearGradient id="glassy-led-screen-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#88ff44" stopOpacity="0.06" />
          </linearGradient>

          {/* Glowing Bioluminescent Fluid Tube */}
          <linearGradient id="fluid-tube-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#caff60" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#52d41a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#14460a" stopOpacity="0.9" />
          </linearGradient>

          {/* Crisp Neon Phosphor Glow */}
          <filter id="neon-phosphor-hard" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.0" result="b1" />
            <feGaussianBlur stdDeviation="2.8" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. HARD BLACK METAL STRUCTURED CONDUIT CHANNELS          */}
        {/* ======================================================== */}

        {/* Deep Chiseled Bed in Rock */}
        <g stroke="#010202" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.99">
          {conduitPaths.map((d, i) => (
            <path key={`groove-hard-${i}`} d={d} />
          ))}
        </g>

        {/* Hard Black Metal Structured Channel Frame */}
        <g stroke="url(#hard-black-metal-channel)" strokeWidth="6.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {conduitPaths.map((d, i) => (
            <path key={`metal-frame-hard-${i}`} d={d} />
          ))}
        </g>

        {/* Chamfered Hard Metal Bevel Edge Highlight (Warm Metallic Gunmetal) */}
        <g stroke="#4a4640" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          {conduitPaths.map((d, i) => (
            <path key={`metal-bevel-hard-${i}`} d={d} />
          ))}
        </g>

        {/* Recessed Dark Core Bed */}
        <g stroke="#030804" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {conduitPaths.map((d, i) => (
            <path key={`core-bed-hard-${i}`} d={d} />
          ))}
        </g>

        {/* Glowing Bioluminescent Emerald Green Light Track */}
        <g
          stroke={theme.primary}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-phosphor-hard)"
          opacity={0.92 + (powerOutput / 100) * 0.08}
        >
          {conduitPaths.map((d, i) => (
            <path key={`bio-light-hard-${i}`} d={d} />
          ))}
        </g>

        {/* Razor-Sharp White Core Filament */}
        <g stroke="#ffffff" strokeWidth="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          {conduitPaths.map((d, i) => (
            <path key={`core-filament-hard-${i}`} d={d} />
          ))}
        </g>

        {/* ======================================================== */}
        {/* 2. MACHINED HARD BRASS CLAMPS WITH RIVETS                */}
        {/* ======================================================== */}
        <g>
          {metallicFasteners.map((f, i) => (
            <g key={`fastener-hard-${i}`} transform={`translate(${f.x}, ${f.y}) rotate(${f.rot})`}>
              <rect x="-5" y="-6" width="10" height="12" rx="1.5" fill="url(#hard-machined-brass-clamp)" stroke="#f0d060" strokeWidth="0.6" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#fff8dc" strokeWidth="0.6" opacity="0.9" />
              <circle cx="-2.5" cy="-3.2" r="0.8" fill="#080602" />
              <circle cx="2.5" cy="-3.2" r="0.8" fill="#080602" />
              <circle cx="-2.5" cy="3.2" r="0.8" fill="#080602" />
              <circle cx="2.5" cy="3.2" r="0.8" fill="#080602" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 3. CREATIVE HIGH-FIDELITY HARDWARE MODULES               */}
        {/* ======================================================== */}

        {/* 1. TOP-RIGHT: PHOTOSYNTHETIC TERRARIUM CAPSULE */}
        <g
          transform="translate(1020, 105)"
          className="cursor-pointer"
          onClick={() => handleModuleClick(modulesList[0])}
        >
          {/* Heavy Titanium Chamfered Chassis */}
          <rect x="0" y="0" width="165" height="46" rx="4" fill="url(#hard-black-metal-chassis)" stroke="#38342e" strokeWidth="1.4" />
          <rect x="3" y="3" width="159" height="40" rx="2.5" fill="#020503" stroke="#122416" strokeWidth="1.0" />
          
          {/* Neon Cathode Grid Wires */}
          <g stroke={theme.accent} strokeWidth="1.0" opacity="0.85" filter="url(#neon-phosphor-hard)">
            {[...Array(26)].map((_, i) => (
              <line key={`tray-mesh-hard-${i}`} x1={10 + i * 5.8} y1="7" x2={10 + i * 5.8} y2="39" />
            ))}
          </g>
          <line x1="10" y1="23" x2="155" y2="23" stroke="#ffffff" strokeWidth="1.4" filter="url(#neon-phosphor-hard)" />

          {/* LED Glassy Screen Sheen */}
          <rect x="3" y="3" width="159" height="20" rx="2.5" fill="url(#glassy-led-screen-sheen)" pointerEvents="none" />
        </g>

        {/* 2. TOP-RIGHT: HYDRAULIC THERMAL RADIATOR & ALGAE BAROMETER (CREATIVE REMAKE OF LOUVER) */}
        <g
          transform="translate(1185, 140)"
          className="cursor-pointer"
          onClick={() => handleModuleClick(modulesList[1])}
        >
          {/* Heavy CNC-Machined Base Chassis */}
          <polygon
            points="
              0 48,
              30 0,
              160 0,
              190 48,
              230 48,
              255 18,
              280 48
            "
            fill="url(#hard-black-metal-chassis)"
            stroke="#38342e"
            strokeWidth="1.6"
          />

          {/* 10 Vertical Copper Cooling Radiator Fins (Left Section) */}
          <g transform="translate(32, 8)">
            {[...Array(10)].map((_, i) => (
              <rect
                key={`radiator-fin-${i}`}
                x={i * 12}
                y="0"
                width="4.5"
                height="32"
                rx="1"
                fill="url(#copper-radiator-fin)"
                stroke="#2a1404"
                strokeWidth="0.6"
              />
            ))}
          </g>

          {/* Central Borosilicate Fluid Manifold Pipe with Flowing Bioluminescent Liquid */}
          <g transform="translate(24, 20)">
            {/* Dark Fluid Bed */}
            <rect x="0" y="0" width="140" height="10" rx="5" fill="#010803" stroke="#122a14" strokeWidth="0.8" />
            {/* Glowing Liquid Core */}
            <rect x="2" y="2" width="136" height="6" rx="3" fill="url(#fluid-tube-liquid)" filter="url(#neon-phosphor-hard)" />
            {/* Glass Specular Reflection Highlight */}
            <line x1="4" y1="3" x2="134" y2="3" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Precision Brass Pressure Barometer Dial (Far-Right Peak) */}
          <g transform="translate(255, 32)">
            {/* Brass Outer Bezel */}
            <circle cx="0" cy="0" r="14" fill="url(#knurled-brass-dial)" stroke="#120c02" strokeWidth="1.0" />
            {/* Dial Face Plate */}
            <circle cx="0" cy="0" r="11.5" fill="#040608" stroke="#38342e" strokeWidth="0.6" />
            {/* Dial Graduations */}
            {[...Array(8)].map((_, i) => {
              const angle = -135 + i * 38;
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={`dial-tick-${i}`}
                  x1={Math.cos(rad) * 7.5}
                  y1={Math.sin(rad) * 7.5}
                  x2={Math.cos(rad) * 10}
                  y2={Math.sin(rad) * 10}
                  stroke={i > 5 ? '#ff4444' : '#88e024'}
                  strokeWidth="0.7"
                />
              );
            })}
            {/* Dial Indicator Needle */}
            <line x1="0" y1="0" x2="6.5" y2="-6.5" stroke="#ffffff" strokeWidth="1.0" strokeLinecap="round" filter="url(#neon-phosphor-hard)" />
            <circle cx="0" cy="0" r="2.2" fill="#ffd778" />
            {/* Glass Lens Sheen */}
            <path d="M -8 -8 A 11.5 11.5 0 0 1 8 -8 Z" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* Micro Status Beacons */}
          <circle cx="16" cy="38" r="3.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
          <circle cx="16" cy="38" r="1.0" fill="#ffffff" />
          <circle cx="210" cy="40" r="2.6" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
        </g>

        {/* 3. MID-RIGHT: CELLULAR BIO-SPECTROGRAPH & SPECTROMETER (CREATIVE REMAKE OF DOT MATRIX) */}
        <g
          transform="translate(1140, 410)"
          className="cursor-pointer"
          onClick={() => handleModuleClick(modulesList[3])}
        >
          {/* Heavy Titanium Chassis Base */}
          <rect x="0" y="0" width="195" height="74" rx="5" fill="url(#hard-black-metal-chassis)" stroke="#38342e" strokeWidth="1.6" />
          <rect x="4" y="4" width="187" height="66" rx="3.5" fill="#020403" stroke="#0e1e12" strokeWidth="1.2" />

          {/* 4 Corner Recessed Screws */}
          <g fill="#141416" stroke="#48443e" strokeWidth="0.6">
            <circle cx="8" cy="8" r="1.8" />
            <circle cx="187" cy="8" r="1.8" />
            <circle cx="8" cy="66" r="1.8" />
            <circle cx="187" cy="66" r="1.8" />
          </g>

          {/* Left Zone: 6-Channel LED Bio-Spectrograph Equalizer Bars */}
          <g transform="translate(14, 12)">
            <rect x="0" y="0" width="46" height="50" rx="2" fill="#010302" stroke="#102414" strokeWidth="0.8" />
            {/* 6 Frequency Columns */}
            {[
              { h: 32, max: 40 },
              { h: 42, max: 40 },
              { h: 26, max: 40 },
              { h: 38, max: 40 },
              { h: 20, max: 40 },
              { h: 30, max: 40 },
            ].map((col, c) => (
              <g key={`spectro-col-${c}`} transform={`translate(${4 + c * 6.8}, 5)`}>
                {/* Background Track */}
                <line x1="1.5" y1="0" x2="1.5" y2="40" stroke="#061208" strokeWidth="3" strokeLinecap="round" />
                {/* Active Level Bar */}
                <line
                  x1="1.5"
                  y1={40}
                  x2="1.5"
                  y2={40 - col.h}
                  stroke={c === 1 || c === 3 ? '#baf854' : theme.primary}
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#neon-phosphor-hard)"
                />
                {/* Peak Indicator Dot */}
                <circle cx="1.5" cy={40 - col.h} r="1.2" fill="#ffffff" />
              </g>
            ))}
          </g>

          {/* Center Zone: Photosynthetic Cellular Spore Radar Display */}
          <g transform="translate(68, 12)">
            <rect x="0" y="0" width="58" height="50" rx="2" fill="#010402" stroke="#102414" strokeWidth="0.8" />
            {/* Concentric Calibration Reticles */}
            <circle cx="29" cy="25" r="20" fill="none" stroke="#143612" strokeWidth="0.8" strokeDasharray="2 3" />
            <circle cx="29" cy="25" r="12" fill="none" stroke="#225418" strokeWidth="0.8" />
            <circle cx="29" cy="25" r="4" fill="#081e08" stroke={theme.primary} strokeWidth="0.8" />
            {/* Crosshair Grids */}
            <line x1="9" y1="25" x2="49" y2="25" stroke="#143612" strokeWidth="0.6" />
            <line x1="29" y1="5" x2="29" y2="45" stroke="#143612" strokeWidth="0.6" />
            {/* Cellular Bio-Spore Nodes */}
            <circle cx="24" cy="18" r="2.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
            <circle cx="36" cy="22" r="2.8" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
            <circle cx="22" cy="31" r="1.8" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
            <circle cx="33" cy="33" r="2.4" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
          </g>

          {/* Right Zone: Agritech Status Annunciators (CO2, H2O, NPK, PH) */}
          <g transform="translate(134, 12)">
            <rect x="0" y="0" width="48" height="50" rx="2" fill="#010302" stroke="#102414" strokeWidth="0.8" />
            {[
              { label: 'CO2', val: '98%', ok: true },
              { label: 'H2O', val: '68%', ok: true },
              { label: 'NPK', val: 'OPT', ok: true },
              { label: 'PH', val: '6.4', ok: true },
            ].map((row, r) => (
              <g key={`annunc-${r}`} transform={`translate(4, ${5 + r * 10.5})`}>
                <text x="0" y="7" fill="#88a878" fontSize="6" fontFamily="Rajdhani, sans-serif" fontWeight="700">
                  {row.label}
                </text>
                <text x="24" y="7" fill="#ffffff" fontSize="6.5" fontFamily="Share Tech Mono, monospace">
                  {row.val}
                </text>
                <circle cx="38" cy="4.5" r="1.8" fill={row.ok ? theme.primary : '#ff4444'} filter="url(#neon-phosphor-hard)" />
              </g>
            ))}
          </g>

          {/* Optical Glass Lens Cover Specular Glint */}
          <rect x="4" y="4" width="187" height="28" rx="3.5" fill="url(#glassy-led-screen-sheen)" pointerEvents="none" />
        </g>

        {/* 4. MID-LEFT: HIGH-FIDELITY 3D CERAMIC & GOLD QFP CHIP */}
        <g
          transform="translate(170, 300)"
          className="cursor-pointer"
          onClick={() => handleModuleClick(modulesList[2])}
        >
          {/* Surrounding Dark Green PCB Substrate & Gold Traces */}
          <rect x="-16" y="-16" width="144" height="144" rx="4" fill="#040a05" stroke="#0e2410" strokeWidth="1.2" />

          {/* Radiating 45° Gold PCB Traces & Vias */}
          <g stroke="#8a7228" strokeWidth="0.8" fill="none" opacity="0.85">
            <path d="M -8 10 L -4 10 L 8 -2 L 8 -12" />
            <path d="M -12 22 L -6 22 L 18 -2 L 18 -12" />
            <path d="M -14 34 L -8 34 L 28 -2 L 28 -12" />
            <path d="M 120 10 L 116 10 L 104 -2 L 104 -12" />
            <path d="M 124 22 L 118 22 L 94 -2 L 94 -12" />
            <path d="M 126 34 L 120 34 L 84 -2 L 84 -12" />
            <path d="M -8 102 L -4 102 L 8 114 L 8 124" />
            <path d="M -12 90 L -6 90 L 18 114 L 18 124" />
            <path d="M -14 78 L -8 78 L 28 114 L 28 124" />
            <path d="M 120 102 L 116 102 L 104 114 L 104 124" />
            <path d="M 124 90 L 118 90 L 94 114 L 94 124" />
            <path d="M 126 78 L 120 78 L 84 114 L 84 124" />
          </g>

          {/* Micro Gold Vias */}
          <g fill="#c89e34" stroke="#120c02" strokeWidth="0.5">
            <circle cx="-10" cy="-10" r="1.5" />
            <circle cx="122" cy="-10" r="1.5" />
            <circle cx="-10" cy="122" r="1.5" />
            <circle cx="122" cy="122" r="1.5" />
          </g>

          {/* Quad-Sided Gull-Wing Metallic Solder Pin Leads (48 Pins Total) */}
          <g>
            {[...Array(11)].map((_, i) => {
              const y = 14 + i * 7.5;
              return (
                <React.Fragment key={`pin-lr-${i}`}>
                  <rect x="-10" y={y - 1} width="6" height="2" fill="#8c6c22" />
                  <path d={`M -10 ${y} L -4 ${y} L 4 ${y}`} stroke="#ffd778" strokeWidth="1.2" strokeLinecap="round" />
                  <path d={`M -4 ${y} L 4 ${y}`} stroke="#ffffff" strokeWidth="0.4" />
                  <rect x="116" y={y - 1} width="6" height="2" fill="#8c6c22" />
                  <path d={`M 122 ${y} L 116 ${y} L 108 ${y}`} stroke="#ffd778" strokeWidth="1.2" strokeLinecap="round" />
                  <path d={`M 116 ${y} L 108 ${y}`} stroke="#ffffff" strokeWidth="0.4" />
                </React.Fragment>
              );
            })}

            {[...Array(11)].map((_, i) => {
              const x = 14 + i * 7.5;
              return (
                <React.Fragment key={`pin-tb-${i}`}>
                  <rect x={x - 1} y="-10" width="2" height="6" fill="#8c6c22" />
                  <path d={`M ${x} -10 L ${x} -4 L ${x} 4`} stroke="#ffd778" strokeWidth="1.2" strokeLinecap="round" />
                  <path d={`M ${x} -4 L ${x} 4`} stroke="#ffffff" strokeWidth="0.4" />
                  <rect x={x - 1} y="116" width="2" height="6" fill="#8c6c22" />
                  <path d={`M ${x} 122 L ${x} 116 L ${x} 108`} stroke="#ffd778" strokeWidth="1.2" strokeLinecap="round" />
                  <path d={`M ${x} 116 L ${x} 108`} stroke="#ffffff" strokeWidth="0.4" />
                </React.Fragment>
              );
            })}
          </g>

          {/* 3D Chamfered Black Ceramic / Titanium Package Body */}
          <rect x="4" y="4" width="104" height="104" rx="4" fill="rgba(0,0,0,0.85)" />
          <rect x="4" y="4" width="104" height="104" rx="3" fill="#121418" stroke="#282a2e" strokeWidth="1.2" />
          <polygon
            points="
              12 12,
              100 12,
              104 16,
              104 96,
              100 100,
              12 100,
              8 96,
              8 16
            "
            fill="url(#hard-black-metal-chassis)"
            stroke="#42464c"
            strokeWidth="0.9"
          />

          {/* Laser-Etched Technical Markings */}
          <g opacity="0.6" fill="#b0a898" fontSize="5.5" fontFamily="Rajdhani, sans-serif" fontWeight="600" letterSpacing="1">
            <text x="56" y="24" textAnchor="middle">QUANTUM-BIO // Q-PROC-8X</text>
            <text x="56" y="92" textAnchor="middle">4.80 GHz // DIE-REV 3.2</text>
          </g>

          {/* Recessed Central Cavity with Silicon Core Die */}
          <rect x="28" y="28" width="56" height="56" rx="2" fill="#040608" stroke="#181c20" strokeWidth="1.2" />
          <polygon points="28 28, 36 36, 76 36, 84 28" fill="#0a0e12" />
          <polygon points="84 28, 76 36, 76 76, 84 84" fill="#06080a" />
          <polygon points="84 84, 76 76, 36 76, 28 84" fill="#020406" />
          <polygon points="28 84, 36 76, 36 36, 28 28" fill="#080c10" />

          {/* Central Silicon Die with Quantum Neon Crystal Core */}
          <rect x="38" y="38" width="36" height="36" rx="1.5" fill="#020804" stroke={theme.primary} strokeWidth="1.2" />
          <rect x="44" y="44" width="24" height="24" rx="1.5" fill={theme.primary} stroke="#ffffff" strokeWidth="1.2" filter="url(#neon-phosphor-hard)" />
          <circle cx="56" cy="56" r="3.2" fill="#ffffff" />
        </g>

        {/* 5. BOTTOM-LEFT: TACTILE SOLARPUNK COMMAND DECK (CREATIVE REMAKE OF KEYBOARD CONSOLE) */}
        <g
          transform="translate(160, 605)"
          className="cursor-pointer"
          onClick={() => handleModuleClick(modulesList[4])}
        >
          {/* Machined Heavy Titanium Sloped Chassis Base */}
          <rect x="0" y="0" width="234" height="135" rx="6" fill="url(#hard-black-metal-chassis)" stroke="#38342e" strokeWidth="1.6" />
          <rect x="3" y="3" width="228" height="129" rx="4.5" fill="#040506" stroke="#16181a" strokeWidth="1.0" />

          {/* 4 Corner Countersunk Brass Hex Bolts */}
          <g fill="#18140c" stroke="#c89e34" strokeWidth="0.6">
            <circle cx="8" cy="8" r="2.2" />
            <circle cx="226" cy="8" r="2.2" />
            <circle cx="8" cy="127" r="2.2" />
            <circle cx="226" cy="127" r="2.2" />
          </g>

          {/* Top Deck: Machined Rotary Potentiometer Knob & Dual Safety Rocker Switches */}
          <g transform="translate(12, 10)">
            {/* 1. Rotary Stepper Knurled Potentiometer Knob */}
            <g transform="translate(18, 18)">
              {/* Dial Radial Detents */}
              {[...Array(10)].map((_, i) => {
                const angle = -140 + i * 31;
                const rad = (angle * Math.PI) / 180;
                return (
                  <circle
                    key={`knob-dot-${i}`}
                    cx={Math.cos(rad) * 16}
                    cy={Math.sin(rad) * 16}
                    r="1.0"
                    fill={i <= 6 ? theme.primary : '#3a444c'}
                  />
                );
              })}
              {/* Outer Knurled Rim */}
              <circle cx="0" cy="0" r="12" fill="url(#knurled-brass-dial)" stroke="#0e0a02" strokeWidth="1.0" />
              <circle cx="0" cy="0" r="8.5" fill="#0e1012" stroke="#2a2e32" strokeWidth="0.8" />
              {/* Active Indicator Notch */}
              <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" filter="url(#neon-phosphor-hard)" />
              <circle cx="0" cy="0" r="2.0" fill="#ffd778" />
            </g>

            {/* 2. Dual Safety Toggle / Rocker Switches (CRYO & PUMP) */}
            <g transform="translate(48, 6)">
              {/* Rocker 1: CRYO-FLOW */}
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="22" height="24" rx="2" fill="#06080a" stroke="#282a2e" strokeWidth="0.8" />
                <rect x="2" y="2" width="18" height="12" rx="1.5" fill="url(#machined-bevel-plate)" stroke="#4a4640" strokeWidth="0.6" />
                <line x1="4" y1="8" x2="18" y2="8" stroke={theme.accent} strokeWidth="1.2" filter="url(#neon-phosphor-hard)" />
                <text x="11" y="21" fill="#8898a8" fontSize="4.5" textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontWeight="700">CRYO</text>
              </g>
              {/* Rocker 2: SAP-PUMP */}
              <g transform="translate(26, 0)">
                <rect x="0" y="0" width="22" height="24" rx="2" fill="#06080a" stroke="#282a2e" strokeWidth="0.8" />
                <rect x="2" y="10" width="18" height="12" rx="1.5" fill="url(#machined-bevel-plate)" stroke="#4a4640" strokeWidth="0.6" />
                <line x1="4" y1="16" x2="18" y2="16" stroke={theme.primary} strokeWidth="1.2" filter="url(#neon-phosphor-hard)" />
                <text x="11" y="8" fill="#8898a8" fontSize="4.5" textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontWeight="700">PUMP</text>
              </g>
            </g>

            {/* 3. Right Cluster: 10 Precision Ergonomic Macro Keys */}
            <g transform="translate(108, 4)">
              {[...Array(2)].map((_, r) =>
                [...Array(5)].map((_, c) => (
                  <g key={`macro-key-${r}-${c}`} transform={`translate(${c * 19.5}, ${r * 12.5})`}>
                    <rect x="0" y="0" width="17" height="10" rx="1.5" fill="#020304" stroke="#16181a" strokeWidth="0.7" />
                    <rect x="1" y="1" width="15" height="8" rx="1.2" fill="url(#soft-matte-keycap)" stroke={c === 0 ? '#4a6e1c' : '#282622'} strokeWidth="0.5" />
                    <line x1="2" y1="2" x2="14" y2="2" stroke="#48443e" strokeWidth="0.6" opacity="0.8" />
                    {c === 0 && <circle cx="8.5" cy="5" r="1.2" fill={theme.primary} filter="url(#neon-phosphor-hard)" />}
                  </g>
                ))
              )}
            </g>
          </g>

          {/* Middle/Lower Deck: Curved Harmonic Oscilloscope Screen & Nixie Readout */}
          <g transform="translate(12, 48)">
            {/* Screen Recessed Housing */}
            <rect x="0" y="0" width="145" height="48" rx="3.5" fill="#010402" stroke="#122a16" strokeWidth="1.0" />
            
            {/* Background Grid Scanlines */}
            <g stroke="#081e08" strokeWidth="0.5" opacity="0.7">
              <line x1="0" y1="12" x2="145" y2="12" />
              <line x1="0" y1="24" x2="145" y2="24" />
              <line x1="0" y1="36" x2="145" y2="36" />
              <line x1="36" y1="0" x2="36" y2="48" />
              <line x1="72" y1="0" x2="72" y2="48" />
              <line x1="108" y1="0" x2="108" y2="48" />
            </g>

            {/* Live Dual-Harmonic Glowing Bio-Waveforms */}
            <path
              d="M 6 24 Q 24 6 42 24 T 78 24 T 114 24 T 138 24"
              fill="none"
              stroke={theme.primary}
              strokeWidth="1.6"
              filter="url(#neon-phosphor-hard)"
            />
            <path
              d="M 6 24 Q 24 38 42 24 T 78 24 T 114 24 T 138 24"
              fill="none"
              stroke="#baf854"
              strokeWidth="0.9"
              opacity="0.8"
            />
            {/* Glowing Focal Resonance Node */}
            <circle cx="78" cy="24" r="2.6" fill="#ffffff" filter="url(#neon-phosphor-hard)" />

            {/* Glass Lens Sheen */}
            <rect x="0" y="0" width="145" height="24" rx="3.5" fill="url(#glassy-led-screen-sheen)" pointerEvents="none" />
          </g>

          {/* Right Lower Deck: Digital Readout & Push Diodes */}
          <g transform="translate(165, 48)">
            {/* Digital Voltage Display Box */}
            <rect x="0" y="0" width="58" height="22" rx="2" fill="#010402" stroke="#122a16" strokeWidth="0.8" />
            <text x="6" y="15" fill={theme.primary} fontSize="8.5" fontFamily="Share Tech Mono, monospace" fontWeight="bold" filter="url(#neon-phosphor-hard)">
              48.2 Hz
            </text>

            {/* 3 Tactile Neon Annunciator Push Buttons */}
            <g transform="translate(6, 32)">
              <circle cx="0" cy="0" r="4.0" fill="#030804" stroke="#143610" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.6" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
              <circle cx="0" cy="0" r="0.9" fill="#ffffff" />

              <circle cx="18" cy="0" r="4.0" fill="#030804" stroke="#143610" strokeWidth="0.8" />
              <circle cx="18" cy="0" r="2.6" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
              <circle cx="18" cy="0" r="0.9" fill="#ffffff" />

              <circle cx="36" cy="0" r="4.0" fill="#060608" stroke="#282622" strokeWidth="0.8" />
              <circle cx="36" cy="0" r="2.6" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
            </g>

            {/* Horizontal Energy Bar */}
            <rect x="-4" y="44" width="54" height="6" rx="1.5" fill="#040c06" stroke="#143218" strokeWidth="0.7" />
            <rect x="-2" y="45.5" width="42" height="3" rx="1" fill={theme.primary} filter="url(#neon-phosphor-hard)" />
          </g>

          {/* Laser-Engraved Technical Badge */}
          <text x="12" y="125" fill="#58626c" fontSize="5.5" fontFamily="Rajdhani, sans-serif" fontWeight="700" letterSpacing="1">
            AGRI-CORE // COMMAND TERMINAL MK-IV // BIO-ELECTRIC BUS
          </text>
        </g>

        {/* 6. BOTTOM-CENTER: MEASUREMENT CALIBRATION RULER */}
        <g
          transform="translate(670, 770)"
          className="cursor-pointer"
          onClick={() => handleModuleClick(modulesList[5])}
        >
          <rect x="0" y="0" width="620" height="28" rx="3" fill="url(#hard-black-metal-chassis)" stroke="#38342e" strokeWidth="1.2" />
          <rect x="2" y="2" width="616" height="24" rx="1.5" fill="#020405" stroke="#141416" strokeWidth="0.8" />
          <line x1="0" y1="14" x2="620" y2="14" stroke={theme.primary} strokeWidth="1.4" filter="url(#neon-phosphor-hard)" />
          <line x1="0" y1="14" x2="620" y2="14" stroke="#ffffff" strokeWidth="0.6" />

          {/* Calibration Tick Divisions */}
          {[...Array(32)].map((_, i) => (
            <line
              key={`ruler-tick-hard-${i}`}
              x1={i * 20}
              y1={i % 5 === 0 ? 3 : 8}
              x2={i * 20}
              y2={i % 5 === 0 ? 25 : 20}
              stroke={i % 5 === 0 ? '#ffffff' : theme.accent}
              strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
            />
          ))}

          {/* Sliding Machined Brass Vernier Caliper Block */}
          <g transform="translate(580, 0)">
            <rect x="-6" y="-2" width="15" height="32" rx="1.5" fill="url(#hard-machined-brass-clamp)" stroke="#f0d060" strokeWidth="0.9" />
            <line x1="1.5" y1="0" x2="1.5" y2="28" stroke="#fff8dc" strokeWidth="0.8" />
          </g>
        </g>
      </svg>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE HOLOGRAPHIC DIAGNOSTIC TELEMETRY CARD     */}
      {/* ======================================================== */}
      {selectedModule && (
        <div
          className="absolute z-35 animate-in fade-in zoom-in-95 duration-200"
          style={{
            left: `${Math.min(78, Math.max(8, (selectedModule.x / 1600) * 100))}%`,
            top: `${Math.min(72, Math.max(12, (selectedModule.y / 900) * 100))}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="w-64 p-3 rounded-lg bg-[#040808]/96 border border-lime-500/40 shadow-2xl backdrop-blur-md text-zinc-200 font-mono text-xs">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-lime-500/20 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-lime-400" />
                <span className="font-bold text-lime-400 text-[11px] tracking-wider">
                  {selectedModule.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-zinc-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Status & Category */}
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-2">
              <span>{selectedModule.category}</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                {selectedModule.status}
              </span>
            </div>

            {/* Live Metrics */}
            <div className="space-y-1 text-[10px] bg-black/50 p-2 rounded border border-white/5">
              <div className="text-lime-300 font-bold">{selectedModule.metric1}</div>
              <div className="text-zinc-300">{selectedModule.metric2}</div>
              <div className="text-zinc-400">{selectedModule.metric3}</div>
            </div>

            {/* Action */}
            <div className="mt-2 flex gap-1.5">
              <button
                onClick={() => {
                  soundFx.playSurge();
                  onNodeClick(selectedModule.id, selectedModule.name);
                }}
                className="flex-1 py-1 bg-lime-500/20 hover:bg-lime-500/30 border border-lime-500/40 rounded text-[10px] text-lime-300 font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <Zap className="w-3 h-3 text-lime-400" />
                PROBE SIGNAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
