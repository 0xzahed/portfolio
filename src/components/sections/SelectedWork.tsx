import { Suspense } from "react";
import { projects } from "@/data/portfolio";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { RevealLines } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative pb-16 pt-24 md:pt-32">
      <div className="shell">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-32">
          <RevealLines
            id="work-title"
            lines={["Selected", "work"]}
            className="display text-[clamp(3.5rem,13vw,15rem)] [--wdth:72]"
          />
          <p className="max-w-[34ch] text-sm text-ash sm:mb-[0.6em] sm:max-w-[22ch] sm:text-right md:text-base">
            <span className="font-mono text-bone tabular-nums">({pad(projects.length)})</span>
            <br />
            Products shipped for real users, from payroll to protected video.
          </p>
        </div>
        {projects.map((p, i) => (
          <Suspense key={p.slug}>
            <ProjectSection project={p} index={i} total={projects.length} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}
