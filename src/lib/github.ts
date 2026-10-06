import { github } from "@/data/portfolio";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type RepoSummary = { name: string; description: string | null; url: string; language: string | null; stars: number; pushedAt: string };
export type GitHubActivity = {
  username: string;
  publicRepos: number;
  totalContributions: number | null;
  days: ContributionDay[] | null;
  languages: { name: string; share: number }[];
  recent: RepoSummary[];
};

const opts = { next: { revalidate: github.revalidateSeconds } } as const;

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

/**
 * Real data only. Returns null when no username is configured or GitHub is unreachable,
 * and the UI renders an honest empty state instead of invented numbers.
 */
export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const username = github.username.trim();
  if (!username) return null;
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { ...opts, headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { ...opts, headers }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, opts).catch(() => null),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { public_repos: number };
    const repos = ((await reposRes.json()) as ApiRepo[]).filter((r) => !r.fork);

    const langCount = new Map<string, number>();
    for (const r of repos) if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
    const totalLang = [...langCount.values()].reduce((a, b) => a + b, 0) || 1;
    const languages = [...langCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, share: n / totalLang }));

    let days: ContributionDay[] | null = null;
    let totalContributions: number | null = null;
    if (contribRes?.ok) {
      const c = (await contribRes.json()) as { total: { lastYear: number }; contributions: ContributionDay[] };
      days = c.contributions;
      totalContributions = c.total?.lastYear ?? null;
    }

    return {
      username,
      publicRepos: user.public_repos,
      totalContributions,
      days,
      languages,
      recent: repos.slice(0, 4).map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
      })),
    };
  } catch {
    return null;
  }
}
