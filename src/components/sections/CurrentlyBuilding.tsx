import { currentlyBuilding as cb } from "@/data/portfolio";
import { StatusDot } from "@/components/ui/StatusDot";
import { Fade } from "@/components/ui/Reveal";

export function CurrentlyBuilding() {
  const updated = new Date(cb.updated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <section aria-labelledby="building-title" className="relative border-t border-rule bg-graphite/70 py-20 md:py-28">
      <div className="shell">
        <Fade>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-3">
              <h2 id="building-title" className="text-sm text-ash">Currently building</h2>
              <p className="mt-4 inline-flex items-center gap-2.5 border border-signal/40 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mint">
                <StatusDot />
                Building
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="display text-[clamp(3rem,7vw,7rem)] [--wdth:104]">{cb.name}</p>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-bone/85">{cb.description}</p>
            </div>
            <dl className="space-y-6 text-sm md:col-span-3 md:col-start-10">
              <div className="border-t border-rule pt-3">
                <dt className="text-ash">Stage</dt>
                <dd className="mt-1">{cb.stage}</dd>
              </div>
              <div className="border-t border-rule pt-3">
                <dt className="text-ash">This week</dt>
                <dd className="mt-1">
                  <ul>
                    {cb.focus.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="border-t border-rule pt-3">
                <dt className="text-ash">Last update</dt>
                <dd className="mt-1 font-mono text-xs">
                  <time dateTime={cb.updated}>{updated}</time>
                </dd>
              </div>
            </dl>
          </div>
        </Fade>
      </div>
    </section>
  );
}
