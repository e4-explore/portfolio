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
  quote?: string;
  carousel?: ProjectCarouselSlide[];
}

export const projects: ProjectDetails[] = [
  {
    slug: "hudl-for-parents",
    title: "Hudl for Parents",
    subtitle: "Expanding Hudl's offering to a new market while consolidating and rebuilding the foundation",
    description:
      "Taking a new product to market for parents — Hudl's first entirely new user type — while consolidating two existing apps to cut cost and rebuilding platform navigation for every role.",
    tags: ["UX Research", "Product Strategy", "UX/UI Design"],
    thumbnail: "/projects/hudl-for-parents/hudl for parents - project cover.jpg",
    company: "Hudl",
    role: "Sr. Product Designer",
    tools: ["Figma", "Miro", "Claude", "NotebookLM", ],
    timeline: "6 months → Spring Alpha → Fall Beta",
    inProgress: true,
    challengeTitle: "A new user type, a mental model shift, and two apps becoming one",
    challenge:
      "Hudl had spent years building for coaches, athletes, and administrators — but never for the people cheering from the sidelines. This project set out to bring an entirely new product to market for parents ahead of a 2026 general-availability launch, while using the moment to fix two problems that had been building for years: two overlapping apps splitting the experience, and a navigation model that hadn't kept pace with what Hudl had become for any role.",
    challengeBullets: [
      "Define and validate an MVP for a completely new user type — parents — to lay the groundwork for an entirely new, currently untapped revenue line",
      "Consolidate two existing apps into one, delisting the duplicate app and setting up the migration to eliminate its infrastructure and engineering overhead",
      "Fix a platform-wide navigation and information architecture problem for every role, not just the new one — a year-old issue that had gone unaddressed",
    ],
    overview:
      "Hudl is a sports performance platform used by coaches, athletes, and administrators for video, analytics, and team communication. Parents and fans had always been adjacent to that experience — watching games, tracking highlights — but never a first-class user type with a product built for them.\n\nThis project set out to change that: research and design a new product for parents from scratch, with the long-term goal of a monetizable subscription for this audience. Rather than treat it as an isolated 0→1 build, the project became the forcing function for two other long-standing problems — consolidating two existing apps into one, and rebuilding Hudl's navigation and mental model for every role, not just this new one.",
    sections: [
      {
        title: "At a Glance",
        content:
          "The rest of this case study walks through how the project unfolded — but a few things are worth surfacing up front: a mid-pilot data reframe that reset the roadmap, leadership that extended past this one workstream, and hands-on contribution beyond design files.",
        bullets: [
          "Reframed the core assumption using pilot data, not instinct — this was an activation problem, not a retention one, and that distinction reset the roadmap heading into GA",
          "Led a platform-wide navigation and IA fix that shipped for every role, not just parents, and advised other designers to keep it consistent outside this workstream",
          "Went beyond design files: wrote and merged real pull requests, and built Claude Skills tooling to help the wider team move faster",
        ],
      },
      {
        title: "Kickoff — Starting with a user type that didn't exist yet",
        content:
          "There was no backlog of parent research to pull from — Hudl had never designed for this audience as a first-class user. The starting point wasn't a feature list, it was a question: what job is a parent actually trying to get done, and how much of that could realistically ship as an MVP versus live on a longer roadmap toward a paid offering?\n\nRather than design toward a fully-formed vision, the approach was deliberately staged: figure out the smallest version of the experience that would be genuinely useful, ship it as an alpha, and let real usage tell us what to build next.\n\nWhat did already exist was a list of known usability problems in the legacy Fan app more broadly — missing or empty content when video, schedules, or rosters hadn't been published yet, reliability issues around the handoff between livestreams and replays, difficulty finding relevant teams and content, trust in whether schedules and data were current, and friction around purchases and refunds. Knowing that list going in shaped what could realistically be folded into this project versus tackled separately.",
      },
      {
        title: "Early Insights",
        content: "",
        subItems: [
          {
            title: "A new user, but a familiar navigation problem",
            content:
              "Early discovery kept surfacing an information architecture and mental-model problem that predated this project by about a year — one flagged in the legacy app but never prioritized. Designing a coherent experience for a brand-new user type made that gap impossible to ignore, and it turned out to be the right forcing function to finally fix it — for every role, not just parents.",
          },
          {
            title: "Two apps, one job",
            content:
              "Parents (and plenty of existing users) were regularly bouncing between two separate apps to get a complete picture of what was happening with their athlete. That splintering pointed toward consolidation being just as important to the new experience as any new screen.",
          },
          {
            title: "MVP first, subscription second",
            content:
              "The long-term goal was a monetizable subscription for this new audience, but committing to what's monetizable before anyone had used the product would have been guessing. The early strategy was to set a foundation — ship an MVP, learn fast, and let real usage tell us what's actually worth paying for.",
          },
        ],
      },
      {
        title: "Discovery — Scoping the MVP without the roadmap in hand",
        content: "",
        subItems: [
          {
            title: "Defining the smallest useful version",
            content:
              "With no existing product to iterate on, the challenge was ruthlessly scoping what belonged in an initial alpha versus what could wait. The goal wasn't feature completeness — it was validating that parents would find enough value to keep coming back, without over-investing in directions that hadn't been tested.",
          },
          {
            title: "A navigation audit across every role",
            content:
              "Revisiting the year-old navigation pitch meant going back through the feedback pattern that had been accumulating from coaches, athletes, and admins — not just parents — to make the case that this was a platform-wide fix, not a one-off for the new experience.",
          },
          {
            title: "Setting up for rapid iteration",
            content:
              "Because so much about this user type was unproven, the emphasis was on building the muscle for fast testing and iteration — instrumenting the alpha to learn quickly rather than trying to get everything right on the first attempt.",
          },
          {
            title: "Turning feedback into signal, not guesswork",
            content:
              "To make sure the right problems were being prioritized rather than working off anecdotes, a feedback pipeline was set up on top of in-app comments, using AI-assisted text analysis to sort raw feedback into recurring categories and themes automatically. Paired with a fan feedback dashboard tracking sentiment trends over time and segmentable by cohort, it gave the team a repeatable way to check that new work was actually addressing what fans and parents cared about most, and a step toward spotting emerging issues early rather than only reacting once they'd become widespread complaints.",
          },
          {
            title: "Not breaking it for everyone else already there",
            content:
              "The legacy app wasn't used exclusively by parents — coaches used it to analyze games, recruiters browsed player profiles, and plenty of traffic came from roles the redesign wasn't primarily built for. Any changes had to serve the new parent experience without quietly breaking value for the mix of other people already relying on the app for very different jobs.",
          },
          {
            title: "Mapping the problem space in detail",
            content:
              "Once the feedback pipeline was running, a clearer picture came into focus: parents expected far more live and on-demand video to already be available than the app actually had. Teams were hard to find and search, pushing people into workarounds just to follow their own kid. The handoff between a livestream and its replay was unreliable, with no good way to communicate delays or early endings. Things the app already knew about a person — their location, their favorited teams — weren't being used to shape what they saw first. And every team or org profile looked nearly identical, creating what the team started calling \"profile blindness.\" Underneath all of it was a quieter signal: parents already sensed there was more content available inside Hudl's main app than in the dedicated fan experience — reinforcing that consolidation, not just a fresh coat of UI, was the right move.",
          },
        ],
      },
      {
        title: "Reframing the Problem",
        quote:
          "...how might we bring an entirely new user type into Hudl for the first time, without asking every existing user to live with a fragmented, outdated foundation while we do it?",
        content:
          "The project could have shipped narrowly — a new app, for a new user, sitting alongside everything else Hudl already had. Instead, it became clear the bigger opportunity — and the harder problem — was doing this in a way that made the whole platform better: one consolidated experience instead of two, and a navigation model that made sense for everyone using Hudl, not just the newest audience.",
      },
      {
        title: "Design Strategy",
        content: "",
        subItems: [
          {
            title: "Ship the alpha, then let it teach you",
            content:
              "Rather than design a fully-scoped product up front, the strategy was to get a real, usable version of the parent experience in front of real users as early as possible, treating the alpha period as the primary research tool for what to build next.",
          },
          {
            title: "Getting hands-on: design engineering with AI tooling",
            content:
              "Part of the contribution went beyond design files. This work included writing and merging real pull requests, and building tooling around Claude Skills to help the broader team move faster without cutting corners on quality — automating repetitive parts of the workflow so more time could go toward the harder design and product problems.",
          },
          {
            title: "Fix the foundation once",
            content:
              "Rebuilding navigation and information architecture is disruptive, so it needed to happen deliberately and once — designed to hold up for the new parent experience and for every existing role, rather than patched around the new addition.",
          },
          {
            title: "Design the seams for monetization, don't build it yet",
            content:
              "Knowing a subscription was the eventual goal shaped how flows and permissions were structured, without committing to specific paywalls or pricing before there was evidence of what parents would actually value enough to pay for.",
          },
          {
            title: "Advising beyond this workstream",
            content:
              "Because the navigation changes touched surfaces well outside this one workstream, part of the role involved advising other designers working in similar areas — providing insight and direction so the fix stayed consistent across the parts of the product this project didn't directly own. The same was true of the underlying app consolidation: the technical migration was engineering-led, but the strategy for how the two experiences should actually come together was shaped heavily through cross-functional working sessions this role helped push forward.",
          },
          {
            title: "Working across product, UX, marketing, and engineering",
            content:
              "None of this happened in a single-discipline lane. Getting a new user type, a platform-wide navigation fix, and an app consolidation all moving together took tight, continuous collaboration across product, UX, marketing, and engineering — aligning on scope, sequencing the consolidation around the parent rollout, and making sure outreach and messaging matched what the product could actually deliver at each stage.",
          },
        ],
      },
      {
        title: "The MVP — Consolidation, navigation, and a new experience",
        content: "",
        subItems: [
          {
            title: "Merging two strong products, not rescuing one",
            content:
              "The consolidation wasn't a case of quietly folding a struggling app into a stronger one. Over the year leading into this project, the standalone Fan app had turned around dramatically — NPS climbing from -5 to 30 — and the app climbing into the top ranks of free sports apps on the App Store, at times outperforming Hudl's own flagship app in the charts. Consolidating it wasn't damage control; it was combining two products that had each already proven their value into one experience instead of splitting user attention across both.",
          },
          {
            title: "One experience instead of two",
            content:
              "Two existing apps were consolidated into a single experience during this project — a decision that removed a real source of user confusion and, as a byproduct, cleared the way to delist one app from app stores, with the migration now underway to fully sunset it and eliminate the duplicate infrastructure and engineering overhead split across two codebases.",
            image: "/projects/hudl-for-parents/hudl for parents - multiple apps.jpg",
            imageAlt: "Hudl and Hudl Fan as two separate App Store listings before consolidation",
          },
          {
            title: "A navigation model built for every role",
            content:
              "The information architecture and navigation rebuild shipped broadly, not just within the new parent experience — resolving a pattern of feedback that had been building for a year and giving every existing user type a clearer mental model of the product.",
          },
          {
            title: "The cornerstone: rethinking around the event, not just the video",
            content:
              "One idea became the foundation the rest of the new experience was built on: design around the event itself, not around whether video happened to exist for it. That reframing matched how parents actually think about a season — planning week to week around this week's events — rather than a video-first model that left a dead end any time a stream fell through or hadn't posted yet. It gave every game a reliable page to land on regardless of what content was available, and created a foundation other ideas — schedules, live data, comparisons — could be layered onto later. That event-first page became the anchor the rest of the parent experience was designed around.",
          },
          {
            title: "A closed pilot, built to be tested",
            content:
              "Before any broader rollout, the parent experience shipped as a closed pilot to a small group of real teams and families — an athlete-centric way to follow a season through video, schedules, messaging, athlete and team profiles, and livestreams, without needing a coach or admin role. Features rolled out progressively over the pilot rather than all at once, so each addition could be watched in isolation: messaging and calendar first as the foundation, then video and highlight moments, athlete and team profiles, livestreams, search, sharing, and ticketing.",
          },
        ],
      },
      {
        title: "Pilot Learnings — Turning Data Into a New Point of View",
        quote:
          "...the data wasn't telling us retention was broken — it was telling us most parents never found the experience in the first place. We weren't fighting a retention problem. We were fighting an activation problem.",
        content:
          "Running a closed pilot only matters if it changes what you believe. Overall engagement across the cohort landed around 40% — enough real signal, for an unmarketed alpha, to draw conclusions from. A handful of patterns came out of this one clearly enough to reshape the point of view heading into a wider rollout.",
        subItems: [
          {
            title: "Reframing the problem: activation, not retention",
            content:
              "90% of parents who reached an event profile went on to watch video — proof the experience itself worked once people found it. But only around 6% of the pilot cohort activated to that point in the first place. The real gap was upstream: most parents simply never discovered the experience existed. That reframed the challenge for the next phase — less about polishing what already existed, more about building activation into the product itself rather than depending on outside prompts to bring people back.",
          },
          {
            title: "The post-game moment is the hook",
            content:
              "Email opens across the pilot ran 42–50%, comfortably ahead of the 36.9% benchmark, but clicks told the sharper story: click-through on post-game sends ran about 4.5x the benchmark rate, while reminders sent at other times barely moved anyone. That pattern became the organizing principle for how the experience, and the prompts back into it, should be structured going forward.",
          },
          {
            title: "Parents want to create, not just consume",
            content:
              "Interview feedback was consistent: parents didn't just want to watch their athlete's highlights, they wanted to clip, share, and export them — and some were already doing it manually through desktop workarounds before any mobile tooling existed. Highlight creation and shareability turned out to be central to why the experience felt worth returning to, not a nice-to-have layered on top.",
          },
          {
            title: "Trust has to come before automation",
            content:
              "Automated highlight generation was in high demand, but when it missed a moment or mis-tagged an athlete, it quietly undercut confidence in the feature as a whole — a reminder that for something this personal, reliability has to clear a high bar before it can become a core part of the experience.",
          },
          {
            title: "\"Parent\" isn't one audience",
            content:
              "The pilot also surfaced that the adults around a team don't all play the same role — coaches, team directors/admins, and volunteer team managers each touched adoption differently, with different levels of trust and different reasons to engage. That distinction shaped how outreach and onboarding were thought about heading into a larger rollout, rather than treating every adult around a team the same way.",
          },
        ],
      },
      {
        title: "The Launch",
        content:
          "The parent experience ran as a closed pilot with real teams and families through spring 2026 before rolling out more broadly. General availability for all users follows in July 2026, with final legal and compliance review underway given the sensitivities that come with a brand-new audience segment. The app consolidation and navigation rebuild were already completed as part of getting that pilot experience ready.",
      },
      {
        title: "The Impact",
        content:
          "Design decisions on this project mapped directly onto business outcomes, not just user experience. A new, currently untapped revenue line got a validated MVP and real usage data instead of a guess. Consolidating two apps into one got the duplicate app delisted and its migration underway, on track to eliminate duplicate infrastructure and free up engineering capacity that had been split across two codebases. And a navigation fix that had been pitched — and shelved — a year earlier finally shipped, resolving a platform-wide problem for every role, not just the newest one.\n\nWith a validated point of view — that this is as much an activation challenge as a retention one — and general availability underway, the next phase is rapid testing and iteration to figure out what, specifically, is monetizable for this new user type ahead of a future subscription offering.",
        bullets: [
          "New revenue line: validated MVP and real usage data for a previously untapped user type, ahead of a future subscription offering",
          "Cost efficiency: delisted a duplicate app and kicked off the migration to eliminate its infrastructure, freeing engineering capacity that had been split across two codebases",
          "De-risked investment: proved genuine demand with a closed pilot before committing further engineering spend, rather than guessing at scale",
          "Platform health: resolved a year-old, platform-wide navigation problem affecting every role, not only the new one",
        ],
        metrics: [
          { value: "2 → 1", label: "Apps consolidated into a single experience" },
          { value: "1", label: "App delisted, migration underway to fully sunset & cut ongoing cost" },
          { value: "-5 → 30", label: "NPS swing for the Fan app in the year leading into this project" },
          { value: "90%", label: "Of pilot parents who reached an event profile went on to watch video" },
          { value: "4.5x", label: "Post-game email CTR vs. benchmark" },
          { value: "42–50%", label: "Email open rate across the pilot (vs. 36.9% benchmark)" },
        ],
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
    role: "Lead Product Designer",
    team: "Ethan Grove, Tanner Brumbarger, Justin Stanczak, Jillian Howell & Matt McKee",
    tools: ["Figma"],
    timeline: "4 weeks planning, 6 weeks development",
    overview:
      "Demandwell is a startup focused on helping customers grow their SEO organically. Their approach combines SEO expert consultation with platform automation, allowing the user flexibility depending on their own experience level. Mainly based in Indianapolis with around 50 employees.\n\nDemandwell's approach to product provides the customer with a holistic software to improve SEO — supplying users with tools for keyword generation, content production, performance tracking, and site monitoring.",
    challengeTitle: "Ordering automation, visibility & better UX",
    challenge:
      "This project stemmed from the high usage of their content product, the number of content+ customers, and the human-intensive need to service customers. The goal was to immediately impact cost-to-serve for existing customers and add assurances for customers interested in purchasing content production. The three main problems aimed to solve:",
    challengeBullets: [
      "Consultants were a bottleneck for communication & delivery",
      "Customers had no visibility on content progress after ordering",
      "Writers with lots of content struggled to stay organized",
    ],
    sections: [
      {
        title: "Kickoff — Evaluating & understanding current flows",
        content:
          "It was key to understand existing flows to improve them and seamlessly add in the new offering. The end product would allow the user to manually produce everything or pick and choose what parts of the production process they'd like to participate in. By automating this within the product, the goal was to reduce cost-to-serve for this particular segment of customers.\n\nWithin the Demandwell content production flow there are 3 main components — selecting keywords, building outlines, and writing content. These were self-service or purchasable through Demandwell. Selecting keywords and writing content were already add-ons, so the job was to fill the gap and allow premium customers to purchase content+.",
      },
      {
        title: "Early Insights",
        content: "",
        subItems: [
          {
            title: "Increase visibility and improve content quality",
            content:
              "The new flow would provide another service through the product, and supply more defined statuses and approval steps to ensure the best output, eliminating complaints and possible rework.",
          },
          {
            title: "Improvements must not disrupt current flows",
            content:
              "With many users currently using the software, any changes needed to avoid disrupting their current content production process, and had to fit or improve the current backend structure.",
          },
          {
            title: "Automation to improve scalability",
            content:
              "Many manual tasks were performed by different teams to deliver services to the customer. By automating these tedious tasks (sometimes a bottleneck in the process), the goal was to reduce cost-to-serve each new content+ customer.",
          },
        ],
      },
      {
        title: "Discovery — All users and edge cases",
        content:
          "The flows would be used by both customers and Demandwell employees fulfilling orders. With many users with different permissions and edge cases, the design needed to be simple yet complex — offering similar UI for each user with essential information and actions to complete various tasks.",
        subItems: [
          {
            title: "Statuses & sections were unclear",
            content:
              "With only three sections and limited statuses there was a lot of grey area that customer content could fall into during fulfillment. More in-depth sections and statuses would provide better insight into what part of the process an order was in without customers needing to reach out.",
          },
          {
            title: "Improving existing internal processes",
            content:
              "This project gave the company time to evaluate and improve existing internal processes at the same time.",
          },
        ],
      },
      {
        title: "Reframing the Problem",
        quote:
          "...how might we serve the new customer base within the platform and make UX improvements for existing customers without disruption?",
        content:
          "After discovery it was identified that there were more areas for improvement while adding the new service offering. As lead designer, the goal was to explore all ways to improve the current offering in a non-disruptive way while fitting in the new offering with efficiency. This resulted in a slight redesign of the content planner list page and headers throughout the flow that contained key actions dependent on user permissions.",
      },
      {
        title: "Design Strategy",
        content: "",
        subItems: [
          {
            title: "Improvement of UX overall",
            content:
              "Identifying key areas to make UX improvements for the existing and new customer base; now was a key time to iterate on the MVP product released years ago.",
          },
          {
            title: "Increased ordering visibility",
            content:
              "Statuses not being clear had to be addressed. Adding UX verbiage to clearly identify stages and more granular statuses would help visibility.",
          },
          {
            title: "Eliminate internal work",
            content:
              "With a lot of time being spent with a consultant communicating, more key actions needed to be put into the customer's hands to shift ownership.",
          },
        ],
      },
      {
        title: "UX Improvements & The New Offering",
        content: "",
        subItems: [
          {
            title: "Clearer sections & less scrolling",
            content:
              "Writers with lots of content struggled to stay organized within the Content Planner due to accordion sections containing various statuses. After release, the Content Planner was redesigned with new tabs, stages, icons, and tooltips for better organization and tracking.",
          },
          {
            title: "New statuses & notifications",
            content:
              "A lot of feedback indicated customers didn't have a clear way to understand the progress of their order. Along with clearer sections and statuses, Demandwell would now send email alerts to the user who ordered content as it progresses through writing phases.",
          },
          {
            title: "Automating ordering & outline approval",
            content:
              "New outline orders and approval were previously all via email. CPMs would create an outline, get it approved, and submit the order for the user. After launch, customers submit their own orders and approve outlines through the platform, eliminating unnecessary emails and time spent.",
          },
        ],
      },
      {
        title: "The Launch",
        content:
          "Overall the project was a success. The new offering was delivered, visibility was increased, and UX was improved for all users. Positive feedback was received from customers and internal teams.\n\nThere were some speed bumps: the project started 2 weeks later than anticipated due to bleed-over from an earlier project, and a lack of communication between FE & BE engineers caused a few things to be missed. The team came together to determine what was vital to launch vs. what could go to a backlog for later.",
      },
      {
        title: "The Impact",
        content:
          "Positive results, keeping customers more organized and responsible for the ordering process.\n\nThe project had a positive impact on overall user experience and saved time for customers and internal members (at the time of writing, 3 months since launch). Daily active users rose due to the shift of order responsibility and progress notifications. Results were recorded 45 days after launch. After launch there were 2 additional weeks of continued work on fast-follows to continue improving user experience.",
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
    hideCaseStudyMedia: true,
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
      "High Alpha (HA) is a venture capital company that provides product leadership and other needs to start-up companies to speed up scalability. HA partners with a company — usually 3–6 months — providing thought leadership and design around product.\n\nPillar is a start-up focused on improving the interviewing process with unbiased decision making. Mainly based in Indianapolis — CEO on the east coast and other employees all over the United States — with under 50 employees. On this project the team worked with the CEO and about 10 other employees on a consistent basis.",
    challengeTitle: "UX/UI overhaul including rebrand",
    challenge:
      "Our goal for this project was to enhance the Luma product offering as a whole for the new user personas, while working through a rebrand — without constraining new ideas or innovations from being suggested or implemented. The ambition was to create a more user-friendly product with a strong foundation that embraced a rapidly evolving business.",
    challengeBullets: [
      "Update the platform to better reflect the new brand and user personas",
      "Create a platform that is easy to use & understand to encourage engagement",
      "Make improvements & innovations to existing UI and UX flows",
    ],
    challengeImage: "/placeholder.svg",
    challengeImageAlt: "Luma — existing product before rebrand (luma2.jpeg)",
    sections: [
      {
        title: "Kickoff — Starting with the user personas",
        content:
          "Before designing, the team needed to gain more insights about the new user personas. To learn more, they paired with the CEO, and occasionally the Head of Customer Service, to get a better picture of what each customer segment needed.",
        image: "/placeholder.svg",
        imageAlt: "FigJam planning and discovery whiteboard (board-3.png)",
        subItems: [
          {
            title: "Defining what is first to work on",
            content:
              "With a fully fleshed-out platform there were a lot of options for what to work on first. The team organized product offerings in a way that grouped them together logically, exposing gaps in the information architecture that needed to be filled or anticipated to be needed soon.",
          },
        ],
      },
      {
        title: "Early Insights",
        content: "",
        subItems: [
          {
            title: "Design system needed updating",
            content:
              "The design system in place was limited, but core functionality was there. Each component needed revamping due to the new brand. The team experimented with more intuitive UI components and flows while mixing in various brand elements to see what worked.",
          },
          {
            title: "Functionality mostly there, but flows were not",
            content:
              "Core functions of recording interviews and leaving basic highlights were available, but flows to bring that information forward to the user afterwards were difficult. There were also gaps within the Information Architecture that were skipped due to GTM reasons.",
          },
          {
            title: "Most used vs. most important pages",
            content:
              "Users spent most of their time on the interview page watching highlights, but finding specific interviews or highlights was a chore. Comparing candidates or interviews required having multiple tabs open. There were lots of opportunities to replace workarounds that current users had developed on their own.",
          },
        ],
      },
      {
        title: "Discovery — What is most important to the new user personas",
        content: "",
        image: "/projects/interview intelligence/persona-flows.png",
        imageAlt: "User persona diagram — Hiring Managers, Interviewers, and Recruiters",
        subItems: [
          {
            title: "Most used vs. most important actions",
            content:
              "With new user personas in mind it was important to think through the key actions to get the user to their \"aha moment\" — letting the user naturally find value in the platform to create a helpful and sticky product.",
          },
          {
            title: "What can a user do vs. what can a user see",
            content:
              "Early on it was identified that there were three different customer personas to account for: Hiring Managers, Interviewers, and Recruiters. Within each role there are different goals each is trying to achieve. The team worked with the CEO and other stakeholders to identify high-level permissions and the key actions each user needed to complete their goals.",
          },
        ],
      },
      {
        title: "Reframing the Problem",
        content:
          "After the launch of Luma, it was discovered that the \"user\" the product was built for was incorrect.\n\nThe intended user was assumed to be the hiring manager, since they were in charge of making the final decision. In reality, the hiring manager has a handful of other duties and delegates their responsibilities a majority of the time if they have the resources. This resulted in low platform usage and negative mental perception of the product.\n\nThis begged the question: how might we help the hiring manager's resources provide unbiased data to help them make a better decision? This resulted in a redesign of current functionality and user flows tailored for interviewers and recruiters to provide perspective for the decision maker.",
        quote:
          "...how might we help interviewers and recruiters provide unbiased opinions to assist hiring managers in making better decisions?",
      },
      {
        title: "Design Strategy",
        content: "",
        carousel: [
          {
            image: "/placeholder.svg",
            alt: "Updated Pillar design system and style guide (style-guide.png)",
          },
          {
            image: "/placeholder.svg",
            alt: "Simplified user flow diagram (simplified-flows.png)",
          },
          {
            image: "/placeholder.svg",
            alt: "Before/after UI comparison (comparison.png)",
          },
        ],
        subItems: [
          {
            title: "Updating to the new brand",
            content:
              "Updating the style guide and creating new components while also finding the best ways to implement brand voice and tone into the UX copy and UI elements.",
          },
          {
            title: "Simplifying flows",
            content:
              "The software needed to be intuitive, but also simple for the user. Eliminating unnecessary actions so the user could focus on the important tasks at hand.",
          },
          {
            title: "Designing with empathy",
            content:
              "All information on each screen had to be thoughtfully designed to the user persona that would be using it. Thinking through all edge cases that could happen.",
          },
        ],
      },
      {
        title: "The Redesign",
        content: "",
        subItems: [
          {
            title: "Highlighting key moments with ease",
            content:
              "Being one of the most important tools, it was essential that gathering feedback during the interview process should be as easy as possible. Utilizing the existing Zoom integration, the team redesigned the user interactions of creating highlights, grading questions, and taking notes mid-interview.",
            image: "/placeholder.svg",
            imageAlt: "Redesigned Zoom integration and in-interview UI (zoom-app.png)",
          },
          {
            title: "Providing top candidates front and center",
            content:
              "The roles page redesign included a candidate list with the top two candidates surfaced at the top based on the interview scoring system. This was intended to eliminate option paralysis for hiring managers who might only want to choose between the top two or three candidates.",
            image: "/placeholder.svg",
            imageAlt: "Old vs. new candidate list side-by-side comparison (hero-side-by-side.png)",
          },
          {
            title: "Reducing friction on creating & sharing highlights",
            content:
              "The first implementation of creating & sharing highlights post-interview were possible, but needed an upgrade. Allowing the user to easily grab certain parts of transcription or even just apply simple timestamped feedback while rewatching.",
            image: "/placeholder.svg",
            imageAlt: "Redesigned transcript and highlight creation UI (transcript.png)",
          },
          {
            title: "Analytics & innovation",
            content:
              "After the core parts of the platform were redesigned and updated with the new brand, there was time to innovate within the interview decision space — working with analytics, dashboards, and any information considered useful to making better hires.",
            image: "/placeholder.svg",
            imageAlt: "New analytics and candidate dashboard (analytics-candidate.png)",
          },
        ],
      },
      {
        title: "The Launch — Piece by piece for less disruption",
        content:
          "Moving in a rapid iterative process, the team pushed updates in the smallest chunks possible — page by page, feature by feature, or flow by flow depending on the complexity and usage of what was being redesigned. Visual design was polished and functional details were improved as it was being developed. This process allowed users to notice updates in an iterative way, decreasing the chance of being overwhelmed.",
      },
      {
        title: "The Impact — Validated beyond the engagement",
        content:
          "The redesign of the Pillar platform had a positive impact on purchasers and the interview experience as a whole. Due to the agency-like environment, the team wasn't able to stick around long enough to instrument and compare usage data directly.\n\nThe clearest long-term validation came three years later: in 2025, Pillar was acquired by Employ, carrying this 2022 redesign and rebrand forward into Employ's hiring suite rather than starting over. Work that was still the foundation worth acquiring three years on is its own kind of proof.",
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
    hideCaseStudyMedia: true,
    company: "High Alpha x Colaboratory",
    role: "Lead Product Designer",
    team: "Ethan Grove, Chad Hostetter, Kristin Martin & Colaboratory Team",
    tools: ["Figma"],
    timeline: "~3 months",
    overview:
      "High Alpha (HA) is a venture capital company that provides product leadership and other needs to start-up companies to speed up scalability. HA partners with a company — usually 3–6 months — providing thought leadership and design around product.\n\nColaboratory is a start-up focused on creating brand collaboration opportunities for its members. Mainly based in Minneapolis — CEO, CTO, and head of customer success — with under 10 employees. On this project the team worked with all employees on a consistent basis.",
    challengeTitle: "GTM with a brand collaboration platform",
    challenge:
      "Our goal for this project was to take a problem identified by the CEO and expand on his vision for a product that would disrupt the marketing industry. The premise for the product would help brands collaborate with each other by suggesting strategic collabs based on science and data, recommending plans of action to utilize each other's audiences.",
    challengeBullets: [
      "Collaborate with CEO and other stakeholders to solve the right problems",
      "Create a style guide and a start to a scalable component library",
      "Deliver an MVP version to be built and iterated on",
    ],
    challengeImage: "/placeholder.svg",
    challengeImageAlt: "CoLab Report — core value prop mockup (Colab-Report-ROQ.png)",
    sections: [
      {
        title: "Kickoff — Learning the problem, personas, and vision",
        content:
          "Before jumping into design, the team needed to gain more insights about the problem they would be solving in the industry, the vision of a possible solution, and the audience they would be designing for. They held several meetings with Colaboratory's CEO, CTO, and Head of Customer Success to learn more about the current standing of things.",
        image: "/placeholder.svg",
        imageAlt: "FigJam kickoff and discovery planning board (colab-board.png)",
        subItems: [
          {
            title: "Finding the minimum needed for GTM",
            content:
              "After learning as much as possible from the team, it was time to take that vision and figure out the most logical MVP that could go to market. This required working more closely with the CTO to figure out what was feasible within the timeframe.",
          },
        ],
      },
      {
        title: "Early Insights",
        content: "",
        subItems: [
          {
            title: "Customer data needed to be collected over time",
            content:
              "To fuel the CoLab report (the value prop), data from each company input within the CoLaboratory system was needed. Since an MVP approach was being taken, it was best to automate what could be automated from the start to make it look and act like software, while providing a lot of value by offering a service first.",
          },
          {
            title: "Value for customers was still iterating as a service",
            content:
              "The initial CoLab recommendation report that had been designed was in early conception and not yet automated. With the report likely to be iterated on very quickly, it was decided it would be manual from the start. Receiving feedback on a daily basis, it was best to keep the report as a service.",
          },
          {
            title: "Simple to start, then time to learn and iterate",
            content:
              "With rapid iteration of the service being provided, it was best that the design started simple and easy to implement with the selected tech stack. The top priority for the product was creating a platform to deliver the service to the customer until it was time to productize the service offering.",
          },
          {
            title: "Setting the stage for future complexity",
            content:
              "Even though the designs needed to be simple, they didn't have to prevent setting the stage for something more complex down the road. Finding unique and creative solutions that could evolve with the customer was just as important as delivering the product quickly to the marketing industry.",
          },
        ],
      },
      {
        title: "Discovery — Defining user needs and fast follows",
        content: "",
        image: "/placeholder.svg",
        imageAlt: "CoLab report and dashboard scoping mockup (reports-colab-2.png)",
        subItems: [
          {
            title: "Defining user needs and fast follows",
            content:
              "At a minimum, users needed access to the quarterly CoLab reports created for them. To achieve this, the team needed to think through user flows to create an account, log in, and access quarterly reports delivered to them. Fast follows included notifications and other things to drive engagement.",
          },
          {
            title: "CoLab report to eventually be productized",
            content:
              "The main report value prop being delivered was decided to be a keynote slide deck delivered via email by the Head of CS. The insights in the slide deck were eventually to be placed in the software in due time.",
          },
          {
            title: "Besides recommendations, what else is there?",
            content:
              "After all the MVP tasks were finalized, it was time to think past the initial launch. Exploration included: brand profiles, discovery of new brands, user profiles, user management, and collaboration projects.",
          },
        ],
      },
      {
        title: "Reframing the Problem",
        content:
          "Developing the minimum, but still delivering the best user experience with the service provided.\n\nWith discovery and exploration conducted, the team could now accurately restate the original problem. The ultimate goal was always to help customers grow by utilizing brand collaboration — but how to do that in the most efficient way possible to get to market and start learning and iterating.\n\nThis begged the question: how might we create a product that delivers the CoLab reports to customers in an intuitive way while still meeting MVP standards? This resulted in a design flow that appeared to customers on the surface to be software, but in reality was manual work being done by a CoLaboratory team member until automation was top priority.",
        quote:
          "...how might we provide the user an MVP version of insights on strategic collaborations for their brand?",
      },
      {
        title: "Design Strategy",
        content: "",
        carousel: [
          {
            image: "/placeholder.svg",
            alt: "Colaboratory style guide and foundational design system (foundation3.png)",
          },
          {
            image: "/placeholder.svg",
            alt: "Flexible and modular design exploration (flexibility.png)",
          },
          {
            image: "/placeholder.svg",
            alt: "CoLab reports UI — manual-first iterate approach (colab-reports-2.png)",
          },
        ],
        subItems: [
          {
            title: "Build a solid foundation",
            content:
              "To keep things consistent, a base for all future designs needed to be built that could evolve. A style guide was created and a lot of thought behind layout and navigation was conducted to ensure room for growth.",
          },
          {
            title: "Design with flexibility",
            content:
              "Knowing an overall vision can be helpful, but a large majority of the time that vision will evolve or pivot ever so slightly. That is why it was best to design the product with room for growth so when things do change, the team could adapt.",
          },
          {
            title: "When you can't automate, iterate",
            content:
              "When moving quickly, the team needed to be conscious of what they spent time building. Getting to market cannot be slowed down by nice-to-haves. Choosing what to automate from the start was very important.",
          },
        ],
      },
      {
        title: "The MVP",
        content: "",
        image: "/placeholder.svg",
        imageAlt: "Full MVP scope overview diagram (mvp.png)",
        subItems: [
          {
            title: "New member sign in flow",
            content:
              "The business was open to anyone signing up, but there were some restrictions to fully automating the flow at first because it required an in-person meeting to gather insights about the company and close a sale. The MVP version involved a request of info that automated an email to schedule a meeting. After the closed sale, some manual work was done to create an account for the new customer.",
            image: "/placeholder.svg",
            imageAlt: "New member landing and sign-up page (prod-landing.png)",
          },
          {
            title: "Dashboard to view all CoLab reports & Playbooks",
            content:
              "The insights and recommendations had been decided to be hand-delivered for beta customers until the product was ready. For the MVP, an avenue was needed for the CS team to deliver the report and a way for the customer to view it — and to see all reports that were delivered. Initially it started as just a list, but it quickly evolved to also show other resources to assist in making a decision.",
            image: "/placeholder.svg",
            imageAlt: "Dashboard showing CoLab reports list view (prod-sign-in.png)",
          },
          {
            title: "Login page for existing customers",
            content:
              "With new members having access to the software after account creation, there needed to be a login screen to access what they just purchased. Combining elements from the brand team and utilizing an existing framework, they designed a login that conveyed the right brand voice to users.",
            image: "/placeholder.svg",
            imageAlt: "Login page — brand-forward sign-in experience (prod-discover-brand-2.png)",
          },
          {
            title: "Further anticipating user needs + exploration",
            content:
              "After the core parts of the MVP were discovered and completed, it was time to keep diving deeper into possible use cases to anticipate user needs. Exploration areas included: dashboard iterations, brand profiles, a discover page, ways to ease collaborating, managing collaborations, and other areas.",
          },
        ],
      },
      {
        title: "The Launch",
        content:
          "This engagement wrapped as designed: the MVP scope — sign-up flow, reporting dashboard, and a foundational design system — was fully defined and handed off for development as the High Alpha placement concluded. From there, Colaboratory took the platform to launch, onboarding beta customers and generating new leads on top of the foundation built here.\n\nThe anticipatory exploration from discovery — dashboard iterations, brand profiles, a discover page — has continued to inform the product since, even where the specific designs shifted from what was originally proposed.",
        carousel: [
          {
            image: "/placeholder.svg",
            alt: "Live Colaboratory product — launch screenshot 1 (clab.png)",
          },
          {
            image: "/placeholder.svg",
            alt: "Live Colaboratory product — launch screenshot 2 (clab2.png)",
          },
          {
            image: "/placeholder.svg",
            alt: "Live Colaboratory product — launch screenshot 3 (clab3.png)",
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
      "Demandwell is a startup focused on helping customers grow their SEO organically. Their approach combines SEO expert consultation with platform automation.",
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
      "Demandwell is a startup focused on helping customers grow their SEO organically. Their approach combines SEO expert consultation with platform automation allowing the user flexibility depending on their own experience level. Mainly based in Indianapolis with around 50 employees.\n\nDemandwell's approach to product provides the customer with a holistic software to improve SEO. Supplying the user with tools for keyword generation, content production, performance tracking and site monitoring.",
    sections: [],
  },
  {
    slug: "mystack",
    projectType: "vibe",
    title: "mystack",
    subtitle: "Your personal curation page",
    description:
      "mystack is a customizable personal page where anyone can curate and share the things they rely on — tools, gear, products, content, anything.\n\nEveryone has a stack. Now there's somewhere to put it.",
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
      "mystack is a beautiful, customizable personal page where anyone can curate and share the things they rely on — tools, gear, products, content, anything.\n\nEveryone has a stack. Now there's somewhere to put it.",
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
      "Create a fun, high-polish interactive web experience that feels like a tiny operating system—without taking itself too seriously.",
    overview:
      "This project is a sandbox for playful UI: window management, interaction patterns, and a little bit of chaos. It’s meant to be explored, not explained. It’s also a space for me to explore AI experiments inspired by [@ryolu](https://x.com/ryolu_).",
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
  {
    slug: "this-site-you-are-on",
    projectType: "vibe",
    title: "this site you are on",
    subtitle: "Portfolio",
    description:
      "A hand-coded portfolio: skipping the Webflow subscription and keeping full control over layout, motion, and experiments.",
    tags: ["AI Experiment", "Cursor", "Claude"],
    thumbnail: "/projects/this-site-you-are-on/thumbnail.png",
    heroImage: "/projects/this-site-you-are-on/thumbnail.png",
    company: "Personal project",
    role: "Designer / builder",
    tools: ["Next.js", "React", "Tailwind"],
    timeline: "Ongoing",
    challenge:
      "Replace a hosted-builder workflow with a codebase I own, without losing polish—or my budget.",
    overview:
      "I was tired of paying Webflow about $300 a year, so I vibe-coded this portfolio instead—and ended up able to do more than Webflow would have allowed.",
    sections: [
      {
        title: "What it is",
        content:
          "The site you’re browsing: case studies, vibe builds, and room to grow without fighting a template or a subscription.",
      },
      {
        title: "What I focused on",
        content:
          "Shipping something fast, keeping costs predictable, and leaning into custom interactions where a no-code tool would get in the way.",
        bullets: [
          "Next.js + Tailwind for real layout control",
          "Motion and details I can iterate on freely",
          "No annual lock-in on someone else’s platform",
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
