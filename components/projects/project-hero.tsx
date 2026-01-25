import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import type { ProjectDetails } from "@/data/projects";

interface ProjectHeroProps {
  project: ProjectDetails;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <Section className="pt-16 md:pt-24">
      {/* Hero Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted mb-12">
        <Image
          src={project.heroImage || project.thumbnail || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
          {project.subtitle}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
            {project.company}
          </h2>

          {project.externalUrl && (
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border-2 border-border bg-background hover:bg-muted text-foreground font-semibold transition-colors w-fit"
            >
              View project
            </Link>
          )}
        </div>

        {/* Overview */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          {project.overview}
        </p>

        {/* Tags */}
        <TagList tags={project.tags} className="mb-12" />

        {/* Project Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
          <ProjectInfoItem label="My Position" value={project.role} />
          {project.team && <ProjectInfoItem label="Team" value={project.team} />}
          <ProjectInfoItem label="Tools" value={project.tools.join(", ")} />
          <ProjectInfoItem label="Timeline" value={project.timeline} />
        </div>
      </div>
    </Section>
  );
}

function ProjectInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
        {label}
      </h3>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
}
