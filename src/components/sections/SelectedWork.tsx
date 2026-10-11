import { Suspense } from "react";
import { projects } from "@/data/portfolio";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { RevealLines } from "@/components/ui/Reveal";

/** Home shows compact cards (name + summary); full story lives on /work/[slug]. */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative pb-16 pt-24 md:pt-32">
      <div className="shell">
        <div className="mb-16 md:mb-32">
          <RevealLines
            id="work-title"
            lines={["Selected", "work"]}
            className="display text-[clamp(2.5rem,8.5vw,9rem)] [--wdth:72]"
          />
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
