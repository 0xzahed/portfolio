"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ProjectVisualKind } from "@/lib/types";

/** Empty frame shown while a visual's code loads — same footprint, so nothing shifts. */
export function VisualPlaceholder() {
  return <div className="h-full w-full border border-rule bg-graphite" />;
}

// Each visual is its own chunk: none of this code ships with the first paint.
const MAP: Record<ProjectVisualKind, ComponentType> = {
  console: dynamic(() => import("./ConsoleVisual").then((m) => m.ConsoleVisual), { loading: VisualPlaceholder }),
  stream: dynamic(() => import("./StreamVisual").then((m) => m.StreamVisual), { loading: VisualPlaceholder }),
  feed: dynamic(() => import("./FeedVisual").then((m) => m.FeedVisual), { loading: VisualPlaceholder }),
  commerce: dynamic(() => import("./CommerceVisual").then((m) => m.CommerceVisual), { loading: VisualPlaceholder }),
  vision: dynamic(() => import("./VisionVisual").then((m) => m.VisionVisual), { loading: VisualPlaceholder }),
};

export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const Visual = MAP[kind];
  return <Visual />;
}
