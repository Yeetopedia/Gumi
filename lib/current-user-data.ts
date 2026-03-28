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
  // Add more products for a richer profile
  const extra = MOCK_PRODUCTS.filter(
    (p) => !base.some((b) => b.id === p.id)
  ).slice(0, 12);
  return [...base, ...extra].slice(0, 20);
}

// Products the current user has saved/bookmarked
export function getMySavedProducts(): Product[] {
  return MOCK_PRODUCTS.slice(5, 15);
}

// Products on the current user's wishlist
export function getMyWishlist(): Product[] {
  return MOCK_PRODUCTS.slice(18, 26);
}

// User-created collections
const COLLECTION_DEFS: Omit<Collection, "productIds">[] = [
  {
    id: "col-1",
    name: "Home Favorites",
    description: "Things that made my space feel like home",
    coverProductId: MOCK_PRODUCTS[5]?.id ?? "",
    createdAt: "2025-11-20",
    isDefault: false,
  },
  {
    id: "col-2",
    name: "Gift Ideas",
    description: "Perfect gifts for people I love",
    coverProductId: MOCK_PRODUCTS[10]?.id ?? "",
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
    coverProductId: MOCK_PRODUCTS[15]?.id ?? "",
    createdAt: "2026-01-10",
    isDefault: false,
  },
];

export function getMyCollections(): Collection[] {
  return COLLECTION_DEFS.map((def, i) => ({
    ...def,
    productIds: MOCK_PRODUCTS.slice(i * 5, i * 5 + 5).map((p) => p.id),
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
