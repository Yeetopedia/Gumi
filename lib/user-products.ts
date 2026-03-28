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
// fashion(0-34), shoes(35-64), bags(65-99), jewelry(100-134), home(135-174),
// kitchen(175-209), beauty(210-244), fragrance(245-269), art(270-299),
// tech(300-329), wellness(330-359), outdoors(360-384), books(385-409),
// plants(410-429), food(430-454)
const HIGHLIGHT_DEFS = [
  { id: "fashion", label: "Fashion", emoji: "\u{1F457}", range: [0, 35] as const },
  { id: "shoes", label: "Shoes", emoji: "\u{1F45F}", range: [35, 65] as const },
  { id: "home", label: "Home", emoji: "\u{1F3E0}", range: [135, 175] as const },
  { id: "beauty", label: "Beauty", emoji: "\u2728", range: [210, 245] as const },
  { id: "jewelry", label: "Jewelry", emoji: "\u{1F48D}", range: [100, 135] as const },
  { id: "tech", label: "Tech", emoji: "\u{1F4BB}", range: [300, 330] as const },
  { id: "kitchen", label: "Kitchen", emoji: "\u{1F373}", range: [175, 210] as const },
  { id: "art", label: "Art", emoji: "\u{1F3A8}", range: [270, 300] as const },
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
