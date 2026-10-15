"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import RevealText from "./RevealText";
import { Bolt, Cap, Globe, Pin } from "./icons";
import { aboutFacts, aboutParagraph, site } from "@/lib/data";

const icons = { pin: Pin, cap: Cap, globe: Globe, bolt: Bolt };

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.55"],
  });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="font-display text-[1.7rem] font-medium leading-[1.25] tracking-tight sm:text-4xl lg:text-[2.6rem]"
    >
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
      className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface"
    >
      {failed ? (
        <div className="grid h-full w-full place-items-center bg-[color-mix(in_oklab,var(--signal)_10%,var(--surface))] font-display text-8xl font-semibold text-signal">
          FA
        </div>
      ) : (
        <motion.div style={{ y, scale: 1.18 }} className="absolute inset-0">
          <Image
            src={site.photo}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <RevealText
          text="A student who ships."
          className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-8xl"
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Portrait />
              <dl className="mt-6 divide-y divide-line rounded-3xl border border-line bg-surface px-5">
                {aboutFacts.map((f) => {
                  const Icon = icons[f.icon];
                  return (
                    <div key={f.label} className="flex items-center gap-4 py-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-signal/10 text-signal">
                        <Icon />
                      </span>
                      <div>
                        <dt className="text-sm text-muted">{f.label}</dt>
                        <dd className="font-medium">{f.text}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <ScrollParagraph text={aboutParagraph} />
          </div>
        </div>
      </div>
    </section>
  );
}
