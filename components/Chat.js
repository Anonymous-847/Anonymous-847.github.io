"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Trash2, Sparkles } from "lucide-react";

const hello = "Hey! I'm Faizan's AI assistant. Want to explore his projects, technical skills or development experience?";
const ideas = [
  "What projects has Faizan built?",
  "Does he develop AI agents?",
  "What technologies does he use?",
  "Can I hire him?",
  "Tell me about his RAG projects.",
];

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [v, setV] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef();

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [msgs, busy, open]);

  async function send(text) {
    text = text.trim();
    if (!text || busy) return;

    const next = [...msgs, { role: "user", text }];
    setMsgs(next);
    setV("");
    setBusy(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setMsgs([...next, { role: "assistant", text: d.error || "Something went wrong.", err: true }]);
        setBusy(false);
        return;
      }

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", text: assistantText }]);
      }
    } catch {
      setMsgs([...next, { role: "assistant", text: "Network error. Try again.", err: true }]);
    }

    setBusy(false);
  }

  const bubble = "max-w-[85%] px-3 py-2 text-sm whitespace-pre-wrap";
  const waitingForFirstChunk = busy && msgs[msgs.length - 1]?.role === "user";

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-5 right-5 z-40 relative grid size-14 place-items-center rounded-full bg-lime text-bg shadow-lg transition hover:scale-105"
      >
        {!open && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-lime"
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
        {open ? <X className="relative size-6" /> : <Bot className="relative size-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-3 z-40 flex h-[32rem] max-h-[75svh] w-[calc(100vw-1.5rem)] max-w-sm flex-col border border-surface bg-bg2"
          >
            <div className="flex items-center justify-between border-b border-surface px-4 py-3">
              <span className="flex items-center gap-2 font-display">
                <Sparkles className="size-4 text-lime" />
                Faizan's assistant
              </span>
              <button onClick={() => setMsgs([])} className="text-xs text-mute hover:text-ink">
                <Trash2 className="mr-1 inline size-3" />
                Clear conversation
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <p className={`${bubble} bg-surface`}>{hello}</p>
              {!msgs.length && (
                <div className="flex flex-wrap gap-2">
                  {ideas.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="border border-surface px-2 py-1 text-left text-xs text-mute hover:border-lime hover:text-ink"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  <p
                    className={`${bubble} ${
                      m.role === "user" ? "bg-violet/30" : m.err ? "bg-crimson/20 text-crimson" : "bg-surface"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {waitingForFirstChunk && (
                <p className="flex gap-1 px-1" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="size-1.5 bg-lime"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1, delay: d * 0.15 }}
                    />
                  ))}
                </p>
              )}
              <div ref={end} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(v);
              }}
              className="flex border-t border-surface"
            >
              <input
                value={v}
                maxLength={600}
                onChange={(e) => setV(e.target.value)}
                placeholder="Ask about Faizan…"
                aria-label="Message"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
              />
              <button disabled={busy} aria-label="Send message" className="px-4 text-lime disabled:opacity-50">
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}