import { skills } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { DsaGraph } from "@/components/sections/DsaGraph";
import { StackGraph } from "@/components/sections/StackGraph";
import { reveal } from "@/lib/reveal";

/** The stack as one interactive graph (BFS + shortest path), then the DSA graph. */
export function Engineering() {
  const rest = skills.filter((g) => g.id !== "dsa");
  return (
    <section aria-labelledby="eng-title" className="relative border-t border-rule py-12 md:py-24">
      <div className="shell mb-8 md:mb-10">
        <RevealLines
          id="eng-title"
          lines={["Engineered", "with intention."]}
          className="display text-[clamp(2rem,5.6vw,6.25rem)] [--wdth:84]"
        />
      </div>
      <div className="shell">
        <StackGraph />
        {/* The graphs are visual; this keeps the same content reachable for screen readers. */}
        <ul className="sr-only">
          {rest.map((g) => (
            <li key={g.id}>
              {g.label}: {g.items.join(", ")}
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-24">
          <p {...reveal(0)} className="eyebrow mb-4">
            DSA &amp; Algorithms
          </p>
          <div {...reveal(1)}>
            <DsaGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
