import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import type { ProjectDetails } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { WaveInterferenceV5Background } from "@/components/home/wave-interference-v5";

interface ProjectNavigationProps {
  currentIndex: number;
  totalProjects: number;
  prevProject: ProjectDetails | null;
  nextProject: ProjectDetails | null;
  projectType?: "design" | "vibe";
}

export function ProjectNavigation({
  currentIndex,
  totalProjects,
  prevProject,
  nextProject,
  projectType,
}: ProjectNavigationProps) {
  const vibe = projectType === "vibe";

  return (
    <Section
      variant={vibe ? "default" : "alt"}
      className={vibe ? "bg-[var(--background-alt)]" : undefined}
      background={
        vibe ? (
          <WaveInterferenceV5Background
            layout="wideStrip"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        ) : undefined
      }
      contentClassName={vibe ? "relative z-10" : undefined}
    >
      <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="w-full flex justify-center sm:w-auto sm:justify-self-start sm:justify-start">
          {prevProject ? (
            <Reveal delayMs={0}>
              <Link
                href={`/work/${prevProject.slug}`}
                className="flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>last project</span>
              </Link>
            </Reveal>
          ) : null}
        </div>

        <div className="sm:justify-self-center">
          <Reveal delayMs={90}>
            <span className="text-sm text-muted-foreground">
              project {currentIndex}/{totalProjects}
            </span>
          </Reveal>
        </div>

        <div className="w-full flex justify-center sm:w-auto sm:justify-self-end sm:justify-end">
          <Reveal delayMs={180}>
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors group"
              >
                <span>next project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors group"
              >
                <Home className="w-4 h-4" />
                <span>view all work</span>
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
