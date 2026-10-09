import { ArrowUpRight } from "lucide-react";
import type { RepoSummary } from "@/lib/github";
import { Panel, v } from "./atoms";

function BigStat({ label, value, i }: { label: string; value: string; i: number }) {
  return (
    <div className="s-in" style={v(i)}>
      <p className="display text-[clamp(2.5rem,9vw,5rem)] tabular-nums [--wdth:70]">{value}</p>
      <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">{label}</p>
    </div>
  );
}

/** Contributions and repos as big numbers, languages as bars. */
export function NumbersVisual({
  contributions,
  repos,
  languages,
}: {
  contributions: number | null;
  repos: number;
  languages: [string, number][];
}) {
  const max = Math.max(...languages.map(([, s]) => s), 0.01);
  return (
    <Panel className="flex flex-col justify-between gap-6">
      <div className="grid grid-cols-2 gap-4">
        <BigStat label="Contributions" value={contributions != null ? contributions.toLocaleString("en") : "—"} i={0} />
        <BigStat label="Public repos" value={String(repos)} i={1} />
      </div>
      <ul className="space-y-3 border-t border-rule pt-5">
        {languages.map(([name, share], k) => (
          <li key={name} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 text-sm md:grid-cols-[8rem_1fr_3rem]">
            <span className="s-in truncate" style={v(2 + k)}>
              {name}
            </span>
            <span className="block h-1.5 rounded-full bg-rule">
              <span className="s-bar block h-1.5 rounded-full bg-signal" style={{ ...v(2 + k), width: `${Math.round((share / max) * 100)}%` }} />
            </span>
            <span className="s-in text-right font-mono text-xs tabular-nums text-ash" style={v(2 + k)}>
              {Math.round(share * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** The four most recently pushed repositories. */
export function ReposVisual({ repos }: { repos: RepoSummary[] }) {
  return (
    <Panel className="flex flex-col justify-center">
      {repos.map((r, k) => (
        <a
          key={r.name}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          style={v(k)}
          className="s-in group flex items-center justify-between gap-4 border-b border-rule py-4 last:border-b-0 md:py-5"
        >
          <span className="min-w-0">
            <span className="display block truncate text-[clamp(1.25rem,4.5vw,1.875rem)] transition-colors duration-300 [--wdth:104] group-hover:text-mint">
              {r.name}
            </span>
            <span className="mt-1 block font-mono text-[0.6875rem] uppercase text-smoke">
              {r.language ?? "—"} · {new Date(r.pushedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </span>
          <ArrowUpRight aria-hidden className="size-5 shrink-0 text-ash transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" strokeWidth={1.5} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </Panel>
  );
}
