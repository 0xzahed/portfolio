"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useCallback, type ReactNode } from "react";

/** Touch devices scroll natively: smoothing there fights the OS and costs a rAF loop. */
const isTouch = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  // Options don't affect markup, so reading the pointer type here is hydration-safe.
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: false, autoRaf: !isTouch() }}>
      {children}
    </ReactLenis>
  );
}

/** Scroll to an in-page target. Uses Lenis when it's running, native otherwise. */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (target: string) => {
      const el = target === "#top" ? document.body : document.querySelector<HTMLElement>(target);
      if (!el) return;
      if (lenis && !isTouch()) {
        lenis.scrollTo(target === "#top" ? 0 : el, { offset: 0, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      }
      // Move focus for keyboard and screen-reader users without a second jump.
      if (target !== "#top") {
        el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    },
    [lenis],
  );
}
