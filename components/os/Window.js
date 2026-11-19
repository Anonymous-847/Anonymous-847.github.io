"use client";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square, Copy } from "lucide-react";
// GNOME / Yaru style window: icon + title on the left, round min / max / close controls on the right.
export default function Win({ w, def, small, bounds, focused, onFocus, onClose, onMin, onMax, left0 = 76, children }) {
  const dc = useDragControls(); const full = small || w.max; const I = def.icon;
  const W = Math.min(def.w, innerWidth - left0 - 12), H = Math.min(def.h, innerHeight - 70);
  const left = Math.max(left0, Math.min(def.x, innerWidth - W - 8)), top = Math.max(40, Math.min(def.y, innerHeight - H - 8));
  const btn = (label, cls, fn, icon) => (<button aria-label={label} onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); fn(); }} className={`grid size-[22px] place-items-center rounded-full transition hover:brightness-125 ${cls}`}>{icon}</button>);
  return (<motion.section aria-label={def.title} initial={{ opacity: 0, scale: .95, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 18 }} transition={{ duration: .18 }}
    drag={!full} dragListener={false} dragControls={dc} dragMomentum={false} dragElastic={0} dragConstraints={bounds} onPointerDown={onFocus}
    style={{ zIndex: w.z, ...(full ? {} : { left, top, width: W, height: H }) }}
    className={`absolute flex flex-col overflow-hidden bg-[#0a0f0c] ${full ? "" : "rounded-xl"} ring-1 transition-shadow ${focused ? "ring-lime/45 shadow-[0_30px_90px_-10px_rgba(0,0,0,.95),0_0_50px_-18px_rgba(44,255,122,.55)]" : "ring-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)]"} ${full ? "bottom-0 left-[4.5rem] right-0 top-8" : ""}`}>
    <header onPointerDown={(e) => dc.start(e)} onDoubleClick={onMax} className={`flex cursor-grab touch-none select-none items-center gap-2 border-b border-white/10 px-3 py-1.5 active:cursor-grabbing ${focused ? "bg-gradient-to-b from-[#16221b] to-[#0d1511]" : "bg-[#0c130f]"}`}>
      <I className="size-4 shrink-0" style={{ color: def.tint }} aria-hidden="true" />
      <span className={`flex-1 truncate font-mono text-[12.5px] ${focused ? "text-ink" : "text-mute"}`}>{def.title}</span>
      <div className="flex items-center gap-2">
        {btn("Minimize", "bg-white/10 text-ink hover:bg-white/20", onMin, <Minus className="size-3" strokeWidth={2.5} />)}
        {!small && btn(full ? "Restore" : "Maximize", "bg-white/10 text-ink hover:bg-white/20", onMax, full ? <Copy className="size-2.5" strokeWidth={2.5} /> : <Square className="size-2.5" strokeWidth={2.5} />)}
        {btn("Close", "bg-[#e95420] text-white", onClose, <X className="size-3" strokeWidth={3} />)}
      </div>
    </header><div className="min-h-0 flex-1 overflow-auto">{children}</div></motion.section>);
}
