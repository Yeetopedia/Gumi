const LAVA_BASE = "https://api.lava.so";
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

type Message = { role: "system" | "user" | "assistant"; content: string };

export async function lavaChat(messages: Message[], maxTokens = 150): Promise<string | null> {
  const key = process.env.LAVA_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `${LAVA_BASE}/v1/forward?u=${encodeURIComponent(GROQ_CHAT_URL)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          max_tokens: maxTokens,
          stream: false,
        }),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch {
    return null;
  }
}
