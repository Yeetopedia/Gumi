"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { getMyWishlist } from "@/lib/current-user-data";
import { formatCount } from "@/lib/utils";

type ProfileWishlistProps = {
  onProductClick: (product: Product) => void;
};

// Deterministic "price change" indicator based on product ID
function getPriceIndicator(productId: string): "dropped" | "none" {
  const hash = productId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return hash % 3 === 0 ? "dropped" : "none";
}

export default function ProfileWishlist({ onProductClick }: ProfileWishlistProps) {
  const wishlist = useMemo(() => getMyWishlist(), []);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <p className="text-sm text-[var(--text-tertiary)] text-center">
          Add items to your wishlist to track them
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 py-3">
        <span className="text-xs text-[var(--text-tertiary)] font-medium">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[3px] md:gap-1">
        {wishlist.map((product, index) => {
          const indicator = getPriceIndicator(product.id);
          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.03 }}
              onClick={() => onProductClick(product)}
              className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-secondary)] group cursor-pointer"
            >
              <Image
                src={product.primaryImage.url}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 33vw, 200px"
              />

              {/* Price indicator pill */}
              {indicator === "dropped" && (
                <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-emerald-600/80 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="7 13 12 18 17 13" />
                    <line x1="12" y1="6" x2="12" y2="18" />
                  </svg>
                  <span className="text-white text-[8px] font-bold">Price drop</span>
                </div>
              )}

              {/* Wishlist heart */}
              <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>

              {/* Bottom gumi badge */}
              <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                <Image src="/gumi-icon.png" alt="" width={10} height={17} />
                <span className="text-white text-[9px] font-medium">
                  {formatCount(product.gumis)}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
