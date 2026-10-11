import { currentlyBuilding as cb } from "@/data/portfolio";
import { StatusDot } from "@/components/ui/StatusDot";
import { RevealLines } from "@/components/ui/Reveal";
import { reveal } from "@/lib/reveal";

const TRACK = [
  { label: "Plan", on: true },
  { label: "Build", on: true, now: true },
  { label: "Ship", on: false },
];

/** Now building as one wide banner: info left, progress + focus right. */
export function CurrentlyBuilding() {
  const updated = new Date(cb.updated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <section aria-label="Currently building" className="relative border-t border-rule py-12 md:py-24">
      <div className="shell">
        <div {...reveal(0)} className="overflow-hidden rounded-3xl border border-rule bg-graphite/70">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-b border-rule p-6 md:p-10 lg:col-span-7 lg:border-b-0 lg:border-r">
              <RevealLines
                lines={["Currently", "building."]}
                className="display text-[clamp(2rem,4.5vw,4.5rem)] [--wdth:84]"
              />
              <p className="mt-4 inline-flex w-fit items-center gap-2.5 rounded-full border border-signal/40 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mint">
                <StatusDot />
                {cb.name} · {cb.tagline}
              </p>
              <p className="mt-5 max-w-[56ch] leading-relaxed text-bone/85">{cb.description}</p>
              <p className="mt-3 text-sm text-ash">
                {cb.stage} · Updated <time dateTime={cb.updated}>{updated}</time>
              </p>
            </div>
            <div className="flex flex-col justify-center gap-8 p-6 md:p-10 lg:col-span-5">
              <div>
                <p className="eyebrow mb-5">Progress</p>
                <ol className="space-y-0">
                  {TRACK.map((t, k) => (
                    <li key={t.label} className="flex gap-4">
                      <span className="flex flex-col items-center">
                        <span className={`size-3 rounded-full ${t.on ? "bg-mint" : "border border-rule-strong"}`} />
                        {k < TRACK.length - 1 && <span className={`h-8 w-px ${TRACK[k + 1].on ? "bg-signal/70" : "bg-rule-strong"}`} />}
                      </span>
                      <span className={`pb-6 font-mono text-xs uppercase tracking-[0.12em] ${t.now ? "text-mint" : t.on ? "text-bone" : "text-smoke"}`}>
                        {t.label}
                        {t.now && <span className="ml-2 rounded-full bg-signal/15 px-2 py-0.5">now</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="eyebrow mb-3">Focus this week</p>
                <ul className="flex flex-wrap gap-2">
                  {cb.focus.map((f) => (
                    <li key={f} className="rounded-full border border-signal/50 px-4 py-2 text-sm text-mint">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
