import { about } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { BuildVisual, DesignVisual, EngineerVisual, OptimizeVisual } from "@/components/story/processVisuals";
import { reveal } from "@/lib/reveal";

const VISUALS = [DesignVisual, EngineerVisual, BuildVisual, OptimizeVisual];

/** How I work as cards: Design, Engineer, Build, Optimize — no pinning. */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="relative border-t border-rule py-20 md:py-44">
      <div className="shell mb-10 md:mb-16">
        <RevealLines
          id="process-title"
          lines={["How I", "work"]}
          className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]"
        />
      </div>
      <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {about.process.map((s, k) => {
          const Visual = VISUALS[k];
          return (
            <article key={s.label} aria-label={s.label} {...reveal(k % 2)} className="flex flex-col gap-3">
              <div>
                <p className="font-mono text-xs tabular-nums text-signal">0{k + 1}</p>
                <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] [--wdth:104]">
                  {s.label}
                </h3>
                <p className="mt-1 text-sm leading-snug text-bone/80">{s.text}</p>
              </div>
              <Visual points={s.points} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
