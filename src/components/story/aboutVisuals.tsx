import { pad } from "@/lib/utils";
import { Panel, Tiles, v } from "./atoms";

/** Scope: data models → APIs → background jobs → interface, as a connected chain. */
export function ScopeVisual({ chain }: { chain: string[] }) {
  return (
    <Panel className="flex flex-col justify-center">
      {chain.map((label, k) => {
        return (
          <div key={label}>
            {k > 0 && (
              <span
                className="s-grow ml-[1.4rem] block h-5 w-px bg-signal/60 md:ml-6 md:h-7"
                style={v(k * 2 - 1)}
              />
            )}
            <div className="s-in flex items-center gap-4" style={v(k * 2)}>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-rule-strong bg-carbon font-mono text-xs text-mint md:size-12">
                {pad(k + 1)}
              </span>
              <span className="display text-[clamp(1.0625rem,3vw,1.375rem)] [--wdth:104]">
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

/** Care: what nobody sees, and what everybody feels. */
export function CareVisual({ unseen, felt }: { unseen: string; felt: string }) {
  return (
    <Panel className="flex flex-col justify-center gap-6 md:gap-8">
      <div className="s-in" style={v(0)}>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
          Under the hood
        </p>
        <p className="display mt-3 text-[clamp(1.25rem,3.4vw,1.75rem)] [--wdth:100]">
          {unseen}
        </p>
      </div>
      <span className="s-bar block h-px w-full bg-signal/60" style={v(2)} />
      <div className="s-in" style={v(3)}>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
          In the hand
        </p>
        <p className="display mt-3 text-[clamp(1.25rem,3.4vw,1.75rem)] text-mint [--wdth:100]">
          {felt}
        </p>
      </div>
    </Panel>
  );
}

/** Builds: everything I make, as a cloud of chips. */
export function BuildsVisual({ items }: { items: string[] }) {
  return (
    <Panel className="flex items-center">
      <Tiles items={items} accentFirst className="w-full" />
    </Panel>
  );
}
