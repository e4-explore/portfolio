import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import type { ProjectDetails } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight } from "lucide-react";

interface ProjectHeroProps {
  project: ProjectDetails;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <Section className="pt-16 md:pt-24">
      {/* Hero Image */}
      <Reveal delayMs={0}>
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted mb-8">
          <Image
            src={project.heroImage || project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Reveal>

      {/* Title & Subtitle */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
          {project.subtitle}
        </h1>

        {project.externalUrl && (
          <Link
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 px-4 rounded-full border-2 border-border bg-background hover:bg-muted text-foreground font-semibold transition-colors w-fit md:shrink-0"
          >
            <span>View project</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      <Reveal delayMs={160}>
        <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8">
          {project.company}
        </h2>

        {/* Overview */}
        <Reveal delayMs={240}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {project.overview}
          </p>
        </Reveal>

        {/* Tags */}
        <Reveal delayMs={320}>
          <TagList tags={project.tags} className="mb-14" />
        </Reveal>

        {/* Project Info Grid */}
        <Reveal delayMs={400}>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-[repeating-linear-gradient(90deg,var(--border)_0_12px,transparent_12px_24px)]">
            <ProjectInfoItem label="My Position" value={project.role} />
            {project.team && <ProjectInfoItem label="Team" value={project.team} />}
            <ProjectInfoItem label="Tools" value={project.tools.join(", ")} />
            <ProjectInfoItem label="Timeline" value={project.timeline} />
          </div>
        </Reveal>
      </Reveal>
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
