"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import RevealText from "./RevealText";
import { experience, focusPath } from "@/lib/data";

function FocusPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const [n, setN] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setN(Math.round(v * (focusPath.length - 1)))
  );
  const dot = (i: number) =>
    `h-[19px] w-[19px] shrink-0 rounded-full border-2 transition-colors duration-300 ${
      i <= n ? "border-signal bg-signal" : "border-line bg-bg"
    }`;

  return (
    <div ref={ref} className="mt-16 md:mt-24">
      <h3 className="font-display text-2xl font-semibold tracking-tight">How my focus moved</h3>

      <div className="relative mt-8 hidden lg:block">
        <div className="absolute inset-x-0 top-[9px] h-px bg-line" />
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 top-[9px] h-px origin-left bg-signal"
        />
        <ol className="relative flex justify-between">
          {focusPath.map((s, i) => (
            <li key={s} className="flex flex-col items-start gap-4">
              <span className={dot(i)} />
              <span className="font-display text-lg font-medium">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <ol className="mt-8 space-y-5 lg:hidden">
        {focusPath.map((s, i) => (
          <li key={s} className="flex items-center gap-4">
            <span className={dot(i)} />
            <span className="font-display text-xl font-medium">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Item({ e }: { e: (typeof experience)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-48% 0px -48% 0px" });
  return (
    <div ref={ref} className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-4 md:gap-0 md:pl-0">
      <span
        aria-hidden
        className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 md:left-1/4 md:-translate-x-1/2 ${
          on ? "scale-125 border-signal bg-signal" : "border-line bg-bg"
        }`}
      />
      <p className="text-muted md:pr-12 md:pt-1 md:text-right">{e.period}</p>
      <div className="mt-2 md:col-span-3 md:mt-0 md:pl-12">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {e.title}
        </h3>
        <p className="mt-1 font-medium text-signal">{e.org}</p>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{e.desc}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <RevealText
          text="Experience and education"
          className="font-display text-5xl font-semibold tracking-[-0.035em] md:text-8xl"
        />

        <div ref={ref} className="relative mt-14 md:mt-20">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-1/4" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-signal md:left-1/4"
          />
          {experience.map((e) => (
            <Item key={e.title} e={e} />
          ))}
        </div>

        <FocusPath />
      </div>
    </section>
  );
}
