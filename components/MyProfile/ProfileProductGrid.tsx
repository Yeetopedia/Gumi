"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatCount } from "@/lib/utils";

type ProfileProductGridProps = {
  products: Product[];
  variant: "gumi" | "saved" | "wishlist";
  emptyMessage: string;
  onProductClick: (product: Product) => void;
};

export default function ProfileProductGrid({
  products,
  variant,
  emptyMessage,
  onProductClick,
}: ProfileProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
          {variant === "gumi" && (
            <Image src="/gumi-icon.png" alt="" width={20} height={35} className="opacity-30" />
          )}
          {variant === "saved" && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          )}
          {variant === "wishlist" && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </div>
        <p className="text-sm text-[var(--text-tertiary)] text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[3px] md:gap-1">
      {products.map((product, index) => (
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

          {/* Variant-specific badge */}
          {variant === "gumi" && (
            <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5">
              <Image src="/gumi-icon.png" alt="" width={10} height={17} />
              <span className="text-white text-[9px] font-medium">
                {formatCount(product.gumis)}
              </span>
            </div>
          )}

          {variant === "saved" && (
            <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          )}

          {variant === "wishlist" && (
            <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </motion.button>
      ))}
    </div>
  );
}
