"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useIntro } from "@/components/providers/IntroProvider";

const HeroField = dynamic(() => import("@/components/sections/HeroField"), { ssr: false });

/** The signal field, pinned behind every page so it runs the full length of the site. */
export function SiteField() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {reduce ? (
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_45%,rgba(32,183,150,0.08),transparent_70%)]" />
      ) : (
        <HeroField active={ready} />
      )}
    </div>
  );
}
