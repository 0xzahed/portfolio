"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/** Loads only the animation features the site uses. `strict` forbids the heavier `motion.*` components. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
