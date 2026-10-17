"use client";

import { useMemo, useState } from "react";
import { skills } from "@/data/portfolio";

/**
 * The whole tech stack as one graph. Each discipline is a cluster: a category pill with its
 * technologies fanned around it. A technology that belongs to two disciplines (Python) is ONE node
 * linked to both, so the graph shows how the areas actually connect. A few mint "built on"
 * links add real relationships (Next.js → React). Hover a node to light up its connections.
 *
 * Positions are computed from `skills` + the layout table below, so adding a technology to the data
 * adds it here; a group with no entry in LAYOUT (DSA has its own graph) is simply not drawn.
 * Pure SVG + CSS (see .sg-* in globals.css); hidden below lg, where the accordion carries the content.
 */

type Layout = { cx: number; cy: number; /** Degrees per item, in `skills` order. 0 = right, 90 = down. null = placed by another group. */ angles: (number | null)[] };

const LAYOUT: Record<string, Layout> = {
  frontend: { cx: 170, cy: 125, angles: [-90, -30, 50, 130, 210] },
  backend: { cx: 500, cy: 125, angles: [null, -135, -45, 45, 135] }, // Python lives in AI/ML's top slot
  data: { cx: 830, cy: 125, angles: [-90, 30, 150] },
  security: { cx: 170, cy: 360, angles: [-135, -45, 45, 135] },
  ai: { cx: 500, cy: 360, angles: [-90, 30, 90, 150] },
  devops: { cx: 830, cy: 360, angles: [-90, -30, 50, 130, 210] },
};

/** Real "built on / runs on" relationships between technologies (by label). */
const BUILT_ON: [string, string][] = [
  ["Next.js", "React"],
  ["Framer Motion", "React"],
  ["Docker", "Linux"],
  ["OWASP", "Web Security"],
];

/** Neighbouring disciplines, so the six clusters form one connected graph. */
const FLOW: [string, string][] = [
  ["frontend", "backend"],
  ["backend", "data"],
  ["security", "ai"],
  ["ai", "devops"],
];

const RX = 100;
const RY = 72;
const round = (n: number) => Math.round(n * 10) / 10;

type N = { id: string; label: string; kind: "cat" | "leaf"; x: number; y: number; w: number; h: number; i: number };
type E = { a: string; b: string; kind: "spoke" | "built" | "flow"; i: number };

function build() {
  const nodes = new Map<string, N>();
  const edges: E[] = [];
  let order = 0;

  const groups = skills.filter((g) => LAYOUT[g.id]);
  // Pass 1: category pills and every leaf that has a position.
  for (const g of groups) {
    const { cx, cy, angles } = LAYOUT[g.id];
    nodes.set(`cat:${g.id}`, { id: `cat:${g.id}`, label: g.label, kind: "cat", x: cx, y: cy, w: Math.round(g.label.length * 8.4 + 40), h: 36, i: order++ });
    g.items.forEach((item, k) => {
      const id = `t:${item.toLowerCase()}`;
      const deg = angles[k];
      if (deg == null || nodes.has(id)) return;
      const r = (deg * Math.PI) / 180;
      nodes.set(id, { id, label: item, kind: "leaf", x: round(cx + RX * Math.cos(r)), y: round(cy + RY * Math.sin(r)), w: Math.round(item.length * 7.3 + 28), h: 30, i: order++ });
    });
  }
  // Pass 2: edges (category → each of its technologies, shared ones included).
  let e = 0;
  for (const g of groups) {
    for (const item of g.items) {
      const id = `t:${item.toLowerCase()}`;
      if (nodes.has(id)) edges.push({ a: `cat:${g.id}`, b: id, kind: "spoke", i: e++ });
    }
  }
  for (const [x, y] of BUILT_ON) {
    const a = `t:${x.toLowerCase()}`;
    const b = `t:${y.toLowerCase()}`;
    if (nodes.has(a) && nodes.has(b)) edges.push({ a, b, kind: "built", i: e++ });
  }
  for (const [x, y] of FLOW) {
    if (nodes.has(`cat:${x}`) && nodes.has(`cat:${y}`)) edges.push({ a: `cat:${x}`, b: `cat:${y}`, kind: "flow", i: e++ });
  }

  const adj = new Map<string, Set<string>>();
  for (const id of nodes.keys()) adj.set(id, new Set([id]));
  for (const { a, b } of edges) {
    adj.get(a)?.add(b);
    adj.get(b)?.add(a);
  }
  return { nodes: [...nodes.values()], byId: nodes, edges, adj };
}

export function StackGraph() {
  const g = useMemo(() => build(), []);
  const [active, setActive] = useState<string | null>(null);
  const near = active ? g.adj.get(active) : null;

  return (
    <svg
      viewBox="0 0 1000 485"
      aria-hidden="true"
      className="h-auto w-full"
      onPointerLeave={() => setActive(null)}
    >
      {/* Edges first; nodes paint over their endpoints. */}
      {g.edges.map((ed) => {
        const a = g.byId.get(ed.a)!;
        const b = g.byId.get(ed.b)!;
        const lit = active !== null && (ed.a === active || ed.b === active);
        const shown = active === null || lit;
        const base =
          ed.kind === "built"
            ? { stroke: "var(--color-mint)", opacity: 0.55, width: 1.4 }
            : ed.kind === "flow"
              ? { stroke: "var(--color-signal)", opacity: 0.3, width: 1.4 }
              : { stroke: "var(--color-rule-strong)", opacity: 1, width: 1 };
        return (
          <path
            key={`${ed.a}>${ed.b}`}
            d={`M${a.x},${a.y} L${b.x},${b.y}`}
            pathLength={1}
            fill="none"
            className="sg-edge"
            stroke={lit ? "var(--color-mint)" : base.stroke}
            strokeWidth={lit ? 1.6 : base.width}
            style={{ "--i": ed.i, opacity: shown ? (lit ? 1 : base.opacity) : 0.08, transition: "opacity .25s, stroke .25s" } as React.CSSProperties}
          />
        );
      })}
      {g.nodes.map((n) => {
        const dim = near !== null && near !== undefined && !near.has(n.id);
        const isActive = n.id === active;
        const cat = n.kind === "cat";
        return (
          <g key={n.id} className="sg-node" style={{ "--i": n.i } as React.CSSProperties}>
            <g
              transform={`translate(${n.x} ${n.y})`}
              onPointerEnter={() => setActive(n.id)}
              style={{ opacity: dim ? 0.18 : 1, transition: "opacity .25s", cursor: "default" }}
            >
              <rect
                x={-n.w / 2}
                y={-n.h / 2}
                width={n.w}
                height={n.h}
                rx={n.h / 2}
                fill={cat ? "var(--color-graphite)" : "var(--color-carbon)"}
                stroke={isActive ? "var(--color-mint)" : cat ? "var(--color-signal)" : "var(--color-rule-strong)"}
                strokeWidth={cat || isActive ? 1.5 : 1}
                style={{ transition: "stroke .25s" }}
              />
              <text
                textAnchor="middle"
                y={cat ? 5 : 4.5}
                fill={cat ? "var(--color-mint)" : "var(--color-bone)"}
                className={cat ? "font-mono text-[13px] font-medium" : "font-mono text-[12px]"}
              >
                {n.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
