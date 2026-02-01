import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProjectDetails, ProjectSection } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { WaveInterferenceV5Background } from "@/components/home/wave-interference-v5";

interface ProjectContentProps {
  project: ProjectDetails;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <>
      {/* Challenge Section */}
      <Section
        variant="alt"
        className="dark:!bg-none"
        background={
          <WaveInterferenceV5Background className="hidden dark:block absolute inset-0 w-full h-full pointer-events-none" />
        }
      >
        <div className="relative z-10 max-w-4xl">
          <Reveal delayMs={0}>
            <SectionHeading size="md" className="mb-6">
              The Challenge
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={90}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Dynamic Sections */}
      {project.sections.map((section, index) => (
        <ContentSection key={section.title} section={section} isAlt={index % 2 === 0} />
      ))}
    </>
  );
}

interface ContentSectionProps {
  section: ProjectSection;
  isAlt: boolean;
}

function ContentSection({ section, isAlt }: ContentSectionProps) {
  const isDottedSection = !isAlt;

  return (
    <Section
      variant={isAlt ? "default" : "alt"}
      className={isDottedSection ? "dark:!bg-none" : undefined}
      background={
        isDottedSection ? (
          <WaveInterferenceV5Background className="hidden dark:block absolute inset-0 w-full h-full pointer-events-none" />
        ) : null
      }
    >
      <div className="relative z-10 max-w-4xl">
        <Reveal delayMs={0}>
          <SectionHeading size="md" className="mb-6">
            {section.title}
          </SectionHeading>
        </Reveal>

        <Reveal delayMs={90}>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {section.content}
          </p>
        </Reveal>

        {/* Bullet Points */}
        {section.bullets && section.bullets.length > 0 && (
          <Reveal delayMs={180}>
            <ul className="space-y-3 mb-8">
              {section.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Section Image */}
        {section.image && (
          <Reveal delayMs={270}>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted">
              <Image
                src={section.image || "/placeholder.svg"}
                alt={section.imageAlt || section.title}
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
