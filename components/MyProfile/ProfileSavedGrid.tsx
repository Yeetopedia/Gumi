"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types";
import { getMySavedProducts } from "@/lib/current-user-data";
import ProfileProductGrid from "./ProfileProductGrid";

type ProfileSavedGridProps = {
  onProductClick: (product: Product) => void;
};

export default function ProfileSavedGrid({ onProductClick }: ProfileSavedGridProps) {
  const allSaved = useMemo(() => getMySavedProducts(), []);
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

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
            onClick={() => setRemovedIds(new Set())}
            className="text-xs text-[var(--accent)] font-medium hover:underline"
          >
            Undo all
          </button>
        )}
      </div>
      <ProfileProductGrid
        products={displayProducts}
        variant="saved"
        emptyMessage="Save products to find them later"
        onProductClick={onProductClick}
      />
    </div>
  );
}
