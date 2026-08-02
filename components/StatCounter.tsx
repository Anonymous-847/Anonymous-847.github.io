"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const inc = value / 40;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + inc, value);
            setCount(Math.round(current));
            if (current >= value) clearInterval(timer);
          }, 35);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-syne text-3xl font-bold text-white sm:text-4xl">
        {count}
        {suffix}
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/50">
        {label}
      </div>
    </div>
  );
}
