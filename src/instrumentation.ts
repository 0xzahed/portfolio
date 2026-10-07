export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node gives each address only 250ms before trying the next. Slow hosts (the
    // contributions API, on some networks) never connect, so the calendar comes up empty.
    const { setDefaultAutoSelectFamilyAttemptTimeout } = await import("node:net");
    setDefaultAutoSelectFamilyAttemptTimeout(2500);
  }
}
