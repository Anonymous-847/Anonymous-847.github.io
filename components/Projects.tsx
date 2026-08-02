"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { projectsData, type ProjectCategory } from "@/lib/data";

const filters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI / Agentic" },
  { id: "ml", label: "Machine Learning" },
  { id: "dl", label: "Deep Learning" },
  { id: "wd", label: "Web Development" },
];

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? projectsData
        : projectsData.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="mt-3 max-w-xl text-white/50">
            AI-powered systems, intelligent agents, and machine learning
            applications built for real-world impact.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-5 py-2 font-mono text-[13px] transition-all ${
                  active === f.id
                    ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={(i % 6) * 60}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                    style={{ backgroundColor: `${project.color}1a` }}
                  >
                    {project.icon}
                  </div>
                  <span
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide"
                    style={{
                      borderColor: `${project.color}40`,
                      color: project.color,
                    }}
                  >
                    {project.catLabel}
                  </span>
                </div>

                <h3 className="mt-4 font-syne text-lg font-bold text-white">
                  {project.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                  {project.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-white/70 transition-colors hover:text-cyan-300"
                  >
                    ⚡ Code
                  </a>
                  {project.preview !== "not-available" && (
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-white/70 transition-colors hover:text-cyan-300"
                    >
                      ↗ Live Preview
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
