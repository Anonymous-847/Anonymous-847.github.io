import Reveal from "./Reveal";
import { educationTimeline } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Academic Journey
          </h2>
        </Reveal>

        <div className="relative mt-14 space-y-10 border-l border-white/10 pl-8 sm:pl-10">
          {educationTimeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="relative">
                <span className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-[#05070d] text-sm sm:-left-[49px]">
                  {item.icon}
                </span>
                <div className="font-mono text-xs uppercase tracking-wider text-cyan-300">
                  {item.year}
                </div>
                <h3 className="mt-2 font-syne text-xl font-bold text-white">
                  {item.title}
                </h3>
                <div className="mt-1 text-sm text-white/50">{item.sub}</div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
