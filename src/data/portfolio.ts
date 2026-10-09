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
    slug: "noir-and-flame",
    title: "Noir & Flame",
    category: "Restaurant website",
    year: "2026", // REPLACE if different
    summary:
      "A cinematic marketing site and table-reservation flow for a fictional live-fire restaurant, with a filterable seasonal menu and scroll-driven storytelling.",
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
  username: "0xzahed",
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
