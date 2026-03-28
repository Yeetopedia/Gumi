"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Collection } from "@/types";
import { getMyCollections, getCollectionProducts } from "@/lib/current-user-data";

type ProfileCollectionsProps = {
  onCollectionClick: (collection: Collection) => void;
};

export default function ProfileCollections({ onCollectionClick }: ProfileCollectionsProps) {
  const collections = useMemo(() => getMyCollections(), []);

  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Create new collection card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="aspect-[4/3] rounded-2xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-2 hover:border-[var(--text-tertiary)] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span className="text-xs text-[var(--text-tertiary)] font-medium">New Collection</span>
        </motion.button>

        {/* Collection cards */}
        {collections.map((collection, index) => {
          const products = getCollectionProducts(collection.id);
          const coverProduct = products[0];

          return (
            <motion.button
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index + 1) * 0.05 }}
              onClick={() => onCollectionClick(collection)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-secondary)] group cursor-pointer"
            >
              {coverProduct && (
                <Image
                  src={coverProduct.primaryImage.url}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* Collection info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3
                  className="text-white text-sm font-semibold mb-0.5"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {collection.name}
                </h3>
                <span className="text-white/70 text-[10px]">
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
