"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  // Prevent hydration mismatch: server can't know system theme.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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

