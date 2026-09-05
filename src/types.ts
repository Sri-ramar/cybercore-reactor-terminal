export type ThemeMode = 'overgrown-bio' | 'cyber-amber' | 'neon-cyan' | 'matrix-emerald' | 'crimson-overdrive' | 'violet-void';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  primary: string; // Hex color e.g. #88f022
  secondary: string; // #49b311
  accent: string; // #d8ff70
  bark: string; // #3d2c18
  glowRgba: string; // rgba(136, 240, 34, ...)
  borderRgba: string;
  bgTint: string;
}

export interface ReactorState {
  powerOutput: number; // 0 - 150 % (100% is nominal, >100 is overdrive)
  statorRpm: number; // 1200 - 9600 RPM
  fluxDensity: number; // 4.2 - 14.8 Tesla
  quantumCoherence: number; // 70 - 100%
  coreTempK: number; // 290K - 1800K
  isCryoCooling: boolean;
  isMagneticShieldActive: boolean;
  isResonanceLocked: boolean;
  isOverdrive: boolean;
  isPurging: boolean;
  activeSurgeNode: string | null;
  hudVisible: boolean;
  audioMuted: boolean;
  selectedTheme: ThemeMode;
  viewMode: 'full' | 'schematic' | 'optical';
}

export interface CircuitNode {
  id: string;
  label: string;
  sublabel: string;
  x: number; // percentage or coord
  y: number;
  type: 'gate' | 'sensor' | 'transformer' | 'capacitor' | 'emitter';
  status: 'nominal' | 'active' | 'warning' | 'surging';
  value: string;
}

export interface DiagnosticLog {
  id: string;
  timestamp: string;
  code: string;
  message: string;
  severity: 'info' | 'warn' | 'crit';
}

export interface SystemState {
  powerOutput: number;
  rpm: number;
  cryoCooling: boolean;
  magneticShield: boolean;
  resonance: boolean;
  activeSurgeNode: string | null;
  isPurging: boolean;
}
