import { useId } from "react";
import type { Kind } from "@/lib/data";

/** Generated, animated cover art per project type (swap for screenshots via `image` in data.ts). */

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const clusters = (() => {
  const r = rng(42);
  return [
    [88, 84],
    [262, 70],
    [190, 168],
  ].map(([cx, cy]) =>
    Array.from({ length: 15 }, () => [
      +(cx + (r() + r() - 1) * 46).toFixed(1),
      +(cy + (r() + r() - 1) * 34).toFixed(1),
    ])
  );
})();

const aiNodes: [number, number][] = [
  [50, 120],
  [130, 120],
  [220, 56],
  [220, 120],
  [220, 184],
  [310, 120],
  [360, 120],
];
const aiEdges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 6],
];
const curve = (a: [number, number], b: [number, number]) => {
  const mx = (a[0] + b[0]) / 2;
  return `M${a[0]} ${a[1]} C${mx} ${a[1]} ${mx} ${b[1]} ${b[0]} ${b[1]}`;
};

const dlCols = [4, 6, 6, 3];
const dlX = [60, 150, 250, 340];
const dlY = (n: number, i: number) => 120 + (i - (n - 1) / 2) * (n > 4 ? 28 : 40);

export default function ProjectCover({
  kind,
  className = "",
}: {
  kind: Kind | "dl";
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className={`relative overflow-hidden bg-[color-mix(in_oklab,var(--signal)_7%,var(--surface))] ${className}`}
    >
      <svg
        viewBox="0 0 400 240"
        className="h-full w-full text-signal"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {kind === "ai" && (
          <g>
            {aiEdges.map(([a, b], i) => (
              <path
                key={i}
                d={curve(aiNodes[a], aiNodes[b])}
                fill="none"
                className="stroke-ink/20"
                strokeWidth={1.5}
              />
            ))}
            {aiEdges.map(([a, b], i) => (
              <circle key={i} r={3.5} className="fill-signal">
                <animateMotion
                  dur="2.6s"
                  begin={`${(i * 0.45).toFixed(2)}s`}
                  repeatCount="indefinite"
                  path={curve(aiNodes[a], aiNodes[b])}
                />
              </circle>
            ))}
            {aiNodes.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={13} className="fill-surface stroke-signal" strokeWidth={2} />
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  className="fill-signal"
                  style={{ animation: `node-pulse 2.6s ease-in-out ${i * 0.3}s infinite` }}
                />
              </g>
            ))}
          </g>
        )}

        {kind === "web" && (
          <g>
            <defs>
              <clipPath id={`${uid}c`}>
                <rect x={28} y={24} width={344} height={192} rx={14} />
              </clipPath>
              <linearGradient id={`${uid}g`} x1="0" x2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0" />
                <stop offset="0.5" stopColor="currentColor" stopOpacity="0.22" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x={28} y={24} width={344} height={192} rx={14} className="fill-surface stroke-ink/15" strokeWidth={1.5} />
            <g clipPath={`url(#${uid}c)`}>
              <rect x={28} y={24} width={344} height={26} className="fill-ink/[0.05]" />
              {[44, 58, 72].map((cx) => (
                <circle key={cx} cx={cx} cy={37} r={3.5} className="fill-ink/25" />
              ))}
              <rect x={48} y={66} width={70} height={8} rx={4} className="fill-ink/30" />
              <rect x={290} y={66} width={20} height={8} rx={4} className="fill-ink/15" />
              <rect x={318} y={66} width={20} height={8} rx={4} className="fill-ink/15" />
              <rect x={48} y={92} width={150} height={14} rx={7} className="fill-ink/70" />
              <rect x={48} y={114} width={110} height={14} rx={7} className="fill-ink/70" />
              <rect x={48} y={138} width={140} height={7} rx={3.5} className="fill-ink/20" />
              <rect x={48} y={152} width={100} height={7} rx={3.5} className="fill-ink/20" />
              <rect x={48} y={170} width={64} height={22} rx={11} className="fill-signal">
                <animate attributeName="opacity" values="1;0.55;1" dur="2.4s" repeatCount="indefinite" />
              </rect>
              <rect x={226} y={90} width={126} height={102} rx={10} className="fill-signal/15 stroke-signal/40" strokeWidth={1.5} />
              <rect x={238} y={102} width={48} height={32} rx={6} className="fill-signal/40" />
              <rect x={292} y={102} width={48} height={32} rx={6} className="fill-ink/10" />
              <rect x={238} y={142} width={102} height={8} rx={4} className="fill-ink/20" />
              <rect x={238} y={158} width={70} height={8} rx={4} className="fill-ink/20" />
              <rect x={-220} y={24} width={220} height={192} fill={`url(#${uid}g)`}>
                <animateTransform attributeName="transform" type="translate" from="0 0" to="640 0" dur="3.6s" repeatCount="indefinite" />
              </rect>
            </g>
          </g>
        )}

        {kind === "ml" && (
          <g>
            {clusters.map((pts, ci) => (
              <g key={ci} style={{ animation: `drift ${5 + ci}s ease-in-out ${ci * 0.7}s infinite` }}>
                {pts.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={3.6}
                    className={ci === 0 ? "fill-signal" : ci === 1 ? "fill-ink/70" : "fill-signal/45"}
                  />
                ))}
              </g>
            ))}
            {[
              [88, 84],
              [262, 70],
              [190, 168],
            ].map(([x, y], i) => (
              <path
                key={i}
                d={`M${x - 8} ${y - 8}l16 16M${x + 8} ${y - 8}l-16 16`}
                className="stroke-ink"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            ))}
          </g>
        )}

        {kind === "dl" && (
          <g>
            {dlCols.slice(0, -1).map((n, c) =>
              Array.from({ length: n }).flatMap((_, i) =>
                Array.from({ length: dlCols[c + 1] }).map((__, j) => (
                  <line
                    key={`${c}-${i}-${j}`}
                    x1={dlX[c]}
                    y1={dlY(n, i)}
                    x2={dlX[c + 1]}
                    y2={dlY(dlCols[c + 1], j)}
                    className="stroke-ink/12"
                    strokeWidth={1}
                  />
                ))
              )
            )}
            {dlCols.map((n, c) =>
              Array.from({ length: n }).map((_, i) => (
                <circle
                  key={`${c}-${i}`}
                  cx={dlX[c]}
                  cy={dlY(n, i)}
                  r={7}
                  className="fill-signal"
                  style={{ animation: `node-pulse 2.4s ease-in-out ${(c * 0.45 + i * 0.06).toFixed(2)}s infinite` }}
                />
              ))
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
