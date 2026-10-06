"use client";

import { useEffect, useState } from "react";

/** Live HH:MM in a given IANA timezone. Empty string until mounted to avoid hydration mismatch. */
export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}
