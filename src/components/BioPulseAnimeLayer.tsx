import React, { useEffect, useRef, useMemo } from 'react';
import { animate, stagger } from 'animejs';
import { ThemeConfig } from '../types';

interface BioPulseAnimeLayerProps {
  theme: ThemeConfig;
  activeSurgeNode: string | null;
  powerOutput: number;
}

export const BioPulseAnimeLayer: React.FC<BioPulseAnimeLayerProps> = ({
  theme,
  activeSurgeNode,
  powerOutput,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Bioluminescent floating spore particles across the mossy rock
  const spores = useMemo(
    () =>
      [...Array(32)].map((_, i) => ({
        id: `spore-${i}`,
        startX: 120 + Math.random() * 1360,
        startY: 100 + Math.random() * 700,
        r: 1.2 + Math.random() * 2.4,
      })),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    let sporeAnim: any;
    let pulseAnim: any;

    try {
      // Anime.js Spore floating animation
      sporeAnim = animate('.floating-bio-spore', {
        translateY: [-15, -65],
        translateX: [0, (el, i) => (i % 2 === 0 ? 15 : -15)],
        opacity: [0.15, 0.95, 0.1],
        scale: [0.7, 1.4, 0.6],
        delay: stagger(120, { from: 'center' }),
        duration: 4200,
        loop: true,
        ease: 'inOutSine',
      });

      // Anime.js Circuit Traveling Pulses
      pulseAnim = animate('.anime-conduit-pulse', {
        strokeDashoffset: [600, 0],
        duration: 2800,
        delay: stagger(200),
        loop: true,
        ease: 'linear',
      });
    } catch {
      // safe
    }

    return () => {
      try {
        sporeAnim?.pause?.();
        pulseAnim?.pause?.();
      } catch {
        // cleanup safe
      }
    };
  }, [spores]);

  // Stepped Conduit Paths matching the photorealistic artwork
  const packetPaths = useMemo(
    () => [
      // 1. Top-Left Rails
      'M 800 240 L 800 135 L 775 135 L 775 185 L 715 185 L 715 225 L 645 225 L 645 275 L 585 275 L 515 275 L 515 195 L 475 195 L 475 155 L 395 155 L 395 105 L 345 105 L 345 75 L 265 75',
      // 2. Top-Right Rails to Photosynthetic Capsule
      'M 800 195 L 800 105 L 855 105 L 855 135 L 1035 135 L 1035 165 L 1185 165',
      // 3. Top-Right Diagonal Chevron
      'M 945 320 L 1005 260 L 1105 260 L 1145 225 L 1205 225 L 1245 190 L 1385 190',
      // 4. Mid-Left Bark Conduits
      'M 665 375 L 555 375 L 555 335 L 295 335 L 255 335 L 225 365 L 175 365 L 155 365 L 115 385 L 65 385',
      'M 665 435 L 545 435 L 505 475 L 445 475 L 405 435 L 265 435 L 225 435 L 185 475 L 125 475',
      // 5. Lower-Left Staircase Bus to Slate Motherboard
      'M 705 535 L 625 615 L 565 615 L 535 665 L 445 665 L 395 715 L 275 715 L 225 765 L 95 765 L 55 795 L 15 795',
      // 6. Mid-Right Bus to Matrix Display
      'M 935 445 L 1055 445 L 1085 475 L 1155 475 L 1195 450 L 1285 450',
      // 7. Lower-Right Descending Taproot Rail
      'M 925 505 L 985 560 L 1045 560 L 1085 600 L 1205 600 L 1245 515 L 1405 515',
      // 8. Bottom Ground Rail & Slider
      'M 800 625 L 800 675 L 755 705 L 685 705 L 655 740 L 735 740 L 755 770 L 845 770 L 865 740 L 985 740 L 1025 770 L 1485 770 L 1485 810',
    ],
    []
  );

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none select-none z-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* High Energy Photon Bloom */}
          <filter id="packet-glow-realistic" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b1" />
            <feGaussianBlur stdDeviation="6" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Traveling Bio-Luminescent Light Currents */}
        <g
          stroke={theme.accent}
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="32 180"
          filter="url(#packet-glow-realistic)"
          opacity={0.8 + (powerOutput / 100) * 0.2}
        >
          {packetPaths.map((d, i) => (
            <path key={`pulse-${i}`} className="anime-conduit-pulse" d={d} />
          ))}
        </g>

        {/* Razor-Sharp White Hotspot within Packets */}
        <g
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 202"
        >
          {packetPaths.map((d, i) => (
            <path key={`pulse-core-${i}`} className="anime-conduit-pulse" d={d} />
          ))}
        </g>

        {/* Floating Bioluminescent Spore Glow Particles */}
        <g filter="url(#packet-glow-realistic)">
          {spores.map((spore) => (
            <circle
              key={spore.id}
              className="floating-bio-spore"
              cx={spore.startX}
              cy={spore.startY}
              r={spore.r}
              fill={theme.primary}
            />
          ))}
        </g>

        {/* Dynamic Surge Wave when triggered */}
        {activeSurgeNode && (
          <circle
            className="animate-ping"
            cx="800"
            cy="450"
            r="160"
            fill="none"
            stroke={theme.accent}
            strokeWidth="3.5"
            filter="url(#packet-glow-realistic)"
          />
        )}
      </svg>
    </div>
  );
};
