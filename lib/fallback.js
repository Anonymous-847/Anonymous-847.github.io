import { profile as p } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
// Offline answers built only from the data files, used when the Gemini service is unavailable.
export function localAnswer(q = "") {
  const t = q.toLowerCase(), has = (...w) => w.some((x) => t.includes(x));
  if (has("project", "built", "portfolio", "work on", "made")) return `${p.name} has built: ` + projects.map((x) => `${x.name} (${x.category})`).join("; ") + ". Open the Projects app for details.";
  if (has("skill", "tech", "stack", "language", "tool", "use")) return Object.entries(skills).map(([k, l]) => `${k}: ${l.join(", ")}`).join(" | ");
  if (has("agent", "ai", "rag", "llm")) return `Yes. He specializes in ${p.specializing.join(", ")}. Skills include ${skills["AI Engineering"].join(", ")}.`;
  if (has("hire", "contact", "email", "reach", "available", "freelance")) return `${p.services} Reach him at ${p.contact.email}, GitHub ${p.contact.github} or LinkedIn ${p.contact.linkedin}.`;
  if (has("educat", "study", "universit", "degree")) return `${p.education.degree}, ${p.education.school} (${p.education.until}).`;
  if (has("experience", "job", "company", "role", "employ")) return `${p.experience.role} at ${p.experience.org}.`;
  return `${p.about} He is a ${p.title}. Ask about his projects, skills, education or how to contact him.`;
}
