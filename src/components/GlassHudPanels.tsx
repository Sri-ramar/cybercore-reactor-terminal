import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Flame,
  Shield,
  RotateCw,
  Radio,
  Sliders,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ReactorState, ThemeConfig, ThemeMode, DiagnosticLog } from '../types';
import { THEMES } from '../data/themes';
import { soundFx } from '../utils/soundEngine';

interface GlassHudPanelsProps {
  state: ReactorState;
  theme: ThemeConfig;
  logs: DiagnosticLog[];
  onStateChange: (updater: (prev: ReactorState) => ReactorState) => void;
  onThemeSelect: (themeKey: ThemeMode) => void;
  onTriggerSurge: () => void;
  onTriggerPurge: () => void;
}

export const GlassHudPanels: React.FC<GlassHudPanelsProps> = ({
  state,
  theme,
  logs,
  onStateChange,
  onThemeSelect,
  onTriggerSurge,
  onTriggerPurge,
}) => {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'controls' | 'diagnostics' | 'theme'>('controls');
  const [purgeCoverOpen, setPurgeCoverOpen] = useState(false);

  // Oscilloscope live wave data generator
  const [wavePoints, setWavePoints] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const pts = [];
      const time = Date.now() / 200;
      const freq = (state.statorRpm / 2000) * 1.5;
      const amp = 10 + (state.powerOutput / 100) * 15;
      for (let i = 0; i < 30; i++) {
        const y = Math.sin(time + i * 0.3 * freq) * amp + (Math.random() * 2 - 1);
        pts.push(y);
      }
      setWavePoints(pts);
    }, 50);
    return () => clearInterval(interval);
  }, [state.statorRpm, state.powerOutput]);

  const toggleCryo = () => {
    soundFx.playClick(0.9);
    onStateChange((prev) => ({
      ...prev,
      isCryoCooling: !prev.isCryoCooling,
      coreTempK: prev.isCryoCooling ? prev.coreTempK + 150 : Math.max(310, prev.coreTempK - 220),
    }));
  };

  const toggleShield = () => {
    soundFx.playClick(1.1);
    onStateChange((prev) => ({
      ...prev,
      isMagneticShieldActive: !prev.isMagneticShieldActive,
    }));
  };

  const toggleResonance = () => {
    soundFx.playClick(1.2);
    onStateChange((prev) => ({
      ...prev,
      isResonanceLocked: !prev.isResonanceLocked,
    }));
  };

  const handlePowerSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    soundFx.updateAmbientHum(val);
    onStateChange((prev) => ({
      ...prev,
      powerOutput: val,
      isOverdrive: val > 100,
      coreTempK: 300 + val * 6.5,
      fluxDensity: Number((4.2 + (val / 100) * 8.6).toFixed(2)),
    }));
  };

  const handleRpmSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    soundFx.playServo();
    onStateChange((prev) => ({
      ...prev,
      statorRpm: val,
    }));
  };

  const toggleAudio = () => {
    const nextMuted = !state.audioMuted;
    soundFx.setMuted(nextMuted);
    onStateChange((prev) => ({ ...prev, audioMuted: nextMuted }));
  };

  const toggleHud = () => {
    soundFx.playClick(1.3);
    onStateChange((prev) => ({ ...prev, hudVisible: !prev.hudVisible }));
  };

  return (
    <>
      {/* Top Floating Control Bar (Minimalist Glass Strip) */}
      <div className="absolute top-3 left-4 right-4 sm:left-8 sm:right-8 z-30 flex items-center justify-between pointer-events-auto">
        {/* Left Side: System Status Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-hud-panel">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{
              backgroundColor: state.isOverdrive ? '#ff3344' : theme.primary,
              boxShadow: `0 0 10px ${state.isOverdrive ? '#ff3344' : theme.primary}`,
            }}
          />
          <span className="text-xs font-mono font-bold tracking-wider" style={{ color: theme.accent }}>
            {state.isOverdrive ? 'CORE OVERDRIVE [120%+]' : 'CORE NOMINAL [RESONANCE OK]'}
          </span>
        </div>

        {/* Right Side: Quick Action Glass Buttons */}
        <div className="flex items-center space-x-2">
          {/* Theme Palette Switcher Button */}
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-3 py-1.5 rounded-lg glass-hud-panel text-xs font-mono flex items-center space-x-1.5 transition-all ${
              activeTab === 'theme' ? 'border-amber-400 bg-amber-950/40' : 'hover:bg-white/5'
            }`}
            style={{ color: theme.accent }}
            title="Switch Color Theme"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.primary }} />
            <span className="hidden sm:inline">PALETTE</span>
          </button>

          {/* HUD Overlay Toggle */}
          <button
            onClick={toggleHud}
            className={`px-3 py-1.5 rounded-lg glass-hud-panel text-xs font-mono flex items-center space-x-1.5 transition-all ${
              state.hudVisible ? 'border-amber-400' : 'opacity-60'
            }`}
            style={{ color: theme.accent }}
            title="Toggle Holographic HUD"
          >
            {state.hudVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{state.hudVisible ? 'HUD ON' : 'HUD OFF'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg glass-hud-panel transition-all ${
              state.audioMuted ? 'opacity-50 text-gray-400' : 'text-amber-400'
            }`}
            title={state.audioMuted ? 'Unmute Audio Synthesizer' : 'Mute Audio'}
          >
            {state.audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Floating HUD Deck (Visible when HUD is enabled) */}
      {state.hudVisible && (
        <div className="absolute bottom-3 left-4 right-4 sm:left-8 sm:right-8 z-30 pointer-events-auto flex flex-col md:flex-row gap-3">
          {/* Left / Bottom-Left Glass Deck: Tactile Controls & Switches */}
          <div className="flex-1 glass-hud-panel rounded-xl p-3.5 sm:p-4 transition-all">
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4" style={{ color: theme.primary }} />
                <span className="text-xs font-mono font-bold tracking-widest" style={{ color: theme.accent }}>
                  TACTILE REACTOR CONTROLS
                </span>
              </div>
              <div className="flex space-x-1">
                {(['controls', 'telemetry', 'diagnostics', 'theme'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                      activeTab === tab
                        ? 'bg-amber-500/20 text-white font-bold border border-amber-400/40'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT: CONTROLS */}
            {activeTab === 'controls' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-center">
                {/* Power Output Slider */}
                <div className="flex flex-col space-y-1.5 p-2 rounded-lg bg-black/40 border border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> POWER OUTPUT
                    </span>
                    <span className="font-bold" style={{ color: state.isOverdrive ? '#ff3344' : theme.primary }}>
                      {state.powerOutput}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={state.powerOutput}
                    onChange={handlePowerSlider}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-[#181c24] rounded"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>IDLE (10%)</span>
                    <span>NOMINAL</span>
                    <span className="text-red-400">OVERDRIVE (150%)</span>
                  </div>
                </div>

                {/* Stator Speed Slider */}
                <div className="flex flex-col space-y-1.5 p-2 rounded-lg bg-black/40 border border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1">
                      <RotateCw className="w-3 h-3 text-amber-400" /> APERTURE RPM
                    </span>
                    <span className="font-bold text-amber-300">{state.statorRpm} RPM</span>
                  </div>
                  <input
                    type="range"
                    min="1200"
                    max="9600"
                    step="100"
                    value={state.statorRpm}
                    onChange={handleRpmSlider}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-[#181c24] rounded"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>1.2k RPM</span>
                    <span>5.4k</span>
                    <span>9.6k RPM</span>
                  </div>
                </div>

                {/* Heavy Skeuomorphic Toggle Switches */}
                <div className="flex items-center justify-around p-2 rounded-lg bg-black/40 border border-white/5">
                  {/* Cryo Switch */}
                  <button
                    onClick={toggleCryo}
                    className="flex flex-col items-center space-y-1 group"
                    title="Toggle Cryogenic Cooling"
                  >
                    <div
                      className={`w-8 h-12 rounded-md p-1 flex flex-col justify-between transition-all metal-plate-emboss border ${
                        state.isCryoCooling ? 'border-cyan-400/50 shadow-cyan-500/30' : 'border-gray-700'
                      }`}
                    >
                      <div
                        className={`w-full h-4 rounded-sm transition-all ${
                          state.isCryoCooling ? 'bg-cyan-400 shadow-md shadow-cyan-400' : 'bg-gray-700'
                        }`}
                      />
                      <div className="w-full h-1 bg-black/60 rounded" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 group-hover:text-cyan-300">
                      CRYO-COOL
                    </span>
                  </button>

                  {/* Mag Shield Switch */}
                  <button
                    onClick={toggleShield}
                    className="flex flex-col items-center space-y-1 group"
                    title="Toggle Magnetic Confinement Shield"
                  >
                    <div
                      className={`w-8 h-12 rounded-md p-1 flex flex-col justify-between transition-all metal-plate-emboss border ${
                        state.isMagneticShieldActive ? 'border-amber-400/50 shadow-amber-500/30' : 'border-gray-700'
                      }`}
                    >
                      <div
                        className={`w-full h-4 rounded-sm transition-all ${
                          state.isMagneticShieldActive ? 'bg-amber-400 shadow-md shadow-amber-400' : 'bg-gray-700'
                        }`}
                      />
                      <div className="w-full h-1 bg-black/60 rounded" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 group-hover:text-amber-300">
                      MAG-SHIELD
                    </span>
                  </button>

                  {/* Resonance Lock Switch */}
                  <button
                    onClick={toggleResonance}
                    className="flex flex-col items-center space-y-1 group"
                    title="Toggle Quantum Resonance Harmonizer"
                  >
                    <div
                      className={`w-8 h-12 rounded-md p-1 flex flex-col justify-between transition-all metal-plate-emboss border ${
                        state.isResonanceLocked ? 'border-emerald-400/50 shadow-emerald-500/30' : 'border-gray-700'
                      }`}
                    >
                      <div
                        className={`w-full h-4 rounded-sm transition-all ${
                          state.isResonanceLocked ? 'bg-emerald-400 shadow-md shadow-emerald-400' : 'bg-gray-700'
                        }`}
                      />
                      <div className="w-full h-1 bg-black/60 rounded" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 group-hover:text-emerald-300">
                      RESONANCE
                    </span>
                  </button>
                </div>

                {/* Tactile Action Triggers: Surge Pulse & Purge */}
                <div className="flex items-center space-x-2">
                  {/* Surge Pulse Button */}
                  <button
                    onClick={() => {
                      soundFx.playSurge();
                      onTriggerSurge();
                    }}
                    className="flex-1 py-3 px-2 rounded-lg bg-gradient-to-b from-[#2a220a] to-[#120f05] border border-amber-500/50 hover:border-amber-400 text-amber-300 text-xs font-mono font-bold tracking-wider active:scale-95 transition-all flex flex-col items-center justify-center space-y-0.5 shadow-lg shadow-amber-950/40"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>SURGE PULSE</span>
                  </button>

                  {/* Purge Button with Flip Guard */}
                  <div className="relative">
                    {!purgeCoverOpen ? (
                      <button
                        onClick={() => {
                          soundFx.playClick(1.4);
                          setPurgeCoverOpen(true);
                        }}
                        className="w-16 h-14 rounded-lg bg-gradient-to-b from-[#3a1515] to-[#1a0808] border border-red-500/40 flex flex-col items-center justify-center text-[9px] font-mono text-red-400 font-bold hover:border-red-400 active:scale-95 transition-all"
                        title="Lift Safety Guard"
                      >
                        <Shield className="w-3.5 h-3.5 text-red-400 mb-0.5" />
                        <span>ARM PURGE</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onTriggerPurge();
                          setPurgeCoverOpen(false);
                        }}
                        className="w-16 h-14 rounded-lg bg-red-600 hover:bg-red-500 border-2 border-red-300 flex flex-col items-center justify-center text-[10px] font-mono text-white font-bold animate-pulse active:scale-90 transition-all shadow-lg shadow-red-600/50"
                        title="TRIGGER PNEUMATIC PURGE"
                      >
                        <Flame className="w-4 h-4 text-white animate-bounce" />
                        <span>DISCHARGE</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TELEMETRY */}
            {activeTab === 'telemetry' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block text-[10px]">CORE THERMAL LOAD</span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: state.coreTempK > 1000 ? '#ff3344' : theme.accent }}
                  >
                    {state.coreTempK.toFixed(0)} K
                  </span>
                  <span className="text-[9px] text-gray-500 block">MAX LIMIT: 1800 K</span>
                </div>

                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block text-[10px]">FLUX DENSITY</span>
                  <span className="text-lg font-bold text-amber-300">{state.fluxDensity} T</span>
                  <span className="text-[9px] text-gray-500 block">VECTOR: NORMALIZED</span>
                </div>

                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block text-[10px]">QUANTUM COHERENCE</span>
                  <span className="text-lg font-bold text-emerald-400">
                    {(94.2 + (state.isResonanceLocked ? 5.2 : 0) - (state.isOverdrive ? 12 : 0)).toFixed(1)}%
                  </span>
                  <span className="text-[9px] text-gray-500 block">PHASE DELAY: 0.04°</span>
                </div>

                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block text-[10px]">SYSTEM FREQUENCY</span>
                  <span className="text-lg font-bold text-cyan-300">{(state.statorRpm / 60).toFixed(1)} Hz</span>
                  <span className="text-[9px] text-gray-500 block">HARMONICS: LOCK</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: DIAGNOSTICS */}
            {activeTab === 'diagnostics' && (
              <div className="h-20 overflow-y-auto pr-1 space-y-1 font-mono text-[11px]">
                {logs.slice(-5).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-white/5"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          log.severity === 'crit'
                            ? 'bg-red-500'
                            : log.severity === 'warn'
                            ? 'bg-amber-400'
                            : 'bg-cyan-400'
                        }`}
                      />
                      <span className="text-gray-400">{log.timestamp}</span>
                      <span className="text-gray-200">{log.message}</span>
                    </div>
                    <span className="text-[9px] text-amber-400/70">{log.code}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: THEME COLOR PALETTE */}
            {activeTab === 'theme' && (
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(THEMES) as ThemeMode[]).map((themeKey) => {
                  const t = THEMES[themeKey];
                  return (
                    <button
                      key={themeKey}
                      onClick={() => {
                        soundFx.playClick();
                        onThemeSelect(themeKey);
                      }}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono flex items-center space-x-2 transition-all ${
                        state.selectedTheme === themeKey
                          ? 'bg-white/10 border-amber-400 text-white font-bold'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: t.primary, boxShadow: `0 0 8px ${t.primary}` }}
                      />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Floating Glass Widget: Live Oscilloscope Waveform */}
          <div className="w-full md:w-56 glass-hud-panel rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-white/10 pb-1">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" style={{ color: theme.primary }} /> FLUX HARMONIC
              </span>
              <span style={{ color: theme.accent }}>LIVE</span>
            </div>

            {/* Oscilloscope SVG Canvas */}
            <div className="h-14 w-full my-1 flex items-center justify-center bg-black/50 rounded border border-white/5 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                <polyline
                  fill="none"
                  stroke={theme.primary}
                  strokeWidth="1.8"
                  points={wavePoints.map((y, i) => `${(i / (wavePoints.length - 1)) * 100},${20 + y}`).join(' ')}
                />
              </svg>
            </div>

            <div className="flex justify-between text-[9px] font-mono text-gray-400">
              <span>AMP: {(state.powerOutput * 0.8).toFixed(0)} mV</span>
              <span>SYNC: LOCK</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
