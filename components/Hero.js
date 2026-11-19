"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { socialList } from "./SocialLinks";
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

function Typer({ words, reduced }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    if (reduced) return; const w = words[i];
    const t = setTimeout(() => { if (!del && n === w.length) return setDel(true); if (del && n === 0) { setDel(false); return setI((i + 1) % words.length); } setN(n + (del ? -1 : 1)); }, !del && n === w.length ? 1400 : del ? 30 : 60);
    return () => clearTimeout(t);
  }, [n, del, i, words, reduced]);
  return <span aria-live="off" className="text-ink">{reduced ? words[0] : words[i].slice(0, n)}<span className="ml-0.5 inline-block h-5 w-px translate-y-1 animate-pulse bg-lime" /></span>;
}

export default function Hero() {
  const reduced = useReducedMotion(), root = useRef(); const [gl, setGl] = useState(false), [small, setSmall] = useState(false);
  useEffect(() => {
    try { setGl(!!document.createElement("canvas").getContext("webgl")); } catch { setGl(false); }
    const f = () => setSmall(innerWidth < 768); f(); addEventListener("resize", f); return () => removeEventListener("resize", f);
  }, []);
  const move = (e) => { root.current.style.setProperty("--x", e.clientX + "px"); root.current.style.setProperty("--y", e.clientY + "px"); };
  const rise = (d) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.5 + d, duration: .7, ease: [.2, .7, .2, 1] } });
  return (<section id="top" ref={root} onPointerMove={move} className="relative min-h-svh overflow-hidden" style={{ "--x": "70%", "--y": "40%" }}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,#141B2B,#080B12_65%)]" />
    <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(520px circle at var(--x) var(--y), rgba(54,123,240,.07), transparent 60%)" }} />
    <div className="absolute inset-0 md:left-[38%]">{gl && <Hero3D portrait={profile.hasPortrait ? profile.portrait : null} reduced={!!reduced} small={small} />}</div>
    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/80 to-transparent md:hidden" />
    <div className="pointer-events-none relative mx-auto flex min-h-svh max-w-7xl items-end px-5 pb-20 pt-28 md:items-center md:pb-0">
      <div className="max-w-xl">
        <motion.p {...rise(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-bg/60 px-3 py-1.5 text-sm text-ink/90 backdrop-blur">
          <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-lime/70" /><span className="relative size-2 rounded-full bg-lime" /></span>Available for freelance work</motion.p>
        <h1 className="font-display text-5xl font-extrabold leading-[.95] tracking-tight sm:text-7xl lg:text-8xl">
          {["FAIZAN", "AHMED"].map((w, i) => (<span key={w} className="block overflow-hidden pb-1"><motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 1.55 + i * .12, duration: .8, ease: [.2, .7, .2, 1] }}>{w}</motion.span></span>))}</h1>
        <motion.p {...rise(.3)} className="mt-4 font-display text-xl text-lime">{profile.title}</motion.p>
        <motion.p {...rise(.4)} className="mt-3 max-w-md text-ink/80">I build full stack web apps and AI systems: agents, RAG pipelines and automation that ship to real users.</motion.p>
        <motion.p {...rise(.5)} className="mt-4 h-7 text-mute">Specializing in <Typer words={profile.specializing} reduced={!!reduced} /></motion.p>
        <motion.div {...rise(.6)} className="pointer-events-auto mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-sm bg-lime px-6 py-3.5 font-medium text-bg transition hover:shadow-[0_0_30px_-4px_#367BF0]">Explore Projects<ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-sm border border-mute/40 bg-bg/40 px-6 py-3.5 backdrop-blur transition hover:border-lime hover:text-lime"><Mail className="size-4" />Contact Me</a>
        </motion.div>
        <motion.ul {...rise(.7)} className="pointer-events-auto mt-8 flex gap-3">{socialList(profile.contact).map((s) => (
          <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-11 place-items-center rounded-full border border-surface bg-bg/60 text-mute transition hover:-translate-y-0.5 hover:border-lime hover:text-lime">{s.icon}</a></li>))}</motion.ul>
      </div></div></section>);
}
