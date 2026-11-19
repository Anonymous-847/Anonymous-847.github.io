"use client";
import { useEffect, useState } from "react";
import Desktop from "./Desktop";
import Termux from "./Termux";

const initial = { wifi: true, bt: false, night: false, dnd: false, plane: false, rain: true, scan: true, glitch: true, vol: 60, bright: 100 };
// >= 768px: a Linux (GNOME-style) desktop.  < 768px: a Termux session.
export default function OS() {
  const [mode, setMode] = useState(null), [s, setS] = useState(initial);
  const set = (patch) => setS((x) => ({ ...x, ...patch }));
  useEffect(() => { const r = () => setMode(innerWidth < 768 ? "phone" : "desktop"); r(); addEventListener("resize", r); return () => removeEventListener("resize", r); }, []);
  if (!mode) return <div className="fixed inset-0 bg-black" />;
  return mode === "phone" ? <Termux s={s} set={set} /> : <Desktop s={s} set={set} />;
}
