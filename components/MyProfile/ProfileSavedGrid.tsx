"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { getMySavedProducts } from "@/lib/current-user-data";

type ProfileSavedGridProps = {
  onProductClick: (product: Product) => void;
  removedIds: Set<string>;
  onRemove: (id: string) => void;
  onUndoAll: () => void;
};

export default function ProfileSavedGrid({
  onProductClick,
  removedIds,
  onRemove,
  onUndoAll,
}: ProfileSavedGridProps) {
  const allSaved = useMemo(() => getMySavedProducts(), []);

  const displayProducts = useMemo(
    () => allSaved.filter((p) => !removedIds.has(p.id)),
    [allSaved, removedIds]
  );

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-[var(--text-tertiary)] font-medium">
          {displayProducts.length} saved
        </span>
        {removedIds.size > 0 && (
          <button
            onClick={onUndoAll}
            className="text-xs text-[var(--accent)] font-medium hover:underline"
          >
            Undo all
          </button>
        )}
      </div>

      {displayProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] text-center">
            {removedIds.size > 0 ? "All items removed" : "Save products to find them later"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[3px] md:gap-1">
          <AnimatePresence>
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-secondary)] group cursor-pointer"
              >
                <button
                  onClick={() => onProductClick(product)}
                  className="w-full h-full"
                >
                  <Image
                    src={product.primaryImage.url}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 33vw, 200px"
                  />
                </button>

                {/* Saved bookmark badge */}
                <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                {/* Remove button — visible on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(product.id);
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  aria-label="Remove from saved"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
