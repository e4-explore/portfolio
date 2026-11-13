import { Project } from "@/components/projects/project-card";

export interface ProjectDetails extends Project {
  company: string;
  role: string;
  team?: string;
  tools: string[];
  timeline: string;
  challenge: string;
  challengeTitle?: string;
  challengeBullets?: string[];
  challengeImage?: string;
  challengeImageAlt?: string;
  overview: string;
  sections: ProjectSection[];
  inProgress?: boolean;
  designFilesUrl?: string;
  projectType?: "design" | "vibe";
  /** When true, only the hero image shows; challenge + section images/carousels are omitted. */
  hideCaseStudyMedia?: boolean;
  /** When true, excluded from listings, navigation, and static generation (404s if visited directly). */
  hidden?: boolean;
  /** Headline results shown in the hero, above the fold — the numbers a skimmer should leave with. */
  heroMetrics?: ProjectMetric[];
  /** Small kicker above the hero metrics (e.g. "3 months after launch"). */
  heroMetricsLabel?: string;
}

export interface ProjectSubItem {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  /** Optional smaller explanatory line rendered below the label — the "why"/logic behind the number. */
  subtext?: string;
}

export interface ProjectGrowthPoint {
  label: string;
  value: number;
  /** Display string for the value (e.g. "~4,400"); defaults to the formatted number. */
  display?: string;
}

export interface ProjectGrowth {
  title: string;
  points: ProjectGrowthPoint[];
  caption?: string;
}

export interface ProjectCarouselSlide {
  image: string;
  alt: string;
}

export interface ProjectSection {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  bullets?: string[];
  subItems?: ProjectSubItem[];
  metrics?: ProjectMetric[];
  /** Simple single-series bar chart of a value growing across milestones. */
  growth?: ProjectGrowth;
  quote?: string;
  carousel?: ProjectCarouselSlide[];
  /** Small uppercase kicker above the title, used to group sections into phases (e.g. "Discovery"). */
  eyebrow?: string;
  /** Override for the side-rail label. Defaults to the eyebrow, so the two always match. */
  navLabel?: string;
}

export const projects: ProjectDetails[] = [
  {
    slug: "hudl-for-parents",
    title: "Hudl for Parents",
    subtitle: "Bringing parents into Hudl for the first time — and rebuilding the foundation underneath them",
    description:
      "Hudl's first product for parents — 8,500+ in three months — built while consolidating two apps and rebuilding navigation for every role.",
    tags: ["UX Research", "Product Strategy", "UX/UI Design"],
    thumbnail: "/projects/hudl-for-parents/hudl for parents - project cover.jpg",
    company: "Hudl",
    role: "Sr. Product Designer",
    tools: ["Figma", "Miro", "Claude", "NotebookLM"],
    timeline: "6 months → Spring alpha → Summer 2026 launch",
    inProgress: false,
    heroMetricsLabel: "3 months after launch",
    heroMetrics: [
      { value: "8,515", label: "Unique parents" },
      { value: "25", label: "Videos watched per parent, monthly" },
      { value: "6", label: "Sessions per parent, monthly" },
      { value: "95%", label: "Successful sessions" },
    ],
    challengeTitle: "A new user type, a mental model shift, and two apps becoming one",
    challenge:
      "Parents had always watched games and chased highlights on Hudl, but never had a product of their own. Building one was also the moment to fix two long-standing problems.",
    challengeImage: "/projects/hudl-for-parents/diagrams/challenge.svg",
    challengeImageAlt: "Diagram of the three problems: a new parent user type, two apps consolidating into one, and one navigation model for every role",
    challengeBullets: [
      "Define and validate a parent MVP — groundwork for an untapped revenue line",
      "Merge two overlapping apps into one, delisting the duplicate and its engineering overhead",
      "Fix a year-old navigation and information architecture problem platform-wide",
    ],
    overview:
      "Hudl is a sports performance platform for coaches, athletes, and administrators — video, analytics, and team communication. This project designed its first product for parents, from scratch, with a paid subscription as the long-term goal — and used it as the forcing function to fix the platform underneath.",
    sections: [
      {
        title: "Zero to 8,500+ parents, and a stronger platform for every role",
        eyebrow: "At a Glance",
        content: "",
        bullets: [
          "Took a brand-new user type from zero to 8,515 parents in three months",
          "Used pilot data to reframe the core problem as activation, not retention — resetting the roadmap into launch",
          "Led a navigation and IA fix that shipped for every role, advising other designers to keep it consistent",
          "Went past design files: merged real pull requests and built Claude Skills tooling for the wider team",
        ],
      },
      {
        title: "Designing for a user who didn't exist yet",
        eyebrow: "Discovery",
        content:
          "There was no parent research to start from. The first question was what job a parent is trying to get done — and how little of it could ship as a genuinely useful alpha. What did exist was a list of known Fan app problems: empty schedules and rosters, unreliable livestream-to-replay handoffs, and friction around purchases and refunds.",
        subItems: [
          {
            title: "Two apps, one job",
            content:
              "Parents bounced between two apps for the full picture of their athlete's season, and sensed Hudl's main app had more content than the fan app built for them. Consolidation mattered as much as any new screen.",
          },
          {
            title: "A navigation problem a year in the making",
            content:
              "Discovery resurfaced a mental-model problem flagged a year earlier and never prioritized. Feedback from coaches, athletes, and admins made the case for a platform-wide fix, not a parent one-off.",
          },
          {
            title: "Turning feedback into signal",
            content:
              "AI-assisted text analysis sorted in-app comments into recurring themes, feeding a sentiment dashboard segmentable by cohort — a repeatable check, instead of anecdotes, on whether new work addressed what parents cared about most.",
            image: "/projects/hudl-for-parents/diagrams/feedback-pipeline.svg",
            imageAlt: "Diagram of in-app comments sorted by AI into themes, feeding a sentiment-over-time dashboard",
          },
          {
            title: "What parents were running into",
            content:
              "Parents expected far more video than existed. Teams were hard to find, forcing workarounds just to follow their own kid. Location and favorite teams didn't shape what anyone saw first. And every team profile looked the same — what the team called \"profile blindness.\"",
          },
          {
            title: "Not breaking it for everyone else",
            content:
              "Coaches analyzed games in the legacy app and recruiters browsed player profiles there. Every change had to serve parents without quietly breaking those jobs.",
          },
          {
            title: "Built to learn fast",
            content:
              "The alpha was instrumented to learn quickly, and parent-facing features were shaped through [[ai-forward|an AI-forward discovery loop]] — production-fidelity prototypes, updated live on calls with families.",
          },
        ],
      },
      {
        title: "Not just a new app — a better platform for everyone",
        eyebrow: "Reframe",
        quote:
          "...how might we bring an entirely new user type into Hudl for the first time, without asking every existing user to live with a fragmented, outdated foundation while we do it?",
        content:
          "The easy version was a new app beside everything else. The bigger opportunity was improving the whole platform in the process: one experience instead of two, and navigation that made sense for everyone.",
      },
      {
        title: "Learn from a live alpha, and fix the foundation once",
        eyebrow: "Strategy",
        content: "",
        subItems: [
          {
            title: "Ship the alpha, then let it teach you",
            content:
              "Rather than scope everything up front, get a real version in front of families early and treat the alpha as the main research tool.",
          },
          {
            title: "Fix the foundation once",
            content:
              "Rebuilding navigation is disruptive, so it happened once and deliberately — designed for parents and every existing role, not patched around the newcomer.",
          },
          {
            title: "Design the seams for monetization, don't build it yet",
            content:
              "A future subscription shaped flows and permissions, without committing to paywalls or pricing before parents showed what they'd pay for.",
          },
          {
            title: "Prototype in code, polish in code",
            content:
              "Prototypes were built at production fidelity, and hands-on [[design-engineering|design engineering]] carried polish straight into the codebase instead of a written handoff.",
          },
          {
            title: "Leading beyond this workstream",
            content:
              "The navigation changes reached surfaces this project didn't own, so part of the role was advising other designers to keep them consistent. Consolidation was sequenced with product, marketing, and engineering around the parent rollout, keeping messaging honest about what shipped when.",
          },
        ],
      },
      {
        title: "Two apps into one, one navigation, and an event-first experience",
        eyebrow: "MVP",
        content: "",
        subItems: [
          {
            title: "Merging two strong products into one",
            content:
              "This wasn't folding a failing app into a stronger one: in the prior year the Fan app's NPS rose from -5 to 30 and it reached #12 among free sports apps, ahead of Hudl's flagship at #30. Merging them ended the split attention, delisted the duplicate, and began retiring its separate codebase.",
            image: "/projects/hudl-for-parents/hudl for parents - multiple apps.jpg",
            imageAlt: "Hudl and Hudl Fan as two separate App Store listings before consolidation",
          },
          {
            title: "One navigation model for every role",
            content:
              "Shipped platform-wide, resolving a year of accumulated feedback and giving every user type a clearer mental model of the product.",
            image: "/projects/hudl-for-parents/diagrams/navigation-every-role.svg",
            imageAlt: "Diagram of coach, athlete, admin, and parent roles all sharing one navigation bar",
          },
          {
            title: "The cornerstone: design around the event, not the video",
            content:
              "Parents plan around games, not around whether video exists. A video-first model dead-ended whenever a stream failed or hadn't posted; an event-first page always gave a game somewhere to land — a base for schedules, live data, and video to layer onto.",
            image: "/projects/hudl-for-parents/diagrams/event-first.svg",
            imageAlt: "Comparison of a video-first model that dead-ends without video versus an event-first page that always has content",
          },
          {
            title: "A closed pilot, built to be tested",
            content:
              "It shipped first to a few real teams and families, adding features one at a time so each could be watched in isolation: messaging and calendar, then video and highlights, profiles, livestreams, and finally search, sharing, and ticketing.",
            image: "/projects/hudl-for-parents/diagrams/pilot-rollout.svg",
            imageAlt: "Staircase of features added one at a time during the closed pilot",
          },
        ],
      },
      {
        title: "The real problem was activation, not retention",
        eyebrow: "Learnings",
        quote:
          "...the data wasn't telling us retention was broken — it was telling us most parents never found the experience in the first place. We weren't fighting a retention problem. We were fighting an activation problem.",
        content:
          "Across 150 parents with no marketing, about 40% engaged — half of them watching video, validating video as the wedge into this market. Five patterns reshaped the point of view heading into launch.",
        image: "/projects/hudl-for-parents/diagrams/activation-funnel.svg",
        imageAlt: "Funnel from 150 alpha parents to about 40% engaged to about 6% reaching an event page, highlighting the discovery gap",
        subItems: [
          {
            title: "Activation, not retention",
            content:
              "Nearly every parent who reached an event page watched video, but few got there. The product worked; discovery didn't. The next phase built activation into the product instead of relying on outside prompts.",
          },
          {
            title: "The post-game moment is the hook",
            content:
              "Email opens ran 42–50% against a 36.9% benchmark, but only post-game sends drove meaningful clicks. That timing became the organizing principle for prompts back into the experience.",
          },
          {
            title: "Parents want to create, not just consume",
            content:
              "Parents wanted to clip, share, and export their athlete's highlights — some already did through desktop workarounds. Creation was a core reason to return, not a nice-to-have.",
          },
          {
            title: "Trust before automation",
            content:
              "Demand for automated highlights was high, but one missed moment or mis-tagged athlete undercut trust in the whole feature. For something this personal, reliability has to clear a high bar first.",
          },
          {
            title: "\"Parent\" isn't one audience",
            content:
              "Coaches, team admins, and volunteer team managers each shaped adoption differently, with different levels of trust — so outreach and onboarding were rebuilt around those roles instead of treating every adult around a team the same.",
          },
        ],
        metrics: [
          {
            value: "90%",
            label: "Event page → video watch rate",
            subtext: "Once parents found the experience, it converted.",
          },
          {
            value: "~6%",
            label: "Reached an event page",
            subtext: "Share of the full cohort — the bottleneck was discovery, not the product.",
          },
          {
            value: "4.5x",
            label: "Post-game email CTR vs. benchmark",
            subtext: "Against the Braze benchmark. Pre-game sends drove almost no clicks.",
          },
        ],
      },
      {
        title: "From 150 parents to thousands",
        eyebrow: "Launch",
        content:
          "General availability shipped in July 2026 on the new foundation, with consolidation and navigation already complete. After a quiet first week, sign-ups climbed steadily.\n\nA related feature shipped a month into the project opened a second door: an age gate requiring under-18 athletes to request parent consent brought in about 600 parents its first week, each connected directly to their athlete.",
        growth: {
          title: "Unique parents since general availability",
          points: [
            { label: "Week 1", value: 78 },
            { label: "Month 1", value: 4400, display: "~4,400" },
            { label: "Month 3", value: 8515 },
          ],
          caption: "Milestones are unevenly spaced — bars show cumulative totals, not equal time intervals.",
        },
      },
      {
        title: "Three months in, parents keep coming back",
        eyebrow: "Impact",
        content:
          "The alpha left one question open: would parents come, and keep coming back? They do — six sessions and 25 videos a month on average, the video wedge now holding at scale.\n\nNext is rapid testing on what this audience will pay for, with an engaged base to test it with.",
        metrics: [
          {
            value: "~6% → TBD",
            label: "Reached an event page, alpha → today",
            subtext: "Will show whether building activation into the product closed the gap.",
          },
          {
            value: "#23 → #13",
            label: "App Store rank, launch → Nov 2026",
            subtext: "Top free sports apps, peaking at #7 in Oct 2026 — with little to no marketing and a narrow parent audience.",
          },
          {
            value: "2 → 1",
            label: "Apps consolidated",
            subtext: "Duplicate delisted, with its sunset underway.",
          },
        ],
        bullets: [
          "New revenue line: 8,500+ engaged parents and real usage data for a previously untapped user type",
          "Cost efficiency: one app delisted and its codebase being retired, freeing engineering capacity",
          "De-risked investment: demand proven with a 150-parent alpha before scaling engineering spend",
          "Platform health: a year-old navigation problem resolved for every role",
        ],
      },
    ],
  },
  {
    slug: "content-production",
    title: "Content Production & Management",
    subtitle: "Meeting business needs & iterating on user experience",
    description:
      "Streamlining Demandwell's content workflow from ordering to publication.",
    tags: ["UX Research", "UX/UI Design", "Prototyping"],
    thumbnail: "/projects/content production and management/content production and management.png",
    company: "Demandwell",
    role: "Lead Product Designer",
    team: "Ethan Grove, Tanner Brumbarger, Justin Stanczak, Jillian Howell & Matt McKee",
    tools: ["Figma"],
    timeline: "4 weeks planning, 6 weeks development",
    overview:
      "Demandwell is an Indianapolis SEO startup of about 50 people. It pairs expert consultation with platform automation, so customers can do as much or as little themselves as they like, with tools for keyword generation, content production, performance tracking, and site monitoring.",
    challengeTitle: "Ordering automation, visibility & better UX",
    challenge:
      "Heavy use of the content product and a growing base of content+ customers made servicing them labor-intensive. The goal was to cut cost-to-serve immediately and give prospects confidence in buying content production. Three problems to solve:",
    challengeBullets: [
      "Consultants were a bottleneck for communication & delivery",
      "Customers had no visibility into progress after ordering",
      "Writers with lots of content struggled to stay organized",
    ],
    challengeImage: "/projects/content production and management/placeholders/challenge.svg",
    challengeImageAlt: "Diagram of the three problems: consultants as a bottleneck, no order visibility, and disorganized writers",
    sections: [
      {
        title: "Mapping the existing flow to find the gap",
        eyebrow: "Kickoff",
        content:
          "Production has three steps — selecting keywords, building outlines, and writing — each self-service or purchasable. Keywords and writing were already add-ons; the gap was outlines, which content+ would fill for premium customers.\n\nThe new offering had to slot into the existing flows so customers could do everything themselves or choose which steps to hand off, with automation absorbing the work.",
        image: "/projects/content production and management/placeholders/current-flow.svg",
        imageAlt: "The existing content flow — keywords, outlines, writing — showing self-serve vs. purchasable steps",
      },
      {
        title: "Add the new service without disrupting anyone",
        eyebrow: "Insights",
        content: "",
        subItems: [
          {
            title: "Increase visibility and improve content quality",
            content:
              "A new in-product service with clearer statuses and approval steps would improve output and cut complaints and rework.",
          },
          {
            title: "Improvements must not disrupt current flows",
            content:
              "Many customers relied on the existing process, so changes had to fit — or improve — the current flow and backend.",
          },
          {
            title: "Automation to improve scalability",
            content:
              "Several teams performed manual, often bottlenecking tasks to deliver the service. Automating them would cut the cost of serving each new content+ customer.",
          },
        ],
      },
      {
        title: "One UI for customers and the staff fulfilling orders",
        eyebrow: "Discovery",
        content:
          "Customers and Demandwell staff fulfilling orders would share these flows. With many roles, permissions, and edge cases, the UI had to stay consistent across users while surfacing each one's essential information and actions.",
        image: "/projects/content production and management/placeholders/user-permissions.svg",
        imageAlt: "Customers, CPMs, and writers mapped to what each can see and do at each stage",
        subItems: [
          {
            title: "Statuses & sections were unclear",
            content:
              "Three sections and few statuses left grey areas for orders mid-fulfillment. Finer sections and statuses would show where an order stood without customers having to ask.",
            image: "/projects/content production and management/placeholders/status-map.svg",
            imageAlt: "The old three-section model compared to the new granular stages and statuses",
          },
          {
            title: "Improving existing internal processes",
            content:
              "The project was also a chance to evaluate and improve internal processes.",
          },
        ],
      },
      {
        title: "Improve the existing experience while adding the new one",
        eyebrow: "Reframe",
        quote:
          "...how might we serve the new customer base within the platform and make UX improvements for existing customers without disruption?",
        content:
          "Discovery surfaced more to improve alongside the new offering. The aim became every non-disruptive improvement possible while fitting the new service in efficiently — resulting in a light redesign of the Content Planner list page and new headers throughout the flow, with key actions based on user permissions.",
      },
      {
        title: "Clearer statuses, and key actions in customers' hands",
        eyebrow: "Strategy",
        content: "",
        subItems: [
          {
            title: "Improvement of UX overall",
            content:
              "With the MVP years old, this was the moment to improve UX for existing and new customers alike.",
          },
          {
            title: "Increased ordering visibility",
            content:
              "Clearer stage names and more granular statuses would fix unclear progress.",
          },
          {
            title: "Eliminate internal work",
            content:
              "Consultants spent a lot of time relaying information, so key actions moved into customers' hands.",
          },
        ],
      },
      {
        title: "A reorganized planner, status alerts, and self-serve ordering",
        eyebrow: "Build",
        content: "",
        subItems: [
          {
            title: "Clearer sections & less scrolling",
            content:
              "Accordion sections mixing statuses made large content libraries hard to manage. The redesigned Content Planner uses tabs, stages, icons, and tooltips for organization and tracking.",
            image: "/projects/content production and management/placeholders/content-planner-before-after.svg",
            imageAlt: "Content Planner before and after — accordion sections replaced by tabs and stages",
          },
          {
            title: "New statuses & notifications",
            content:
              "Customers couldn't tell how their order was progressing. Alongside clearer statuses, Demandwell now emails whoever placed the order as content moves through each writing phase.",
            image: "/projects/content production and management/placeholders/status-notifications.svg",
            imageAlt: "New status badges and an order-progress email notification",
          },
          {
            title: "Automating ordering & outline approval",
            content:
              "Outline orders and approvals used to run over email: CPMs created an outline, got it approved, and submitted the order for the customer. Now customers order and approve outlines in the platform.",
            image: "/projects/content production and management/placeholders/outline-approval.svg",
            imageAlt: "Customer submitting an order and approving an outline in the platform",
          },
        ],
      },
      {
        title: "Shipped despite a late start",
        eyebrow: "Launch",
        content:
          "The new offering shipped, visibility improved, and UX got better for every user, with positive feedback from customers and internal teams.\n\nThere were speed bumps: the project started two weeks late due to bleed-over from an earlier project, and gaps in FE/BE communication caused some misses. The team triaged what was vital for launch and backlogged the rest.",
      },
      {
        title: "More in-app orders, less internal work",
        eyebrow: "Impact",
        content:
          "Customers became more organized and took ownership of ordering. Shifting that responsibility and adding progress notifications raised daily active usage and saved time for customers and internal teams. Results were measured 45 days after launch, followed by two weeks of fast-follow improvements.",
        metrics: [
          { value: "8%", label: "Increase in DAU/MAU" },
          { value: "70%", label: "Increase of in-app orders" },
          { value: "~10–15 min", label: "Saved internally per order" },
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
    heroImage: "/projects/interview intelligence/interview intelligence.png",
    acquisition: {
      acquirerName: "Employ",
      acquirerUrl: "https://www.employinc.com/",
      acquirerLogo: "/brands/employs.svg",
    },
    company: "High Alpha x Pillar",
    role: "Product Designer",
    team: "Ethan Grove, JP Pritzel & Pillar Team",
    tools: ["Figma", "FigJam"],
    timeline: "~3 months",
    overview:
      "High Alpha is a venture studio that embeds with startups for 3–6 months to lead product and design.\n\nPillar builds interview software for unbiased hiring decisions. Based in Indianapolis with a distributed team of under 50, it worked closely with us through its CEO and about 10 other employees.",
    challengeTitle: "UX/UI overhaul including rebrand",
    challenge:
      "Improve the Luma product for new user personas during a rebrand — without constraining new ideas. The aim was a friendlier product with a foundation strong enough for a fast-changing business.",
    challengeBullets: [
      "Reflect the new brand and user personas across the platform",
      "Make the platform easy to use and understand to drive engagement",
      "Improve and innovate on existing UI and UX flows",
    ],
    challengeImage: "/projects/interview intelligence/placeholders/luma2.svg",
    challengeImageAlt: "Luma — existing product before rebrand",
    sections: [
      {
        title: "Starting with the new user personas",
        eyebrow: "Kickoff",
        content:
          "Before designing, the team paired with the CEO — and sometimes the Head of Customer Service — to learn what each new customer segment needed.",
        image: "/projects/interview intelligence/placeholders/board-3.svg",
        imageAlt: "FigJam planning and discovery whiteboard",
        subItems: [
          {
            title: "Defining what is first to work on",
            content:
              "A fully built platform offered plenty to start on. Grouping product offerings logically exposed information architecture gaps — some to fill now, some to anticipate.",
          },
        ],
      },
      {
        title: "Core features worked; the flows around them didn't",
        eyebrow: "Insights",
        content: "",
        subItems: [
          {
            title: "Design system needed updating",
            content:
              "The design system was limited but functional; the rebrand meant revamping every component. The team experimented with more intuitive components and flows, mixing in brand elements to see what worked.",
          },
          {
            title: "Functionality mostly there, but flows were not",
            content:
              "Recording interviews and leaving basic highlights worked, but surfacing that information afterward was hard, and IA gaps skipped for go-to-market reasons remained.",
          },
          {
            title: "Most used vs. most important pages",
            content:
              "Users spent most of their time watching highlights on the interview page, but finding a specific interview or highlight was a chore and comparing candidates meant juggling tabs — leaving many user-built workarounds to replace.",
          },
        ],
      },
      {
        title: "Three personas, each with different goals",
        eyebrow: "Discovery",
        content: "",
        image: "/projects/interview intelligence/persona-flows.png",
        imageAlt: "User persona diagram — Hiring Managers, Interviewers, and Recruiters",
        subItems: [
          {
            title: "Most used vs. most important actions",
            content:
              "The team mapped the key actions that lead each persona to their \"aha moment\" — so users find value naturally and the product sticks.",
          },
          {
            title: "What can a user do vs. what can a user see",
            content:
              "Hiring Managers, Interviewers, and Recruiters each have different goals. With the CEO and stakeholders, the team defined high-level permissions and the key actions each needed.",
          },
        ],
      },
      {
        title: "The product was built for the wrong user",
        eyebrow: "Reframe",
        content:
          "After Luma launched, it became clear it had been built for the wrong user. It assumed the hiring manager, as final decision-maker — but hiring managers juggle other duties and delegate most of this work when they can. The result was low usage and a poor perception of the product.\n\nThe redesign refocused existing functionality and flows on interviewers and recruiters, who give the decision-maker perspective.",
        quote:
          "...how might we help interviewers and recruiters provide unbiased opinions to assist hiring managers in making better decisions?",
      },
      {
        title: "Rebrand, simplify, and design for each persona",
        eyebrow: "Strategy",
        content: "",
        carousel: [
          {
            image: "/projects/interview intelligence/placeholders/style-guide.svg",
            alt: "Updated Pillar design system and style guide",
          },
          {
            image: "/projects/interview intelligence/placeholders/simplified-flows.svg",
            alt: "Simplified user flow diagram",
          },
          {
            image: "/projects/interview intelligence/placeholders/comparison.svg",
            alt: "Before/after UI comparison",
          },
        ],
        subItems: [
          {
            title: "Updating to the new brand",
            content:
              "Updated the style guide and built new components, carrying brand voice and tone into UX copy and UI.",
          },
          {
            title: "Simplifying flows",
            content:
              "Cut unnecessary actions so users could focus on what mattered.",
          },
          {
            title: "Designing with empathy",
            content:
              "Every screen was designed for the persona using it, with edge cases thought through.",
          },
        ],
      },
      {
        title: "Easier feedback, clearer candidates, and new analytics",
        eyebrow: "Redesign",
        content: "",
        subItems: [
          {
            title: "Highlighting key moments with ease",
            content:
              "Gathering feedback during interviews had to be effortless. Building on the existing Zoom integration, the team redesigned creating highlights, grading questions, and taking notes mid-interview.",
            image: "/projects/interview intelligence/placeholders/zoom-app.svg",
            imageAlt: "Redesigned Zoom integration and in-interview UI",
          },
          {
            title: "Providing top candidates front and center",
            content:
              "The redesigned roles page surfaces the top two candidates by interview score, easing option paralysis for hiring managers choosing between a few finalists.",
            image: "/projects/interview intelligence/placeholders/hero-side-by-side.svg",
            imageAlt: "Old vs. new candidate list side-by-side comparison",
          },
          {
            title: "Reducing friction on creating & sharing highlights",
            content:
              "Post-interview highlights worked but needed an upgrade: users can now grab parts of the transcript or leave timestamped feedback while rewatching.",
            image: "/projects/interview intelligence/placeholders/transcript.svg",
            imageAlt: "Redesigned transcript and highlight creation UI",
          },
          {
            title: "Analytics & innovation",
            content:
              "With the core platform redesigned and rebranded, the team turned to innovation — analytics, dashboards, and anything else that could lead to better hires.",
            image: "/projects/interview intelligence/placeholders/analytics-candidate.svg",
            imageAlt: "New analytics and candidate dashboard",
          },
        ],
      },
      {
        title: "Shipped piece by piece to avoid disruption",
        eyebrow: "Launch",
        content:
          "The team shipped in the smallest chunks possible — page by page, feature by feature, or flow by flow, depending on complexity and usage — polishing visuals and details during development. Users saw gradual updates instead of one overwhelming change.",
      },
      {
        title: "Validated by an acquisition three years later",
        eyebrow: "Impact",
        content:
          "The redesign improved the experience for purchasers and the interview process as a whole, though the agency-style engagement ended before usage could be instrumented and compared.\n\nThe clearest validation came three years later: in 2025, Employ acquired Pillar and carried this 2022 redesign and rebrand into its hiring suite rather than starting over. Still being the foundation worth acquiring three years on is its own kind of proof.",
        metrics: [
          { value: "Acquired", label: "Pillar was acquired by Employ following this engagement" },
        ],
      },
    ],
  },
  {
    slug: "brand-x-brand",
    title: "Brand x Brand Collaboration",
    subtitle: "Planning & building an MVP product for Go-to-market",
    description:
      "High Alpha partnered with Colaboratory to design and launch an MVP brand collaboration platform for go-to-market.",
    tags: ["UX Research", "UX/UI Design", "Design Systems"],
    thumbnail: "/projects/brand-x-brand-collaboration/brand-x-brand-collaboration.png",
    heroImage: "/projects/brand-x-brand-collaboration/brand-x-brand-collaboration.png",
    company: "High Alpha x Colaboratory",
    role: "Lead Product Designer",
    team: "Ethan Grove, Chad Hostetter, Kristin Martin & Colaboratory Team",
    tools: ["Figma"],
    timeline: "~3 months",
    overview:
      "High Alpha is a venture studio that embeds with startups for 3–6 months to lead product and design.\n\nColaboratory is a Minneapolis startup that creates brand collaboration opportunities for its members. Its whole team of under 10 — CEO, CTO, and Head of Customer Success — was involved throughout.",
    challengeTitle: "GTM with a brand collaboration platform",
    challenge:
      "Expand the CEO's vision for a product to disrupt the marketing industry: helping brands collaborate by recommending strategic, data-backed partnerships and plans for tapping each other's audiences.",
    challengeBullets: [
      "Work with the CEO and stakeholders to solve the right problems",
      "Create a style guide and the start of a scalable component library",
      "Deliver an MVP to build and iterate on",
    ],
    challengeImage: "/projects/brand-x-brand-collaboration/placeholders/Colab-Report-ROQ.svg",
    challengeImageAlt: "CoLab Report — core value prop mockup",
    sections: [
      {
        title: "Learning the problem, audience, and vision",
        eyebrow: "Kickoff",
        content:
          "Before designing, the team met repeatedly with the CEO, CTO, and Head of Customer Success to understand the industry problem, the vision for solving it, and the audience.",
        image: "/projects/brand-x-brand-collaboration/placeholders/colab-board.svg",
        imageAlt: "FigJam kickoff and discovery planning board",
        subItems: [
          {
            title: "Finding the minimum needed for GTM",
            content:
              "Next came the most logical MVP to take to market — worked out closely with the CTO to fit the timeframe.",
          },
        ],
      },
      {
        title: "Deliver value as a service before automating it",
        eyebrow: "Insights",
        content: "",
        subItems: [
          {
            title: "Customer data needed to be collected over time",
            content:
              "The CoLab report — the core value prop — depends on data gathered from each company over time. The MVP automated what it could so it looked and acted like software, while delivering value as a service first.",
          },
          {
            title: "Value for customers was still iterating as a service",
            content:
              "The report was early in conception and changing daily based on feedback, so it stayed manual rather than automated.",
          },
          {
            title: "Simple to start, then time to learn and iterate",
            content:
              "With the service evolving quickly, the design started simple and easy to build with the chosen stack. The priority was a platform to deliver the service until it was ready to productize.",
          },
          {
            title: "Setting the stage for future complexity",
            content:
              "Simple didn't have to mean limiting: solutions had to ship quickly and still evolve with the customer.",
          },
        ],
      },
      {
        title: "Defining the minimum, and what follows",
        eyebrow: "Discovery",
        content: "",
        image: "/projects/brand-x-brand-collaboration/placeholders/reports-colab-2.svg",
        imageAlt: "CoLab report and dashboard scoping mockup",
        subItems: [
          {
            title: "The minimum: getting reports to customers",
            content:
              "At minimum, users needed to create an account, log in, and access the quarterly CoLab reports made for them. Fast follows included notifications and other engagement drivers.",
          },
          {
            title: "CoLab report to eventually be productized",
            content:
              "For now, the report would be a Keynote deck emailed by the Head of CS, with its insights moving into the software later.",
          },
        ],
      },
      {
        title: "Look like software, run as a service",
        eyebrow: "Reframe",
        content:
          "The goal was always to help customers grow through brand collaboration; discovery clarified how to get there fastest without sacrificing experience — launch, learn, and iterate.\n\nThe resulting flow looked like software to customers, while a Colaboratory team member did the work manually until automation became the priority.",
        quote:
          "...how might we provide the user an MVP version of insights on strategic collaborations for their brand?",
      },
      {
        title: "A flexible foundation built to pivot",
        eyebrow: "Strategy",
        content: "",
        carousel: [
          {
            image: "/projects/brand-x-brand-collaboration/placeholders/foundation3.svg",
            alt: "Colaboratory style guide and foundational design system",
          },
          {
            image: "/projects/brand-x-brand-collaboration/placeholders/flexibility.svg",
            alt: "Flexible and modular design exploration",
          },
          {
            image: "/projects/brand-x-brand-collaboration/placeholders/colab-reports-2.svg",
            alt: "CoLab reports UI — manual-first iterate approach",
          },
        ],
        subItems: [
          {
            title: "Build a solid foundation",
            content:
              "A style guide and carefully considered layout and navigation gave every future design a consistent base with room to grow.",
          },
          {
            title: "Design with flexibility",
            content:
              "Visions evolve and pivot, so the product was designed to adapt when this one did.",
          },
          {
            title: "When you can't automate, iterate",
            content:
              "Moving fast meant being deliberate about what to build: nice-to-haves couldn't slow the launch, and choosing what to automate first mattered most.",
          },
        ],
      },
      {
        title: "Sign-up, a reports dashboard, and a branded login",
        eyebrow: "MVP",
        content: "",
        image: "/projects/brand-x-brand-collaboration/placeholders/mvp.svg",
        imageAlt: "Full MVP scope overview diagram",
        subItems: [
          {
            title: "New member sign in flow",
            content:
              "Anyone could sign up, but closing a sale required an in-person meeting to learn about the company. So the MVP's request-info form automatically emailed to book that meeting, and accounts were set up manually after the sale.",
            image: "/projects/brand-x-brand-collaboration/placeholders/prod-landing.svg",
            imageAlt: "New member landing and sign-up page",
          },
          {
            title: "Dashboard to view all CoLab reports & Playbooks",
            content:
              "Beta customers received hand-delivered reports, so the MVP needed a way for CS to deliver each one and for customers to view them all. It started as a list and quickly grew to include resources that support decisions.",
            image: "/projects/brand-x-brand-collaboration/placeholders/prod-sign-in.svg",
            imageAlt: "Dashboard showing CoLab reports list view",
          },
          {
            title: "Login page for existing customers",
            content:
              "New members needed a way back into what they'd bought. Built on an existing framework with elements from the brand team, the login carried the right brand voice.",
            image: "/projects/brand-x-brand-collaboration/placeholders/prod-discover-brand-2.svg",
            imageAlt: "Login page — brand-forward sign-in experience",
          },
          {
            title: "Further anticipating user needs + exploration",
            content:
              "Beyond the core MVP, the team explored what came next: dashboard iterations, brand and user profiles, user management, a discover page, and tools for starting and managing collaborations.",
          },
        ],
      },
      {
        title: "Handed off and taken to market",
        eyebrow: "Launch",
        content:
          "The engagement wrapped as planned: the MVP scope — sign-up flow, reporting dashboard, and foundational design system — was defined and handed off for development as the High Alpha placement ended. Colaboratory took it to launch, onboarding beta customers and generating new leads on that foundation.\n\nThe exploration beyond the MVP has continued to inform the product, even where specific designs changed.",
        carousel: [
          {
            image: "/projects/brand-x-brand-collaboration/placeholders/clab.svg",
            alt: "Live Colaboratory product — launch screenshot 1",
          },
          {
            image: "/projects/brand-x-brand-collaboration/placeholders/clab2.svg",
            alt: "Live Colaboratory product — launch screenshot 2",
          },
          {
            image: "/projects/brand-x-brand-collaboration/placeholders/clab3.svg",
            alt: "Live Colaboratory product — launch screenshot 3",
          },
        ],
      },
    ],
  },
  {
    slug: "seo-keyword-research",
    title: "SEO Keyword Research",
    subtitle: "Providing product vision & feature breakdown for implementation",
    description:
      "Product vision and feature breakdown for Demandwell's keyword research tools.",
    tags: ["UX Research", "UX/UI Design", "Prototyping"],
    thumbnail: "/projects/seo-keyword-research/seo-keyword-research.png",
    company: "Demandwell",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    timeline: "~3 months",
    inProgress: true,
    hidden: true,
    designFilesUrl: "https://www.figma.com/design/0gg3OohniFqZpS4mEz3i5H/KWR-Step-2?node-id=1-57&p=f",
    challenge:
      "Design and build an MVP product that enables brand collaboration partnerships and go-to-market strategies.",
    overview:
      "Demandwell is an Indianapolis SEO startup of about 50 people. It pairs expert consultation with platform automation, so customers can do as much or as little themselves as they like, with tools for keyword generation, content production, performance tracking, and site monitoring.",
    sections: [],
  },
  {
    slug: "mystack",
    projectType: "vibe",
    title: "mystack",
    subtitle: "Your personal curation page",
    description:
      "A customizable page for curating and sharing the things you rely on.",
    tags: ["AI Experiment", "Cursor", "Claude"],
    thumbnail: "/projects/mystack/mystack.png",
    company: "Personal project",
    role: "Designer / builder",
    tools: ["Next.js", "React", "Tailwind"],
    timeline: "Ongoing",
    externalUrl: "https://mystack-theta.vercel.app/",
    challenge:
      "Build a personal stack page that's more than a list — something that reflects taste and intention.",
    overview:
      "mystack is a customizable personal page for curating and sharing what you rely on — tools, gear, products, content, anything.\n\nEveryone has a stack. Now there's somewhere to put it.",
    sections: [
      {
        title: "What it is",
        content:
          "A curated, interactive display of my own stack — opinionated, not exhaustive.",
      },
      {
        title: "What I focused on",
        content:
          "Layout and composition — making something simple feel polished, with clarity and character.",
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
    projectType: "vibe",
    title: "windows-ep.os",
    subtitle: "My AI Playground",
    description:
      "A playful \"OS-in-the-browser\" experiment built to explore interaction, motion, and UI vibes.",
    tags: ["AI Experiment", "Cursor", "Claude"],
    thumbnail: "/projects/window-ep.os/boot-screen.png",
    heroImage: "/projects/window-ep.os/desktop.png",
    company: "Personal project",
    role: "Designer / builder",
    tools: ["Next.js", "React", "Tailwind"],
    timeline: "Ongoing",
    externalUrl: "https://windows-ep.vercel.app/",
    challenge:
      "Create a fun, high-polish web experience that feels like a tiny operating system — without taking itself too seriously.",
    overview:
      "A sandbox for playful UI — window management, interaction patterns, and a little chaos — and for AI experiments inspired by [@ryolu](https://x.com/ryolu_). Meant to be explored, not explained.",
    sections: [
      {
        title: "What it is",
        content:
          "A vibe-first build aimed at delight: familiar OS patterns, quick interactions, and small details that make it feel alive.",
      },
      {
        title: "What I focused on",
        content:
          "Responsiveness, layering, and micro-transitions that stay snappy as complexity grows.",
        bullets: [
          "Window-like UI patterns",
          "Motion + feedback for interactions",
          "A cohesive visual system that still feels playful",
        ],
      },
    ],
  },
  {
    slug: "this-site-you-are-on",
    projectType: "vibe",
    title: "this site you are on",
    subtitle: "Portfolio",
    description:
      "A hand-coded portfolio with full control over layout, motion, and experiments.",
    tags: ["AI Experiment", "Cursor", "Claude"],
    thumbnail: "/projects/this-site-you-are-on/thumbnail.png",
    heroImage: "/projects/this-site-you-are-on/thumbnail.png",
    company: "Personal project",
    role: "Designer / builder",
    tools: ["Next.js", "React", "Tailwind"],
    timeline: "Ongoing",
    challenge:
      "Replace a hosted-builder workflow with a codebase I own, without losing polish — or my budget.",
    overview:
      "I was tired of paying Webflow about $300 a year, so I vibe-coded this portfolio instead — and can now do more than Webflow allowed.",
    sections: [
      {
        title: "What it is",
        content:
          "The site you're browsing: case studies, vibe builds, and room to grow without fighting a template.",
      },
      {
        title: "What I focused on",
        content:
          "Shipping fast and building custom interactions where a no-code tool would get in the way.",
        bullets: [
          "Next.js + Tailwind for real layout control",
          "Motion and details I can iterate on freely",
          "No annual lock-in on someone else's platform",
        ],
      },
    ],
  },
];

export function getVisibleProjects(): ProjectDetails[] {
  return projects.filter((project) => !project.hidden);
}

export function getProjectBySlug(slug: string): ProjectDetails | undefined {
  const project = projects.find((project) => project.slug === slug);
  return project?.hidden ? undefined : project;
}

export function getAllProjectSlugs(): string[] {
  return getVisibleProjects().map((project) => project.slug);
}
