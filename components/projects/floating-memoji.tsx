"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingMemojiProps {
  /** Path to the narration audio file. */
  audio: string;
  /** Short line shown in the speech bubble while the narration plays. */
  caption?: string;
}

// Evenly spaced mouth-openness frames captured from a real Memoji recording,
// ordered closed -> wide open. Level 0-1 crossfades across whichever two
// frames it falls between.
const MOUTH_FRAMES = [
  "/memoji/mouth-00.png",
  "/memoji/mouth-25.png",
  "/memoji/mouth-50.png",
  "/memoji/mouth-75.png",
  "/memoji/mouth-100.png",
];
const FRAME_STEP = 1 / (MOUTH_FRAMES.length - 1);

/**
 * Persistent floating avatar that "talks" along with an audio narration.
 * Openness is driven live from the audio's amplitude (Web Audio
 * AnalyserNode), crossfading across several real captured mouth-state
 * frames rather than a synthetic viseme rig, so any narration file works
 * without an offline lip-sync pass.
 */
export function FloatingMemoji({ audio, caption }: FloatingMemojiProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRefs = useRef<(HTMLImageElement | null)[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const rafRef = useRef<number | null>(null);
  const smoothedLevelRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const setMouthLevel = useCallback((level: number) => {
    for (let i = 0; i < MOUTH_FRAMES.length; i++) {
      const img = frameRefs.current[i];
      if (!img) continue;
      const distance = Math.abs(level - i * FRAME_STEP) / FRAME_STEP;
      img.style.opacity = String(Math.max(0, 1 - distance));
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    smoothedLevelRef.current = 0;
    setMouthLevel(0);
  }, [setMouthLevel]);

  const tick = useCallback(() => {
    const analyser = analyserRef.current;
    const data = dataRef.current;
    if (!analyser || !data) return;

    analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i];
    const average = sum / data.length; // 0-255
    const rawLevel = Math.min(1, average / 130); // normalized + clamped

    // Attack/release smoothing: mouth snaps open quickly but eases closed,
    // which reads far less choppy than following raw per-frame amplitude.
    const prev = smoothedLevelRef.current;
    const rate = rawLevel > prev ? 0.5 : 0.15;
    const smoothed = prev + (rawLevel - prev) * rate;
    smoothedLevelRef.current = smoothed;

    setMouthLevel(smoothed);
    rafRef.current = requestAnimationFrame(tick);
  }, [setMouthLevel]);

  const ensureAudioGraph = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.6;
    source.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
    dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
  }, []);

  const togglePlay = useCallback(async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    ensureAudioGraph();
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    if (audioEl.paused) {
      await audioEl.play();
      setIsPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    } else {
      audioEl.pause();
      setIsPlaying(false);
      stopLoop();
    }
  }, [ensureAudioGraph, tick, stopLoop]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    stopLoop();
  }, [stopLoop]);

  useEffect(() => {
    return () => {
      stopLoop();
      sourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      audioCtxRef.current?.close();
    };
  }, [stopLoop]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {caption && isPlaying && (
        <div
          role="status"
          className="memoji-caption-in max-w-[220px] rounded-2xl rounded-br-sm border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--text-primary)] shadow-lg"
        >
          {caption}
        </div>
      )}

      <button
        type="button"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause project narration" : "Play project narration"}
        className={cn(
          "group relative flex h-16 w-16 items-center justify-center transition-transform hover:scale-105 active:scale-95",
          !isPlaying && "memoji-float"
        )}
      >
        {isPlaying && (
          <span
            aria-hidden="true"
            className="absolute inset-0 z-10 animate-ping rounded-2xl bg-[var(--brand-orange)] opacity-20"
          />
        )}

        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--brand-cream)] shadow-lg">
          {MOUTH_FRAMES.map((src, i) => (
            <Image
              key={src}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              src={src}
              alt=""
              fill
              sizes="64px"
              className="absolute inset-0 object-contain"
              style={{ opacity: i === 0 ? 1 : 0 }}
              priority={i === 0}
            />
          ))}
        </div>

        <span className="absolute -bottom-1.5 -right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-orange)] text-white shadow">
          {isPlaying ? (
            <Pause className="h-3 w-3" fill="currentColor" />
          ) : (
            <Play className="h-3 w-3 translate-x-[1px]" fill="currentColor" />
          )}
        </span>
      </button>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- narration audio, not a captionable video track */}
      <audio ref={audioRef} src={audio} preload="none" onEnded={handleEnded} className="hidden" />
    </div>
  );
}
