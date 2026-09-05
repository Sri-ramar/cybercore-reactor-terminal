import React, { useState, useMemo } from 'react';
import { ThemeConfig } from '../types';
import { soundFx } from '../utils/soundEngine';
import { Zap, Activity, Cpu, Layers, Radio, Sparkles, CheckCircle2, X } from 'lucide-react';

interface CircuitSchematicLayerProps {
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

export const CircuitSchematicLayer: React.FC<CircuitSchematicLayerProps> = ({
  theme,
  powerOutput,
  activeSurgeNode,
  onNodeClick,
}) => {
  const [selectedModule, setSelectedModule] = useState<ActiveNodeDetail | null>(null);

  // Modules directly mapped to visual hardware in the photorealistic backdrop (1600x900 coordinate system)
  const hardwareModules: ActiveNodeDetail[] = useMemo(
    () => [
      {
        id: 'MOD-TRAY-01',
        name: 'PHOTOSYNTHETIC MATRIX',
        category: 'CHAMBER-01',
        status: 'OPTIMAL',
        metric1: 'LUMEN HARVEST: 98.4%',
        metric2: 'CHLOROPLAST FLUX: 4.2 L/h',
        metric3: 'BIOMASS: +14.2 mg/s',
        x: 1040,
        y: 115,
      },
      {
        id: 'BIO-VALVE-02',
        name: 'CHLORO-VALVE BRANCH',
        category: 'NODE-02',
        status: 'ACTIVE',
        metric1: 'PRESSURE: 4.8 bar',
        metric2: 'SPORE DENSITY: 880 ppm',
        metric3: 'FLOW RATE: 240 mL/m',
        x: 480,
        y: 80,
      },
      {
        id: 'MOD-CHIP-05',
        name: 'NEURAL SAP PROCESSOR',
        category: 'CPU-03',
        status: 'LOCKED',
        metric1: 'SYNAPSE CLK: 4.80 GHz',
        metric2: 'MYCELIUM BUS: 1.2 Tb/s',
        metric3: 'TEMP: 34.2 °C',
        x: 310,
        y: 390,
      },
      {
        id: 'MOD-MATRIX-03',
        name: 'BIO-MATRIX LED ARRAY',
        category: 'DISPLAY-04',
        status: 'STREAMING',
        metric1: 'REFRESH: 120 Hz',
        metric2: 'PHOTON INTENSITY: 850 cd',
        metric3: 'MATRIX LOCK: 64/64',
        x: 1270,
        y: 540,
      },
      {
        id: 'MOD-BOARD-06',
        name: 'SLATE CONSOLE SUBSTRATE',
        category: 'TERMINAL-05',
        status: 'READY',
        metric1: 'ENCRYPTION: QUANTUM 512',
        metric2: 'ROOT BUS: CONNECTED',
        metric3: 'RESONANCE: HARMONIC',
        x: 430,
        y: 710,
      },
      {
        id: 'BIO-FERN-08',
        name: 'FERN BIOME HARVESTER',
        category: 'SENSOR-06',
        status: 'MONITORING',
        metric1: 'RHIZOME TEMP: 18.2 °C',
        metric2: 'MOISTURE LEVEL: 84.5%',
        metric3: 'ION TRANSFER: NOMINAL',
        x: 1220,
        y: 750,
      },
      {
        id: 'MOD-RULER-07',
        name: 'VOLUMETRIC CALIBRATION BUS',
        category: 'RAIL-07',
        status: 'CALIBRATED',
        metric1: 'VERNIER OFFSET: +0.02 mm',
        metric2: 'LINEAR STROKE: 620 mm',
        metric3: 'SCALE ACCURACY: 99.98%',
        x: 770,
        y: 840,
      },
    ],
    []
  );

  // Discrete Terminal Pin Probes across circuit ends
  const terminalPins = useMemo(
    () => [
      { id: 'PIN-01', x: 260, y: 65, name: 'CANOPY FEED' },
      { id: 'PIN-02', x: 1400, y: 180, name: 'SAP RELAY' },
      { id: 'PIN-03', x: 80, y: 400, name: 'MYCELIUM EXT' },
      { id: 'PIN-04', x: 120, y: 490, name: 'PHOTOSYNTH' },
      { id: 'PIN-05', x: 20, y: 810, name: 'ROOT GND' },
      { id: 'PIN-06', x: 1480, y: 800, name: 'TAPROOT BUS' },
      { id: 'PIN-07', x: 850, y: 840, name: 'STEM INGRESS' },
    ],
    []
  );

  const handleModuleClick = (mod: ActiveNodeDetail) => {
    soundFx.playClick(1.2);
    setSelectedModule(mod);
    onNodeClick(mod.id, mod.name);
  };

  const handlePinClick = (pin: { id: string; name: string; x: number; y: number }) => {
    soundFx.playClick(1.4);
    setSelectedModule({
      id: pin.id,
      name: pin.name,
      category: 'TERMINAL PIN',
      status: 'SIGNAL LOCKED',
      metric1: 'IMPEDANCE: 50.2 Ω',
      metric2: 'VOLTAGE: 3.30 V',
      metric3: 'ATTENUATION: -0.1 dB',
      x: pin.x,
      y: pin.y,
    });
    onNodeClick(pin.id, pin.name);
  };

  return (
    <div className="absolute inset-0 pointer-events-auto select-none z-15">
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glowing Luminous Emerald Circuit Bloom */}
          <filter id="circuit-hotspot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b1" />
            <feGaussianBlur stdDeviation="7" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. ANIMATED LED DOT MATRIX SHIMMER (Mid-Right Display)   */}
        {/* ======================================================== */}
        <g transform="translate(1290, 545)" className="pointer-events-none">
          <g fill={theme.primary} filter="url(#circuit-hotspot-glow)">
            {[...Array(4)].map((_, r) =>
              [...Array(14)].map((_, c) => {
                const delay = ((r * 14 + c) * 0.08) % 2.5;
                return (
                  <circle
                    key={`matrix-led-${r}-${c}`}
                    cx={c * 9.5}
                    cy={r * 10}
                    r="2.2"
                    opacity="0.85"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;1;0.4;0.9;0.3"
                      dur="3s"
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })
            )}
          </g>
        </g>

        {/* ======================================================== */}
        {/* 2. ANIMATED PHOTOSYNTHESIS CHAMBER FLUID (Top-Right)     */}
        {/* ======================================================== */}
        <g transform="translate(1055, 120)" className="pointer-events-none">
          <line
            x1="0"
            y1="16"
            x2="140"
            y2="16"
            stroke="#ffffff"
            strokeWidth="1.8"
            opacity="0.75"
            filter="url(#circuit-hotspot-glow)"
          />
          <line
            x1="0"
            y1="16"
            x2="140"
            y2="16"
            stroke={theme.accent}
            strokeWidth="4"
            opacity="0.6"
            filter="url(#circuit-hotspot-glow)"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </line>
        </g>

        {/* ======================================================== */}
        {/* 3. INTERACTIVE HARDWARE MODULE HOTSPOTS                  */}
        {/* ======================================================== */}

        {/* Top-Right Photosynthetic Chamber */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[0])}
        >
          <rect
            x="1035"
            y="100"
            width="180"
            height="60"
            rx="6"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'MOD-TRAY-01' && (
            <rect
              x="1035"
              y="100"
              width="180"
              height="60"
              rx="6"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* Top-Left Spore Valve */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[1])}
        >
          <rect
            x="460"
            y="70"
            width="150"
            height="60"
            rx="6"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'BIO-VALVE-02' && (
            <rect
              x="460"
              y="70"
              width="150"
              height="60"
              rx="6"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* Mid-Left Sap Processor CPU */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[2])}
        >
          <rect
            x="295"
            y="375"
            width="110"
            height="95"
            rx="8"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'MOD-CHIP-05' && (
            <rect
              x="295"
              y="375"
              width="110"
              height="95"
              rx="8"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* Mid-Right LED Matrix Display */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[3])}
        >
          <rect
            x="1255"
            y="525"
            width="205"
            height="75"
            rx="6"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'MOD-MATRIX-03' && (
            <rect
              x="1255"
              y="525"
              width="205"
              height="75"
              rx="6"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* Lower-Left Slate Terminal Console */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[4])}
        >
          <rect
            x="410"
            y="680"
            width="210"
            height="130"
            rx="8"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'MOD-BOARD-06' && (
            <rect
              x="410"
              y="680"
              width="210"
              height="130"
              rx="8"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* Lower-Right Fern Sensor */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[5])}
        >
          <rect
            x="1200"
            y="730"
            width="250"
            height="80"
            rx="6"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'BIO-FERN-08' && (
            <rect
              x="1200"
              y="730"
              width="250"
              height="80"
              rx="6"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* Bottom Volumetric Calibration Ruler */}
        <g
          className="cursor-pointer group"
          onClick={() => handleModuleClick(hardwareModules[6])}
        >
          <rect
            x="740"
            y="825"
            width="380"
            height="50"
            rx="4"
            fill="transparent"
            className="hover:stroke-lime-400/80 hover:stroke-[2px] transition-all"
          />
          {activeSurgeNode === 'MOD-RULER-07' && (
            <rect
              x="740"
              y="825"
              width="380"
              height="50"
              rx="4"
              fill="none"
              stroke={theme.accent}
              strokeWidth="2.5"
              className="animate-pulse"
              filter="url(#circuit-hotspot-glow)"
            />
          )}
        </g>

        {/* ======================================================== */}
        {/* 4. DISCRETE TERMINAL PIN PROBES                          */}
        {/* ======================================================== */}
        {terminalPins.map((pin) => (
          <g
            key={pin.id}
            transform={`translate(${pin.x}, ${pin.y})`}
            className="cursor-pointer transition-transform hover:scale-125"
            onClick={() => handlePinClick(pin)}
          >
            <circle cx="0" cy="0" r="8" fill="rgba(0,0,0,0.6)" stroke={theme.primary} strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4.5" fill={theme.primary} filter="url(#circuit-hotspot-glow)" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" />

            {activeSurgeNode === pin.id && (
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="none"
                stroke={theme.accent}
                strokeWidth="2"
                className="animate-ping"
              />
            )}
          </g>
        ))}
      </svg>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE HOLOGRAPHIC DIAGNOSTIC TELEMETRY CARD     */}
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
          <div className="w-64 p-3 rounded-lg bg-[#060b05]/92 border border-lime-500/50 shadow-2xl backdrop-blur-md text-zinc-200 font-mono text-xs">
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
            <div className="space-y-1 text-[10px] bg-black/40 p-2 rounded border border-white/5">
              <div className="text-lime-300 font-bold">{selectedModule.metric1}</div>
              <div className="text-zinc-300">{selectedModule.metric2}</div>
              <div className="text-zinc-400">{selectedModule.metric3}</div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex gap-1.5">
              <button
                onClick={() => {
                  soundFx.playSurge();
                  onNodeClick(selectedModule.id, selectedModule.name);
                }}
                className="flex-1 py-1 bg-lime-500/20 hover:bg-lime-500/30 border border-lime-500/40 rounded text-[10px] text-lime-300 font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <Zap className="w-3 h-3 text-lime-400" />
                PULSE NODE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
