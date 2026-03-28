"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { HighlightCollection } from "@/lib/current-user-data";
import { formatPriceRange, formatCount } from "@/lib/utils";

type HighlightViewerProps = {
  highlights: HighlightCollection[];
  initialHighlightIndex: number;
  onClose: () => void;
  onProductClick?: (product: Product) => void;
};

const STORY_DURATION = 5000;
const TICK_INTERVAL = 50;

export default function HighlightViewer({
  highlights,
  initialHighlightIndex,
  onClose,
  onProductClick,
}: HighlightViewerProps) {
  const [highlightIndex, setHighlightIndex] = useState(initialHighlightIndex);
  const [productIndex, setProductIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(0);
  const isPaused = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const pointerTimer = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);

  const currentHighlight = highlights[highlightIndex];
  const products = currentHighlight?.products ?? [];
  const currentProduct = products[productIndex];

  // Lock body scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const goNext = useCallback(() => {
    if (productIndex < products.length - 1) {
      setDirection(1);
      setProductIndex((prev) => prev + 1);
      setProgress(0);
    } else if (highlightIndex < highlights.length - 1) {
      setDirection(1);
      setHighlightIndex((prev) => prev + 1);
      setProductIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [productIndex, products.length, highlightIndex, highlights.length, onClose]);

  const goPrev = useCallback(() => {
    if (productIndex > 0) {
      setDirection(-1);
      setProductIndex((prev) => prev - 1);
      setProgress(0);
    } else if (highlightIndex > 0) {
      setDirection(-1);
      const prevProducts = highlights[highlightIndex - 1]?.products ?? [];
      setHighlightIndex((prev) => prev - 1);
      setProductIndex(prevProducts.length - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  }, [productIndex, highlightIndex, highlights]);

  // Escape + arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Auto-advance timer
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      if (isPaused.current) return;
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / STORY_DURATION) * 100;
        if (next >= 100) {
          goNext();
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightIndex, productIndex]);

  // Pointer handlers for tap vs hold
  const handlePointerDown = () => {
    isHolding.current = false;
    pointerTimer.current = setTimeout(() => {
      isHolding.current = true;
      isPaused.current = true;
    }, 200);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerTimer.current) clearTimeout(pointerTimer.current);
    if (isHolding.current) {
      isPaused.current = false;
      isHolding.current = false;
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const threshold = rect.width * 0.3;
    if (x < threshold) {
      goPrev();
    } else {
      goNext();
    }
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dy > 100 && Math.abs(dx) < 50) {
      onClose();
    }
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProduct && onProductClick) {
      onClose();
      setTimeout(() => onProductClick(currentProduct), 100);
    }
  };

  if (!currentHighlight || !currentProduct) return null;

  const storyVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 bg-black z-[70] overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-30 px-2 pt-3">
        <div className="flex gap-1">
          {products.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/25 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{
                  width:
                    i < productIndex
                      ? "100%"
                      : i === productIndex
                        ? `${progress}%`
                        : "0%",
                }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Highlight info row */}
      <div className="absolute top-8 left-0 right-0 z-30 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/50 bg-[var(--bg-secondary)]">
            {currentHighlight.products[0] ? (
              <Image
                src={currentHighlight.products[0].primaryImage.url}
                alt={currentHighlight.label}
                fill
                className="object-cover"
                sizes="32px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm">{currentHighlight.emoji}</span>
              </div>
            )}
          </div>
          <span className="text-white text-sm font-medium drop-shadow-lg">
            {currentHighlight.label}
          </span>
          <span className="text-white/50 text-xs">
            {productIndex + 1}/{products.length}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Product image */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={`${highlightIndex}-${productIndex}`}
          custom={direction}
          variants={storyVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentProduct.primaryImage.url.replace("w=600", "w=1200")}
            alt={currentProduct.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom product info */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-5 pb-8">
        <div className="flex items-center gap-1.5 mb-3">
          <Image src="/gumi-icon.png" alt="" width={16} height={27} />
          <span className="text-white/70 text-xs">
            You bought this
          </span>
        </div>

        <p className="text-[10px] uppercase tracking-[0.15em] text-white/60 mb-1">
          {currentProduct.brand}
        </p>
        <h2
          className="text-white text-2xl mb-1 drop-shadow-lg"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
        >
          {currentProduct.title}
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-white text-lg font-semibold">
            {formatPriceRange(currentProduct.price.min, currentProduct.price.max)}
          </span>
          <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Image src="/gumi-icon.png" alt="" width={12} height={21} />
            <span className="text-white text-xs">{formatCount(currentProduct.gumis)} bought</span>
          </div>
        </div>

        <button
          onClick={handleViewProduct}
          className="w-full py-3 bg-white text-[var(--text-primary)] rounded-full text-sm font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
        >
          View Product
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
