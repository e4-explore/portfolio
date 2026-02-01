'use client';

import React, { useEffect, useMemo, useRef } from "react";

type Source = {
  x: number;
  y: number;
  wavelength: number;
  phase: number;
  amplitude: number;
};

function readCssVar(name: string): string | null {
  if (typeof window === "undefined") return null;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value?.trim() ? value.trim() : null;
}

// Waves emerge naturally from an unmoving center, finding peace in their flow.
export function WaveInterferenceV5Background({
  className,
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  // Keep these stable across renders (no reallocation churn)
  const constants = useMemo(() => {
    const TWO_PI = Math.PI * 2;
    return { TWO_PI };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // #region agent log (wave mounted)
    fetch("http://127.0.0.1:7248/ingest/0a0b2c69-3acb-4c12-b656-5ee9a2a79423", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "C",
        location: "components/home/wave-interference-v5.tsx:WaveInterferenceV5Background.useEffect",
        message: "Wave background mounted",
        data: {
          htmlHasDark: document.documentElement.classList.contains("dark"),
          htmlClass: document.documentElement.className,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log (wave mounted)

    let width = 0;
    let height = 0;
    let dpr = 1;

    let rows = 0;
    let cols = 0;
    let resolution = 3;
    let field: Float32Array | null = null;
    let sources: Source[] = [];

    const rebuild = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const minDim = Math.min(width, height);
      // Match the original look: ~3px on a 550 canvas
      resolution = Math.max(2, Math.round(minDim / 180));
      rows = Math.max(2, Math.floor(height / resolution));
      cols = Math.max(2, Math.floor(width / resolution));
      field = new Float32Array(rows * cols);

      // Build sources (scaled from the original 550×550 version)
      sources = [];
      const numRings = 2;
      const sourcesPerRing = 6;

      const baseWavelength = Math.max(14, minDim / 22); // ~25 at 550
      const center: Source = {
        x: width / 2,
        y: height / 2,
        wavelength: baseWavelength,
        phase: 0,
        amplitude: 1.5,
      };
      sources.push(center);

      for (let ring = 1; ring <= numRings; ring++) {
        const radius = ring * (minDim * 0.22); // ~120 at 550
        const numSources = sourcesPerRing;

        for (let i = 0; i < numSources; i++) {
          const angle = (i / numSources) * Math.PI * 2;
          sources.push({
            x: width / 2 + Math.cos(angle) * radius,
            y: height / 2 + Math.sin(angle) * radius,
            wavelength: baseWavelength * (0.8 + ring * 0.2),
            phase: (i / numSources) * Math.PI,
            amplitude: 1.0 - ring * 0.2,
          });
        }
      }
    };

    rebuild();
    const observer = new ResizeObserver(rebuild);
    observer.observe(parent);

    const animate = () => {
      frameRef.current += 1;

      // Render every other frame (like the provided code)
      const skipFrames = 1;
      if (frameRef.current % (skipFrames + 1) !== 0) {
        timeRef.current += 0.0015;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Render on transparent canvas (lets the section background show through)
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const stroke = readCssVar("--foreground") ?? (isDark ? "#f5f7fa" : "#1a1a1a");

      const minDim = Math.min(width, height);
      const falloffScale = Math.max(180, minDim * 0.55); // ~300 at 550
      const INV_FALLOFF = 1 / falloffScale;
      const maxDist = minDim * 0.73; // ~400 at 550

      if (!field) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Sample wave field on a coarse grid
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * resolution;
          const y = i * resolution;
          let amp = 0;

          for (let s = 0; s < sources.length; s++) {
            const source = sources[s];
            const dx = x - source.x;
            const dy = y - source.y;
            const dist2 = dx * dx + dy * dy;
            const distance = Math.sqrt(dist2);

            if (distance > maxDist) continue;

            const falloff = Math.exp(-distance * INV_FALLOFF);
            amp +=
              source.amplitude *
              falloff *
              Math.sin((distance / source.wavelength - timeRef.current) * constants.TWO_PI + source.phase);
          }

          field[i * cols + j] = amp;
        }
      }

      // Contours
      ctx.strokeStyle = stroke;
      ctx.globalAlpha = isDark ? 0.18 : 0.14;

      const contourLevels = [-0.8, -0.4, 0, 0.4, 0.8] as const;
      const lerp = (a: number, b: number, t: number) => a + t * (b - a);
      const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);

      for (let c = 0; c < contourLevels.length; c++) {
        const level = contourLevels[c];
        ctx.lineWidth = c % 2 === 0 ? 0.75 : 0.5;
        ctx.beginPath();

        for (let i = 0; i < rows - 1; i++) {
          for (let j = 0; j < cols - 1; j++) {
            const x = j * resolution;
            const y = i * resolution;

            const v00 = field[i * cols + j];
            const v10 = field[i * cols + (j + 1)];
            const v11 = field[(i + 1) * cols + (j + 1)];
            const v01 = field[(i + 1) * cols + j];

            const allAbove = v00 > level && v10 > level && v11 > level && v01 > level;
            const allBelow = v00 <= level && v10 <= level && v11 <= level && v01 <= level;
            if (allAbove || allBelow) continue;

            const case4 =
              (v00 > level ? 8 : 0) +
              (v10 > level ? 4 : 0) +
              (v11 > level ? 2 : 0) +
              (v01 > level ? 1 : 0);

            switch (case4) {
              case 1:
              case 14: {
                const t1 = safeDiv(level - v00, v01 - v00);
                const t2 = safeDiv(level - v01, v11 - v01);
                ctx.moveTo(x, lerp(y, y + resolution, t1));
                ctx.lineTo(lerp(x, x + resolution, t2), y + resolution);
                break;
              }
              case 2:
              case 13: {
                const t1 = safeDiv(level - v01, v11 - v01);
                const t2 = safeDiv(level - v11, v10 - v11);
                ctx.moveTo(lerp(x, x + resolution, t1), y + resolution);
                ctx.lineTo(x + resolution, lerp(y + resolution, y, t2));
                break;
              }
              case 3:
              case 12: {
                const t1 = safeDiv(level - v00, v01 - v00);
                const t2 = safeDiv(level - v10, v11 - v10);
                ctx.moveTo(x, lerp(y, y + resolution, t1));
                ctx.lineTo(x + resolution, lerp(y, y + resolution, t2));
                break;
              }
              case 4:
              case 11: {
                const t1 = safeDiv(level - v10, v11 - v10);
                const t2 = safeDiv(level - v10, v00 - v10);
                ctx.moveTo(x + resolution, lerp(y, y + resolution, t1));
                ctx.lineTo(lerp(x + resolution, x, t2), y);
                break;
              }
              case 5:
              case 10: {
                const t1 = safeDiv(level - v00, v01 - v00);
                const t2 = safeDiv(level - v00, v10 - v00);
                ctx.moveTo(x, lerp(y, y + resolution, t1));
                ctx.lineTo(lerp(x, x + resolution, t2), y);

                const t3 = safeDiv(level - v11, v10 - v11);
                const t4 = safeDiv(level - v11, v01 - v11);
                ctx.moveTo(x + resolution, lerp(y + resolution, y, t3));
                ctx.lineTo(lerp(x + resolution, x, t4), y + resolution);
                break;
              }
              case 6:
              case 9: {
                const t1 = safeDiv(level - v10, v00 - v10);
                const t2 = safeDiv(level - v11, v01 - v11);
                ctx.moveTo(lerp(x + resolution, x, t1), y);
                ctx.lineTo(lerp(x + resolution, x, t2), y + resolution);
                break;
              }
              case 7:
              case 8: {
                const t1 = safeDiv(level - v00, v01 - v00);
                const t2 = safeDiv(level - v00, v10 - v00);
                ctx.moveTo(x, lerp(y, y + resolution, t1));
                ctx.lineTo(lerp(x, x + resolution, t2), y);
                break;
              }
            }
          }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      timeRef.current += 0.0015;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      // #region agent log (wave unmounted)
      fetch("http://127.0.0.1:7248/ingest/0a0b2c69-3acb-4c12-b656-5ee9a2a79423", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "pre-fix",
          hypothesisId: "C",
          location: "components/home/wave-interference-v5.tsx:WaveInterferenceV5Background.cleanup",
          message: "Wave background unmounted",
          data: {
            htmlHasDark: document.documentElement.classList.contains("dark"),
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log (wave unmounted)
    };
  }, [constants.TWO_PI]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}

