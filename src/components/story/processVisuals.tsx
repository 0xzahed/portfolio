import { FocusPanel } from "./FocusPanel";
import { v } from "./atoms";

type Visual = { points: string[] };

/** 1 · Design: a wireframe sketching itself in. Data model → the blocks, User flows → the page, Constraints → the frame. */
export function DesignVisual({ points }: Visual) {
  return (
    <FocusPanel points={points} className="flex flex-col gap-3">
      <div
        className="s-in flex items-center gap-1.5"
        style={v(0)}
        data-part="2"
      >
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="ml-3 h-2 flex-1 rounded bg-rule" />
      </div>
      <div
        className="s-in relative min-h-0 flex-[1.3] rounded-lg border border-rule-strong bg-carbon"
        style={v(1)}
        data-part="1"
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
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-3">
        {[0, 1, 2].map((k) => (
          <div
            key={k}
            className="s-in rounded-lg border border-rule bg-carbon p-2.5"
            style={v(3 + k)}
            data-part="0"
          >
            <span className="block h-2 w-2/3 rounded bg-rule-strong" />
            <span className="mt-2 block h-2 w-1/2 rounded bg-rule" />
          </div>
        ))}
      </div>
    </FocusPanel>
  );
}

function Node({
  n,
  label,
  i,
  part,
}: {
  n: string;
  label: string;
  i: number;
  part: string;
}) {
  return (
    <div
      className="s-pop flex flex-col items-center gap-2"
      style={v(i)}
      data-part={part}
    >
      <span className="grid size-14 place-items-center rounded-2xl border border-rule-strong bg-carbon font-mono text-sm text-mint md:size-20 md:text-base">
        {n}
      </span>
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ash">
        {label}
      </span>
    </div>
  );
}

/** 2 · Engineer: data → API → interface. Boundaries → the three parts, Schemas → data + its rules, Contracts → the links. */
export function EngineerVisual({ points }: Visual) {
  return (
    <FocusPanel
      points={points}
      start={8}
      className="flex flex-col justify-between gap-6"
    >
      <div className="flex flex-1 flex-col justify-center gap-10">
        <div className="flex items-center">
          <Node n="01" label="Data" i={0} part="0 1" />
          <span
            className="s-bar mx-2 mb-6 h-px flex-1 bg-signal/70"
            style={v(1)}
            data-part="2"
          />
          <Node n="02" label="API" i={2} part="0" />
          <span
            className="s-bar mx-2 mb-6 h-px flex-1 bg-signal/70"
            style={v(3)}
            data-part="2"
          />
          <Node n="03" label="Interface" i={4} part="0" />
        </div>
        <div className="space-y-2.5">
          {[78, 56, 68].map((w, k) => (
            <span
              key={k}
              className="s-bar block h-2 rounded bg-rule-strong"
              style={{ ...v(5 + k), width: `${w}%` }}
              data-part="1"
            />
          ))}
        </div>
      </div>
    </FocusPanel>
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

/** 3 · Build: code going in. Small steps → the first lines, Tests → the middle, Detail → the last. */
export function BuildVisual({ points }: Visual) {
  return (
    <FocusPanel points={points} className="flex flex-col gap-5">
      <div className="flex flex-1 flex-col justify-around">
        {CODE.map(([indent, a, b], k) => (
          <div
            key={k}
            className="flex gap-2"
            style={{ paddingLeft: `${indent}%` }}
            data-part={String(Math.floor(k / 2))}
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
    </FocusPanel>
  );
}

const BARS = [100, 82, 64, 46, 32, 22];

/** 4 · Optimize: the same thing, getting shorter. Measure → before, Fix → the drop, Stay fast → after. */
export function OptimizeVisual({ points }: Visual) {
  return (
    <FocusPanel points={points} className="flex flex-col gap-4">
      <div className="flex min-h-0 flex-1 items-end gap-2.5 border-b border-rule-strong md:gap-3">
        {BARS.map((h, k) => (
          <div key={k} className="flex h-full flex-1 items-end">
            <span
              className={`s-grow block w-full rounded-t ${k === BARS.length - 1 ? "bg-mint" : "bg-signal/55"}`}
              style={{ ...v(k), height: `${h}%` }}
              data-part={String(Math.floor(k / 2))}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ash">
        <span>Before</span>
        <span className="text-mint">After</span>
      </div>
    </FocusPanel>
  );
}
