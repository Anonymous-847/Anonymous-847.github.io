import Image from "next/image";
import Reveal from "./Reveal";
import { aboutInfo, aboutTags } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Photo + card */}
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1120]">
              <Image
                src="/Faizan.jpeg"
                alt="Faizan Ahmed"
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-transparent p-5">
                <div className="font-syne text-lg font-bold text-white">
                  Faizan Ahmed
                </div>
                <div className="font-mono text-xs text-cyan-300">
                  Agentic AI Engineer
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              {aboutInfo.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </li> 
              ))}
            </ul>

            <a
              href="/pdf/cv.pdf"
              download
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white/5 border border-white/15 px-6 py-3 font-mono text-sm text-white transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              ⬇ Download Resume
            </a>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={120}>
          <h3 className="font-syne text-3xl font-bold leading-tight text-white sm:text-4xl">
            Crafting the
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Future of AI
            </span>
          </h3>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/60 sm:text-base">
            <p>
              I&apos;m a passionate Agentic AI Engineer and Full-Stack Web
              Developer currently pursuing a Bachelor&apos;s degree in
              Information Technology from the University of Gujrat. I
              specialize in building intelligent AI assistants, autonomous
              agent systems, machine learning applications, and scalable web
              platforms.
            </p>
            <p>
              My expertise spans Python, JavaScript, React, Next.js,
              Express.js, MongoDB, LangChain, LangGraph, AI automation, and
              deep learning technologies. I&apos;m deeply interested in
              agentic AI, autonomous systems, AI workflows, and advanced
              conversational assistants.
            </p>
            <p>
              My goal is to build next-generation intelligent systems that
              combine automation, reasoning, memory, and human-like
              interaction.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {aboutTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
