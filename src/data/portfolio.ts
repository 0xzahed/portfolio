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
  /** Online handle — unique, so it's the easiest thing for people to search for. */
  handle: "0xzahed",
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

const allSocials: SocialLink[] = [
  { label: "GitHub", handle: "@0xzahed", href: "https://github.com/0xzahed" },
  { label: "LinkedIn", handle: "in/your-username", href: "https://www.linkedin.com/in/your-username" }, // REPLACE
  { label: "X", handle: "@your-username", href: "https://x.com/your-username" }, // REPLACE
];

/** Placeholder profiles are left out everywhere (UI, structured data) until they're real. */
export const socials = allSocials.filter((s) => !s.href.includes("your-username"));

/* ── SEO ──────────────────────────────────────────────────── */

export const site = {
  // The one canonical address: canonical URLs, sitemap, robots and Open Graph all use it.
  url: "https://0xzahed.vercel.app",
  // ~60 chars: shown as the blue link in search results.
  title: `${person.name} (${person.handle}) — Software Engineer & Full-Stack Developer`,
  // ~155 chars: the grey snippet under it.
  description:
    "Zahed (0xzahed) is a software engineer in Dhaka, Bangladesh building SaaS platforms, web apps and APIs with Next.js, React, TypeScript, Django and PostgreSQL.",
  locale: "en_US",
  twitterHandle: "", // REPLACE with "@handle" once you have a real X account
  keywords: [
    "Zahed",
    "0xzahed",
    "Zahed software engineer",
    "software engineer Bangladesh",
    "software engineer Dhaka",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "Django developer",
    "SaaS developer",
    "web developer Bangladesh",
  ],
  /** Topics for the Person schema: what you want Google to associate you with. */
  expertise: ["Software Engineering", "Full-Stack Web Development", "Next.js", "React", "TypeScript", "Django", "PostgreSQL", "SaaS", "REST APIs", "Machine Learning"],
};

/* ── About ────────────────────────────────────────────────── */

export const about = {
  statement: ["I don't just write code.", "I build systems."],
  /** Pinned story under the statement (components/sections/AboutStory): short lines, drawn as visuals. */
  story: {
    role: "A software engineer in Dhaka.",
    scope: { text: "The whole product, end to end.", chain: ["Data models", "APIs", "Background jobs", "Interface"] },
    care: { text: "The parts nobody sees, and how it feels.", unseen: "Queries that hold at scale", felt: "Interfaces that feel right" },
    builds: { text: "What I build." },
  },
  builds: [
    "Modern web applications",
    "Scalable backend systems",
    "SaaS platforms",
    "APIs and integrations",
    "AI-powered applications",
    "Secure systems",
    "High-performance interfaces",
  ],
  /** One pinned screen per step (components/sections/Process): a short line plus three chips, drawn as a diagram. */
  process: [
    { label: "Design", text: "Problem first. Then the data, then the screen.", points: ["Data model", "User flows", "Constraints"] }, // REPLACE with your own words
    { label: "Engineer", text: "Boundaries, schemas and APIs that hold up.", points: ["Boundaries", "Schemas", "Contracts"] },
    { label: "Build", text: "Small steps, shipped often, tested.", points: ["Small steps", "Tests", "Detail"] },
    { label: "Optimize", text: "Measure, fix the bottleneck, stay fast.", points: ["Measure", "Fix", "Stay fast"] },
  ],
};

/* ── Selected work ────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: "noir-and-flame",
    title: "Noir & Flame",
    category: "Restaurant website",
    year: "2026", // REPLACE if different
    summary:
      "A cinematic restaurant site with a filterable menu and a validated booking flow.",
    role: "Design & front-end development", // REPLACE with your actual role
    // Only what's verifiable from the live site's own code and pages.
    technologies: ["Next.js", "React", "GSAP", "ScrollTrigger", "Zod"],
    visual: "commerce", // unused: the screenshot below replaces the code-built visual
    image: {
      src: "/projects/noir-and-flame.webp",
      alt: "The NOIR & FLAME restaurant website hero: the headline 'Where Fire Meets Flavor' over a live-fire video, beside a plated dessert.",
      width: 1600,
      height: 1000,
    },
    liveUrl: "https://noir-and-flame-self.vercel.app",
    caseStudy: {
      problem:
        "Restaurant sites tend to lean on atmosphere and bury the practical parts. This one keeps the mood of a live-fire kitchen while making the two things guests actually come for, the menu and a table, quick to reach.", // REPLACE with the real brief
      approach:
        "A single-page Next.js site with anchored sections for the story, signature menu, experience, gallery, reservations and contact, plus dedicated menu and reservations pages. Scroll animation runs on GSAP ScrollTrigger, and the booking form is validated with Zod.",
      highlights: [
        { title: "Filterable menu", body: "Starters, main courses, pasta, desserts and drinks each have a filter, and every dish carries dietary tags, so guests find what they can eat quickly." },
        { title: "Validated reservations", body: "Date, time, guest count and special requests are validated before anything is submitted. The flow runs in demo mode, so requests are checked but never stored or sent." },
        { title: "Scroll-driven story", body: "A video hero, the restaurant's story and the chef profile reveal as you scroll, with GSAP ScrollTrigger driving the motion." },
      ],
      outcome:
        "Live as a demo. The reservation flow is deliberately in demo mode, so no requests are stored or sent.", // REPLACE with a real outcome
    },
  },
];

/* ── Engineering ──────────────────────────────────────────── */

export const skills: SkillGroup[] = [
  { id: "frontend", label: "Frontend", note: "Interfaces that load fast and feel deliberate.", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { id: "backend", label: "Backend", note: "Domain-driven services with clear boundaries.", items: ["Python", "Django", "Node.js", "REST APIs", "WebSockets"] },
  { id: "data", label: "Database", note: "Schemas that enforce the rules themselves.", items: ["PostgreSQL", "MySQL", "Redis"] },
  { id: "ai", label: "AI / ML", note: "Models evaluated honestly, not just trained.", items: ["Python", "PyTorch", "TensorFlow", "Computer Vision"] },
  { id: "devops", label: "DevOps", note: "Reproducible from laptop to server.", items: ["Linux", "Docker", "Nginx", "Cloud", "CI/CD"] },
  { id: "security", label: "Security", note: "Tested from the attacker's side.", items: ["Web Security", "API Security", "Authentication", "OWASP"] },
];

/* ── Experience ── REPLACE every entry with your real history ── */

export const experience: ExperienceItem[] = [
  {
    period: "2026",
    role: "Software Engineer",
    org: "DevToSoft", // REPLACE — verify title and company
    summary: "Leading product engineering, from schema design to deployment.",
    stack: ["Next.js", "Django", "PostgreSQL", "Docker"],
  },
  {
    period: "2025",
    role: "Full-Stack Developer",
    org: "Freelance", // REPLACE
    summary: "Built web platforms for clients.",
    stack: ["Next.js", "Django"],
  },
  {
    period: "2024",
    role: "Web Developer",
    org: "Independent", // REPLACE
    summary: "Shipped MERN web applications.",
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
  username: "0xzahed",
  revalidateSeconds: 60 * 60 * 24,
};

/* ── Currently building ───────────────────────────────────── */

export const currentlyBuilding: CurrentBuild = {
  name: "Examrena",
  tagline: "Exam prep for Bangladeshi students.",
  description:
    "An exam-preparation platform for Bangladeshi students — practice tests, instant results, and progress that actually means something.",
  stage: "Planning the platform and building the website",
  updated: "2026-10-06",
  focus: ["Information architecture", "Question bank model", "Next.js site"],
};

/* ── Philosophy ───────────────────────────────────────────── */

export const philosophy = {
  lines: ["Good software", "should feel", "invisible."],
  body: "Nobody thinks about the retries, the cache, the index. That quiet is the job.",
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
