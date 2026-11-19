"use client";
import { useEffect, useRef } from "react";
export default function Rain({ reduced = false, size = 16, className = "" }) {
  const ref = useRef();
  useEffect(() => {
    if (reduced) return; const c = ref.current, x = c.getContext("2d"); let w, h, cols, drops, raf, last = 0;
    const chars = "01アイウエオカキクケコサシスセソ<>/{}#$%ABCDEF";
    const init = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; cols = Math.ceil(w / size); drops = Array.from({ length: cols }, () => -((Math.random() * 60) | 0)); };
    init();
    const draw = (t) => { raf = requestAnimationFrame(draw); if (t - last < 48 || document.hidden) return; last = t;
      x.globalCompositeOperation = "destination-out"; x.fillStyle = "rgba(0,0,0,.12)"; x.fillRect(0, 0, w, h); x.globalCompositeOperation = "source-over"; x.font = size + "px monospace";
      for (let i = 0; i < cols; i++) { const y = drops[i] * size; const r = Math.random();
        x.fillStyle = r < .03 ? "#ff2e3e" : r < .1 ? "#d7ffe6" : "#1fdc6a"; if (y > 0) x.fillText(chars[(Math.random() * chars.length) | 0], i * size, y);
        if (y > h && Math.random() > .975) drops[i] = 0; drops[i]++; } };
    raf = requestAnimationFrame(draw); addEventListener("resize", init); return () => { cancelAnimationFrame(raf); removeEventListener("resize", init); };
  }, [reduced, size]);
  return <canvas ref={ref} aria-hidden="true" className={`size-full ${className}`} />;
}
