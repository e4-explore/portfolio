"use client";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { useEffect, useMemo, useRef, useState } from "react";
import { WaveInterferenceV5Background } from "@/components/home/wave-interference-v5";
import { Bot, Navigation } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useTheme } from "next-themes";

export function WorkSection() {
  const { resolvedTheme } = useTheme();
  const [workMode, setWorkMode] = useState<"product" | "vibe">("product");
  const transitionTimeoutRef = useRef<number | null>(null);
  const glitchTimeoutRef = useRef<number | null>(null);
  const sunriseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // #region agent log (theme/work mode state)
    fetch("http://127.0.0.1:7248/ingest/0a0b2c69-3acb-4c12-b656-5ee9a2a79423", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix",
        hypothesisId: "A",
        location: "components/home/work-section.tsx:WorkSection.useEffect",
        message: "WorkSection state snapshot",
        data: {
          resolvedTheme,
          workMode,
          sectionVariant: workMode === "vibe" ? "default" : "alt",
          backgroundRendersWave: workMode === "vibe",
          htmlHasDark: window.document.documentElement.classList.contains("dark"),
          htmlClass: window.document.documentElement.className,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log (theme/work mode state)
  }, [resolvedTheme, workMode]);

  const enableUiTransition = (durationMs: number) => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.add("theme-transition");
    if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimeoutRef.current = null;
    }, durationMs);
  };

  const triggerUiGlitch = () => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.add("theme-glitch");
    if (glitchTimeoutRef.current) window.clearTimeout(glitchTimeoutRef.current);
    glitchTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-glitch");
      glitchTimeoutRef.current = null;
    }, 550);
  };

  const triggerUiSunrise = () => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.add("theme-sunrise");
    if (sunriseTimeoutRef.current) window.clearTimeout(sunriseTimeoutRef.current);
    sunriseTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove("theme-sunrise");
      sunriseTimeoutRef.current = null;
    }, 1800);
  };

  const toggleStyle =
    workMode === "product"
      ? ({
          "--work-accent": "var(--brand-orange)",
          "--work-accent-bg": "var(--brand-orange-bg)",
          "--work-accent-bg-hover": "var(--brand-orange-bg-hover)",
        } as React.CSSProperties)
      : ({
          "--work-accent": "var(--vibe-green)",
          "--work-accent-bg": "var(--vibe-green-bg)",
          "--work-accent-bg-hover": "var(--vibe-green-bg-hover)",
        } as React.CSSProperties);

  const vibeCoderProjects = useMemo(() => {
    // Keep vibe-coder mode safely linked to existing /work/[slug] pages.
    return projects.filter((p) => p.tags?.includes("AI Experiment"));
  }, []);

  const productProjects = useMemo(() => {
    return projects.filter((p) => !p.tags?.includes("AI Experiment"));
  }, []);

  const visibleProjects = workMode === "product" ? productProjects : vibeCoderProjects;

  return (
    <Section
      id="work"
      variant={workMode === "vibe" ? "default" : "alt"}
      className={workMode === "vibe" ? "bg-[var(--background-alt)]" : undefined}
      background={
        workMode === "vibe" ? (
          <WaveInterferenceV5Background className="absolute inset-0 w-full h-full pointer-events-none" />
        ) : null
      }
    >
      <Reveal>
        <SectionHeading className="relative z-10 mb-12">
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-3 leading-[40px]">
            <span>Here is my recent</span>
            <button
              type="button"
              onClick={() => {
                const nextMode = workMode === "product" ? "vibe" : "product";
                // #region agent log (work mode toggle click)
                fetch("http://127.0.0.1:7248/ingest/0a0b2c69-3acb-4c12-b656-5ee9a2a79423", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    sessionId: "debug-session",
                    runId: "pre-fix",
                    hypothesisId: "A",
                    location: "components/home/work-section.tsx:WorkSection.onClick",
                    message: "Work mode toggle clicked",
                    data: {
                      prevWorkMode: workMode,
                      nextMode,
                      resolvedTheme,
                      htmlHasDark:
                        typeof window !== "undefined" &&
                        window.document.documentElement.classList.contains("dark"),
                    },
                    timestamp: Date.now(),
                  }),
                }).catch(() => {});
                // #endregion agent log (work mode toggle click)
                if (nextMode === "vibe") {
                  enableUiTransition(300);
                  triggerUiGlitch();
                } else {
                  enableUiTransition(300);
                  triggerUiSunrise();
                }
                setWorkMode(nextMode);
              }}
              style={toggleStyle}
              className="inline-flex items-center gap-2 md:gap-3 h-10 md:h-14 px-4 md:px-5 rounded-full border border-[var(--work-accent)] bg-[var(--work-accent-bg)] hover:bg-[var(--work-accent-bg-hover)] transition-colors align-middle"
              aria-pressed={workMode !== "product"}
              aria-label="Toggle between Product Design and Vibe Coding"
            >
              {workMode === "product" ? (
                <Navigation className="w-4 h-4 md:w-6 md:h-6" style={{ color: "var(--work-accent)" }} />
              ) : (
                <Bot className="w-4 h-4 md:w-6 md:h-6" style={{ color: "var(--work-accent)" }} />
              )}
              <span className="text-lg md:text-2xl font-bold leading-none" style={{ color: "var(--work-accent)" }}>
                {workMode === "product" ? "Product Design" : "Vibe Coding"}
              </span>
            </button>
          </span>
        </SectionHeading>
      </Reveal>

      <div className="relative z-10 grid gap-8">
        {visibleProjects.map((project, index) => (
          <Reveal key={`${workMode}-${project.slug}`} delayMs={index * 90}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
