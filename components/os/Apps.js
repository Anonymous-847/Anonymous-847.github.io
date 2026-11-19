"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Send, Trash2, Mail, ChevronLeft, ChevronRight, HardDrive, Folder, Check, GitBranch, Lock } from "lucide-react";
import { profile as p } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { Brand, TechIcon, LinkedIn, siGithub, siWhatsapp } from "../Icons";
import ProjectArt, { projectGlyph } from "./ProjectArt";

export function About() {
  const rows = [["Role", p.title], ["Focus", p.focus.join(" / ")], ["Specializing", p.specializing.join(", ")], ["Education", `${p.education.degree}, ${p.education.school}. ${p.education.until}`], ["Experience", `${p.experience.role}, ${p.experience.org}`]];
  return (<div className="grid gap-5 p-5 font-mono sm:grid-cols-[190px_1fr]">
    <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-lime/30">
      {p.hasPortrait ? (<><img src={p.portrait} alt={p.name} className="size-full object-cover grayscale contrast-125" /><div className="absolute inset-0 bg-gradient-to-tr from-crimson/30 via-transparent to-lime/25 mix-blend-color" /></>)
        : <div className="grid size-full place-items-center rounded-md border border-dashed border-lime/50 p-3 text-center text-xs text-mute">Portrait required<br />public/assets/portrait.jpg</div>}</div>
    <div><h2 className="font-mono text-2xl font-bold">{p.name}<span className="text-lime">@anonymous</span></h2><p className="mt-2 text-sm text-ink/80">{p.about}</p>
      <dl className="mt-4 space-y-2 text-sm">{rows.map(([k, v]) => <div key={k} className="grid grid-cols-[96px_1fr] gap-2"><dt className="text-lime">{k}</dt><dd className="text-mute">{v}</dd></div>)}</dl></div></div>);
}

export function Skills() {
  const cats = Object.keys(skills); const [c, setC] = useState(cats[0]);
  return (<div className="p-5 font-mono"><div role="tablist" className="mb-5 flex flex-wrap gap-2">{cats.map((k) => <button key={k} role="tab" aria-selected={k === c} onClick={() => setC(k)} className={`rounded-lg border px-3 py-1.5 text-sm transition ${k === c ? "border-lime bg-lime/10 text-lime" : "border-white/10 text-mute hover:text-ink"}`}>{k}</button>)}</div>
    <ul key={c} className="grid grid-cols-2 gap-3 sm:grid-cols-3">{skills[c].map((s, i) => (<motion.li key={s} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }} whileHover={{ y: -3 }} className="flex h-24 flex-col items-center justify-center gap-2 rounded-md border border-white/10 bg-black/20 text-mute transition-colors hover:border-lime/50 hover:text-lime">
      <TechIcon name={s} className="size-7" /><span className="px-1 text-center text-xs text-ink/80">{s}</span><span className="text-[10px] text-lime/70">[installed]</span></motion.li>))}</ul></div>);
}

function Typed({ text, speed = 22, className = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); const iv = setInterval(() => setN((x) => { if (x >= text.length) { clearInterval(iv); return x; } return x + 1; }), speed); return () => clearInterval(iv); }, [text, speed]);
  return <span className={className}>{text.slice(0, n)}<span className="term-cursor inline-block w-[0.6em]">{n < text.length ? text[n] : "\u00a0"}</span></span>;
}
const J = { k: "text-[#d28cff]", s: "text-lime", p: "text-mute" };
function StackJson({ x }) {
  const q = (t) => <span className={J.s}>"{t}"</span>, k = (t) => <span className={J.k}>"{t}"</span>;
  return (<pre className="overflow-x-auto whitespace-pre text-[12.5px] leading-6"><span className={J.p}>{"{"}</span>{"\n"}{"  "}{k("name")}{": "}{q(x.id)}{",\n  "}{k("category")}{": "}{q(x.category)}{",\n  "}{k("stack")}{": ["}{x.stack.map((t, i) => <span key={t}>{i ? ", " : ""}{q(t)}</span>)}{"],\n  "}{k("deployed")}{": "}<span className="text-[#ffd166]">{String(!!x.live)}</span>{",\n  "}{k("url")}{": "}{x.live ? q(x.live) : <span className="text-mute">null</span>}{",\n  "}{k("repository")}{": "}{x.github ? q(x.github) : <span className="text-mute">null</span>}{"\n"}<span className={J.p}>{"}"}</span></pre>);
}
function Btn({ href, icon, children }) {
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="btn">{icon}{children}</a> : <span aria-disabled="true" title="No public link yet" className="btn">{icon}{children}</span>;
}
export function Projects() {
  const [i, setI] = useState(0), [tab, setTab] = useState("README.md"); const x = projects[i], live = !!x.live;
  const go = (d) => setI((n) => (n + d + projects.length) % projects.length);
  const tabs = ["README.md", "stack.json", "deploy.sh"];
  return (<div className="flex h-full flex-col font-mono text-[13px]">
    <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-3 py-2">
      <button aria-label="Previous project" onClick={() => go(-1)} className="grid size-7 place-items-center rounded-md bg-white/5 text-mute hover:bg-white/10 hover:text-ink"><ChevronLeft className="size-4" /></button>
      <button aria-label="Next project" onClick={() => go(1)} className="grid size-7 place-items-center rounded-md bg-white/5 text-mute hover:bg-white/10 hover:text-ink"><ChevronRight className="size-4" /></button>
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden rounded-md bg-white/5 px-3 py-1 text-xs text-mute"><HardDrive className="size-3.5 shrink-0" /><span className="truncate">/ home / anonymous / projects / <span className="text-lime">{x.id}</span></span></div>
      <span className="hidden text-xs text-mute sm:block">{i + 1}/{projects.length}</span>
    </div>
    <div className="grid min-h-0 flex-1 md:grid-cols-[210px_1fr]">
      <aside className="flex overflow-x-auto border-b border-white/10 bg-black/25 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
        <p className="hidden px-4 pb-1 pt-3 text-[10px] uppercase tracking-[.2em] text-mute md:block">Places</p>
        {projects.map((q, n) => (<button key={q.id} onClick={() => { setI(n); setTab("README.md"); }} aria-current={n === i} className={`group flex shrink-0 items-center gap-2.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-left text-xs transition md:w-full md:border-b-0 md:border-l-2 ${n === i ? "bg-white/[.06] text-ink" : "border-transparent text-mute hover:bg-white/[.03] hover:text-ink"}`} style={n === i ? { borderColor: q.accent } : undefined}>
          <span style={{ color: q.accent }}>{projectGlyph(q, "size-4")}</span><span className="truncate">{q.id}</span></button>))}
        <p className="mt-auto hidden px-4 py-3 text-[10px] text-mute md:block">{projects.length} items · {projects.filter((q) => q.live).length} live</p>
      </aside>
      <main key={x.id} className="min-w-0 overflow-y-auto">
        <ProjectArt project={x} className="h-44 sm:h-56">
          <div className="flex items-end justify-between gap-3"><div className="min-w-0"><p className="mb-1 flex items-center gap-2 text-[11px]" style={{ color: x.accent }}><span className={`size-1.5 rounded-full ${live ? "animate-pulse" : ""}`} style={{ background: live ? x.accent : "#6b8577" }} />{live ? "ONLINE" : "NOT PUBLIC"} · {x.category}</p>
            <h2 className="glitch truncate font-mono text-xl font-bold leading-tight text-white sm:text-3xl" style={{ textShadow: `0 0 18px ${x.accent}88` }}>{x.name}</h2></div></div>
        </ProjectArt>
        <div className="flex gap-1 border-b border-white/10 bg-black/30 px-3 pt-2">{tabs.map((t) => (<button key={t} onClick={() => setTab(t)} className={`rounded-t-md px-3 py-1.5 text-xs transition ${tab === t ? "bg-[#0a0f0c] text-lime ring-1 ring-white/10" : "text-mute hover:text-ink"}`}>{t}</button>))}</div>
        <div className="space-y-4 p-4 sm:p-5">
          <p className="text-mute"><span className="text-lime">guest@anonymous</span>:<span className="text-[#5aa9ff]">~/projects/{x.id}</span>$ <Typed key={x.id + tab} text={tab === "deploy.sh" ? `cat ${tab}` : `${tab === "stack.json" ? "jq . " : "cat "}${tab}`} /></p>
          {tab === "README.md" && (<div className="space-y-4">
            <h3 className="text-base font-bold text-ink"><span className="text-mute"># </span>{x.name}</h3>
            <p className="leading-relaxed text-ink/85"><span className="text-mute">&gt; </span>{x.desc}</p>
            <div><p className="mb-2 text-xs text-mute">## Stack</p><ul className="flex flex-wrap gap-2 text-xs">{x.stack.map((s) => <li key={s} className="flex items-center gap-1.5 rounded border border-white/10 bg-black/40 px-2 py-1"><TechIcon name={s === "React" ? "React.js" : s} className="size-3.5 text-lime" />{s}</li>)}</ul></div>
            <div className="flex items-center gap-2 text-xs">{live ? <><Check className="size-3.5 text-lime" /><span className="text-lime">deployed</span></> : <><Lock className="size-3.5 text-mute" /><span className="text-mute">not publicly available</span></>}<GitBranch className="ml-3 size-3.5 text-mute" /><span className="text-mute">{x.github ? "public repo" : "private repo"}</span></div>
            <div className="flex flex-wrap gap-3"><Btn href={x.live} icon={<ExternalLink className="size-4" />}>xdg-open live</Btn><Btn href={x.github} icon={<Brand icon={siGithub} className="size-4" />}>git clone</Btn></div></div>)}
          {tab === "stack.json" && <StackJson x={x} />}
          {tab === "deploy.sh" && (<pre className="overflow-x-auto whitespace-pre text-[12.5px] leading-6"><span className="text-mute">#!/usr/bin/env bash{"\n"}# {x.name}{"\n"}</span>{x.live ? <><span className="text-[#d28cff]">xdg-open</span> <span className="text-lime">"{x.live}"</span></> : <span className="text-mute"># live url: not public</span>}{"\n"}{x.github ? <><span className="text-[#d28cff]">git clone</span> <span className="text-lime">"{x.github}"</span></> : <span className="text-mute"># repository: private</span>}</pre>)}
        </div>
      </main>
    </div></div>);
}

export function Contact() {
  const c = p.contact;
  const items = [["WhatsApp", c.whatsapp && `https://wa.me/${c.whatsapp}`, <Brand icon={siWhatsapp} className="size-6" />, c.whatsapp ? "Message me" : "Number not set"],
    ["Email", `mailto:${c.email}`, <Mail className="size-6" />, c.email], ["LinkedIn", c.linkedin, <Brand icon={LinkedIn} className="size-6" />, "Connect"], ["GitHub", c.github, <Brand icon={siGithub} className="size-6" />, "View my code"]];
  return (<div className="p-5 font-mono"><p className="mb-1 font-mono text-sm text-lime">$ ./establish_connection<span className="animate-pulse">_</span></p><p className="mb-5 text-sm text-mute">Pick a channel. I reply fastest on WhatsApp and email.</p>
    <ul className="grid gap-3 sm:grid-cols-2">{items.map(([l, h, ic, sub]) => (<li key={l}>{h ? <a href={h} target={l === "Email" ? undefined : "_blank"} rel="noopener noreferrer" className="btn !flex !justify-start !gap-4 !py-4 !normal-case !tracking-normal">{ic}<span className="text-left"><span className="block text-sm font-semibold uppercase tracking-wider">{l}</span><span className="block break-all text-xs opacity-80">{sub}</span></span></a>
      : <span aria-disabled="true" title="Add your number in data/profile.js" className="btn !flex !justify-start !gap-4 !py-4 !normal-case !tracking-normal">{ic}<span className="text-left"><span className="block text-sm font-semibold uppercase tracking-wider">{l}</span><span className="block text-xs">{sub}</span></span></span>}</li>))}</ul></div>);
}

const ideas = ["What projects has Faizan built?", "Does he develop AI agents?", "What technologies does he use?", "Can I hire him?"];
export function Assistant() {
  const [m, setM] = useState([]), [v, setV] = useState(""), [busy, setBusy] = useState(false), end = useRef();
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [m, busy]);
  async function send(t) { t = t.trim(); if (!t || busy) return; const n = [...m, { role: "user", text: t }]; setM(n); setV(""); setBusy(true);
    try { const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: n }) }); const d = await r.json(); setM([...n, { role: "assistant", text: r.ok ? d.text : d.error, err: !r.ok }]); } catch { setM([...n, { role: "assistant", text: "Network error.", err: true }]); } setBusy(false); }
  const b = "max-w-[88%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm";
  return (<div className="flex h-full flex-col font-mono"><div className="flex-1 space-y-3 overflow-y-auto p-4"><p className={`${b} bg-white/5`}>Hey! I&apos;m Faizan&apos;s AI assistant. Want to explore his projects, technical skills or development experience?</p>
    {!m.length && <div className="flex flex-wrap gap-2">{ideas.map((q) => <button key={q} onClick={() => send(q)} className="btn !px-3 !py-1.5 !text-xs !normal-case !tracking-normal">{q}</button>)}</div>}
    {m.map((x, i) => <div key={i} className={x.role === "user" ? "flex justify-end" : ""}><p className={`${b} ${x.role === "user" ? "bg-lime/15 text-lime" : x.err ? "bg-crimson/20 text-crimson" : "bg-white/5"}`}>{x.text}</p></div>)}
    {busy && <p className="flex gap-1" aria-label="Typing">{[0, 1, 2].map((d) => <motion.span key={d} className="size-1.5 bg-lime" animate={{ opacity: [.2, 1, .2] }} transition={{ repeat: Infinity, duration: 1, delay: d * .15 }} />)}</p>}<div ref={end} /></div>
    <form onSubmit={(e) => { e.preventDefault(); send(v); }} className="mx-3 mb-3 flex rounded-md border border-white/10 bg-black/30"><button type="button" aria-label="Clear conversation" onClick={() => setM([])} className="px-3 text-mute hover:text-crimson"><Trash2 className="size-4" /></button>
      <input value={v} maxLength={600} onChange={(e) => setV(e.target.value)} placeholder="Ask about Faizan..." aria-label="Message" className="flex-1 bg-transparent py-3 text-sm outline-none" /><button disabled={busy} aria-label="Send" className="px-4 text-lime disabled:opacity-50"><Send className="size-4" /></button></form></div>);
}
