import React from 'react';
import { ThemeConfig } from '../types';

interface IndustrialBackplateProps {
  theme: ThemeConfig;
}

export const IndustrialBackplate: React.FC<IndustrialBackplateProps> = ({ theme }) => {
  // Theme-specific color grading filter applied to the photorealistic backdrop
  const getThemeFilter = () => {
    switch (theme.id) {
      case 'cyber-amber':
        return 'hue-rotate(290deg) saturate(1.25) contrast(1.05)';
      case 'neon-cyan':
        return 'hue-rotate(130deg) saturate(1.2) contrast(1.05)';
      case 'matrix-emerald':
        return 'hue-rotate(15deg) saturate(1.35) contrast(1.08)';
      case 'crimson-overdrive':
        return 'hue-rotate(240deg) saturate(1.4) contrast(1.1)';
      case 'violet-void':
        return 'hue-rotate(185deg) saturate(1.25) contrast(1.05)';
      case 'overgrown-bio':
      default:
        return 'none';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* 1. Master High-Resolution Photorealistic Skeuomorphic Bio-Reactor Backdrop */}
      <img
        src="/cybercore-backdrop.png"
        alt="Cybercore Bio-Reactor Terminal Wall"
        className="w-full h-full object-cover select-none pointer-events-none transition-[filter] duration-700"
        style={{
          filter: getThemeFilter(),
        }}
      />

      {/* 2. Dynamic Bioluminescent Core Ambient Bloom Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primary}22 0%, ${theme.secondary}0d 38%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* 3. Deep Cinematic Perimeter Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 58%, rgba(0,0,0,0.65) 100%)',
        }}
      />
    </div>
  );
};
