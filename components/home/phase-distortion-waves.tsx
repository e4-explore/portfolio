'use client';

import React, { useEffect, useRef } from "react";

// Visualization: Phase-distorted waves flowing in two axes.
// Adapted to be used as a responsive section background.

function readCssVar(name: string): string | null {
  if (typeof window === "undefined") return null;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value?.trim() ? value.trim() : null;
}

export function PhaseDistortionWavesBackground({
  className,
  padding = 80,
  gridSpacing = 36,
}: {
  className?: string;
  padding?: number;
  gridSpacing?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // Draw in CSS pixels; scale backing buffer for crispness.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    const drawWave = (
      yCenter: number,
      amplitude: number,
      frequency: number,
      phaseOffset: number,
      thickness: number
    ) => {
      ctx.beginPath();

      for (let x = 0; x < width; x += 2) {
        // Phase distortion based on position and time (slowed down)
        const distortion =
          Math.sin(x * 0.03 + tRef.current * 0.05) * 1.2 +
          Math.cos(x * 0.015 - tRef.current * 0.03) * 1.6;

        const y =
          yCenter + amplitude * Math.sin(x * frequency + tRef.current + phaseOffset + distortion);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = thickness;
      ctx.stroke();
    };

    const render = () => {
      const bg = readCssVar("--background-alt") ?? "#0f1216";
      const strokeA = readCssVar("--pattern-line") ?? "rgba(245, 247, 250, 0.12)";
      const strokeB = readCssVar("--pattern-dot") ?? "rgba(245, 247, 250, 0.18)";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Subtle grid scaffold (to read more like a grid than a loose pattern)
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = strokeA;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.7;

      const safeSpacing = Math.max(18, gridSpacing);
      // Animate the grid very subtly so both axes feel alive.
      const driftX = (tRef.current * 12) % safeSpacing;

      for (let x = -safeSpacing; x <= width + safeSpacing; x += safeSpacing) {
        ctx.beginPath();
        ctx.moveTo(x + driftX + 0.5, 0);
        ctx.lineTo(x + driftX + 0.5, height);
        ctx.stroke();
      }
      for (let y = -safeSpacing; y <= height + safeSpacing; y += safeSpacing) {
        ctx.beginPath();
        // Keep horizontal grid lines static
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = strokeA;
      ctx.globalAlpha = 1;

      const innerPad = Math.min(padding, Math.floor(Math.min(width, height) * 0.12));
      // Keep the horizontal overlay sparse (avoid "too many lines").
      const waveCount = 14;
      for (let i = 0; i < waveCount; i++) {
        const yCenter = innerPad + (height - innerPad * 2) * (i / (waveCount - 1));
        const amplitude = 5 + Math.sin(tRef.current * 0.02 + i * 0.35) * 2.5;
        const frequency = 0.045 + 0.01 * Math.sin(i * 0.2);
        const phaseOffset = i * 0.3;
        const thickness = 0.9 + Math.sin(tRef.current + i) * 0.25;
        drawWave(yCenter, amplitude, frequency, phaseOffset, thickness);
      }

      // Second pass: rotate the same system 90° and multiply
      ctx.globalCompositeOperation = "multiply";
      ctx.strokeStyle = strokeB;

      const verticalCount = 8;
      for (let i = 0; i < verticalCount; i++) {
        const xCenter = innerPad + (width - innerPad * 2) * (i / (verticalCount - 1));
        const amplitude = 6 + Math.cos(tRef.current * 0.03 + i * 0.33) * 3.5;
        const frequency = 0.045 + 0.01 * Math.cos(i * 0.3);
        const phaseOffset = i * 0.4;
        const thickness = 0.9 + Math.cos(tRef.current + i) * 0.25;

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(Math.PI / 2);
        ctx.translate(-width / 2, -height / 2);

        drawWave(xCenter, amplitude, frequency, phaseOffset, thickness);

        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      tRef.current += 0.004;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [padding, gridSpacing]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}

