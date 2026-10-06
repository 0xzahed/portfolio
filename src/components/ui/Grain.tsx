/** Static SVG noise, nudged by a stepped CSS animation. One composited layer, no JS. */
export function Grain() {
  const noise =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] overflow-hidden opacity-[0.05]">
      <div
        className="absolute -inset-[10%] animate-grain will-change-transform"
        style={{ backgroundImage: noise, backgroundSize: "160px 160px" }}
      />
    </div>
  );
}
