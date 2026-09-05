import React, { useEffect, useRef } from 'react';
import { ThemeConfig } from '../types';

interface SlateTextureCanvasProps {
  theme: ThemeConfig;
  className?: string;
}

export const SlateTextureCanvas: React.FC<SlateTextureCanvasProps> = ({ theme, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = 1600;
    const height = 900;
    canvas.width = width;
    canvas.height = height;

    // Atmospheric micro-motes floating in the ambient light
    const motes = [...Array(45)].map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.1),
      alpha: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic core lighting pulse on the dust particles
      motes.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.phase += 0.02;

        if (m.y < 0) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        const currentAlpha = m.alpha * (0.6 + 0.4 * Math.sin(m.phase));

        ctx.fillStyle = theme.primary;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={{ imageRendering: 'auto' }}
    />
  );
};
