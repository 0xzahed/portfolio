"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const PAY = ["SSLCommerz", "bKash", "COD"];
const SHIP = ["Pathao", "RedX", "Steadfast"];

// Layout in a 600×360 viewBox.
const COL = { checkout: 70, pay: 220, order: 380, ship: 530 };
const ROWY = [90, 180, 270];

const nodeW = (label: string) => Math.max(64, label.length * 7.4 + 22);

function Node({ x, y, label, strong }: { x: number; y: number; label: string; strong?: boolean }) {
  const w = nodeW(label);
  return (
    <g transform={`translate(${x - w / 2} ${y - 14})`}>
      <rect width={w} height={28} fill={strong ? "#f2f2ee" : "#0c0d0d"} stroke="rgba(255,255,255,0.16)" />
      <text
        x={w / 2}
        y={18}
        textAnchor="middle"
        fontSize="11"
        fontFamily="var(--font-geist)"
        fill={strong ? "#050505" : "#f2f2ee"}
      >
        {label}
      </text>
    </g>
  );
}

export function CommerceVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const edges: string[] = [];
  const half = (l: string) => nodeW(l) / 2;
  const co = COL.checkout + half("Checkout");
  const oi = COL.order - half("Order");
  const oo = COL.order + half("Order");
  PAY.forEach((p, i) => edges.push(`M${co} 180 C ${co + 50} 180, ${COL.pay - half(p) - 50} ${ROWY[i]}, ${COL.pay - half(p)} ${ROWY[i]}`));
  PAY.forEach((p, i) => edges.push(`M${COL.pay + half(p)} ${ROWY[i]} C ${COL.pay + half(p) + 50} ${ROWY[i]}, ${oi - 50} 180, ${oi} 180`));
  SHIP.forEach((s, i) => edges.push(`M${oo} 180 C ${oo + 50} 180, ${COL.ship - half(s) - 50} ${ROWY[i]}, ${COL.ship - half(s)} ${ROWY[i]}`));

  return (
    <div ref={ref} className="relative h-full w-full border border-rule bg-graphite">
      <div className="absolute left-4 top-4 flex gap-6 font-mono text-[10px] text-ash sm:left-6 sm:top-5">
        <span>checkout</span>
        <span className="hidden sm:inline">payment adapters</span>
        <span className="hidden sm:inline">fulfilment</span>
      </div>
      <svg viewBox="0 0 600 360" className="absolute inset-0 h-full w-full" role="img" aria-label="Checkout routes to SSLCommerz, bKash or cash on delivery, then to Pathao, RedX or Steadfast couriers">
        {edges.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {on && !reduce && (
              <circle r="2.2" fill="#20b796">
                <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${(i % 3) * 0.7 + Math.floor(i / 3) * 0.9}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        ))}
        <Node x={COL.checkout} y={180} label="Checkout" strong />
        {PAY.map((p, i) => (
          <Node key={p} x={COL.pay} y={ROWY[i]} label={p} />
        ))}
        <Node x={COL.order} y={180} label="Order" strong />
        {SHIP.map((s, i) => (
          <Node key={s} x={COL.ship} y={ROWY[i]} label={s} />
        ))}
      </svg>
      <m.div
        className="absolute inset-x-4 bottom-4 flex items-center gap-2 font-mono text-[10px] text-ash sm:inset-x-6 sm:bottom-5"
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        {["Placed", "Paid", "Picked up", "In transit", "Delivered"].map((s, i) => (
          <span key={s} className="flex flex-1 items-center gap-2">
            <span className={`size-1.5 shrink-0 rounded-full ${i < 4 ? "bg-signal" : "border border-ash"}`} />
            <span className="hidden truncate md:inline">{s}</span>
            {i < 4 && <span className="h-px flex-1 bg-rule-strong" />}
          </span>
        ))}
      </m.div>
    </div>
  );
}
