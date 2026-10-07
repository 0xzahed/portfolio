"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet topographic "signal field": iso-contours of slowly drifting noise,
 * warmed toward the accent near the pointer. Raw WebGL, one full-screen
 * triangle, rendered at reduced resolution and paused off-screen.
 */
const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uReveal;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){ v += a*noise(p); p = p*2.03 + 17.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  float t = uTime * 0.035;

  vec2 m = (uMouse - 0.5) * vec2(uRes.x/uRes.y, 1.0);
  float d = length(p - m);
  float lens = exp(-d*d*6.0);

  // domain-warped height field
  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + 4.0));
  float h = fbm(p*1.25 + q*1.3 + vec2(t*0.6, -t*0.4)) + lens*0.18;

  // contour lines with screen-space width
  float bands = 22.0;
  float f = fract(h*bands);
  float w = fwidth(h*bands);
  float line = 1.0 - smoothstep(0.0, w*1.2, min(f, 1.0-f));

  // fade toward the left (where the type sits) and the bottom
  float vign = smoothstep(0.0, 0.75, uv.x*0.9 + 0.15) * smoothstep(0.0, 0.35, uv.y) * smoothstep(1.05, 0.55, uv.y);
  float alpha = line * (0.055 + lens*0.22) * vign * uReveal;

  vec3 base = vec3(0.95, 0.95, 0.93);
  vec3 accent = vec3(0.125, 0.718, 0.588);
  vec3 col = mix(base, accent, clamp(lens*1.6, 0.0, 1.0));
  gl_FragColor = vec4(col*alpha, alpha);
}
`;

export default function HeroField({ active }: { active: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // A fresh canvas per run: a context released by a previous cleanup (StrictMode,
    // HMR) stays lost on its canvas and would paint as an opaque white rectangle.
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "absolute inset-0 h-full w-full";
    host.appendChild(canvas);
    const fallback = () => {
      canvas.remove();
      host.dataset.fallback = "true";
    };
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true, powerPreference: "low-power" });
    if (!gl || !gl.getExtension("OES_standard_derivatives")) {
      fallback();
      return () => delete host.dataset.fallback;
    }

    // Software rasterisers (SwiftShader, llvmpipe) would turn a quiet backdrop into a
    // main-thread hog. Those devices get the static fallback instead.
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    if (/swiftshader|llvmpipe|software|microsoft basic render/i.test(renderer)) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      fallback();
      return () => delete host.dataset.fallback;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      fallback();
      return () => delete host.dataset.fallback;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uReveal = gl.getUniformLocation(prog, "uReveal");

    const small = window.matchMedia("(max-width: 768px)").matches;
    // Render below native resolution: contours are soft, and fill-rate is the cost.
    const scale = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.25) * (small ? 0.6 : 0.75);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * scale));
      canvas.height = Math.max(1, Math.floor(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.72, y: 0.55, tx: 0.72, ty: 0.55 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let reveal = 0;
    let last = 0;
    // The field drifts slowly, so 30fps is indistinguishable and halves the cost.
    const FRAME_MS = 1000 / 30;
    const t0 = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || now - last < FRAME_MS) return;
      last = now;
      if (activeRef.current) reveal = Math.min(1, reveal + 0.012);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uReveal, reveal * reveal * (3 - 2 * reveal));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    // Start once the page has settled so the shader never competes with hydration.
    const start = () => (raf = requestAnimationFrame(frame));
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 1500 }) : globalThis.setTimeout(start, 600);

    return () => {
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else globalThis.clearTimeout(idle);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden className="group/field absolute inset-0">
      {/* Static stand-in shown when WebGL is unavailable or software-rendered. */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(60%_50%_at_75%_45%,rgba(32,183,150,0.07),transparent_70%)] group-data-[fallback=true]/field:block" />
    </div>
  );
}
