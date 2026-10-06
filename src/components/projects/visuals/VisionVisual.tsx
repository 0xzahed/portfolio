"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const COLS = 22;
const ROWS = 14;
const CLASSES = [
  { label: "Downy mildew", p: 0.81 },
  { label: "Gray mold", p: 0.11 },
  { label: "Leaf scars", p: 0.05 },
  { label: "Fresh leaf", p: 0.03 },
];

/** Deterministic leaf-shaped activation map (no randomness → no hydration mismatch). */
function leafCells() {
  const cells: number[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const nx = (c - COLS / 2 + 0.5) / (COLS / 2);
      const ny = (r - ROWS / 2 + 0.5) / (ROWS / 2);
      const leaf = 1 - (nx * nx) / 0.9 - (ny * ny) / (0.75 + 0.25 * (1 - Math.abs(nx)));
      const lesion = Math.exp(-(((nx - 0.25) ** 2) / 0.05 + ((ny + 0.15) ** 2) / 0.08));
      const vein = Math.exp(-((ny + nx * 0.15) ** 2) / 0.004) * 0.25;
      cells.push(leaf > 0 ? Math.min(1, 0.12 + vein + lesion * 0.9) : 0);
    }
  }
  return cells;
}

const cellColor = (v: number) =>
  v === 0 ? "rgba(255,255,255,0.025)" : v > 0.5 ? `rgba(32,183,150,${0.25 + v * 0.75})` : `rgba(242,242,238,${v * 0.6})`;

/** One canvas instead of 300+ DOM nodes; columns fade in left to right when visible. */
function ActivationMap({ on, reduce }: { on: boolean; reduce: boolean | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !on) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cells = leafCells();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const gap = 2;
    const size = (w - gap * (COLS - 1)) / COLS;
    const h = size * ROWS + gap * (ROWS - 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let raf = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      const elapsed = reduce ? Infinity : now - t0;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < cells.length; i++) {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        const alpha = Math.max(0, Math.min(1, (elapsed - c * 25) / 400));
        if (alpha === 0) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = cellColor(cells[i]);
        ctx.fillRect(c * (size + gap), r * (size + gap), size, size);
      }
      ctx.globalAlpha = 1;
      if (elapsed < COLS * 25 + 450) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [on, reduce]);

  return <canvas ref={ref} className="block w-full" style={{ aspectRatio: `${COLS} / ${ROWS}` }} />;
}

export function VisionVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid h-full w-full grid-cols-1 border border-rule bg-graphite sm:grid-cols-[1.5fr_1fr]">
      <div className="relative flex items-center justify-center overflow-hidden border-rule p-6 sm:border-r">
        <ActivationMap on={on} reduce={reduce} />
        {!reduce && on && (
          <m.div
            aria-hidden
            className="absolute inset-y-0 w-px bg-mint/70"
            initial={{ left: "0%" }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
          />
        )}
        <span className="absolute left-4 top-3 font-mono text-[10px] text-ash">activation map · densenet201</span>
      </div>
      <div className="hidden flex-col justify-center gap-5 p-6 sm:flex">
        <p className="font-mono text-[10px] text-ash">Illustrative inference</p>
        <ul className="space-y-3.5">
          {CLASSES.map((c, i) => (
            <li key={c.label}>
              <div className="flex justify-between text-[11px]">
                <span className={i === 0 ? "text-bone" : "text-ash"}>{c.label}</span>
                <span className="font-mono tabular-nums text-ash">{c.p.toFixed(2)}</span>
              </div>
              <div className="mt-1.5 h-px w-full bg-rule">
                <m.div
                  className={`h-px origin-left ${i === 0 ? "bg-signal" : "bg-ash"}`}
                  initial={{ scaleX: 0 }}
                  animate={on ? { scaleX: c.p } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2 border-t border-rule pt-4">
          <p className="font-mono text-[10px] text-ash">K-fold validation</p>
          <div className="mt-3 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((k) => (
              <m.span
                key={k}
                className="h-6 flex-1 border border-rule-strong"
                initial={{ backgroundColor: "rgba(32,183,150,0)" }}
                animate={on ? { backgroundColor: "rgba(32,183,150,0.35)" } : {}}
                transition={{ delay: 1 + k * 0.25, duration: 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
