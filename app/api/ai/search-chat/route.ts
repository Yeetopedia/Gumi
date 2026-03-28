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

  const systemPrompt = `You are Gumi's shopping assistant helping users find the perfect products.

Your task: The user searched for "${searchQuery}". Looking at the available products below, write a SHORT, friendly recommendation message (2-3 sentences max, casual Instagram vibe).

Example recommendations:
- "Just found these perfect [product type]! They're exactly what you're looking for."
- "Ooh, these are amazing! Great [qualities] for what you searched."
- "Your search led me to these gems – highly recommend!"

Keep your message brief and natural. Focus on why the products are great, not on the product names.`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `User searched for: "${searchQuery}"\n\nAvailable products:\n${productList}`,
    },
  ];

  const response = await lavaChat(messages, 150);

  if (!response) {
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }

  // Recommend the first 3 products
  const recommendedProducts = availableProducts.slice(0, 3);

  return NextResponse.json({
    message: response,
    recommendedProducts,
  });
}
