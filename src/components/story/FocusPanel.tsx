"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Panel, v } from "./atoms";

/**
 * A drawing with three buttons under it. Each button outlines the part of the drawing that
 * carries its number in data-part (a part can list several: data-part="0 1").
 * The outline itself lives in globals.css ([data-focus] rules).
 */
export function FocusPanel({
  points,
  start = 6,
  className,
  children,
}: {
  points: string[];
  /** Stagger index for the buttons' entrance. */
  start?: number;
  className?: string;
  children: ReactNode;
}) {
  const [focus, setFocus] = useState(0);
  return (
    <Panel data-focus={focus} className={className}>
      {children}
      <div
        role="group"
        aria-label="Highlight part of the drawing"
        className="flex flex-wrap gap-2"
      >
        {points.map((t, k) => (
          <span key={t} className="s-in" style={v(start + k)}>
            <button
              type="button"
              aria-pressed={focus === k}
              onClick={() => setFocus(k)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setFocus(k)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-[0.8125rem] transition-colors duration-300 md:px-3.5 md:text-sm",
                focus === k
                  ? "border-signal/60 bg-signal/10 text-mint"
                  : "border-rule-strong text-bone/90 hover:border-bone",
              )}
            >
              {t}
            </button>
          </span>
        ))}
      </div>
    </Panel>
  );
}
