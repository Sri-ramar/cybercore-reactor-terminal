import React, { useEffect, useRef, memo } from 'react';
import { ThemeConfig } from '../../types';

interface ProceduralRealisticWallProps {
  theme: ThemeConfig;
  powerOutput?: number;
  isWetMode?: boolean;
}

/**
 * Ultra-Fast Hardware-Accelerated Slate Wall & Relief Chassis
 * - Uses GPU-accelerated pattern tiles instead of 6-million loop CPU pixel crunching
 * - Cached in GPU VRAM with zero main-thread freezing
 */
export const ProceduralRealisticWall: React.FC<ProceduralRealisticWallProps> = memo(({ theme, isWetMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', {
      alpha: false,
      powerPreference: 'high-performance' as WebGLPowerPreference,
    } as CanvasRenderingContext2DSettings);
    if (!ctx) return;

    const width = 1600;
    const height = 900;
    canvas.width = width;
    canvas.height = height;

    // 1. Wet Dark Charcoal / Basalt Cliff Base Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
    baseGrad.addColorStop(0, '#0d1211');
    baseGrad.addColorStop(0.3, '#080c0b');
    baseGrad.addColorStop(0.7, '#050807');
    baseGrad.addColorStop(1, '#020403');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. High-Performance GPU Noise Tile (128x128 repeat tile instead of 1.44M pixel loop)
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;
    const nCtx = noiseCanvas.getContext('2d');
    if (nCtx) {
      const nImg = nCtx.createImageData(128, 128);
      const nData = nImg.data;
      for (let i = 0; i < nData.length; i += 4) {
        const val = (Math.random() - 0.5) * 22;
        nData[i] = 10 + val;
        nData[i + 1] = 16 + val * 1.2;
        nData[i + 2] = 12 + val;
        nData[i + 3] = 42; // Low opacity noise overlay
      }
      nCtx.putImageData(nImg, 0, 0);
      const pattern = ctx.createPattern(noiseCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    }

    ctx.save();

    // 3. Wet Obsidian Specular Moisture Glints (optimized GPU blits)
    ctx.fillStyle = isWetMode ? 'rgba(215, 245, 255, 0.55)' : 'rgba(210, 245, 220, 0.35)';
    const glintCount = isWetMode ? 140 : 80;
    for (let i = 0; i < glintCount; i++) {
      const gx = Math.random() * width;
      const gy = Math.random() * height;
      const gr = 0.8 + Math.random() * 1.6;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Damp Emerald Moss Velvet Undercoat Patches
    const mossBeds = [
      { x: 100, y: 80, rx: 190, ry: 95, color: 'rgba(32, 65, 22, 0.45)' },
      { x: 360, y: 100, rx: 150, ry: 70, color: 'rgba(24, 50, 16, 0.38)' },
      { x: 1450, y: 80, rx: 200, ry: 100, color: 'rgba(32, 65, 22, 0.45)' },
      { x: 1200, y: 110, rx: 140, ry: 65, color: 'rgba(24, 50, 16, 0.38)' },
      { x: 800, y: 450, rx: 340, ry: 340, color: 'rgba(22, 48, 14, 0.35)' },
      { x: 1450, y: 780, rx: 220, ry: 120, color: 'rgba(36, 72, 24, 0.5)' },
      { x: 150, y: 800, rx: 200, ry: 110, color: 'rgba(32, 64, 20, 0.45)' },
    ];

    mossBeds.forEach((bed) => {
      const grad = ctx.createRadialGradient(bed.x, bed.y, 10, bed.x, bed.y, bed.rx);
      grad.addColorStop(0, bed.color);
      grad.addColorStop(0.65, 'rgba(14, 30, 10, 0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(bed.x, bed.y, bed.rx, bed.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. CONTINUOUS FULL-WIDTH STEPPED RELIEF PANELS
    const drawContinuousPanel = (
      topY: number,
      bottomY: number,
      fillColor: string,
      highlightColor: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, topY);
      ctx.lineTo(440, topY);
      ctx.lineTo(520, topY + 30);
      ctx.lineTo(1080, topY + 30);
      ctx.lineTo(1160, topY);
      ctx.lineTo(1600, topY);
      ctx.lineTo(1600, bottomY);
      ctx.lineTo(1160, bottomY);
      ctx.lineTo(1080, bottomY - 30);
      ctx.lineTo(520, bottomY - 30);
      ctx.lineTo(440, bottomY);
      ctx.lineTo(0, bottomY);
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.strokeStyle = highlightColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    // Upper Tier Slabs
    drawContinuousPanel(0, 130, '#0d1110', 'rgba(85, 120, 95, 0.4)');
    // Mid Tier Slabs
    drawContinuousPanel(220, 480, '#0f1413', 'rgba(95, 130, 105, 0.4)');
    // Lower Tier Slabs
    drawContinuousPanel(580, 900, '#0b0f0e', 'rgba(80, 115, 90, 0.4)');

    // Horizontal Seams
    const horizontalSeams = [160, 340, 520, 700];
    horizontalSeams.forEach((y) => {
      ctx.strokeStyle = '#010302';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(100, 145, 115, 0.35)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, y + 1.6);
      ctx.lineTo(width, y + 1.6);
      ctx.stroke();
    });

    // 5b. WET MODE: Atmospheric Vertical Rain Trickles & Condensation Wash on Basalt Wall
    if (isWetMode) {
      // 1. Organic Vertical Rain Trickles running down stone masonry
      const rivuletXs = [
        35, 75, 115, 160, 210, 250, 290, 340, 390, 430, 480, 530, 570, 620, 660, 700,
        740, 860, 900, 950, 990, 1040, 1090, 1130, 1180, 1220, 1270, 1310, 1360, 1410,
        1460, 1510, 1550, 1585
      ];

      rivuletXs.forEach((rx, idx) => {
        const startY = (idx * 37) % 200;
        const totalLen = 220 + ((idx * 53) % 420);
        let curX = rx;
        let curY = startY;

        ctx.beginPath();
        ctx.moveTo(curX, curY);
        while (curY < startY + totalLen && curY < height) {
          const stepY = 24 + ((idx + curY) % 28);
          curX += ((idx % 3) - 1) * 0.9;
          curY += stepY;
          ctx.lineTo(curX, curY);
        }

        // Dark damp shadow border of water rivulet
        ctx.strokeStyle = 'rgba(0, 8, 3, 0.45)';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Refractive glass core of running trickle
        ctx.strokeStyle = 'rgba(215, 245, 255, 0.28)';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Terminal droplet bead at foot of trickle
        if (curY < height - 8) {
          ctx.fillStyle = 'rgba(220, 250, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(curX, curY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 2. Fine falling rain streaks across the scene
      ctx.strokeStyle = 'rgba(215, 245, 255, 0.15)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 140; i++) {
        const sx = (i * 29 + 17) % width;
        const sy = (i * 43 + 31) % height;
        const sLen = 28 + (i % 42);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 3.0, sy + sLen);
        ctx.stroke();
      }

      // 3. Water pooling droplets along horizontal masonry ledge seams
      horizontalSeams.forEach((sy, sIdx) => {
        for (let bx = 24; bx < width; bx += 46 + ((sIdx * 13) % 26)) {
          // Shadow
          ctx.fillStyle = 'rgba(0, 6, 2, 0.55)';
          ctx.beginPath();
          ctx.ellipse(bx, sy + 2.2, 2.0, 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
          // Glassy bead
          ctx.fillStyle = 'rgba(215, 245, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(bx - 0.3, sy + 1.6, 1.3, 0, Math.PI * 2);
          ctx.fill();
          // Highlight
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(bx - 0.7, sy + 1.1, 0.8, 0.8);
        }
      });
    }

    // 6. Recessed Central Circular Well for Orb Bed
    ctx.beginPath();
    ctx.arc(800, 450, 252, 0, Math.PI * 2);
    ctx.fillStyle = '#020403';
    ctx.fill();

    ctx.strokeStyle = '#0e1814';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(100, 145, 120, 0.4)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(800, 450, 255, 0, Math.PI * 2);
    ctx.stroke();

    // 7. Warm Ambient Bioluminescent Core Lighting Bloom
    const centerBloom = ctx.createRadialGradient(800, 450, 60, 800, 450, 560);
    centerBloom.addColorStop(0, `${theme.primary}22`);
    centerBloom.addColorStop(0.35, `${theme.secondary}0d`);
    centerBloom.addColorStop(0.75, 'rgba(0,0,0,0)');
    ctx.fillStyle = centerBloom;
    ctx.fillRect(0, 0, width, height);

    // 8. Perimeter Dark Vignette
    const vignette = ctx.createRadialGradient(800, 450, 360, 800, 450, 920);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(0.65, 'rgba(0,0,0,0.38)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.95)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }, [theme, isWetMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      style={{ imageRendering: 'auto' }}
    />
  );
});
