import Reveal from "./Reveal";
import { socialLinks } from "@/lib/data";

const contactLinks = [
  {
    icon: "✉️",
    label: "Email",
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/faizanxahmed",
    href: socialLinks.linkedin,
  },
  {
    icon: "⚡",
    label: "GitHub",
    value: "github.com/Anonymous-847",
    href: socialLinks.github,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-syne text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s Build Together
          </h2>
          <p className="mt-3 max-w-xl text-white/50">
            Open to AI engineering roles, collaboration on intelligent
            systems, and exciting projects.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 sm:p-12">
            <h3 className="font-syne text-2xl font-bold leading-tight text-white sm:text-3xl">
              Start a{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Conversation
              </span>
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              Whether you&apos;re looking to build an AI-powered product,
              need a full-stack developer, or want to collaborate on
              cutting-edge ML research — I&apos;d love to hear from you.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lg">
                    {link.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {link.label}
                    </div>
                    <div className="truncate text-sm text-white/80 group-hover:text-cyan-300">
                      {link.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
