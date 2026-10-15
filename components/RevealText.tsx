"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { ElementType } from "react";

function Word({
  word,
  index,
  delay,
  last,
}: {
  word: string;
  index: number;
  delay: number;
  last: boolean;
}) {
  // Observe the static mask, not the moving child (a clipped child never intersects).
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <>
      <span
        ref={ref}
        className="inline-block overflow-hidden align-bottom [margin-block:-0.1em] [padding-block:0.1em]"
      >
        <motion.span
          className="inline-block"
          initial={{ y: "115%" }}
          animate={{ y: inView ? 0 : "115%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.1, 1], delay: delay + index * 0.05 }}
        >
          {word}
        </motion.span>
      </span>
      {!last && " "}
    </>
  );
}

/** Headline that rises word by word out of a mask when it enters the viewport. */
export default function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} delay={delay} last={i === words.length - 1} />
      ))}
    </Tag>
  );
}
