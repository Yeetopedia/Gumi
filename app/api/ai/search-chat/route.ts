import { NextRequest, NextResponse } from "next/server";
import { lavaChat } from "@/lib/lava";
import { formatPriceRange } from "@/lib/utils";

type PriceObject = {
  min: number;
  max: number;
  currency: string;
};

type ProductSummary = {
  id: string;
  title: string;
  brand: string;
  price: PriceObject;
  primaryImage: { url: string; alt: string };
};

export async function POST(request: NextRequest) {
  const { searchQuery, availableProducts } = await request.json();

  if (!searchQuery || !Array.isArray(availableProducts)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const productList = availableProducts
    .slice(0, 10)
    .map(
      (p: ProductSummary, i: number) =>
        `${i + 1}. "${p.title}" by ${p.brand} - ${formatPriceRange(
          p.price.min,
          p.price.max,
          p.price.currency
        )}`
    )
    .join("\n");

  const systemPrompt = `You are Gumi's shopping assistant. KEEP YOUR MESSAGE SUPER SHORT - MAX 1 SENTENCE.

The user searched for: "${searchQuery}"

Your job: Write ONE casual, friendly sentence about the products shown. That's it. No explanations, no rambling.

Examples of GOOD responses (short!):
- "These totally match what you're looking for! 🎯"
- "Found exactly what you need!"
- "Ooh love these for your search!"

Rules:
- NEVER MORE THAN 1 SENTENCE
- NEVER MORE THAN 20 WORDS
- Be casual, be brief, be done
- If products don't match search well, just say "These are close to what you searched for!"`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `Products for "${searchQuery}":\n${productList}`,
    },
  ];

  const response = await lavaChat(messages, 80);

  if (!response) {
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }

  // Enforce single sentence + trim to first sentence if needed
  let cleanedResponse = response.trim();
  const firstSentence = cleanedResponse.split(/[.!?]+/)[0];
  if (firstSentence) {
    cleanedResponse = firstSentence + (firstSentence.match(/[.!?]$/) ? "" : ".");
  }
  // Truncate to 100 chars absolute max for UI
  if (cleanedResponse.length > 100) {
    cleanedResponse = cleanedResponse.substring(0, 97) + "...";
  }

  // Recommend the first 3 products
  const recommendedProducts = availableProducts.slice(0, 3);

  return NextResponse.json({
    message: cleanedResponse,
    recommendedProducts,
  });
}
