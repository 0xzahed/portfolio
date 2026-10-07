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
 * clears the Bayer threshold; a diagonal shimmer band sweeps the thresholds so the
 * figure keeps catching light. Unlit cells stay as faint dots to hold the silhouette.
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
    // Threshold drift is kept tiny: big shifts toggle cells on/off and read as flicker.
    const amp = (shimmer / 100) * 0.05;
    let cols = 0;
    let rows = 0;
    let cell = cellSize;
    let data: Uint8ClampedArray | null = null;
    let detail: Float32Array | null = null;
    let lo = 0;
    let hi = 1;
    const lum = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
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
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / cellSize);
      rows = Math.floor(h / cellSize);
      cell = w / cols;
      // Downscaling to one pixel per cell averages each cell's colour for us.
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.imageSmoothingQuality = "high";
      // object-contain, anchored to the bottom (matches the static layout).
      const s = Math.min(cols / img.naturalWidth, rows / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      octx.drawImage(img, (cols - dw) / 2, rows - dh, dw, dh);
      data = octx.getImageData(0, 0, cols, rows).data;
      // Auto-levels over the figure only, so mid-tone skin spans the full range.
      const ls: number[] = [];
      for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 90) ls.push(lum(data[i], data[i + 1], data[i + 2]));
      ls.sort((p, q) => p - q);
      lo = ls[Math.floor(ls.length * 0.02)] ?? 0;
      hi = ls[Math.floor(ls.length * 0.98)] ?? 1;
      // Local contrast: each cell against its 5×5 neighbourhood, so features read at this resolution.
      const L = new Float32Array(cols * rows);
      for (let i = 0; i < L.length; i++) L[i] = lum(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
      detail = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
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
          detail[y * cols + x] = n ? L[y * cols + x] - sum / n : 0;
        }
      draw(performance.now());
    };

    const draw = (now: number) => {
      if (!data) return;
      const t = (now - t0) / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const size = cell - Math.max(0.8, cell * 0.16);
      const dot = Math.max(1, cell * 0.16);
      for (let y = 0; y < rows; y++) {
        // Reveal sweeps bottom → top.
        const rowGate = reveal * 1.25 - (1 - y / rows) * 0.25;
        if (rowGate <= 0) continue;
        const fade = Math.min(1, rowGate * 4);
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.35) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          let l = (lum(r, g, b) - lo) / Math.max(0.05, hi - lo);
          l = (l - 0.5) * k + 0.5 + (detail ? detail[y * cols + x] * EDGE : 0);
          // Floor keeps the dark suit as a sparse texture instead of dropping it.
          l = FLOOR + (1 - FLOOR) * Math.max(0, l);
          const band = reduce ? 0 : Math.sin((x * 0.9 + y * 0.55) * 0.1 - t * 0.9);
          const glint = band > 0 ? band * band * band : 0;
          l += band * amp;
          const thr = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
          const px = x * cell;
          const py = y * cell;
          if (l > thr) {
            // Lift the cell's own colour toward bone; the shimmer crest glints teal.
            const m = 0.32 + glint * 0.2;
            const gl = glint * 0.6;
            const tr = 242 * (1 - gl) + 122 * gl;
            const tg = 242 * (1 - gl) + 231 * gl;
            const tb = 238 * (1 - gl) + 209 * gl;
            ctx.fillStyle = `rgba(${Math.round(r + (tr - r) * m)},${Math.round(g + (tg - g) * m)},${Math.round(b + (tb - b) * m)},${(a * fade).toFixed(3)})`;
            ctx.fillRect(px + (cell - size) / 2, py + (cell - size) / 2, size, size);
          } else {
            ctx.fillStyle = `rgba(242,242,238,${(0.3 * a * fade + glint * 0.08 * fade).toFixed(3)})`;
            ctx.fillRect(px + cell / 2 - dot / 2, py + cell / 2 - dot / 2, dot, dot);
          }
        }
      }
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
    if (reduce) {
      // One still frame, redrawn only on resize.
    } else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      img.onload = null;
    };
  }, [src, cellSize, contrast, shimmer]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
