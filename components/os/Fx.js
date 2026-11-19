"use client";
// Screen-level effects driven by the Control Center: scanlines, glitch tear, vignette, night light.
export default function Fx({ s }) {
  return (<>
    {s.glitch && <div className="tear pointer-events-none absolute inset-0 z-[80]" />}
    {s.scan && <div className="scan pointer-events-none absolute inset-0 z-[90] mix-blend-multiply" style={{ background: "repeating-linear-gradient(transparent 0 2px, rgba(0,0,0,.2) 3px)" }} />}
    <div className="pointer-events-none absolute inset-0 z-[91]" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55) 100%)" }} />
    {s.night && <div className="pointer-events-none absolute inset-0 z-[92] bg-[#ff8a1f]/20 mix-blend-multiply" />}
  </>);
}
