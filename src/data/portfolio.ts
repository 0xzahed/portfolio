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
  {
    slug: "savoria",
    title: "Savoria",
    category: "Restaurant website",
    year: "2026",
    summary:
      "A cinematic restaurant site with video hero slider, 3D signature dishes, filterable menu and a full cart-to-tracking order flow.",
    role: "Design & front-end development",
    technologies: ["Node.js", "Express", "EJS", "Three.js", "Motion"],
    visual: "commerce",
    image: {
      src: "/projects/savoria.webp",
      alt: "The Savoria restaurant website: cinematic hero with a signature dish and menu highlights.",
      width: 1600,
      height: 1000,
    },
    liveUrl: "https://restaruant-xi.vercel.app",
    caseStudy: {
      problem:
        "A restaurant prototype needed to feel premium — cinematic food presentation — while keeping ordering, cart and order tracking fully working on mid-range phones.",
      approach:
        "Server-rendered Express + EJS with a Motion-driven animation system and lazy-loaded Three.js scenes. All menu data is real and shared between server and client; cart and favorites persist in localStorage.",
      highlights: [
        { title: "Cinematic hero slider", body: "Full-width video slides with autoplay, swipe, keyboard controls and a floating 3D dish card." },
        { title: "3D signature stage", body: "A curved Three.js carousel of real dish photos with drag support and an image fallback when WebGL is unavailable." },
        { title: "Complete order flow", body: "Filterable menu, food detail with live pricing, cart with promo codes, validated checkout and animated order tracking." },
      ],
      outcome:
        "Live in production. Orders run in demo mode with an in-memory store, so they reset between serverless invocations.",
    },
  },
  {
    slug: "vendora",
    title: "Vendora",
    category: "Multi-vendor marketplace",
    year: "2026",
    summary:
      "A multi-vendor marketplace front-end with shop, product pages, cart, checkout and vendor/admin dashboards.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Zustand", "React Query"],
    visual: "commerce",
    caseStudy: {
      problem:
        "Marketplace UIs sprawl across shopper, vendor and admin views. This build needed one coherent shell for all three without a backend.",
      approach:
        "Next.js app-router site with mock data and Zustand stores, React Hook Form + Zod for forms, and role-based dashboard routes for vendors and admins.",
      highlights: [
        { title: "Three-sided product", body: "Shopper storefront, vendor dashboard and admin panel share one design system and navigation shell." },
        { title: "Polished header", body: "Sticky blurred navbar with category dropdown, search, wishlist/cart badges and active-link states." },
        { title: "Full commerce flow", body: "Category browsing, product pages, cart, checkout and order history against mock data." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — data is mock, nothing persists server-side.",
    },
  },
  {
    slug: "northwind-store",
    title: "Northwind Store",
    category: "E-commerce website",
    year: "2026",
    summary:
      "A full online store with shop, search overlay, cart drawer, checkout and account/admin areas.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Lucide"],
    visual: "commerce",
    caseStudy: {
      problem:
        "A classic storefront brief: promo bar, category browsing, search, cart and account — all working from a single codebase with no backend.",
      approach:
        "Next.js 14 with a Context + localStorage cart store, full-screen search overlay, slide-in cart drawer and mobile bottom navigation.",
      highlights: [
        { title: "Store chrome", body: "Sticky blurred header with promo bar, hover category menu, search overlay and cart drawer." },
        { title: "Mobile-first", body: "Slide-in drawer navigation plus a fixed bottom tab bar with active states." },
        { title: "Account areas", body: "Auth, account, wishlist, tracking and a 10-route admin section over mock data." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — cart and auth persist only in the browser.",
    },
  },
  {
    slug: "nexora-education",
    title: "Nexora",
    category: "Education landing page",
    year: "2026",
    summary:
      "A single-page education site with fixed nav, search overlay, pricing and contact sections.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Lucide"],
    visual: "stream",
    caseStudy: {
      problem:
        "A course-platform landing page needed anchored sections that stay reachable under a fixed header on every screen size.",
      approach:
        "One Next.js page composed of section components, a fixed blurred navbar with scroll-margin offsets and a Cmd/Ctrl+K search overlay.",
      highlights: [
        { title: "Fixed nav, no overlap", body: "Scroll-margin offsets keep every anchored section clear of the 64px header." },
        { title: "Keyboard search", body: "Cmd/Ctrl+K opens a search overlay; Escape closes menus and dialogs." },
        { title: "Accessible mobile menu", body: "Collapsible panel with aria-expanded, scroll lock and focus management." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed.",
    },
  },
  {
    slug: "forge-fitness",
    title: "Forge Fitness",
    category: "Gym website",
    year: "2026",
    summary:
      "A dark gym site with programs, trainers, classes, membership and member/admin areas.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Lucide"],
    visual: "stream",
    caseStudy: {
      problem:
        "A fitness brand needed a dark, bold marketing site plus member and admin sections, with navigation that works over video-style heroes.",
      approach:
        "Next.js with a fixed transparent-to-solid navbar, full-screen staggered mobile overlay and mock auth in localStorage.",
      highlights: [
        { title: "Adaptive header", body: "Transparent over the hero, blurred solid with shadow after scrolling, active links in brand lime." },
        { title: "Full-screen mobile nav", body: "Overlay menu with staggered links, scroll lock and Escape-to-close." },
        { title: "Programs to membership", body: "28 routes covering programs, trainers, classes, trial booking and dashboards." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — auth is mock data only.",
    },
  },
  {
    slug: "fixora",
    title: "Fixora",
    category: "Services marketplace",
    year: "2026",
    summary:
      "A home-services marketplace with provider listings, booking flow and customer/provider/admin dashboards.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Zustand", "Zod"],
    visual: "feed",
    caseStudy: {
      problem:
        "Connecting customers with service providers meant three dashboards plus a public marketplace, with role-aware navigation throughout.",
      approach:
        "Next.js with a Zustand + localStorage demo-auth layer, role-based home routing and validated forms via React Hook Form + Zod.",
      highlights: [
        { title: "Role-aware header", body: "Sticky blurred bar with prefix-matched active links and a user menu that routes by role." },
        { title: "Booking flow", body: "Service pages, provider profiles and a multi-step booking flow over demo data." },
        { title: "Three dashboards", body: "Customer, provider and admin areas sharing permission helpers and one shell." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — logins are built-in demo users only.",
    },
  },
  {
    slug: "medicale",
    title: "Medicale",
    category: "Healthcare website",
    year: "2026",
    summary:
      "A clinic site with doctors, appointments, blog and doctor/patient/admin portals.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Lucide"],
    visual: "console",
    caseStudy: {
      problem:
        "A medical practice needed a trustworthy public site plus appointment booking and separate portals for doctors, patients and admins.",
      approach:
        "Next.js with a sticky blurred navbar, slide-in mobile drawer, search and notification popovers, and mock data throughout.",
      highlights: [
        { title: "Prefix-matched nav", body: "Active states survive into subpages like doctor profiles and patient sections." },
        { title: "Drawer navigation", body: "Right slide-in mobile drawer with scroll lock, Escape-to-close and focus handling." },
        { title: "Booking + portals", body: "Appointment flow plus 27 portal routes over static mock data." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed.",
    },
  },
  {
    slug: "nohabi-hut",
    title: "Nohabi Hut",
    category: "Online store",
    year: "2026",
    summary:
      "A store with announcement bar, shop, product pages, cart drawer, checkout, tracking and bottom-tab mobile nav.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Framer Motion"],
    visual: "commerce",
    caseStudy: {
      problem:
        "A mobile-heavy shopper base needed bottom-tab navigation, a cart drawer and tracking — with active states that survive query strings and slugs.",
      approach:
        "Next.js with a sticky header, left drawer, mobile bottom tabs, cart drawer and a localStorage-backed store.",
      highlights: [
        { title: "Resilient active states", body: "Prefix matching keeps nav highlighted on filtered and product pages." },
        { title: "Store chrome", body: "Announcement bar, search with suggestions, cart drawer and order tracking." },
        { title: "Mobile shell", body: "Bottom tabs plus drawer with scroll lock and Escape-to-close." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — cart persists only in the browser.",
    },
  },
  {
    slug: "haven-estates",
    title: "Haven Estates",
    category: "Real estate website",
    year: "2026",
    summary:
      "A property site with listings, agent profiles, detail pages and a list-your-property flow.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Lucide"],
    visual: "vision",
    caseStudy: {
      problem:
        "Property browsing needed a shrinking sticky header, a utility top bar and a drawer that stays accessible on mobile.",
      approach:
        "Next.js 14 with a scroll-aware navbar, translate-x mobile drawer and mock listings over remote imagery.",
      highlights: [
        { title: "Shrinking header", body: "Padding collapses and the utility bar tucks away on scroll." },
        { title: "Active everywhere", body: "usePathname matching highlights Buy/Rent even on filtered and detail pages." },
        { title: "Listings to agents", body: "Properties, agent profiles and a list-property form over mock data." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed.",
    },
  },
  {
    slug: "sunshine-valley-school",
    title: "Sunshine Valley School",
    category: "School website",
    year: "2026",
    summary:
      "A school site with admissions, news, gallery and admin/student portals — 52 routes.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Recharts"],
    visual: "console",
    caseStudy: {
      problem:
        "The largest build in the set: public pages plus full admin SMS and student portals behind one sticky header.",
      approach:
        "Next.js with a shrinking sticky navbar, pill active states shared between desktop and mobile, and localStorage demo logins.",
      highlights: [
        { title: "One nav, two layouts", body: "Desktop pills and the mobile accordion share one prefix-match helper." },
        { title: "Portal top strip", body: "Staff and student entry points persist on desktop and inside the drawer." },
        { title: "SMS dashboards", body: "35 admin and 10 student routes with charts over mock data." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — logins are demo-only and insecure by design.",
    },
  },
  {
    slug: "securegrade",
    title: "SecureGrade",
    category: "Security scanner tool",
    year: "2026",
    summary:
      "A single-page website security scanner with scan API, history and graded results.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Mongoose"],
    visual: "console",
    caseStudy: {
      problem:
        "A security-scanner tool had no navigation at all — long result lists left users with no way back to the top.",
      approach:
        "Added a minimal sticky top bar in the app's own dark mono style; the scanner and history APIs run on Next.js route handlers with optional MongoDB.",
      highlights: [
        { title: "Minimal chrome", body: "One sticky bar with the app name — nothing else added." },
        { title: "Real scanning", body: "Scan and history endpoints work with or without a database configured." },
        { title: "Graded output", body: "Findings render as grades with a persistent history view." },
      ],
      outcome:
        "Live URL will be added once deployed. Without MONGODB_URI, history keeps working but does not persist.",
    },
  },
  {
    slug: "travelbook",
    title: "TravelBook",
    category: "Travel booking dashboard",
    year: "2026",
    summary:
      "A tour-booking dashboard with tours, bookings and seed APIs over an optional database.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Mongoose"],
    visual: "stream",
    caseStudy: {
      problem:
        "A bookings dashboard needed top-level navigation and a data layer that degrades gracefully without credentials.",
      approach:
        "Added a sticky top bar matching the dashboard theme; tours, bookings and seed APIs fall back to a file store when MongoDB is absent.",
      highlights: [
        { title: "Minimal chrome", body: "One sticky bar with the app name in the dashboard's own style." },
        { title: "Working APIs", body: "Tours, bookings and seed routes run with or without a database." },
        { title: "Graceful fallback", body: "File-store persistence keeps every feature clickable in demo mode." },
      ],
      outcome:
        "Live URL will be added once deployed. Serverless file storage is ephemeral, so data resets between invocations.",
    },
  },
  {
    slug: "travel-agency",
    title: "Travel Agency",
    category: "Travel agency website",
    year: "2026",
    summary:
      "A travel site with destinations, visas, tours, dashboards, admin panel and command-K search.",
    role: "Design & front-end development",
    technologies: ["Next.js", "React", "Tailwind", "Framer Motion"],
    visual: "stream",
    caseStudy: {
      problem:
        "58 routes across site, dashboard and admin needed one transparent-to-solid header with search and verified accessibility.",
      approach:
        "Kept the existing navbar — shrinking fixed bar with aria-current actives and a focus-trapped mobile drawer — and verified its Escape and scroll-lock behavior.",
      highlights: [
        { title: "Adaptive header", body: "Transparent over heroes, solid on scroll, shrinking from 76 to 64px." },
        { title: "Command-K search", body: "Site-wide search overlay on desktop and mobile." },
        { title: "Three areas", body: "Marketing site, user dashboard and admin panel over mock data." },
      ],
      outcome:
        "Front-end demo. Live URL will be added once deployed — dashboard data does not persist.",
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
