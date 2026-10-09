import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { ProjectMedia } from "@/components/projects/ProjectSection";
import { pad } from "@/lib/utils";
import { Chip, Chips, Panel, Tiles, v } from "./atoms";

/** Overview: the project in a browser frame, plus category / year / role as chips. */
export function OverviewVisual({ project }: { project: Project }) {
  return (
    <Panel className="flex flex-col gap-4">
      <div className="s-in overflow-hidden rounded-lg border border-rule-strong bg-carbon" style={v(0)}>
        <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2">
          <span className="size-1.5 rounded-full bg-rule-strong" />
          <span className="size-1.5 rounded-full bg-rule-strong" />
          <span className="size-1.5 rounded-full bg-rule-strong" />
          <span className="ml-2 truncate font-mono text-[0.625rem] text-smoke">{project.liveUrl?.replace(/^https?:\/\//, "") ?? project.slug}</span>
        </div>
        <div className="aspect-[16/10] w-full">
          <ProjectMedia project={project} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip i={2} accent>{project.category}</Chip>
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
        <div key={h.title} className="s-in flex items-baseline gap-4 border-b border-rule py-4 last:border-b-0 md:gap-6 md:py-5" style={v(k)}>
          <span className="font-mono text-xs tabular-nums text-signal">{pad(k + 1)}</span>
          <span className="display text-[clamp(1.375rem,4.5vw,2.25rem)] [--wdth:100]">{h.title}</span>
        </div>
      ))}
    </Panel>
  );
}

function BigLink({ href, label, external, i, accent }: { href: string; label: string; external?: boolean; i: number; accent?: boolean }) {
  const cls =
    "s-in group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-colors duration-300 md:px-6 md:py-5 " +
    (accent ? "border-signal/50 bg-signal/10 hover:bg-signal/20" : "border-rule-strong hover:border-bone");
  const inner = (
    <>
      <span className="display text-[clamp(1.25rem,4.5vw,1.75rem)] [--wdth:104]">{label}</span>
      <ArrowUpRight aria-hidden className="size-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={v(i)}>
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls} style={v(i)}>
      {inner}
    </Link>
  );
}

/** Live: where to go next. */
export function LiveVisual({ project }: { project: Project }) {
  return (
    <Panel className="flex flex-col justify-center gap-3 md:gap-4">
      <BigLink href={`/work/${project.slug}`} label="Case study" i={0} accent />
      {project.liveUrl && <BigLink href={project.liveUrl} label="Live site" external i={1} />}
      {project.githubUrl && <BigLink href={project.githubUrl} label="Source" external i={2} />}
    </Panel>
  );
}

export { Chips };
