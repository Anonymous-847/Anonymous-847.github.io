import { useId } from "react";
// Procedural hacker / horror cover art for each project. Deterministic (seeded) so SSR and client agree.
const seed = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; };

// 64x64 stroke glyphs. Each one is drawn in the project's accent colour.
const GLYPH = {
  hub: <><circle cx="32" cy="32" r="22" /><ellipse cx="32" cy="32" rx="9" ry="22" /><path d="M10 32h44M13 20h38M13 44h38" /><circle cx="32" cy="10" r="2.4" fill="currentColor" /><circle cx="54" cy="32" r="2.4" fill="currentColor" /><circle cx="10" cy="32" r="2.4" fill="currentColor" /></>,
  store: <><path d="M6 10h8l5 28h28l5-20H17" /><circle cx="24" cy="50" r="4" /><circle cx="43" cy="50" r="4" /><path d="M27 24h14M27 31h10" /></>,
  portal: <><path d="M32 4 54 12v18c0 14-9 24-22 30C19 54 10 44 10 30V12z" /><rect x="20" y="20" width="10" height="10" /><rect x="34" y="20" width="10" height="6" /><rect x="34" y="30" width="10" height="10" /><rect x="20" y="34" width="10" height="6" /></>,
  rishta: <><path d="M32 54C12 40 8 28 8 20a12 12 0 0 1 24-3 12 12 0 0 1 24 3c0 8-4 20-24 34z" /><path d="M20 28l6 6 6-8 6 8 6-6" /></>,
  interior: <><path d="M32 2v6M25 14a7 7 0 0 1 14 0z" /><path d="M14 36v-12a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v12" /><path d="M8 36a5 5 0 0 1 10 0v6h28v-6a5 5 0 0 1 10 0v15a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z" /><path d="M14 53v6M50 53v6" /></>,
};

export default function ProjectArt({ project: p, className = "", children }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const r = seed(p.id), cols = [];
  for (let i = 0; i < 22; i++) { const n = 6 + Math.floor(r() * 14); cols.push({ x: 14 + i * 28 + r() * 10, y: -r() * 90, o: .08 + r() * .22, t: Array.from({ length: n }, () => (r() > .5 ? "1" : "0")), red: r() > .82 }); }
  const g = GLYPH[p.glyph] || GLYPH.hub, a = p.accent || "#2cff7a";
  return (<div className={`relative isolate overflow-hidden bg-black ${className}`}>
    <svg viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}a`} cx="72%" cy="45%" r="70%"><stop offset="0" stopColor={a} stopOpacity=".32" /><stop offset=".5" stopColor={a} stopOpacity=".07" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}v`} cx="50%" cy="50%" r="75%"><stop offset=".5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".9" /></radialGradient>
        <filter id={`${id}g`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" /></filter>
        <pattern id={`${id}p`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke={a} strokeOpacity=".09" /></pattern>
      </defs>
      <rect width="640" height="260" fill="#030504" /><rect width="640" height="260" fill={`url(#${id}a)`} /><rect width="640" height="260" fill={`url(#${id}p)`} />
      {cols.map((c, i) => (<text key={i} x={c.x} y={c.y} fontFamily="monospace" fontSize="12" fill={c.red ? "#ff2e3e" : a} opacity={c.o}>{c.t.map((ch, k) => <tspan key={k} x={c.x} dy="14">{ch}</tspan>)}</text>))}
      {/* hooded watcher, faint, behind the glyph */}
      <g transform="translate(470 40)" opacity=".5"><path d="M0 0C-44 0-70 36-70 78c0 26 8 42 2 66-5 20-18 40-48 60h232c-30-20-43-40-48-60-6-24 2-40 2-66C70 36 44 0 0 0Z" fill="#070d0a" stroke={a} strokeOpacity=".25" /><path d="M0 22c-30 0-42 22-40 52 2 24 16 40 40 40s38-16 40-40c2-30-10-52-40-52Z" fill="#000" /><path d="M-30 62-4 70-8 82-32 76ZM30 62 4 70 8 82 32 76Z" fill="#ff2e3e"><animate attributeName="opacity" values="1;1;.15;1;1;.6;1" dur="5s" repeatCount="indefinite" /></path></g>
      <g transform="translate(470 120)" color={a}>
        <g transform="translate(-62 -62) scale(2)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}g)`} opacity=".9">{g}</g>
        <g transform="translate(-65 -62) scale(2)" fill="none" stroke="#ff2e3e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".55">{g}</g>
        <g transform="translate(-59 -62) scale(2)" fill="none" stroke="#35d6ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".35">{g}</g>
        <g transform="translate(-62 -62) scale(2)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{g}</g>
      </g>
      <rect width="640" height="260" fill={`url(#${id}v)`} />
      <rect x="0" y="0" width="640" height="3" fill={a} opacity=".35"><animate attributeName="y" values="-4;264" dur="4.5s" repeatCount="indefinite" /></rect>
      <path d="M0 196h640" stroke="#ff2e3e" strokeOpacity=".25" strokeDasharray="3 7" />
    </svg>
    <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "repeating-linear-gradient(transparent 0 2px, rgba(0,0,0,.35) 3px)" }} />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pb-3 pt-14">{children}</div>
  </div>);
}

export const projectGlyph = (p, className = "size-5") => (<svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GLYPH[p.glyph] || GLYPH.hub}</svg>);
