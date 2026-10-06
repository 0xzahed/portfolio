/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file, not the components.
 *
 *  Anything marked  // REPLACE  is placeholder content.
 *  Search the file for "REPLACE" to find every one.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  CurrentBuild,
  ExperienceItem,
  Project,
  SkillGroup,
  SocialLink,
} from "@/lib/types";

/* ── Identity ─────────────────────────────────────────────── */

export const person = {
  name: "Zahed", // REPLACE with your full name if you want it shown
  shortName: "Zahed",
  role: "Software Engineer",
  roles: ["Software engineer", "Builder", "Problem solver"],
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  available: true,
  availability: "Available for selected projects",
  email: "hello@your-domain.com", // REPLACE
  intro:
    "I design and engineer scalable digital products — from the database schema to the last frame of an interface.",
};

export const socials: SocialLink[] = [
  { label: "GitHub", handle: "@your-username", href: "https://github.com/your-username" }, // REPLACE
  { label: "LinkedIn", handle: "in/your-username", href: "https://www.linkedin.com/in/your-username" }, // REPLACE
  { label: "X", handle: "@your-username", href: "https://x.com/your-username" }, // REPLACE
];

/* ── SEO ──────────────────────────────────────────────────── */

export const site = {
  url: "https://your-domain.com", // REPLACE — used for canonical URLs, sitemap and Open Graph
  title: `${person.name} — Software Engineer`,
  description:
    "Software engineer building scalable digital products, modern web applications, and intelligent systems.",
  locale: "en_US",
  twitterHandle: "@your-username", // REPLACE
  keywords: [
    "software engineer",
    "full-stack developer",
    "Next.js",
    "Django",
    "SaaS",
    "Bangladesh",
  ],
};

/* ── About ────────────────────────────────────────────────── */

export const about = {
  statement: ["I don't just write code.", "I build systems."],
  paragraphs: [
    "I'm a software engineer in Dhaka who works across the whole product: data models, APIs, background jobs, and the interface people actually touch. Most of what I build is for the Bangladeshi market, where payroll rules, payment gateways and courier networks don't fit off-the-shelf tools.",
    "I care about the parts nobody sees. Multi-tenant isolation, signed video URLs, a session model that survives three clients, a query that doesn't fall over at scale. Then I care just as much about how the result feels in the hand.",
  ],
  builds: [
    "Modern web applications",
    "Scalable backend systems",
    "SaaS platforms",
    "APIs and integrations",
    "AI-powered applications",
    "Secure systems",
    "High-performance interfaces",
  ],
  /** The four verbs cycle in order beside the About text. */
  process: ["Design", "Engineer", "Build", "Optimize"],
};

/* ── Selected work ────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: "coredesk",
    title: "CoreDesk",
    category: "SaaS platform",
    year: "2026",
    summary:
      "A multi-tenant HR, payroll and finance console built around Bangladeshi labour rules and salary structures.",
    role: "Design & full-stack engineering",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Django 5", "PostgreSQL", "Redis", "Celery", "Docker"],
    visual: "console",
    // liveUrl: "https://...", // REPLACE when public
    caseStudy: {
      problem:
        "Bangladeshi companies run payroll on spreadsheets because global HR tools don't model local salary structures, festival bonuses, or provident-fund rules. Each company also needs its data fully isolated from every other tenant.",
      approach:
        "A Django backend split into 31 domain apps over a multi-tenant PostgreSQL schema, with Celery handling payroll runs and reports off the request path. The frontend is a Next.js console using Redux Toolkit and RTK Query for cache-aware data access.",
      highlights: [
        { title: "Tenant isolation", body: "Every query is scoped to a tenant at the data layer, so one company can never read another's records — even through a buggy view." },
        { title: "Local payroll engine", body: "Salary structures, allowances and deductions are modelled as data, not code, so rule changes don't need a deploy." },
        { title: "Async by default", body: "Payroll runs, payslip generation and exports run as Celery jobs with Redis, keeping the console responsive under heavy months." },
        { title: "31 domain apps", body: "HR, attendance, leave, payroll, finance and operations live in separate Django apps with clear boundaries and their own tests." },
      ],
      outcome:
        "Newly launched. The platform covers HR, payroll, finance and operations in one console, containerised end to end with Docker.",
    },
  },
  {
    slug: "ieducation",
    title: "iEducation",
    category: "EdTech platform",
    year: "2025", // REPLACE if different
    summary:
      "A learning platform with protected course video, live exam results and single-device sessions across web and mobile.",
    role: "Frontend lead & security",
    technologies: ["Next.js", "Django", "Flutter", "Redux", "Bunny.net Stream", "Burp Suite"],
    visual: "stream",
    liveUrl: "https://ieducationbd.com",
    caseStudy: {
      problem:
        "Paid course videos were being shared and accounts passed between students. The platform needed to protect content and enforce one active device per account across a web app and a Flutter app.",
      approach:
        "Video moved to Bunny.net Stream behind short-lived signed URLs generated by a Next.js API route with SHA-256 token authentication. Sessions are bound to a UUID device token checked by Django middleware on every request.",
      highlights: [
        { title: "Signed, expiring video", body: "Each playback URL is signed server-side and expires quickly, so a copied link is useless minutes later." },
        { title: "One device, enforced", body: "A UserSession model and DeviceSessionMiddleware reject stale device tokens; the client shows a conflict modal instead of failing silently." },
        { title: "Three clients, one model", body: "The same session rules hold across Django, Next.js and the Flutter WebView player." },
        { title: "Tested like an attacker", body: "XSS, IDOR and injection paths were probed with Burp Suite Proxy, Repeater and Intruder before release." },
      ],
      outcome:
        "Live at ieducationbd.com with student dashboards, exam results, a bookstore and protected streaming.",
    },
  },
  {
    slug: "piku",
    title: "Piku",
    category: "Social platform",
    year: "2026", // REPLACE if different
    summary:
      "A social network with feeds, profiles and real-time interaction, built from scratch on Next.js and Django.",
    role: "Full-stack engineering",
    technologies: ["Next.js", "Django", "REST APIs", "WebSockets", "PostgreSQL"],
    visual: "feed",
    caseStudy: {
      problem:
        "A social product lives or dies on the feed: it has to load instantly, paginate without duplicates, and stay fresh while people are reading it.",
      approach:
        "Cursor-based pagination on a Django API, optimistic updates on the client, and a real-time channel for reactions and notifications.",
      highlights: [
        { title: "Stable feeds", body: "Cursor pagination means new posts never shift or duplicate what someone is already scrolling." },
        { title: "Optimistic UI", body: "Likes and comments appear immediately and reconcile with the server in the background." },
        { title: "Real-time layer", body: "Notifications and reactions arrive over a live connection instead of polling." },
      ],
      outcome: "In active development.", // REPLACE with current status
    },
  },
  {
    slug: "commerce",
    title: "Commerce Engine",
    category: "E-commerce",
    year: "2025", // REPLACE if different
    summary:
      "A mobile-first storefront wired into the payment and courier networks Bangladesh actually uses.",
    role: "Frontend engineering & integrations",
    technologies: ["React", "TypeScript", "Tailwind", "SSLCommerz", "bKash", "Pathao", "RedX", "Steadfast"],
    visual: "commerce",
    caseStudy: {
      problem:
        "Online stores in Bangladesh need bKash, card payments through SSLCommerz and cash on delivery side by side, then hand each order to whichever courier serves the area.",
      approach:
        "One checkout flow with interchangeable payment adapters, and a fulfilment layer that books Pathao, RedX or Steadfast and surfaces tracking back to the customer.",
      highlights: [
        { title: "Payment adapters", body: "SSLCommerz, bKash and COD share one interface, so adding a gateway doesn't touch the checkout UI." },
        { title: "Courier routing", body: "Orders are handed to Pathao, RedX or Steadfast and their tracking events feed a single shipment timeline." },
        { title: "Pixel-matched UI", body: "Campaign countdowns, staggered category layouts and a notched bottom navigation built to match the design exactly." },
      ],
      outcome: "Shipped storefront UI with live payment and courier integrations.", // REPLACE with real outcome
    },
  },
  {
    slug: "sunflower-vision",
    title: "Leaf Vision",
    category: "Deep learning research",
    year: "2025", // REPLACE if different
    summary:
      "Sunflower leaf disease detection with a DenseNet201 transfer-learning model, validated with K-fold cross-validation.",
    role: "Research & model engineering",
    technologies: ["Python", "TensorFlow", "DenseNet201", "Computer Vision", "Kaggle"],
    visual: "vision",
    caseStudy: {
      problem:
        "Farmers often notice sunflower leaf disease too late. Image classification can flag it early, but small agricultural datasets make models easy to overfit.",
      approach:
        "Transfer learning on DenseNet201 with a frozen ImageNet base and a light classification head, evaluated with K-fold cross-validation so every image is tested once.",
      highlights: [
        { title: "Frozen backbone", body: "Keeping DenseNet201 frozen lets a small dataset train a reliable head without destroying pretrained features." },
        { title: "K-fold validation", body: "Results are averaged across folds instead of trusting one lucky split." },
        { title: "Reproducible", body: "Packaged as a Kaggle notebook so the full pipeline can be rerun end to end." },
      ],
      outcome: "Research model and notebook complete.", // REPLACE with accuracy / publication details
    },
  },
];

/* ── Engineering ──────────────────────────────────────────── */

export const skills: SkillGroup[] = [
  { id: "frontend", label: "Frontend", note: "Interfaces that load fast and feel deliberate.", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { id: "backend", label: "Backend", note: "Domain-driven services with clear boundaries.", items: ["Python", "Django", "Node.js", "REST APIs", "WebSockets"] },
  { id: "data", label: "Database", note: "Schemas that enforce the rules themselves.", items: ["PostgreSQL", "MySQL", "Redis"] },
  { id: "ai", label: "AI / ML", note: "Models evaluated honestly, not just trained.", items: ["Python", "PyTorch", "TensorFlow", "Computer Vision"], usedIn: ["sunflower-vision"] },
  { id: "devops", label: "DevOps", note: "Reproducible from laptop to server.", items: ["Linux", "Docker", "Nginx", "Cloud", "CI/CD"] },
  { id: "security", label: "Security", note: "Tested from the attacker's side.", items: ["Web Security", "API Security", "Authentication", "OWASP"], usedIn: ["ieducation", "coredesk"] },
];

/* ── Experience ── REPLACE every entry with your real history ── */

export const experience: ExperienceItem[] = [
  {
    period: "2026",
    role: "Software Engineer",
    org: "DevToSoft", // REPLACE — verify title and company
    summary: "Leading product engineering on multi-tenant SaaS, from schema design to deployment.",
    stack: ["Next.js", "Django", "PostgreSQL", "Docker"],
  },
  {
    period: "2025",
    role: "Full-Stack Developer",
    org: "Freelance", // REPLACE
    summary: "Built web platforms for clients, including protected video streaming and single-device authentication.",
    stack: ["Next.js", "Django", "Flutter", "Bunny.net"],
  },
  {
    period: "2024",
    role: "Web Developer",
    org: "Independent", // REPLACE
    summary: "Shipped MERN applications and pixel-matched storefronts with local payment integrations.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
  },
];

export const education = {
  degree: "BSc in Computer Science & Engineering",
  school: "Daffodil International University",
};

/* ── Activity ─────────────────────────────────────────────── */

export const github = {
  /**
   * Set your GitHub username to show live repositories, languages and
   * contributions (fetched at build time, refreshed daily). Leave empty
   * to show an empty grid — nothing is ever invented.
   */
  username: "", // REPLACE e.g. "zahed"
  revalidateSeconds: 60 * 60 * 24,
};

/* ── Currently building ───────────────────────────────────── */

export const currentlyBuilding: CurrentBuild = {
  name: "Examrena",
  description:
    "An exam-preparation platform for Bangladeshi students — practice tests, instant results, and progress that actually means something.",
  stage: "Planning the platform and building the website",
  updated: "2026-10-06",
  focus: ["Information architecture", "Question bank model", "Next.js site"],
};

/* ── Philosophy ───────────────────────────────────────────── */

export const philosophy = {
  lines: ["Good software", "should feel", "invisible."],
  body: "When it works, nobody thinks about the retries, the cache, the index, or the twelve edge cases handled before lunch. They just get their payslip, watch their lesson, receive their parcel. That quiet is the job.",
};

/* ── Contact ──────────────────────────────────────────────── */

export const contact = {
  heading: ["Let's build", "something."],
  subtext: "Have an idea, product, or problem worth solving?",
  cta: "Start a conversation",
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
