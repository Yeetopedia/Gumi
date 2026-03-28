"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Product, FeedMode, FeedResponse, MockUser } from "@/types";
import { CATEGORIES } from "@/lib/mock-data";
import { getStoryUsers } from "@/lib/mock-users";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Sidebar from "@/components/Sidebar";
import StoriesRow from "@/components/StoriesRow";
import StoryViewer from "@/components/StoryViewer";
import MasonryGrid from "@/components/MasonryGrid";
import ReelsView from "@/components/ReelsView";
import ProductModal from "@/components/ProductModal";
import UserProfile from "@/components/UserProfile";
import GumiToast from "@/components/GumiToast";
import AlgorithmModal from "@/components/AlgorithmModal";
import MyProfile from "@/components/MyProfile/MyProfile";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const router = useRouter();
  // Feed state
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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

  // Gumi toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductTitle, setToastProductTitle] = useState("");

  const debouncedSearch = useDebounce(searchValue, 300);
  const isLoadingRef = useRef(false);
  const storyUsers = getStoryUsers();

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

  // Fetch products
  const fetchProducts = useCallback(
    async (reset: boolean = false) => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      setIsLoading(true);

      try {
        const currentCursor = reset ? null : cursor;
        let url: string;

        if (activeSearch) {
          url = `/api/search?q=${encodeURIComponent(activeSearch)}&limit=15${
            currentCursor ? `&cursor=${currentCursor}` : ""
          }`;
        } else {
          url = `/api/feed?category=${activeCategory}&limit=15${
            currentCursor ? `&cursor=${currentCursor}` : ""
          }`;
        }

        const res = await fetch(url);
        const data: FeedResponse = await res.json();

        if (reset) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }
        setCursor(data.nextCursor);
        setHasMore(data.hasMore);
      } catch {
        setHasMore(false);
      } finally {
        setIsLoading(false);
        setInitialLoading(false);
        isLoadingRef.current = false;
      }
    },
    [cursor, activeCategory, activeSearch]
  );

  useEffect(() => {
    setProducts([]);
    setCursor(null);
    setHasMore(true);
    setInitialLoading(true);
    isLoadingRef.current = false;

    const timeout = setTimeout(() => {
      fetchProductsFresh();
    }, 0);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeSearch]);

  const fetchProductsFresh = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      let url: string;
      if (activeSearch) {
        url = `/api/search?q=${encodeURIComponent(activeSearch)}&limit=15`;
      } else {
        url = `/api/feed?category=${activeCategory}&limit=15`;
      }

      const res = await fetch(url);
      const data: FeedResponse = await res.json();

      setProducts(data.products);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    if (debouncedSearch !== activeSearch) {
      setActiveSearch(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingRef.current && hasMore) {
      fetchProducts(false);
    }
  }, [fetchProducts, hasMore]);

  const sentinelRef = useInfiniteScroll(handleLoadMore, {
    enabled: hasMore && !isLoading && feedMode === "gallery",
  });

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
      />

      {/* Main content area */}
      <div className="flex-1 w-full">
        {feedMode === "gallery" && (
          <div className="w-full">
            {/* ChatBot — only shows during search */}
            {activeSearch && (
              <ChatBot
                searchQuery={activeSearch}
                currentProducts={products}
                onProductClick={handleProductClick}
              />
            )}

            {/* Stories row — recent friend purchases */}
            {!activeSearch && (
              <div className="pt-4">
                <StoriesRow users={storyUsers} onStoryClick={handleStoryClick} viewedUserIds={viewedStoryUsers} />
              </div>
            )}

            {/* Search results header */}
            {activeSearch && (
              <div className="px-4 md:px-6 lg:px-8 py-4 b border-border-[var(--border)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  {products.length > 0
                    ? `Results for "${activeSearch}"`
                    : initialLoading
                      ? `Searching for "${activeSearch}"...`
                      : `No results for "${activeSearch}"`}
                </p>
                {products.length === 0 && !initialLoading && (
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

            {/* Masonry grid */}
            <div className="px-4 md:px-6 lg:px-8 py-6">
              <MasonryGrid
                products={products}
                isLoading={isLoading || initialLoading}
                onProductClick={handleProductClick}
                onFriendClick={handleFriendClick}
                onGumi={handleGumi}
              />

              {hasMore && <div ref={sentinelRef} className="h-4" />}
            </div>
          </div>
        )}

        {feedMode === "reels" && products.length > 0 && (
          <div className="w-full">
            <ReelsView
              products={products}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              onProductClick={handleProductClick}
            />
            <button
              onClick={() => handleFeedModeChange("gallery")}
              className="fixed top-6 left-4 z-50 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              aria-label="Back to gallery"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="fixed top-6 right-4 z-50 flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => handleFeedModeChange("gallery")}
                className="p-2 rounded-full hover:bg-white/10 transition-all"
                aria-label="Gallery view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-white/20" aria-label="Reels view (active)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </button>
            </div>
          </div>
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
