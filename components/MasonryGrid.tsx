"use client";

import React from "react";
import { Product, MockUser } from "@/types";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

type MasonryGridProps = {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
  onFriendClick?: (user: MockUser) => void;
  onGummi?: (product: Product) => void;
  prefetchSentinelIndex?: number;
  prefetchSentinelRef?: (node: HTMLDivElement | null) => void;
  recommendationScores?: Map<string, number>;
};

export default function MasonryGrid({
  products,
  isLoading,
  onProductClick,
  onFriendClick,
  onGummi,
  prefetchSentinelIndex,
  prefetchSentinelRef,
  recommendationScores,
}: MasonryGridProps) {
  return (
    <div className="masonry">
      {products.map((product, index) => (
        <React.Fragment key={product.id}>
          <ProductCard
            product={product}
            index={index}
            onClick={onProductClick}
            onFriendClick={onFriendClick}
            onGummi={onGummi}
            matchScore={recommendationScores?.get(product.id)}
          />
          {index === prefetchSentinelIndex && prefetchSentinelRef && (
            <div ref={prefetchSentinelRef} className="h-0 w-0" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} index={i} />
        ))}
    </div>
  );
}
