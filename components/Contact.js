"use client";
import { useState } from "react";
import { profile } from "@/data/profile";
import { socialList } from "./SocialLinks";
const empty = { name: "", email: "", subject: "", message: "" };
export default function Contact() {
  const [f, setF] = useState(empty); const [st, setSt] = useState({ s: "idle", m: "" }); const c = profile.contact;
  const links = socialList(c, true);
  async function submit(e) {
    e.preventDefault(); setSt({ s: "sending", m: "" });
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); const d = await r.json();
      if (!r.ok) throw new Error(d.error); setF(empty); setSt({ s: "ok", m: "Message sent. I'll reply by email." });
    } catch (err) { setSt({ s: "err", m: err.message || "Something went wrong." }); }
  }
  const field = "w-full border border-surface bg-bg2 px-4 py-3 outline-none transition focus:border-lime";
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (<section id="contact" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
    <div><h2 className="font-display text-4xl font-bold sm:text-5xl">Have something to build?</h2>
      <ul className="mt-8 space-y-3">{links.map((l) => <li key={l.label}><a href={l.href} target={l.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg text-mute transition hover:text-lime">{l.icon}{l.label}</a></li>)}</ul></div>
    <form onSubmit={submit} className="space-y-3" noValidate>
      <input required minLength={2} maxLength={80} placeholder="Name" aria-label="Name" value={f.name} onChange={set("name")} className={field} />
      <input required type="email" maxLength={120} placeholder="Email" aria-label="Email" value={f.email} onChange={set("email")} className={field} />
      <input required minLength={3} maxLength={120} placeholder="Subject" aria-label="Subject" value={f.subject} onChange={set("subject")} className={field} />
      <textarea required minLength={10} maxLength={2000} rows={5} placeholder="Message" aria-label="Message" value={f.message} onChange={set("message")} className={field} />
      <button disabled={st.s === "sending"} className="bg-lime px-6 py-3 font-medium text-bg transition hover:brightness-110 disabled:opacity-60">{st.s === "sending" ? "Sending…" : "Send message"}</button>
      <p role="status" className={st.s === "err" ? "text-crimson" : "text-lime"}>{st.m}</p>
    </form></section>);
}
