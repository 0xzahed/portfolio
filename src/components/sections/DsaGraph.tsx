import { Chips } from "@/components/story/atoms";
import { skills } from "@/data/portfolio";
import type { CSSProperties } from "react";

/**
 * The DSA group, drawn as a knowledge graph instead of a plain chip row.
 *
 * Radial layout: Big-O sits at the hub, the six data structures chain across
 * the top arc (the evolution story: array → linked list → stack/queue → hash →
 * trees → graphs), and the algorithms hang along the bottom arc. Extra edges
 * mark real relationships: BFS/DFS belongs to graphs, greedy is a special case
 * of DP. A small token orbits the rim like a traversal.
 *
 * Server-rendered SVG + CSS only: the sweep is staggered keyframes (--i), the
 * orbit is offset-path. prefers-reduced-motion squashes everything to a static
 * graph (and hides the token). Phones get the chips back — the SVG scales past
 * legibility there — plus an sr-only list so the content isn't lost to AT.
 */

type Node = { label: string; x: number; y: number; w: number; i?: number };

const H = 42; // pill height

const HUB: Node = { label: "Big-O", x: 460, y: 170, w: 66 };

const nodes: Node[] = [
  { label: "Array", x: 120, y: 170, w: 66, i: 0 },
  { label: "Linked List", x: 166, y: 104, w: 110, i: 1 },
  { label: "Stacks & Queues", x: 290, y: 56, w: 140, i: 2 },
  { label: "Hash Tables", x: 460, y: 38, w: 110, i: 3 },
  { label: "Trees & Heaps", x: 630, y: 56, w: 124, i: 4 },
  { label: "Graphs", x: 754, y: 104, w: 74, i: 5 },
  { label: "Sorting & Searching", x: 800, y: 170, w: 166, i: 6 },
  { label: "Dynamic Programming", x: 754, y: 236, w: 166, i: 7 },
  { label: "Greedy", x: 630, y: 284, w: 74, i: 8 },
  { label: "BFS / DFS", x: 460, y: 298, w: 96, i: 9 },
  { label: "Recursion", x: 290, y: 284, w: 96, i: 10 },
  { label: "Two Pointers & Sliding Window", x: 150, y: 236, w: 238, i: 11 },
];

const chain: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
];
/** Semantically real, geometrically clean extra edges. */
const extras: [number, number][] = [
  [5, 9], // graphs → BFS/DFS
  [7, 8], // DP ↔ greedy
];

function spoke(to: Node) {
  return `M${HUB.x},${HUB.y} L${to.x},${to.y}`;
}
function edge([a, b]: [number, number]) {
  return `M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`;
}
/* The token's rim path lives in globals.css as `dsa-token`'s offset-path —
   same ellipse (center 460,170 · rx 340 · ry 132) the satellites sit on. */

function Pill({ node }: { node: Node }) {
  // --i: sweep order — each node blinks mint as the token passes it. The hub has none.
  const style = node.i !== undefined ? ({ "--i": node.i } as CSSProperties) : undefined;
  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <rect
        x={-node.w / 2}
        y={-H / 2}
        width={node.w}
        height={H}
        rx={H / 2}
        fill="var(--color-carbon)"
        stroke="var(--color-rule-strong)"
        className={node.i !== undefined ? "dsa-node" : undefined}
        style={style}
      />
      <text
        textAnchor="middle"
        y={4.5}
        className="dsa-node-text font-mono text-[12px] tracking-[0.01em]"
        style={style}
        fill="var(--color-bone)"
      >
        {node.label}
      </text>
    </g>
  );
}

export function DsaGraph() {
  const items = skills.find((s) => s.id === "dsa")?.items ?? [];
  return (
    <div>
      {/* Phones: the SVG overflows at ~360px, so chips carry the content there
          (desktop shows "Sliding Window"-style shortened labels instead). */}
      <div className="md:hidden">
        <Chips items={items} />
      </div>
      {/* Accessible fallback: the full item list, kept for assistive tech. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <svg viewBox="0 0 920 340" aria-hidden="true" className="hidden h-auto w-full md:block">
        {/* Spokes from the Big-O hub to every concept. */}
        <g stroke="var(--color-rule-strong)" strokeWidth={1} fill="none" className="dsa-spoke">
          {nodes.map((n) => (
            <path key={`spoke-${n.label}`} d={spoke(n)} />
          ))}
        </g>
        {/* Semantic edges: the structure-evolution chain + derived-algorithm links. */}
        <g stroke="var(--color-mint)" strokeOpacity={0.35} strokeWidth={1.2} fill="none">
          {chain.map(([a, b]) => (
            <path key={`chain-${a}-${b}`} d={edge([a, b])} />
          ))}
          {extras.map(([a, b]) => (
            <path key={`edge-${a}-${b}`} d={edge([a, b])} />
          ))}
        </g>
        {/* Traversal token orbiting the rim. */}
        <circle r={3.5} fill="var(--color-mint)" className="dsa-token" />
        {/* Nodes paint over the edge endpoints. */}
        {nodes.map((n) => (
          <Pill key={n.label} node={n} />
        ))}
        <Pill node={HUB} />
      </svg>
    </div>
  );
}
