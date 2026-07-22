"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

/** Offset so anchored sections clear the fixed header. */
const HEADER_OFFSET = 96;

export function ProjectTOC({ items }: { items: TocItem[] }) {
  const [progress, setProgress] = React.useState(0);
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");

  React.useEffect(() => {
    let raf = 0;

    const compute = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

      // Scrollspy: the active section is the last one whose top has
      // scrolled above the header offset line.
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - HEADER_OFFSET <= 1) {
          current = item.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 8;
    window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Top scroll-progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full w-full origin-left bg-foreground/80 transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Right-edge section rail (desktop only, lives in the page margin) */}
      <nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
      >
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleJump(e, item.id)}
              aria-current={active ? "true" : undefined}
              className="group relative flex items-center justify-end gap-3 py-0.5"
            >
              <span
                className={cn(
                  "pointer-events-none whitespace-nowrap rounded-md bg-background/90 px-2 py-1 text-xs font-medium opacity-0 shadow-sm ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
              <span
                className={cn(
                  "block rounded-full transition-all",
                  active
                    ? "h-2.5 w-2.5 bg-foreground"
                    : "h-2 w-2 bg-border group-hover:bg-foreground/50"
                )}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
