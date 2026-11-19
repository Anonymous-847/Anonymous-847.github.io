"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnonLogo from "./AnonLogo";
import Rain from "./MatrixRain";
const lines = ["GRUB 2.12  Booting 'Anonymous OS 1.0 LTS'", "Loading Linux 6.8.0-anonymous ...", "Loading initial ramdisk ...", "[  OK  ] Mounted /home/anonymous", "[  OK  ] Started Network Manager", "[  OK  ] Loaded module: nextjs", "[  OK  ] Loaded module: langgraph", "[  OK  ] Started rag.service", "[ FAIL ] firewall.service: connection refused", "[ WARN ] /dev/void: something is watching", "[ !!!! ] unauthorized session detected", "[  OK  ] Reached target graphical.target"];
function Scramble({ text }) {
  const [s, setS] = useState("");
  useEffect(() => { let i = 0; const ch = "01#@$%&ABCDEF"; const iv = setInterval(() => { i++; setS([...text].map((c, k) => (k < i / 2 ? c : ch[Math.floor(Math.random() * ch.length)])).join("")); if (i >= text.length * 2) clearInterval(iv); }, 45); return () => clearInterval(iv); }, [text]);
  return <>{s || text.replace(/./g, "0")}</>;
}
export default function Boot({ onDone }) {
  const [n, setN] = useState(1), [logo, setLogo] = useState(false);
  useEffect(() => { if (n > lines.length) { const t = setTimeout(() => setLogo(true), 350); return () => clearTimeout(t); } const t = setTimeout(() => setN(n + 1), 110); return () => clearTimeout(t); }, [n]);
  useEffect(() => { if (!logo) return; const t = setTimeout(onDone, 3600); return () => clearTimeout(t); }, [logo, onDone]);
  return (<motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: .6 }} onClick={onDone} role="status" aria-label="Booting" className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-black font-mono text-[13px]">
    {logo && <div className="absolute inset-0 opacity-40"><Rain size={16} /></div>}
    {!logo ? (<div className="p-6 text-[#cfe9da] sm:p-12">{lines.slice(0, n).map((l, i) => <p key={i} className={/FAIL|!!!!/.test(l) ? "text-crimson" : /WARN/.test(l) ? "text-[#ffd166]" : /OK/.test(l) ? "" : "text-white"}>{l.startsWith("[") ? <><span className={/OK/.test(l) ? "text-lime" : ""}>{l.slice(0, 8)}</span>{l.slice(8)}</> : l}</p>)}<span className="inline-block h-4 w-2 animate-pulse bg-lime" /></div>) : (<>
      <motion.div className="absolute inset-0 bg-crimson" initial={{ opacity: 0 }} animate={{ opacity: [0, .7, 0, .5, 0] }} transition={{ duration: .7 }} />
      <div className="relative grid h-full place-items-center px-4 text-center">
        <div><motion.div className="jolt mx-auto w-fit drop-shadow-[0_0_28px_rgba(255,46,62,.75)]" initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }}><AnonLogo className="size-36 sm:size-48" /></motion.div>
          <h1 className="glitch mt-6 font-mono text-3xl font-bold tracking-[.25em] sm:text-5xl"><Scramble text="ANONYMOUS" /></h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-5 text-crimson">TARGET ACQUIRED: visitor. I can see you.</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-2 text-lime">ACCESS GRANTED</motion.p></div></div></>)}
    <p className="absolute bottom-5 left-5 text-xs text-mute">click to skip</p></motion.div>);
}
