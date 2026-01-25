"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);
  const isDark = mounted && resolvedTheme === "dark";

  // Prevent hydration mismatch: server can't know system theme.
  useEffect(() => {
    setMounted(true);
  }, []);

  const enableThemeTransition = () => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.add("theme-transition");

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimeoutRef.current = null;
    }, 300);
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

  return (
    <button
      type="button"
      onClick={() => {
        enableThemeTransition();
        triggerThemeGlitch();
        setTheme(isDark ? "light" : "dark");
      }}
      aria-pressed={isDark}
      className="inline-flex h-16 md:h-20 items-center gap-3 px-7 md:px-10 rounded-full border-2 border-border bg-background hover:bg-muted text-foreground transition-colors"
    >
      {isDark ? (
        <Moon className="w-7 h-7 md:w-9 md:h-9" />
      ) : (
        <Sun className="w-7 h-7 md:w-9 md:h-9" />
      )}
      <span className="text-2xl md:text-4xl font-bold leading-none">
        {isDark ? "Night" : "Day"}
      </span>
    </button>
  );
}

