"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import ProjectCover from "./ProjectCover";
import RevealText from "./RevealText";
import Counter from "./Counter";
import { ArrowUpRight, Github } from "./icons";
import { useMediaQuery } from "@/lib/hooks";
import { projectsData, type Project } from "@/lib/data";

const featured = projectsData.filter((p) => p.featured);
const archive = projectsData.filter((p) => !p.featured);
const liveCount = projectsData.filter((p) => p.preview).length;
const coverKind = (p: Project) => (p.category === "wd" ? "web" : p.category);

function StackCard({
  project,
  i,
  total,
  progress,
  desktop,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
  desktop: boolean;
}) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.04]);

  return (
    <div
      className="mb-6 md:sticky md:mb-[14vh]"
      style={desktop ? { top: `calc(6.5rem + ${i * 1.1}rem)` } : undefined}
    >
      <motion.article
        style={{ scale: desktop ? scale : 1 }}
        className="grid origin-top gap-6 overflow-hidden rounded-[2rem] border border-line bg-surface p-3 shadow-[0_30px_70px_-45px_rgba(16,19,28,0.5)] md:grid-cols-12 md:gap-0 md:p-4"
      >
        <div className="group relative overflow-hidden rounded-[1.5rem] md:col-span-5 md:min-h-[26rem]">
          {project.image ? (
            <Image src={project.image} alt={`${project.name} screenshot`} fill className="object-cover" />
          ) : (
            <ProjectCover
              kind={coverKind(project)}
              className="h-full min-h-[14rem] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          )}
        </div>

        <div className="flex flex-col p-3 md:col-span-7 md:p-10">
          <span className="w-fit rounded-full border border-line px-3.5 py-1 text-sm text-muted">
            {project.catLabel}
          </span>
          <h3 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{project.desc}</p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-medium">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full bg-bg px-3 py-1 text-sm text-muted">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {project.preview && (
              <a
                href={project.preview}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 font-medium text-signal-ink"
              >
                View live
                <ArrowUpRight className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium transition-colors hover:border-ink"
            >
              <Github width={18} height={18} />
              Source code
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function ArchiveRow({ p }: { p: Project }) {
  return (
    <li>
      <a
        href={p.link}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-4 overflow-hidden border-b border-line px-2 py-6 md:gap-8 md:px-6 md:py-8"
        aria-label={`${p.name}, source code on GitHub`}
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <div className="relative min-w-0 flex-1 transition-colors duration-300 group-hover:text-signal-ink group-focus-visible:text-signal-ink">
          <h4 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
            {p.name}
          </h4>
          <p className="mt-1 hidden max-w-2xl truncate text-muted transition-colors duration-300 group-hover:text-signal-ink/80 md:block">
            {p.desc}
          </p>
        </div>
        <span className="relative hidden text-sm text-muted transition-colors duration-300 group-hover:text-signal-ink/80 sm:block">
          {p.catLabel}
        </span>
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-signal-ink group-hover:text-signal-ink">
          <ArrowUpRight className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </a>
    </li>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealText
            text="Selected work"
            className="font-display text-5xl font-semibold tracking-[-0.035em] md:text-8xl"
          />
          <p className="max-w-xs text-lg text-muted">
            <span className="font-display text-3xl font-semibold text-ink">
              <Counter to={projectsData.length} />
            </span>{" "}
            projects, with{" "}
            <span className="font-display text-3xl font-semibold text-ink">
              <Counter to={liveCount} />
            </span>{" "}
            live online.
          </p>
        </div>

        <div ref={ref} className="mt-14 md:mt-20">
          {featured.map((p, i) => (
            <StackCard
              key={p.id}
              project={p}
              i={i}
              total={featured.length}
              progress={scrollYProgress}
              desktop={desktop}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-0">
          <RevealText
            text="More projects"
            as="h3"
            className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
          />
          <ul className="mt-8 border-t border-line">
            {archive.map((p) => (
              <ArchiveRow key={p.id} p={p} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
