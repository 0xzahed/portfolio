import { currentlyBuilding as cb } from "@/data/portfolio";
import { StatusDot } from "@/components/ui/StatusDot";
import { ScrollStory, type StoryStep } from "@/components/story/ScrollStory";
import { Panel, Tiles, v } from "@/components/story/atoms";

const TRACK = [
  { label: "Plan", on: true },
  { label: "Build", on: true, now: true },
  { label: "Ship", on: false },
];

/** What I'm working on right now: where it is, then what this week is about. */
export function CurrentlyBuilding() {
  const updated = new Date(cb.updated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const steps: StoryStep[] = [
    {
      id: "now",
      label: cb.name,
      text: cb.tagline,
      summary: `${cb.description} ${cb.stage}.`,
      visual: (
        <Panel className="flex flex-col justify-between gap-6">
          <p className="s-in inline-flex w-fit items-center gap-2.5 rounded-full border border-signal/40 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mint" style={v(0)}>
            <StatusDot />
            Building
          </p>
          <div className="flex items-center">
            {TRACK.map((t, k) => (
              <div key={t.label} className="flex flex-1 items-center last:flex-none">
                <div className="s-pop flex flex-col items-center gap-2" style={v(k * 2 + 1)}>
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
                  <span className={`s-bar mx-2 mb-6 h-px flex-1 ${TRACK[k + 1].on ? "bg-signal/70" : "bg-rule-strong"}`} style={v(k * 2 + 2)} />
                )}
              </div>
            ))}
          </div>
          <p className="s-in font-mono text-[0.6875rem] text-smoke" style={v(7)}>
            Updated <time dateTime={cb.updated}>{updated}</time>
          </p>
        </Panel>
      ),
    },
    {
      id: "focus",
      label: "Focus",
      text: "This week.",
      summary: cb.focus.join(", "),
      visual: (
        <Panel className="flex items-center">
          <Tiles items={cb.focus} cols={1} accentFirst className="w-full" />
        </Panel>
      ),
    },
  ];
  return (
    <section aria-label="Currently building" className="relative border-t border-rule">
      <ScrollStory id="building" eyebrow="Currently building" steps={steps} stepVh={[55, 65]} />
    </section>
  );
}
