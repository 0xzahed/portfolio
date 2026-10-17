"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { reveal } from "@/lib/reveal";
import { skills } from "@/data/portfolio";

/**
 * The whole tech stack as one graph, and the graph actually runs algorithms on itself.
 *
 *  · Hover (or tap) a node → BFS from it. Nodes light up one ring at a time (level 0, 1, 2…),
 *    the BFS tree edges glow, and the caption reports how many nodes were reached and how deep.
 *  · Pick a source, then another node → shortest path (BFS + parent pointers), lit hop by hop.
 *
 * Each discipline is a cluster: a category pill with its technologies fanned around it. A technology in
 * two disciplines (Python) is ONE node linked to both. Positions come from `skills` + the tables below,
 * so a technology added to the data appears here; a group with no layout (DSA has its own graph) is
 * skipped. Pure SVG + CSS (.sg-* in globals.css). Two layouts: wide (≥ lg) and a stacked column for
 * phones/tablets, because the wide one cannot be read at 390px.
 */

type Variant = "wide" | "stack";

/** Degrees per item in `skills` order (0 = right, 90 = down). null = placed by another group. */
const ANGLES: Record<string, (number | null)[]> = {
  frontend: [-90, -30, 50, 130, 210],
  backend: [null, -135, -45, 45, 135], // Python lives in AI/ML's top slot, linked from here
  data: [-90, 30, 150],
  security: [-135, -45, 45, 135],
  ai: [-90, 30, 90, 150],
  devops: [-90, -30, 50, 130, 210],
};

const WIDE = {
  vw: 1000,
  vh: 485,
  pos: {
    frontend: [170, 125],
    backend: [500, 125],
    data: [830, 125],
    security: [170, 360],
    ai: [500, 360],
    devops: [830, 360],
  } as Record<string, [number, number]>,
  flow: [
    ["frontend", "backend"],
    ["backend", "data"],
    ["security", "ai"],
    ["ai", "devops"],
  ] as [string, string][],
};

const STACK_ORDER = ["frontend", "backend", "ai", "data", "devops", "security"];
const STACK = {
  vw: 400,
  vh: STACK_ORDER.length * 200,
  pos: Object.fromEntries(STACK_ORDER.map((id, k) => [id, [200, 100 + k * 200]])) as Record<string, [number, number]>,
  // Backend → AI/ML is already linked through the shared Python node.
  flow: [
    ["frontend", "backend"],
    ["ai", "data"],
    ["data", "devops"],
    ["devops", "security"],
  ] as [string, string][],
};

/** Real "built on / runs on" relationships between technologies (by label). */
const BUILT_ON: [string, string][] = [
  ["Next.js", "React"],
  ["Framer Motion", "React"],
  ["Docker", "Linux"],
  ["OWASP", "Web Security"],
];

const RX = 100;
const RY = 72;
const round = (n: number) => Math.round(n * 10) / 10;

type N = { id: string; label: string; kind: "cat" | "leaf"; x: number; y: number; w: number; h: number; i: number };
type E = { a: string; b: string; kind: "spoke" | "built" | "flow"; d: string; key: string; i: number };

function build(variant: Variant) {
  const cfg = variant === "wide" ? WIDE : STACK;
  const nodes = new Map<string, N>();
  const edges: E[] = [];
  let order = 0;

  const groups = skills.filter((g) => ANGLES[g.id] && cfg.pos[g.id]);
  for (const g of groups) {
    const [cx, cy] = cfg.pos[g.id];
    nodes.set(`cat:${g.id}`, { id: `cat:${g.id}`, label: g.label, kind: "cat", x: cx, y: cy, w: Math.round(g.label.length * 8.4 + 40), h: 36, i: order++ });
    g.items.forEach((item, k) => {
      const id = `t:${item.toLowerCase()}`;
      const deg = ANGLES[g.id][k];
      if (deg == null || nodes.has(id)) return;
      const r = (deg * Math.PI) / 180;
      nodes.set(id, { id, label: item, kind: "leaf", x: round(cx + RX * Math.cos(r)), y: round(cy + RY * Math.sin(r)), w: Math.round(item.length * 7.3 + 28), h: 30, i: order++ });
    });
  }

  let e = 0;
  const line = (a: N, b: N) => `M${a.x},${a.y} L${b.x},${b.y}`;
  for (const g of groups) {
    for (const item of g.items) {
      const id = `t:${item.toLowerCase()}`;
      const leaf = nodes.get(id);
      if (leaf) edges.push({ a: `cat:${g.id}`, b: id, kind: "spoke", d: line(nodes.get(`cat:${g.id}`)!, leaf), key: `${g.id}>${id}`, i: e++ });
    }
  }
  for (const [x, y] of BUILT_ON) {
    const a = nodes.get(`t:${x.toLowerCase()}`);
    const b = nodes.get(`t:${y.toLowerCase()}`);
    if (a && b) edges.push({ a: a.id, b: b.id, kind: "built", d: line(a, b), key: `${a.id}>${b.id}`, i: e++ });
  }
  for (const [x, y] of cfg.flow) {
    const a = nodes.get(`cat:${x}`);
    const b = nodes.get(`cat:${y}`);
    if (!a || !b) continue;
    // Stacked layout: an elbow down the left margin (x = 14) so it never crosses a technology.
    const d = variant === "wide" ? line(a, b) : `M${a.x - a.w / 2},${a.y} L14,${a.y} L14,${b.y} L${b.x - b.w / 2},${b.y}`;
    edges.push({ a: a.id, b: b.id, kind: "flow", d, key: `${a.id}>${b.id}`, i: e++ });
  }

  const adj = new Map<string, string[]>();
  for (const id of nodes.keys()) adj.set(id, []);
  for (const { a, b } of edges) {
    adj.get(a)!.push(b);
    adj.get(b)!.push(a);
  }
  return { nodes: [...nodes.values()], byId: nodes, edges, adj, vw: cfg.vw, vh: cfg.vh };
}

/** Breadth-first search: level (hops from the source) and parent of every reachable node. */
function bfs(adj: Map<string, string[]>, src: string) {
  const level = new Map<string, number>([[src, 0]]);
  const parent = new Map<string, string>();
  const queue = [src];
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    for (const v of adj.get(u) ?? []) {
      if (level.has(v)) continue;
      level.set(v, level.get(u)! + 1);
      parent.set(v, u);
      queue.push(v);
    }
  }
  return { level, parent, visited: queue.length, depth: Math.max(...level.values()) };
}

/** Shortest path src → dst in an unweighted graph, by walking BFS parent pointers back from dst. */
function shortestPath(adj: Map<string, string[]>, src: string, dst: string) {
  const { parent } = bfs(adj, src);
  if (src !== dst && !parent.has(dst)) return null;
  const path = [dst];
  while (path[0] !== src) path.unshift(parent.get(path[0])!);
  return path;
}

const LEVEL_OPACITY = [1, 1, 0.8, 0.55, 0.38, 0.26];
const WAVE_MS = 130;
const DIM = 0.15;

function Graph({ variant, className }: { variant: Variant; className?: string }) {
  const g = useMemo(() => build(variant), [variant]);
  const [hover, setHover] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const label = (id: string) => g.byId.get(id)?.label ?? id;

  // What is the graph showing right now?
  const target = from ? (to ?? (hover && hover !== from ? hover : null)) : null;
  const path = useMemo(() => (from && target ? shortestPath(g.adj, from, target) : null), [g, from, target]);
  const source = from ?? hover;
  const run = useMemo(() => (source && !target ? bfs(g.adj, source) : null), [g, source, target]);
  const pathIdx = useMemo(() => new Map((path ?? []).map((id, k) => [id, k])), [path]);
  const pathEdges = useMemo(() => {
    const s = new Set<string>();
    (path ?? []).forEach((id, k) => {
      if (k > 0) s.add([id, path![k - 1]].sort().join("|"));
    });
    return s;
  }, [path]);

  const mode: "idle" | "bfs" | "path" = target ? "path" : run ? "bfs" : "idle";

  const nodeView = (id: string) => {
    if (mode === "path") {
      const k = pathIdx.get(id);
      return k === undefined ? { o: DIM, d: 0, lit: false } : { o: 1, d: k * WAVE_MS + 40, lit: true };
    }
    if (mode === "bfs") {
      const lv = run!.level.get(id);
      return lv === undefined ? { o: DIM, d: 0, lit: false } : { o: LEVEL_OPACITY[Math.min(lv, 5)], d: lv * WAVE_MS, lit: lv === 0 };
    }
    return { o: 1, d: 0, lit: false };
  };

  type Base = { stroke: string; opacity: number; width: number };
  const edgeView = (ed: E, base: Base) => {
    if (mode === "path") {
      if (!pathEdges.has([ed.a, ed.b].sort().join("|"))) return { stroke: base.stroke, opacity: 0.08, width: base.width, d: 0 };
      const idx = Math.max(pathIdx.get(ed.a) ?? 0, pathIdx.get(ed.b) ?? 0);
      return { stroke: "var(--color-mint)", opacity: 1, width: 2, d: idx * WAVE_MS };
    }
    if (mode === "bfs") {
      const la = run!.level.get(ed.a);
      const lb = run!.level.get(ed.b);
      if (la === undefined || lb === undefined) return { stroke: base.stroke, opacity: 0.08, width: base.width, d: 0 };
      const child = la > lb ? ed.a : ed.b;
      const tree = run!.parent.get(child) === (child === ed.a ? ed.b : ed.a);
      const d = Math.max(la, lb) * WAVE_MS;
      return tree ? { stroke: "var(--color-mint)", opacity: 0.9, width: 1.6, d } : { stroke: base.stroke, opacity: 0.35, width: base.width, d };
    }
    return { ...base, d: 0 };
  };

  const click = (id: string) => {
    if (!from) setFrom(id);
    else if (id === from) {
      setFrom(null);
      setTo(null);
    } else setTo(id);
  };

  let caption = "Hover or tap a node to run BFS from it · pick a second node for the shortest path";
  if (mode === "bfs") caption = `BFS from ${label(source!)} · reached ${run!.visited} of ${g.nodes.length} nodes · ${run!.depth} hops deep${from ? " · pick a second node for the shortest path" : ""}`;
  if (mode === "path") caption = path ? `Shortest path · ${path.map(label).join(" → ")} · ${path.length - 1} hops` : `No path from ${label(from!)} to ${label(target!)}`;

  return (
    // The wide graph fades in and plays its draw-in when scrolled to; the tall stacked one is static.
    <div className={className} {...(variant === "wide" ? reveal(0) : {})}>
      <svg
        viewBox={`0 0 ${g.vw} ${g.vh}`}
        aria-hidden="true"
        className="h-auto w-full"
        onPointerLeave={() => setHover(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setFrom(null);
            setTo(null);
          }
        }}
      >
        {g.edges.map((ed) => {
          const base: Base =
            ed.kind === "built"
              ? { stroke: "var(--color-mint)", opacity: 0.55, width: 1.4 }
              : ed.kind === "flow"
                ? { stroke: "var(--color-signal)", opacity: 0.3, width: 1.4 }
                : { stroke: "var(--color-rule-strong)", opacity: 1, width: 1 };
          const v = edgeView(ed, base);
          return (
            <path
              key={ed.key}
              d={ed.d}
              pathLength={1}
              fill="none"
              className="sg-edge"
              stroke={v.stroke}
              strokeWidth={v.width}
              style={
                {
                  "--i": ed.i,
                  opacity: v.opacity,
                  pointerEvents: "none",
                  transition: `opacity .3s ease ${v.d}ms, stroke .3s ease ${v.d}ms`,
                } as CSSProperties
              }
            />
          );
        })}
        {g.nodes.map((n) => {
          const v = nodeView(n.id);
          const cat = n.kind === "cat";
          return (
            <g key={n.id} className="sg-node" style={{ "--i": n.i } as CSSProperties}>
              <g
                transform={`translate(${n.x} ${n.y})`}
                onPointerEnter={() => setHover(n.id)}
                onClick={() => click(n.id)}
                style={{ opacity: v.o, transition: `opacity .3s ease ${v.d}ms`, cursor: "pointer" }}
              >
                <rect
                  x={-n.w / 2}
                  y={-n.h / 2}
                  width={n.w}
                  height={n.h}
                  rx={n.h / 2}
                  fill={cat ? "var(--color-graphite)" : "var(--color-carbon)"}
                  stroke={v.lit || n.id === from ? "var(--color-mint)" : cat ? "var(--color-signal)" : "var(--color-rule-strong)"}
                  strokeWidth={cat || v.lit ? 1.5 : 1}
                  style={{ transition: `stroke .3s ease ${v.d}ms` }}
                />
                <text
                  textAnchor="middle"
                  y={cat ? 5 : 4.5}
                  fill={cat ? "var(--color-mint)" : "var(--color-bone)"}
                  className={cat ? "font-mono text-[13px] font-medium" : "font-mono text-[12px]"}
                  style={{ pointerEvents: "none" }}
                >
                  {n.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <p aria-hidden className={cn("mt-3 min-h-[2.5rem] font-mono text-[0.6875rem] leading-relaxed tracking-[0.02em]", mode === "idle" ? "text-smoke" : "text-mint")}>
        {caption}
      </p>
    </div>
  );
}

/** Wide graph from lg up; stacked column below (phones, tablets). */
export function StackGraph() {
  return (
    <>
      <Graph variant="wide" className="stack-graph mx-auto hidden max-w-[1250px] lg:block" />
      <Graph variant="stack" className="sg-static mx-auto max-w-[440px] lg:hidden" />
    </>
  );
}
