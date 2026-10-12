"use client";

import { Suspense, useState } from "react";
import { projects } from "@/data/portfolio";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { RevealLines } from "@/components/ui/Reveal";

const INITIAL = 4;

/** Home shows the first 4 projects; the rest unfold behind a More button. */
export function SelectedWork() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL);
  const hidden = projects.length - INITIAL;

  return (
    <section id="work" aria-labelledby="work-title" className="relative pb-10 pt-14 md:pt-20">
      <div className="shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <RevealLines
            id="work-title"
            lines={["Selected", "work"]}
            className="display text-[clamp(2.5rem,8.5vw,9rem)] [--wdth:72]"
          />
          <p className="pb-2 font-mono text-xs tabular-nums text-smoke md:pb-4">
            Showing {visible.length} / {projects.length}
          </p>
        </div>
        {visible.map((p) => (
          <Suspense key={p.slug}>
            <ProjectSection project={p} index={projects.indexOf(p)} total={projects.length} />
          </Suspense>
        ))}
        {hidden > 0 && (
          <div className="flex justify-center pb-16 md:pb-24">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="h-12 cursor-pointer rounded-full border border-rule-strong px-8 text-sm text-bone transition-colors duration-300 hover:border-signal hover:text-mint"
            >
              {expanded ? "Show less" : `More projects (+${hidden})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
