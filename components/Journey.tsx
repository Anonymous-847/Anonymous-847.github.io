import Reveal from "./Reveal";
import { journeySteps } from "@/lib/data";

export default function Journey() {
  return (
    <section id="journey" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Evolution Path
          </h2>
          <p className="mt-3 max-w-xl text-white/50">
            A continuous journey of learning, building, and advancing toward
            cutting-edge AI systems.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-3 sm:gap-0">
          {journeySteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <Reveal delay={i * 90}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/5 text-2xl">
                    {step.icon}
                  </div>
                  <span className="w-24 font-mono text-[11px] leading-tight text-white/60">
                    {step.label}
                  </span>
                </div>
              </Reveal>
              {i < journeySteps.length - 1 && (
                <span className="mx-2 hidden h-px w-8 bg-gradient-to-r from-cyan-400/40 to-transparent sm:block md:w-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
