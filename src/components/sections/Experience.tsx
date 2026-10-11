import { education, experience } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { Chips } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";

/** Roles as a vertical timeline: year dots on a rail, details beside. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="relative border-t border-rule py-12 md:py-24">
      <div className="shell mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <RevealLines id="exp-title" lines={["Experience"]} className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]" />
        <p {...reveal(1)} className="max-w-[36ch] text-sm leading-relaxed text-ash">
          {education.degree} · {education.school}
        </p>
      </div>
      <div className="shell">
        <ol {...reveal(0)} className="relative ml-1 border-l border-rule-strong pl-8 md:ml-2 md:pl-14">
          {experience.map((item, k) => (
            <li key={`${item.period}-${item.org}`} className={k > 0 ? "relative mt-12 md:mt-16" : "relative"}>
              <span aria-hidden className="absolute top-2 -left-8 size-2.5 -translate-x-1/2 rounded-full bg-signal ring-4 ring-signal/15 md:-left-14" />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-x-6">
                <div className="md:col-span-3">
                  <p className="display text-[clamp(1.75rem,3vw,2.5rem)] text-signal tabular-nums [--wdth:62]">{item.period}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-ash">{item.org}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="display text-[clamp(1.5rem,2.8vw,2.25rem)] [--wdth:104]">{item.role}</h3>
                  <p className="mt-2 max-w-[56ch] leading-relaxed text-bone/85">{item.summary}</p>
                  <div className="mt-4">
                    <Chips items={item.stack} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
