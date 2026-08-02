"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const enableTimer = window.setTimeout(() => setEnabled(isFinePointer), 0);
    if (!isFinePointer) return () => window.clearTimeout(enableTimer);

    document.documentElement.classList.add("custom-cursor-active");

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let animId = 0;

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    function loop() {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.clearTimeout(enableTimer);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40"
        aria-hidden="true"
      />
    </>
  );
}
