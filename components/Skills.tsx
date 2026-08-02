"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { skillsData, type SkillTab } from "@/lib/data";

const tabs: { id: SkillTab; label: string }[] = [
  { id: "ai", label: "AI & Agents" },
  { id: "ml", label: "ML & DL" },
  { id: "web", label: "Web Dev" },
  { id: "lang", label: "Languages" },
];

export default function Skills() {
  const [active, setActive] = useState<SkillTab>("ai");

  return (
    <section id="skills" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Technical Arsenal
          </h2>
          <p className="mt-3 max-w-xl text-white/50">
            A comprehensive toolkit spanning AI engineering, machine
            learning, and modern web development.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`rounded-full border px-5 py-2 font-mono text-[13px] transition-all ${
                  active === tab.id
                    ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skillsData[active].map((skill, i) => (
            <Reveal key={`${active}-${skill.name}`} delay={i * 40}>
              <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.04]">
                <div className="text-2xl">{skill.icon}</div>
                <div className="mt-3 text-sm font-medium text-white/85">
                  {skill.name}
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="mt-2 font-mono text-[11px] text-white/40">
                  {skill.level}%
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
