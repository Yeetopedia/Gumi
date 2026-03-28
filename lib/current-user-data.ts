import { Product, Collection, CurrentUserProfile, MockUser } from "@/types";
import { MOCK_PRODUCTS } from "./mock-data";
import { MOCK_USERS, CURRENT_USER } from "./mock-users";
import { getUserGumis, getUserHighlights } from "./user-products";

export type { HighlightCollection } from "./user-products";
export { getUserHighlights } from "./user-products";

// Extended current user profile
export function getCurrentUserProfile(): CurrentUserProfile {
  return {
    ...CURRENT_USER,
    email: "tyler@gumi.app",
    joinedDate: "2025-06-15",
    isPrivate: false,
    notificationsEnabled: true,
    savedProducts: getMySavedProducts().map((p) => p.id),
    wishlistProducts: getMyWishlist().map((p) => p.id),
    collections: getMyCollections(),
  };
}

// Products the current user has Gumied (purchased) — expanded set
export function getMyGumis(): Product[] {
  const base = getUserGumis("user-me");
  // Add more products for a richer profile — spread across categories
  const extra = MOCK_PRODUCTS.filter(
    (p) => !base.some((b) => b.id === p.id)
  ).slice(0, 20);
  return [...base, ...extra].slice(0, 28);
}

// Products the current user has saved/bookmarked — mix of categories
export function getMySavedProducts(): Product[] {
  return [
    ...MOCK_PRODUCTS.slice(0, 4),     // fashion
    ...MOCK_PRODUCTS.slice(135, 139), // home
    ...MOCK_PRODUCTS.slice(210, 214), // beauty
    ...MOCK_PRODUCTS.slice(300, 303), // tech
    ...MOCK_PRODUCTS.slice(175, 178), // kitchen
  ];
}

// Products on the current user's wishlist — different categories
export function getMyWishlist(): Product[] {
  return [
    ...MOCK_PRODUCTS.slice(35, 38),   // shoes
    ...MOCK_PRODUCTS.slice(100, 103), // jewelry
    ...MOCK_PRODUCTS.slice(245, 248), // fragrance
    ...MOCK_PRODUCTS.slice(270, 273), // art
    ...MOCK_PRODUCTS.slice(330, 333), // wellness
  ];
}

// User-created collections
const COLLECTION_DEFS: Omit<Collection, "productIds">[] = [
  {
    id: "col-1",
    name: "Home Favorites",
    description: "Things that made my space feel like home",
    coverProductId: MOCK_PRODUCTS[135]?.id ?? "",
    createdAt: "2025-11-20",
    isDefault: false,
  },
  {
    id: "col-2",
    name: "Gift Ideas",
    description: "Perfect gifts for people I love",
    coverProductId: MOCK_PRODUCTS[245]?.id ?? "",
    createdAt: "2025-12-01",
    isDefault: false,
  },
  {
    id: "col-3",
    name: "Spring Picks",
    description: "Fresh finds for the new season",
    coverProductId: MOCK_PRODUCTS[0]?.id ?? "",
    createdAt: "2026-02-14",
    isDefault: false,
  },
  {
    id: "col-4",
    name: "Tech Essentials",
    description: "Desk setup and everyday carry",
    coverProductId: MOCK_PRODUCTS[300]?.id ?? "",
    createdAt: "2026-01-10",
    isDefault: false,
  },
  {
    id: "col-5",
    name: "Self-Care Rituals",
    description: "My daily wellness routine",
    coverProductId: MOCK_PRODUCTS[330]?.id ?? "",
    createdAt: "2026-02-28",
    isDefault: false,
  },
  {
    id: "col-6",
    name: "Kitchen Upgrade",
    description: "Cooking with beautiful tools",
    coverProductId: MOCK_PRODUCTS[175]?.id ?? "",
    createdAt: "2026-03-10",
    isDefault: false,
  },
];

export function getMyCollections(): Collection[] {
  const collectionProducts = [
    // Home Favorites: home + plants
    [...MOCK_PRODUCTS.slice(135, 140), ...MOCK_PRODUCTS.slice(410, 413)].map(p => p.id),
    // Gift Ideas: fragrance + beauty + jewelry
    [...MOCK_PRODUCTS.slice(245, 248), ...MOCK_PRODUCTS.slice(210, 213), ...MOCK_PRODUCTS.slice(100, 102)].map(p => p.id),
    // Spring Picks: fashion + shoes + bags
    [...MOCK_PRODUCTS.slice(0, 3), ...MOCK_PRODUCTS.slice(35, 38), ...MOCK_PRODUCTS.slice(65, 67)].map(p => p.id),
    // Tech Essentials: tech
    MOCK_PRODUCTS.slice(300, 308).map(p => p.id),
    // Self-Care Rituals: wellness + beauty
    [...MOCK_PRODUCTS.slice(330, 335), ...MOCK_PRODUCTS.slice(215, 218)].map(p => p.id),
    // Kitchen Upgrade: kitchen + food
    [...MOCK_PRODUCTS.slice(175, 180), ...MOCK_PRODUCTS.slice(430, 433)].map(p => p.id),
  ];

  return COLLECTION_DEFS.map((def, i) => ({
    ...def,
    productIds: collectionProducts[i] || [],
  }));
}

export function getCollectionProducts(collectionId: string): Product[] {
  const collection = getMyCollections().find((c) => c.id === collectionId);
  if (!collection) return [];
  return collection.productIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

// Social lists
export function getMyFollowers(): MockUser[] {
  return MOCK_USERS.slice(0, 8);
}

export function getMyFollowing(): MockUser[] {
  return MOCK_USERS.slice(2, 8);
}

// Mutual friends with a specific user
export function getMutualFriends(userId: string): MockUser[] {
  const seed = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return MOCK_USERS.filter((_, i) => (i * seed) % 5 === 0).slice(0, 3);
}
