"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product, SortOption, Collection } from "@/types";
import Sidebar from "@/components/Sidebar";
import ProfileTabs from "@/components/MyProfile/ProfileTabs";
import ProfileGummisGrid from "@/components/MyProfile/ProfileGummisGrid";
import ProfileSavedGrid from "@/components/MyProfile/ProfileSavedGrid";
import ProfileCollections from "@/components/MyProfile/ProfileCollections";
import ProfileCollectionDetail from "@/components/MyProfile/ProfileCollectionDetail";
import ProfileWishlist from "@/components/MyProfile/ProfileWishlist";
import GummiToast from "@/components/GummiToast";

export default function LikesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"gummis" | "saved" | "collections" | "wishlist">("gummis");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [removedSavedIds, setRemovedSavedIds] = useState<Set<string>>(new Set());
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductTitle, setToastProductTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("for-you");

  const handleProductClick = useCallback((product: Product) => {
    router.push(`/product/${encodeURIComponent(product.id)}`);
  }, [router]);

  const handleGummi = useCallback((product: Product) => {
    setToastProductTitle(product.title);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  return (
    <main className="flex min-h-screen bg-(--bg-primary)">
      {/* Sidebar */}
      <Sidebar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={() => {}}
        categories={[]}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        onHomeClick={() => router.push("/")}
        onExploreClick={() => router.push("/explore")}
        onGamesClick={() => router.push("/games")}
        onMessagesClick={() => router.push("/messages")}
        onLikesClick={() => {}}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl text-(--text-primary) mb-2"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
            >
              Likes
            </h1>
            <p className="text-sm text-(--text-secondary)">Your liked products and collections</p>
          </div>

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="pb-12"
            >
              {activeTab === "gummis" && (
                <ProfileGummisGrid
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                  onProductClick={handleProductClick}
                />
              )}
              {activeTab === "saved" && (
                <ProfileSavedGrid
                  onProductClick={handleProductClick}
                  removedIds={removedSavedIds}
                  onRemove={(id) => setRemovedSavedIds((prev) => new Set(prev).add(id))}
                  onUndoAll={() => setRemovedSavedIds(new Set())}
                />
              )}
              {activeTab === "collections" && (
                <ProfileCollections
                  onCollectionClick={setSelectedCollection}
                />
              )}
              {activeTab === "wishlist" && (
                <ProfileWishlist onProductClick={handleProductClick} onGummi={handleGummi} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Collection detail modal */}
          <AnimatePresence>
            {selectedCollection && (
              <ProfileCollectionDetail
                collection={selectedCollection}
                onClose={() => setSelectedCollection(null)}
                onProductClick={handleProductClick}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast notification */}
      <GummiToast visible={toastVisible} productTitle={toastProductTitle} />
    </main>
  );
}
