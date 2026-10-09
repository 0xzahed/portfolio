import { getGitHubActivity } from "@/lib/github";
import { github, projects } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { NumbersVisual, ReposVisual } from "@/components/story/activityVisuals";
import { ActivitySkyline } from "@/components/sections/ActivitySkyline";

const WEEKS = 53;

function EmptyGrid() {
  // One element drawn with CSS gradients: 53 × 7 outlined cells, no data implied.
  return (
    <div className="overflow-x-auto pb-2 [scrollbar-width:none]" aria-hidden>
      <div
        className="min-w-[640px]"
        style={{
          aspectRatio: `${WEEKS} / 7`,
          backgroundImage:
            "linear-gradient(to right, transparent calc(100% - 3px), var(--color-ink) 0), linear-gradient(to bottom, transparent calc(100% - 3px), var(--color-ink) 0), linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
          backgroundSize: `calc(100% / ${WEEKS} + 3px / ${WEEKS}) calc(100% / 7 + 3px / 7)`,
        }}
      />
    </div>
  );
}

/** Stack frequency across the selected work: derived from portfolio data, not GitHub. */
function stackFrequency(): [string, number][] {
  const map = new Map<string, number>();
  for (const p of projects)
    for (const t of p.technologies) {
      const key = t.replace(/\s\d+$/, "");
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  const top = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = top[0]?.[1] ?? 1;
  return top.map(([n, c]) => [n, c / max]);
}

/** Year of contributions → numbers and languages → recent repos, one pinned screen each. */
export async function Activity() {
  const data = await getGitHubActivity();

  const heading = (
    <div className="shell mb-4 flex flex-col gap-6 md:mb-8 md:flex-row md:items-end md:justify-between">
      <RevealLines
        id="activity-title"
        lines={["Code / build", "/ ship"]}
        className="display text-[clamp(2.25rem,6.2vw,7rem)] [--wdth:80]"
      />
      {data && (
        <ArrowLink href={`https://github.com/${data.username}`} className="text-sm md:mb-[0.6em]">
          github.com/{data.username}
        </ArrowLink>
      )}
    </div>
  );

  if (!data || !data.days) {
    return (
      <section aria-labelledby="activity-title" className="relative border-t border-rule py-20 md:py-44">
        {heading}
        <div className="shell">
          <EmptyGrid />
          <p className="mt-4 font-mono text-xs text-smoke">
            Set <span className="text-ash">github.username</span> in src/data/portfolio.ts
            {github.username ? " — GitHub was unreachable at build time" : ""}.
          </p>
        </div>
      </section>
    );
  }

  const languages: [string, number][] = data.languages.length ? data.languages.map((l) => [l.name, l.share]) : stackFrequency();
  const steps: StoryStep[] = [
    {
      id: "year",
      label: "Year",
      text: "Last 12 months.",
      summary: `${data.totalContributions?.toLocaleString("en") ?? "Many"} contributions on GitHub in the last year.`,
      visual: (
        <div className="flex h-full min-h-0 items-center">
          <div className="w-full">
            <ActivitySkyline days={data.days} />
          </div>
        </div>
      ),
    },
    {
      id: "numbers",
      label: "Languages",
      text: "Most-used across public repos.",
      summary: `${data.publicRepos} public repositories. ${languages.map(([n]) => n).join(", ")}.`,
      visual: <NumbersVisual contributions={data.totalContributions} repos={data.publicRepos} languages={languages} />,
    },
    ...(data.recent.length
      ? [
          {
            id: "recent",
            label: "Recent",
            text: "Recently pushed.",
            summary: data.recent.map((r) => r.name).join(", "),
            visual: <ReposVisual repos={data.recent} />,
          } satisfies StoryStep,
        ]
      : []),
  ];

  return (
    <section aria-labelledby="activity-title" className="relative border-t border-rule pt-20 md:pt-44">
      {heading}
      <ScrollStory id="activity" eyebrow="GitHub" steps={steps} stepVh={[55, 65]} />
    </section>
  );
}
