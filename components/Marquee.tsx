export default function Marquee({ items }: { items: string[] }) {
  return (
    <div
      className="group border-y border-line py-6 md:py-8"
      aria-label="Technologies I work with"
    >
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <ul
              key={k}
              aria-hidden={k === 1}
              className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-8 font-display text-4xl font-medium tracking-tight md:gap-12 md:text-6xl"
                >
                  {item}
                  <span className="h-2.5 w-2.5 rotate-45 bg-signal" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
