export type ConceptKey = "ai-forward" | "design-engineering";

export type ConceptPrototypeIteration = {
  /** Toggle label, e.g. "v1". */
  label: string;
  /** Hosted prototype URL; leave empty to show a "coming soon" placeholder. */
  url: string;
  /** What changed in this iteration and why — shown above the frame. */
  note?: string;
};

export type ConceptPrototype = {
  title?: string;
  /** Frame shape: a phone-sized frame or a full-width browser frame. */
  viewport?: "mobile" | "desktop";
  iterations: ConceptPrototypeIteration[];
};

export type ConceptSkill = {
  name: string;
  description: string;
  kind: "built" | "used";
};

export type ConceptDetailSection = {
  title: string;
  /** Supports multiple paragraphs via `\n\n`. */
  body: string;
  image?: string;
  imageAlt?: string;
  /** Embedded, toggleable prototype iterations. */
  prototype?: ConceptPrototype;
  /** GitHub username whose contribution calendar renders under the section. */
  githubUser?: string;
  /** Claude Skills showcase, grouped into built and used. */
  skills?: ConceptSkill[];
};

export type ConceptMeta = {
  key: ConceptKey;
  /** URL slug for the detail page: /approach/<slug>. */
  slug: string;
  /** Default visible link text and the card's title. */
  label: string;
  /** Small kicker shown at the top of the card and detail page. */
  eyebrow?: string;
  summary: string;
  points?: string[];
  /** Where this working style was used — shown as a "back to" link on the detail page. */
  source?: { label: string; href: string };
  /** Longer-form content for the dedicated detail page. Expand over time. */
  detail?: {
    subtitle?: string;
    /** Supports multiple paragraphs via `\n\n`. */
    intro?: string;
    sections?: ConceptDetailSection[];
  };
};

/**
 * Reusable "working style" explainers surfaced inline as hover-card popovers
 * (see ConceptHoverLink), each linking to a fuller detail page at /approach/<slug>.
 */
export const concepts: Record<ConceptKey, ConceptMeta> = {
  "ai-forward": {
    key: "ai-forward",
    slug: "ai-forward-discovery",
    label: "AI-forward discovery",
    eyebrow: "How I worked",
    summary:
      "Build something real with AI, put it in front of a parent, change it live, and carry the intent straight into the codebase.",
    points: [
      "Prototypes mirrored production, so parents reacted to the real thing, not a mock",
      "Prototypes changed live on calls, validating feedback in minutes, not days",
      "Exploration and validation in one loop — ideas cheap to try and cheap to discard",
    ],
    source: { label: "Hudl for Parents", href: "/work/hudl-for-parents" },
    detail: {
      subtitle:
        "Collapsing the distance between a prototype, a research session, and a shipped change.",
      intro:
        "One feature was designed almost entirely this way. Instead of designing in a tool and handing off, the loop was: build something real with AI, put it in front of a parent, change it live, and carry the intent straight into the codebase.",
      sections: [
        {
          title: "Try the prototype",
          body: "This is the prototype parents reacted to — many versions were made live on calls. Toggle between them to see how the feature changed as feedback came in.",
          prototype: {
            title: "Parent experience prototype",
            viewport: "mobile",
            iterations: [
              { label: "v1", url: "", note: "Placeholder: what this first version tested." },
              { label: "v2", url: "", note: "Placeholder: what parents said, and what changed." },
              { label: "v3", url: "", note: "Placeholder: the version that carried into the codebase." },
            ],
          },
        },
        {
          title: "Prototypes that mirrored production",
          body: "Instead of a design-tool mock, the starting point was an AI-built prototype close enough to production that customers treated it as the product. That made feedback more honest: people reacted to how it behaved, not to how a static frame implied it might.",
        },
        {
          title: "Updating the prototype live, on the call",
          body: "On calls, the prototype was changed while parents watched. When something was confusing or missing, Claude updated it on the spot — personalized to that family's teams — and the new version went straight back for a reaction.\n\nInstead of noting a comment, redesigning afterward, and scheduling another session, the answer came back in minutes. A cycle that usually takes days of async back-and-forth happened several times in a single call.",
          image: "/approach/live-prototype-loop.svg",
          imageAlt: "Comparison of a days-long research loop versus a live loop where the prototype is updated during the call and the parent reacts immediately",
        },
        {
          title: "Discovery and validation in the same loop",
          body: "With exploration and iteration in one live loop, directions were validated or ruled out far faster than a design-build-test cycle allows. Because ideas were cheap to try and discard, more were pressure-tested against real reactions before engineering committed.",
        },
      ],
    },
  },
  "design-engineering": {
    key: "design-engineering",
    slug: "design-engineering",
    label: "design engineering",
    eyebrow: "How I worked",
    summary: "Contribution that went past the design file and into the codebase itself.",
    points: [
      "Polish and small UI changes shipped as reviewed pull requests, removing a handoff step",
      "Claude Skills tooling helped the wider team move faster without cutting corners",
    ],
    source: { label: "Hudl for Parents", href: "/work/hudl-for-parents" },
    detail: {
      subtitle: "Taking the work past the design file and into the codebase.",
      intro:
        "Some of the work happened in the codebase itself, not just the design file.",
      sections: [
        {
          title: "From design files to pull requests",
          body: "Polish and smaller UI changes — spacing, states, and details that would otherwise round-trip through a written spec — were made directly as reviewed pull requests, removing a handoff and keeping design intent intact through to what shipped.",
          githubUser: "e4-explore",
        },
        {
          title: "Building tooling so the team could move faster",
          body: "Tooling built around Claude Skills automated repetitive parts of the workflow, helping the team move faster without cutting quality and freeing time for harder design and product problems.",
          skills: [
            { kind: "built", name: "skill-name", description: "Placeholder: what this skill does and the step it removed from the team's workflow." },
            { kind: "built", name: "skill-name-2", description: "Placeholder: what this skill does and the step it removed from the team's workflow." },
            { kind: "built", name: "skill-name-3", description: "Placeholder: what this skill does and the step it removed from the team's workflow." },
            { kind: "used", name: "skill-name-4", description: "Placeholder: how this skill fit into the design workflow." },
            { kind: "used", name: "skill-name-5", description: "Placeholder: how this skill fit into the design workflow." },
            { kind: "used", name: "skill-name-6", description: "Placeholder: how this skill fit into the design workflow." },
          ],
        },
      ],
    },
  },
};

export const conceptList: ConceptMeta[] = Object.values(concepts);

export function getConceptBySlug(slug: string): ConceptMeta | undefined {
  return conceptList.find((c) => c.slug === slug);
}

export function getAllConceptSlugs(): string[] {
  return conceptList.map((c) => c.slug);
}
