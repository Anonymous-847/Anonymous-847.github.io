"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { profile as p } from "@/data/profile";
export default function Timeline() {
  const rows = [[Briefcase, "Experience", p.experience.role, p.experience.org], [GraduationCap, "Education", p.education.degree, `${p.education.school} · ${p.education.until}`]];
  return (<section id="experience" className="mx-auto max-w-6xl px-5 py-24">
    <h2 className="mb-10 font-display text-4xl font-bold">Experience</h2>
    <div className="relative ml-4 space-y-10 pl-10">
      <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.1 }} style={{ originY: 0 }} className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-lime to-violet/40" />
      {rows.map(([I, k, t, s], i) => (<motion.div key={k} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .3 + i * .25 }} className="relative">
        <span className="absolute -left-[3.4rem] top-0 grid size-9 place-items-center border border-lime/40 bg-bg text-lime"><I className="size-4" aria-hidden="true" /></span>
        <p className="text-sm text-mute">{k}</p><p className="font-display text-xl">{t}</p><p className="text-mute">{s}</p></motion.div>))}</div></section>);
}
