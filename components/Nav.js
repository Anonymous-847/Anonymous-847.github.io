"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, FolderGit2, Code2, Briefcase, Mail } from "lucide-react";
const items = [["About", "about", User], ["Projects", "projects", FolderGit2], ["Skills", "skills", Code2], ["Experience", "experience", Briefcase], ["Contact", "contact", Mail]];
export default function Nav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    items.forEach(([, id]) => { const el = document.getElementById(id); el && io.observe(el); });
    const top = document.getElementById("top"); top && io.observe(top); return () => io.disconnect();
  }, []);
  return (<motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: .7 }} className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
    <nav aria-label="Primary" className="flex items-center gap-0.5 rounded-full border border-white/10 bg-bg/70 p-1.5 backdrop-blur-md">
      <a href="#top" className="flex items-center gap-0.5 px-3 font-display font-bold" aria-label="Home">FA<motion.span className="inline-block size-1.5 rounded-full bg-lime" animate={{ scale: [1, 1.8, 1], opacity: [1, .5, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} /></a>
      {items.map(([label, id, Icon]) => (<a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? "true" : undefined} className={`relative flex items-center gap-2 rounded-full px-3 py-2.5 text-sm transition-colors ${active === id ? "text-lime" : "text-mute hover:text-ink"}`}>
        {active === id && <motion.span layoutId="navpill" className="absolute inset-0 rounded-full bg-lime/10 ring-1 ring-lime/30" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
        <Icon className="relative size-[18px]" aria-hidden="true" /><span className="relative hidden md:inline">{label}</span></a>))}
    </nav></motion.header>);
}
