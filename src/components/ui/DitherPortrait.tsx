"use client";

import { useEffect, useRef } from "react";

// 4×4 ordered-dither thresholds.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const FLOOR = 0.22;
const EDGE = 2.4;

type Props = {
  src: string;
  /** Grid cell in CSS px. */
  cellSize?: number;
  /** Contrast as a percentage; 100 leaves the photo as is. */
  contrast?: number;
  /** Shimmer strength, 0–100. */
  shimmer?: number;
  /** Start the reveal (the cells fade in from the bottom). */
  active?: boolean;
  className?: string;
};

/**
 * A cut-out photo redrawn as an ordered-dither grid. Each cell takes the average
 * colour of the photo beneath it and is lit when its (contrast-boosted) luminance
 * clears the Bayer threshold. Unlit cells stay as faint dots to hold the silhouette.
 *
 * The grid is rendered once into an offscreen canvas; each frame only copies it and
 * sweeps a soft teal band over the lit pixels. Redrawing thousands of cells per frame
 * kept a mid-range phone's main thread ~70% busy.
 */
export function DitherPortrait({ src, cellSize = 9, contrast = 158, shimmer = 60, active = true, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = contrast / 100;
    const glow = (shimmer / 100) * 0.5;
    const lum = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const base = document.createElement("canvas");
    let ready = false;
    let raf = 0;
    let last = 0;
    let visible = true;
    let reveal = reduce ? 1 : 0;
    const t0 = performance.now();

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    const sample = () => {
      if (!img.complete || !img.naturalWidth) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = base.width = Math.round(w * dpr);
      canvas.height = base.height = Math.round(h * dpr);
      const cols = Math.floor(w / cellSize);
      const rows = Math.floor(h / cellSize);
      const cell = w / cols;
      // Downscaling to one pixel per cell averages each cell's colour for us.
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      const bctx = base.getContext("2d");
      if (!octx || !bctx) return;
      octx.imageSmoothingQuality = "high";
      // object-contain, anchored to the bottom (matches the static layout).
      const s = Math.min(cols / img.naturalWidth, rows / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      octx.drawImage(img, (cols - dw) / 2, rows - dh, dw, dh);
      const data = octx.getImageData(0, 0, cols, rows).data;
      // Auto-levels over the figure only, so mid-tone skin spans the full range.
      const ls: number[] = [];
      for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 90) ls.push(lum(data[i], data[i + 1], data[i + 2]));
      ls.sort((p, q) => p - q);
      const lo = ls[Math.floor(ls.length * 0.02)] ?? 0;
      const hi = ls[Math.floor(ls.length * 0.98)] ?? 1;
      // Local contrast: each cell against its 5×5 neighbourhood, so features read at this resolution.
      const L = new Float32Array(cols * rows);
      for (let i = 0; i < L.length; i++) L[i] = lum(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);

      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, w, h);
      const size = cell - Math.max(0.8, cell * 0.16);
      const dot = Math.max(1, cell * 0.16);
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.35) continue;
          let sum = 0;
          let n = 0;
          for (let dy = -2; dy <= 2; dy++)
            for (let dx = -2; dx <= 2; dx++) {
              const xx = x + dx;
              const yy = y + dy;
              if (xx < 0 || yy < 0 || xx >= cols || yy >= rows || data[(yy * cols + xx) * 4 + 3] < 90) continue;
              sum += L[yy * cols + xx];
              n++;
            }
          const detail = n ? L[y * cols + x] - sum / n : 0;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          let l = (L[y * cols + x] - lo) / Math.max(0.05, hi - lo);
          l = (l - 0.5) * k + 0.5 + detail * EDGE;
          // Floor keeps the dark suit as a sparse texture instead of dropping it.
          l = FLOOR + (1 - FLOOR) * Math.max(0, l);
          const thr = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
          const px = x * cell;
          const py = y * cell;
          if (l > thr) {
            // Lift the cell's own colour toward bone.
            const m = 0.32;
            bctx.fillStyle = `rgba(${Math.round(r + (212 - r) * m)},${Math.round(g + (216 - g) * m)},${Math.round(b + (221 - b) * m)},${a.toFixed(3)})`;
            bctx.fillRect(px + (cell - size) / 2, py + (cell - size) / 2, size, size);
          } else {
            bctx.fillStyle = `rgba(212,216,221,${(0.3 * a).toFixed(3)})`;
            bctx.fillRect(px + cell / 2 - dot / 2, py + cell / 2 - dot / 2, dot, dot);
          }
        }
      ready = true;
      draw(performance.now());
    };

    const draw = (now: number) => {
      if (!ready) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      // Reveal: the figure rises in from the bottom.
      const e = 1 - Math.pow(1 - reveal, 3);
      const top = H * (1 - e);
      if (e <= 0) return;
      ctx.drawImage(base, 0, top, W, H - top, 0, top, W, H - top);
      if (reduce || glow <= 0) return;
      // Shimmer: one soft diagonal band crossing the lit pixels every ~7s.
      const t = (now - t0) / 1000;
      const p = ((t / 7) % 1) * 1.6 - 0.3;
      const band = ctx.createLinearGradient(0, 0, W * 0.85, H * 0.52);
      const at = (v: number) => Math.min(1, Math.max(0, v));
      band.addColorStop(at(p - 0.14), "rgba(192,200,202,0)");
      band.addColorStop(at(p), `rgba(192,200,202,${glow})`);
      band.addColorStop(at(p + 0.14), "rgba(192,200,202,0)");
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = band;
      ctx.fillRect(0, top, W, H - top);
    };

    // Shimmer is slow, so 30fps is plenty; paused off-screen and in hidden tabs.
    const FRAME_MS = 1000 / 30;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < FRAME_MS) return;
      last = now;
      if (activeRef.current && reveal < 1) reveal = Math.min(1, reveal + 0.025);
      draw(now);
    };

    img.onload = sample;
    if (img.complete) sample();
    const ro = new ResizeObserver(sample);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      img.onload = null;
    };
  }, [src, cellSize, contrast, shimmer]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
