import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProjectDetails, ProjectSection } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";

interface ProjectContentProps {
  project: ProjectDetails;
}

const isVibe = (project: ProjectDetails) => project.projectType === "vibe";

export function ProjectContent({ project }: ProjectContentProps) {
  if (isVibe(project)) return null;

  const hideMedia = project.hideCaseStudyMedia === true;

  return (
    <>
      {/* Challenge Section */}
      {!project.inProgress && (
        <Section variant="alt">
          <div className="relative z-10 max-w-4xl">
            <Reveal delayMs={0}>
              <SectionHeading size="md" className="mb-2">
                The Challenge
              </SectionHeading>
              {project.challengeTitle && (
                <p className="text-xl font-semibold text-foreground mb-6">{project.challengeTitle}</p>
              )}
            </Reveal>
            <Reveal delayMs={90}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </Reveal>
            {project.challengeBullets && project.challengeBullets.length > 0 && (
              <Reveal delayMs={180}>
                <ul className="space-y-3 mt-6">
                  {project.challengeBullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-lg text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {project.challengeImage && !hideMedia && (
              <Reveal delayMs={270}>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted mt-8">
                  <Image
                    src={project.challengeImage}
                    alt={project.challengeImageAlt || "Challenge reference image"}
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      {/* Dynamic Sections */}
      {project.sections.map((section, index) => (
        <ContentSection
          key={section.title}
          section={section}
          index={index}
          hideMedia={hideMedia}
        />
      ))}

      {/* In-Progress Banner */}
      {project.inProgress && (
        <Section variant="default">
          <Reveal delayMs={0}>
            <div className="max-w-4xl">
              <p className="text-lg text-muted-foreground leading-relaxed">
                This case study is in-progress,{" "}
                {project.designFilesUrl ? (
                  <a
                    href={project.designFilesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    but click here to view design files →
                  </a>
                ) : (
                  "but design files are coming soon."
                )}
              </p>
            </div>
          </Reveal>
        </Section>
      )}
    </>
  );
}

interface ContentSectionProps {
  section: ProjectSection;
  index: number;
  hideMedia?: boolean;
}

function ContentSection({ section, index, hideMedia }: ContentSectionProps) {
  // Design: even = default (plain), odd = alt (dots)
  const isOdd = index % 2 !== 0;
  const variant = isOdd ? "alt" : "default";

  return (
    <Section variant={variant}>
      <div className="relative z-10 max-w-4xl">
        <Reveal delayMs={0}>
          <SectionHeading size="md" className="mb-6">
            {section.title}
          </SectionHeading>
        </Reveal>

        {/* Quote */}
        {section.quote && (
          <Reveal delayMs={60}>
            <blockquote className="border-l-4 border-foreground pl-6 mb-8">
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
                "{section.quote}"
              </p>
            </blockquote>
          </Reveal>
        )}

        {/* Body content — supports multi-paragraph via \n\n */}
        {section.content && (
          <Reveal delayMs={90}>
            <div className="space-y-4 mb-8">
              {section.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {/* Section image (full-width) */}
        {section.image && !hideMedia && (
          <Reveal delayMs={180}>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted mb-8">
              <Image
                src={section.image}
                alt={section.imageAlt || section.title}
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Carousel */}
        {!hideMedia && section.carousel && section.carousel.length > 0 && (
          <Reveal delayMs={180}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {section.carousel.map((slide, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                  <Image src={slide.image} alt={slide.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Sub-items */}
        {section.subItems && section.subItems.length > 0 && (
          <Reveal
            delayMs={
              !hideMedia && (section.image || section.carousel) ? 270 : 180
            }
          >
            <ul className="space-y-8 mb-8">
              {section.subItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold mt-1">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">{item.content}</p>
                    {item.image && !hideMedia && (
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Numbered bullets */}
        {section.bullets && section.bullets.length > 0 && (
          <Reveal delayMs={180}>
            <ul className="space-y-3 mb-8">
              {section.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Metrics */}
        {section.metrics && section.metrics.length > 0 && (
          <Reveal delayMs={270}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              {section.metrics.map((metric, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p className="text-4xl font-bold text-foreground mb-1">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
