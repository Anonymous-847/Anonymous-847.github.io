import { Webhook, KeyRound, Workflow, Database, Plug, Bot, Smartphone, Layers } from "lucide-react";
import { siReact, siNextdotjs, siJavascript, siNodedotjs, siMongodb, siPython, siGit, siTailwindcss, siHtml5, siExpress, siRedux, siLangchain, siN8n, siGooglegemini } from "@/lib/brandIcons";
export { siGithub, siInstagram, siWhatsapp, siNextdotjs as siNext } from "@/lib/brandIcons";
// simple-icons no longer ships LinkedIn, so its mark is inlined here.
export const LinkedIn = { path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" };
export function Brand({ icon, className = "size-5" }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d={icon.path} /></svg>;
}
const T = { "React.js": siReact, "Next.js": siNextdotjs, JavaScript: siJavascript, "Tailwind CSS": siTailwindcss, "HTML / CSS": siHtml5, "Node.js": siNodedotjs, "Express.js": siExpress, MongoDB: siMongodb, Python: siPython, LangChain: siLangchain, n8n: siN8n, "Gemini API": siGooglegemini, "Git / GitHub": siGit, Redux: siRedux, "React Native": siReact };
const L = { "REST APIs": Webhook, Authentication: KeyRound, LangGraph: Workflow, RAG: Database, MCP: Plug, "AI Agents": Bot, SQL: Database, "React Native": Smartphone };
export function TechIcon({ name, className = "size-6" }) {
  if (T[name]) return <Brand icon={T[name]} className={className} />;
  const I = L[name] || Layers; return <I className={className} aria-hidden="true" />;
}
