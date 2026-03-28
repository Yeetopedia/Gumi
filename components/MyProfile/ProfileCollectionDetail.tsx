"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Collection, Product } from "@/types";
import { getCollectionProducts } from "@/lib/current-user-data";
import ProfileProductGrid from "./ProfileProductGrid";

type ProfileCollectionDetailProps = {
  collection: Collection;
  onClose: () => void;
  onProductClick: (product: Product) => void;
};

export default function ProfileCollectionDetail({
  collection,
  onClose,
  onProductClick,
}: ProfileCollectionDetailProps) {
  const products = useMemo(
    () => getCollectionProducts(collection.id),
    [collection.id]
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[55] bg-[var(--bg-primary)] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)]/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h2
              className="text-lg text-[var(--text-primary)] truncate"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
            >
              {collection.name}
            </h2>
            <p className="text-xs text-[var(--text-tertiary)]">
              {products.length} {products.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {collection.description && (
        <div className="px-4 py-3">
          <p className="text-sm text-[var(--text-secondary)]">{collection.description}</p>
        </div>
      )}

      {/* Product grid */}
      <div className="max-w-2xl mx-auto">
        <ProfileProductGrid
          products={products}
          variant="gumi"
          emptyMessage="This collection is empty"
          onProductClick={onProductClick}
        />
      </div>
    </motion.div>
  );
}
