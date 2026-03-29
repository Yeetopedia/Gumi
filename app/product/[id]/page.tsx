"use client";

import { useState, useMemo, useCallback } from "react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, MockUser } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { getUserById } from "@/lib/mock-users";
import { formatPriceRange, formatCount, formatRating } from "@/lib/utils";
import { useInfiniteQueue } from "@/hooks/useInfiniteQueue";
import ImageGallery from "@/components/ImageGallery";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import UserProfile from "@/components/UserProfile";
import GummiToast from "@/components/GummiToast";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [isGummied, setIsGummied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  // Strip cycle suffix for product lookup
  const cleanId = decodeURIComponent(productId).replace(/__c\d+_\d+$/, "");

  const product = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === cleanId) ?? null,
    [cleanId]
  );

  // Related products pool (all products except current)
  const relatedPool = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.id !== cleanId),
    [cleanId]
  );

  const {
    displayedProducts: relatedProducts,
    isLoading: isLoadingRelated,
    prefetchSentinelIndex,
    prefetchSentinelRef,
    loadSentinelRef,
  } = useInfiniteQueue(relatedPool, {
    batchSize: 500,
    prefetchAt: 200,
    initialDisplayCount: 12,
    resetKey: productId,
  });

  const allImages = product
    ? product.images.length > 0
      ? product.images
      : [product.primaryImage]
    : [];

  const gummiFriends = product
    ? (product.gummiedByFriends || []).map((id) => getUserById(id)).filter(Boolean)
    : [];

  const handleGummi = useCallback(() => {
    if (!isGummied && product) {
      setIsGummied(true);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    } else {
      setIsGummied(false);
    }
  }, [isGummied, product]);

  const handleRelatedProductClick = useCallback(
    (p: Product) => {
      router.push(`/product/${encodeURIComponent(p.id)}`);
    },
    [router]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center">
        <p className="text-(--text-tertiary)">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-primary)">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-(--bg-primary)/80 backdrop-blur-lg border-b border-(--border)/50">
        <div className="flex items-center gap-4 px-4 md:px-6 lg:px-8 py-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full hover:bg-(--bg-secondary) flex items-center justify-center transition-colors"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/gummi-icon.png" alt="Gummi" width={24} height={41} className="drop-shadow-sm" />
            <span
              className="text-2xl tracking-tight text-(--text-primary)"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
            >
              Gummi
            </span>
          </div>
        </div>
      </div>

      {/* Main content: two-column layout */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Product detail (sticky on desktop) */}
          <div className="lg:w-[420px] xl:w-[480px] shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Image gallery */}
              <div className="mb-5">
                <ImageGallery images={allImages} />
              </div>

              {/* Brand */}
              <p className="text-[11px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-1">
                {product.brand}
              </p>

              {/* Title */}
              <h1
                className="text-2xl md:text-3xl text-(--text-primary) mb-3 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {product.title}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-semibold text-(--text-primary)">
                  {formatPriceRange(product.price.min, product.price.max)}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={i < Math.round(product.rating!.average) ? "#C45D3E" : "none"}
                          stroke={i < Math.round(product.rating!.average) ? "#C45D3E" : "var(--border)"}
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-(--text-tertiary)">
                      {formatRating(product.rating.average)} ({formatCount(product.rating.count)})
                    </span>
                  </div>
                )}
              </div>

              {/* Gummi count */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-(--border)">
                <div className="flex items-center gap-2 bg-(--accent)/5 rounded-full px-4 py-2">
                  <Image src="/gummi-icon.png" alt="Gummi" width={20} height={34} />
                  <span className="text-base font-semibold text-(--accent)">
                    {formatCount(product.gummis)}
                  </span>
                  <span className="text-sm text-(--accent)/70">people bought this</span>
                </div>
              </div>

              {/* Friends who bought */}
              {gummiFriends.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-(--text-tertiary) font-medium mb-2">
                    Friends who bought this
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {gummiFriends.map((friend) => (
                        <button
                          key={friend!.id}
                          onClick={() => setSelectedUser(friend!)}
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-(--card-bg) relative hover:scale-110 transition-transform hover:z-10"
                        >
                          <Image src={friend!.avatar} alt={friend!.name} fill className="object-cover" sizes="32px" />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-(--text-secondary)">
                      {gummiFriends.map((f) => f!.name.split(" ")[0]).join(", ")}
                    </span>
                  </div>
                </div>
              )}

              {/* Features */}
              {product.topFeatures.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-(--text-tertiary) font-medium mb-2">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.topFeatures.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-(--bg-secondary) rounded-full text-xs text-(--text-secondary)"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-sm leading-relaxed text-(--text-secondary) mb-6">
                  {product.description}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-8">
                <button
                  onClick={handleGummi}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border text-sm font-medium transition-all ${
                    isGummied
                      ? "bg-(--accent)/10 border-(--accent) text-(--accent)"
                      : "border-(--border) text-(--text-secondary) hover:border-(--accent) hover:text-(--accent)"
                  }`}
                >
                  <motion.div
                    animate={isGummied ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/gummi-icon.png"
                      alt="Gummi"
                      width={18}
                      height={31}
                      className={isGummied ? "" : "grayscale opacity-50"}
                    />
                  </motion.div>
                  {isGummied ? "Purchased!" : "I Bought This"}
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.title, url: product.buyUrl });
                    }
                  }}
                  className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border border-(--border) text-(--text-secondary) hover:border-(--text-tertiary) transition-colors"
                  aria-label="Share"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-11 h-11 shrink-0 flex items-center justify-center rounded-full border transition-all ${
                    isSaved
                      ? "bg-(--text-primary) border-(--text-primary)"
                      : "border-(--border) hover:border-(--text-tertiary)"
                  }`}
                  aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <motion.div
                    animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? "white" : "none"} stroke={isSaved ? "white" : "var(--text-secondary)"} strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </motion.div>
                </button>

                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-(--accent) hover:bg-(--accent-hover) text-white rounded-full text-sm font-semibold transition-colors"
                >
                  Shop Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Similar products masonry grid with infinite queue */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
              More like this
            </p>
            <div className="masonry" style={{ columns: 3 }}>
              {relatedProducts.map((relProduct, index) => (
                <React.Fragment key={relProduct.id}>
                  <ProductCard
                    product={relProduct}
                    index={index}
                    onClick={handleRelatedProductClick}
                  />
                  {index === prefetchSentinelIndex && (
                    <div ref={prefetchSentinelRef} className="h-0 w-0" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
              {isLoadingRelated &&
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} index={i} />
                ))}
            </div>
            <div ref={loadSentinelRef} className="h-4" />
          </div>
        </div>
      </div>

      {/* User Profile Panel */}
      <UserProfile
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onFollow={(userId) => setFollowedUsers((prev) => new Set([...prev, userId]))}
        onMessage={() => {
          setSelectedUser(null);
          router.push("/");
        }}
        isFollowing={(userId) => followedUsers.has(userId)}
      />

      {/* Gummi toast */}
      <GummiToast visible={toastVisible} productTitle={product.title} />
    </div>
  );
}
