import Reveal from "./Reveal";
import { achievementsData } from "@/lib/data";

export default function Achievements() {
  return (
    <section id="achievements" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Milestones
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievementsData.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="font-syne text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
