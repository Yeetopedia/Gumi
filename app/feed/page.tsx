"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product, MockUser } from "@/types";
import { getProductPool, getSearchPool } from "@/lib/mock-data";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQueue } from "@/hooks/useInfiniteQueue";
import Sidebar from "@/components/Sidebar";
import ReelsView from "@/components/ReelsView";
import ProductModal from "@/components/ProductModal";
import UserProfile from "@/components/UserProfile";

export default function FeedPage() {
  const router = useRouter();

  // UI state
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  // Follow state
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  // Gummi toast state (unused but kept for consistency)
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductTitle, setToastProductTitle] = useState("");

  const debouncedSearch = useDebounce(searchValue, 300);

  // Debounced search → activeSearch
  useEffect(() => {
    if (debouncedSearch !== activeSearch) {
      setActiveSearch(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Queue-based infinite scroll
  const sourceProducts = useMemo(() => {
    if (activeSearch) return getSearchPool(activeSearch);
    return getProductPool(activeCategory);
  }, [activeCategory, activeSearch]);

  const {
    displayedProducts,
    isLoading,
    manualAppend,
  } = useInfiniteQueue(sourceProducts, {
    batchSize: 500,
    prefetchAt: 200,
    initialDisplayCount: 30,
    resetKey: `${activeCategory}|${activeSearch}`,
  });

  // Handle Gummi action — show confirmation toast
  const handleGummi = useCallback((product: Product) => {
    setToastProductTitle(product.title);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  // Handle friend avatar click — open profile
  const handleFriendClick = useCallback((user: MockUser) => {
    setSelectedUser(user);
  }, []);

  // Product click — show modal overlay
  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <main className="flex min-h-screen bg-(--bg-primary)">
      {/* Sidebar */}
      <Sidebar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={(value) => setActiveSearch(value)}
        categories={[]}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        activeSection="feed"
        onHomeClick={() => router.push("/")}
        onExploreClick={() => router.push("/explore")}
        onGamesClick={() => router.push("/games")}
        onMessagesClick={() => router.push("/messages")}
        onLikesClick={() => router.push("/likes")}
        onFollowUser={(userId) => {
          setFollowedUsers((prev) => new Set([...prev, userId]));
        }}
        isFollowing={(userId) => followedUsers.has(userId)}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {displayedProducts.length > 0 && (
          <ReelsView
            products={displayedProducts}
            onLoadMore={manualAppend}
            hasMore={true}
            onProductClick={handleProductClick}
            onClose={() => router.back()}
          />
        )}

        {/* Product modal overlay */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onGummi={handleGummi}
          onFriendClick={handleFriendClick}
        />

        {/* User profile modal */}
        <UserProfile
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onFollow={(userId) => {
            setFollowedUsers((prev) => new Set([...prev, userId]));
          }}
          onMessage={() => {
            setSelectedUser(null);
          }}
          isFollowing={(userId) => followedUsers.has(userId)}
        />
      </div>
    </main>
  );
}
