import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TagList } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  thumbnail: string;
  color?: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: number;
}

export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <Link href={`/work/${project.slug}`} className={cn("group block", className)}>
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300",
          "hover:shadow-lg hover:border-muted-foreground/20"
        )}
      >
        <div
          className={cn(
            "grid gap-6 p-6 md:p-8",
            "md:grid-cols-2 md:items-center",
            !isEven && "md:[&>*:first-child]:order-2"
          )}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <Image
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-muted-foreground transition-colors">
                {project.title}
              </h3>
              <p className="text-lg text-muted-foreground font-medium">
                {project.subtitle}
              </p>
            </div>

            <TagList tags={project.tags} />

            <div className="flex items-center gap-2 text-sm font-medium text-foreground mt-2">
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
