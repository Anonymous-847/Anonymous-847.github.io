"use client";
import { motion } from "framer-motion";
import { Layers, Cpu, Bot, Puzzle, Rocket } from "lucide-react";
import { profile } from "@/data/profile";
const icons = [Layers, Cpu, Bot, Puzzle, Rocket];
export default function About() {
  return (<section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-28 md:grid-cols-[1.4fr_1fr]">
    <div className="overflow-hidden"><motion.p initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: .9, ease: [.2, .7, .2, 1] }} className="font-display text-2xl leading-snug sm:text-3xl">{profile.about}</motion.p></div>
    <ul className="divide-y divide-surface self-end border-y border-surface">{profile.focus.map((f, i) => { const I = icons[i]; return (
      <motion.li key={f} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="flex items-center gap-3 py-3 text-mute"><I className="size-4 text-lime" aria-hidden="true" />{f}</motion.li>); })}</ul>
  </section>);
}
