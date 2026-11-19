import { rateLimited } from "@/lib/knowledge";
const clean = (s, n) => String(s || "").trim().slice(0, n);
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (rateLimited(ip, 4, 600000)) return Response.json({ error: "Too many submissions. Try later." }, { status: 429 });
  let b; try { b = await req.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const d = { name: clean(b.name, 80), email: clean(b.email, 120), subject: clean(b.subject, 120), message: clean(b.message, 2000) };
  if (d.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.subject.length < 3 || d.message.length < 10)
    return Response.json({ error: "Please complete every field correctly." }, { status: 400 });
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return Response.json({ error: "Form delivery isn't configured. Email me directly instead." }, { status: 503 });
  try {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
    if (!r.ok) throw new Error();
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Delivery failed. Email me directly instead." }, { status: 502 }); }
}
