export type ConceptKey = "ai-forward" | "design-engineering";

export type ConceptDetailSection = {
  title: string;
  /** Supports multiple paragraphs via `\n\n`. */
  body: string;
  image?: string;
  imageAlt?: string;
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
      "Iterated live on customer calls using Claude, personalized to each family's teams and context",
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
          title: "Prototypes that mirrored production",
          body: "Rather than mock the feature in a design tool, the starting point was an AI-built prototype that replicated the real production experience — close enough to what shipped that customers reacted to it as the product, not a facsimile. That fidelity made the feedback more honest: people responded to how it actually behaved, not to how a static frame implied it might.",
        },
        {
          title: "Iterating live with customers using Claude",
          body: "On calls with parents, the prototype wasn't just shown — it was changed in real time. Using Claude during the session, ideas raised in conversation could be tried on the spot and personalized to that customer's own teams and context, then reacted to immediately. A round of feedback that normally spans days of async back-and-forth happened inside a single conversation.",
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
        },
        {
          title: "Building tooling so the team could move faster",
          body: "Beyond individual changes, this work included building tooling around Claude Skills to help the broader team move faster without cutting corners on quality — automating the repetitive parts of the workflow so more time could go toward the harder design and product problems.",
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
