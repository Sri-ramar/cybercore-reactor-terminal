import React, { useEffect, useRef, useMemo } from 'react';
import { ThemeConfig } from '../types';

interface CircuitCanvasProps {
  theme: ThemeConfig;
  powerOutput: number;
  activeSurgeNode: string | null;
  onNodeClick: (nodeId: string, label: string) => void;
}

interface Particle {
  traceIndex: number;
  t: number; // 0 to 1 along path
  speed: number;
  size: number;
  brightness: number;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  theme,
  powerOutput,
  activeSurgeNode,
  onNodeClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Define geometric circuit trace paths (in normalized 1000x562 coordinate space matching 16:9 ratio)
  const circuitPaths = useMemo(() => [
    // Top-Center to Top-Right branch
    'M 500 230 L 500 130 L 530 130 L 530 90 L 640 90 L 640 120 L 740 120',
    // Top Left Stepped Bus
    'M 470 240 L 454 180 L 410 180 L 410 150 L 370 150 L 370 110 L 340 110 L 340 90 L 250 90',
    // Left Horizontal Main Bus (Upper)
    'M 430 260 L 370 260 L 370 240 L 200 240 L 180 240 L 160 260 L 140 260',
    // Left Lower Complex Bus
    'M 435 300 L 380 300 L 350 330 L 310 330 L 310 370 L 280 370 L 250 400 L 180 400 L 150 430 L 70 430 L 50 450 L 30 450',
    // Left Center Logic Node
    'M 425 285 L 340 285 L 320 270 L 240 270 L 220 270 L 200 290 L 120 290',
    // Right Upper Diagonal Branch
    'M 570 250 L 630 190 L 680 190 L 710 160 L 750 160 L 770 140 L 850 140',
    // Right Mid Diagnostic Bus
    'M 575 285 L 670 285 L 700 315 L 750 315 L 780 300 L 880 300',
    // Right Lower Stepped Bus
    'M 565 315 L 610 360 L 650 360 L 680 390 L 750 390 L 750 430 L 920 430 L 920 480',
    // Bottom Center Grounding Rail
    'M 500 370 L 500 410 L 480 430 L 440 430 L 420 450 L 470 450 L 480 465 L 530 465 L 540 450 L 620 450 L 620 465 L 940 465',
    // Bottom Micro Rails
    'M 480 465 L 480 490 L 520 490',
    'M 640 390 L 640 420 L 730 420',
  ], []);

  // Setup animated glowing photon particles flowing along circuit paths
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create SVG path elements in memory to sample coordinates
    const pathNodes = circuitPaths.map(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      return { path, length: path.getTotalLength() };
    });

    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        traceIndex: Math.floor(Math.random() * circuitPaths.length),
        t: Math.random(),
        speed: 0.0015 + Math.random() * 0.0025,
        size: 1.5 + Math.random() * 2.2,
        brightness: 0.7 + Math.random() * 0.3,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 16.66;
      lastTime = time;

      // Match canvas resolution to display size
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const scaleX = width / 1000;
      const scaleY = height / 562;
      const speedMultiplier = 0.6 + (powerOutput / 100) * 1.4;

      // Draw flowing particles with luminous head & trail
      particles.forEach(p => {
        p.t += p.speed * speedMultiplier * dt;
        if (p.t > 1) {
          p.t = 0;
          p.traceIndex = Math.floor(Math.random() * circuitPaths.length);
        }

        const pathData = pathNodes[p.traceIndex];
        if (!pathData || pathData.length === 0) return;

        const currentDist = p.t * pathData.length;
        const pt = pathData.path.getPointAtLength(currentDist);

        const cx = pt.x * scaleX;
        const cy = pt.y * scaleY;

        // Particle core
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, p.size * 3.5);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, theme.accent);
        grad.addColorStop(0.7, theme.primary);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // High-intensity center dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [circuitPaths, powerOutput, theme]);

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      {/* SVG Layer: High Precision Glowing Neon Traces & Schematic Glyphs */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 562"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Intense Neon Drop-Filter */}
          <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur1" />
            <feGaussianBlur stdDeviation="4.5" result="blur2" />
            <feGaussianBlur stdDeviation="9.0" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.accent} />
            <stop offset="50%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.secondary} />
          </linearGradient>

          <pattern id="grid-micro" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Subtle PCB Micro Grid */}
        <rect width="1000" height="562" fill="url(#grid-micro)" />

        {/* Deep Recessed Dark Trace Beds (Sub-layer for skeuomorphic depth) */}
        <g stroke="#08090c" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          {circuitPaths.map((d, i) => (
            <path key={`bed-${i}`} d={d} />
          ))}
        </g>

        {/* Secondary Copper Trace Emboss */}
        <g stroke="#221a0a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {circuitPaths.map((d, i) => (
            <path key={`emboss-${i}`} d={d} />
          ))}
        </g>

        {/* Primary Radiant Neon Glow Layer */}
        <g
          stroke={theme.primary}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#circuit-glow)"
          opacity={0.88 + (powerOutput / 100) * 0.12}
        >
          {circuitPaths.map((d, i) => (
            <path
              key={`glow-${i}`}
              d={d}
              className={activeSurgeNode ? 'animate-pulse' : ''}
            />
          ))}
        </g>

        {/* Crisp White/Gold Core Filament */}
        <g stroke="#fff9e6" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          {circuitPaths.map((d, i) => (
            <path key={`core-${i}`} d={d} />
          ))}
        </g>

        {/* ======================================================== */}
        {/* EXACT SCHEMATIC GLYPHS & MICRO-MODULES MATCHING IMAGE   */}
        {/* ======================================================== */}

        {/* Top Center-Right Horizontal Data Readout Ribbon */}
        <g transform="translate(640, 105)" className="cursor-pointer" onClick={() => onNodeClick('MOD-OPT-01', 'OPTICAL TELEMETRY')}>
          <rect x="0" y="0" width="100" height="24" rx="2" fill="rgba(10,12,16,0.85)" stroke={theme.primary} strokeWidth="1.5" filter="url(#circuit-glow)" />
          {/* Micro lines inside */}
          <line x1="6" y1="6" x2="40" y2="6" stroke={theme.accent} strokeWidth="1.5" />
          <line x1="6" y1="12" x2="60" y2="12" stroke={theme.primary} strokeWidth="1" />
          <line x1="6" y1="18" x2="80" y2="18" stroke={theme.secondary} strokeWidth="1" />
          <rect x="85" y="4" width="10" height="16" fill={theme.primary} opacity="0.8" />
          <text x="50" y="38" fill={theme.accent} fontSize="7" fontFamily="var(--font-code)" textAnchor="middle">CORE-BUS: REV-7</text>
        </g>

        {/* Top-Right Optical Sensor Wing with Steps & Chevron */}
        <g transform="translate(740, 140)" className="cursor-pointer" onClick={() => onNodeClick('MOD-WING-02', 'SPECTRAL APERTURE')}>
          <path d="M 0 20 L 15 0 L 45 0 L 60 20 L 90 20 L 105 5 L 120 20 Z" fill="rgba(15,18,24,0.8)" stroke={theme.primary} strokeWidth="1.5" filter="url(#circuit-glow)" />
          <line x1="15" y1="6" x2="45" y2="6" stroke="#fff" strokeWidth="1.5" />
          <line x1="20" y1="12" x2="40" y2="12" stroke={theme.primary} strokeWidth="1" />
          <circle cx="8" cy="18" r="3" fill={theme.primary} />
          <circle cx="95" cy="15" r="2.5" fill="#ffffff" />
        </g>

        {/* Left Side: Logic Chip Box + Stamped Alignment Crosshairs */}
        <g transform="translate(220, 215)" className="cursor-pointer" onClick={() => onNodeClick('MOD-LOGIC-03', 'NEURAL LOGIC GATE')}>
          {/* Square with nested squares */}
          <rect x="0" y="0" width="28" height="28" fill="rgba(8,10,14,0.9)" stroke={theme.primary} strokeWidth="1.8" filter="url(#circuit-glow)" />
          <rect x="6" y="6" width="16" height="16" fill="none" stroke={theme.accent} strokeWidth="1.2" />
          <circle cx="14" cy="14" r="3" fill={theme.primary} />
          {/* Alignment Crosshairs */}
          <line x1="-15" y1="14" x2="-3" y2="14" stroke={theme.primary} strokeWidth="1" />
          <line x1="14" y1="-15" x2="14" y2="-3" stroke={theme.primary} strokeWidth="1" />
          <text x="14" y="38" fill={theme.accent} fontSize="6" fontFamily="var(--font-code)" textAnchor="middle">GATE-44B</text>
        </g>

        {/* Left Lower: Complex Glyph / Multi-Pin Diagnostics */}
        <g transform="translate(260, 360)" className="cursor-pointer" onClick={() => onNodeClick('MOD-DIAG-04', 'BUS SYNCHRONIZER')}>
          <path d="M 0 0 L 25 0 L 25 20 L 40 20 L 40 35 L 15 35 L 15 15 L 0 15 Z" fill="rgba(12,14,20,0.8)" stroke={theme.primary} strokeWidth="1.5" filter="url(#circuit-glow)" />
          {/* Pin dots */}
          <circle cx="8" cy="8" r="1.5" fill="#fff" />
          <circle cx="20" cy="8" r="1.5" fill={theme.primary} />
          <circle cx="32" cy="28" r="1.5" fill="#fff" />
          {/* Cross marker */}
          <line x1="-10" y1="20" x2="-2" y2="20" stroke={theme.accent} strokeWidth="1" />
          <line x1="-6" y1="16" x2="-6" y2="24" stroke={theme.accent} strokeWidth="1" />
          <text x="50" y="15" fill={theme.accent} fontSize="7" fontFamily="var(--font-code)">SYS: 88.4 MHz</text>
          <text x="50" y="26" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="var(--font-code)">Q-FACTOR: 1.04</text>
        </g>

        {/* Right Lower: Capacitor Bank / Relay Cluster (6 rounded capsules) */}
        <g transform="translate(680, 275)" className="cursor-pointer" onClick={() => onNodeClick('MOD-RELAY-05', 'CAPACITOR DISCHARGE BANK')}>
          <rect x="-4" y="-4" width="70" height="30" rx="3" fill="rgba(10,12,16,0.9)" stroke="rgba(255,183,0,0.3)" strokeWidth="1" />
          <g fill={theme.primary} filter="url(#circuit-glow)">
            <rect x="2" y="2" width="6" height="18" rx="2" />
            <rect x="11" y="2" width="6" height="18" rx="2" />
            <rect x="20" y="2" width="6" height="18" rx="2" />
            <rect x="29" y="2" width="6" height="18" rx="2" />
            <rect x="38" y="2" width="6" height="18" rx="2" />
            <rect x="47" y="2" width="6" height="18" rx="2" />
            <rect x="56" y="2" width="6" height="18" rx="2" />
          </g>
          <text x="32" y="36" fill={theme.accent} fontSize="6" fontFamily="var(--font-code)" textAnchor="middle">CAP-ARRAY: 4500 μF</text>
        </g>

        {/* Right Mid-Lower Trapezoid Wing Module */}
        <g transform="translate(775, 290)" className="cursor-pointer" onClick={() => onNodeClick('MOD-WING-06', 'MAGNETIC CONFINEMENT')}>
          <polygon points="0,15 15,0 90,0 75,15" fill="rgba(15,18,24,0.9)" stroke={theme.primary} strokeWidth="1.5" filter="url(#circuit-glow)" />
          <line x1="20" y1="7" x2="70" y2="7" stroke="#ffffff" strokeWidth="1" />
          <rect x="5" y="4" width="8" height="8" fill={theme.accent} />
          <text x="45" y="28" fill={theme.accent} fontSize="6" fontFamily="var(--font-code)" textAnchor="middle">MAG-CHAMBER</text>
        </g>

        {/* Bottom Horizontal Stepped Grounding Rail with Stamped Decals */}
        <g transform="translate(450, 480)">
          <line x1="0" y1="0" x2="480" y2="0" stroke={theme.primary} strokeWidth="2.5" filter="url(#circuit-glow)" />
          <line x1="0" y1="0" x2="480" y2="0" stroke="#ffffff" strokeWidth="1" />
          {/* Tick marks on grounding rail */}
          {[...Array(16)].map((_, idx) => (
            <line key={`gtick-${idx}`} x1={idx * 30 + 10} y1="-3" x2={idx * 30 + 10} y2="3" stroke={theme.accent} strokeWidth="1" />
          ))}
          {/* Grounding terminal blocks */}
          <rect x="460" y="-12" width="16" height="24" fill="rgba(10,12,16,0.9)" stroke={theme.primary} strokeWidth="1.5" />
          <line x1="464" y1="0" x2="472" y2="0" stroke="#fff" strokeWidth="2" />
        </g>

        {/* Left Side Tech Typography & Schematics */}
        <g transform="translate(80, 240)">
          <text x="0" y="0" fill={theme.primary} fontSize="9" fontFamily="var(--font-cyber)" fontWeight="bold" letterSpacing="1">
            // SECTOR-07 PRIMARY BUS
          </text>
          <text x="0" y="14" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="var(--font-code)">
            VOLT-REG: 14.8 kV [STABLE]
          </text>
          <text x="0" y="25" fill={theme.accent} fontSize="7" fontFamily="var(--font-code)">
            FLUX DENSITY: {(4.2 + (powerOutput / 100) * 8.6).toFixed(2)} TESLA
          </text>
        </g>

        {/* Interactive Highlight Ring when a node is triggered */}
        {activeSurgeNode && (
          <circle
            cx="500"
            cy="281"
            r="160"
            fill="none"
            stroke={theme.accent}
            strokeWidth="3"
            filter="url(#circuit-glow)"
            className="animate-ping"
            opacity="0.6"
          />
        )}
      </svg>

      {/* Canvas Layer: Fast Real-Time Particle Streamers */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={562}
        className="w-full h-full absolute inset-0 pointer-events-none"
      />
    </div>
  );
};
