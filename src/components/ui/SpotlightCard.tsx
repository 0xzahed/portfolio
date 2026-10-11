"use client";

import { useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 21st-style spotlight card: a cursor-tracked radial glow follows the
 * pointer across the card. Compositor-friendly (single background layer),
 * disabled on touch / reduced motion.
 */
export function SpotlightCard({
  children,
  className,
  glow = "rgba(170, 183, 183, 0.13)",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -600, y: -600, on: false });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
      className={cn(
        "group/spot relative h-full overflow-hidden rounded-3xl border border-rule bg-graphite/70 transition-colors duration-300 hover:border-rule-strong",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          pos.on ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: `radial-gradient(560px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
