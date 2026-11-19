"use client";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { TechIcon } from "./Icons";
function Tile({ name, i }) {
  const glow = (e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px"); e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px"); };
  return (<motion.li initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * .04 }}>
    <motion.div onPointerMove={glow} whileHover={{ y: -4 }} tabIndex={0} className="group relative flex h-28 flex-col items-center justify-center gap-3 overflow-hidden border border-surface bg-bg2 text-mute transition-colors hover:border-lime/50 hover:text-lime focus-visible:border-lime"
      style={{ backgroundImage: "radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(54,123,240,.10), transparent 70%)" }}>
      <motion.span whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: .5 }}><TechIcon name={name} className="size-8" /></motion.span>
      <span className="px-2 text-center text-xs text-ink/80 group-hover:text-ink">{name}</span></motion.div></motion.li>);
}
export default function Skills() {
  return (<section id="skills" className="mx-auto max-w-6xl px-5 py-24">
    <h2 className="mb-12 font-display text-4xl font-bold">Skills</h2>
    <div className="space-y-12">{Object.entries(skills).map(([cat, list]) => (<div key={cat}>
      <h3 className="mb-4 flex items-center gap-3 font-display text-lg"><span className="h-px w-8 bg-lime" />{cat}</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{list.map((s, i) => <Tile key={s} name={s} i={i} />)}</ul></div>))}</div></section>);
}
