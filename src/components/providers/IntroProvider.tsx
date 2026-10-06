"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type IntroState = { ready: boolean; setReady: (v: boolean) => void };

const IntroContext = createContext<IntroState>({ ready: true, setReady: () => {} });

/** `ready` flips to true when the opening sequence hands over to the page. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return useContext(IntroContext);
}
