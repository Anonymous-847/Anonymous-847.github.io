"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

export default function Preloader() {
  const [phase, setPhase] = useState<"count" | "leave" | "gone">("count");
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(2, "0"));
  const bar = useTransform(count, (v) => v / 100);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.seen === "1") return;
    root.style.overflow = "hidden";
    const controls = animate(count, 100, {
      duration: 1.15,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        root.style.overflow = "";
        setPhase("leave");
      },
    });
    return () => {
      controls.stop();
      root.style.overflow = "";
    };
  }, [count]);

  if (phase === "gone") return null;

  return (
    <motion.div
      aria-hidden
      className="preloader fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 text-bg md:p-10"
      initial={{ y: 0 }}
      animate={{ y: phase === "leave" ? "-101%" : 0 }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase !== "leave") return;
        try {
          sessionStorage.setItem("fa-seen", "1");
        } catch {}
        document.documentElement.dataset.seen = "1";
        setPhase("gone");
      }}
    >
      <div className="flex items-start justify-between font-display text-lg font-medium">
        <span>Faizan Ahmed</span>
        <span className="opacity-60">Portfolio</span>
      </div>
      <div className="flex items-end justify-between">
        <motion.span className="font-display text-[clamp(6rem,24vw,20rem)] font-semibold leading-[0.8] tracking-tighter">
          {label}
        </motion.span>
        <span className="mb-2 hidden max-w-[16ch] text-right text-sm opacity-60 sm:block">
          Agentic AI engineer and full-stack developer
        </span>
      </div>
      <motion.div
        style={{ scaleX: bar }}
        className="absolute inset-x-0 bottom-0 h-1 origin-left bg-mark"
      />
    </motion.div>
  );
}
