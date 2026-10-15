"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin } from "./icons";
import { site } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1900);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-ink px-6 py-16 text-bg md:px-16 md:py-28">
        <RevealText
          text="Have a role or project in mind? Let's talk."
          className="max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-8xl"
        />
        <p className="mt-8 max-w-xl text-lg text-bg/65">
          I&apos;m open to AI engineering roles, collaborations on intelligent systems and
          freelance projects. The quickest way to reach me is email.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="group relative break-all font-display text-2xl font-medium sm:text-4xl md:text-5xl"
          >
            {site.email}
            <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-100 bg-mark transition-transform duration-500 group-hover:scale-x-0 group-hover:origin-right" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-bg/25 px-5 py-3 text-sm font-medium transition-colors hover:bg-bg hover:text-ink"
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "c" : "n"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                {copied ? <Check width={18} height={18} /> : <Copy width={18} height={18} />}
                {copied ? "Copied" : "Copy email"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-bg px-6 py-4 font-medium text-ink"
            >
              <Github width={20} height={20} />
              GitHub
              <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-bg px-6 py-4 font-medium text-ink"
            >
              <Linkedin width={20} height={20} />
              LinkedIn
              <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-3 rounded-full bg-mark px-6 py-4 font-medium text-[#10131c]"
            >
              <Download width={20} height={20} />
              Download CV
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
