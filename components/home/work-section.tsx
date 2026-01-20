import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

export function WorkSection() {
  return (
    <Section id="work" variant="alt">
      <SectionHeading className="mb-12">
        Here is some of my recent product work...
      </SectionHeading>

      <div className="grid gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
