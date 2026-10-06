export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/** Each project picks one code-built visual. Add new ones in components/projects/visuals. */
export type ProjectVisualKind = "console" | "stream" | "feed" | "commerce" | "vision";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  /** One or two sentences shown on the homepage. */
  summary: string;
  role: string;
  technologies: string[];
  visual: ProjectVisualKind;
  /** Optional real screenshot. When set, it replaces the code-built visual. Put files in /public/projects. */
  image?: { src: string; alt: string; width: number; height: number };
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    problem: string;
    approach: string;
    highlights: { title: string; body: string }[];
    outcome: string;
  };
};

export type SkillGroup = {
  id: string;
  label: string;
  note: string;
  items: string[];
  /** Project slugs to credit explicitly; otherwise matched from project technologies. */
  usedIn?: string[];
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  summary: string;
  stack: string[];
};

export type CurrentBuild = {
  name: string;
  description: string;
  stage: string;
  updated: string; // ISO date
  focus: string[];
};
