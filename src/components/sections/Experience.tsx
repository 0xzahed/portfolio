import { education, experience } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { ExperienceVisual } from "@/components/story/experienceVisuals";

/** One pinned screen per role: the year, the company, a timeline. */
export function Experience() {
  const steps: StoryStep[] = experience.map((item, k) => ({
    id: `${item.period}-${item.org}`.toLowerCase().replace(/\W+/g, "-"),
    index: item.period,
    label: item.org,
    text: item.summary,
    summary: `${item.role}, ${item.org}, ${item.period}. ${item.summary} ${item.stack.join(", ")}.`,
    visual: <ExperienceVisual items={experience} active={k} education={education} />,
  }));
  return (
    <section id="experience" aria-labelledby="exp-title" className="relative border-t border-rule pt-20 md:pt-44">
      <div className="shell mb-4 md:mb-8">
        <RevealLines id="exp-title" lines={["Experience"]} className="display text-[clamp(3rem,10vw,11rem)] [--wdth:76]" />
      </div>
      <ScrollStory id="experience-story" eyebrow="Experience" steps={steps} stepVh={[55, 65]} />
    </section>
  );
}
