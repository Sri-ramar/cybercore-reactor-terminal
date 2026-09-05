import { useState, useEffect, useCallback } from 'react';
import type { SystemStats } from '../server/systemBridgePlugin';

export type { SystemStats };

const DEFAULT_STATS: SystemStats = {
  online: false,
  timestamp: Date.now(),
  os: {
    distro: 'Fedora Linux 44 (KDE Plasma)',
    kernel: '7.1.13-200.fc44.x86_64',
    hostname: 'fedora',
    uptime: '4h 12m',
  },
  cpu: {
    model: 'AMD Ryzen 5 5600H',
    cores: 6,
    threads: 12,
    usage: 18.5,
    clockGhz: 3.30,
    tempC: 56.4,
  },
  ram: {
    usedMb: 9216,
    totalMb: 15305,
    percent: 60.2,
  },
  gpu: {
    name: 'NVIDIA RTX 3050 Laptop GPU',
    tempC: 52,
    utilization: 14,
    memUsedMb: 120,
    memTotalMb: 4096,
  },
  disk: {
    percent: 77,
    tempC: 46.8,
  },
  audio: {
    volume: 85,
    sinkMuted: false,
    sourceMuted: false,
  },
  display: {
    brightnessPercent: 60,
  },
  loadAvg: [3.45, 3.82, 3.10],
};

export async function fetchSystemStats(): Promise<SystemStats> {
  try {
    const res = await fetch('/api/system/stats', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // offline or static preview
  }
  return DEFAULT_STATS;
}

export async function sendSystemControl(action: string, payload: Record<string, unknown> = {}) {
  try {
    await fetch('/api/system/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    });
  } catch (err) {
    console.warn('System control bridge error:', err);
  }
}

export function useSystemStats(pollIntervalMs = 1500) {
  const [stats, setStats] = useState<SystemStats>(DEFAULT_STATS);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function poll() {
      try {
        const data = await fetchSystemStats();
        if (isMounted) {
          setStats(data);
          setIsLiveConnected(data.online);
        }
      } catch {
        if (isMounted) setIsLiveConnected(false);
      }
    }

    poll();
    const interval = setInterval(poll, pollIntervalMs);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pollIntervalMs]);

  const controlVolume = useCallback(async (delta: number) => {
    // Optimistic update
    setStats((prev) => ({
      ...prev,
      audio: {
        ...prev.audio,
        volume: Math.max(0, Math.min(150, prev.audio.volume + delta)),
      },
    }));
    await sendSystemControl('set_volume', { delta });
  }, []);

  const toggleSinkMute = useCallback(async () => {
    setStats((prev) => ({
      ...prev,
      audio: {
        ...prev.audio,
        sinkMuted: !prev.audio.sinkMuted,
      },
    }));
    await sendSystemControl('toggle_mute_sink');
  }, []);

  const toggleSourceMute = useCallback(async () => {
    setStats((prev) => ({
      ...prev,
      audio: {
        ...prev.audio,
        sourceMuted: !prev.audio.sourceMuted,
      },
    }));
    await sendSystemControl('toggle_mute_source');
  }, []);

  const controlBrightness = useCallback(async (delta: number) => {
    setStats((prev) => ({
      ...prev,
      display: {
        ...prev.display,
        brightnessPercent: Math.max(1, Math.min(100, prev.display.brightnessPercent + delta)),
      },
    }));
    await sendSystemControl('set_brightness', { delta });
  }, []);

  const lockScreen = useCallback(async () => {
    await sendSystemControl('lock_screen');
  }, []);

  return {
    stats,
    isLiveConnected,
    controlVolume,
    toggleSinkMute,
    toggleSourceMute,
    controlBrightness,
    lockScreen,
  };
}
