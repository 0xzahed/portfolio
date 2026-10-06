"use client";

import { m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Frame } from "./Frame";
import { pad } from "@/lib/utils";

const LINES = [
  { k: "req", v: "GET /api/stream/sign?lesson=physics-07" },
  { k: "auth", v: "X-Device-Token  a91f…3c2e  matched" },
  { k: "exp", v: "now + 300s" },
  { k: "sig", v: "sha256(key + path + exp)" },
  { k: "res", v: "200  signed url issued" },
];

export function StreamVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-15% 0px" });
  const [left, setLeft] = useState(300);

  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => setLeft((s) => (s <= 1 ? 300 : s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [on]);

  return (
    <div ref={ref} className="h-full w-full">
      <Frame path="ieducationbd.com / course / physics / lesson-07">
        <div className="grid h-full grid-cols-1 sm:grid-cols-[1.35fr_1fr]">
          <div className="relative flex flex-col justify-center border-rule p-3 sm:border-r sm:p-5">
            <div className="relative aspect-video w-full overflow-hidden bg-ink">
              <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_40%,rgba(122,231,209,0.12),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-full border border-rule-strong">
                  <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-bone" />
                </span>
              </div>
              <div className="absolute inset-x-3 bottom-3">
                <div className="h-0.5 w-full bg-rule-strong">
                  <m.div
                    className="h-0.5 origin-left bg-signal"
                    initial={{ scaleX: 0.1 }}
                    animate={on ? { scaleX: 0.46 } : {}}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-ash">
                  <span>12:41</span>
                  <span>Lesson 07 · Wave motion</span>
                </div>
              </div>
            </div>
            <p className="mt-3 font-mono text-[10px] text-ash">
              Link expires in{" "}
              <span className="text-mint tabular-nums">
                {pad(Math.floor(left / 60))}:{pad(left % 60)}
              </span>
            </p>
          </div>
          <div className="hidden flex-col justify-center gap-2.5 p-5 font-mono text-[10.5px] sm:flex">
            {LINES.map((l, i) => (
              <m.div
                key={l.k}
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={on ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
              >
                <span className="w-8 shrink-0 text-smoke">{l.k}</span>
                <span className={i === LINES.length - 1 ? "text-signal" : "text-bone/85"}>{l.v}</span>
              </m.div>
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
}
