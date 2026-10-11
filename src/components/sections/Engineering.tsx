import Link from "next/link";
import { projects, skills } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { Chips, Panel } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";
import type { SkillGroup } from "@/lib/types";

function projectsFor(group: SkillGroup) {
  if (group.usedIn) return projects.filter((p) => group.usedIn!.includes(p.slug));
  const needles = group.items.map((i) => i.toLowerCase());
  return projects.filter((p) => p.technologies.some((t) => needles.some((n) => t.toLowerCase().includes(n))));
}

/** Six disciplines as cards: label + note + tools + shipped-in links. */
export function Engineering() {
  return (
    <section aria-labelledby="eng-title" className="relative border-t border-rule py-20 md:py-44">
      <div className="shell mb-10 md:mb-16">
        <RevealLines
          id="eng-title"
          lines={["Engineered", "with intention."]}
          className="display text-[clamp(2rem,5.6vw,6.25rem)] [--wdth:84]"
        />
      </div>
      <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {skills.map((g, i) => {
          const shipped = projectsFor(g);
          return (
            <article
              key={g.id}
              aria-label={g.label}
              {...reveal(i % 3)}
              className="h-full"
            >
              <Panel className="flex max-h-none min-h-[16rem] flex-col justify-between gap-6">
                <div>
                  <p className="font-mono text-xs tabular-nums text-ash">0{i + 1}</p>
                  <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] [--wdth:104]">
                    {g.label}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-bone/80">{g.note}</p>
                </div>
                <div>
                  <Chips items={g.items} />
                  {shipped.length > 0 && (
                    <div className="mt-4 border-t border-rule pt-4">
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
                        Shipped in
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {shipped.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/work/${p.slug}`}
                            className="inline-flex h-9 items-center rounded-full border border-rule-strong px-4 text-sm transition-colors hover:border-signal hover:text-mint"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Panel>
            </article>
          );
        })}
      </div>
    </section>
  );
}
