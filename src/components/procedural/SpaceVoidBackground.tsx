import React, { memo } from 'react';
import { ThemeConfig } from '../../types';
import photorealisticWallUrl from '../../../assets/PhotorealisticTerminalWall.png';

interface SpaceVoidBackgroundProps {
  theme: ThemeConfig;
}

/**
 * Photorealistic Deep Space CyberCore Terminal Wall
 * Composited 3D hardware (conduits, satellite, AMD CPU, audio console, RAM/heatsink, telemetry, core)
 * seamlessly fused onto brushed titanium bulkhead.
 */
export const SpaceVoidBackground: React.FC<SpaceVoidBackgroundProps> = memo(({ theme: _theme }) => {
  return (
    <div className="absolute inset-0 bg-[#000000] overflow-hidden pointer-events-none select-none">
      <img
        src={photorealisticWallUrl}
        alt="Photorealistic CyberCore Terminal Wall"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />
    </div>
  );
});
