import { Suspense } from "react";
import { projects } from "@/data/portfolio";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { RevealLines } from "@/components/ui/Reveal";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { HighlightsVisual, LiveVisual, OverviewVisual, StackVisual } from "@/components/story/projectVisuals";
import { pad } from "@/lib/utils";

/** One project told as a pinned story: Overview → Stack → Highlights → Live. */
function ProjectStory({ index }: { index: number }) {
  const project = projects[index];
  const steps: StoryStep[] = [
    { id: "overview", label: "Overview", text: project.summary, visual: <OverviewVisual project={project} /> },
    { id: "stack", label: "Stack", text: project.role, visual: <StackVisual project={project} /> },
    {
      id: "highlights",
      label: "Highlights",
      summary: project.caseStudy.highlights.map((h) => h.title).join(", "),
      visual: <HighlightsVisual project={project} />,
    },
    { id: "live", label: "Live", text: "See it running.", visual: <LiveVisual project={project} /> },
  ];
  return <ScrollStory id={`project-${project.slug}-story`} eyebrow={`Project ${pad(index + 1)} / ${pad(projects.length)} · ${project.title}`} title={project.title} steps={steps} />;
}

export function SelectedWork() {
  const single = projects.length === 1;
  return (
    <section id="work" aria-labelledby="work-title" className={single ? "relative pt-24 md:pt-32" : "relative pb-16 pt-24 md:pt-32"}>
      <div className="shell">
        <div className={single ? "mb-4 md:mb-8" : "mb-16 md:mb-32"}>
          <RevealLines
            id="work-title"
            lines={["Selected", "work"]}
            className="display text-[clamp(2.5rem,8.5vw,9rem)] [--wdth:72]"
          />
        </div>
        {!single &&
          projects.map((p, i) => (
            <Suspense key={p.slug}>
              <ProjectSection project={p} index={i} total={projects.length} />
            </Suspense>
          ))}
      </div>
      {single && <ProjectStory index={0} />}
    </section>
  );
}
