import { getGitHubActivity, type ContributionDay } from "@/lib/github";
import { github, projects } from "@/data/portfolio";
import { RevealLines, Fade } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";

const LEVEL_BG = ["bg-white/[0.04]", "bg-signal/25", "bg-signal/45", "bg-signal/70", "bg-mint"];
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

function Grid({ days }: { days: ContributionDay[] | null }) {
  if (!days) return <EmptyGrid />;
  const cells = days.slice(-WEEKS * 7);
  return (
    <div className="overflow-x-auto pb-2 [scrollbar-width:none]">
      <div
        className="grid min-w-[640px] grid-flow-col gap-[3px]"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`Contribution calendar: ${cells.reduce((a, d) => a + d.count, 0)} contributions in the last year`}
      >
        {cells.map((d) => (
          <span key={d.date} className={`block aspect-square ${LEVEL_BG[d.level]}`} title={`${d.count} on ${d.date}`} />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-rule pt-4">
      <dt className="text-sm text-ash">{label}</dt>
      <dd className="display mt-3 text-[clamp(2.5rem,5vw,4.5rem)] tabular-nums [--wdth:70]">{value}</dd>
    </div>
  );
}

/** Stack frequency across the selected work — derived from portfolio data, not GitHub. */
function stackFrequency() {
  const map = new Map<string, number>();
  for (const p of projects) for (const t of p.technologies) {
    const key = t.replace(/\s\d+$/, "");
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
}

export async function Activity() {
  const data = await getGitHubActivity();
  const freq = stackFrequency();
  const maxFreq = freq[0]?.[1] ?? 1;

  return (
    <section aria-labelledby="activity-title" className="relative border-t border-rule py-32 md:py-44">
      <div className="shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-6">
          <RevealLines
            id="activity-title"
            lines={["Code / build", "/ ship"]}
            className="display text-[clamp(3rem,9vw,10rem)] [--wdth:80] md:col-span-9"
          />
          <p className="max-w-[32ch] self-end text-ash md:col-span-3">
            {data
              ? `Live from GitHub, refreshed daily.`
              : "Public activity appears here once a GitHub username is connected."}
          </p>
        </div>

        <Fade className="mt-16 md:mt-24">
          <div className="flex items-baseline justify-between border-b border-rule pb-4">
            <p className="text-sm text-ash">Contributions, last 12 months</p>
            {data && (
              <ArrowLink href={`https://github.com/${data.username}`} className="text-sm">
                github.com/{data.username}
              </ArrowLink>
            )}
          </div>
          <div className="mt-6">
            <Grid days={data?.days ?? null} />
          </div>
          {!data && (
            <p className="mt-4 font-mono text-xs text-smoke">
              Set <span className="text-ash">github.username</span> in src/data/portfolio.ts{github.username ? " — GitHub was unreachable at build time" : ""}.
            </p>
          )}
        </Fade>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-5">
            <Stat label="Contributions" value={data?.totalContributions != null ? data.totalContributions.toLocaleString("en") : "—"} />
            <Stat label="Public repositories" value={data ? String(data.publicRepos) : "—"} />
          </dl>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="border-b border-rule pb-4 text-sm text-ash">
              {data && data.languages.length ? "Languages across public repositories" : "Most-used tools across selected work"}
            </h3>
            <ul>
              {(data && data.languages.length
                ? data.languages.map((l) => [l.name, l.share] as const)
                : freq.map(([n, c]) => [n, c / maxFreq] as const)
              ).map(([name, share]) => (
                <li key={name} className="grid grid-cols-[8rem_1fr] items-center gap-4 border-b border-rule py-3 text-[0.9375rem]">
                  <span>{name}</span>
                  <span className="h-px w-full bg-rule">
                    <span className="block h-px bg-signal" style={{ width: `${Math.round(share * 100)}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {data && data.recent.length > 0 && (
          <div className="mt-20">
            <h3 className="border-b border-rule pb-4 text-sm text-ash">Recently pushed</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2">
              {data.recent.map((r) => (
                <li key={r.name} className="border-b border-rule py-5 md:odd:pr-6 md:even:border-l md:even:pl-6">
                  <ArrowLink href={r.url} className="text-lg">{r.name}</ArrowLink>
                  {r.description && <p className="mt-2 max-w-[52ch] text-sm text-ash">{r.description}</p>}
                  <p className="mt-3 font-mono text-[0.6875rem] uppercase text-smoke">
                    {r.language ?? "—"} · {new Date(r.pushedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
