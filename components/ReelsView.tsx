"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { formatPriceRange, formatCount } from "@/lib/utils";
import { getUserById } from "@/lib/mock-users";

type ReelsViewProps = {
  products: Product[];
  onLoadMore: () => void;
  hasMore: boolean;
  onProductClick: (product: Product) => void;
  onClose?: () => void;
};

export default function ReelsView({ products, onLoadMore, hasMore, onProductClick, onClose }: ReelsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gummied, setGummied] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(0);
  const [showKeyHint, setShowKeyHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const isTransitioning = useRef(false);

  const product = products[currentIndex];

  const goTo = useCallback(
    (newIndex: number) => {
      if (isTransitioning.current) return;
      if (newIndex < 0 || newIndex >= products.length) return;
      isTransitioning.current = true;
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentIndex(newIndex);
      if (newIndex >= products.length - 3 && hasMore) {
        onLoadMore();
      }
      setTimeout(() => {
        isTransitioning.current = false;
      }, 400);
    },
    [currentIndex, products.length, hasMore, onLoadMore]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose?.(); return; }
      if (e.key === "ArrowDown" || e.key === "j") goTo(currentIndex + 1);
      if (e.key === "ArrowUp" || e.key === "k") goTo(currentIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, goTo, onClose]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastScroll = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScroll < 600) return;
      lastScroll = now;
      if (e.deltaY > 30) goTo(currentIndex + 1);
      if (e.deltaY < -30) goTo(currentIndex - 1);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [currentIndex, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
  };

  const toggleGummi = () => {
    setGummied((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  };

  const toggleBookmark = () => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  };

  // No double-tap to Gummi — Gummi is a purchase action, not a casual gesture

  if (!product) return null;

  const isGummied = gummied.has(product.id);
  const isBookmarked = bookmarked.has(product.id);

  const gummiFriends = (product.gummiedByFriends || [])
    .map((id) => getUserById(id))
    .filter(Boolean)
    .slice(0, 3);

  const variants = {
    enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-10 overflow-hidden flex items-center justify-center"
      style={{ top: 0 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close / back to gallery button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 left-4 lg:left-[272px] z-30 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
          aria-label="Back to gallery"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      <div className="relative w-full h-full max-w-md">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={product.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={product.primaryImage.url.replace("w=600", "w=1200")}
                alt={product.primaryImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 28rem"
              />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/30" />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-14 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                  {product.brand.charAt(0)}
                </div>
                <span className="text-white text-sm font-medium drop-shadow-lg">
                  {product.brand}
                </span>
              </div>
              <div className="flex gap-1">
                {products.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((p) => (
                  <div
                    key={p.id}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      p.id === product.id ? "bg-white w-4" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right action bar */}
            <div className="absolute right-4 bottom-44 flex flex-col items-center gap-6 z-20">
              {/* Gummi = "I bought this" */}
              <button onClick={toggleGummi} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={isGummied ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                >
                  <Image
                    src="/gummi-icon.png"
                    alt="Gummi"
                    width={28}
                    height={48}
                    className={`transition-all ${isGummied ? "drop-shadow-[0_0_8px_rgba(196,93,62,0.6)" : "grayscale opacity-70"}`}
                  />
                </motion.div>
                <span className="text-white text-xs font-medium">
                  {isGummied ? "Bought" : formatCount(product.gummis)}
                </span>
              </button>

              {/* Comment */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">
                  {formatCount(Math.floor(product.gummis * 0.12))}
                </span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">
                  {formatCount(product.shares)}
                </span>
              </button>

              {/* Wishlist */}
              <button onClick={toggleBookmark} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={isBookmarked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={isBookmarked ? "white" : "none"} stroke="white" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </motion.div>
                <span className="text-white text-[10px]">{isBookmarked ? "Saved" : "Wishlist"}</span>
              </button>
            </div>

            {/* Bottom info panel */}
            <div className="absolute bottom-0 left-0 right-0 p-5 pb-8 z-20">
              <h2
                className="text-white text-2xl mb-1 drop-shadow-lg"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {product.title}
              </h2>
              <p className="text-white/80 text-sm mb-3 line-clamp-2">
                {product.description || product.topFeatures.join(" · ")}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-white text-lg font-semibold">
                  {formatPriceRange(product.price.min, product.price.max)}
                </span>
                {product.rating && (
                  <span className="flex items-center gap-1 text-white/70 text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C45D3E" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {product.rating.average} ({formatCount(product.rating.count)})
                  </span>
                )}
              </div>

              {/* Friends who Gummied — avatars */}
              {gummiFriends.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex -space-x-1.5">
                    {gummiFriends.map((friend) => (
                      <div key={friend!.id} className="w-5 h-5 rounded-full overflow-hidden border-2 border-black/30 relative">
                        <Image src={friend!.avatar} alt={friend!.name} fill className="object-cover" sizes="20px" />
                      </div>
                    ))}
                  </div>
                  <span className="text-white/50 text-xs">
                    {gummiFriends[0]!.name.split(" ")[0]}
                    {gummiFriends.length > 1 && ` +${gummiFriends.length - 1}`} bought this
                  </span>
                </div>
              )}

              {/* View Product button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onProductClick(product);
                }}
                className="mt-4 w-full py-3 bg-white text-(--text-primary) rounded-full text-sm font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                View Product
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>

      {/* Scroll hint */}
      {currentIndex === 0 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
        >
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
          <span className="text-white/60 text-xs">Scroll for more</span>
        </motion.div>
      )}

      {/* Keyboard shortcut hint */}
      <AnimatePresence>
        {showKeyHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            onAnimationComplete={() => {
              setTimeout(() => setShowKeyHint(false), 3000);
            }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none"
          >
            <span className="text-white/80 text-xs font-medium">↑↓ or j/k to navigate</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
