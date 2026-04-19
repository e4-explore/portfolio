"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  /** Use a smaller, icon-only version for tight UI like the header. */
  variant?: "default" | "nav";
};

/** Shared with header controls (e.g. home) so they match the nav theme toggle. */
export const themeNavControlClassName =
  "inline-flex h-10 items-center justify-center gap-0 px-3 rounded-full border border-border bg-background hover:bg-muted text-foreground transition-colors";

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);
  const sunriseTimeoutRef = useRef<number | null>(null);
  const isDark = mounted && resolvedTheme === "dark";
  const isNav = variant === "nav";

  // Prevent hydration mismatch: server can't know system theme.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mounted) return;
    // #region agent log (theme resolved change)
    fetch("http://127.0.0.1:7248/ingest/0a0b2c69-3acb-4c12-b656-5ee9a2a79423", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "B",
        location: "components/theme-toggle.tsx:ThemeToggle.useEffect",
        message: "Theme resolvedTheme observed",
        data: {
          variant,
          mounted,
          resolvedTheme,
          htmlHasDark: window.document.documentElement.classList.contains("dark"),
          htmlClass: window.document.documentElement.className,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log (theme resolved change)
  }, [mounted, resolvedTheme, variant]);

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
        // #region agent log (theme toggle click)
        fetch("http://127.0.0.1:7248/ingest/0a0b2c69-3acb-4c12-b656-5ee9a2a79423", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "debug-session",
            runId: "pre-fix",
            hypothesisId: "B",
            location: "components/theme-toggle.tsx:ThemeToggle.onClick",
            message: "Theme toggle clicked",
            data: {
              variant,
              mounted,
              resolvedTheme,
              isDark,
              nextTheme,
              htmlHasDark:
                typeof window !== "undefined" && window.document.documentElement.classList.contains("dark"),
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion agent log (theme toggle click)
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
      className={isNav ? themeNavControlClassName : "inline-flex h-10 md:h-20 items-center gap-0 md:gap-3 px-2 md:px-6 rounded-full border border-border bg-background hover:bg-muted text-foreground transition-colors"}
    >
      <span
        className={isNav ? "relative block w-5 h-5" : "relative block w-6 h-6 md:w-9 md:h-9"}
        aria-hidden="true"
      >
        <Sun
          className={[
            isNav ? "absolute inset-0 w-5 h-5" : "absolute inset-0 w-6 h-6 md:w-9 md:h-9",
            "transition-[transform,opacity] duration-500 ease-out",
            "motion-reduce:transition-none",
            isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0",
          ].join(" ")}
        />
        <Moon
          className={[
            isNav ? "absolute inset-0 w-5 h-5" : "absolute inset-0 w-6 h-6 md:w-9 md:h-9",
            "transition-[transform,opacity] duration-500 ease-out",
            "motion-reduce:transition-none",
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90",
          ].join(" ")}
        />
      </span>
      {!isNav && (
        <span className="hidden md:inline text-2xl md:text-4xl font-bold leading-none">
          {isDark ? "Night" : "Day"}
        </span>
      )}
    </button>
  );
}

