import { about } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { RoleCard } from "@/components/story/RoleCard";
import { BuildsVisual, CareVisual, ScopeVisual } from "@/components/story/aboutVisuals";
import { reveal } from "@/lib/reveal";

/** About as cards: Role, Scope, Care, Builds — no pinning. */
export function AboutStory() {
  const { role, scope, care, builds } = about.story;
  const cards = [
    { id: "role", index: "01", label: "Role", text: role, visual: <RoleCard /> },
    {
      id: "scope",
      index: "02",
      label: "Scope",
      text: scope.text,
      visual: <ScopeVisual chain={scope.chain} />,
    },
    {
      id: "care",
      index: "03",
      label: "Care",
      text: care.text,
      visual: <CareVisual unseen={care.unseen} felt={care.felt} />,
    },
    {
      id: "builds",
      index: "04",
      label: "Builds",
      text: builds.text,
      visual: <BuildsVisual items={about.builds} />,
    },
  ];
  return (
    <section aria-labelledby="about-me-title" className="relative py-20 md:py-44">
      <div className="shell mb-10 md:mb-16">
        <RevealLines
          id="about-me-title"
          lines={["About", "me"]}
          className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]"
        />
      </div>
      <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {cards.map((c, i) => (
          <article key={c.id} aria-label={c.label} {...reveal(i % 2)} className="flex flex-col gap-3">
            <div>
              <p className="font-mono text-xs tabular-nums text-signal">{c.index}</p>
              <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] [--wdth:104]">
                {c.label}
              </h3>
              <p className="mt-1 text-sm leading-snug text-bone/80">{c.text}</p>
            </div>
            {c.visual}
          </article>
        ))}
      </div>
    </section>
  );
}
