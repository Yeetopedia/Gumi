const LAVA_BASE = "https://api.lava.so";
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

type Message = { role: "system" | "user" | "assistant"; content: string };

export async function lavaChat(messages: Message[], maxTokens = 150): Promise<string | null> {
  const key = process.env.LAVA_API_KEY;

  console.log("🔵 lavaChat called");
  console.log("LAVA_API_KEY exists:", !!key);

  if (!key) {
    console.error("🔴 No LAVA_API_KEY found in env");
    return null;
  }

  try {
    console.log("🔵 Making request to Lava...");
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

    console.log("🔵 Lava response status:", res.status);

    if (!res.ok) {
      console.error("🔴 Lava API error:", res.status, res.statusText);
      const errorText = await res.text();
      console.error("🔴 Error body:", errorText);
      return null;
    }

    const data = await res.json();
    console.log("🔵 Lava data:", data);
    const result = data.choices?.[0]?.message?.content?.trim() ?? null;
    console.log("🟢 Lava result:", result);
    return result;
  } catch (error) {
    console.error("🔴 lavaChat error:", error);
    return null;
  }
}
