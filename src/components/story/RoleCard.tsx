"use client";

import { Clock, MapPin } from "lucide-react";
import { person } from "@/data/portfolio";
import { useLocalTime } from "@/hooks/useLocalTime";
import { StatusDot } from "@/components/ui/StatusDot";
import { Panel, v } from "./atoms";

/** Who: name, role, where, local time, availability. */
export function RoleCard() {
  const time = useLocalTime(person.timezone);
  return (
    <Panel className="flex flex-col justify-between gap-6">
      <div className="s-in" style={v(0)}>
        <p className="display text-[clamp(2.75rem,9vw,5.5rem)] [--wdth:100]">{person.name}</p>
        <p className="mt-2 text-ash">{person.role}</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-rule pt-5">
        <div className="s-in" style={v(1)}>
          <dt className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
            <MapPin aria-hidden className="size-3.5" strokeWidth={1.5} /> Based in
          </dt>
          <dd className="mt-1.5 text-bone">{person.location}</dd>
        </div>
        <div className="s-in" style={v(2)}>
          <dt className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
            <Clock aria-hidden className="size-3.5" strokeWidth={1.5} /> Local time
          </dt>
          <dd className="mt-1.5 font-mono tabular-nums text-bone" suppressHydrationWarning>
            {time || "--:--"}
          </dd>
        </div>
        {person.available && (
          <div className="s-in col-span-2" style={v(3)}>
            <dd className="inline-flex items-center gap-2.5 rounded-full border border-signal/40 px-3.5 py-1.5 text-sm text-mint">
              <StatusDot />
              {person.availability}
            </dd>
          </div>
        )}
      </dl>
    </Panel>
  );
}
