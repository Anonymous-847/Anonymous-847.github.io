import SpotlightCard from "./SpotlightCard";
import ProjectCover from "./ProjectCover";
import RevealText from "./RevealText";
import { focusAreas, projectsData } from "@/lib/data";

export default function Focus() {
  return (
    <section id="focus" className="px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <RevealText
          text="What I work on"
          className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <SpotlightCard
              key={area.title}
              className="rounded-[2rem] border border-line bg-surface"
            >
              <ProjectCover kind={area.kind} className="aspect-[5/3] border-b border-line" />
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {area.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{area.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
                  Seen in{" "}
                  <span className="text-ink">
                    {area.projectIds
                      .map((id) => projectsData.find((p) => p.id === id)?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
