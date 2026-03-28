"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, MockUser } from "@/types";
import { MOCK_PRODUCTS, getRelatedProducts } from "@/lib/mock-data";
import { getUserById } from "@/lib/mock-users";
import { formatPriceRange, formatCount, formatRating } from "@/lib/utils";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ImageGallery from "@/components/ImageGallery";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import UserProfile from "@/components/UserProfile";
import GumiToast from "@/components/GumiToast";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [isGumied, setIsGumied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef(false);

  // Find the product
  const product = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === decodeURIComponent(productId)) ?? null,
    [productId]
  );

  // Base pool of related products (deterministic order)
  const baseRelated = useMemo(
    () => (product ? getRelatedProducts(product.id, MOCK_PRODUCTS, 47) : []),
    [product]
  );

  // Infinite list — grows by recycling products with unique IDs
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const batchRef = useRef(0);

  // Initialize on product change
  useMemo(() => {
    if (baseRelated.length > 0) {
      setRelatedProducts(baseRelated.slice(0, 12));
      batchRef.current = 1;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleLoadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoadingMore(true);
    setTimeout(() => {
      const batch = batchRef.current;
      const start = (batch * 12) % baseRelated.length;
      const newItems = Array.from({ length: 12 }, (_, i) => {
        const source = baseRelated[(start + i) % baseRelated.length];
        return { ...source, id: `${source.id}-r${batch}-${i}` };
      });
      setRelatedProducts((prev) => [...prev, ...newItems]);
      batchRef.current = batch + 1;
      setIsLoadingMore(false);
      loadingRef.current = false;
    }, 400);
  }, [baseRelated]);

  const sentinelRef = useInfiniteScroll(handleLoadMore, {
    enabled: !isLoadingMore,
  });

  const allImages = product
    ? product.images.length > 0
      ? product.images
      : [product.primaryImage]
    : [];

  const gumiFriends = product
    ? (product.gumiedByFriends || []).map((id) => getUserById(id)).filter(Boolean)
    : [];

  const handleGumi = useCallback(() => {
    if (!isGumied && product) {
      setIsGumied(true);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    } else {
      setIsGumied(false);
    }
  }, [isGumied, product]);

  const handleRelatedProductClick = useCallback(
    (p: Product) => {
      router.push(`/product/${encodeURIComponent(p.id)}`);
    },
    [router]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <p className="text-[var(--text-tertiary)]">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-[var(--border)]/50">
        <div className="flex items-center gap-4 px-4 md:px-6 lg:px-8 py-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full hover:bg-[var(--bg-secondary)] flex items-center justify-center transition-colors"
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
            <Image src="/gumi-icon.png" alt="Gumi" width={24} height={41} className="drop-shadow-sm" />
            <span
              className="text-2xl tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
            >
              Gumi
            </span>
          </div>
        </div>
      </div>

      {/* Main content: two-column layout */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Product detail (sticky on desktop) */}
          <div className="lg:w-[420px] xl:w-[480px] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Image gallery */}
              <div className="mb-5">
                <ImageGallery images={allImages} />
              </div>

              {/* Brand */}
              <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium mb-1">
                {product.brand}
              </p>

              {/* Title */}
              <h1
                className="text-2xl md:text-3xl text-[var(--text-primary)] mb-3 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {product.title}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-semibold text-[var(--text-primary)]">
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
                    <span className="text-sm text-[var(--text-tertiary)]">
                      {formatRating(product.rating.average)} ({formatCount(product.rating.count)})
                    </span>
                  </div>
                )}
              </div>

              {/* Gumi count */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 bg-[var(--accent)]/5 rounded-full px-4 py-2">
                  <Image src="/gumi-icon.png" alt="Gumi" width={20} height={34} />
                  <span className="text-base font-semibold text-[var(--accent)]">
                    {formatCount(product.gumis)}
                  </span>
                  <span className="text-sm text-[var(--accent)]/70">people bought this</span>
                </div>
              </div>

              {/* Friends who bought */}
              {gumiFriends.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-2">
                    Friends who bought this
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {gumiFriends.map((friend) => (
                        <button
                          key={friend!.id}
                          onClick={() => setSelectedUser(friend!)}
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--card-bg)] relative hover:scale-110 transition-transform hover:z-10"
                        >
                          <Image src={friend!.avatar} alt={friend!.name} fill className="object-cover" sizes="32px" />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {gumiFriends.map((f) => f!.name.split(" ")[0]).join(", ")}
                    </span>
                  </div>
                </div>
              )}

              {/* Features */}
              {product.topFeatures.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-2">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.topFeatures.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-[var(--bg-secondary)] rounded-full text-xs text-[var(--text-secondary)]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-6">
                  {product.description}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-8">
                <button
                  onClick={handleGumi}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border text-sm font-medium transition-all ${
                    isGumied
                      ? "bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  <motion.div
                    animate={isGumied ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/gumi-icon.png"
                      alt="Gumi"
                      width={18}
                      height={31}
                      className={isGumied ? "" : "grayscale opacity-50"}
                    />
                  </motion.div>
                  {isGumied ? "Purchased!" : "I Bought This"}
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.title, url: product.buyUrl });
                    }
                  }}
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] transition-colors"
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
                  className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full border transition-all ${
                    isSaved
                      ? "bg-[var(--text-primary)] border-[var(--text-primary)]"
                      : "border-[var(--border)] hover:border-[var(--text-tertiary)]"
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full text-sm font-semibold transition-colors"
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

          {/* Right column: Similar products masonry grid */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium mb-4">
              More like this
            </p>
            <div className="masonry" style={{ columns: 3 }}>
              {relatedProducts.map((relProduct, index) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  index={index}
                  onClick={handleRelatedProductClick}
                />
              ))}
              {isLoadingMore &&
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} index={i} />
                ))}
            </div>
            <div ref={sentinelRef} className="h-4" />
          </div>
        </div>
      </div>

      {/* User Profile Panel */}
      <UserProfile user={selectedUser} onClose={() => setSelectedUser(null)} />

      {/* Gumi toast */}
      <GumiToast visible={toastVisible} productTitle={product.title} />
    </div>
  );
}
