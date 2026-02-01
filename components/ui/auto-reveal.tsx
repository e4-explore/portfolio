"use client";

import { useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

type Options = {
  /** Base stagger between siblings (ms) */
  staggerMs?: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function shouldSkip(el: Element) {
  if (!(el instanceof HTMLElement)) return true;
  if (el.dataset.reveal === "off") return true;
  if (el.classList.contains("reveal")) return true; // already handled (manual Reveal wrapper)
  return false;
}

function markReveal(el: HTMLElement, delayMs: number) {
  el.classList.add("reveal");
  el.style.setProperty("--reveal-delay", `${delayMs}ms`);
}

export function AutoReveal({ staggerMs = 80 }: Options) {
  const pathname = usePathname();
  const key = useMemo(() => `${pathname}`, [pathname]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    // Prevent route transitions to /work/* from "starting" at the previous scroll position
    // (especially noticeable because global CSS enables smooth scrolling).
    if (pathname?.startsWith("/work/")) {
      const root = window.document.documentElement;
      const prevScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = prevScrollBehavior;
    }

    const targets: HTMLElement[] = [];

    const addTargetsFromContainer = (container: Element | null) => {
      if (!container) return;
      Array.from(container.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        if (shouldSkip(child)) return;
        targets.push(child);
      });
    };

    const main = document.querySelector("main");
    addTargetsFromContainer(main);

    // Common pattern: section -> .container-* -> blocks
    document
      .querySelectorAll("main section .container-default, main section .container-wide, main section .container-narrow")
      .forEach((c) => addTargetsFromContainer(c));

    // Footer content
    const footer = document.querySelector("footer");
    addTargetsFromContainer(footer);
    footer
      ?.querySelectorAll(".container-default, .container-wide, .container-narrow")
      .forEach((c) => addTargetsFromContainer(c));

    // Apply reveal class + stagger (stable order)
    const uniqueTargets = Array.from(new Set(targets));
    uniqueTargets.forEach((el, idx) => markReveal(el, idx * staggerMs));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) continue;
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    uniqueTargets.forEach((el) => observer.observe(el));

    // If route transitions add nodes later, observe them too.
    const mo = new MutationObserver((mutations) => {
      const added: HTMLElement[] = [];
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (shouldSkip(n)) return;
          added.push(n);
        });
      }
      if (!added.length) return;
      const start = uniqueTargets.length;
      added.forEach((el, i) => {
        markReveal(el, (start + i) * staggerMs);
        observer.observe(el);
        uniqueTargets.push(el);
      });
    });

    if (main) mo.observe(main, { childList: true, subtree: false });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [key, pathname, staggerMs]);

  return null;
}

