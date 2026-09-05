import { animate, stagger } from 'animejs';

/**
 * Anime.js Helper Orchestrator for Organic Bio-Cybernetic Textures & Pulses
 */

export const initCircuitPulseAnimation = (selector: string = '.bio-circuit-pulse') => {
  return animate(selector, {
    strokeDashoffset: [400, 0],
    ease: 'inOutSine',
    duration: 3500,
    delay: stagger(250),
    direction: 'alternate',
    loop: true,
  });
};

export const triggerNodeSurgeWave = (targetSelector: string) => {
  try {
    animate(targetSelector, {
      scale: [1, 1.45, 1],
      opacity: [0.7, 1, 0.7],
      ease: 'outElastic(1, .5)',
      duration: 900,
    });
  } catch {
    // Graceful fallback
  }
};

export const initFoliageBreeze = (selector: string = '.ambient-leaf-sway') => {
  return animate(selector, {
    rotate: [-2.5, 2.5],
    ease: 'inOutQuad',
    duration: 4000,
    delay: stagger(150),
    direction: 'alternate',
    loop: true,
  });
};

export const initSporeDotMatrix = (selector: string = '.bio-led-dot') => {
  try {
    return animate(selector, {
      opacity: [0.35, 1],
      scale: [0.85, 1.25],
      ease: 'inOutSine',
      duration: 1800,
      delay: stagger(120, { from: 'center' }),
      direction: 'alternate',
      loop: true,
    });
  } catch {
    return null;
  }
};
