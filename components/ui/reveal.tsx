"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before animating in (ms). Useful for stagger. */
  delayMs?: number;
  /** Only animate the first time it enters the viewport. */
  once?: boolean;
  /** IntersectionObserver threshold. */
  threshold?: number;
  /** IntersectionObserver rootMargin. */
  rootMargin?: string;
  /**
   * Play a pure-CSS entrance on load instead of waiting for scroll/JS.
   * Use for above-the-fold content (e.g. the hero) so it can never flash
   * blank while waiting for hydration or the IntersectionObserver to fire.
   */
  immediate?: boolean;
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  once = true,
  threshold = 0,
  rootMargin = "0px 0px 120px 0px",
  immediate = false,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (immediate) return; // CSS-driven; no observer needed.
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, once, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        immediate ? "reveal--auto" : visible && "reveal--in",
        className
      )}
      style={{ ["--reveal-delay" as any]: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

