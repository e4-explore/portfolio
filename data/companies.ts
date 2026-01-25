export type CompanyKey =
  | "Demandwell"
  | "Pillar"
  | "Upperhand"
  | "Apex"
  | "Colaboratory"
  | "High Alpha"
  | "Hudl";

export type CompanyLogo = {
  lightSrc: string;
  darkSrc: string;
  height: number;
  heightClassName: string;
};

export type CompanyMeta = {
  name: CompanyKey;
  website?: string;
  bannerImage?: string;
  tagline: string;
  focus: string[];
  caseStudies?: { label: string; href: string }[];
  highlights?: { label: string; value: string }[];
  logo?: CompanyLogo;
};

export const companies: Record<CompanyKey, CompanyMeta> = {
  Demandwell: {
    name: "Demandwell",
    website: "https://www.demandwell.com/",
    bannerImage: "/clients/Demandwell-Cover.jpg",
    tagline: "B2B SEO platform helping teams grow organic revenue.",
    focus: ["UX/UI", "Product strategy", "Prototyping"],
    caseStudies: [
      { label: "SEO Keyword Research", href: "/work/seo-keyword-research" },
      { label: "Content Production", href: "/work/content-production" },
    ],
    logo: {
      lightSrc: "/clients/demandwell - light mode.svg",
      darkSrc: "/clients/demandwell - dark mode.svg",
      height: 24,
      heightClassName: "h-6",
    },
  },
  Pillar: {
    name: "Pillar",
    website: "https://www.employinc.com/blog/employ-pillar-supercharged-ai-to-strengthen-human-connection/",
    bannerImage: "/clients/Pillar-Cover.jpg",
    tagline: "Interview intelligence software to improve hiring decisions.",
    focus: ["UX/UI", "Design systems", "Rebrand support"],
    caseStudies: [{ label: "Interview Intelligence", href: "/work/interview-intelligence" }],
    logo: {
      lightSrc: "/clients/pillar.svg",
      darkSrc: "/clients/pillar.svg",
      height: 32,
      heightClassName: "h-8",
    },
  },
  Upperhand: {
    name: "Upperhand",
    website: "https://upperhand.com/",
    bannerImage: "/clients/Upperhand-Cover.jpg",
    tagline: "Sports & fitness software for scheduling, payments, and growth.",
    focus: ["UX/UI", "Workflow design", "Product improvements"],
    logo: {
      lightSrc: "/clients/upperhand - light mode.svg",
      darkSrc: "/clients/upperhand - dark mode.svg",
      height: 40,
      heightClassName: "h-10",
    },
  },
  Apex: {
    name: "Apex",
    website: "https://apps.apple.com/us/app/upper-hand-apex/id1054510298",
    bannerImage: "/clients/Apex-Cover.jpg",
    tagline: "Video analysis tools for coaches & athletes (APEX).",
    focus: ["UX/UI", "Prototyping", "Collaboration"],
    logo: {
      lightSrc: "/clients/apex - light mode.svg",
      darkSrc: "/clients/apex - dark mode.svg",
      height: 40,
      heightClassName: "h-10",
    },
  },
  Colaboratory: {
    name: "Colaboratory",
    bannerImage: "/clients/Colaboratory-Cover.jpg",
    tagline: "Partnered on product design and UI polish for launch readiness.",
    focus: ["UI design", "Interaction details", "Design QA"],
    caseStudies: [{ label: "Brand x Brand Collaboration", href: "/work/brand-x-brand" }],
    logo: {
      lightSrc: "/clients/colaboratory - light mode.svg",
      darkSrc: "/clients/colaboratory - dark mode.svg",
      height: 32,
      heightClassName: "h-8",
    },
  },
  "High Alpha": {
    name: "High Alpha",
    website: "https://highalpha.com/",
    bannerImage: "/clients/High-Alpha-Cover.jpg",
    tagline: "Venture studio partnering with teams to build products.",
    focus: ["Product design", "Iteration", "0→1 support"],
    caseStudies: [
      { label: "Interview Intelligence", href: "/work/interview-intelligence" },
      { label: "SEO Keyword Research", href: "/work/seo-keyword-research" },
      { label: "Content Production", href: "/work/content-production" },
      { label: "Brand x Brand Collaboration", href: "/work/brand-x-brand" },
    ],
    logo: {
      lightSrc: "/clients/high-alpha - light mode.svg",
      darkSrc: "/clients/high-alpha - dark mode.svg",
      height: 32,
      heightClassName: "h-8",
    },
  },
  Hudl: {
    name: "Hudl",
    website: "https://www.hudl.com",
    bannerImage: "/clients/Hudl-Cover.jpg",
    tagline: "Sports performance platform for video, insights, and team workflows.",
    focus: ["Product design", "Strategy", "Delivery"],
    highlights: [
      { label: "Role", value: "Sr. Product Designer" },
      { label: "Work", value: "Parent & Fan Experience" },
    ],
  },
};

