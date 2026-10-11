import { education, experience } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { Chips, Panel } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";

/** Roles as cards: year + company + summary + stack. No pinning. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="relative border-t border-rule py-20 md:py-44">
      <div className="shell mb-10 md:mb-16">
        <RevealLines id="exp-title" lines={["Experience"]} className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]" />
      </div>
      <div className="shell grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {experience.map((item, k) => (
          <article key={`${item.period}-${item.org}`} aria-label={`${item.role}, ${item.org}`} {...reveal(k % 3)} className="h-full">
            <Panel className="flex max-h-none min-h-[18rem] flex-col justify-between gap-6">
              <div>
                <p className="font-mono text-xs tabular-nums text-signal">{item.period}</p>
                <h3 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] [--wdth:104]">
                  {item.org}
                </h3>
                <p className="mt-1 text-sm text-ash">{item.role}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone/85">{item.summary}</p>
              </div>
              <div>
                <Chips items={item.stack} />
              </div>
            </Panel>
          </article>
        ))}
      </div>
      <div className="shell mt-6">
        <p {...reveal(0)} className="font-mono text-[0.6875rem] text-smoke">
          {education.degree} · {education.school}
        </p>
      </div>
    </section>
  );
}
