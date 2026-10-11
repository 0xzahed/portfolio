import { getGitHubActivity } from "@/lib/github";
import { github, projects } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ActivityTabs } from "./ActivityTabs";

const WEEKS = 53;

function EmptyGrid() {
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

/** GitHub activity as a tabbed panel: Year / Languages / Recent. */
export async function Activity() {
  const data = await getGitHubActivity();

  const heading = (
    <div className="shell mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
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
      <section aria-labelledby="activity-title" className="relative border-t border-rule py-12 md:py-24">
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
    <section aria-labelledby="activity-title" className="relative border-t border-rule py-12 md:py-24">
      {heading}
      <div className="shell">
        <ActivityTabs
          days={data.days}
          contributions={data.totalContributions}
          repos={data.publicRepos}
          languages={languages}
          recent={data.recent}
        />
      </div>
    </section>
  );
}
