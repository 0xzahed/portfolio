import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectMedia } from "@/components/projects/ProjectSection";
import { pad } from "@/lib/utils";
import { Chip, Chips, Panel, Tiles, v } from "./atoms";

/** Overview: the project in a browser frame, plus category / year / role as chips. */
export function OverviewVisual({ project }: { project: Project }) {
  return (
    <Panel className="flex flex-col gap-4">
      <div
        className="s-in overflow-hidden rounded-lg border border-rule-strong bg-carbon"
        style={v(0)}
      >
        <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2">
          <span className="size-1.5 rounded-full bg-rule-strong" />
          <span className="size-1.5 rounded-full bg-rule-strong" />
          <span className="size-1.5 rounded-full bg-rule-strong" />
          <span className="ml-2 truncate font-mono text-[0.625rem] text-smoke">
            {project.liveUrl?.replace(/^https?:\/\//, "") ?? project.slug}
          </span>
        </div>
        <div className="aspect-[16/10] w-full">
          <ProjectMedia project={project} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip i={2} accent>
          {project.category}
        </Chip>
        <Chip i={3}>{project.year}</Chip>
        <Chip i={4}>{project.role}</Chip>
      </div>
    </Panel>
  );
}

/** Stack: every technology as a chip. */
export function StackVisual({ project }: { project: Project }) {
  return (
    <Panel className="flex items-center">
      <Tiles items={project.technologies} accentFirst className="w-full" />
    </Panel>
  );
}

/** Highlights: just the three headlines, numbered. */
export function HighlightsVisual({ project }: { project: Project }) {
  return (
    <Panel className="flex flex-col justify-center">
      {project.caseStudy.highlights.map((h, k) => (
        <div
          key={h.title}
          className="s-in flex items-baseline gap-4 border-b border-rule py-4 last:border-b-0 md:gap-6 md:py-5"
          style={v(k)}
        >
          <span className="font-mono text-xs tabular-nums text-signal">
            {pad(k + 1)}
          </span>
          <span className="display text-[clamp(1.125rem,3vw,1.5rem)] [--wdth:100]">
            {h.title}
          </span>
        </div>
      ))}
    </Panel>
  );
}

function BigLink({
  href,
  label,
  external,
  i,
  accent,
}: {
  href: string;
  label: string;
  external?: boolean;
  i: number;
  accent?: boolean;
}) {
  const cls =
    "s-in group flex items-center justify-center rounded-xl border px-4 py-3 text-center transition-colors duration-300 " +
    (accent
      ? "border-signal/50 bg-signal/10 hover:bg-signal/20"
      : "border-rule-strong hover:border-bone");
  const inner = (
    <span className="display text-[clamp(1rem,2.6vw,1.25rem)] [--wdth:104]">
      {label}
    </span>
  );
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={v(i)}
    >
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls} style={v(i)}>
      {inner}
    </Link>
  );
}

/** Live: a preview of the real site, then the two ways in. */
export function LiveVisual({ project }: { project: Project }) {
  const host = project.liveUrl?.replace(/^https?:\/\//, "");
  return (
    <Panel className="flex flex-col justify-center gap-3 md:gap-4">
      {project.liveUrl && project.image && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="s-in group relative block aspect-[16/10] min-h-0 overflow-hidden rounded-lg border border-rule-strong md:aspect-auto md:flex-1"
          style={v(0)}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
            <ProjectMedia project={project} />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-10">
            <span className="font-mono text-[0.6875rem] text-bone/90">
              {host}
            </span>
            <span className="text-xs text-mint">Visit</span>
          </div>
          <span className="sr-only">
            Open {project.title} (opens in a new tab)
          </span>
        </a>
      )}
      <div className="grid shrink-0 grid-cols-2 gap-3">
        <BigLink
          href={`/work/${project.slug}`}
          label="Case study"
          i={1}
          accent
        />
        {project.liveUrl && (
          <BigLink href={project.liveUrl} label="Live site" external i={2} />
        )}
        {project.githubUrl && (
          <BigLink href={project.githubUrl} label="Source" external i={3} />
        )}
      </div>
    </Panel>
  );
}

export { Chips };
