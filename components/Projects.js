"use client";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, FileSearch, Globe, ShoppingCart, MessageSquare, ExternalLink, Layers, Database, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { Brand, siGithub, siNext } from "./Icons";
const catIcon = { "AI Assistant": Bot, "Document AI": FileSearch, "Web Platform": Globe, "E-commerce": ShoppingCart, "AI Chatbot": MessageSquare };
const tagIcon = { "Next.js": <Brand icon={siNext} className="size-3.5" />, RAG: <Database className="size-3.5" />, AI: <Sparkles className="size-3.5" /> };
function Btn({ href, icon, children }) {
  const base = "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm transition";
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} border-lime text-lime hover:bg-lime hover:text-bg`}>{icon}{children}</a>
    : <span aria-disabled="true" title="Add this link in data/projects.js" className={`${base} cursor-not-allowed border-surface text-mute`}>{icon}{children}</span>;
}
function Panel({ p }) {
  const mx = useMotionValue(0), my = useMotionValue(0), I = catIcon[p.category] || Layers;
  const rx = useSpring(useTransform(my, [-.5, .5], [9, -9]), { stiffness: 150, damping: 18 }), ry = useSpring(useTransform(mx, [-.5, .5], [-11, 11]), { stiffness: 150, damping: 18 });
  const gx = useTransform(mx, [-.5, .5], ["20%", "80%"]), gy = useTransform(my, [-.5, .5], ["20%", "80%"]);
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - .5); my.set((e.clientY - r.top) / r.height - .5); };
  return (<div style={{ perspective: 1100 }} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }}>
    <motion.article initial={{ opacity: 0, rotateY: 28, x: 50, scale: .96 }} animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }} exit={{ opacity: 0, x: -50, scale: .96 }} transition={{ duration: .45 }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="overflow-hidden border border-surface bg-bg2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]">
      <div className="relative h-64 overflow-hidden sm:h-80" style={{ background: `linear-gradient(135deg,#0E131D,#080B12)` }}>
        {p.image ? <img src={p.image} alt={`${p.name} preview`} className="absolute inset-0 size-full object-cover" /> : (<>
          <motion.div className="absolute inset-0" style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, hsl(${p.hue} 85% 55% / .5), transparent 55%)`) }} />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#ffffff14 1px,transparent 1px),linear-gradient(90deg,#ffffff14 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <I className="absolute right-6 top-6 size-24 text-ink/25 sm:size-32" strokeWidth={1} style={{ transform: "translateZ(70px)" }} aria-hidden="true" /></>)}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-5 pt-16"><span className="font-display text-4xl font-extrabold sm:text-6xl" style={{ display: "block", transform: "translateZ(60px)" }}>{p.name}</span></div>
        <span className="absolute left-4 top-4 flex items-center gap-1.5 border border-lime/40 bg-bg/70 px-2.5 py-1 text-xs text-lime backdrop-blur"><I className="size-3.5" aria-hidden="true" />{p.category}</span>
      </div>
      <div className="space-y-4 p-5 sm:p-6"><p className="text-lg">{p.desc}</p>
        <ul className="flex flex-wrap gap-2 text-xs text-ink/80">{p.stack.map((s) => <li key={s} className="flex items-center gap-1.5 border border-surface px-2.5 py-1.5">{tagIcon[s] || <Layers className="size-3.5" />}{s}</li>)}</ul>
        <div className="flex flex-wrap gap-3"><Btn href={p.github} icon={<Brand icon={siGithub} className="size-4" />}>GitHub</Btn><Btn href={p.live} icon={<ExternalLink className="size-4" />}>Live Preview</Btn></div></div>
    </motion.article></div>);
}
export default function Projects() {
  const [i, setI] = useState(0);
  return (<section id="projects" className="mx-auto max-w-6xl px-5 py-24">
    <h2 className="mb-10 font-display text-4xl font-bold">Project archive</h2>
    <div className="grid gap-8 md:grid-cols-[230px_1fr]">
      <ul className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-0 md:pb-0" role="tablist">{projects.map((p, n) => { const I = catIcon[p.category] || Layers; return (
        <li key={p.id}><button role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`flex w-full items-center gap-3 whitespace-nowrap border-b-2 px-4 py-3 text-left transition md:border-b-0 md:border-l-2 ${n === i ? "border-lime bg-lime/5 text-ink" : "border-surface text-mute hover:text-ink"}`}><I className="size-4" aria-hidden="true" />{p.name}</button></li>); })}</ul>
      <AnimatePresence mode="wait"><Panel key={projects[i].id} p={projects[i]} /></AnimatePresence>
    </div></section>);
}
