"use client";

import Image from "next/image";
import { person } from "@/data/portfolio";
import { useLocalTime } from "@/hooks/useLocalTime";
import { StatusDot } from "@/components/ui/StatusDot";
import portrait from "@/assets/zahed-portrait.webp";
import { Panel, v } from "./atoms";

/** Who: name and role beside a portrait, then where, local time and availability. */
export function RoleCard() {
  const time = useLocalTime(person.timezone);
  return (
    <Panel className="flex flex-col justify-between gap-5">
      <div
        className="s-in pointer-events-none absolute bottom-0 right-0 h-[88%] max-w-[60%]"
        style={v(1)}
        aria-hidden
      >
        <Image
          src={portrait}
          alt=""
          sizes="(min-width: 768px) 320px, 45vw"
          className="h-full w-auto object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
        />
      </div>

      <div className="s-in relative" style={v(0)}>
        <p className="display text-[clamp(2.25rem,6vw,3.75rem)] [--wdth:100]">
          {person.name}
        </p>
        <p className="mt-1.5 text-sm text-ash">{person.role}</p>
      </div>

      <dl className="relative grid max-w-[54%] gap-4 border-t border-rule pt-4">
        <div className="s-in" style={v(2)}>
          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
            Based in
          </dt>
          <dd className="mt-1 text-sm text-bone">{person.location}</dd>
        </div>
        <div className="s-in" style={v(3)}>
          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">
            Local time
          </dt>
          <dd
            className="mt-1 font-mono text-sm tabular-nums text-bone"
            suppressHydrationWarning
          >
            {time || "--:--"}
          </dd>
        </div>
        {person.available && (
          <div className="s-in" style={v(4)}>
            <dd className="inline-flex items-center gap-2 rounded-xl border border-signal/40 px-3 py-1.5 text-xs leading-snug text-mint">
              <StatusDot />
              {person.availability}
            </dd>
          </div>
        )}
      </dl>
    </Panel>
  );
}
