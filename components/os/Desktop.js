"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Terminal as TermI, FolderOpen, FolderGit2, Cpu, User, Mail, Bot, Wifi, WifiOff, Volume2, VolumeX, BatteryFull, BatteryCharging, ChevronDown, LayoutGrid, Search, Power, Lock, Folder } from "lucide-react";
import Boot from "./Boot";
import AnonLogo from "./AnonLogo";
import Rain from "./MatrixRain";
import Win from "./Window";
import Terminal from "./Terminal";
import Files from "./Files";
import Fx from "./Fx";
import ControlPanel, { useBattery } from "./ControlCenter";
import { About, Skills, Projects, Contact, Assistant } from "./Apps";

const defs = {
  terminal: { title: "guest@anonymous: ~", name: "Terminal", icon: TermI, tint: "#2cff7a", x: 96, y: 70, w: 700, h: 430 },
  files: { title: "Files — Home", name: "Files", icon: FolderOpen, tint: "#ffb020", x: 130, y: 96, w: 780, h: 480 },
  projects: { title: "Projects — ~/projects", name: "Projects", icon: FolderGit2, tint: "#ff2e3e", x: 170, y: 74, w: 900, h: 560 },
  about: { title: "About — about.txt", name: "About", icon: User, tint: "#5aa9ff", x: 760, y: 80, w: 520, h: 420 },
  skills: { title: "Software — Installed", name: "Skills", icon: Cpu, tint: "#d28cff", x: 220, y: 100, w: 660, h: 440 },
  contact: { title: "Contact — ./establish_connection", name: "Contact", icon: Mail, tint: "#35d6ff", x: 300, y: 110, w: 560, h: 400 },
  assistant: { title: "AI Assistant", name: "AI Assistant", icon: Bot, tint: "#ff3b6b", x: 800, y: 110, w: 440, h: 540 },
};
const ids = Object.keys(defs);

export default function Desktop({ s, set, onReboot }) {
  const reduced = !!useReducedMotion(); const bat = useBattery();
  const [boot, setBoot] = useState(true), [time, setTime] = useState(null), [cc, setCc] = useState(false), [grid, setGrid] = useState(false), [q, setQ] = useState(""), [lock, setLock] = useState(false), [off, setOff] = useState(false), [sel, setSel] = useState("");
  const [wins, setWins] = useState({}), z = useRef(10), bounds = useRef(), eye = useRef();
  const focus = useCallback((id) => { setGrid(false); setWins((w) => ({ ...w, [id]: { open: true, min: false, max: w[id]?.max || false, z: ++z.current } })); }, []);
  useEffect(() => {
    const t = () => setTime(new Date()); t(); const iv = setInterval(t, 15000);
    const m = (e) => { if (eye.current) eye.current.style.transform = `translate(${Math.max(-3, Math.min(3, (e.clientX / innerWidth - .5) * 8))}px,${Math.max(-3, Math.min(3, (e.clientY / innerHeight - .5) * 8))}px)`; };
    const k = (e) => { if (e.key === "Escape") { setGrid(false); setCc(false); } };
    addEventListener("pointermove", m, { passive: true }); addEventListener("keydown", k); return () => { removeEventListener("pointermove", m); removeEventListener("keydown", k); clearInterval(iv); };
  }, []);
  const done = useCallback(() => { setBoot((b) => { if (!b) return b; setTimeout(() => { focus("terminal"); setTimeout(() => focus("about"), 250); }, 0); return false; }); }, [focus]);
  const top = Math.max(...Object.values(wins).filter((w) => w.open && !w.min).map((w) => w.z), 0);
  const topId = ids.find((id) => wins[id]?.open && !wins[id].min && wins[id].z === top);
  const dock = (id) => { const w = wins[id]; if (w?.open && !w.min && w.z === top) setWins({ ...wins, [id]: { ...w, min: true } }); else focus(id); };
  const upd = (id, patch) => setWins((w) => ({ ...w, [id]: { ...w[id], ...patch } }));
  const body = { terminal: <Terminal onOpen={focus} />, files: <Files onOpen={focus} />, about: <About />, projects: <Projects />, skills: <Skills />, contact: <Contact />, assistant: <Assistant /> };
  const reboot = () => { setCc(false); setWins({}); setBoot(true); };
  const fmt = (o) => time?.toLocaleString([], o) ?? "";
  const apps = ids.filter((id) => defs[id].name.toLowerCase().includes(q.toLowerCase()));
  const coarse = typeof matchMedia !== "undefined" && matchMedia("(pointer:coarse)").matches;
  const desk = [["Home", Folder, "files", "#ffb020"], ["Projects", FolderGit2, "projects", "#ff2e3e"], ["Terminal", TermI, "terminal", "#2cff7a"]];
  const WifiI = s.wifi && !s.plane ? Wifi : WifiOff, VolI = s.vol ? Volume2 : VolumeX, BatI = bat.charging ? BatteryCharging : BatteryFull;

  if (off) return (<div className="fixed inset-0 grid place-items-center bg-black"><button onClick={() => { setOff(false); reboot(); }} aria-label="Power on" className="group grid place-items-center gap-3 text-mute"><span className="grid size-16 place-items-center rounded-full border border-white/20 transition group-hover:border-crimson group-hover:text-crimson"><Power className="size-7" /></span><span className="font-mono text-xs">system halted · click to power on</span></button></div>);

  return (<div ref={bounds} onPointerDown={(e) => { if (e.target === e.currentTarget || e.target.dataset.desk) { setCc(false); setSel(""); } }} className={`fixed inset-0 overflow-hidden bg-black ${s.glitch ? "" : "fx-off"}`} style={{ filter: `brightness(${s.bright / 100})` }}>
    <div data-desk="1" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/wallpaper.svg)" }} />
    {s.rain && <div className="pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"><Rain reduced={reduced} size={16} /></div>}
    <AnimatePresence>{boot && <Boot onDone={done} />}</AnimatePresence>

    {/* top panel */}
    <header className="absolute inset-x-0 top-0 z-[60] flex h-8 items-center justify-between border-b border-white/5 bg-black/80 px-2 text-[13px] backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <button onClick={() => { setGrid((g) => !g); setCc(false); }} className={`flex items-center gap-2 rounded-full px-3 py-0.5 transition hover:bg-white/10 ${grid ? "bg-white/15" : ""}`}><AnonLogo className="size-5" /><span className="font-medium">Activities</span></button>
        <span className="ml-2 hidden font-medium text-ink/90 sm:block">{topId ? defs[topId].name : "Desktop"}</span>
      </div>
      <button className="absolute left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 tabular-nums transition hover:bg-white/10" onClick={() => { setCc((c) => !c); setGrid(false); }} aria-label="Date and time"><span className="glitch">{time ? fmt({ weekday: "short", day: "numeric", month: "short" }) + "  " + fmt({ hour: "2-digit", minute: "2-digit" }) : ""}</span></button>
      <div className="flex items-center gap-1">
        <span aria-hidden="true" title="it is watching" className="mr-1 grid size-5 place-items-center overflow-hidden rounded-full border border-crimson/60 bg-black"><span ref={eye} className="size-2 rounded-full bg-crimson shadow-[0_0_6px_#ff2e3e] transition-transform duration-150" /></span>
        <button onClick={() => { setCc((c) => !c); setGrid(false); }} aria-label="System menu" aria-expanded={cc} className={`flex items-center gap-2.5 rounded-full px-3 py-0.5 transition hover:bg-white/10 ${cc ? "bg-white/15" : ""}`}><WifiI className="size-4" /><VolI className="size-4" /><span className="flex items-center gap-1"><BatI className="size-4" /><span className="text-xs tabular-nums">{bat.level}%</span></span><ChevronDown className="size-3 opacity-70" /></button>
      </div>
    </header>

    {/* control center */}
    <AnimatePresence>{cc && (<motion.div key="cc" initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .98 }} transition={{ duration: .15 }} className="absolute right-2 top-10 z-[70] w-[22rem] max-w-[calc(100vw-1rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#070b09]/95 shadow-[0_30px_80px_-10px_#000,0_0_40px_-20px_#2cff7a] backdrop-blur-2xl">
      <ControlPanel s={s} set={set} onLock={() => { setCc(false); setLock(true); }} onReboot={reboot} onOff={() => { setCc(false); setOff(true); }} /></motion.div>)}</AnimatePresence>

    {/* desktop icons */}
    {!boot && <ul className="absolute right-5 top-12 z-[5] flex flex-col gap-2">{desk.map(([n, I, app, tint]) => (<li key={n}><button data-desk="1" onClick={() => (coarse ? focus(app) : setSel(n))} onDoubleClick={() => focus(app)} onKeyDown={(e) => e.key === "Enter" && focus(app)} className={`flex w-[84px] flex-col items-center gap-1 rounded-lg p-2 text-xs transition ${sel === n ? "bg-white/15 ring-1 ring-white/20" : "hover:bg-white/10"}`}><I className="size-9 drop-shadow-[0_0_10px_currentColor]" style={{ color: tint }} strokeWidth={1.5} /><span className="text-ink [text-shadow:0_1px_3px_#000]">{n}</span></button></li>))}</ul>}

    {!boot && <AnimatePresence>{ids.map((id) => { const w = wins[id]; return w?.open && !w.min && (<Win key={id} w={w} def={defs[id]} bounds={bounds} focused={w.z === top} onFocus={() => w.z !== top && focus(id)} onClose={() => upd(id, { open: false })} onMin={() => upd(id, { min: true })} onMax={() => upd(id, { max: !w.max })}>{body[id]}</Win>); })}</AnimatePresence>}

    {/* dock */}
    {!boot && <nav aria-label="Dock" className="absolute bottom-0 left-0 top-8 z-[55] flex w-[68px] flex-col items-center gap-1.5 border-r border-white/5 bg-black/60 py-2 backdrop-blur-xl">
      {ids.map((id) => { const d = defs[id], I = d.icon, o = wins[id]?.open; return (<motion.button key={id} onClick={() => dock(id)} aria-label={d.name} whileHover={{ x: 4, scale: 1.08 }} whileTap={{ scale: .93 }} className={`group relative grid size-12 place-items-center rounded-xl transition-colors ${o ? "bg-white/10" : "hover:bg-white/[.07]"}`}>
        <I className="size-6" style={{ color: d.tint, filter: `drop-shadow(0 0 6px ${d.tint}66)` }} />
        {o && <span className="absolute -left-[10px] size-1.5 rounded-full bg-lime shadow-[0_0_6px_#2cff7a]" />}
        <span className="pointer-events-none absolute left-14 z-10 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs text-ink opacity-0 transition group-hover:opacity-100">{d.name}</span></motion.button>); })}
      <button onClick={() => { setGrid((g) => !g); setCc(false); }} aria-label="Show applications" className={`group relative mt-auto grid size-12 place-items-center rounded-xl text-ink transition hover:bg-white/10 ${grid ? "bg-white/15" : ""}`}><LayoutGrid className="size-6" /><span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs opacity-0 transition group-hover:opacity-100">Show Applications</span></button>
    </nav>}

    {/* activities / app grid */}
    <AnimatePresence>{grid && (<motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && setGrid(false)} className="absolute inset-x-0 bottom-0 top-8 z-[58] flex flex-col items-center gap-8 bg-black/85 px-6 pt-10 backdrop-blur-xl">
      <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-white/[.07] px-4 py-2.5 focus-within:border-lime/60"><Search className="size-4 text-mute" /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to search" aria-label="Search applications" className="term-input w-full bg-transparent font-mono text-sm text-ink placeholder:text-mute" /></label>
      <ul className="grid max-w-3xl grid-cols-4 gap-x-8 gap-y-6 sm:grid-cols-5">{apps.map((id) => { const d = defs[id], I = d.icon; return (<li key={id}><button onClick={() => focus(id)} className="group flex w-24 flex-col items-center gap-2 rounded-xl p-2 transition hover:bg-white/10"><span className="grid size-16 place-items-center rounded-2xl border border-white/10 bg-[#0a110d] transition group-hover:scale-105" style={{ boxShadow: `0 0 24px -10px ${d.tint}` }}><I className="size-8" style={{ color: d.tint }} /></span><span className="text-xs text-ink">{d.name}</span></button></li>); })}{!apps.length && <li className="col-span-full font-mono text-sm text-mute">no results for "{q}"</li>}</ul>
    </motion.div>)}</AnimatePresence>

    <Fx s={s} />

    {/* lock screen */}
    <AnimatePresence>{lock && (<motion.div key="lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -40 }} onClick={() => setLock(false)} className="absolute inset-0 z-[120] grid cursor-pointer place-items-center bg-cover bg-center" style={{ backgroundImage: "url(/wallpaper.svg)" }}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />
      <div className="relative text-center"><p className="font-mono text-7xl font-bold tabular-nums">{time && fmt({ hour: "2-digit", minute: "2-digit" })}</p><p className="mt-2 text-lg text-ink/80">{time && fmt({ weekday: "long", day: "numeric", month: "long" })}</p>
        <div className="mx-auto mt-10 w-fit"><AnonLogo className="mx-auto size-20" /><p className="mt-3 font-mono text-sm">guest</p><p className="mt-1 animate-pulse font-mono text-xs text-mute">click anywhere to unlock · password: none</p></div></div></motion.div>)}</AnimatePresence>
  </div>);
}
