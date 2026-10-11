"use client";

import { useState } from "react";
import type { ContributionDay, RepoSummary } from "@/lib/github";
import { NumbersVisual, ReposVisual } from "@/components/story/activityVisuals";
import { ActivitySkyline } from "@/components/sections/ActivitySkyline";
import { Panel } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "year", label: "Year" },
  { id: "languages", label: "Languages" },
  { id: "recent", label: "Recent" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Tabbed GitHub panel — one view at a time instead of stacked cards. */
export function ActivityTabs({
  days,
  contributions,
  repos,
  languages,
  recent,
}: {
  days: ContributionDay[];
  contributions: number | null;
  repos: number;
  languages: [string, number][];
  recent: RepoSummary[];
}) {
  const [tab, setTab] = useState<TabId>("year");
  const visible = recent.length > 0 ? TABS : TABS.filter((t) => t.id !== "recent");

  return (
    <div {...reveal(0)}>
      <div role="tablist" aria-label="GitHub activity views" className="inline-flex rounded-full border border-rule-strong p-1">
        {visible.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "h-11 cursor-pointer rounded-full px-6 text-sm transition-colors duration-300",
              tab === t.id ? "bg-signal/15 text-mint" : "text-ash hover:text-bone",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "year" && (
          <div role="tabpanel">
            <Panel className="max-h-none">
              <p className="eyebrow">Last 12 months</p>
              <p className="mt-2 text-sm text-ash">
                {contributions?.toLocaleString("en") ?? "Many"} contributions on GitHub in the last year.
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-full">
                  <ActivitySkyline days={days} />
                </div>
              </div>
            </Panel>
          </div>
        )}
        {tab === "languages" && (
          <div role="tabpanel" className="max-w-3xl">
            <p className="eyebrow mb-3">Most-used across public repos</p>
            <NumbersVisual contributions={contributions} repos={repos} languages={languages} />
          </div>
        )}
        {tab === "recent" && recent.length > 0 && (
          <div role="tabpanel" className="max-w-3xl">
            <p className="eyebrow mb-3">Recently pushed</p>
            <ReposVisual repos={recent} />
          </div>
        )}
      </div>
    </div>
  );
}
