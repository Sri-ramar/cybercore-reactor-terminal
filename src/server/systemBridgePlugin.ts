import type { Plugin, ViteDevServer } from 'vite';
import { exec, execSync } from 'child_process';
import fs from 'fs';
import os from 'os';

export interface SystemStats {
  online: boolean;
  timestamp: number;
  os: {
    distro: string;
    kernel: string;
    hostname: string;
    uptime: string;
  };
  cpu: {
    model: string;
    cores: number;
    threads: number;
    usage: number;
    clockGhz: number;
    tempC: number;
  };
  ram: {
    usedMb: number;
    totalMb: number;
    percent: number;
  };
  gpu: {
    name: string;
    tempC: number;
    utilization: number;
    memUsedMb: number;
    memTotalMb: number;
  };
  disk: {
    percent: number;
    tempC: number;
  };
  audio: {
    volume: number;
    sinkMuted: boolean;
    sourceMuted: boolean;
  };
  display: {
    brightnessPercent: number;
  };
  loadAvg: [number, number, number];
}

// Global cached values to minimize shell overhead
let prevCpuTimes = { idle: 0, total: 0 };
let cachedCpuModel = '';
let cachedCores = 0;
let cachedThreads = 0;

function initCpuMeta() {
  try {
    const cpuinfo = fs.readFileSync('/proc/cpuinfo', 'utf-8');
    const modelMatch = cpuinfo.match(/model name\s*:\s*(.+)/i);
    if (modelMatch) {
      cachedCpuModel = modelMatch[1].trim().replace(/\(R\)|\(TM\)/g, '');
    }
    cachedThreads = os.cpus().length;
    const coreMatches = cpuinfo.match(/^core id\s*:\s*\d+/gm);
    cachedCores = coreMatches ? new Set(coreMatches).size : Math.max(1, Math.floor(cachedThreads / 2));
  } catch {
    cachedCpuModel = 'AMD Ryzen Processor';
    cachedCores = 6;
    cachedThreads = 12;
  }
}

initCpuMeta();

function getCpuUsage(): number {
  try {
    const stat = fs.readFileSync('/proc/stat', 'utf-8');
    const firstLine = stat.split('\n')[0];
    const parts = firstLine.split(/\s+/).slice(1).map(Number);
    // [user, nice, system, idle, iowait, irq, softirq, steal]
    const idle = parts[3] + (parts[4] || 0);
    const total = parts.reduce((a, b) => a + b, 0);

    if (prevCpuTimes.total === 0) {
      prevCpuTimes = { idle, total };
      return 15.0;
    }

    const idleDelta = idle - prevCpuTimes.idle;
    const totalDelta = total - prevCpuTimes.total;
    prevCpuTimes = { idle, total };

    if (totalDelta <= 0) return 10.0;
    const usage = Math.max(0, Math.min(100, (1 - idleDelta / totalDelta) * 100));
    return parseFloat(usage.toFixed(1));
  } catch {
    return 18.5;
  }
}

function getCpuClock(): number {
  try {
    const freqStr = fs.readFileSync('/sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq', 'utf-8');
    const khz = parseInt(freqStr.trim(), 10);
    return parseFloat((khz / 1000000).toFixed(2));
  } catch {
    return 3.20;
  }
}

function getHardwareTemps(): { cpuTemp: number; nvmeTemp: number } {
  let cpuTemp = 55.0;
  let nvmeTemp = 42.0;

  try {
    const hwmonDirs = fs.readdirSync('/sys/class/hwmon');
    for (const dir of hwmonDirs) {
      const basePath = `/sys/class/hwmon/${dir}`;
      try {
        const name = fs.readFileSync(`${basePath}/name`, 'utf-8').trim();
        if (name === 'k10temp' || name === 'coretemp') {
          const raw = fs.readFileSync(`${basePath}/temp1_input`, 'utf-8').trim();
          cpuTemp = parseFloat((parseInt(raw, 10) / 1000).toFixed(1));
        } else if (name === 'nvme') {
          const raw = fs.readFileSync(`${basePath}/temp1_input`, 'utf-8').trim();
          nvmeTemp = parseFloat((parseInt(raw, 10) / 1000).toFixed(1));
        }
      } catch {
        // continue
      }
    }
  } catch {
    // fallback
  }
  return { cpuTemp, nvmeTemp };
}

function getRamStats(): { usedMb: number; totalMb: number; percent: number } {
  try {
    const meminfo = fs.readFileSync('/proc/meminfo', 'utf-8');
    const totalMatch = meminfo.match(/MemTotal:\s*(\d+)\s*kB/);
    const availMatch = meminfo.match(/MemAvailable:\s*(\d+)\s*kB/);
    if (totalMatch && availMatch) {
      const totalKb = parseInt(totalMatch[1], 10);
      const availKb = parseInt(availMatch[1], 10);
      const usedKb = totalKb - availKb;
      const totalMb = Math.round(totalKb / 1024);
      const usedMb = Math.round(usedKb / 1024);
      const percent = parseFloat(((usedKb / totalKb) * 100).toFixed(1));
      return { usedMb, totalMb, percent };
    }
  } catch {
    // fallback
  }
  return { usedMb: 8192, totalMb: 16384, percent: 50.0 };
}

function getDiskUsage(): number {
  try {
    const out = execSync('df -k / | tail -n 1', { encoding: 'utf-8', timeout: 800 });
    const parts = out.trim().split(/\s+/);
    if (parts.length >= 5) {
      const pctStr = parts[4].replace('%', '');
      return parseInt(pctStr, 10);
    }
  } catch {
    // fallback
  }
  return 70;
}

function getAudioStats(): { volume: number; sinkMuted: boolean; sourceMuted: boolean } {
  let volume = 80;
  let sinkMuted = false;
  let sourceMuted = false;

  try {
    const sinkOut = execSync('wpctl get-volume @DEFAULT_AUDIO_SINK@', { encoding: 'utf-8', timeout: 800 }).trim();
    const sinkMatch = sinkOut.match(/Volume:\s*([\d.]+)(\s*\[MUTED\])?/);
    if (sinkMatch) {
      volume = Math.round(parseFloat(sinkMatch[1]) * 100);
      sinkMuted = !!sinkMatch[2];
    }

    const srcOut = execSync('wpctl get-volume @DEFAULT_AUDIO_SOURCE@', { encoding: 'utf-8', timeout: 800 }).trim();
    sourceMuted = srcOut.includes('[MUTED]');
  } catch {
    // fallback
  }

  return { volume, sinkMuted, sourceMuted };
}

function getGpuStats(): { name: string; tempC: number; utilization: number; memUsedMb: number; memTotalMb: number } {
  try {
    const out = execSync('nvidia-smi --query-gpu=name,temperature.gpu,utilization.gpu,memory.used,memory.total --format=csv,noheader,nounits', {
      encoding: 'utf-8',
      timeout: 1000,
    }).trim();
    const parts = out.split(',').map((p) => p.trim());
    if (parts.length >= 5) {
      return {
        name: parts[0],
        tempC: parseInt(parts[1], 10) || 50,
        utilization: parseInt(parts[2], 10) || 0,
        memUsedMb: parseInt(parts[3], 10) || 0,
        memTotalMb: parseInt(parts[4], 10) || 4096,
      };
    }
  } catch {
    // fallback
  }

  return {
    name: 'NVIDIA RTX 3050 Laptop GPU',
    tempC: 52,
    utilization: 12,
    memUsedMb: 240,
    memTotalMb: 4096,
  };
}

function getBrightness(): number {
  try {
    const out = execSync('brightnessctl info', { encoding: 'utf-8', timeout: 800 });
    const match = out.match(/\((\d+)%\)/);
    if (match) {
      return parseInt(match[1], 10);
    }
  } catch {
    // fallback
  }
  return 60;
}

function formatUptime(): string {
  const upSec = os.uptime();
  const h = Math.floor(upSec / 3600);
  const m = Math.floor((upSec % 3600) / 60);
  return `${h}h ${m}m`;
}

export function systemBridgePlugin(): Plugin {
  return {
    name: 'cybercore-system-bridge',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/system/stats', (_req, res) => {
        try {
          const { cpuTemp, nvmeTemp } = getHardwareTemps();
          const ram = getRamStats();
          const cpuUsage = getCpuUsage();
          const cpuClock = getCpuClock();
          const audio = getAudioStats();
          const gpu = getGpuStats();
          const diskPct = getDiskUsage();
          const brightness = getBrightness();
          const rawLoad = os.loadavg();

          const stats: SystemStats = {
            online: true,
            timestamp: Date.now(),
            os: {
              distro: 'Fedora Linux 44 (KDE Plasma)',
              kernel: os.release(),
              hostname: os.hostname(),
              uptime: formatUptime(),
            },
            cpu: {
              model: cachedCpuModel,
              cores: cachedCores,
              threads: cachedThreads,
              usage: cpuUsage,
              clockGhz: cpuClock,
              tempC: cpuTemp,
            },
            ram,
            gpu,
            disk: {
              percent: diskPct,
              tempC: nvmeTemp,
            },
            audio,
            display: {
              brightnessPercent: brightness,
            },
            loadAvg: [
              parseFloat(rawLoad[0].toFixed(2)),
              parseFloat(rawLoad[1].toFixed(2)),
              parseFloat(rawLoad[2].toFixed(2)),
            ],
          };

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(stats));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(err) }));
        }
      });

      server.middlewares.use('/api/system/control', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const { action, value, delta } = data;

            switch (action) {
              case 'toggle_mute_sink':
                exec('wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle');
                break;

              case 'toggle_mute_source':
                exec('wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle');
                break;

              case 'set_volume':
                if (typeof value === 'number') {
                  const volFrac = Math.max(0, Math.min(1.5, value / 100)).toFixed(2);
                  exec(`wpctl set-volume @DEFAULT_AUDIO_SINK@ ${volFrac}`);
                } else if (typeof delta === 'number') {
                  const sign = delta > 0 ? '+' : '-';
                  exec(`wpctl set-volume @DEFAULT_AUDIO_SINK@ ${Math.abs(delta)}%${sign}`);
                }
                break;

              case 'set_brightness':
                if (typeof delta === 'number') {
                  const sign = delta > 0 ? '+' : '-';
                  exec(`brightnessctl set ${Math.abs(delta)}%${sign}`);
                } else if (typeof value === 'number') {
                  exec(`brightnessctl set ${Math.max(1, Math.min(100, value))}%`);
                }
                break;

              case 'lock_screen':
                exec('loginctl lock-session');
                break;

              case 'notify':
                if (data.title && data.message) {
                  exec(`notify-send "${data.title}" "${data.message}"`);
                }
                break;

              default:
                break;
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ success: true, action }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });
    },
  };
}
