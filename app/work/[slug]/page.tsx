import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectContent } from "@/components/projects/project-content";
import { ProjectNavigation } from "@/components/projects/project-navigation";
import { getProjectBySlug, getAllProjectSlugs, projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Ethan Grove`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <Header />
      <main className="pt-4">
        <ProjectHero project={project} />
        <ProjectContent project={project} />
        <ProjectNavigation
          currentIndex={currentIndex + 1}
          totalProjects={projects.length}
          prevProject={prevProject}
          nextProject={nextProject}
          projectType={project.projectType}
        />
      </main>
      <Footer />
    </>
  );
}
