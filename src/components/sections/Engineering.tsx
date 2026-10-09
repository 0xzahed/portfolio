import { projects, skills } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { DisciplineVisual } from "@/components/story/engineeringVisuals";
import type { SkillGroup } from "@/lib/types";

function projectsFor(group: SkillGroup) {
  if (group.usedIn) return projects.filter((p) => group.usedIn!.includes(p.slug));
  const needles = group.items.map((i) => i.toLowerCase());
  return projects.filter((p) => p.technologies.some((t) => needles.some((n) => t.toLowerCase().includes(n))));
}

/** Six disciplines, one pinned screen each. */
export function Engineering() {
  const steps: StoryStep[] = skills.map((g) => ({
    id: g.id,
    label: g.label,
    text: g.note,
    summary: `${g.note} ${g.items.join(", ")}.`,
    visual: <DisciplineVisual items={g.items} shipped={projectsFor(g)} />,
  }));
  return (
    <section aria-labelledby="eng-title" className="relative border-t border-rule pt-20 md:pt-44">
      <div className="shell mb-4 md:mb-8">
        <RevealLines
          id="eng-title"
          lines={["Engineered", "with intention."]}
          className="display text-[clamp(2rem,5.6vw,6.25rem)] [--wdth:84]"
        />
      </div>
      <ScrollStory id="engineering" eyebrow="Engineering" steps={steps} stepVh={[45, 55]} />
    </section>
  );
}
