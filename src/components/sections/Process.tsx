import { about } from "@/data/portfolio";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { BuildVisual, DesignVisual, EngineerVisual, OptimizeVisual } from "@/components/story/processVisuals";

const VISUALS = [DesignVisual, EngineerVisual, BuildVisual, OptimizeVisual];

/** Design → Engineer → Build → Optimize, one pinned screen each. */
export function Process() {
  const steps: StoryStep[] = about.process.map((s, k) => {
    const Visual = VISUALS[k];
    return {
      id: s.label.toLowerCase(),
      label: s.label,
      text: s.text,
      summary: `${s.text} ${s.points.join(", ")}.`,
      visual: <Visual points={s.points} />,
    };
  });
  return <ScrollStory id="process" eyebrow="Process" title="How I work" steps={steps} />;
}
