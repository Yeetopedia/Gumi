"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPriceRange } from "@/lib/utils";

type SearchChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendedProducts?: Product[];
};

type SearchChatProps = {
  searchQuery: string;
  currentProducts: Product[];
  onProductClick: (product: Product) => void;
};

export default function ChatBot({
  searchQuery,
  currentProducts,
  onProductClick,
}: SearchChatProps) {
  const [message, setMessage] = useState<SearchChatMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery || currentProducts.length === 0) return;

    setIsLoading(true);
    setMessage(null);

    const fetchRecommendation = async () => {
      try {
        const res = await fetch("/api/ai/search-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            searchQuery,
            availableProducts: currentProducts.slice(0, 10).map((p) => ({
              id: p.id,
              title: p.title,
              brand: p.brand,
              price: p.price,
              primaryImage: p.primaryImage,
            })),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setMessage({
            id: Date.now().toString(),
            role: "assistant",
            content: data.message,
            recommendedProducts: data.recommendedProducts || [],
          });
        }
      } catch {
        // Silent fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendation();
  }, [searchQuery, currentProducts]);

  if (!message && !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="border-b border-[var(--border)] bg-[var(--card-bg)]"
    >
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <p
            className="text-sm font-medium text-[var(--accent)] mb-2"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            AI Assistant
          </p>

          {isLoading ? (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" />
              <div
                className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          ) : (
            <p className="text-sm text-[var(--text-primary)] mb-4 line-clamp-2">
              {message?.content}
            </p>
          )}

          {/* Recommended products */}
          {message?.recommendedProducts && message.recommendedProducts.length > 0 && (
            <div className="space-y-2 mt-4">
              {message.recommendedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="w-full text-left group flex gap-3 p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--bg-secondary)]">
                    <img
                      src={product.primaryImage.url}
                      alt={product.primaryImage.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                      {product.title}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {product.brand}
                    </p>
                    <p className="text-sm font-semibold text-[var(--accent)]">
                      {formatPriceRange(product.price.min, product.price.max, product.price.currency)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
