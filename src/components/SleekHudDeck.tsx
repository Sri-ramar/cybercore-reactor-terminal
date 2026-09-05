import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Shield, Zap, Sparkles, Volume2, VolumeX, Palette, ChevronUp, ChevronDown, Eye, EyeOff, Droplets } from 'lucide-react';
import { ThemeConfig, SystemState } from '../types';

interface SleekHudDeckProps {
  theme: ThemeConfig;
  themes: ThemeConfig[];
  currentThemeId: string;
  onSelectTheme: (id: string) => void;
  systemState: SystemState;
  onUpdateState: (partial: Partial<SystemState>) => void;
  onSurgePulse: () => void;
  onPurge: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
  audioEngineReady: boolean;
  isEditingFoliage?: boolean;
  onToggleEditFoliage?: () => void;
  isWetMode?: boolean;
  onToggleWetMode?: () => void;
}

export const SleekHudDeck: React.FC<SleekHudDeckProps> = ({
  theme,
  themes,
  currentThemeId,
  onSelectTheme,
  systemState,
  onUpdateState,
  onSurgePulse,
  onPurge,
  audioMuted,
  onToggleAudio,
  isEditingFoliage = false,
  onToggleEditFoliage,
  isWetMode = false,
  onToggleWetMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBarHidden, setIsBarHidden] = useState(false);
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);

  if (isBarHidden) {
    return (
      <button
        id="show-deck-btn"
        onClick={() => setIsBarHidden(false)}
        className="absolute bottom-3 right-4 px-3 py-1.5 bg-[#050904]/90 hover:bg-[#0c1409] text-zinc-300 hover:text-white border border-[#1e3016] rounded-md text-[10px] font-code flex items-center gap-1.5 shadow-2xl backdrop-blur-md z-30 transition-all"
      >
        <Eye className="w-3.5 h-3.5" style={{ color: theme.primary }} />
        <span>SHOW CONTROLS</span>
      </button>
    );
  }

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-30 transition-all duration-300">
      {/* Sleek Machined Dark Stone / Wood Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#050904]/92 backdrop-blur-md border border-[#1b2b14] rounded-md shadow-2xl">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: theme.primary, color: theme.primary }}
          />
          <span
            className="text-[11px] font-cyber tracking-widest uppercase font-bold"
            style={{ color: theme.primary }}
          >
            BIO-CYBERNETIC CORE // SECTOR-V01
          </span>
          <span className="text-[10px] text-zinc-400 font-code hidden md:inline">
            SAP-FLOW: 0.08ms | PHOTOSYNTH: {systemState.powerOutput}% | RES: {systemState.resonance ? 'HARMONIC' : 'NOMINAL'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Foliage Visual Layout Editor Button */}
          {onToggleEditFoliage && (
            <button
              id="edit-foliage-btn"
              onClick={onToggleEditFoliage}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-code font-bold uppercase transition-all shadow-md active:scale-95 border ${
                isEditingFoliage
                  ? 'bg-emerald-500 text-black border-emerald-300 font-extrabold animate-pulse'
                  : 'bg-[#0f1f0d] text-emerald-300 hover:bg-[#183214] border-[#2b501c]'
              }`}
              title="Open Interactive Foliage Layout Editor (Move & Rotate Leaves)"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{isEditingFoliage ? 'CLOSE EDITOR' : 'EDIT FOLIAGE'}</span>
            </button>
          )}

          {/* Toggle Wet Dew & Condensation Mode */}
          {onToggleWetMode && (
            <button
              id="toggle-wet-mode-btn"
              onClick={onToggleWetMode}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-code font-bold uppercase transition-all shadow-md active:scale-95 border ${
                isWetMode
                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400 font-extrabold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-[#09151e] text-cyan-400/80 hover:bg-[#0f2333] border-[#163a4e]'
              }`}
              title="Toggle Wet Dew & Condensation (or press 'W' on keyboard to compare)"
            >
              <Droplets className={`w-3 h-3 ${isWetMode ? 'text-cyan-300 animate-pulse' : 'text-cyan-500'}`} />
              <span>{isWetMode ? '💧 WET DEW: ON' : '💧 WET DEW: OFF'}</span>
            </button>
          )}

          {/* Quick Surge Trigger Button */}
          <button
            id="quick-surge-btn"
            onClick={onSurgePulse}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-code font-bold uppercase transition-all shadow-md active:scale-95 border"
            style={{
              backgroundColor: `${theme.primary}25`,
              borderColor: theme.primary,
              color: '#ffffff',
            }}
          >
            <Zap className="w-3 h-3" style={{ color: theme.accent }} />
            <span>SPORE PULSE</span>
          </button>

          {/* Theme Palette Switcher */}
          <div className="relative">
            <button
              id="theme-palette-btn"
              onClick={() => setShowPaletteMenu(!showPaletteMenu)}
              className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-code bg-[#0b1408] hover:bg-[#12200d] border border-[#1e3015] rounded text-zinc-200 transition-colors"
            >
              <Palette className="w-3 h-3" style={{ color: theme.primary }} />
              <span className="capitalize">{themes.find((t) => t.id === currentThemeId)?.name || 'Theme'}</span>
            </button>

            {showPaletteMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-[#060c04]/95 border border-[#1e3015] rounded-md p-1.5 shadow-2xl flex flex-col gap-1 w-44 backdrop-blur-md z-50">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setShowPaletteMenu(false);
                    }}
                    className={`flex items-center gap-2 px-2 py-1 rounded text-[11px] font-code text-left transition-colors ${
                      currentThemeId === t.id
                        ? 'bg-[#14260d] text-white font-bold'
                        : 'text-zinc-400 hover:bg-[#0c1708] hover:text-zinc-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.primary }} />
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audio Toggle */}
          <button
            id="audio-mute-btn"
            onClick={onToggleAudio}
            title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1 text-zinc-400 hover:text-white bg-[#0b1408] border border-[#1e3015] rounded transition-colors"
          >
            {audioMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" style={{ color: theme.primary }} />}
          </button>

          {/* Expand / Minimize Controls */}
          <button
            id="toggle-hud-deck-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-code text-zinc-300 hover:text-white bg-[#0b1408] border border-[#1e3015] rounded transition-colors"
          >
            <span>{isExpanded ? 'CLOSE' : 'CONTROLS'}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>

          {/* Hide Bar Button */}
          <button
            id="hide-deck-btn"
            onClick={() => setIsBarHidden(true)}
            title="Hide Deck"
            className="p-1 text-zinc-400 hover:text-white bg-[#0b1408] border border-[#1e3015] rounded transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Control Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#050904]/95 backdrop-blur-xl border-x border-b border-[#1b2b14] rounded-b-md p-3 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Sliders Area (Power & RPM) */}
              <div className="md:col-span-5 flex flex-col gap-2 bg-[#091106]/90 border border-[#182611] p-2.5 rounded">
                <div>
                  <div className="flex justify-between text-[10px] font-code mb-1">
                    <span className="text-zinc-400">BIOLUMINESCENT POWER</span>
                    <span style={{ color: theme.primary }} className="font-bold">
                      {systemState.powerOutput}%
                    </span>
                  </div>
                  <input
                    id="power-slider"
                    type="range"
                    min="10"
                    max="150"
                    value={systemState.powerOutput}
                    onChange={(e) => onUpdateState({ powerOutput: Number(e.target.value) })}
                    className="w-full h-1.5 bg-[#121c0e] rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: theme.primary }}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-code mb-1">
                    <span className="text-zinc-400">IRIS APERTURE VELOCITY</span>
                    <span style={{ color: theme.accent }} className="font-bold">
                      {systemState.rpm} RPM
                    </span>
                  </div>
                  <input
                    id="rpm-slider"
                    type="range"
                    min="600"
                    max="9600"
                    step="100"
                    value={systemState.rpm}
                    onChange={(e) => onUpdateState({ rpm: Number(e.target.value) })}
                    className="w-full h-1.5 bg-[#121c0e] rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: theme.accent }}
                  />
                </div>
              </div>

              {/* Toggles (Cryo / Shield / Resonance) */}
              <div className="md:col-span-4 grid grid-cols-3 gap-2">
                <button
                  id="toggle-cryo"
                  onClick={() => onUpdateState({ cryoCooling: !systemState.cryoCooling })}
                  className={`flex flex-col items-center justify-center p-2 rounded border transition-all text-[10px] font-code ${
                    systemState.cryoCooling
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#091106] border-[#182611] text-zinc-400 hover:bg-[#0e1c0a]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 mb-1" style={{ color: theme.primary }} />
                  <span>SAP-COOL</span>
                </button>

                <button
                  id="toggle-shield"
                  onClick={() => onUpdateState({ magneticShield: !systemState.magneticShield })}
                  className={`flex flex-col items-center justify-center p-2 rounded border transition-all text-[10px] font-code ${
                    systemState.magneticShield
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#091106] border-[#182611] text-zinc-400 hover:bg-[#0e1c0a]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 mb-1" style={{ color: theme.primary }} />
                  <span>BARK-SHIELD</span>
                </button>

                <button
                  id="toggle-resonance"
                  onClick={() => onUpdateState({ resonance: !systemState.resonance })}
                  className={`flex flex-col items-center justify-center p-2 rounded border transition-all text-[10px] font-code ${
                    systemState.resonance
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#091106] border-[#182611] text-zinc-400 hover:bg-[#0e1c0a]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 mb-1" style={{ color: theme.accent }} />
                  <span>RESONANCE</span>
                </button>
              </div>

              {/* Purge Button */}
              <div className="md:col-span-3 flex gap-2">
                <button
                  id="surge-pulse-btn-expanded"
                  onClick={onSurgePulse}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded border text-[11px] font-code font-bold uppercase transition-all shadow-lg active:scale-95"
                  style={{
                    backgroundColor: `${theme.primary}30`,
                    borderColor: theme.primary,
                    color: '#ffffff',
                  }}
                >
                  <Zap className="w-4 h-4" style={{ color: theme.accent }} />
                  <span>SPORE BURST</span>
                </button>

                <button
                  id="purge-btn"
                  onClick={onPurge}
                  className="px-3 py-2.5 rounded border border-red-800/80 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[10px] font-code uppercase transition-all active:scale-95"
                  title="Chloroplast Purge"
                >
                  PURGE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
