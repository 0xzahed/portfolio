import {
  Check,
  Database,
  MonitorSmartphone,
  MousePointer2,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Chips, Panel, v } from "./atoms";

type Visual = { points: string[] };

/** 1 · Design: a wireframe sketching itself in. */
export function DesignVisual({ points }: Visual) {
  return (
    <Panel className="flex flex-col gap-3">
      <div className="s-in flex items-center gap-1.5" style={v(0)}>
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="ml-3 h-2 flex-1 rounded bg-rule" />
      </div>
      <div
        className="s-in relative min-h-0 flex-[1.3] rounded-lg border border-rule-strong bg-carbon"
        style={v(1)}
      >
        <span
          className="s-bar absolute left-4 top-4 h-2 w-1/3 rounded bg-bone/70"
          style={v(2)}
        />
        <span
          className="s-bar absolute left-4 top-9 h-2 w-1/2 rounded bg-rule-strong"
          style={v(3)}
        />
        <span
          className="s-pop absolute bottom-4 left-4 h-6 w-16 rounded bg-signal"
          style={v(4)}
        />
        <MousePointer2
          aria-hidden
          className="s-pop absolute bottom-3 left-[4.5rem] size-5 text-bone"
          strokeWidth={1.5}
          style={v(6)}
        />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">
        {[0, 1, 2].map((k) => (
          <div
            key={k}
            className="s-in rounded-lg border border-rule bg-carbon p-2.5"
            style={v(3 + k)}
          >
            <span className="block h-2 w-2/3 rounded bg-rule-strong" />
            <span className="mt-2 block h-2 w-1/2 rounded bg-rule" />
          </div>
        ))}
      </div>
      <Chips items={points} start={6} accentFirst />
    </Panel>
  );
}

function Node({
  icon: Icon,
  label,
  i,
}: {
  icon: LucideIcon;
  label: string;
  i: number;
}) {
  return (
    <div className="s-pop flex flex-col items-center gap-2" style={v(i)}>
      <span className="grid size-14 place-items-center rounded-2xl border border-rule-strong bg-carbon text-mint md:size-20">
        <Icon aria-hidden className="size-6 md:size-8" strokeWidth={1.5} />
      </span>
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ash">
        {label}
      </span>
    </div>
  );
}

/** 2 · Engineer: data → API → interface, wired together. */
export function EngineerVisual({ points }: Visual) {
  return (
    <Panel className="flex flex-col justify-between gap-6">
      <div className="flex flex-1 flex-col justify-center gap-10">
        <div className="flex items-center">
          <Node icon={Database} label="Data" i={0} />
          <span
            className="s-bar mx-2 mb-6 h-px flex-1 bg-signal/70"
            style={v(1)}
          />
          <Node icon={Waypoints} label="API" i={2} />
          <span
            className="s-bar mx-2 mb-6 h-px flex-1 bg-signal/70"
            style={v(3)}
          />
          <Node icon={MonitorSmartphone} label="Interface" i={4} />
        </div>
        <div className="space-y-2.5">
          {[78, 56, 68].map((w, k) => (
            <span
              key={k}
              className="s-bar block h-2 rounded bg-rule-strong"
              style={{ ...v(5 + k), width: `${w}%` }}
            />
          ))}
        </div>
      </div>
      <Chips items={points} start={8} accentFirst />
    </Panel>
  );
}

const CODE: [number, number, number][] = [
  [0, 34, 22],
  [8, 52, 0],
  [8, 26, 38],
  [16, 44, 18],
  [8, 30, 0],
  [0, 18, 0],
];

/** 3 · Build: code going in, checks going green. */
export function BuildVisual({ points }: Visual) {
  return (
    <Panel className="flex flex-col gap-5">
      <div className="flex flex-1 flex-col justify-around">
        {CODE.map(([indent, a, b], k) => (
          <div
            key={k}
            className="flex gap-2"
            style={{ paddingLeft: `${indent}%` }}
          >
            <span
              className="s-bar h-3 rounded bg-mint/70"
              style={{ ...v(k), width: `${a}%` }}
            />
            {b > 0 && (
              <span
                className="s-bar h-3 rounded bg-rule-strong"
                style={{ ...v(k + 1), width: `${b}%` }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {points.map((t, k) => (
          <span
            key={t}
            style={v(6 + k)}
            className="s-pop inline-flex items-center gap-1.5 rounded-full border border-signal/50 px-3 py-1.5 text-[0.8125rem] text-mint md:text-sm"
          >
            <Check aria-hidden className="size-3.5" strokeWidth={2} />
            {t}
          </span>
        ))}
      </div>
    </Panel>
  );
}

const BARS = [100, 82, 64, 46, 32, 22];

/** 4 · Optimize: the same thing, getting shorter. */
export function OptimizeVisual({ points }: Visual) {
  return (
    <Panel className="flex flex-col gap-4">
      <div className="flex min-h-0 flex-1 items-end gap-2.5 border-b border-rule-strong md:gap-3">
        {BARS.map((h, k) => (
          <div key={k} className="flex h-full flex-1 items-end">
            <span
              className={`s-grow block w-full rounded-t ${k === BARS.length - 1 ? "bg-mint" : "bg-signal/55"}`}
              style={{ ...v(k), height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ash">
        <span>Before</span>
        <span className="text-mint">After</span>
      </div>
      <Chips items={points} start={6} accentFirst />
    </Panel>
  );
}
