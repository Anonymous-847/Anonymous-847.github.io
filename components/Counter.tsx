"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

export default function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.5,
      ease: [0.2, 0.8, 0.1, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => c.stop();
  }, [inView, to]);

  return <span ref={ref}>{to}</span>;
}
