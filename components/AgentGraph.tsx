"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";
import { introDelay } from "@/lib/intro";

type Id = "query" | "router" | "retriever" | "memory" | "tools" | "llm" | "response";

const info: Record<Id, { label: string; text: string }> = {
  query: { label: "Query", text: "A question or task enters the graph." },
  router: { label: "Router", text: "An LLM-backed node decides which path the request takes." },
  retriever: { label: "Retriever", text: "RAG: finds the most relevant chunks in a vector store." },
  memory: { label: "Memory", text: "Persistent chat history gives the agent context across turns." },
  tools: { label: "Tools", text: "External APIs and automations the agent can call." },
  llm: { label: "LLM", text: "A Mistral model reasons over the gathered context." },
  response: { label: "Response", text: "The answer streams back to the user." },
};

const edges: [Id, Id][] = [
  ["query", "router"],
  ["router", "retriever"],
  ["router", "memory"],
  ["router", "tools"],
  ["retriever", "llm"],
  ["memory", "llm"],
  ["tools", "llm"],
  ["llm", "response"],
];

const runs: Id[][] = [
  ["query", "router", "retriever", "llm", "response"],
  ["query", "router", "tools", "llm", "response"],
  ["query", "router", "memory", "llm", "response"],
];

const layouts = {
  wide: {
    vb: [710, 380],
    nw: 104,
    nh: 42,
    horizontal: true,
    pos: {
      query: [60, 190],
      router: [190, 190],
      retriever: [350, 60],
      memory: [350, 190],
      tools: [350, 320],
      llm: [510, 190],
      response: [650, 190],
    },
  },
  tall: {
    vb: [360, 560],
    nw: 108,
    nh: 44,
    horizontal: false,
    pos: {
      query: [180, 36],
      router: [180, 130],
      retriever: [62, 260],
      memory: [180, 260],
      tools: [298, 260],
      llm: [180, 390],
      response: [180, 510],
    },
  },
} as const;

const PERIOD = 6; // 5 steps + 1 pause

export default function AgentGraph() {
  const wide = useMediaQuery("(min-width: 640px)", true);
  const reduce = useReducedMotion();
  const L = wide ? layouts.wide : layouts.tall;
  const [tick, setTick] = useState(0);
  const [focus, setFocus] = useState<Id | null>(null);
  const base = introDelay() + 0.2;

  useEffect(() => {
    if (reduce || focus) return;
    const t = setInterval(() => setTick((v) => v + 1), 780);
    return () => clearInterval(t);
  }, [reduce, focus]);

  const pos = reduce ? 4 : tick % PERIOD;
  const run = runs[Math.floor(tick / PERIOD) % runs.length];
  const step = Math.min(pos, 4);
  const visited = new Set(run.slice(0, step + 1));
  const active = run[step];
  const activeEdge = pos >= 1 && pos <= 4 ? ([run[pos - 1], run[pos]] as [Id, Id]) : null;
  const visitedEdges = new Set(run.slice(0, step).map((n, i) => `${n}>${run[i + 1]}`));
  const shown = focus ?? active;

  const path = (a: Id, b: Id) => {
    const [ax, ay] = L.pos[a];
    const [bx, by] = L.pos[b];
    if (L.horizontal) {
      const x1 = ax + L.nw / 2;
      const x2 = bx - L.nw / 2;
      const mx = (x1 + x2) / 2;
      return `M${x1} ${ay} C${mx} ${ay} ${mx} ${by} ${x2} ${by}`;
    }
    const y1 = ay + L.nh / 2;
    const y2 = by - L.nh / 2;
    const my = (y1 + y2) / 2;
    return `M${ax} ${y1} C${ax} ${my} ${bx} ${my} ${bx} ${y2}`;
  };

  return (
    <div className="rounded-[2rem] border border-line bg-surface p-4 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--signal)_55%,transparent)] sm:p-6">
      <div className="mb-3 flex items-center justify-between text-sm text-muted">
        <span className="font-display text-base font-medium text-ink">Request flow</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-signal"
              style={{ animation: "ping-soft 1.8s ease-out infinite" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          {focus ? "Paused" : "Simulated run"}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${L.vb[0]} ${L.vb[1]}`}
        className="mx-auto h-auto w-full max-w-[720px]"
        role="img"
        aria-label="Diagram of an AI agent graph: a query goes through a router to a retriever, memory or tools, then an LLM, then a response."
      >
        {edges.map(([a, b], i) => {
          const on = activeEdge && activeEdge[0] === a && activeEdge[1] === b;
          const seen = visitedEdges.has(`${a}>${b}`);
          return (
            <motion.path
              key={`${a}${b}${wide}`}
              d={path(a, b)}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              className={`transition-[stroke] duration-300 ${
                on || seen ? "stroke-signal" : "stroke-muted/35"
              }`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: base + i * 0.07, ease: "easeOut" }}
            />
          );
        })}

        {activeEdge && !focus && (
          <circle key={tick} r={5} className="fill-mark stroke-ink" strokeWidth={1.5}>
            <animateMotion
              dur="0.7s"
              fill="freeze"
              path={path(activeEdge[0], activeEdge[1])}
            />
          </circle>
        )}

        {(Object.keys(L.pos) as Id[]).map((id, i) => {
          const [x, y] = L.pos[id];
          const isActive = shown === id;
          const isVisited = visited.has(id);
          return (
            <motion.g
              key={`${id}${wide}`}
              role="button"
              tabIndex={0}
              aria-label={`${info[id].label}: ${info[id].text}`}
              onMouseEnter={() => setFocus(id)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(id)}
              onBlur={() => setFocus(null)}
              className="cursor-pointer outline-none"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: base + 0.25 + i * 0.09, type: "spring", stiffness: 260, damping: 20 }}
            >
              <rect
                x={x - L.nw / 2}
                y={y - L.nh / 2}
                width={L.nw}
                height={L.nh}
                rx={12}
                strokeWidth={2}
                className={`transition-colors duration-300 ${
                  isActive
                    ? "fill-signal stroke-signal"
                    : isVisited
                      ? "fill-surface stroke-signal"
                      : "fill-surface stroke-line"
                }`}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={15}
                fontWeight={600}
                className={`select-none transition-colors duration-300 ${
                  isActive ? "fill-signal-ink" : isVisited ? "fill-ink" : "fill-muted"
                }`}
              >
                {info[id].label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-2 min-h-[4.25rem] border-t border-line pt-4" aria-live="polite">
        <p className="font-display text-lg font-medium">{info[shown].label}</p>
        <p className="text-sm text-muted">{info[shown].text}</p>
      </div>
    </div>
  );
}
