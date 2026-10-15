"use client";

import { motion } from "motion/react";
import RevealText from "./RevealText";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <RevealText
          text="Tools I work with"
          className="font-display text-5xl font-semibold tracking-[-0.035em] md:text-8xl"
        />

        <div className="mt-14 md:mt-20">
          {skillGroups.map((g) => (
            <div key={g.title} className="relative grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-12">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-ink/80"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
              />
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl font-semibold tracking-tight">{g.title}</h3>
                <p className="mt-2 text-muted">{g.note}</p>
              </div>
              <ul className="flex flex-wrap gap-2.5 md:col-span-8">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-full border border-line bg-surface px-5 py-2.5 text-base font-medium transition-colors duration-200 hover:border-signal hover:bg-signal hover:text-signal-ink"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-ink/80" />
        </div>
      </div>
    </section>
  );
}
