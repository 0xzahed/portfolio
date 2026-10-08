import type { CSSProperties } from "react";

type Kind = "up" | "left" | "scale";

/** Props that opt an element into the CSS scroll reveal. `i` staggers siblings (70ms each). */
export function reveal(i = 0, kind: Kind = "up") {
  return { "data-reveal": kind, style: { "--i": i } as CSSProperties };
}
