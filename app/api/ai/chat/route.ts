import { NextRequest, NextResponse } from "next/server";
import { lavaChat } from "@/lib/lava";

export async function POST(request: NextRequest) {
  const { message, conversationHistory } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const systemPrompt = `You are Gumi's shopping assistant chatbot. You help users discover products, get recommendations based on what their friends have bought, and learn about social shopping trends. Be friendly, concise, and helpful. You're an expert in fashion, home, beauty, tech, and lifestyle products. Keep responses under 100 words. Focus on being conversational and making shopping fun.`;

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...(conversationHistory || []),
    { role: "user", content: message },
  ];

  const response = await lavaChat(messages, 200);

  if (!response) {
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: response });
}
