import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="font-syne text-lg font-bold text-white">
            Faizan Ahmed.
          </div>
          <div className="mt-1 font-mono text-xs text-white/40">
            © {new Date().getFullYear()} — Agentic AI Engineer, Punjab, PK
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 font-mono text-xs text-white/60 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            GH
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 font-mono text-xs text-white/60 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            LI
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 font-mono text-xs text-white/60 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            ✉
          </a>
        </div>
      </div>
    </footer>
  );
}
