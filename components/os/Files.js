"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HardDrive, Images, FolderOpen, FileText, Database, Mail, Bot, Terminal, FolderGit2, ImageIcon, X } from "lucide-react";
import { gallery } from "@/data/gallery";
import { projects } from "@/data/projects";
const dirs = [["system", "System", HardDrive], ["gallery", "Gallery", Images], ["pictures", "Projects Pictures", FolderOpen]];
const sys = [["about.txt", FileText, "about"], ["skills.db", Database, "skills"], ["contact.sh", Mail, "contact"], ["terminal", Terminal, "terminal"], ["assistant.ai", Bot, "assistant"], ["projects", FolderGit2, "projects"]];
function Preview({ t, big }) {
  return t.src ? <img src={t.src} alt={t.title} className={`size-full ${big ? "object-contain" : "object-cover"}`} />
    : (<div className="relative grid size-full place-items-center" style={{ background: `radial-gradient(circle at 30% 30%, hsl(${t.hue ?? 215} 85% 55% / .45), transparent 65%), #0E131D` }}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(#ffffff14 1px,transparent 1px),linear-gradient(90deg,#ffffff14 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="relative text-center text-ink/70"><ImageIcon className="mx-auto size-8" strokeWidth={1.2} aria-hidden="true" /><p className="mt-2 px-2 text-xs">{t.src === "" && t.hue === undefined ? "Image slot: add it in data/gallery.js" : "Add a screenshot in data/projects.js"}</p></div></div>);
}
export default function Files({ onOpen }) {
  const [d, setD] = useState("system"), [lb, setLb] = useState(null);
  const items = d === "gallery" ? gallery : projects.map((p) => ({ title: p.name, src: p.image, hue: p.hue }));
  const name = dirs.find((x) => x[0] === d)[1];
  return (<div className="relative grid h-full md:grid-cols-[185px_1fr]">
    <ul role="tablist" className="flex overflow-x-auto border-b border-white/10 md:flex-col md:border-b-0 md:border-r">{dirs.map(([id, n, I]) => (<li key={id}><button role="tab" aria-selected={d === id} onClick={() => setD(id)} className={`flex w-full items-center gap-2 whitespace-nowrap border-l-2 px-4 py-3 text-left text-sm transition ${d === id ? "border-lime bg-lime/10 text-lime" : "border-transparent text-mute hover:text-ink"}`}><I className="size-4" aria-hidden="true" />{n}</button></li>))}</ul>
    <div className="min-w-0 overflow-auto p-4"><p className="mb-4 font-mono text-xs text-mute">/home/anonymous/<span className="text-lime">{name}</span> <span className="text-mute/60">({d === "system" ? sys.length : items.length} items)</span></p>
      <AnimatePresence mode="wait"><motion.ul key={d} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={d === "system" ? "grid grid-cols-3 gap-3 sm:grid-cols-4" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>
        {d === "system" ? sys.map(([n, I, app]) => (<li key={n}><button onClick={() => onOpen(app)} className="group flex w-full flex-col items-center gap-2 rounded-xl border border-transparent p-3 text-mute transition hover:border-lime/40 hover:bg-lime/5 hover:text-lime"><I className="size-9 transition group-hover:scale-110" strokeWidth={1.4} aria-hidden="true" /><span className="text-center text-xs text-ink/80">{n}</span></button></li>))
          : items.map((t) => (<li key={t.title}><motion.button whileHover={{ y: -4, rotateX: 4 }} onClick={() => setLb(t)} aria-label={`Open ${t.title}`} className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 transition hover:border-lime/60"><Preview t={t} />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-6 text-left text-sm">{t.title}</span></motion.button></li>))}</motion.ul></AnimatePresence></div>
    <AnimatePresence>{lb && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col bg-black/90 p-4 backdrop-blur" onClick={() => setLb(null)}>
      <div className="mb-3 flex items-center justify-between"><span className="font-display">{lb.title}</span><button aria-label="Close preview" className="btn btn-red !px-3 !py-1.5"><X className="size-4" /></button></div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-lime/30"><Preview t={lb} big /></div></motion.div>)}</AnimatePresence></div>);
}
