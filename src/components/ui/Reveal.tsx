"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Masked line reveal: each line slides up from behind its own clip.
 * Pass an array of lines; each becomes one masked row.
 */
export function RevealLines({
  lines,
  id,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  animateNow,
}: {
  lines: ReactNode[];
  id?: string;
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** When defined, animation is driven by this flag instead of viewport entry. */
  animateNow?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { y: reduce ? 0 : "105%" },
    shown: (i: number) => ({
      y: "0%",
      transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger },
    }),
  };
  const trigger =
    animateNow === undefined
      ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -12% 0px" } }
      : { animate: animateNow ? "shown" : "hidden" };

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <m.span
            className={cn("js-reveal block", lineClassName)}
            custom={i}
            variants={variants}
            initial="hidden"
            {...trigger}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

/** Quiet fade-and-rise for supporting content. Use sparingly. */
export function Fade({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={cn("js-reveal", className)}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
