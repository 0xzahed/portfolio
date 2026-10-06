"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useLenis } from "lenis/react";

// The first paint is never hidden: transitions only play on client-side navigation.
let hasNavigated = false;

/** Route transition: each page fades and lifts in. Scroll resets on navigation. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const animateIn = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <m.div
      initial={animateIn ? { opacity: 0, y: reduce ? 0 : 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
