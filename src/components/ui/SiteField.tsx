"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { useIntro } from "@/components/providers/IntroProvider";

const HeroField = dynamic(() => import("@/components/sections/HeroField"), { ssr: false });

/** The signal field, pinned behind every page so it runs the full length of the site. */
export function SiteField() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  // false on the server and during hydration, true afterwards: the first render is always identical,
  // so a visitor with reduced motion can't cause a hydration mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {!mounted ? null : reduce ? (
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_45%,rgba(32,183,150,0.08),transparent_70%)]" />
      ) : (
        <HeroField active={ready} />
      )}
    </div>
  );
}
