import { Product, Category } from "@/types";
import { getRandomGumiFriends } from "./mock-users";
import { ALL_PRODUCTS, CATEGORY_PRODUCTS } from "./mock-products";

function randomGumis(): number {
  const ranges = [
    [50, 500],
    [500, 5000],
    [5000, 50000],
    [50000, 500000],
  ];
  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
}

function randomShares(): number {
  return Math.floor(Math.random() * 2000) + 10;
}

export const CATEGORIES: Category[] = [
  { id: "for-you", label: "For You", query: "trending aesthetic lifestyle" },
  { id: "fashion", label: "Fashion", query: "fashion clothing accessories streetwear" },
  { id: "shoes", label: "Shoes", query: "shoes sneakers boots footwear" },
  { id: "bags", label: "Bags", query: "bags accessories leather goods" },
  { id: "jewelry", label: "Jewelry", query: "jewelry minimal gold silver" },
  { id: "home", label: "Home", query: "home decor interior design aesthetic" },
  { id: "kitchen", label: "Kitchen", query: "kitchen cookware ceramic styled" },
  { id: "beauty", label: "Beauty", query: "beauty skincare cosmetics" },
  { id: "fragrance", label: "Fragrance", query: "fragrance perfume candles scent" },
  { id: "art", label: "Art & Design", query: "art prints design objects" },
  { id: "tech", label: "Tech", query: "tech gadgets accessories minimal" },
  { id: "wellness", label: "Wellness", query: "wellness yoga meditation self-care" },
  { id: "outdoors", label: "Outdoors", query: "outdoor gear adventure travel" },
  { id: "books", label: "Books", query: "books stationery journals pens" },
  { id: "plants", label: "Plants", query: "plants garden indoor greenery" },
  { id: "food", label: "Food & Drink", query: "food drink gourmet artisan" },
];

// All ~455 products from 15 categories
export const MOCK_PRODUCTS: Product[] = ALL_PRODUCTS;

// Paginate mock data
export function getMockProducts(
  cursor: string | null,
  limit: number = 15,
  category?: string
): { products: Product[]; nextCursor: string | null; hasMore: boolean } {
  // Use category-specific products if available, otherwise all products
  let products: Product[] =
    category && category !== "for-you" && CATEGORY_PRODUCTS[category]
      ? CATEGORY_PRODUCTS[category]
      : MOCK_PRODUCTS;

  // For "for-you" or unknown categories, shuffle deterministically
  if (!category || category === "for-you" || !CATEGORY_PRODUCTS[category]) {
    const seed = (category || "for-you").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    products = [...products].sort((a, b) => {
      const hashA = (a.id.charCodeAt(a.id.length - 1) * seed) % 100;
      const hashB = (b.id.charCodeAt(b.id.length - 1) * seed) % 100;
      return hashA - hashB;
    });
  }

  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const endIndex = startIndex + limit;
  const slice = products.slice(startIndex, endIndex);

  // If we've gone through all products, loop back with modified IDs
  if (slice.length < limit && startIndex < products.length * 3) {
    const remaining = limit - slice.length;
    const looped = products.slice(0, remaining).map((p, i) => ({
      ...p,
      id: `${p.id}-loop-${startIndex}-${i}`,
      gumis: randomGumis(),
      shares: randomShares(),
      gumiedByFriends: getRandomGumiFriends(),
    }));
    const allProducts = [...slice, ...looped];
    return {
      products: allProducts,
      nextCursor: String(endIndex),
      hasMore: true,
    };
  }

  return {
    products: slice,
    nextCursor: slice.length === limit ? String(endIndex) : null,
    hasMore: slice.length === limit,
  };
}

// Get related products (deterministic shuffle based on product ID)
export function getRelatedProducts(
  productId: string,
  allProducts: Product[],
  limit: number = 8
): Product[] {
  const seed = productId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return [...allProducts]
    .filter((p) => p.id !== productId)
    .sort((a, b) => {
      const hashA = (a.id.charCodeAt(a.id.length - 1) * seed) % 100;
      const hashB = (b.id.charCodeAt(b.id.length - 1) * seed) % 100;
      return hashA - hashB;
    })
    .slice(0, limit);
}

// Search mock data
export function searchMockProducts(
  query: string,
  cursor: string | null,
  limit: number = 15
): { products: Product[]; nextCursor: string | null; hasMore: boolean } {
  const q = query.toLowerCase();
  const filtered = MOCK_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.topFeatures.some((f) => f.toLowerCase().includes(q))
  );

  if (filtered.length === 0) {
    return { products: [], nextCursor: null, hasMore: false };
  }

  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const slice = filtered.slice(startIndex, startIndex + limit);

  return {
    products: slice,
    nextCursor: slice.length === limit ? String(startIndex + limit) : null,
    hasMore: slice.length === limit,
  };
}
