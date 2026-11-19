import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { systemPrompt, rateLimited } from "@/lib/knowledge";
import { localAnswer } from "@/lib/fallback";

export const runtime = "nodejs";

const json = (o, s = 200) => Response.json(o, { status: s });

function streamText(text) {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
    if (rateLimited(ip)) {
      return json({ error: "Too many messages. Wait a minute and try again." }, 429);
    }

    const key = process.env.GEMINI_API_KEY;
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const msgs = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const ok =
      msgs.length &&
      msgs.every(
        (m) =>
          ["user", "assistant"].includes(m.role) &&
          typeof m.text === "string" &&
          m.text.length <= 600
      );
    if (!ok || msgs[msgs.length - 1].role !== "user") {
      return json({ error: "Messages must be under 600 characters." }, 400);
    }

    const last = msgs[msgs.length - 1].text;
    if (!key || key === "your_api_key_here") return streamText(localAnswer(last));

    const lcMessages = [
      new SystemMessage(systemPrompt),
      ...msgs.map((m) =>
        m.role === "user" ? new HumanMessage(m.text) : new AIMessage(m.text)
      ),
    ];

    const models = [
      ...new Set(
        [
          process.env.GEMINI_MODEL,
          "gemini-3.5-flash-lite",
          "gemini-3.1-flash-lite",
          "gemini-2.5-flash-lite",
        ].filter(Boolean)
      ),
    ];

    for (const modelName of models) {
      try {
        const llm = new ChatGoogleGenerativeAI({
          apiKey: key,
          model: modelName,
          maxOutputTokens: 800,
        });

        const llmStream = await llm.stream(lcMessages);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of llmStream) {
                const text =
                  typeof chunk.content === "string"
                    ? chunk.content
                    : Array.isArray(chunk.content)
                    ? chunk.content.map((c) => c.text || "").join("")
                    : "";
                if (text) controller.enqueue(encoder.encode(text));
              }
            } catch (err) {
              console.error(`[chat] Stream error (${modelName}):`, err);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      } catch (e) {
        console.error(`[chat] Model failed (${modelName}):`, e?.message || e);
        const status = e?.status || e?.response?.status;
        if ([400, 401, 403].includes(status)) break;
      }
    }

    return streamText(localAnswer(last));
  } catch (fatal) {
    console.error("[chat] Fatal route error:", fatal);
    return json({ error: fatal?.message || "Server error" }, 500);
  }
}