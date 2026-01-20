import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import type { ProjectDetails } from "@/data/projects";

interface ProjectNavigationProps {
  currentIndex: number;
  totalProjects: number;
  prevProject: ProjectDetails | null;
  nextProject: ProjectDetails | null;
}

export function ProjectNavigation({
  currentIndex,
  totalProjects,
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <Section variant="alt">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Back Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>back home</span>
        </Link>

        {/* Project Counter */}
        <span className="text-sm text-muted-foreground">
          case study {currentIndex}/{totalProjects}
        </span>

        {/* Next Project Link */}
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
      </div>
    </Section>
  );
}
