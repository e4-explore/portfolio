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
        title: "The Impact — Positive results, but products are never finished",
        content:
          "The redesign of the Pillar platform had a positive impact on purchasers and the interview experience as a whole. Due to the agency-like environment, the team was not able to stick around long enough to see or compare data after a reasonable amount of time.\n\nEven though data was not collected, Pillar's updates have caused customers to leave amazing reviews about the improvements and the simplification of a very mundane and biased process. Pillar continues to climb in popularity and win more tech awards.",
        metrics: [
          { value: "X%", label: "Increase in DAU/MAU" },
          { value: "↓X days", label: "Time from first contact to hire" },
          { value: "↑X%", label: "New hire retention" },
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
          "Unfortunately, Ethan was not able to be around during the finish of development and the official launch of the platform due to being placed at another company that needed a full-time product designer. From what is known, the project was a success and they were able to start onboarding beta customers and generating leads for new customers to sign on.\n\nThe early discovery for anticipating user needs was also something that has now been implemented into the current product. Even though it might not be exactly the same as the exploration designs, it is similar conceptually.",
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
    subtitle: "Customizable personal pages",
    description:
      "mystack is a beautiful, customizable personal page where anyone can curate and share the things they rely on — tools, gear, products, content, anything.\n\nEveryone has a stack. Now there's somewhere to put it.",
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

export function getProjectBySlug(slug: string): ProjectDetails | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
