import { about } from "@/data/portfolio";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { RoleCard } from "@/components/story/RoleCard";
import { BuildsVisual, CareVisual, ScopeVisual } from "@/components/story/aboutVisuals";

/** Role → Scope → Care → Builds, one pinned screen each. */
export function AboutStory() {
  const { role, scope, care, builds } = about.story;
  const steps: StoryStep[] = [
    { id: "role", label: "Role", text: role, visual: <RoleCard /> },
    { id: "scope", label: "Scope", text: scope.text, summary: `${scope.text} ${scope.chain.join(", ")}.`, visual: <ScopeVisual chain={scope.chain} /> },
    { id: "care", label: "Care", text: care.text, summary: `${care.unseen}. ${care.felt}.`, visual: <CareVisual unseen={care.unseen} felt={care.felt} /> },
    { id: "builds", label: "Builds", text: builds.text, summary: about.builds.join(", "), visual: <BuildsVisual items={about.builds} /> },
  ];
  return <ScrollStory id="about-story" eyebrow="About" title="About me" steps={steps} />;
}
