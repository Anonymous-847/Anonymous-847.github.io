"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "./icons";
import { site } from "@/lib/data";

function useKarachiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);
  return time;
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const time = useKarachiTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="overflow-hidden px-5 pt-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-muted">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>
          Local time in Pakistan:{" "}
          <span className="font-medium text-ink tabular-nums">{time || "--:--"}</span>
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-medium text-ink"
        >
          Back to top
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors group-hover:bg-ink group-hover:text-bg">
            <ArrowUp />
          </span>
        </a>
      </div>
      <motion.div
        aria-hidden
        style={{ y }}
        className="mx-auto mt-6 max-w-7xl select-none whitespace-nowrap text-center font-display text-[clamp(3rem,15.5vw,16rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-ink/[0.07]"
      >
        {site.name}
      </motion.div>
    </footer>
  );
}
