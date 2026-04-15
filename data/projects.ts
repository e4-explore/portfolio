import { Project } from "@/components/projects/project-card";

export interface ProjectDetails extends Project {
  company: string;
  role: string;
  team?: string;
  tools: string[];
  timeline: string;
  challenge: string;
  overview: string;
  sections: ProjectSection[];
}

export interface ProjectSection {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  bullets?: string[];
}

export const projects: ProjectDetails[] = [
  {
    slug: "seo-keyword-research",
    title: "SEO Keyword Research",
    subtitle: "Providing product vision & feature breakdown for implementation",
    description:
      "Demandwell is a startup focused on helping customers grow their SEO organically. Their approach combines SEO expert consultation with platform automation.",
    tags: ["UX Research", "UX/UI Design", "Prototyping"],
    thumbnail: "/projects/seo-keyword-research/seo-keyword-research.png",
    company: "Demandwell",
    role: "Product Designer",
    team: "Ethan Grove & Demandwell Team",
    tools: ["Figma", "Figjam"],
    timeline: "~3 months",
    challenge:
      "Create a keyword generation platform that helps users discover and prioritize SEO keywords to improve their organic search rankings.",
    overview:
      "Demandwell is a startup focused on helping customers grow their SEO organically. Their approach combines SEO expert consultation with platform automation allowing the user flexibility depending on their own experience level.",
    sections: [
      {
        title: "The Challenge",
        content:
          "Users needed a streamlined way to research, analyze, and prioritize keywords for their SEO strategy without requiring deep technical expertise.",
      },
      {
        title: "Discovery",
        content:
          "We conducted user interviews and analyzed existing workflows to understand pain points in the keyword research process.",
        bullets: [
          "Users spent hours manually researching keywords",
          "Difficulty prioritizing which keywords to target",
          "Lack of visibility into competitor strategies",
        ],
      },
      {
        title: "Solution",
        content:
          "We designed an intuitive keyword research tool that automates discovery and provides actionable insights.",
        image: "/projects/seo-keyword-research/seo-keyword-research.png",
        imageAlt: "SEO Keyword Research Platform Interface",
      },
    ],
  },
  {
    slug: "content-production",
    title: "Content Production & Management",
    subtitle: "Meeting business needs & iterating on user experience",
    description:
      "Streamlining the content creation workflow from ideation to publication with an intuitive management system.",
    tags: ["UX Research", "UX/UI Design", "Prototyping"],
    thumbnail: "/projects/content production and management/content production and management.png",
    company: "Demandwell",
    role: "Product Designer",
    team: "Ethan Grove & Demandwell Team",
    tools: ["Figma", "Figjam"],
    timeline: "~4 months",
    challenge:
      "Create a comprehensive content production system that helps teams manage their content lifecycle from planning to publication.",
    overview:
      "Building on the keyword research capabilities, we developed a content production platform that helps teams create, manage, and optimize their content strategy.",
    sections: [
      {
        title: "Understanding the Problem",
        content:
          "Content teams struggled with disconnected tools and processes, leading to inefficiencies and missed opportunities.",
      },
      {
        title: "Design Process",
        content:
          "We mapped out the entire content lifecycle and identified key pain points at each stage.",
        bullets: [
          "Content planning and calendar management",
          "Writing and editing workflows",
          "SEO optimization integration",
          "Publishing and distribution",
        ],
      },
    ],
  },
  {
    slug: "interview-intelligence",
    title: "Interview Intelligence",
    subtitle: "Revamping & iterating an existing product for a new user audience",
    description:
      "High Alpha partnered with Pillar to redesign their interview intelligence platform for a new user persona.",
    tags: ["UX Research", "UX/UI Design", "Design Systems"],
    thumbnail: "/projects/interview intelligence/interview intelligence.png",
    company: "High Alpha x Pillar",
    role: "Product Designer",
    team: "Ethan Grove, JP Pritzel & Pillar Team",
    tools: ["Figma", "Figjam"],
    timeline: "~3 months",
    challenge:
      "UX/UI overhaul including rebrand - enhance the product offering for new user personas while working through a rebrand.",
    overview:
      "High Alpha is a venture capital company that provides product leadership to startup companies. Pillar is a startup focused on improving the interviewing process with unbiased decision making.",
    sections: [
      {
        title: "The Challenge",
        content:
          "Our goal was to enhance the Luma product offering for new user personas while working through a rebrand, creating a more user-friendly product with a strong foundation.",
        bullets: [
          "Update the platform to better reflect the new brand and user personas",
          "Create a platform that is easy to use & understand to encourage engagement",
          "Make improvements & innovations to existing UI and UX flows",
        ],
      },
      {
        title: "Reframing the Problem",
        content:
          "After the launch of Luma, it was discovered that the 'user' the product was built for was incorrect. The intended user was assumed to be the hiring manager, but in reality the hiring manager delegates responsibilities to interviewers and recruiters.",
      },
      {
        title: "Design Strategy",
        content:
          "We focused on three key areas: updating to the new brand, simplifying flows, and designing with empathy.",
        image: "/projects/interview intelligence/persona-flows.png",
        imageAlt: "Interview Intelligence Design Strategy",
      },
      {
        title: "The Redesign",
        content:
          "Key improvements included better highlight tools for capturing interview moments, surfacing top candidates, and reducing friction in creating and sharing highlights.",
      },
    ],
  },
  {
    slug: "brand-x-brand",
    title: "Brand x Brand Collaboration",
    subtitle: "Planning & building an MVP product for Go-to-market",
    description:
      "Designing and launching an MVP product for brand collaboration partnerships.",
    tags: ["UX Research", "UX/UI Design", "Design Systems"],
    thumbnail: "/projects/brand-x-brand-collaboration/brand-x-brand-collaboration.png",
    company: "Client Project",
    role: "Product Designer",
    tools: ["Figma", "Figjam"],
    timeline: "~2 months",
    challenge:
      "Design and build an MVP product that enables brand collaboration partnerships and go-to-market strategies.",
    overview:
      "This project focused on creating a platform that facilitates brand partnerships and collaborative marketing efforts.",
    sections: [
      {
        title: "Project Goals",
        content:
          "Create a streamlined platform for brands to discover, connect, and collaborate on marketing initiatives.",
        bullets: [
          "Brand discovery and matching",
          "Collaboration workflow management",
          "Campaign tracking and analytics",
        ],
      },
      {
        title: "MVP Development",
        content:
          "We focused on core features that would validate the concept and provide value to early adopters.",
      },
    ],
  },
  {
    slug: "mystack",
    title: "mystack",
    subtitle: "My personal tech stack, visualized",
    description:
      "A clean, interactive showcase of my go-to tools and technologies — built to explore layout, animation, and a bit of personality.",
    tags: ["AI Experiment", "Cursor", "Claude"],
    thumbnail: "/projects/mystack/mystack.png",
    company: "Personal project",
    role: "Designer / builder",
    tools: ["Next.js", "React", "Tailwind"],
    timeline: "Ongoing",
    externalUrl: "https://mystack-theta.vercel.app/",
    challenge:
      "Build a visually distinct, personal stack page that's more than a list — something that reflects taste and intention.",
    overview:
      "mystack is a playground for expressing the tools I actually use, in a format that's fun to look at and interact with.",
    sections: [
      {
        title: "What it is",
        content:
          "A curated, interactive display of my tech stack — designed to feel intentional and opinionated rather than exhaustive.",
      },
      {
        title: "What I focused on",
        content:
          "Layout, composition, and making something simple feel polished. The goal was clarity with character.",
        bullets: [
          "Clean visual hierarchy",
          "Subtle interactions and hover states",
          "A cohesive aesthetic that feels personal",
        ],
      },
    ],
  },
  {
    slug: "windows-ep.os",
    title: "windows-ep.os",
    subtitle: "My AI Playground",
    description:
      "A playful “OS-in-the-browser” experiment built to explore interaction, motion, and UI vibes.",
    tags: ["AI Experiment", "Cursor", "Claude"],
    thumbnail: "/projects/window-ep.os/boot-screen.png",
    heroImage: "/projects/window-ep.os/desktop.png",
    company: "Personal project",
    role: "Designer / builder",
    tools: ["Next.js", "React", "Tailwind"],
    timeline: "Ongoing",
    externalUrl: "https://windows-ep.vercel.app/",
    challenge:
      "Create a fun, high-polish interactive web experience that feels like a tiny operating system—without taking itself too seriously.",
    overview:
      "This project is a sandbox for playful UI: window management, interaction patterns, and a little bit of chaos. It’s meant to be explored, not explained.",
    sections: [
      {
        title: "What it is",
        content:
          "A vibe-first build where the goal is delight: familiar OS patterns, quick interactions, and a bunch of small details that make it feel alive.",
      },
      {
        title: "What I focused on",
        content:
          "Interaction and motion: responsiveness, layering, micro-transitions, and keeping the whole thing snappy even as complexity grows.",
        bullets: [
          "Window-like UI patterns",
          "Motion + feedback for interactions",
          "A cohesive visual system that still feels playful",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetails | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
