"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Product, MockUser } from "@/types";
import { CATEGORIES, getProductPool, getSearchPool } from "@/lib/mock-data";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQueue } from "@/hooks/useInfiniteQueue";
import Sidebar from "@/components/Sidebar";
import CategoryPills from "@/components/CategoryPills";
import MasonryGrid from "@/components/MasonryGrid";
import UserProfile from "@/components/UserProfile";
import GummiToast from "@/components/GummiToast";
import ChatBot from "@/components/ChatBot";

export default function ExplorePage() {
  const router = useRouter();

  // UI state
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  // Follow state
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  // Gummi toast state
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
    prefetchSentinelIndex,
    prefetchSentinelRef,
    loadSentinelRef,
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

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchValue("");
    setActiveSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (value: string) => {
    setActiveSearch(value);
  };

  const handleProductClick = useCallback((product: Product) => {
    router.push(`/product/${encodeURIComponent(product.id)}`);
  }, [router]);

  return (
    <main className="flex min-h-screen bg-(--bg-primary)">
      {/* Sidebar */}
      <Sidebar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={handleSearchSubmit}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
        activeSection="feed"
        onHomeClick={() => router.push("/")}
        onExploreClick={() => {}}
        onGamesClick={() => router.push("/games")}
        onMessagesClick={() => router.push("/messages")}
        onLikesClick={() => router.push("/")}
        onFollowUser={(userId) => {
          setFollowedUsers((prev) => new Set([...prev, userId]));
        }}
        isFollowing={(userId) => followedUsers.has(userId)}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        <div className="w-full">
          {/* Category pills */}
          {!activeSearch && (
            <div className="px-4 md:px-6 lg:px-8">
              <CategoryPills
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onSelect={handleCategorySelect}
              />
            </div>
          )}

          {/* Search results header */}
          {activeSearch && (
            <div className="px-4 md:px-6 lg:px-8 py-4">
              <p className="text-sm text-(--text-secondary)">
                {displayedProducts.length > 0
                  ? `Results for "${activeSearch}"`
                  : isLoading
                    ? `Searching for "${activeSearch}"...`
                    : `No results for "${activeSearch}"`}
              </p>
              {displayedProducts.length === 0 && !isLoading && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-(--text-tertiary)">Try:</span>
                  {["fashion", "home decor", "skincare", "kitchen", "art"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSearchValue(s);
                        setActiveSearch(s);
                      }}
                      className="px-3 py-1 bg-(--bg-secondary) rounded-full text-xs text-(--text-secondary) hover:bg-(--border) transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Search Chat */}
          {activeSearch && (
            <ChatBot
              searchQuery={activeSearch}
              currentProducts={displayedProducts}
              onProductClick={handleProductClick}
            />
          )}

          {/* Masonry grid */}
          <div className="px-4 md:px-6 lg:px-8 py-6">
            <MasonryGrid
              products={displayedProducts}
              isLoading={isLoading}
              onProductClick={handleProductClick}
              onFriendClick={handleFriendClick}
              onGummi={handleGummi}
              prefetchSentinelIndex={prefetchSentinelIndex}
              prefetchSentinelRef={prefetchSentinelRef}
            />

            <div ref={loadSentinelRef} className="h-4" />
          </div>
        </div>
      </div>

      <UserProfile
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onFollow={(userId) => {
          setFollowedUsers((prev) => new Set([...prev, userId]));
        }}
        onMessage={() => {
          router.push("/messages");
          setSelectedUser(null);
        }}
        isFollowing={(userId) => followedUsers.has(userId)}
      />

      {/* Purchase confirmation toast */}
      <GummiToast visible={toastVisible} productTitle={toastProductTitle} />
    </main>
  );
}
