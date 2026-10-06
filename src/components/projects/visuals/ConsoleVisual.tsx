"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";
import { Frame } from "./Frame";

const MODULES = ["Overview", "Employees", "Attendance", "Leave", "Payroll", "Finance", "Reports"];
const ROWS = [
  { id: "E-0142", dept: "Operations", basic: 42000, net: 61850 },
  { id: "E-0187", dept: "Finance", basic: 55000, net: 79400 },
  { id: "E-0203", dept: "Engineering", basic: 68000, net: 97120 },
  { id: "E-0219", dept: "Sales", basic: 38000, net: 55600 },
  { id: "E-0234", dept: "HR", basic: 47000, net: 68230 },
  { id: "E-0251", dept: "Support", basic: 31000, net: 45380 },
  { id: "E-0266", dept: "Engineering", basic: 72000, net: 102760 },
  { id: "E-0278", dept: "Operations", basic: 36000, net: 52640 },
];
const bdt = (n: number) => n.toLocaleString("en-IN");
const TOTAL = ROWS.reduce((a, r) => a + r.net, 0);

export function ConsoleVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="h-full w-full">
      <Frame path="coredesk / acme-ltd / payroll / october">
        <div className="flex h-full text-[11px]">
          <aside className="hidden w-[22%] shrink-0 border-r border-rule p-3 sm:block">
            <p className="mb-4 font-mono text-[10px] text-ash">ACME LTD</p>
            <ul className="space-y-0.5">
              {MODULES.map((m) => (
                <li
                  key={m}
                  className={`px-2 py-1.5 ${m === "Payroll" ? "bg-carbon text-bone" : "text-ash"}`}
                >
                  {m}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ash">Payroll run</p>
                <p className="mt-1 text-base font-medium text-bone sm:text-lg">October 2026</p>
              </div>
              <div className="text-right">
                <p className="text-ash">Status</p>
                <m.p
                  className="mt-1 font-mono text-signal"
                  initial={{ opacity: 0 }}
                  animate={on ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  Processing
                </m.p>
              </div>
            </div>
            <div className="mt-4 h-px w-full bg-rule">
              <m.div
                className="h-px origin-left bg-signal"
                initial={{ scaleX: 0 }}
                animate={on ? { scaleX: 0.72 } : {}}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </div>
            <div className="mt-5 grid grid-cols-[1fr_1fr_auto] gap-x-4 border-b border-rule pb-2 text-ash sm:grid-cols-[1fr_1.2fr_1fr_1fr]">
              <span>Employee</span>
              <span className="hidden sm:block">Department</span>
              <span>Basic, BDT</span>
              <span className="text-right">Net, BDT</span>
            </div>
            <ul className="min-h-0 flex-1 overflow-hidden">
              {ROWS.map((r, i) => (
                <m.li
                  key={r.id}
                  className="grid grid-cols-[1fr_1fr_auto] gap-x-4 border-b border-rule py-2 tabular-nums sm:grid-cols-[1fr_1.2fr_1fr_1fr]"
                  initial={{ opacity: 0, x: -8 }}
                  animate={on ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                >
                  <span className="font-mono text-bone">{r.id}</span>
                  <span className="hidden text-ash sm:block">{r.dept}</span>
                  <span className="text-ash">{bdt(r.basic)}</span>
                  <span className="text-right text-bone">{bdt(r.net)}</span>
                </m.li>
              ))}
            </ul>
            <m.div
              className="flex items-baseline justify-between pt-3"
              initial={{ opacity: 0 }}
              animate={on ? { opacity: 1 } : {}}
              transition={{ delay: 1.3 }}
            >
              <span className="text-ash">Sample data · {ROWS.length} employees</span>
              <span className="font-mono text-bone tabular-nums">Total {bdt(TOTAL)}</span>
            </m.div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
