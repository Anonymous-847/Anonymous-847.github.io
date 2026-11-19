"use client";
import { useEffect, useState } from "react";
import { Wifi, WifiOff, Bluetooth, Moon, BellOff, Plane, Volume2, VolumeX, Sun, Lock, Power, RotateCcw, BatteryFull, BatteryCharging, Binary, Tv, Zap, Settings } from "lucide-react";
import AnonLogo from "./AnonLogo";

export function useBattery() {
  const [b, setB] = useState({ level: 100, charging: false });
  useEffect(() => {
    let bat, h; if (!navigator.getBattery) return;
    navigator.getBattery().then((x) => { bat = x; h = () => setB({ level: Math.round(x.level * 100), charging: x.charging }); h(); x.addEventListener("levelchange", h); x.addEventListener("chargingchange", h); }).catch(() => {});
    return () => { if (bat) { bat.removeEventListener("levelchange", h); bat.removeEventListener("chargingchange", h); } };
  }, []);
  return b;
}

function Tile({ on, icon: I, label, sub, onClick }) {
  return (<button onClick={onClick} aria-pressed={on} className={`flex items-center gap-3 rounded-full border px-3 py-2.5 text-left transition ${on ? "border-lime/60 bg-lime/15 text-lime shadow-[0_0_18px_-6px_rgba(44,255,122,.8)]" : "border-white/10 bg-white/[.06] text-ink hover:bg-white/10"}`}>
    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${on ? "bg-lime text-black" : "bg-white/10"}`}><I className="size-4" /></span>
    <span className="min-w-0"><span className="block truncate text-[13px] font-medium leading-tight">{label}</span><span className={`block truncate text-[11px] leading-tight ${on ? "text-lime/70" : "text-mute"}`}>{sub}</span></span></button>);
}
function Slider({ icon: I, value, onChange, label }) {
  return (<label className="flex items-center gap-3"><I className="size-4 shrink-0 text-mute" aria-hidden="true" /><input className="cc" type="range" min={label === "Brightness" ? 30 : 0} max="100" value={value} onChange={(e) => onChange(+e.target.value)} aria-label={label} /><span className="w-8 text-right font-mono text-[11px] text-mute">{value}</span></label>);
}

export default function ControlPanel({ s, set, phone, onLock, onReboot, onOff }) {
  const bat = useBattery();
  return (<div className="space-y-3 p-4 font-sans text-ink">
    <div className="flex items-center gap-3"><AnonLogo className="size-9" /><div className="min-w-0 flex-1 leading-tight"><p className="text-sm font-medium">guest@anonymous</p><p className="flex items-center gap-1 text-[11px] text-mute">{bat.charging ? <BatteryCharging className="size-3.5 text-lime" /> : <BatteryFull className="size-3.5" />}{bat.level}%{bat.charging ? " · charging" : ""}</p></div>
      {!phone && (<div className="flex gap-1.5">
        <button aria-label="Lock screen" onClick={onLock} className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Lock className="size-4" /></button>
        <button aria-label="Reboot" onClick={onReboot} className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20"><RotateCcw className="size-4" /></button>
        <button aria-label="Power off" onClick={onOff} className="grid size-8 place-items-center rounded-full bg-crimson/25 text-crimson hover:bg-crimson hover:text-white"><Power className="size-4" /></button></div>)}</div>
    <div className="grid grid-cols-2 gap-2">
      <Tile on={s.wifi && !s.plane} icon={s.wifi && !s.plane ? Wifi : WifiOff} label="Wi-Fi" sub={s.wifi && !s.plane ? "Anonymous_5G" : "Off"} onClick={() => set({ wifi: !s.wifi })} />
      <Tile on={s.bt && !s.plane} icon={Bluetooth} label="Bluetooth" sub={s.bt && !s.plane ? "On" : "Off"} onClick={() => set({ bt: !s.bt })} />
      <Tile on={s.night} icon={Moon} label="Night Light" sub={s.night ? "On" : "Off"} onClick={() => set({ night: !s.night })} />
      <Tile on={s.dnd} icon={BellOff} label="Silent" sub={s.dnd ? "On" : "Off"} onClick={() => set({ dnd: !s.dnd })} />
      <Tile on={s.plane} icon={Plane} label="Airplane" sub={s.plane ? "On" : "Off"} onClick={() => set({ plane: !s.plane })} />
      <Tile on={s.scan} icon={Tv} label="CRT Mode" sub={s.scan ? "Enabled" : "Disabled"} onClick={() => set({ scan: !s.scan })} />
      <Tile on={s.glitch} icon={Zap} label="Glitch FX" sub={s.glitch ? "Enabled" : "Disabled"} onClick={() => set({ glitch: !s.glitch })} />
      {!phone && <Tile on={s.rain} icon={Binary} label="Matrix Rain" sub={s.rain ? "Running" : "Stopped"} onClick={() => set({ rain: !s.rain })} />}
    </div>
    <div className="space-y-3 rounded-2xl bg-white/[.05] p-3">
      <Slider icon={s.vol ? Volume2 : VolumeX} value={s.vol} onChange={(vol) => set({ vol })} label="Volume" />
      <Slider icon={Sun} value={s.bright} onChange={(bright) => set({ bright })} label="Brightness" />
    </div>
    <p className="flex items-center gap-1.5 text-[11px] text-mute"><Settings className="size-3" /> Anonymous OS 1.0 · Night Light, brightness, CRT, glitch and rain change the screen live</p>
  </div>);
}
