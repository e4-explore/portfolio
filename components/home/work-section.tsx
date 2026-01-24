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
          "--work-accent": "#39FF14",
          "--work-accent-bg": "rgba(57, 255, 20, 0.14)",
          "--work-accent-bg-hover": "rgba(57, 255, 20, 0.20)",
        } as React.CSSProperties);

  const vibeCoderProjects = useMemo(() => {
    // Keep vibe-coder mode safely linked to existing /work/[slug] pages.
    const filtered = projects.filter((p) => p.tags?.includes("Design Systems"));
    return filtered.length ? filtered : projects;
  }, []);

  const visibleProjects = workMode === "product" ? projects : vibeCoderProjects;

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
        Here is some of my recent{" "}
        <button
          type="button"
          onClick={() => setWorkMode((m) => (m === "product" ? "vibe" : "product"))}
          style={toggleStyle}
          className="inline-flex items-center gap-3 h-12 md:h-14 px-5 md:px-7 rounded-full border border-[var(--work-accent)] bg-[var(--work-accent-bg)] hover:bg-[var(--work-accent-bg-hover)] transition-colors"
          aria-pressed={workMode !== "product"}
          aria-label="Toggle between Product Design and Vibe Coding"
        >
          {workMode === "product" ? (
            <Navigation className="w-5 h-5 md:w-6 md:h-6" style={{ color: "var(--work-accent)" }} />
          ) : (
            <Bot className="w-5 h-5 md:w-6 md:h-6" style={{ color: "var(--work-accent)" }} />
          )}
          <span className="text-xl md:text-2xl font-bold leading-none" style={{ color: "var(--work-accent)" }}>
            {workMode === "product" ? "Product Design" : "Vibe Coding"}
          </span>
        </button>{" "}
        ...
      </SectionHeading>

      <div className="relative z-10 grid gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
