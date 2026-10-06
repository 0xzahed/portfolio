"use client";

import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/useMediaQuery";

type CursorMode = "default" | "link" | "view" | "image" | "hidden";

/**
 * Minimal custom cursor for fine pointers. Elements opt in with
 * data-cursor="view" | "link" | "image". Links and buttons get "link" automatically.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("View");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setMode((tagged.dataset.cursor as CursorMode) ?? "default");
        setLabel(tagged.dataset.cursorLabel ?? "View");
        return;
      }
      if (target?.closest("a, button, [role='tab'], input, textarea, select, label")) {
        setMode("link");
        return;
      }
      setMode("default");
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 96 : mode === "image" ? 64 : mode === "link" ? 40 : 10;
  const filled = mode === "view" || mode === "default";

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="flex items-center justify-center rounded-full border"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible && mode !== "hidden" ? 1 : 0,
          scale: pressed ? 0.85 : 1,
          backgroundColor: filled ? (mode === "view" ? "rgba(32,183,150,1)" : "rgba(242,242,238,1)") : "rgba(242,242,238,0)",
          borderColor: filled ? "rgba(242,242,238,0)" : "rgba(242,242,238,0.5)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.6 }}
        initial={false}
      >
        <m.span
          className="meta relative text-[10px] font-medium text-ink"
          animate={{ opacity: mode === "view" ? 1 : 0, scale: mode === "view" ? 1 : 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </m.span>
      </m.div>
    </m.div>
  );
}
