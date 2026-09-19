import React, { useState, useEffect, useCallback, useRef } from 'react';
import backgroundImageUrl from '../assets/Background.png';
import { ProceduralBotanicalEngine } from './components/procedural/ProceduralBotanicalEngine';
import { ProceduralBottomGrassLayer } from './components/procedural/ProceduralBottomGrassLayer';
import { ProceduralHardwareLayer } from './components/procedural/ProceduralHardwareLayer';
import { ProceduralParticleSystem } from './components/procedural/ProceduralParticleSystem';
import { ProceduralCoreOrb } from './components/procedural/ProceduralCoreOrb';
import { SleekHudDeck } from './components/SleekHudDeck';
import { FoliageEditorOverlay } from './components/editor/FoliageEditorOverlay';
import { DEFAULT_FOLIAGE_LAYOUT, FoliageSprayItem, STORAGE_KEY_FOLIAGE } from './data/defaultFoliageLayout';
import { THEMES } from './data/themes';
import { ThemeConfig, ThemeMode } from './types';
import { soundFx } from './utils/soundEngine';
import soothingBgmUrl from '../soothe_music/Shinchan has such a soothing BGM..[rebalanced].mp3';

export interface SystemState {
  powerOutput: number;
  rpm: number;
  cryoCooling: boolean;
  magneticShield: boolean;
  resonance: boolean;
  activeSurgeNode: string | null;
  isPurging: boolean;
}

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeMode>('overgrown-bio');
  const [audioMuted, setAudioMuted] = useState(false);
  const [isEditingFoliage, setIsEditingFoliage] = useState(false);
  const [isWetMode, setIsWetMode] = useState(false);

  // Persistent Foliage Layout (Loaded from localStorage or defaults)
  const [foliageList, setFoliageList] = useState<FoliageSprayItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FOLIAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_FOLIAGE_LAYOUT;
  });

  const handleUpdateFoliage = useCallback((newList: FoliageSprayItem[]) => {
    setFoliageList(newList);
    try {
      localStorage.setItem(STORAGE_KEY_FOLIAGE, JSON.stringify(newList));
    } catch {
      // storage full or disabled
    }
  }, []);

  const [systemState, setSystemState] = useState<SystemState>({
    powerOutput: 85,
    rpm: 4800,
    cryoCooling: false,
    magneticShield: true,
    resonance: true,
    activeSurgeNode: null,
    isPurging: false,
  });

  const currentTheme: ThemeConfig = THEMES[currentThemeId] || THEMES['cyber-amber'];
  const themeList = Object.values(THEMES);

  const updateSystemState = useCallback((partial: Partial<SystemState>) => {
    soundFx.playClick();
    setSystemState((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleSelectTheme = useCallback((id: string) => {
    soundFx.playClick();
    setCurrentThemeId(id as ThemeMode);
  }, []);

  const handleToggleAudio = useCallback(() => {
    const next = !audioMuted;
    setAudioMuted(next);
    soundFx.setMuted(next);
  }, [audioMuted]);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastToggleTimeRef = useRef<number>(0);

  // Initialize background soothing music element
  useEffect(() => {
    // Prefer Vite bundled URL with fallback to public path
    const audioSrc = soothingBgmUrl || encodeURI('/soothe_music/Shinchan has such a soothing BGM..[rebalanced].mp3');
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.75;
    audio.muted = audioMuted;
    audioRef.current = audio;

    const handlePlay = () => setIsPlayingMusic(true);
    const handlePause = () => setIsPlayingMusic(false);
    const handleEnded = () => {
      // Ensure continuous loop
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Sync mute state with background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = audioMuted;
    }
  }, [audioMuted]);

  // Central Orb Toggle: play music in loop, touch again to stop. No weird animations.
  const handleOrbToggleMusic = useCallback(() => {
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 250) {
      return; // prevent duplicate trigger from touch+click synthetic events
    }
    lastToggleTimeRef.current = now;

    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused || isPlayingMusic) {
      // Stop the music
      audio.pause();
      audio.currentTime = 0;
      setIsPlayingMusic(false);
    } else {
      // Play in loop
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingMusic(true);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn('Playback error:', err);
            }
          });
      }
    }
  }, [isPlayingMusic]);

  // Surge Pulse Trigger (activated via HUD button or Spacebar)
  const handleSurgePulse = useCallback(() => {
    soundFx.playSurge();
    setSystemState((prev) => ({
      ...prev,
      activeSurgeNode: 'CORE-SURGE',
      powerOutput: Math.min(150, prev.powerOutput + 20),
    }));

    setTimeout(() => {
      setSystemState((prev) => ({ ...prev, activeSurgeNode: null }));
    }, 800);
  }, []);

  // Pneumatic Purge Trigger
  const handlePurge = useCallback(() => {
    soundFx.playPurge();
    setSystemState((prev) => ({
      ...prev,
      isPurging: true,
      powerOutput: Math.max(20, prev.powerOutput - 40),
    }));

    setTimeout(() => {
      setSystemState((prev) => ({ ...prev, isPurging: false }));
    }, 1200);
  }, []);

  // Node Click Probing
  const handleNodeClick = useCallback((nodeId: string) => {
    soundFx.playClick();
    setSystemState((prev) => ({ ...prev, activeSurgeNode: nodeId }));

    setTimeout(() => {
      setSystemState((prev) => (prev.activeSurgeNode === nodeId ? { ...prev, activeSurgeNode: null } : prev));
    }, 600);
  }, []);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleSurgePulse();
      }
      if (e.key === 'm' || e.key === 'M') {
        handleToggleAudio();
      }
      if (e.key === 'p' || e.key === 'P') {
        handlePurge();
      }
      if (e.key === 'e' || e.key === 'E') {
        if (!(e.target instanceof HTMLInputElement)) {
          setIsEditingFoliage((prev) => !prev);
        }
      }
      if (e.key === 'w' || e.key === 'W') {
        if (!(e.target instanceof HTMLInputElement)) {
          setIsWetMode((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSurgePulse, handleToggleAudio, handlePurge]);

  return (
    <main
      id="cybercore-root-terminal"
      className="relative w-screen h-screen bg-[#000000] flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 100%), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 16:9 Aspect Ratio Constrained Cybernetic Panel Chassis */}
      <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-video bg-[#030406] shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden">
        {/* 1. Industrial Backplate Wall */}
        <img
          src={backgroundImageUrl}
          alt="Reactor Terminal Background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        {/* Shifted UI Assembly (-2.07% Y-offset to align with background circle center) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none [&>*]:pointer-events-auto"
          style={{ transform: 'translateY(-2.07%)' }}
        >
          {/* 2. Realistic Procedural Botanical Foliage Engine (Behind Conduits) */}
          <ProceduralBotanicalEngine
            theme={currentTheme}
            layer="back"
            foliageList={foliageList}
            isWetMode={isWetMode}
          />

          {/* 3. Complex Non-Linear Stepped Conduits, Skeuomorphic Modules & Interactive Hotspots */}
          <ProceduralHardwareLayer
            theme={currentTheme}
            powerOutput={systemState.powerOutput}
            activeSurgeNode={systemState.activeSurgeNode}
            onNodeClick={handleNodeClick}
          />

          {/* 4. Foreground Botanical Overgrowth Layer (Draping in Front of Conduits & Modules) */}
          <ProceduralBotanicalEngine
            theme={currentTheme}
            layer="front"
            foliageList={foliageList}
            isWetMode={isWetMode}
          />

          {/* 5. Live Floating Bioluminescent Spores */}
          <ProceduralParticleSystem
            theme={currentTheme}
            activeSurgeNode={systemState.activeSurgeNode}
            powerOutput={systemState.powerOutput}
          />

          {/* 6. 3D Spherical Terrarium Orb, Steady Rotating Reticles & Optical Aperture Core */}
          <ProceduralCoreOrb
            theme={currentTheme}
            powerOutput={systemState.powerOutput}
            rpm={systemState.rpm}
            resonanceActive={systemState.resonance}
            onCoreClick={handleOrbToggleMusic}
            isPlayingMusic={isPlayingMusic}
          />
        </div>

        {/* 2b. High-Performance Dark Meadow Grass Layer (Anchored to Chassis Bottom) */}
        <ProceduralBottomGrassLayer theme={currentTheme} />

        {/* 7. Optical Flash Screen on Purge */}
        {systemState.isPurging && (
          <div className="absolute inset-0 bg-white/40 pointer-events-none animate-ping z-40" />
        )}

        {/* 8. Interactive Live Visual Foliage Editor Overlay */}
        {isEditingFoliage && (
          <FoliageEditorOverlay
            theme={currentTheme}
            foliageList={foliageList}
            onUpdateFoliage={handleUpdateFoliage}
            onClose={() => setIsEditingFoliage(false)}
          />
        )}

        {/* 9. Sleek Retractable Glassmorphic HUD Control Console */}
        <SleekHudDeck
          theme={currentTheme}
          themes={themeList}
          currentThemeId={currentThemeId}
          onSelectTheme={handleSelectTheme}
          systemState={systemState}
          onUpdateState={updateSystemState}
          onSurgePulse={handleSurgePulse}
          onPurge={handlePurge}
          audioMuted={audioMuted}
          onToggleAudio={handleToggleAudio}
          audioEngineReady={true}
          isEditingFoliage={isEditingFoliage}
          onToggleEditFoliage={() => setIsEditingFoliage((prev) => !prev)}
          isWetMode={isWetMode}
          onToggleWetMode={() => setIsWetMode((prev) => !prev)}
        />
      </div>
    </main>
  );
}
