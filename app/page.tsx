"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product, MockUser, FeedMode } from "@/types";
import { CATEGORIES, getProductPool, getSearchPool } from "@/lib/mock-data";
import { getStoryUsers } from "@/lib/mock-users";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQueue } from "@/hooks/useInfiniteQueue";
import Sidebar from "@/components/Sidebar";
import StoriesRow from "@/components/StoriesRow";
import CategoryPills from "@/components/CategoryPills";
import StoryViewer from "@/components/StoryViewer";
import MasonryGrid from "@/components/MasonryGrid";
import UserProfile from "@/components/UserProfile";
import GummiToast from "@/components/GummiToast";
import MyProfile from "@/components/MyProfile/MyProfile";
import ChatBot from "@/components/ChatBot";
import ProductModal from "@/components/ProductModal";
import { useRecommendations } from "@/hooks/useRecommendations";

export default function Home() {
  const router = useRouter();

  // UI state
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  // Story viewer state
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [storyInitialIndex, setStoryInitialIndex] = useState(0);
  const [viewedStoryUsers, setViewedStoryUsers] = useState<Set<string>>(new Set());

  // My Profile
  const [myProfileOpen, setMyProfileOpen] = useState(false);

  // Feed mode
  const [feedMode, setFeedMode] = useState<"gallery" | "reels">("gallery");

  // Follow state
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  // Gummi toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductTitle, setToastProductTitle] = useState("");

  const debouncedSearch = useDebounce(searchValue, 300);
  const storyUsers = getStoryUsers();

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

  // Recommendation engine
  const { scores: recommendationScores, recordInteraction } = useRecommendations(displayedProducts);

  // Handle Gummi action — show confirmation toast
  const handleGummi = useCallback((product: Product) => {
    recordInteraction(product.id, "purchase");
    setToastProductTitle(product.title);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, [recordInteraction]);

  // Handle friend avatar click — open profile
  const handleFriendClick = useCallback((user: MockUser) => {
    setSelectedUser(user);
  }, []);

  // Handle story click — open story viewer and mark as viewed
  const handleStoryClick = useCallback((user: MockUser, index: number) => {
    setStoryInitialIndex(index);
    setStoryViewerOpen(true);
    setViewedStoryUsers((prev) => new Set(prev).add(user.id));
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
    // Navigate to product detail page
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
        onProfileClick={() => setMyProfileOpen(true)}
        activeSection="feed"
        onHomeClick={() => {
          setActiveCategory("for-you");
          setSearchValue("");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onExploreClick={() => router.push("/explore")}
        onLikesClick={() => router.push("/likes")}
        onGamesClick={() => router.push("/games")}
        onMessagesClick={() => router.push("/messages")}
        onFollowUser={(userId) => {
          setFollowedUsers((prev) => new Set([...prev, userId]));
        }}
        isFollowing={(userId) => followedUsers.has(userId)}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        <div className="w-full">
          {/* Stories row — recent friend purchases */}
          {!activeSearch && (
            <div className="px-4 md:px-6 lg:px-8">
              <StoriesRow users={storyUsers} onStoryClick={handleStoryClick} viewedUserIds={viewedStoryUsers} />
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
                prefetchSentinelIndex={prefetchSentinelIndex}
                prefetchSentinelRef={prefetchSentinelRef}
              />

            <div ref={loadSentinelRef} className="h-4" />
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onGummi={handleGummi}
      />

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

      {/* Story Viewer */}
      <AnimatePresence>
        {storyViewerOpen && (
          <StoryViewer
            users={storyUsers}
            initialUserIndex={storyInitialIndex}
            onClose={(viewedUserIndex?: number) => {
              setStoryViewerOpen(false);
              if (viewedUserIndex !== undefined) {
                setViewedStoryUsers((prev) => {
                  const next = new Set(prev);
                  for (let i = storyInitialIndex; i <= viewedUserIndex; i++) {
                    if (storyUsers[i]) next.add(storyUsers[i].id);
                  }
                  return next;
                });
              }
            }}
            onProductClick={handleProductClick}
          />
        )}
      </AnimatePresence>

      {/* My Profile */}
      <MyProfile
        isOpen={myProfileOpen}
        onClose={() => setMyProfileOpen(false)}
        onProductClick={(product) => {
          setMyProfileOpen(false);
          setTimeout(() => handleProductClick(product), 300);
        }}
        onUserClick={(user) => {
          setMyProfileOpen(false);
          setTimeout(() => setSelectedUser(user), 300);
        }}
        onGummi={handleGummi}
      />

      {/* Purchase confirmation toast */}
      <GummiToast visible={toastVisible} productTitle={toastProductTitle} />
    </main>
  );
}
