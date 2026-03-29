"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Product } from "@/types";
import {
  recommendationEngine,
  InteractionType,
} from "@/lib/recommendation-engine";
import {
  getMyGummis,
  getMySavedProducts,
  getMyWishlist,
} from "@/lib/current-user-data";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

/**
 * React hook that initialises the recommendation engine, seeds it
 * with the current user's behaviour, and returns live scores for a
 * set of displayed products.
 *
 * Returns:
 *   scores            — Map<productId, matchPercent ∈ [65, 98]>
 *   recordInteraction — call when the user clicks / saves / etc.
 */
export function useRecommendations(displayedProducts: Product[]) {
  const [scores, setScores] = useState<Map<string, number>>(new Map());
  const initRef = useRef(false);

  // ── Initialise once with the full catalogue ──
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Index every product in the catalogue
    recommendationEngine.initialize(MOCK_PRODUCTS);

    // Seed with the current user's known history
    recommendationEngine.seedUserBehavior({
      gummied: getMyGummis().map((p) => p.id),
      saved: getMySavedProducts().map((p) => p.id),
      wishlisted: getMyWishlist().map((p) => p.id),
    });
  }, []);

  // ── Recompute scores when displayed products change ──
  useEffect(() => {
    if (!initRef.current || displayedProducts.length === 0) return;
    const ids = displayedProducts.map((p) => p.id);
    setScores(recommendationEngine.score(ids));
  }, [displayedProducts]);

  // ── Interaction recorder (recomputes scores inline) ──
  const recordInteraction = useCallback(
    (productId: string, type: InteractionType) => {
      recommendationEngine.recordInteraction(productId, type);

      if (displayedProducts.length > 0) {
        const ids = displayedProducts.map((p) => p.id);
        setScores(recommendationEngine.score(ids));
      }
    },
    [displayedProducts],
  );

  return { scores, recordInteraction };
}
