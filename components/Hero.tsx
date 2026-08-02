import Reveal from "./Reveal";
import TypedRole from "./TypedRole";
import StatCounter from "./StatCounter";
import { heroStats, socialLinks } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Content */}
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </div>

          <h1 className="mt-6 font-syne text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Faizan
            <br />
            Ahmed
          </h1>

          <div className="mt-4 h-9">
            <TypedRole />
          </div>

          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            Building intelligent AI systems, autonomous agents, and modern web
            experiences that push the boundaries of what&apos;s possible.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-cyan-400 px-6 py-3 font-mono text-sm font-medium text-[#05070d] transition-transform hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              ⚡ View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 font-mono text-sm text-white/80 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              📧 Get in Touch
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {heroStats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </Reveal>

        {/* Visual */}
        <Reveal delay={150} className="hidden lg:block">
          <div className="relative mx-auto flex h-[420px] w-[420px] items-center justify-center">
            <div className="absolute h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full border border-cyan-400/20" />
            <div className="absolute inset-8 animate-[spin_22s_linear_infinite_reverse] rounded-full border border-blue-400/15" />
            <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#0b1120] to-[#05070d] shadow-[0_0_80px_-15px_rgba(34,211,238,0.35)]">
              <span className="font-syne text-6xl font-bold bg-gradient-to-br from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                FA
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 sm:flex"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </a>

      {/* visually hidden helper for email crawlers */}
      <span className="sr-only">Contact: {socialLinks.email}</span>
    </section>
  );
}
