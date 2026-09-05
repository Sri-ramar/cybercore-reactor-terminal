import React, { useMemo } from 'react';
import { ThemeConfig } from '../../types';
import { soundFx } from '../../utils/soundEngine';
import { useSystemStats } from '../../services/systemService';

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
  // Real-Time Fedora Linux 44 System Telemetry & Hardware Controls
  const {
    stats,
    isLiveConnected,
    controlVolume,
    toggleSinkMute,
    toggleSourceMute,
    controlBrightness,
    lockScreen,
  } = useSystemStats(1200);

  // Closed, Continuous, High-Visibility Cyber-Hydraulic Conduits
  // Fully routed into all 5 modules and terminating in chassis bulkhead wall mounts
  const conduitPaths = useMemo(
    () => [
      // 1. Core Top-Port to Top Canopy Bus & Upper Bulkhead
      'M 800 260 L 800 130 L 710 130 L 710 80 L 450 80 L 450 40 L 0 40',
      
      // 2. Top Canopy Bus Stepped Down to CPU Sub-Bus
      'M 450 80 L 450 180 L 260 180 L 260 276',

      // 3. Reactor Core Mid-Left Port directly to AMD CPU Right Input Socket
      'M 618 380 L 420 380 L 420 380 L 306 380',

      // 3b. AMD CPU Left Exit Port through Armored Bulkhead to Left Wall
      'M 146 380 L 60 380 L 60 380 L 0 380',

      // 4. Reactor Core Lower-Left Port to Command Terminal MK-IV Top Socket
      'M 640 540 L 510 540 L 510 600 L 280 600',

      // 5. Command Terminal Right Port across to Mid-Lower Branch
      'M 404 675 L 530 675 L 590 615 L 670 615',

      // 5b. Command Terminal Bottom Ground to Vernier Bus
      'M 200 752 L 200 784 L 670 784',

      // 6. Reactor Core Top-Right Header to RAM Spectrometer Left Socket
      'M 800 260 L 800 124 L 1020 124',

      // 6b. RAM Spectrometer Right Port directly into Heat Exchanger Left Fitting
      'M 1196 124 L 1220 124 L 1220 149 L 1229 149',

      // 6c. Heat Exchanger Right Fitting through High-Pressure Bulkhead to Right Wall
      'M 1409 149 L 1480 149 L 1480 110 L 1600 110',

      // 7. Reactor Core Right Equator Port directly into Telemetry Enclosure Left Port
      'M 982 444 L 1140 444',

      // 7b. Telemetry Enclosure Right Port to Right Margin Wall Bulkhead
      'M 1364 444 L 1470 444 L 1470 480 L 1600 480',

      // 8. Lower-Right Telemetry Ground Bus to Vernier Rail
      'M 1250 493 L 1250 630 L 1380 630 L 1380 784 L 1290 784',

      // 9. Reactor Core Bottom Power Trunk directly into Vernier Ground Datum
      'M 800 638 L 800 770',

      // 10. Vernier Bus Right Bulkhead to Wall Ground
      'M 1290 784 L 1600 784',
    ],
    []
  );

  // Precision Heavy-Duty Flanged Elbow Joints & P-Clamps at Key Intersections
  const conduitJoints = useMemo(
    () => [
      { x: 800, y: 130, rot: 0 },
      { x: 710, y: 130, rot: 90 },
      { x: 710, y: 80, rot: 0 },
      { x: 450, y: 80, rot: 45 },
      { x: 450, y: 180, rot: 90 },
      { x: 260, y: 180, rot: 0 },
      { x: 420, y: 380, rot: 0 },
      { x: 60, y: 380, rot: 90 },
      { x: 510, y: 540, rot: 45 },
      { x: 510, y: 600, rot: 90 },
      { x: 530, y: 675, rot: 45 },
      { x: 590, y: 615, rot: 45 },
      { x: 1220, y: 124, rot: 0 },
      { x: 1480, y: 149, rot: 45 },
      { x: 1480, y: 110, rot: 0 },
      { x: 1470, y: 444, rot: 0 },
      { x: 1470, y: 480, rot: 90 },
      { x: 1250, y: 630, rot: 90 },
      { x: 1380, y: 630, rot: 45 },
      { x: 1380, y: 784, rot: 90 },
    ],
    []
  );

  // Wall-Mount Bulkhead Flanges at Boundary Edges
  const wallBulkheads = useMemo(
    () => [
      { x: 0, y: 40, side: 'left' },
      { x: 0, y: 380, side: 'left' },
      { x: 1600, y: 110, side: 'right' },
      { x: 1600, y: 480, side: 'right' },
      { x: 1600, y: 784, side: 'right' },
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
          {/* 1. HIGH-CONTRAST TEXTURE & MATERIAL GRADIENTS            */}
          {/* ======================================================== */}

          {/* Heavy Machined Brushed Dark Anodized Titanium/Aluminum */}
          <linearGradient id="ultra-brushed-titanium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38404a" />
            <stop offset="20%" stopColor="#2a3038" />
            <stop offset="50%" stopColor="#1e242a" />
            <stop offset="75%" stopColor="#2d343c" />
            <stop offset="100%" stopColor="#101418" />
          </linearGradient>

          {/* Polished Chrome Chamfer Bevel Highlight (High Contrast) */}
          <linearGradient id="ultra-chrome-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a96a4" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#b0bcc8" />
            <stop offset="100%" stopColor="#586472" />
          </linearGradient>

          {/* Chrome Bat Toggle Switch Cylinder */}
          <linearGradient id="ultra-chrome-bat" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#252a30" />
            <stop offset="20%" stopColor="#98a4b4" />
            <stop offset="45%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#c0ccd8" />
            <stop offset="90%" stopColor="#505a66" />
            <stop offset="100%" stopColor="#1c2024" />
          </linearGradient>

          {/* Machined Solid Knurled Brass Dial */}
          <radialGradient id="ultra-brass-knurl" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff6c0" />
            <stop offset="25%" stopColor="#f0ca5e" />
            <stop offset="60%" stopColor="#b88a28" />
            <stop offset="85%" stopColor="#6b4c0e" />
            <stop offset="100%" stopColor="#2e1e04" />
          </radialGradient>

          {/* FR4 Circuit Board Solder Mask Substrate */}
          <linearGradient id="ultra-pcb-substrate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#102c18" />
            <stop offset="40%" stopColor="#0a1e10" />
            <stop offset="80%" stopColor="#06140a" />
            <stop offset="100%" stopColor="#020804" />
          </linearGradient>

          {/* Electroplated Gold ENIG Trace */}
          <linearGradient id="ultra-gold-enig" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff0b4" />
            <stop offset="30%" stopColor="#ecc458" />
            <stop offset="70%" stopColor="#b88e2c" />
            <stop offset="100%" stopColor="#705212" />
          </linearGradient>

          {/* Copper Heat Exchanger Fin Metallic Gradient */}
          <linearGradient id="ultra-copper-metal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe0c4" />
            <stop offset="20%" stopColor="#f7a460" />
            <stop offset="55%" stopColor="#de7228" />
            <stop offset="80%" stopColor="#9a4210" />
            <stop offset="100%" stopColor="#451804" />
          </linearGradient>

          {/* Bourdon Tube Dial Face Parchment Enamel */}
          <radialGradient id="ultra-gauge-dial" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f6f4ee" />
            <stop offset="90%" stopColor="#e8e4d4" />
            <stop offset="100%" stopColor="#c0baa4" />
          </radialGradient>

          {/* High-Contrast Armored Conduit Pipe Outer Casing */}
          <linearGradient id="ultra-conduit-steel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a5664" />
            <stop offset="25%" stopColor="#2e353e" />
            <stop offset="50%" stopColor="#1a1f24" />
            <stop offset="75%" stopColor="#2e353e" />
            <stop offset="100%" stopColor="#14181c" />
          </linearGradient>

          {/* CRT Oscilloscope Screen Phosphor P31 Bed */}
          <radialGradient id="ultra-crt-screen" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#06260e" />
            <stop offset="60%" stopColor="#021408" />
            <stop offset="90%" stopColor="#010803" />
            <stop offset="100%" stopColor="#000201" />
          </radialGradient>

          {/* VFD Display Vacuum Cavity */}
          <linearGradient id="ultra-vfd-cavity" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020508" />
            <stop offset="50%" stopColor="#050a0e" />
            <stop offset="100%" stopColor="#010304" />
          </linearGradient>

          {/* Green Industrial Polyamide Screw Terminal Block */}
          <linearGradient id="ultra-phoenix-green" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3cb836" />
            <stop offset="25%" stopColor="#268c20" />
            <stop offset="75%" stopColor="#186214" />
            <stop offset="100%" stopColor="#0c3a0a" />
          </linearGradient>

          {/* Woven Stainless Steel Wire Mesh Pattern */}
          <pattern id="ultra-wire-mesh-pat" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="3" fill="#303840" />
            <line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#94a4b6" strokeWidth="0.8" />
            <line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#c0d0e2" strokeWidth="0.8" />
            <circle cx="1.5" cy="1.5" r="0.4" fill="#ffffff" opacity="0.7" />
          </pattern>

          {/* Convex Glass Dome Optical Reflection */}
          <linearGradient id="ultra-glass-dome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="20%" stopColor="#dffff0" stopOpacity="0.20" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="80%" stopColor="#90ffc8" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.30" />
          </linearGradient>

          {/* Glass Meniscus Liquid in Borosilicate Tube */}
          <linearGradient id="ultra-glass-fluid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f6ffb0" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#60f020" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#229608" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0a3203" stopOpacity="0.98" />
          </linearGradient>

          {/* Solder Mask Via Hole Ring */}
          <radialGradient id="ultra-via-annular" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe490" />
            <stop offset="60%" stopColor="#946c1c" />
            <stop offset="85%" stopColor="#121a12" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* SMD Ceramic Capacitor */}
          <linearGradient id="ultra-smd-cap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2d4b8" />
            <stop offset="45%" stopColor="#b09c7a" />
            <stop offset="100%" stopColor="#64543a" />
          </linearGradient>

          {/* High-Luminance Cyber Laser Glow Filter */}
          <filter id="neon-phosphor-hard" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.0" result="b1" />
            <feGaussianBlur stdDeviation="3.0" result="b2" />
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

          {/* Photorealistic Refractive Hanging Water Droplet Gradient */}
          <radialGradient id="pipe-hanging-drop" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#dffff0" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#40d080" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#104420" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#041208" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* ======================================================== */}
        {/* 1. HIGH-VISIBILITY ARMORED CONDUITS & CLOSED PIPELINES   */}
        {/* ======================================================== */}
        <g>
          {conduitPaths.map((path, idx) => (
            <g key={`conduit-layer-${idx}`}>
              {/* Heavy cast drop shadow */}
              <path d={path} fill="none" stroke="rgba(0,0,0,0.95)" strokeWidth="20" strokeLinecap="square" strokeLinejoin="miter" />
              {/* Outer machined steel armor casing with specular edge */}
              <path d={path} fill="none" stroke="#505a66" strokeWidth="15" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke="#252c34" strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter" />
              {/* High-contrast metallic specular edge line */}
              <path d={path} fill="none" stroke="#90a0b2" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" opacity="0.8" />
              {/* Deep channel recess */}
              <path d={path} fill="none" stroke="#040608" strokeWidth="8.5" strokeLinecap="square" strokeLinejoin="miter" />
              {/* High-intensity cyber emerald plasma core */}
              <path d={path} fill="none" stroke="#123a18" strokeWidth="6.0" strokeLinecap="square" strokeLinejoin="miter" />
              <path d={path} fill="none" stroke="#39ff14" strokeWidth="4.2" strokeLinecap="square" strokeLinejoin="miter" filter="url(#neon-phosphor-hard)" opacity="0.95" />
              {/* White-hot high-contrast optical laser center beam */}
              <path d={path} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" opacity="0.98" />
            </g>
          ))}
        </g>

        {/* Machined Flanged Elbow Joints with Bolts at 90-Degree Corners */}
        <g>
          {conduitJoints.map((joint, i) => (
            <g key={`elbow-joint-${i}`} transform={`translate(${joint.x}, ${joint.y}) rotate(${joint.rot})`}>
              <rect x="-8.5" y="-8.5" width="17" height="17" rx="2.5" fill="url(#ultra-brushed-titanium)" stroke="#101418" strokeWidth="1.2" />
              <rect x="-6.5" y="-6.5" width="13" height="13" rx="1.5" fill="none" stroke="#98a8b8" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4.0" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.6" />
              <circle cx="0" cy="0" r="1.4" fill="#000000" />
            </g>
          ))}
        </g>

        {/* Heavy Industrial Chassis Bulkhead Flanges at Boundary Edges */}
        <g>
          {wallBulkheads.map((bh, i) => (
            <g key={`wall-bh-${i}`} transform={`translate(${bh.x}, ${bh.y})`}>
              <rect
                x={bh.side === 'left' ? 0 : -14}
                y="-14"
                width="14"
                height="28"
                rx="2"
                fill="url(#ultra-brushed-titanium)"
                stroke="#080a0c"
                strokeWidth="1.2"
              />
              <line
                x1={bh.side === 'left' ? 12 : -12}
                y1="-12"
                x2={bh.side === 'left' ? 12 : -12}
                y2="12"
                stroke="#ffffff"
                strokeWidth="0.8"
                opacity="0.8"
              />
              <circle cx={bh.side === 'left' ? 6 : -6} cy="-7" r="1.8" fill="#a0b0c0" stroke="#101418" strokeWidth="0.5" />
              <circle cx={bh.side === 'left' ? 6 : -6} cy="7" r="1.8" fill="#a0b0c0" stroke="#101418" strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* ======================================================== */}
        {/* 2. LIVE FEDORA CIRCUIT 1: AMD RYZEN 5 CO-PROCESSOR       */}
        {/*    Location: Mid-Left (170, 300)                         */}
        {/*    Optically Enhanced High-Contrast Technical Silkscreen */}
        {/* ======================================================== */}
        <g
          transform="translate(170, 300)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1800);
            onNodeClick('CHIP-03', `${stats.cpu.model.slice(0, 18)} [${stats.cpu.clockGhz.toFixed(2)} GHz]`);
          }}
          filter="url(#chassis-drop-shadow)"
          title={`FEDORA LINUX CPU TELEMETRY // ${stats.cpu.model}
Live Frequency: ${stats.cpu.clockGhz.toFixed(2)} GHz (Real Hardware Sensor)
Cores / Threads: ${stats.cpu.cores} Cores // ${stats.cpu.threads} Threads
Current Load: ${stats.cpu.usage.toFixed(1)}%
Die Temperature: ${stats.cpu.tempC.toFixed(1)}°C (k10temp)
Status: ${isLiveConnected ? 'LIVE FEDORA KERNEL LINK' : 'SIMULATED'} // UPTIME: ${stats.os.uptime}`}
        >
          {/* Multi-Layer FR4 Glass-Epoxy Printed Circuit Board */}
          <rect x="-24" y="-24" width="160" height="160" rx="6" fill="url(#ultra-pcb-substrate)" stroke="#102c18" strokeWidth="1.6" />
          <rect x="-22" y="-22" width="156" height="156" rx="5" fill="none" stroke="#265a32" strokeWidth="0.8" opacity="0.7" />

          {/* High-Luminance Gold ENIG Traces */}
          <g stroke="url(#ultra-gold-enig)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
            <path d="M -16 6 L -8 6 L 6 -8 L 6 -16" />
            <path d="M -18 18 L -10 18 L 16 -8 L 16 -18" />
            <path d="M -20 30 L -12 30 L 26 -8 L 26 -20" />
            <path d="M 128 6 L 120 6 L 106 -8 L 106 -16" />
            <path d="M 130 18 L 122 18 L 96 -8 L 96 -18" />
            <path d="M 132 30 L 124 30 L 86 -8 L 86 -20" />
            <path d="M -16 106 L -8 106 L 6 120 L 6 128" />
            <path d="M -18 94 L -10 94 L 16 120 L 16 130" />
            <path d="M -20 82 L -12 82 L 26 120 L 26 132" />
            <path d="M 128 106 L 120 106 L 106 120 L 106 128" />
            <path d="M 130 94 L 122 94 L 96 120 L 96 130" />
            <path d="M 132 82 L 124 82 L 86 120 L 86 132" />
          </g>

          {/* Test Points with High-Contrast Silkscreen Labels */}
          {[
            { cx: -14, cy: -14, label: 'TP1' },
            { cx: 126, cy: -14, label: 'TP2' },
            { cx: -14, cy: 126, label: 'TP3' },
            { cx: 126, cy: 126, label: 'TP4' },
            { cx: 56, cy: -18, label: `${stats.cpu.cores}C` },
            { cx: 56, cy: 130, label: 'GND' },
          ].map((tp, idx) => (
            <g key={`pcb-tp-${idx}`}>
              <circle cx={tp.cx} cy={tp.cy} r="2.8" fill="url(#ultra-via-annular)" stroke="#2c2008" strokeWidth="0.6" />
              <circle cx={tp.cx} cy={tp.cy} r="1.0" fill="#000000" />
              <text x={tp.cx + 3.8} y={tp.cy + 2.2} fill="#70cf84" fontSize="4.8" fontFamily="Share Tech Mono, monospace" fontWeight="bold">
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
              <rect x="-4" y="-2" width="2" height="4" fill="#e2e8f0" />
              <rect x="2" y="-2" width="2" height="4" fill="#e2e8f0" />
            </g>
          ))}

          {/* 48-Lead Gold Gull-Wing Pins */}
          <g>
            {[...Array(12)].map((_, i) => {
              const y = 11 + i * 7.5;
              return (
                <React.Fragment key={`cpu-lead-lr-${i}`}>
                  <rect x="-12" y={y - 1.2} width="6.5" height="2.4" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M -12 ${y} L -4 ${y} L 4 ${y}`} stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" />
                  <path d={`M -5 ${y} L 4 ${y}`} stroke="#ffffff" strokeWidth="0.6" />
                  <rect x="117.5" y={y - 1.2} width="6.5" height="2.4" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M 124 ${y} L 116 ${y} L 108 ${y}`} stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" />
                  <path d={`M 117 ${y} L 108 ${y}`} stroke="#ffffff" strokeWidth="0.6" />
                </React.Fragment>
              );
            })}
            {[...Array(12)].map((_, i) => {
              const x = 11 + i * 7.5;
              return (
                <React.Fragment key={`cpu-lead-tb-${i}`}>
                  <rect x={x - 1.2} y="-12" width="2.4" height="6.5" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M ${x} -12 L ${x} -4 L ${x} 4`} stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" />
                  <path d={`M ${x} -5 L ${x} 4`} stroke="#ffffff" strokeWidth="0.6" />
                  <rect x={x - 1.2} y="117.5" width="2.4" height="6.5" rx="0.4" fill="#8c6c22" stroke="#382c0e" strokeWidth="0.3" />
                  <path d={`M ${x} 124 L ${x} 116 L ${x} 108`} stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" />
                  <path d={`M ${x} 117 L ${x} 108`} stroke="#ffffff" strokeWidth="0.6" />
                </React.Fragment>
              );
            })}
          </g>

          {/* Chamfered Matte Black Ceramic QFP IC Package Body */}
          <rect x="4" y="4" width="104" height="104" rx="5" fill="#06080a" stroke="#1c2024" strokeWidth="1.4" />
          <polygon
            points="14 12, 98 12, 102 16, 102 96, 98 100, 14 100, 10 96, 10 16"
            fill="url(#ultra-brushed-titanium)"
            stroke="#48505a"
            strokeWidth="1.0"
          />

          {/* Pin 1 Index Notch */}
          <polygon points="12 14, 18 14, 12 20" fill="#ffe082" />

          {/* HIGH-CONTRAST TOP PLAQUE: AMD RYZEN 5 5600H */}
          <rect x="12" y="14" width="88" height="19" rx="2" fill="#030507" stroke="#25303a" strokeWidth="0.9" />
          <text x="56" y="24.5" fill="#ffffff" fontSize="7.0" fontFamily="Rajdhani, sans-serif" fontWeight="800" letterSpacing="0.8" textAnchor="middle">
            AMD RYZEN 5 5600H
          </text>
          <text x="56" y="31.2" fill="#4ade80" fontSize="4.8" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
            FEDORA 44 // 6C/12T // KERNEL {stats.os.kernel.split('-')[0]}
          </text>

          {/* HIGH-CONTRAST BOTTOM PLAQUE: LIVE CLOCK & TEMPERATURE */}
          <rect x="12" y="79" width="88" height="19" rx="2" fill="#030507" stroke="#25303a" strokeWidth="0.9" />
          <text x="56" y="89.5" fill="#ffe082" fontSize="7.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle" filter="url(#neon-phosphor-hard)">
            {stats.cpu.clockGhz.toFixed(2)} GHz // {stats.cpu.usage.toFixed(0)}% LOAD
          </text>
          <text x="56" y="96.2" fill="#a0c4de" fontSize="4.8" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
            DIE: {stats.cpu.tempC.toFixed(1)}°C // UP: {stats.os.uptime}
          </text>

          {/* Recessed Silicon Die Cavity with Microscopic Logic Matrix */}
          <g transform="translate(34, 34)">
            <rect x="0" y="0" width="44" height="44" rx="2" fill="#020406" stroke="#182026" strokeWidth="1.0" />
            <polygon points="0 0, 4 4, 40 4, 44 0" fill="#080c10" />
            <polygon points="44 0, 40 4, 40 40, 44 44" fill="#04070a" />
            <polygon points="44 44, 40 40, 4 40, 0 44" fill="#010304" />
            <polygon points="0 44, 4 40, 4 4, 0 0" fill="#060a0e" />

            {/* Gold Wire Bonds */}
            <g stroke="#ffe082" strokeWidth="0.5" fill="none" opacity="0.85">
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

            {/* Silicon Die with Quantum Lattice */}
            <rect x="10" y="10" width="24" height="24" rx="1.2" fill="#010804" stroke="#183a1c" strokeWidth="0.8" />
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
        {/* 3. LIVE FEDORA CIRCUIT 2: PIPEWIRE AUDIO COMMAND CONSOLE */}
        {/*    Location: Lower-Left (150, 600)                       */}
        {/*    Optically Enhanced Toggle Switches & Bold 7-Segment   */}
        {/* ======================================================== */}
        <g
          transform="translate(150, 600)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.4);
            onNodeClick('CONSOLE-05', `PIPEWIRE MASTER AUDIO [VOL: ${stats.audio.volume}%]`);
          }}
          filter="url(#chassis-drop-shadow)"
          title={`FEDORA PIPEWIRE MASTER AUDIO TERMINAL (AN/URM-482 MK-IV)
Master Output Volume: ${stats.audio.volume}% ${stats.audio.sinkMuted ? '[MUTED]' : '[ACTIVE]'}
Microphone Input: ${stats.audio.sourceMuted ? 'MUTED' : 'UNMUTED'}
Active Sink: @DEFAULT_AUDIO_SINK@ (WirePlumber)
(Flick toggle switches to Mute/Unmute Audio & Mic; Turn dial to adjust Volume)`}
        >
          {/* Heavy 3mm CNC-Milled Dark Brushed Aluminum Faceplate */}
          <rect x="0" y="0" width="254" height="152" rx="7" fill="url(#ultra-brushed-titanium)" stroke="#0a0d10" strokeWidth="2.2" />
          <rect x="2" y="2" width="250" height="148" rx="5.5" fill="none" stroke="url(#ultra-chrome-edge)" strokeWidth="1.2" opacity="0.85" />
          <rect x="5" y="5" width="244" height="142" rx="4" fill="#020406" stroke="#161c22" strokeWidth="1.4" />

          {/* 4 Heavy Countersunk Stainless Steel Hex Screws */}
          {[
            { cx: 10, cy: 10 },
            { cx: 244, cy: 10 },
            { cx: 10, cy: 142 },
            { cx: 244, cy: 142 },
          ].map((screw, idx) => (
            <g key={`term-screw-${idx}`}>
              <circle cx={screw.cx} cy={screw.cy} r="3.4" fill="#505a66" stroke="#12161a" strokeWidth="0.8" />
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

          {/* High-Contrast Military Nomenclature Plate */}
          <g transform="translate(18, 12)">
            <rect x="0" y="0" width="124" height="13" rx="1.5" fill="#06090c" stroke="#36424e" strokeWidth="1.0" />
            <circle cx="4" cy="6.5" r="1.2" fill="#a0b0c0" />
            <circle cx="120" cy="6.5" r="1.2" fill="#a0b0c0" />
            <text x="62" y="9.5" fill="#ffffff" fontSize="5.8" fontFamily="Rajdhani, sans-serif" fontWeight="800" letterSpacing="1.0" textAnchor="middle">
              PIPEWIRE MASTER AUDIO // FEDORA 44
            </text>
          </g>

          {/* High-Contrast Master Volume Vernier Knob */}
          <g
            transform="translate(42, 48)"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playServo();
              controlVolume(stats.audio.volume >= 100 ? -40 : 10);
            }}
            title="Master Volume Dial: Click to step volume (+10%)"
          >
            <circle cx="0" cy="0" r="22" fill="#080c10" stroke="#34404c" strokeWidth="1.2" />
            {[...Array(24)].map((_, i) => {
              const angle = i * 15;
              const rad = (angle * Math.PI) / 180;
              const isMajor = i % 3 === 0;
              const isVolLit = (i / 24) * 100 <= stats.audio.volume;
              return (
                <line
                  key={`dial-tick-${i}`}
                  x1={Math.cos(rad) * 18}
                  y1={Math.sin(rad) * 18}
                  x2={Math.cos(rad) * (isMajor ? 21.5 : 19.8)}
                  y2={Math.sin(rad) * (isMajor ? 21.5 : 19.8)}
                  stroke={isVolLit ? '#39ff14' : '#556575'}
                  strokeWidth={isMajor ? 1.4 : 0.8}
                />
              );
            })}

            <circle cx="0" cy="0" r="15" fill="url(#ultra-brass-knurl)" stroke="#120c02" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="11" fill="url(#ultra-brushed-titanium)" stroke="#44505e" strokeWidth="0.9" />
            
            <g transform={`rotate(${(stats.audio.volume / 100) * 260 - 130})`}>
              <line x1="0" y1="-2" x2="0" y2="-10.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" filter="url(#neon-phosphor-hard)" />
            </g>
            <circle cx="0" cy="0" r="3.0" fill="#ffd778" />
          </g>

          {/* TWO HIGH-CONTRAST SYSTEM TOGGLE SWITCHES */}
          <g transform="translate(85, 26)">
            {/* Switch 1: AUDIO SINK MUTE */}
            <g
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick(1.6);
                toggleSinkMute();
              }}
              title="System Audio Mute: Click to toggle PipeWire Mute"
            >
              <rect x="0" y="0" width="34" height="48" rx="2" fill="#0c1014" stroke="#404e5c" strokeWidth="1.0" />
              <text x="17" y="9.5" fill="#ffffff" fontSize="5.5" fontFamily="Rajdhani, sans-serif" fontWeight="800" textAnchor="middle">
                AUDIO
              </text>
              
              {/* State Pill */}
              <rect x="4" y="38" width="26" height="8" rx="1.5" fill={!stats.audio.sinkMuted ? '#05200a' : '#280505'} stroke={!stats.audio.sinkMuted ? '#22c55e' : '#ef4444'} strokeWidth="0.8" />
              <text x="17" y="44.2" fill={!stats.audio.sinkMuted ? '#4ade80' : '#ff4d4d'} fontSize="4.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
                {!stats.audio.sinkMuted ? 'ON' : 'MUTE'}
              </text>

              <circle cx="17" cy="24" r="7.5" fill="#505a66" stroke="#101418" strokeWidth="0.9" />
              <circle cx="17" cy="24" r="5.2" fill="#1c2228" stroke="#38424c" strokeWidth="0.6" />

              <g transform={!stats.audio.sinkMuted ? 'translate(17, 24) rotate(-22)' : 'translate(17, 24) rotate(22)'}>
                <rect x="-2.2" y="-14" width="4.4" height="14" rx="2.0" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <circle cx="0" cy="-14" r="3.2" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <line x1="-0.8" y1="-13" x2="-0.8" y2="-2" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              </g>

              {/* Faceted Pilot Lamp */}
              <circle cx="17" cy="33" r="2.8" fill="#1c2024" stroke="#607080" strokeWidth="0.8" />
              <circle cx="17" cy="33" r="1.8" fill={!stats.audio.sinkMuted ? '#39ff14' : '#ff3333'} filter="url(#neon-phosphor-hard)" />
            </g>

            {/* Switch 2: MIC MUTE */}
            <g
              transform="translate(40, 0)"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick(1.2);
                toggleSourceMute();
              }}
              title="Microphone Mute: Click to toggle Mic Mute"
            >
              <rect x="0" y="0" width="34" height="48" rx="2" fill="#0c1014" stroke="#404e5c" strokeWidth="1.0" />
              <text x="17" y="9.5" fill="#ffffff" fontSize="5.5" fontFamily="Rajdhani, sans-serif" fontWeight="800" textAnchor="middle">
                MIC
              </text>

              <rect x="4" y="38" width="26" height="8" rx="1.5" fill={!stats.audio.sourceMuted ? '#031c24' : '#281c00'} stroke={!stats.audio.sourceMuted ? '#00e5ff' : '#f59e0b'} strokeWidth="0.8" />
              <text x="17" y="44.2" fill={!stats.audio.sourceMuted ? '#38bdf8' : '#fbbf24'} fontSize="4.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
                {!stats.audio.sourceMuted ? 'LIVE' : 'MUTE'}
              </text>

              <circle cx="17" cy="24" r="7.5" fill="#505a66" stroke="#101418" strokeWidth="0.9" />
              <circle cx="17" cy="24" r="5.2" fill="#1c2228" stroke="#38424c" strokeWidth="0.6" />

              <g transform={!stats.audio.sourceMuted ? 'translate(17, 24) rotate(-22)' : 'translate(17, 24) rotate(22)'}>
                <rect x="-2.2" y="-14" width="4.4" height="14" rx="2.0" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <circle cx="0" cy="-14" r="3.2" fill="url(#ultra-chrome-bat)" stroke="#0c0e12" strokeWidth="0.6" />
                <line x1="-0.8" y1="-13" x2="-0.8" y2="-2" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              </g>

              <circle cx="17" cy="33" r="2.8" fill="#1c2024" stroke="#607080" strokeWidth="0.8" />
              <circle cx="17" cy="33" r="1.8" fill={!stats.audio.sourceMuted ? '#00e5ff' : '#f59e0b'} filter="url(#neon-phosphor-hard)" />
            </g>
          </g>

          {/* TWO BNC PORTS */}
          <g transform="translate(170, 26)">
            {[
              { label: 'SINK OUT', x: 0 },
              { label: 'MIC IN', x: 38 },
            ].map((bnc, i) => (
              <g key={`bnc-${i}`} transform={`translate(${bnc.x}, 0)`}>
                <circle cx="15" cy="18" r="9.5" fill="#505a66" stroke="#14181c" strokeWidth="1.0" />
                <rect x="4.5" y="17" width="2" height="2" fill="#d0d8e2" />
                <rect x="23.5" y="17" width="2" height="2" fill="#d0d8e2" />
                <circle cx="15" cy="18" r="6.0" fill="#f0f4f8" stroke="#707c8a" strokeWidth="0.6" />
                <circle cx="15" cy="18" r="2.2" fill="#ffc838" stroke="#4a3606" strokeWidth="0.5" />
                <circle cx="15" cy="18" r="0.8" fill="#000000" />
                <text x="15" y="34" fill="#a4b8cc" fontSize="4.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
                  {bnc.label}
                </text>
              </g>
            ))}
          </g>

          {/* TEKTRONIX CRT OSCILLOSCOPE */}
          <g transform="translate(16, 78)">
            <rect x="0" y="0" width="148" height="58" rx="4" fill="#0a0d10" stroke="#2a3440" strokeWidth="1.4" />
            <rect x="3" y="3" width="142" height="52" rx="3" fill="url(#ultra-crt-screen)" stroke="#122818" strokeWidth="1.0" />

            <g stroke="#0e3a18" strokeWidth="0.6" opacity="0.9">
              {[...Array(9)].map((_, i) => (
                <line key={`crt-v-${i}`} x1={14 + i * 14.2} y1="3" x2={14 + i * 14.2} y2="55" strokeDasharray="1 2" />
              ))}
              {[...Array(5)].map((_, i) => (
                <line key={`crt-h-${i}`} x1="3" y1={11 + i * 10.4} x2="145" y2={11 + i * 10.4} strokeDasharray="1 2" />
              ))}
              <line x1="3" y1="29" x2="145" y2="29" stroke="#1c6628" strokeWidth="0.9" />
              <line x1="71" y1="3" x2="71" y2="55" stroke="#1c6628" strokeWidth="0.9" />
            </g>

            {/* Audio Waveform */}
            <path
              d={`M 6 29 Q 24 ${29 - (stats.audio.volume / 100) * 18} 42 29 T 78 29 T 114 29 T 142 29`}
              fill="none"
              stroke={!stats.audio.sinkMuted ? '#39ff14' : '#687884'}
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#neon-phosphor-hard)"
            />
            <path
              d={`M 6 29 Q 24 ${29 + (stats.audio.volume / 100) * 18} 42 29 T 78 29 T 114 29 T 142 29`}
              fill="none"
              stroke="#b5ff54"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.9"
              filter="url(#neon-phosphor-hard)"
            />
            <circle cx="71" cy="29" r="3.0" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
            <path d="M 3 3 L 145 3 L 125 24 L 3 24 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
          </g>

          {/* LARGE BOLD 7-SEGMENT VOLUME DISPLAY */}
          <g transform="translate(172, 78)">
            <rect x="0" y="0" width="70" height="28" rx="2.5" fill="#010406" stroke="#253545" strokeWidth="1.2" />
            <rect x="2" y="2" width="66" height="24" rx="1.8" fill="#031006" stroke="#14421a" strokeWidth="0.8" />

            <text x="35" y="19" fill={!stats.audio.sinkMuted ? '#39ff14' : '#ff4444'} fontSize="13.0" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle" filter="url(#neon-phosphor-hard)">
              {stats.audio.sinkMuted ? 'MUTED' : `${stats.audio.volume}%`}
            </text>

            <g transform="translate(6, 38)">
              {/* Lamp 1: AUDIO SINK */}
              <circle cx="0" cy="0" r="4.2" fill="#384450" stroke="#0e1216" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.6" fill={!stats.audio.sinkMuted ? '#39ff14' : '#55606c'} filter={!stats.audio.sinkMuted ? 'url(#neon-phosphor-hard)' : undefined} />
              <circle cx="0" cy="0" r="0.8" fill="#ffffff" />
              <text x="0" y="9.5" fill="#ffffff" fontSize="4.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">AUDIO</text>

              {/* Lamp 2: SYNC */}
              <circle cx="27" cy="0" r="4.2" fill="#384450" stroke="#0e1216" strokeWidth="0.8" />
              <circle cx="27" cy="0" r="2.6" fill={isLiveConnected ? '#38ef7d' : '#885522'} filter="url(#neon-phosphor-hard)" />
              <circle cx="27" cy="0" r="0.8" fill="#ffffff" />
              <text x="27" y="9.5" fill="#ffffff" fontSize="4.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">SYNC</text>

              {/* Lamp 3: MIC */}
              <circle cx="54" cy="0" r="4.2" fill="#384450" stroke="#0e1216" strokeWidth="0.8" />
              <circle cx="54" cy="0" r="2.6" fill={!stats.audio.sourceMuted ? '#00e5ff' : '#ff4d4d'} filter="url(#neon-phosphor-hard)" />
              <circle cx="54" cy="0" r="0.8" fill="#ffffff" />
              <text x="54" y="9.5" fill="#ffffff" fontSize="4.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">MIC</text>
            </g>
          </g>

          <text x="18" y="146.5" fill="#98aab8" fontSize="5.5" fontFamily="Rajdhani, sans-serif" fontWeight="800" letterSpacing="1.2">
            PIPEWIRE ENGINE // FEDORA 44 WIREPLUMBER // SINK: DEFAULT
          </text>
        </g>

        {/* ======================================================== */}
        {/* 4. LIVE FEDORA CIRCUIT 3: REAL RAM & DISK HEAT EXCHANGER */}
        {/*    Location: Top-Right (1020..1480, 95..220)             */}
        {/*    High-Contrast RAM Reading & Luminous 20-Seg Bargraph  */}
        {/* ======================================================== */}
        {/* 4A. Real System RAM 20-Segment LED Bargraph Display */}
        <g
          transform="translate(1020, 95)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.0);
            onNodeClick('CAPSULE-01', `FEDORA SYSTEM RAM [${stats.ram.usedMb} / ${stats.ram.totalMb} MB (${stats.ram.percent}%)]`);
          }}
          filter="url(#chassis-drop-shadow)"
          title={`FEDORA SYSTEM RAM ALLOCATION (/proc/meminfo)
Used Memory: ${stats.ram.usedMb} MB / ${stats.ram.totalMb} MB
Utilization: ${stats.ram.percent}% (Live 20-Segment Phosphor Bargraph)
Free Buffer/Cache: ${(stats.ram.totalMb - stats.ram.usedMb)} MB
(Click to inspect memory footprint)`}
        >
          <rect x="0" y="0" width="176" height="58" rx="4" fill="url(#ultra-pcb-substrate)" stroke="#16381e" strokeWidth="1.4" />
          <rect x="2" y="2" width="172" height="54" rx="3" fill="none" stroke="#266436" strokeWidth="0.8" opacity="0.75" />

          {/* Standoffs */}
          {[
            { cx: 6, cy: 6 },
            { cx: 170, cy: 6 },
            { cx: 6, cy: 52 },
            { cx: 170, cy: 52 },
          ].map((st, i) => (
            <circle key={`pcb-st-${i}`} cx={st.cx} cy={st.cy} r="2.6" fill="url(#ultra-brass-knurl)" stroke="#181204" strokeWidth="0.6" />
          ))}

          {/* TWO TO-39 CANS (RAM / SWAP DETECTORS) */}
          <g transform="translate(14, 18)">
            <circle cx="10" cy="11" r="9.0" fill="#d6aa38" stroke="#5a420a" strokeWidth="1.0" />
            <circle cx="10" cy="11" r="7.2" fill="#14181c" stroke="#38424e" strokeWidth="0.6" />
            <rect x="7" y="8" width="6" height="6" fill="#080c14" stroke="#445566" strokeWidth="0.5" />
            <circle cx="10" cy="11" r="7.2" fill="url(#ultra-glass-dome)" />
            <text x="10" y="27" fill="#ffffff" fontSize="4.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">RAM</text>

            <circle cx="34" cy="11" r="9.0" fill="#d6aa38" stroke="#5a420a" strokeWidth="1.0" />
            <circle cx="34" cy="11" r="7.2" fill="#14181c" stroke="#38424e" strokeWidth="0.6" />
            <rect x="31" y="8" width="6" height="6" fill="#080c14" stroke="#445566" strokeWidth="0.5" />
            <circle cx="34" cy="11" r="7.2" fill="url(#ultra-glass-dome)" />
            <text x="34" y="27" fill="#ffffff" fontSize="4.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">SWAP</text>
          </g>

          {/* 20-SEGMENT BARGRAPH REFLECTING REAL SYSTEM RAM UTILIZATION */}
          <g transform="translate(64, 12)">
            <rect x="0" y="0" width="104" height="26" rx="2" fill="#04080a" stroke="#253540" strokeWidth="1.0" />

            {(() => {
              const litBars = Math.round((stats.ram.percent / 100) * 20);
              return [...Array(20)].map((_, i) => {
                const isLit = i < litBars;
                const isWarning = i >= 16;
                return (
                  <g key={`dip-bar-${i}`} transform={`translate(${4 + i * 4.8}, 3)`}>
                    <rect x="0" y="0" width="3.4" height="20" rx="0.5" fill="#101814" stroke="#040806" strokeWidth="0.4" />
                    <rect
                      x="0.4"
                      y="0.4"
                      width="2.6"
                      height="19.2"
                      rx="0.4"
                      fill={!isLit ? '#18241a' : isWarning ? '#ffb738' : '#39ff14'}
                      opacity={!isLit ? 0.25 : 0.98}
                      filter={isLit ? 'url(#neon-phosphor-hard)' : undefined}
                    />
                    <circle cx="1.7" cy="10" r="0.5" fill="#ffffff" opacity={isLit ? 0.95 : 0.15} />
                  </g>
                );
              });
            })()}

            <line x1="4" y1="13" x2="100" y2="13" stroke="#ffffff" strokeWidth="0.8" opacity="0.85" />
          </g>

          {/* HIGH-CONTRAST RAM DISPLAY BADGE */}
          <rect x="64" y="40" width="104" height="13" rx="1.5" fill="#020508" stroke="#1c3022" strokeWidth="0.8" />
          <text x="68" y="49.5" fill="#4ade80" fontSize="6.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" filter="url(#neon-phosphor-hard)">
            RAM: {(stats.ram.usedMb / 1024).toFixed(1)}G/{(stats.ram.totalMb / 1024).toFixed(1)}G ({stats.ram.percent}%)
          </text>
        </g>

        {/* 4B. Real NVMe SSD & NVIDIA RTX 3050 Thermal Radiator Loop */}
        <g
          transform="translate(1205, 125)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1200);
            onNodeClick('LOUVER-02', `NVMe [${stats.disk.tempC}°C] // RTX 3050 [${stats.gpu.tempC}°C]`);
          }}
          filter="url(#chassis-drop-shadow)"
          title={`NVME SSD & NVIDIA GPU THERMAL RADIATOR MANIFOLD
Root Filesystem (/): ${stats.disk.percent}% Used
NVMe SSD Temperature: ${stats.disk.tempC}°C (hwmon3 nvme)
NVIDIA GeForce RTX 3050: ${stats.gpu.tempC}°C // Load: ${stats.gpu.utilization}%
VRAM Allocation: ${stats.gpu.memUsedMb} MB / ${stats.gpu.memTotalMb} MB
(Click to probe hardware thermals)`}
        >
          <polygon
            points="0 64, 28 0, 204 0, 238 64, 290 64, 290 64"
            fill="url(#ultra-brushed-titanium)"
            stroke="#101418"
            strokeWidth="1.8"
          />

          {/* 14 Individual Copper Radiator Fins */}
          <g transform="translate(32, 6)">
            {[...Array(14)].map((_, i) => (
              <g key={`copper-fin-${i}`}>
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
                <line x1={i * 11.8 + 1.2} y1="1" x2={i * 11.8 + 1.2} y2="45" stroke="#ffe2c4" strokeWidth="0.8" opacity="0.8" />
                <rect x={i * 11.8 + 2.2} y="14" width="1.8" height="18" rx="0.9" fill="#140602" />
              </g>
            ))}
          </g>

          {/* Sight-Glass Tube (Glowing Fluid Flow) */}
          <g transform="translate(24, 24)">
            <rect x="-8" y="-4" width="12" height="20" rx="1.5" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.8" />
            <polygon points="-8 -4, -2 -4, 4 -1, 4 13, -2 16, -8 16" fill="#e8c258" opacity="0.5" />
            <rect x="176" y="-4" width="12" height="20" rx="1.5" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.8" />

            <rect x="4" y="0" width="172" height="12" rx="6" fill="#040c06" stroke="#16381e" strokeWidth="1.0" />
            <rect x="6" y="2" width="168" height="8" rx="4" fill="url(#ultra-glass-fluid)" filter="url(#neon-phosphor-hard)" />
            <line x1="8" y1="3.5" x2="172" y2="3.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.95" />

            <circle cx="34" cy="5" r="1.1" fill="#ffffff" opacity="0.8" />
            <circle cx="78" cy="7" r="1.4" fill="#ffffff" opacity="0.7" />
            <circle cx="122" cy="5" r="1.0" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Analog Bourdon Tube Gauge with Bold High-Contrast Text */}
          <g transform="translate(262, 38)">
            <circle cx="0" cy="0" r="19" fill="url(#ultra-brass-knurl)" stroke="#181002" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="15.5" fill="#14181c" stroke="#323a44" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="14" fill="url(#ultra-gauge-dial)" stroke="#606870" strokeWidth="0.6" />

            {[...Array(11)].map((_, i) => {
              const angle = -140 + i * 28;
              const rad = (angle * Math.PI) / 180;
              const isDanger = i >= 8;
              return (
                <line
                  key={`gauge-mark-${i}`}
                  x1={Math.cos(rad) * 9.5}
                  y1={Math.sin(rad) * 9.5}
                  x2={Math.cos(rad) * 13.0}
                  y2={Math.sin(rad) * 13.0}
                  stroke={isDanger ? '#dc2626' : '#14181c'}
                  strokeWidth={i % 2 === 0 ? 1.4 : 0.8}
                />
              );
            })}

            <text x="0" y="-4" fill="#000000" fontSize="4.2" fontFamily="Rajdhani, sans-serif" fontWeight="800" textAnchor="middle">DISK</text>
            <text x="0" y="9" fill="#000000" fontSize="4.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">{stats.disk.percent}%</text>

            <g transform={`rotate(${-140 + (stats.disk.percent / 100) * 280})`}>
              <line x1="0" y1="3" x2="0" y2="-11.5" stroke="#121518" strokeWidth="1.4" strokeLinecap="round" />
              <polygon points="-1.0 3, 1.0 3, 0 5.5" fill="#121518" />
              <circle cx="0" cy="0" r="2.4" fill="url(#ultra-brass-knurl)" stroke="#120e04" strokeWidth="0.5" />
            </g>

            <path d="M -12 -8 A 14 14 0 0 1 12 -8 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
          </g>

          {/* High-Contrast Hardware Temp Badge */}
          <rect x="30" y="52" width="200" height="11" rx="1.5" fill="#030608" stroke="#253240" strokeWidth="0.8" />
          <text x="35" y="60" fill="#5ce1e6" fontSize="5.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold">
            NVME: {stats.disk.tempC}°C  |  RTX 3050: {stats.gpu.tempC}°C ({stats.gpu.utilization}% LOAD)
          </text>
        </g>

        {/* ======================================================== */}
        {/* 5. LIVE FEDORA CIRCUIT 4: OS & GPU TELEMETRY ENCLOSURE   */}
        {/*    Location: Mid-Right (1140, 395)                       */}
        {/*    High-Contrast VFD Matrix & Bold Phoenix Pin Badges    */}
        {/* ======================================================== */}
        <g
          transform="translate(1140, 395)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playNodePing(1600);
            onNodeClick('DISPLAY-04', `FEDORA TELEMETRY [KERNEL: ${stats.os.kernel.split('-')[0]}]`);
          }}
          filter="url(#chassis-drop-shadow)"
          title={`FEDORA LINUX ENVIRONMENT TELEMETRY (ENV-900)
Distro: ${stats.os.distro}
Kernel: ${stats.os.kernel}
NVIDIA dGPU: ${stats.gpu.name} (${stats.gpu.tempC}°C, VRAM: ${stats.gpu.memUsedMb}/${stats.gpu.memTotalMb} MB)
Display Backlight: ${stats.display.brightnessPercent}% (amdgpu_bl1)
Load Average: ${stats.loadAvg.join(', ')}
(Click Phoenix screw pins below to adjust Brightness or Lock Screen!)`}
        >
          {/* Heavy Cast Aluminum Enclosure */}
          <rect x="0" y="0" width="224" height="98" rx="6" fill="url(#ultra-brushed-titanium)" stroke="#0c0e10" strokeWidth="2.2" />
          <rect x="2" y="2" width="220" height="94" rx="5" fill="none" stroke="url(#ultra-chrome-edge)" strokeWidth="1.0" opacity="0.85" />
          <rect x="5" y="5" width="214" height="88" rx="4" fill="#020406" stroke="#161c22" strokeWidth="1.4" />

          {/* 4 Knurled Panel Thumbscrews */}
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

          {/* ZONE A: REAL HARDWARE TRANSDUCER (MQ WIRE MESH DOME: NVIDIA GPU) */}
          <g transform="translate(16, 14)">
            <rect x="0" y="0" width="56" height="58" rx="2" fill="#04080c" stroke="#253545" strokeWidth="1.0" />

            <g transform="translate(28, 20)">
              <circle cx="0" cy="0" r="16" fill="#14181c" stroke="#485868" strokeWidth="1.0" />
              <circle cx="0" cy="0" r="13" fill="url(#ultra-wire-mesh-pat)" stroke="#a0b4c8" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="4.5" fill="#ff7014" opacity="0.9" filter="url(#neon-phosphor-hard)" />
              <circle cx="0" cy="0" r="2.2" fill="#ffe294" />
              <path d="M -10 -5 A 13 13 0 0 1 10 -5 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
            </g>

            <rect x="4" y="40" width="48" height="15" rx="1.5" fill="#020406" stroke="#1e2c38" strokeWidth="0.8" />
            <text x="28" y="47.5" fill="#ffffff" fontSize="5.0" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">RTX-3050</text>
            <text x="28" y="53.5" fill="#38bdf8" fontSize="4.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">{stats.gpu.tempC}°C | {stats.gpu.memUsedMb}MB</text>
          </g>

          {/* ZONE B: PROCESS RADAR SCOPE (360° BEAM SWEEP) */}
          <g transform="translate(78, 14)">
            <rect x="0" y="0" width="62" height="58" rx="2" fill="#020604" stroke="#163820" strokeWidth="1.0" />
            <circle cx="31" cy="29" r="23" fill="none" stroke="#164820" strokeWidth="0.9" strokeDasharray="2 3" />
            <circle cx="31" cy="29" r="15" fill="none" stroke="#206428" strokeWidth="0.9" />
            <circle cx="31" cy="29" r="6" fill="#08200c" stroke="#39ff14" strokeWidth="0.9" />
            <line x1="8" y1="29" x2="54" y2="29" stroke="#185222" strokeWidth="0.8" />
            <line x1="31" y1="6" x2="31" y2="52" stroke="#185222" strokeWidth="0.8" />

            <g transform="translate(31, 29)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4.5s"
                repeatCount="indefinite"
              />
              <line x1="0" y1="0" x2="23" y2="0" stroke="#ffffff" strokeWidth="1.6" filter="url(#neon-phosphor-hard)" />
              <polygon points="0 0, 23 -8, 23 0" fill="#39ff14" opacity="0.4" />
            </g>

            <circle cx="23" cy="20" r="2.4" fill="#39ff14" filter="url(#neon-phosphor-hard)" />
            <circle cx="41" cy="24" r="2.8" fill={theme.accent} filter="url(#neon-phosphor-hard)" />
            <circle cx="24" cy="38" r="2.0" fill="#ffffff" filter="url(#neon-phosphor-hard)" />
            <circle cx="38" cy="39" r="2.4" fill="#39ff14" filter="url(#neon-phosphor-hard)" />

            <path d="M 8 8 A 23 23 0 0 1 54 8 Z" fill="url(#ultra-glass-dome)" pointerEvents="none" />
          </g>

          {/* ZONE C: HIGH-CONTRAST VFD MATRIX DISPLAY */}
          <g transform="translate(146, 14)">
            <rect x="0" y="0" width="62" height="58" rx="2" fill="url(#ultra-vfd-cavity)" stroke="#224436" strokeWidth="1.2" />

            <line x1="2" y1="14" x2="60" y2="14" stroke="#4ade80" strokeWidth="0.25" opacity="0.3" />
            <line x1="2" y1="28" x2="60" y2="28" stroke="#4ade80" strokeWidth="0.25" opacity="0.3" />
            <line x1="2" y1="42" x2="60" y2="42" stroke="#4ade80" strokeWidth="0.25" opacity="0.3" />

            {[
              { label: 'OS', val: 'FEDORA 44' },
              { label: 'KRN', val: stats.os.kernel.split('-')[0] },
              { label: 'GPU', val: `${stats.gpu.tempC}°C` },
              { label: 'BRI', val: `${stats.display.brightnessPercent}%` },
            ].map((row, r) => (
              <g key={`vfd-row-${r}`} transform={`translate(4, ${4 + r * 13})`}>
                <text x="0" y="9.5" fill="#4ef59c" fontSize="6.8" fontFamily="Rajdhani, sans-serif" fontWeight="800" filter="url(#neon-phosphor-hard)">
                  {row.label}
                </text>
                <text x="22" y="9.5" fill="#ffffff" fontSize="7.2" fontFamily="Share Tech Mono, monospace" fontWeight="bold" filter="url(#neon-phosphor-hard)">
                  {row.val}
                </text>
                <circle cx="50" cy="6.5" r="2.0" fill="#39ff14" filter="url(#neon-phosphor-hard)" />
              </g>
            ))}
          </g>

          {/* INTERACTIVE PHOENIX CONTACT TERMINAL BLOCK (HIGH CONTRAST) */}
          <g transform="translate(24, 76)">
            <rect x="0" y="0" width="176" height="15" rx="1.8" fill="url(#ultra-phoenix-green)" stroke="#0d320b" strokeWidth="1.0" />

            {[
              {
                pin: '+BRI',
                col: '#ffdd20',
                title: 'Click: Increase Display Brightness (+5%)',
                action: () => {
                  soundFx.playClick(1.5);
                  controlBrightness(5);
                },
              },
              {
                pin: '-BRI',
                col: '#ff9020',
                title: 'Click: Decrease Display Brightness (-5%)',
                action: () => {
                  soundFx.playClick(0.9);
                  controlBrightness(-5);
                },
              },
              {
                pin: 'LOCK',
                col: '#ff3030',
                title: 'Click: Lock Fedora Plasma Session',
                action: () => {
                  soundFx.playPurge();
                  lockScreen();
                },
              },
              {
                pin: 'MUTE',
                col: '#4ade80',
                title: 'Click: Toggle Audio Mute',
                action: () => {
                  soundFx.playClick(1.2);
                  toggleSinkMute();
                },
              },
              {
                pin: 'MIC',
                col: '#20a8ff',
                title: 'Click: Toggle Mic Mute',
                action: () => {
                  soundFx.playClick(1.3);
                  toggleSourceMute();
                },
              },
              {
                pin: 'PING',
                col: '#ffffff',
                title: 'Click: Hardware Ping Probe',
                action: () => {
                  soundFx.playNodePing(2200);
                  onNodeClick('TERMINAL-BUS', 'FEDORA TELEMETRY BUS ACTIVE');
                },
              },
            ].map((term, idx) => (
              <g
                key={`term-pin-${idx}`}
                transform={`translate(${8 + idx * 28}, 0)`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  term.action();
                }}
                title={term.title}
              >
                <rect x="0" y="2" width="16" height="11" rx="1.0" fill="#144812" stroke="#082408" strokeWidth="0.5" />
                <circle cx="8" cy="7.5" r="3.2" fill="#b0bcc8" stroke="#32404c" strokeWidth="0.6" />
                <line x1="6" y1="7.5" x2="10" y2="7.5" stroke="#1c2630" strokeWidth="0.8" />
                <rect x="6.5" y="13" width="3" height="7" rx="0.5" fill={term.col} stroke="#101418" strokeWidth="0.4" />
                {/* Bold white pin label with dark drop-shadow */}
                <text x="8" y="1.2" fill="#ffffff" fontSize="4.6" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
                  {term.pin}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* ======================================================== */}
        {/* 6. LIVE FEDORA CIRCUIT 5: SYSTEM LOAD AVERAGE BUS        */}
        {/*    Location: Bottom-Center (670, 770)                    */}
        {/*    High-Contrast Caliper & Metric Graduations            */}
        {/* ======================================================== */}
        <g
          transform="translate(670, 770)"
          className="cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            soundFx.playClick(1.0);
            onNodeClick('SCALE-06', `LOAD AVERAGE: ${stats.loadAvg.join(' // ')}`);
          }}
          filter="url(#chassis-drop-shadow)"
          title={`FEDORA LINUX SYSTEM LOAD AVERAGE (/proc/loadavg)
1-Minute Load: ${stats.loadAvg[0]}
5-Minute Load: ${stats.loadAvg[1]}
15-Minute Load: ${stats.loadAvg[2]}
Vernier Caliper position dynamically tracks 1-minute system load.`}
        >
          <rect x="0" y="0" width="620" height="30" rx="3.5" fill="url(#ultra-brushed-titanium)" stroke="#0c0e10" strokeWidth="1.8" />
          <rect x="2" y="2" width="616" height="26" rx="2" fill="#020405" stroke="#161e24" strokeWidth="1.0" />

          {/* Heavy Grounding Terminal */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="22" height="18" rx="1.5" fill="url(#ultra-copper-metal)" stroke="#2c1404" strokeWidth="0.8" />
            <circle cx="11" cy="9" r="4.2" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="0.8" />
            <polygon points="11 6.5, 13 8, 13 10, 11 11.5, 9 10, 9 8" fill="#141004" />
          </g>

          {/* High-Visibility Laser Reference Line */}
          <line x1="32" y1="15" x2="614" y2="15" stroke="#39ff14" strokeWidth="1.8" filter="url(#neon-phosphor-hard)" />
          <line x1="32" y1="15" x2="614" y2="15" stroke="#ffffff" strokeWidth="0.9" />

          {/* High-Contrast Millimeter Graduations */}
          {[...Array(30)].map((_, i) => (
            <line
              key={`ruler-div-${i}`}
              x1={34 + i * 19}
              y1={i % 5 === 0 ? 2 : 7}
              x2={34 + i * 19}
              y2={i % 5 === 0 ? 28 : 23}
              stroke={i % 5 === 0 ? '#ffffff' : '#90a8c0'}
              strokeWidth={i % 5 === 0 ? 1.8 : 1.0}
            />
          ))}

          {/* Machined Brass Vernier Caliper Slider with Bold Load Readout */}
          <g transform={`translate(${Math.max(60, Math.min(590, 100 + stats.loadAvg[0] * 35))}, 0)`}>
            <rect x="-10" y="-2" width="26" height="34" rx="2.5" fill="url(#ultra-brass-knurl)" stroke="#1a1202" strokeWidth="1.2" />
            <line x1="3" y1="0" x2="3" y2="30" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="3" cy="6" r="2.2" fill="#2a1e06" />
            {/* Bold High-Contrast Load Text on Slider */}
            <rect x="-8" y="16" width="22" height="12" rx="1.5" fill="#080c10" stroke="#ffd778" strokeWidth="0.6" />
            <text x="3" y="24.8" fill="#ffe082" fontSize="6.0" fontFamily="Share Tech Mono, monospace" fontWeight="bold" textAnchor="middle">
              {stats.loadAvg[0].toFixed(1)}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
