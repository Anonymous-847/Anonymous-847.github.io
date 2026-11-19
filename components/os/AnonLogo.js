import { useId } from "react";
// Original emblem: a hooded faceless figure, glowing red eyes, jagged grin, glitch-split rim and a scan bar.
export default function AnonLogo({ className = "size-7" }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (<svg viewBox="0 0 64 64" role="img" aria-label="Anonymous OS" className={className}>
    <defs>
      <radialGradient id={`${id}bg`} cx="50%" cy="42%" r="65%"><stop offset="0" stopColor="#1a0709" /><stop offset=".7" stopColor="#050706" /><stop offset="1" stopColor="#000" /></radialGradient>
      <linearGradient id={`${id}hd`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#26362d" /><stop offset=".55" stopColor="#0d1511" /><stop offset="1" stopColor="#020403" /></linearGradient>
      <linearGradient id={`${id}rim`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2cff7a" /><stop offset="1" stopColor="#ff2e3e" /></linearGradient>
      <filter id={`${id}gl`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <clipPath id={`${id}c`}><circle cx="32" cy="32" r="28.5" /></clipPath>
    </defs>
    <circle cx="32" cy="32" r="30" fill={`url(#${id}bg)`} stroke={`url(#${id}rim)`} strokeWidth="1.8" />
    <circle cx="32" cy="32" r="27" fill="none" stroke="#2cff7a" strokeOpacity=".25" strokeWidth=".6" strokeDasharray="2 3" />
    <g clipPath={`url(#${id}c)`}>
      <path d="M32 5.5C19 5.5 11.5 16 11.5 29c0 8 2.2 13 .5 20.5C11 54 8 58 4 64h56c-4-6-7-10-8-14.5-1.7-7.5.5-12.5.5-20.5C52.5 16 45 5.5 32 5.5Z" fill={`url(#${id}hd)`} stroke="#2cff7a" strokeOpacity=".45" strokeWidth=".8" />
      <path d="M32 14.500c-8.500 0-12 7.500-11.500 16 .5 7 4.500 12 11.500 12s11-5 11.500-12c.5-8.500-3-16-11.500-16Z" fill="#000" stroke="#ff2e3e" strokeOpacity=".35" strokeWidth=".6" />
      <g filter={`url(#${id}gl)`}>
        <path d="M23.500 27.500 30.500 30l-.8 3.200-5.700-1.300Z" fill="#ff2e3e" className="eye" />
        <path d="M40.500 27.500 33.500 30l.8 3.200 5.700-1.300Z" fill="#ff2e3e" className="eye" />
      </g>
      <path d="M25 38.500l1.800 2.300 1.800-2.300 1.800 2.300 1.800-2.300 1.800 2.300 1.800-2.300 1.800 2.300 1.800-2.300" fill="none" stroke="#dff5e8" strokeOpacity=".8" strokeWidth=".9" strokeLinejoin="round" />
      <path d="M23 49.500l4 3-4 3M31 56h8" fill="none" stroke="#2cff7a" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
      <rect x="6" y="0" width="52" height="1.600" fill="#2cff7a" opacity=".35" className="scanbar" />
    </g>
    <path d="M32 1.200v3.500M59.500 14.500l-3 1.500M4.500 14.500l3 1.500" stroke="#ff2e3e" strokeWidth="1.500" strokeLinecap="round" />
  </svg>);
}
