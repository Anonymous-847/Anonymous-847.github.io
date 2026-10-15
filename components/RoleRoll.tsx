"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { rolling } from "@/lib/data";

export default function RoleRoll() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % rolling.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span
      className="relative block h-[1.3em] overflow-hidden text-signal"
      aria-live="off"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
        >
          {rolling[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
