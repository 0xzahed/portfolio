"use client";

import type { CSSProperties } from "react";
import ContributionSkyline from "@/components/ui/contribution-skyline";
import type { ContributionDay } from "@/lib/github";

/**
 * Real data only. The caller renders the honest empty state when GitHub
 * returned nothing, so the Skyline never shows seeded demo numbers here.
 * CSS vars below map the Skyline's shadcn-style tokens onto this site's
 * dark theme (ink/bone/rule/ash).
 */
export function ActivitySkyline({ days }: { days: ContributionDay[] }) {
  return (
    // Full-bleed on phones: the year is 53 columns wide and needs every pixel.
    <div
      className="-mx-[var(--gutter)] sm:mx-0"
      style={
        {
          "--color-background": "var(--color-carbon)",
          "--color-foreground": "var(--color-bone)",
          "--color-border": "var(--color-rule)",
          "--color-muted-foreground": "var(--color-ash)",
        } as CSSProperties
      }
    >
      <ContributionSkyline
        data={days.map((d) => ({ date: d.date, count: d.count }))}
        showStats={false}
        palette="github"
        defaultView="3d"
        className="max-sm:!rounded-none max-sm:!border-x-0 max-sm:!px-2"
      />
    </div>
  );
}
