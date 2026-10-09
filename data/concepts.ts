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
      "One feature was designed almost entirely through an AI-forward loop: build something real with AI, put it in front of a parent, change it live, and carry the intent straight into the codebase.",
    points: [
      "Prototypes that mirrored production — parents reacted to the real thing, not a static mock",
      "Updated the prototype live on customer calls based on their feedback, so changes were validated in minutes, not days",
      "Exploration and validation collapsed into one loop — cheap to try an idea, cheap to discard it",
    ],
    source: { label: "Hudl for Parents", href: "/work/hudl-for-parents" },
    detail: {
      subtitle:
        "Collapsing the distance between a prototype, a research session, and a shipped change.",
      intro:
        "One feature in particular was designed almost entirely through an AI-forward workflow — one that collapsed the usual distance between a prototype, a research session, and a shipped change. Instead of designing in a tool and handing off, the loop was: build something real with AI, put it in front of a parent, change it live, and carry the intent straight into the codebase.",
      sections: [
        {
          title: "Try the prototype",
          body: "This is the prototype parents actually reacted to. Many of these versions were made live, on the call: as a parent gave feedback, the prototype was updated in front of them and handed straight back for a reaction. Toggle between the versions to see how the feature changed as that feedback came in.",
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
          body: "Rather than mock the feature in a design tool, the starting point was an AI-built prototype that replicated the real production experience — close enough to what shipped that customers reacted to it as the product, not a facsimile. That fidelity made the feedback more honest: people responded to how it actually behaved, not to how a static frame implied it might.",
        },
        {
          title: "Updating the prototype live, on the call",
          body: "On calls with parents, the prototype wasn't just shown — it was changed while they watched. When a parent said something was confusing or missing, Claude was used to update the prototype then and there, personalized to that family's own teams and context, and the new version went straight back in front of them for a reaction.\n\nThat turned feedback into validation within the same conversation. Instead of noting a comment, redesigning afterward, and scheduling another session to find out if the change worked, the answer came back in minutes. A cycle that normally takes days of async back-and-forth happened several times inside a single call — which is what made the validation loop so much faster.",
          image: "/approach/live-prototype-loop.svg",
          imageAlt: "Comparison of a days-long research loop versus a live loop where the prototype is updated during the call and the parent reacts immediately",
        },
        {
          title: "Discovery and validation in the same loop",
          body: "Because exploration and iteration collapsed into one live loop, directions got validated — or ruled out — far faster than a traditional design-build-test cycle would allow. AI made it cheap to explore an idea and just as cheap to throw it away, so more of them got pressure-tested against real reactions before anything committed to engineering.",
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
      "Polish and smaller UI changes shipped as real, reviewed pull requests — removing a handoff step",
      "Built tooling around Claude Skills so the broader team could move faster without cutting corners",
    ],
    source: { label: "Hudl for Parents", href: "/work/hudl-for-parents" },
    detail: {
      subtitle: "Taking the work past the design file and into the codebase.",
      intro:
        "Part of the contribution went past the design file entirely — into the codebase itself, both to protect design intent through to what shipped and to help the wider team move faster.",
      sections: [
        {
          title: "From design files to pull requests",
          body: "Polish work and smaller UI changes were made directly in the codebase as real, reviewed pull requests — tightening spacing, states, and details that would otherwise round-trip through a written spec. Handling that polish in code removed a handoff step for the team and kept the intent of the design intact all the way through to what actually shipped.",
          githubUser: "e4-explore",
        },
        {
          title: "Building tooling so the team could move faster",
          body: "Beyond individual changes, this work included building tooling around Claude Skills to help the broader team move faster without cutting corners on quality — automating the repetitive parts of the workflow so more time could go toward the harder design and product problems.",
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
