import { getGitHubActivity } from "@/lib/github";
import { github, projects } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { NumbersVisual, ReposVisual } from "@/components/story/activityVisuals";
import { ActivitySkyline } from "@/components/sections/ActivitySkyline";
import { Panel } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";

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

/** GitHub activity as cards: skyline, numbers/languages, recent repos. No pinning. */
export async function Activity() {
  const data = await getGitHubActivity();

  const heading = (
    <div className="shell mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
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

  return (
    <section aria-labelledby="activity-title" className="relative border-t border-rule py-20 md:py-44">
      {heading}
      <div className="shell grid grid-cols-1 gap-4 md:gap-6">
        <article aria-label="Contributions in the last year" {...reveal(0)}>
          <Panel className="max-h-none">
            <p className="eyebrow">Year · Last 12 months</p>
            <p className="mt-2 text-sm text-ash">
              {data.totalContributions?.toLocaleString("en") ?? "Many"} contributions on GitHub in the last year.
            </p>
            <div className="mt-6 flex items-center">
              <div className="w-full">
                <ActivitySkyline days={data.days} />
              </div>
            </div>
          </Panel>
        </article>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <article aria-label="Languages across public repos" {...reveal(0)}>
            <p className="eyebrow mb-3">Languages · Most-used across public repos</p>
            <NumbersVisual contributions={data.totalContributions} repos={data.publicRepos} languages={languages} />
          </article>
          {data.recent.length > 0 && (
            <article aria-label="Recently pushed repositories" {...reveal(1)}>
              <p className="eyebrow mb-3">Recent · Recently pushed</p>
              <ReposVisual repos={data.recent} />
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
