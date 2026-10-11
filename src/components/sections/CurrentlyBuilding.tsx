import { currentlyBuilding as cb } from "@/data/portfolio";
import { StatusDot } from "@/components/ui/StatusDot";
import { RevealLines } from "@/components/ui/Reveal";
import { Panel, Tiles } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";

const TRACK = [
  { label: "Plan", on: true },
  { label: "Build", on: true, now: true },
  { label: "Ship", on: false },
];

/** What I'm working on right now: status card + focus card, side by side. */
export function CurrentlyBuilding() {
  const updated = new Date(cb.updated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <section aria-label="Currently building" className="relative border-t border-rule py-20 md:py-44">
      <div className="shell mb-10 md:mb-16">
        <RevealLines
          lines={["Currently", "building."]}
          className="display text-[clamp(2rem,5.6vw,6.25rem)] [--wdth:84]"
        />
      </div>
      <div className="shell grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <article aria-label={`Now building ${cb.name}`} {...reveal(0)} className="h-full">
          <Panel className="flex max-h-none min-h-[20rem] flex-col justify-between gap-6">
            <div>
              <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-signal/40 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mint">
                <StatusDot />
                Building
              </p>
              <h3 className="display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]">
                {cb.name}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/85">{cb.tagline}</p>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ash">{cb.description}</p>
              <p className="mt-3 text-sm text-ash">{cb.stage}</p>
            </div>
            <div>
              <div className="flex items-center">
                {TRACK.map((t, k) => (
                  <div key={t.label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`grid size-12 place-items-center rounded-full border md:size-16 ${
                          t.on ? "border-signal bg-signal/15 text-mint" : "border-rule-strong text-smoke"
                        } ${t.now ? "ring-4 ring-signal/20" : ""}`}
                      >
                        <span className={`size-2.5 rounded-full ${t.on ? "bg-mint" : "bg-rule-strong"}`} />
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ash">{t.label}</span>
                    </div>
                    {k < TRACK.length - 1 && (
                      <span className={`mx-2 mb-6 h-px flex-1 ${TRACK[k + 1].on ? "bg-signal/70" : "bg-rule-strong"}`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[0.6875rem] text-smoke">
                Updated <time dateTime={cb.updated}>{updated}</time>
              </p>
            </div>
          </Panel>
        </article>
        <article aria-label="Focus this week" {...reveal(1)} className="h-full">
          <Panel className="flex max-h-none min-h-[20rem] flex-col justify-between gap-6">
            <div>
              <p className="eyebrow">Focus</p>
              <h3 className="display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]">
                This week.
              </h3>
            </div>
            <Tiles items={cb.focus} cols={1} accentFirst className="w-full" />
          </Panel>
        </article>
      </div>
    </section>
  );
}
