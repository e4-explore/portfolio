"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);
  const sunriseTimeoutRef = useRef<number | null>(null);
  const isDark = mounted && resolvedTheme === "dark";

  // Prevent hydration mismatch: server can't know system theme.
  useEffect(() => {
    setMounted(true);
  }, []);

  const enableThemeTransition = (durationMs = 300) => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.add("theme-transition");

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimeoutRef.current = null;
    }, durationMs);
  };

  const triggerThemeGlitch = () => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.add("theme-glitch");

    if (glitchTimeoutRef.current) {
      window.clearTimeout(glitchTimeoutRef.current);
    }

    glitchTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-glitch");
      glitchTimeoutRef.current = null;
    }, 550);
  };

  const triggerThemeSunrise = () => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.add("theme-sunrise");

    if (sunriseTimeoutRef.current) {
      window.clearTimeout(sunriseTimeoutRef.current);
    }

    sunriseTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-sunrise");
      sunriseTimeoutRef.current = null;
    }, 1800);
  };

  return (
    <button
      type="button"
      onClick={() => {
        const nextTheme = isDark ? "light" : "dark";
        // Match transition window to overlay duration (sunrise/glitch).
        enableThemeTransition(nextTheme === "light" ? 1800 : 550);
        if (nextTheme === "dark") {
          triggerThemeGlitch();
        } else {
          triggerThemeSunrise();
        }
        setTheme(nextTheme);
      }}
      aria-pressed={isDark}
      className="inline-flex h-10 md:h-20 items-center gap-0 md:gap-3 px-2 md:px-6 rounded-full border-2 border-border bg-background hover:bg-muted text-foreground transition-colors"
    >
      <span
        className="relative block w-6 h-6 md:w-9 md:h-9"
        aria-hidden="true"
      >
        <Sun
          className={[
            "absolute inset-0 w-6 h-6 md:w-9 md:h-9",
            "transition-[transform,opacity] duration-500 ease-out",
            "motion-reduce:transition-none",
            isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0",
          ].join(" ")}
        />
        <Moon
          className={[
            "absolute inset-0 w-6 h-6 md:w-9 md:h-9",
            "transition-[transform,opacity] duration-500 ease-out",
            "motion-reduce:transition-none",
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90",
          ].join(" ")}
        />
      </span>
      <span className="hidden md:inline text-2xl md:text-4xl font-bold leading-none">
        {isDark ? "Night" : "Day"}
      </span>
    </button>
  );
}

