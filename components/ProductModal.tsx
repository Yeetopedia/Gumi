"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product, MockUser } from "@/types";
import { formatPriceRange, formatCount, formatRating } from "@/lib/utils";
import { getUserById } from "@/lib/mock-users";
import ImageGallery from "./ImageGallery";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onGummi?: (product: Product) => void;
  onFriendClick?: (user: MockUser) => void;
};

export default function ProductModal({ product, onClose, onGummi, onFriendClick }: ProductModalProps) {
  const [isGummied, setIsGummied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (product) {
      setIsGummied(product.isGummied ?? false);
      setIsSaved(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (product) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    };
  }, [product]);

  const handleGummi = useCallback(() => {
    if (!isGummied && product) {
      setIsGummied(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1200);
      onGummi?.(product);
    } else {
      setIsGummied(false);
    }
  }, [isGummied, product, onGummi]);

  const allImages =
    product && product.images.length > 0
      ? product.images
      : product
        ? [product.primaryImage]
        : [];

  const gummiFriends = product
    ? (product.gummiedByFriends || []).map((id) => getUserById(id)).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm md:max-w-md lg:max-w-2xl bg-(--card-bg) z-50 overflow-hidden flex flex-col shadow-2xl lg:rounded-l-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-(--bg-secondary) flex items-center justify-center hover:bg-(--border) transition-colors z-20 lg:top-6 lg:right-6"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image gallery */}
            <div className="h-56 md:h-64 shrink-0 p-4 md:p-6 flex items-center bg-(--bg-secondary)">
              <ImageGallery images={allImages} />
            </div>

            {/* Product details */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-2">
                {product.brand}
              </p>

              <h2
                className="text-2xl md:text-3xl text-(--text-primary) mb-3 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {product.title}
              </h2>

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

              {/* Gummi count — purchase social proof */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-(--border)">
                <div className="flex items-center gap-2 bg-(--accent)/5 rounded-full px-4 py-2">
                  <Image src="/gummi-icon.png" alt="Gummi" width={22} height={38} />
                  <span className="text-base font-semibold text-(--accent)">
                    {formatCount(product.gummis)}
                  </span>
                  <span className="text-sm text-(--accent)/70">people bought this</span>
                </div>
              </div>

              {/* Friends who bought this — clickable */}
              {gummiFriends.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-[0.1em] text-(--text-tertiary) font-medium mb-3">
                    Friends who bought this
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {gummiFriends.map((friend) => (
                        <button
                          key={friend!.id}
                          onClick={() => onFriendClick?.(friend!)}
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-(--card-bg) relative hover:scale-110 transition-transform hover:z-10"
                        >
                          <Image
                            src={friend!.avatar}
                            alt={friend!.name}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-(--text-secondary)">
                      {gummiFriends.map((f) => f!.name.split(" ")[0]).join(", ")}
                    </span>
                  </div>
                </div>
              )}

              {/* Key Features */}
              {product.topFeatures.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-[0.1em] text-(--text-tertiary) font-medium mb-3">
                    Key Features
                  </h3>
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

              {product.description && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.1em] text-(--text-tertiary) font-medium mb-3">
                    About
                  </h3>
                  <p className="text-sm leading-relaxed text-(--text-secondary)">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="flex-1" />

              {/* Action buttons */}
              <div className="flex items-center gap-2 sticky bottom-0 pt-4 bg-(--card-bg)">
                {/* Gummi = "I Bought This" — with confetti burst */}
                <div className="relative">
                  <AnimatePresence>
                    {confetti && Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i / 12) * 360;
                      const rad = (angle * Math.PI) / 180;
                      const dist = 50 + Math.random() * 30;
                      const colors = ["#C45D3E", "#F9CA24", "#6C5CE7", "#00B894", "#FD79A8", "#0984E3"];
                      return (
                        <motion.div
                          key={i}
                          className="absolute rounded-full pointer-events-none z-20"
                          style={{
                            width: 5 + Math.random() * 5,
                            height: 5 + Math.random() * 5,
                            backgroundColor: colors[i % colors.length],
                            top: "50%", left: "50%",
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, opacity: 0, scale: 0.2 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      );
                    })}
                  </AnimatePresence>
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
                </div>

                {/* Share */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.title,
                        text: `Check out ${product.title} by ${product.brand} on Gummi`,
                        url: product.buyUrl,
                      });
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

                {/* Wishlist/Save */}
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

                {/* Shop Now */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
