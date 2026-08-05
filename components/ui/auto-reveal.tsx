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
  // Opt-out marker, on the element or any ancestor (e.g. the hero section,
  // which handles its own above-the-fold entrance and must never be gated
  // behind the IntersectionObserver).
  if (el.closest('[data-reveal="off"]')) return true;
  if (el.classList.contains("reveal")) return true; // already handled (manual Reveal wrapper)
  return false;
}

function markReveal(el: HTMLElement) {
  el.classList.add("reveal");
}

/** Cap on how many items in a single entering batch get a stagger step. */
const MAX_STAGGER_STEPS = 5;

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

    // Apply reveal class (initial hidden state). Stagger is computed at
    // reveal time, not baked in as a global cumulative delay — otherwise
    // elements deep in the page inherit a huge transition-delay and sit
    // blank when a fast scroll brings them into view.
    const uniqueTargets = Array.from(new Set(targets));
    uniqueTargets.forEach((el) => markReveal(el));

    const revealBatch = (els: HTMLElement[]) => {
      // Stagger relative only to what is entering together, and cap it so a
      // fast scroll that reveals a whole chunk never leaves the last item
      // waiting seconds. Order by vertical position for a top-down cascade.
      els
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
        .forEach((el, i) => {
          const step = Math.min(i, MAX_STAGGER_STEPS);
          el.style.setProperty("--reveal-delay", `${step * staggerMs}ms`);
          el.classList.add("reveal--in");
          observer.unobserve(el);
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entering: HTMLElement[] = [];
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) continue;
          if (entry.isIntersecting) entering.push(entry.target);
        }
        if (entering.length) revealBatch(entering);
      },
      // threshold 0 + a positive bottom rootMargin starts the fade ~120px
      // before the element reaches the fold, so it's already visible by the
      // time it scrolls in — even at high scroll speed.
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
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
      added.forEach((el) => {
        markReveal(el);
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

