"use client";

import { useMemo } from "react";
import { Product, SortOption } from "@/types";
import { getMyGumis } from "@/lib/current-user-data";
import ProfileSortFilter from "./ProfileSortFilter";
import ProfileProductGrid from "./ProfileProductGrid";

type ProfileGumisGridProps = {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  onProductClick: (product: Product) => void;
};

export default function ProfileGumisGrid({
  sortOption,
  onSortChange,
  onProductClick,
}: ProfileGumisGridProps) {
  const allGumis = useMemo(() => getMyGumis(), []);

  const sortedProducts = useMemo(() => {
    const products = [...allGumis];
    switch (sortOption) {
      case "recent":
        return products; // default order
      case "category":
        return products.sort((a, b) => a.brand.localeCompare(b.brand));
      case "price-low":
        return products.sort((a, b) => a.price.min - b.price.min);
      case "price-high":
        return products.sort((a, b) => b.price.min - a.price.min);
      default:
        return products;
    }
  }, [allGumis, sortOption]);

  return (
    <div>
      <ProfileSortFilter
        sortOption={sortOption}
        onSortChange={onSortChange}
        productCount={sortedProducts.length}
      />
      <ProfileProductGrid
        products={sortedProducts}
        variant="gumi"
        emptyMessage="No purchases yet. Start discovering!"
        onProductClick={onProductClick}
      />
    </div>
  );
}
