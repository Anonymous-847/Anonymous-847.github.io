"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wifi, WifiOff, BatteryFull, BatteryCharging, Signal, X } from "lucide-react";
import Terminal from "./Terminal";
import Fx from "./Fx";
import ControlPanel, { useBattery } from "./ControlCenter";
import { About, Skills, Projects, Contact, Assistant } from "./Apps";
import Files from "./Files";

const APPS = { projects: Projects, about: About, skills: Skills, contact: Contact, assistant: Assistant, files: Files };
const NAMES = { "⌫": "Backspace", "↑": "Up", "↓": "Down", "←": "Left", "→": "Right", "—": "Dash", "≡": "Menu" };
const ROW1 = [["ESC", "Esc"], ["/", "/"], ["—", "-"], ["HOME", "Home"], ["↑", "Up"], ["END", "End"], ["PGUP", "PgUp"], ["≡", "menu"]];
const ROW2 = [["TAB", "Tab"], ["CTRL", "ctrl"], ["ALT", "alt"], ["←", "Left"], ["↓", "Down"], ["→", "Right"], ["PGDN", "PgDn"], ["⌫", "bksp"]];

// Phone layout = a real-looking Termux session: Android status bar, black terminal, 2-row extra keys, left session drawer.
export default function Termux({ s, set }) {
  const term = useRef(), ctrl = useRef(false), startX = useRef(null);
  const [ctrlOn, setCtrlOn] = useState(false), [altOn, setAltOn] = useState(false), [drawer, setDrawer] = useState(false), [qs, setQs] = useState(false), [app, setApp] = useState(null);
  const [sess, setSess] = useState(1), [keys, setKeys] = useState(true), [time, setTime] = useState("");
  const bat = useBattery();
  useEffect(() => { const t = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })); t(); const iv = setInterval(t, 15000); return () => clearInterval(iv); }, []);
  const setCtrl = (v) => { ctrl.current = v; setCtrlOn(v); };
  const press = useCallback((k) => {
    if (k === "ctrl") return setCtrl(!ctrl.current);
    if (k === "alt") return setAltOn((a) => !a);
    if (k === "menu") return setDrawer(true);
    if (k === "Esc" && app) return setApp(null);
    if (k === "bksp") return term.current?.press("Bksp");
    if (k === "/" || k === "-") term.current?.insert(k); else term.current?.press(ctrl.current && /^[a-z]$/i.test(k) ? "Ctrl+" + k : k);
    if (ctrl.current) setCtrl(false);
  }, [app]);
  const open = (id) => { if (APPS[id]) setApp(id); else if (id === "terminal") setApp(null); };
  const App = app && APPS[app];
  const sw = (e) => { if (e.type === "touchstart") startX.current = e.touches[0].clientX < 28 ? e.touches[0].clientX : null; else if (startX.current !== null && e.touches[0].clientX - startX.current > 50) { startX.current = null; setDrawer(true); } };
  const Key = ({ k: [label, code] }) => { const on = (code === "ctrl" && ctrlOn) || (code === "alt" && altOn); return (<button onMouseDown={(e) => e.preventDefault()} onClick={() => { press(code); if (code !== "menu") term.current?.focus(); }} aria-label={NAMES[label] || label} aria-pressed={on || undefined} className={`grid h-[42px] place-items-center text-[12px] font-medium tracking-wide transition active:bg-[#4b4b4b] ${on ? "bg-[#e6e6e6] text-black" : "bg-[#262626] text-[#e6e6e6]"}`}>{label}</button>); };
  return (<div className={`fixed inset-0 flex flex-col overflow-hidden bg-black font-mono text-[#e6e6e6] ${s.glitch ? "" : "fx-off"}`} style={{ height: "100dvh", filter: `brightness(${s.bright / 100})` }} onTouchStart={sw} onTouchMove={sw}>
    {/* android status bar */}
    <button onClick={() => setQs(true)} aria-label="Quick settings" className="flex h-6 shrink-0 items-center justify-between bg-black px-3 text-[11px] font-sans text-[#e6e6e6]">
      <span className="font-medium tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">{s.wifi && !s.plane ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}<Signal className="size-3" />{bat.charging ? <BatteryCharging className="size-3.5" /> : <BatteryFull className="size-3.5" />}<span>{bat.level}%</span></span></button>

    <div className="relative min-h-0 flex-1">
      <Terminal key={sess} ref={term} variant="termux" onOpen={open} ctrl={ctrl} onCtrlDone={() => setCtrl(false)} />
      <AnimatePresence>{App && (<motion.div key={app} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: .16 }} className="absolute inset-0 z-20 flex flex-col bg-black">
        <div className="flex shrink-0 items-center justify-between border-b border-[#2a2a2a] px-3 py-1.5 text-[12px]"><span className="text-[#2cff7a]">┤ {app} ├</span><button onClick={() => setApp(null)} aria-label="Close app" className="flex items-center gap-1 rounded bg-[#262626] px-2 py-1 text-[11px] active:bg-[#4b4b4b]"><X className="size-3" />ESC</button></div>
        <div className="min-h-0 flex-1 overflow-auto"><App onOpen={open} /></div>
        <div className="flex shrink-0 items-center justify-between bg-[#2cff7a] px-2 py-0.5 text-[11px] font-medium text-black"><span>[0] 0:bash  1:{app}*</span><span>"anonymous" {time}</span></div>
      </motion.div>)}</AnimatePresence>
    </div>

    {keys && <div className="shrink-0 border-t border-[#1a1a1a] bg-[#1a1a1a]"><div className="grid grid-cols-8 gap-px">{ROW1.map((k) => <Key key={k[0]} k={k} />)}</div><div className="mt-px grid grid-cols-8 gap-px">{ROW2.map((k) => <Key key={k[0]} k={k} />)}</div></div>}
    <Fx s={s} />

    {/* session drawer */}
    <AnimatePresence>{drawer && (<>
      <motion.div key="dim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="absolute inset-0 z-[70] bg-black/60" />
      <motion.aside key="dr" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: .2 }} className="absolute inset-y-0 left-0 z-[71] flex w-[78%] max-w-xs flex-col bg-[#202020] font-sans text-[#e6e6e6]">
        <ul className="flex-1 overflow-auto p-2"><li className="rounded bg-[#303030] px-3 py-3 text-sm"><span className="text-[#8a8a8a]">[{sess}] </span>~ <span className="text-[#8a8a8a]">(bash)</span></li></ul>
        <div className="grid grid-cols-3 border-t border-[#333] text-[11px] font-medium"><button className="py-4 active:bg-[#333]" onClick={() => { setDrawer(false); term.current?.focus(); }}>KEYBOARD</button><button className="py-4 active:bg-[#333]" onClick={() => { setSess((n) => n + 1); setApp(null); setDrawer(false); }}>NEW SESSION</button><button className="py-4 active:bg-[#333]" onClick={() => { setKeys((k) => !k); setDrawer(false); }}>TOGGLE</button></div>
      </motion.aside></>)}</AnimatePresence>

    {/* quick settings shade */}
    <AnimatePresence>{qs && (<>
      <motion.div key="qd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setQs(false)} className="absolute inset-0 z-[75] bg-black/60" />
      <motion.div key="qs" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "tween", duration: .2 }} className="absolute inset-x-0 top-0 z-[76] rounded-b-3xl bg-[#0b0f0d] pb-2 shadow-2xl"><ControlPanel s={s} set={set} phone />
        <button onClick={() => setQs(false)} className="mx-auto mb-1 block h-1 w-12 rounded-full bg-white/25" aria-label="Close quick settings" /></motion.div></>)}</AnimatePresence>
  </div>);
}
