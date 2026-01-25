"use client";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { useMemo, useState } from "react";
import { WaveInterferenceV5Background } from "@/components/home/wave-interference-v5";
import { Bot, Navigation } from "lucide-react";

export function WorkSection() {
  const [workMode, setWorkMode] = useState<"product" | "vibe">("product");

  const toggleStyle =
    workMode === "product"
      ? ({
          "--work-accent": "#E85D2D",
          "--work-accent-bg": "rgba(232, 93, 45, 0.14)",
          "--work-accent-bg-hover": "rgba(232, 93, 45, 0.20)",
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
      <SectionHeading className="relative z-10 mb-12">
        <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-3 leading-[48px]">
          <span>Here is some recent</span>
          <button
            type="button"
            onClick={() => setWorkMode((m) => (m === "product" ? "vibe" : "product"))}
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
          <span aria-hidden="true">...</span>
        </span>
      </SectionHeading>

      <div className="relative z-10 grid gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
