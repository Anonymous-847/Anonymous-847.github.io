"use client";
import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { profile as p } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { gallery } from "@/data/gallery";

/* ---------- tiny ANSI renderer: every line is real terminal text with colour codes ---------- */
const ESC = "\x1b[";
const A = (c, s) => `${ESC}${c}m${s}${ESC}0m`;
const COL = { 30: "#7f9a8b", 31: "#ff4d5a", 32: "#2cff7a", 33: "#ffd166", 34: "#5aa9ff", 35: "#d28cff", 36: "#4de1e1", 37: "#e6f1ea", 90: "#6b8577" };
function parse(s) {
  const out = []; let st = {}, last = 0, m; const re = /\x1b\[([\d;]*)m/g;
  while ((m = re.exec(s))) { if (m.index > last) out.push({ t: s.slice(last, m.index), ...st });
    for (const c of m[1].split(";").map(Number)) { if (!c) st = {}; else if (c === 1) st = { ...st, b: 1 }; else if (COL[c]) st = { ...st, c: COL[c] }; } last = re.lastIndex; }
  if (last < s.length) out.push({ t: s.slice(last), ...st }); return out;
}
const vis = (s) => s.replace(/\x1b\[[\d;]*m/g, "");

function Line({ text, anim, i, speed = 1, onTick }) {
  const spans = parse(text), total = spans.reduce((a, s) => a + s.t.length, 0);
  const [n, setN] = useState(anim ? 0 : total);
  useEffect(() => {
    if (!anim || !total) { setN(total); return; }
    let iv; const step = Math.max(2, Math.ceil(total / (22 / speed)));
    const t0 = setTimeout(() => { iv = setInterval(() => { setN((x) => { const nx = Math.min(total, x + step); if (nx >= total) clearInterval(iv); return nx; }); onTick?.(); }, 16); }, Math.min(i * 26, 700));
    return () => { clearTimeout(t0); clearInterval(iv); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let left = n;
  return (<p className="whitespace-pre-wrap break-words">{total ? spans.map((s, k) => { if (left <= 0) return null; const t = s.t.slice(0, left); left -= s.t.length; return <span key={k} style={{ color: s.c, fontWeight: s.b ? 700 : undefined }}>{t}</span>; }) : " "}</p>);
}

/* ---------- virtual file system ---------- */
const apps = ["terminal", "files", "projects", "skills", "about", "contact", "assistant"];
const cmds = ["help", "pwd", "cd", "ls", "cat", "tree", "echo", "uname", "id", "hostname", "uptime", "history", "whoami", "about", "skills", "projects", "contact", "neofetch", "date", "clear", "open", "ai", "sudo", "mkdir", "touch", "rm", "nmap", "ping", "ssh", "exit"];
const home = ["home", "anonymous"];
const img = (n) => `[image data] ${n}\nView it in the Files app: open files`;
const fs = () => ({ home: { anonymous: {
  "about.txt": `${p.about}\n\nRole: ${p.title}\nEducation: ${p.education.degree}, ${p.education.school} (${p.education.until})\nExperience: ${p.experience.role}, ${p.experience.org}`,
  "skills.txt": Object.entries(skills).map(([k, l]) => `${k}: ${l.join(", ")}`).join("\n"),
  "contact.md": `Email: ${p.contact.email}\nGitHub: ${p.contact.github}\nLinkedIn: ${p.contact.linkedin}`,
  System: { README: "Open any app with: open <app>", "kernel.log": "[ OK ] anonymous kernel loaded\n[ WARN ] /dev/void: something is watching" },
  Gallery: Object.fromEntries(gallery.map((g) => [`${g.title}.jpg`, img(g.title)])),
  "Projects Pictures": Object.fromEntries(projects.map((x) => [`${x.name}.png`, img(x.name)])),
  projects: Object.fromEntries(projects.map((x) => [`${x.id}.md`, `# ${x.name}\n${x.category}\n\n${x.desc}\n\nStack: ${x.stack.join(", ")}\nLive: ${x.live || "not public"}`])),
} } });
const nodeAt = (root, segs) => { let n = root; for (const s of segs) { if (typeof n !== "object" || !(s in n)) return undefined; n = n[s]; } return n; };
const norm = (cwd, path) => { const segs = path.startsWith("/") ? [] : path.startsWith("~") ? [...home] : [...cwd]; for (const r of path.replace(/^~/, "").split("/").filter(Boolean)) { if (r === "..") segs.pop(); else if (r !== ".") segs.push(r); } return segs; };
const isDir = (n) => typeof n === "object";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const LOGO = ["      .-\"\"\"\"\"\"-.      ", "    .'  _    _  '.    ", "   /   (o)  (o)   \\   ", "  |      /\\        |  ", "  |    ,-\"\"-.      |  ", "   \\   '-vvvv-'   /   ", "    '.   ####   .'    ", "      '-......-'      "];

export default function Terminal({ onOpen, variant = "linux", ref, ctrl, onCtrlDone, onBell }) {
  const tx = variant === "termux";
  const root = useRef(null); if (!root.current) root.current = fs();
  const t0 = useRef(Date.now()), hist = useRef([]), hi = useRef(0), box = useRef(), inp = useRef(), uid = useRef(0);
  const [cwd, setCwd] = useState(home); const cwdRef = useRef(home); cwdRef.current = cwd;
  const [ed, setEdS] = useState({ v: "", pos: 0 }); const edRef = useRef(ed);
  const setEd = (n) => { edRef.current = n; setEdS(n); };
  const [busy, setBusy] = useState(false), [focus, setFocus] = useState(false);
  const [log, setLog] = useState([]);
  const scroll = useCallback(() => { const b = box.current; if (b) b.scrollTop = b.scrollHeight; }, []);

  const path = (c) => { const j = c.join("/"); const t = j === "home/anonymous" ? "~" : j.startsWith("home/anonymous/") ? "~/" + j.slice(15) : "/" + j; return t; };
  const promptOf = (c) => tx ? `${path(c)} $ ` : `${A("1;32", "guest@anonymous")}:${A("1;34", path(c))}$ `;
  const abs = (c) => (tx ? "/data/data/com.termux/files" : "") + "/" + c.join("/");

  const push = useCallback((lines, anim = true) => setLog((x) => [...x, ...[lines].flat(Infinity).flatMap((s) => String(s).split("\n")).map((t, k) => ({ id: ++uid.current, t, anim, k }))]), []);
  const add = (...t) => push(t);

  /* banner, typed on start */
  useEffect(() => {
    const d = new Date().toString().slice(0, 24);
    push(tx ? [A("1", "Welcome to Termux!"), "", `Docs:       ${A("34", "https://termux.dev/docs")}`, `Community:  ${A("34", "https://termux.dev/community")}`, "", "Working with packages:", "", ` - Search:  pkg search <query>`, ` - Install: pkg install <package>`, ` - Upgrade: pkg upgrade`, "", `${A("32", "portfolio")}: type ${A("1;33", "help")} or ${A("1;33", "open projects")}`, `${A("90", "tip: swipe from the left edge for the session drawer")}`, ""]
      : [`${A("1;32", "Anonymous OS 1.0 LTS")} (GNU/Linux 6.8.0-anonymous x86_64)`, "", ` * Portfolio:  ${p.name} - ${p.title}`, ` * Apps:       ${A("1;33", "open projects")}, ${A("1;33", "open about")}, ${A("1;33", "open contact")}`, ` * Help:       ${A("1;33", "help")}`, "", `${A("90", "Last login: " + d + " from 10.0.0.1")}`, ""]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { scroll(); }, [log, scroll]);
  useLayoutEffect(() => { const i = inp.current; if (i && document.activeElement === i) try { i.setSelectionRange(ed.pos, ed.pos); } catch {} }, [ed]);

  async function run(raw) {
    const cmd = raw.trim(); const c0 = cwdRef.current;
    setLog((x) => [...x, { id: ++uid.current, t: promptOf(c0) + raw, anim: false }]);
    if (!cmd) return; hist.current.push(cmd); hi.current = hist.current.length;
    const tok = [...cmd.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((m) => m[1] ?? m[2] ?? m[3]); const [c, ...a] = tok;
    const flags = a.filter((x) => x.startsWith("-")).join(""), args = a.filter((x) => !x.startsWith("-")), arg = a.join(" "), r = root.current, at = (x) => nodeAt(r, norm(c0, x));
    const walk = (n, pre = "") => Object.entries(n).flatMap(([k, val], i, all) => { const last = i === all.length - 1, line = pre + (last ? "└── " : "├── ") + (isDir(val) ? A("1;34", k + "/") : k); return isDir(val) ? [line, ...walk(val, pre + (last ? "    " : "│   "))] : [line]; });
    const ro = () => add(`${c}: cannot modify '${args[0] || ""}': Read-only file system`);
    const paint = (n, k) => (isDir(n[k]) || k === "." || k === ".." ? A("1;34", k + "/") : /\.(md|txt)$/.test(k) ? A("32", k) : /\.(png|jpg)$/.test(k) ? A("35", k) : k);
    const row = (p0, name, i) => { const prj = projects[i]; return `${String(i + 1).padStart(2)}  ${A("1;37", prj.name.padEnd(32))}${A("36", prj.category.padEnd(18))}${prj.live ? A("32", "● live") : A("90", "○ private")}`; };
    const C = {
      help: () => add(A("1;33", "Navigation"), "  pwd  cd  ls [-la]  tree  cat <file>", A("1;33", "System"), "  uname -a  id  hostname  uptime  history  date  clear  neofetch", A("1;33", "Portfolio"), "  about  skills  projects [n]  contact", A("1;33", "Apps"), "  open <app>   ai <question>", A("1;33", "Fun"), "  nmap <host>  ping <host>  sudo  ssh", A("90", "TAB completes, UP/DOWN browse history, CTRL+L clears."), A("90", "apps: " + apps.join(", "))),
      pwd: () => add(abs(c0)),
      cd: () => { const dest = args[0] ? norm(c0, args[0]) : home, n = nodeAt(r, dest); if (n === undefined) return add(`bash: cd: ${args[0]}: No such file or directory`); if (!isDir(n)) return add(`bash: cd: ${args[0]}: Not a directory`); setCwd(dest); },
      ls: () => { const n = args[0] ? at(args[0]) : nodeAt(r, c0); if (n === undefined) return add(`ls: cannot access '${args[0]}': No such file or directory`); if (!isDir(n)) return add(args[0]);
        const names = [...(flags.includes("a") ? [".", ".."] : []), ...Object.keys(n)];
        if (flags.includes("l")) add(A("90", `total ${names.length * 4}`), names.map((k) => `${isDir(n[k]) || k === "." || k === ".." ? A("1;34", "drwxr-xr-x") : "-rw-r--r--"} guest guest ${String(isDir(n[k]) || k === "." || k === ".." ? 4096 : n[k].length).padStart(5)} Nov 19 ${paint(n, k)}`));
        else add(names.map((k) => paint(n, k)).join("  ") || "(empty)"); },
      cat: () => { if (!args.length) return add("cat: missing file operand"); args.forEach((f) => { const n = at(f); add(n === undefined ? `cat: ${f}: No such file or directory` : isDir(n) ? `cat: ${f}: Is a directory` : n); }); },
      tree: () => { const n = args[0] ? at(args[0]) : nodeAt(r, c0); add(isDir(n) ? [A("1;34", "."), ...walk(n)] : `tree: ${args[0]}: not a directory`); },
      echo: () => add(tok.slice(1).join(" ")), uname: () => add(flags.includes("a") ? "Linux anonymous 6.8.0-anonymous #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" : "Linux"),
      id: () => add("uid=1000(guest) gid=1000(guest) groups=1000(guest),27(sudo)"), hostname: () => add("anonymous"), whoami: () => add("guest"),
      uptime: () => add(` ${new Date().toTimeString().slice(0, 8)} up ${Math.max(1, Math.round((Date.now() - t0.current) / 60000))} min,  1 user,  load average: 0.13, 0.07, 0.01`), history: () => add(hist.current.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`)),
      about: () => add(p.about, "", `${A("1;32", "Role")}        ${p.title}`, `${A("1;32", "Education")}   ${p.education.degree}, ${p.education.school} (${p.education.until})`, `${A("1;32", "Experience")}  ${p.experience.role}, ${p.experience.org}`),
      skills: () => add(Object.entries(skills).map(([k, l]) => `${A("1;33", k.padEnd(16))}${l.map((s) => A("32", s)).join(A("90", " · "))}`)),
      projects: () => { const k = args[0]; if (k) { const x = projects[+k - 1] || projects.find((q) => q.id === k); if (!x) return add(`projects: '${k}': no such project`); return add(A("1;32", x.name), A("36", x.category), "", x.desc, "", `${A("1;33", "stack")}  ${x.stack.join(", ")}`, `${A("1;33", "live ")}  ${x.live || A("90", "not public")}`, `${A("1;33", "repo ")}  ${x.github || A("90", "private")}`); }
        add(A("90", " #  NAME                            CATEGORY          STATUS"), projects.map((q, i) => row(0, q, i)), "", A("90", "projects <n> for details · open projects for the GUI")); },
      contact: () => add(`${A("1;32", "email   ")} ${p.contact.email}`, `${A("1;32", "github  ")} ${p.contact.github}`, `${A("1;32", "linkedin")} ${p.contact.linkedin}`),
      neofetch: () => { const info = [`${A("1;32", "guest")}@${A("1;32", "anonymous")}`, "-".repeat(15), `${A("1;31", "OS")}: ${tx ? "Android 14 (Termux)" : "Anonymous OS 1.0 x86_64"}`, `${A("1;31", "Host")}: portfolio.local`, `${A("1;31", "Kernel")}: 6.8.0-anonymous`, `${A("1;31", "Shell")}: bash 5.2`, `${A("1;31", "Role")}: ${p.title}`, `${A("1;31", "Focus")}: ${p.focus.slice(0, 2).join(", ")}`, `${A("1;31", "Edu")}: ${p.education.school}`, `${A("1;31", "Work")}: ${p.experience.role} @ ${p.experience.org}`, "", "\x1b[41m   \x1b[42m   \x1b[43m   \x1b[44m   \x1b[45m   \x1b[46m   \x1b[0m"];
        add(info.map((l, i) => A("31", LOGO[i] ?? " ".repeat(22)) + l)); },
      date: () => add(new Date().toString()), clear: () => setLog([]), sudo: () => add("guest is not in the sudoers file. This incident will be reported."),
      mkdir: ro, touch: ro, rm: ro, mv: ro, cp: ro, nano: ro, vim: ro, exit: () => add("logout: nice try. there is no escape."),
      ping: () => { const h = args[0] || "localhost"; add(`PING ${h} (127.0.0.1) 56(84) bytes of data.`, [1, 2, 3].map((n) => `64 bytes from ${h} (127.0.0.1): icmp_seq=${n} ttl=64 time=0.0${n + 3} ms`), `--- ${h} ping statistics ---`, "3 packets transmitted, 3 received, 0% packet loss"); },
      nmap: () => { const h = args[0] || "localhost"; add(`Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toTimeString().slice(0, 5)}`, `Nmap scan report for ${h}`, "Host is up (0.00012s latency).", "PORT     STATE    SERVICE", `22/tcp   ${A("33", "filtered")} ssh`, `80/tcp   ${A("32", "open    ")} http`, `443/tcp  ${A("32", "open    ")} https`, `1337/tcp ${A("31", "open    ")} ${A("31", "something-is-watching")}`, "", "Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds"); },
      ssh: () => add("ssh: connect to host anonymous port 22: Permission denied. They know you tried."),
      open: () => { if (apps.includes(arg)) { onOpen(arg); add(`opening ${arg}...`); } else add(`usage: open <${apps.join("|")}>`); },
      pkg: () => add("pkg: package management is disabled in this sandbox."), "termux-info": () => add("Termux version: 0.118", "Android version: 14", "Device: portfolio"),
      ai: async () => { if (!arg) return add("usage: ai <question>"); setBusy(true); add(A("90", "thinking..."));
        try { const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", text: arg.slice(0, 600) }] }) }); const d = await res.json(); add(res.ok ? d.text : A("31", "error: " + d.error)); } catch { add(A("31", "error: network failure")); } setBusy(false); },
    };
    await (C[c] || (() => add(`bash: ${c}: command not found`)))();
  }

  function complete() {
    const { v } = edRef.current, parts = v.split(/\s+/), last = parts[parts.length - 1];
    if (parts.length === 1) { const m = cmds.filter((x) => x.startsWith(last)); if (m.length === 1) setEd({ v: m[0] + " ", pos: m[0].length + 1 }); else if (m.length > 1) add(m.join("  ")); return; }
    const i = last.lastIndexOf("/") + 1, dir = nodeAt(root.current, norm(cwdRef.current, last.slice(0, i) || ".")); if (!isDir(dir)) return;
    const m = Object.keys(dir).filter((k) => k.toLowerCase().startsWith(last.slice(i).toLowerCase()));
    if (m.length === 1) { const full = last.slice(0, i) + m[0] + (isDir(dir[m[0]]) ? "/" : ""), nv = v.slice(0, v.length - last.length) + (full.includes(" ") ? `"${full}"` : full); setEd({ v: nv, pos: nv.length }); } else if (m.length > 1) add(m.join("  "));
  }

  function press(k) {
    const { v, pos } = edRef.current;
    switch (k) {
      case "Enter": if (busy) return; setEd({ v: "", pos: 0 }); run(v); break;
      case "Tab": complete(); break;
      case "Bksp": if (pos > 0) setEd({ v: v.slice(0, pos - 1) + v.slice(pos), pos: pos - 1 }); break;
      case "Up": if (hi.current > 0) { const h = hist.current[--hi.current]; setEd({ v: h, pos: h.length }); } break;
      case "Down": { hi.current = Math.min(hi.current + 1, hist.current.length); const h = hist.current[hi.current] || ""; setEd({ v: h, pos: h.length }); break; }
      case "Left": setEd({ v, pos: Math.max(0, pos - 1) }); break;
      case "Right": setEd({ v, pos: Math.min(v.length, pos + 1) }); break;
      case "Home": case "Ctrl+a": setEd({ v, pos: 0 }); break;
      case "End": case "Ctrl+e": setEd({ v, pos: v.length }); break;
      case "Esc": case "Ctrl+u": setEd({ v: "", pos: 0 }); break;
      case "Ctrl+l": setLog([]); break;
      case "Ctrl+c": setLog((x) => [...x, { id: ++uid.current, t: promptOf(cwdRef.current) + v + "^C", anim: false }]); setEd({ v: "", pos: 0 }); break;
      case "Ctrl+w": { const b = v.slice(0, pos).replace(/\s*\S*\s*$/, ""); setEd({ v: b + v.slice(pos), pos: b.length }); break; }
      case "PgUp": box.current?.scrollBy({ top: -box.current.clientHeight * .8, behavior: "smooth" }); break;
      case "PgDn": box.current?.scrollBy({ top: box.current.clientHeight * .8, behavior: "smooth" }); break;
    }
  }
  const insert = (s) => { const { v, pos } = edRef.current; setEd({ v: v.slice(0, pos) + s + v.slice(pos), pos: pos + s.length }); };
  useImperativeHandle(ref, () => ({ press, insert, focus: () => inp.current?.focus({ preventScroll: true }) }));

  const onChange = (e) => {
    const nv = e.target.value, np = e.target.selectionStart ?? nv.length, { v, pos } = edRef.current;
    if (ctrl?.current && nv.length === v.length + 1 && /[a-z]/i.test(nv[np - 1] || "")) { const ch = nv[np - 1].toLowerCase(); onCtrlDone?.(); e.target.value = v; press("Ctrl+" + ch); return; }
    setEd({ v: nv, pos: np });
  };
  const onKeyDown = (e) => {
    const map = { Enter: "Enter", Tab: "Tab", ArrowUp: "Up", ArrowDown: "Down", ArrowLeft: "Left", ArrowRight: "Right", Home: "Home", End: "End", Escape: "Esc", PageUp: "PgUp", PageDown: "PgDn" };
    if (e.ctrlKey && /^[aceulw]$/i.test(e.key) && !(e.key.toLowerCase() === "c" && getSelection()?.toString())) { e.preventDefault(); press("Ctrl+" + e.key.toLowerCase()); return; }
    if (map[e.key] && !e.metaKey) { e.preventDefault(); press(map[e.key]); }
  };
  const { v, pos } = ed;
  const base = `${tx ? "termux" : ""} relative h-full overflow-y-auto font-mono ${tx ? "bg-black px-2 py-1 text-[12.5px] leading-[1.28] text-[#e6e6e6]" : "bg-[#0a0f0c]/95 p-3 text-[13px] leading-[1.45] text-ink"}`;
  return (<div ref={box} onClick={() => { if (!getSelection()?.toString()) inp.current?.focus({ preventScroll: true }); }} className={base} style={{ cursor: "text" }}>
    {log.map((l, i) => <Line key={l.id} text={l.t} anim={l.anim} i={l.k ?? 0} onTick={scroll} />)}
    <div className="relative whitespace-pre-wrap break-all">
      {parse(promptOf(cwd)).map((s, k) => <span key={k} style={{ color: s.c, fontWeight: s.b ? 700 : undefined }}>{s.t}</span>)}
      <span>{v.slice(0, pos)}</span><span className={`term-cursor ${focus ? "" : "off"}`}>{v[pos] || " "}</span><span>{v.slice(pos + 1)}</span>
      <input ref={inp} value={v} onChange={onChange} onKeyDown={onKeyDown} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} autoFocus spellCheck={false} autoCapitalize="off" autoCorrect="off" autoComplete="off" enterKeyHint="send" aria-label="Terminal input"
      className="term-input absolute left-0 top-0 size-px bg-transparent text-transparent caret-transparent opacity-0" style={{ fontSize: 16 }} />
    </div>

  </div>);
}
