'use client';

import { useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 24;
const GLOW_RADIUS = 180;
const LINE_WIDTH = 1;

export const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const { x: mx, y: my } = mouseRef.current;

    ctx.clearRect(0, 0, width, height);

    // Draw vertical lines
    for (let x = 0; x <= width; x += GRID_SIZE) {
      const dist = Math.abs(x - mx);
      if (dist > GLOW_RADIUS) continue;

      const alpha = Math.pow(1 - dist / GLOW_RADIUS, 2) * 0.6;
      ctx.strokeStyle = `rgba(16, 244, 128, ${alpha})`;
      ctx.lineWidth = LINE_WIDTH;
      ctx.beginPath();

      // Only draw the segment near the mouse for performance
      const startY = Math.max(0, my - GLOW_RADIUS);
      const endY = Math.min(height, my + GLOW_RADIUS);
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += GRID_SIZE) {
      const dist = Math.abs(y - my);
      if (dist > GLOW_RADIUS) continue;

      const alpha = Math.pow(1 - dist / GLOW_RADIUS, 2) * 0.6;
      ctx.strokeStyle = `rgba(16, 244, 128, ${alpha})`;
      ctx.lineWidth = LINE_WIDTH;
      ctx.beginPath();

      const startX = Math.max(0, mx - GLOW_RADIUS);
      const endX = Math.min(width, mx + GLOW_RADIUS);
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    // Draw intersection dots near cursor for extra glow
    for (let x = 0; x <= width; x += GRID_SIZE) {
      for (let y = 0; y <= height; y += GRID_SIZE) {
        const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
        if (dist > GLOW_RADIUS * 0.7) continue;

        const alpha = Math.pow(1 - dist / (GLOW_RADIUS * 0.7), 2) * 0.8;
        ctx.fillStyle = `rgba(16, 244, 128, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-[1]"
      style={{ pointerEvents: 'auto' }}
    />
  );
};
