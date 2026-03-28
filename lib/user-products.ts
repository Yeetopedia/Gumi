import { Product } from "@/types";
import { MOCK_PRODUCTS } from "./mock-data";

export type HighlightCollection = {
  id: string;
  label: string;
  emoji: string;
  products: Product[];
};

// Deterministic products for a user based on their ID
export function getUserGumis(userId: string): Product[] {
  const seed = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...MOCK_PRODUCTS].sort((a, b) => {
    const hashA = (a.id.charCodeAt(a.id.length - 1) * seed) % 100;
    const hashB = (b.id.charCodeAt(b.id.length - 1) * seed) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, Math.min(12, Math.floor(seed % 8) + 5));
}

// Product index ranges by category in MOCK_PRODUCTS
const HIGHLIGHT_DEFS = [
  { id: "fashion", label: "Fashion", emoji: "👗", range: [0, 5] as const },
  { id: "home", label: "Home", emoji: "🏠", range: [5, 10] as const },
  { id: "beauty", label: "Beauty", emoji: "✨", range: [10, 13] as const },
  { id: "art", label: "Art", emoji: "🎨", range: [13, 15] as const },
  { id: "tech", label: "Tech", emoji: "💻", range: [15, 17] as const },
  { id: "kitchen", label: "Kitchen", emoji: "🍳", range: [17, 20] as const },
];

export function getUserHighlights(userId: string): HighlightCollection[] {
  const userProducts = getUserGumis(userId);
  const productIds = new Set(userProducts.map((p) => p.id));

  return HIGHLIGHT_DEFS
    .map((def) => {
      const categoryProducts = MOCK_PRODUCTS.slice(def.range[0], def.range[1]);
      const matching = categoryProducts.filter((p) => productIds.has(p.id));
      // If no exact match, assign first few user products
      const products = matching.length > 0 ? matching : userProducts.slice(0, 2);
      return {
        id: def.id,
        label: def.label,
        emoji: def.emoji,
        products,
      };
    })
    .filter((h) => h.products.length > 0)
    .slice(0, 4);
}
