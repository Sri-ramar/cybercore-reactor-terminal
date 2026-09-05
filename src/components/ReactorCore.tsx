import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { ThemeConfig } from '../types';
import { soundFx } from '../utils/soundEngine';

interface ReactorCoreProps {
  theme: ThemeConfig;
  powerOutput: number;
  statorRpm: number;
  isOverdrive: boolean;
  isPurging: boolean;
  mousePos: { x: number; y: number }; // normalized -1 to 1
  onSurgeTrigger: () => void;
}

export const ReactorCore: React.FC<ReactorCoreProps> = ({
  theme,
  powerOutput,
  statorRpm,
  isOverdrive,
  isPurging,
  mousePos,
  onSurgeTrigger,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const coreAnim = useAnimation();

  // Rotation speeds scaled by stator RPM
  const rotationDurationOuter = Math.max(8, 40 - (statorRpm / 9600) * 32);
  const rotationDurationInner = Math.max(4, 25 - (statorRpm / 9600) * 20);

  const handleCoreClick = () => {
    setPulseActive(true);
    soundFx.playSurge();
    onSurgeTrigger();
    setTimeout(() => setPulseActive(false), 600);
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-none group"
      style={{ width: 'min(38vw, 360px)', height: 'min(38vw, 360px)' }}
      onClick={handleCoreClick}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playServo();
      }}
      onMouseLeave={() => setIsHovered(false)}
      title="Quantum Optical Core - Click to Trigger Pulse Discharge"
    >
      {/* Dynamic Ambient Core Glow / Bloom Aura */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          scale: pulseActive ? [1, 1.35, 1] : isHovered ? 1.08 : 1,
          opacity: isPurging ? 0.9 : 0.65 + (powerOutput / 100) * 0.35,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary} 40%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(35px)',
        }}
      />

      {/* Layer 1: Outermost Heavy Skeuomorphic Titanium Bezel Ring with Radial Screws */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: rotationDurationOuter, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'radial-gradient(circle at 45% 40%, #3a414f 0%, #1a1e26 50%, #0d0f14 100%)',
          boxShadow: `
            inset 2px 2px 4px rgba(255,255,255,0.25),
            inset -3px -3px 6px rgba(0,0,0,0.9),
            0 0 25px rgba(0,0,0,0.9),
            0 0 1px 2px #262c36
          `,
          border: '3px solid #2e3542',
        }}
      >
        {/* Radial Chamfer Notches & Quadrant Screws */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={`outer-screw-${deg}`}
            className="absolute w-2.5 h-2.5 rounded-full metal-bolt flex items-center justify-center"
            style={{
              transform: `rotate(${deg}deg) translate(0, -${165}px)`,
            }}
          >
            <div className="w-1.5 h-0.5 bg-[#101318]" />
          </div>
        ))}

        {/* Outer Radian Hashmarks */}
        {[...Array(36)].map((_, i) => (
          <div
            key={`outer-hash-${i}`}
            className="absolute w-0.5"
            style={{
              height: i % 3 === 0 ? '8px' : '4px',
              backgroundColor: i % 3 === 0 ? theme.primary : 'rgba(255,255,255,0.2)',
              transform: `rotate(${i * 10}deg) translate(0, -${168}px)`,
              boxShadow: i % 3 === 0 ? `0 0 4px ${theme.primary}` : 'none',
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Secondary Chamfered Bronze / Dark Chrome Gear Ring */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: rotationDurationInner, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '84%',
          height: '84%',
          background: 'linear-gradient(135deg, #2b303a 0%, #15181f 50%, #2f3542 100%)',
          boxShadow: `
            inset 2px 2px 3px rgba(255, 255, 255, 0.2),
            inset -2px -2px 5px rgba(0, 0, 0, 0.9),
            0 0 15px rgba(0,0,0,0.8)
          `,
          border: '2px solid #3c4454',
        }}
      >
        {/* Alignment Segment Blocks */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={`segment-${deg}`}
            className="absolute w-4 h-2"
            style={{
              backgroundColor: '#12151b',
              border: `1px solid ${theme.borderRgba}`,
              transform: `rotate(${deg}deg) translate(0, -${132}px)`,
              boxShadow: `inset 0 0 3px ${theme.primary}`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3: Glowing Amber/Gold Iris Luminous Ring (The Distinct Glowing Donut) */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center overflow-hidden"
        animate={{
          scale: isOverdrive ? [1, 1.05, 0.98, 1.03] : [1, 1.02, 1],
        }}
        transition={{ duration: isOverdrive ? 0.3 : 2, repeat: Infinity }}
        style={{
          width: '68%',
          height: '68%',
          background: `radial-gradient(circle, #ffe680 0%, ${theme.primary} 45%, ${theme.secondary} 75%, #3d2300 100%)`,
          boxShadow: `
            0 0 25px ${theme.primary},
            0 0 50px ${theme.glowRgba},
            inset 0 0 20px #ffffff,
            inset 0 0 40px ${theme.secondary}
          `,
        }}
      >
        {/* Layer 4: Tachometer / Stator Teeth (Radiating aperture lines matching photo) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(48)].map((_, i) => (
            <div
              key={`stator-${i}`}
              className="absolute w-1"
              style={{
                height: i % 4 === 0 ? '16px' : '10px',
                backgroundColor: i % 4 === 0 ? '#ffffff' : '#4d2a00',
                transform: `rotate(${i * 7.5}deg) translate(0, -${92}px)`,
                boxShadow: i % 4 === 0 ? '0 0 6px #ffffff' : 'none',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 5: Concentric Inner Gold Halo & Tachometer Scale */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: '50%',
          height: '50%',
          background: `radial-gradient(circle, #181105 0%, #2f2005 60%, ${theme.primary} 100%)`,
          boxShadow: `inset 0 0 15px #000000, 0 0 12px ${theme.primary}`,
          border: `2px solid ${theme.accent}`,
        }}
      >
        {/* Inner Stator Tick Rings */}
        {[...Array(32)].map((_, i) => (
          <div
            key={`inner-tick-${i}`}
            className="absolute w-0.5 h-3"
            style={{
              backgroundColor: theme.accent,
              transform: `rotate(${i * 11.25}deg) translate(0, -${62}px)`,
              boxShadow: `0 0 3px ${theme.accent}`,
            }}
          />
        ))}
      </div>

      {/* Layer 6: Deep Event Horizon Singular Black Pupil (The deep central void) */}
      <div
        className="absolute rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: '28%',
          height: '28%',
          background: 'radial-gradient(circle, #020304 0%, #06070a 70%, #201705 100%)',
          boxShadow: `
            inset 0 0 18px #000000,
            inset 0 0 6px #000000,
            0 0 15px rgba(0,0,0,0.9)
          `,
          border: '1.5px solid rgba(255, 183, 0, 0.4)',
        }}
      >
        {/* Tiny pulsing quantum point */}
        <motion.div
          className="w-2.5 h-2.5 rounded-full"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            backgroundColor: theme.accent,
            boxShadow: `0 0 10px ${theme.primary}, 0 0 20px ${theme.secondary}`,
          }}
        />
      </div>

      {/* Layer 7: Realistic Sapphire Glass Convex Lens & Specular Glare (The bright crescent reflections) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none glass-sapphire-lens"
        style={{
          transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Upper-Right Brilliant Curved Specular Glare (matching the photo) */}
        <div
          className="absolute rounded-full"
          style={{
            top: '12%',
            right: '18%',
            width: '45%',
            height: '24%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 240, 200, 0.4) 40%, rgba(255, 255, 255, 0) 100%)',
            transform: 'rotate(-25deg)',
            filter: 'blur(3px)',
            borderRadius: '50% 50% 40% 40%',
          }}
        />

        {/* Lower-Left Secondary Specular Arc */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: '16%',
            left: '20%',
            width: '35%',
            height: '18%',
            background: 'linear-gradient(315deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 200, 80, 0.25) 50%, rgba(255, 255, 255, 0) 100%)',
            transform: 'rotate(-20deg)',
            filter: 'blur(4px)',
          }}
        />

        {/* Convex Spherical Lens Edge Glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.35)',
            boxShadow: `
              inset 0 0 15px rgba(255, 255, 255, 0.2),
              inset 3px 3px 8px rgba(255, 255, 255, 0.4)
            `,
          }}
        />
      </div>

      {/* Surge Wave Shockwave Effect on Click */}
      {pulseActive && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          initial={{ width: '40%', height: '40%', opacity: 1 }}
          animate={{ width: '180%', height: '180%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            border: `3px solid ${theme.accent}`,
            boxShadow: `0 0 25px ${theme.primary}, inset 0 0 15px ${theme.accent}`,
          }}
        />
      )}
    </div>
  );
};
