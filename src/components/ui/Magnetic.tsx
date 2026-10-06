"use client";

import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { useFinePointer } from "@/hooks/useMediaQuery";

/** Pulls its child gently toward the pointer. Inert on touch and with reduced motion. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const active = fine && !reduce;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className ?? "inline-block"}
    >
      {children}
    </m.div>
  );
}
