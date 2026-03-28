"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Product, FeedMode, MockUser } from "@/types";
import { CATEGORIES, getProductPool, getSearchPool } from "@/lib/mock-data";
import { getStoryUsers } from "@/lib/mock-users";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQueue } from "@/hooks/useInfiniteQueue";
import Sidebar from "@/components/Sidebar";
import StoriesRow from "@/components/StoriesRow";
import CategoryPills from "@/components/CategoryPills";
import StoryViewer from "@/components/StoryViewer";
import MasonryGrid from "@/components/MasonryGrid";
import ReelsView from "@/components/ReelsView";
import ProductModal from "@/components/ProductModal";
import UserProfile from "@/components/UserProfile";
import GumiToast from "@/components/GumiToast";
import AlgorithmModal from "@/components/AlgorithmModal";
import MyProfile from "@/components/MyProfile/MyProfile";
import ChatBot from "@/components/ChatBot";
import GamesHub from "@/components/GamesHub";

export default function Home() {
  const router = useRouter();

  // UI state
  const [feedMode, setFeedMode] = useState<FeedMode>("gallery");
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  // Story viewer state
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [storyInitialIndex, setStoryInitialIndex] = useState(0);
  const [viewedStoryUsers, setViewedStoryUsers] = useState<Set<string>>(new Set());

  // Algorithm modal
  const [algorithmOpen, setAlgorithmOpen] = useState(false);

  // My Profile
  const [myProfileOpen, setMyProfileOpen] = useState(false);

  // App section
  const [appSection, setAppSection] = useState<"feed" | "games">("feed");

  // Gumi toast state
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

  // Handle Gumi action — show confirmation toast
  const handleGumi = useCallback((product: Product) => {
    setToastProductTitle(product.title);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

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
    if (feedMode === "gallery") {
      // Navigate to product detail page
      router.push(`/product/${encodeURIComponent(product.id)}`);
    } else {
      // Reels mode — use overlay modal
      setSelectedProduct(product);
    }
  }, [feedMode, router]);

  const handleFeedModeChange = (mode: FeedMode) => {
    setFeedMode(mode);
    if (mode === "gallery") {
      document.body.style.overflow = "";
    }
  };

  const handleUserClick = (user: MockUser) => {
    setSelectedUser(user);
  };

  return (
    <main className="flex min-h-screen bg-[var(--bg-primary)]">
      {/* Sidebar */}
      <Sidebar
        feedMode={feedMode}
        onFeedModeChange={handleFeedModeChange}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={handleSearchSubmit}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
        onAlgorithmClick={() => setAlgorithmOpen(true)}
        onProfileClick={() => setMyProfileOpen(true)}
        activeSection={appSection}
        onHomeClick={() => setAppSection("feed")}
        onGamesClick={() => setAppSection("games")}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {appSection === "games" ? (
          <GamesHub />
        ) : (
        <>
        {feedMode === "gallery" && (
          <div className="w-full">
            {/* Stories row — recent friend purchases */}
            {!activeSearch && (
              <div className="px-4 md:px-6 lg:px-8">
                <StoriesRow users={storyUsers} onStoryClick={handleStoryClick} viewedUserIds={viewedStoryUsers} />
              </div>
            )}

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
                <p className="text-sm text-[var(--text-secondary)]">
                  {displayedProducts.length > 0
                    ? `Results for "${activeSearch}"`
                    : isLoading
                      ? `Searching for "${activeSearch}"...`
                      : `No results for "${activeSearch}"`}
                </p>
                {displayedProducts.length === 0 && !isLoading && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs text-[var(--text-tertiary)]">Try:</span>
                    {["fashion", "home decor", "skincare", "kitchen", "art"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSearchValue(s);
                          setActiveSearch(s);
                        }}
                        className="px-3 py-1 bg-[var(--bg-secondary)] rounded-full text-xs text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
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
                onGumi={handleGumi}
                prefetchSentinelIndex={prefetchSentinelIndex}
                prefetchSentinelRef={prefetchSentinelRef}
              />

              <div ref={loadSentinelRef} className="h-4" />
            </div>
          </div>
        )}

        {feedMode === "reels" && displayedProducts.length > 0 && (
          <div className="w-full">
            <ReelsView
              products={displayedProducts}
              onLoadMore={manualAppend}
              hasMore={true}
              onProductClick={handleProductClick}
            />
          </div>
        )}
        </>
        )}
      </div>

      {/* Overlay modal only in reels mode */}
      {feedMode !== "gallery" && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onGumi={handleGumi}
          onFriendClick={handleFriendClick}
        />
      )}

      <UserProfile
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
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
        onGumi={handleGumi}
      />

      {/* Algorithm Modal */}
      <AlgorithmModal
        isOpen={algorithmOpen}
        onClose={() => setAlgorithmOpen(false)}
      />

      {/* Purchase confirmation toast */}
      <GumiToast visible={toastVisible} productTitle={toastProductTitle} />
    </main>
  );
}
