export type ProductImage = {
  url: string;
  alt: string;
};

export type MockUser = {
  id: string;
  name: string;
  username: string;
  avatar: string; // Unsplash profile photo URL
  bio: string;
  gumiCount: number; // total products they've Gumied
  followers: number;
  following: number;
  hasStory: boolean; // whether they have an active story ring
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  primaryImage: ProductImage;
  images: ProductImage[];
  price: {
    min: number;
    max: number;
    currency: string;
  };
  rating: {
    average: number;
    count: number;
  } | null;
  buyUrl: string;
  topFeatures: string[];
  description?: string;
  aspectRatio?: number;

  // Gumi social metrics
  gumis: number; // total Gumi count (replaces likes)
  shares: number;
  gumiedByFriends?: string[]; // user IDs of friends who Gumied this
  isGumied?: boolean; // current user Gumied this
};

export type Vendor = {
  name: string;
  url: string;
  price: number;
  currency: string;
  verified: boolean;
};

export type FeedResponse = {
  products: Product[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type Category = {
  id: string;
  label: string;
  query: string;
};

export type FeedMode = "gallery" | "reels";

// Profile section types
export type CurrentUserProfile = MockUser & {
  email: string;
  joinedDate: string;
  isPrivate: boolean;
  notificationsEnabled: boolean;
  savedProducts: string[];
  wishlistProducts: string[];
  collections: Collection[];
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  coverProductId: string;
  productIds: string[];
  createdAt: string;
  isDefault: boolean;
};

export type ProfileTab = "gumis" | "saved" | "collections" | "wishlist";

export type SortOption = "recent" | "category" | "price-low" | "price-high";

export type UserListType = "followers" | "following";
