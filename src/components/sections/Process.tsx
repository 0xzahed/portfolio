import { about } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { BuildVisual, DesignVisual, EngineerVisual, OptimizeVisual } from "@/components/story/processVisuals";
import { reveal } from "@/lib/reveal";
import { cn, pad } from "@/lib/utils";

const VISUALS = [DesignVisual, EngineerVisual, BuildVisual, OptimizeVisual];

/** How I work as alternating editorial rows: text one side, live diagram the other. */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="relative border-t border-rule py-12 md:py-24">
      <div className="shell mb-8 md:mb-12">
        <RevealLines
          id="process-title"
          lines={["How I", "work"]}
          className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]"
        />
      </div>
      <div className="shell space-y-10 md:space-y-14">
        {about.process.map((s, k) => {
          const Visual = VISUALS[k];
          const flip = k % 2 === 1;
          return (
            <div key={s.label} className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-x-6">
              <div {...reveal(0)} className={cn("md:col-span-4", flip ? "md:order-2 md:col-start-9" : "md:col-start-1")}>
                <p className="display text-signal tabular-nums text-[clamp(2rem,4vw,3rem)] [--wdth:62]">{pad(k + 1)}</p>
                <h3 className="display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]">{s.label}</h3>
                <p className="mt-3 max-w-[36ch] leading-relaxed text-bone/85">{s.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-rule-strong px-3.5 py-1.5 text-sm text-bone/90">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div {...reveal(1)} className={cn("md:col-span-7", flip ? "md:order-1 md:col-start-1" : "md:col-start-6")}>
                <Visual points={s.points} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
