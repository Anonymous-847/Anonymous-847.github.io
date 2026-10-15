"use client";

import { motion } from "motion/react";
import AgentGraph from "./AgentGraph";
import RoleRoll from "./RoleRoll";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";
import { ArrowDown, Download } from "./icons";
import { heroLine, marqueeItems, site } from "@/lib/data";
import { introDelay } from "@/lib/intro";

const ease = [0.2, 0.8, 0.1, 1] as const;

export default function Hero() {
  const base = introDelay();
  const words = site.name.split(" ");
  let n = 0;

  return (
    <section id="top" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--line)_1px,transparent_1.3px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_75%_35%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-32 md:px-10 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: base, ease }}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
              style={{ animation: "ping-soft 1.8s ease-out infinite" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to AI engineering roles and collaborations
        </motion.p>

        <h1 className="mt-8 font-display text-[clamp(3.4rem,11.5vw,11rem)] font-semibold leading-none tracking-[-0.045em]">
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((ch, ci) => {
                const i = n++;
                return (
                  <span
                    key={ci}
                    className="inline-block overflow-hidden align-bottom [margin-block:-0.08em] [padding-block:0.08em]"
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease, delay: base + 0.1 + i * 0.045 }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                );
              })}
              {wi < words.length - 1 && <span className="inline-block w-[0.22em]" />}
            </span>
          ))}
          <span className="sr-only">, {site.title}</span>
        </h1>

        <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: base + 0.55, ease }}
          >
            <p className="font-display text-[1.6rem] font-medium leading-tight tracking-tight sm:text-3xl">
              I build
              <RoleRoll />
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{heroLine}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-4 font-medium text-signal-ink transition-shadow hover:shadow-[0_14px_40px_-10px_var(--signal)]"
                >
                  See my work
                  <ArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.resume}
                  download
                  className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface/70 px-7 py-4 font-medium backdrop-blur transition-colors hover:border-ink"
                >
                  Download CV
                  <Download className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: base + 0.4, ease }}
          >
            <AgentGraph />
          </motion.div>
        </div>
      </div>

      <Marquee items={marqueeItems} />
    </section>
  );
}
