"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import ThemeToggle from "./ThemeToggle";
import { introDelay } from "@/lib/intro";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    const top = document.getElementById("top");
    if (top) obs.observe(top);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: "-110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: introDelay() + 0.3, ease: [0.2, 0.8, 0.1, 1] }}
      >
        <motion.div
          animate={{ y: hidden && !open ? -96 : 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10"
        >
          <a
            href="#top"
            aria-label="Faizan Ahmed, back to top"
            className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-sm text-bg">
              FA
            </span>
            <span className="hidden sm:block">Faizan Ahmed</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden rounded-full border border-line bg-surface/70 p-1.5 backdrop-blur-xl md:block"
          >
            <ul className="flex items-center">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`relative block rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                      active === l.id ? "text-bg" : "text-muted hover:text-ink"
                    }`}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full bg-signal px-6 py-3 text-sm font-medium text-signal-ink transition-transform hover:-translate-y-0.5 sm:block"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 backdrop-blur md:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-6 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-6xl font-semibold tracking-tight"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.2, 0.8, 0.1, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
