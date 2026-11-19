import { Mail } from "lucide-react";
import { Brand, LinkedIn, siGithub, siInstagram, siWhatsapp } from "./Icons";
export function socialList(c, withMail = false) {
  return [withMail && { label: "Email", href: `mailto:${c.email}`, icon: <Mail className="size-5" aria-hidden="true" /> },
    { label: "GitHub", href: c.github, icon: <Brand icon={siGithub} /> },
    { label: "LinkedIn", href: c.linkedin, icon: <Brand icon={LinkedIn} /> },
    { label: "Instagram", href: c.instagram, icon: <Brand icon={siInstagram} /> },
    { label: "WhatsApp", href: c.whatsapp && `https://wa.me/${c.whatsapp}`, icon: <Brand icon={siWhatsapp} /> }].filter((s) => s && s.href);
}
