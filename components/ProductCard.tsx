"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, MockUser } from "@/types";
import { formatPriceRange, formatCount } from "@/lib/utils";
import { getUserById } from "@/lib/mock-users";

type ProductCardProps = {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
  onFriendClick?: (user: MockUser) => void;
  matchScore?: number; // recommendation match % (65–98)
};

/**
 * Compute the visual treatment for recommended products.
 * Returns null for products below the display threshold.
 */
function getRecTreatment(score?: number) {
  if (!score || score < 75) return null;

  // t ∈ [0, 1] normalised across the visible range 75 → 98
  const t = Math.min(1, (score - 75) / 23);
  // ease-in curve so high scores feel dramatically stronger
  const t2 = t * t;

  return {
    borderWidth: 1 + t2 * 2,
    borderAlpha: 0.12 + t2 * 0.58,
    glowSize: Math.round(t2 * 28),
    glowAlpha: t2 * 0.2,
    textAlpha: 0.4 + t * 0.6,
    barPercent: score,
  };
}

export default function ProductCard({
  product,
  index,
  onClick,
  onFriendClick,
  matchScore,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: product.title, url: product.buyUrl });
    }
  };

  const gummiFriends = (product.gummiedByFriends || [])
    .map((id) => getUserById(id))
    .filter(Boolean)
    .slice(0, 3);

  const aspectRatio = product.aspectRatio || 1.2;

  // Recommendation visual treatment
  const rec = getRecTreatment(matchScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 15) * 0.03 }}
      className="masonry-item group cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Position context for card + recommendation border ring */}
      <div className="relative">
        {/* ── Main card ── */}
        <div className="relative rounded-xl overflow-hidden bg-(--card-bg) shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {/* Edge lighting — polished surface highlight on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 18%, transparent 38%)",
            }}
          />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: `1 / ${aspectRatio}` }}>
            {!imageError ? (
              <Image
                src={product.primaryImage.url}
                alt={product.primaryImage.alt}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1439px) 25vw, 20vw"
                className={`object-cover transition-all duration-300 group-hover:scale-[1.03] ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : null}

            {(!imageLoaded || imageError) && (
              <div className="absolute inset-0 bg-(--bg-secondary)" />
            )}

            {/* ── Floating elements over image ── */}

            {/* Friends who bought — bottom-right of image */}
            {gummiFriends.length > 0 && (
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {gummiFriends.map((friend) => (
                    <button
                      key={friend!.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFriendClick?.(friend!);
                      }}
                      className="w-6 h-6 rounded-full overflow-hidden border-[1.5px] border-white/70 relative hover:scale-110 transition-transform hover:z-10"
                    >
                      <Image
                        src={friend!.avatar}
                        alt={friend!.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-white/80 font-medium drop-shadow-sm">
                  bought this
                </span>
              </div>
            )}

            {/* Share button — hover reveal */}
            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95"
                aria-label="Share"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>

            {/* Gummi count badge — bottom-left */}
            <div className="absolute bottom-3 left-3 z-10">
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full pl-1.5 pr-2.5 py-1">
                <Image src="/gummi-icon.png" alt="Gummi" width={15} height={26} />
                <span className="text-white text-xs font-medium">{formatCount(product.gummis)}</span>
                <span className="text-white/60 text-[10px]">bought</span>
              </div>
            </div>
          </div>

          {/* ── Card info ── */}
          <div className="p-3">
            <h3
              className="text-sm leading-snug text-(--text-primary) line-clamp-2 mb-1"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
            >
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-(--text-primary)">
                {formatPriceRange(product.price.min, product.price.max, product.price.currency)}
              </p>
              {product.rating && (
                <div className="flex items-center gap-1 text-[11px] text-(--text-tertiary)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#C45D3E" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {product.rating.average}
                </div>
              )}
            </div>

            {/* ── Match strength indicator ── */}
            {rec && matchScore && (
              <div className="flex items-center gap-2 mt-1.5">
                {/* Thin gradient bar */}
                <div className="flex-1 h-[3px] rounded-full bg-(--border) overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.barPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: (index % 15) * 0.03 + 0.3 }}
                    style={{
                      background: `linear-gradient(90deg, rgba(196, 133, 90, ${rec.textAlpha}), rgba(212, 150, 106, ${rec.textAlpha}))`,
                    }}
                  />
                </div>
                {/* Score label */}
                <span
                  className="text-[10px] font-semibold tabular-nums shrink-0"
                  style={{ color: `rgba(180, 110, 70, ${rec.textAlpha})` }}
                >
                  {matchScore}% match
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Recommendation border ring ── */}
        {rec && (
          <div
            className="absolute rounded-xl pointer-events-none"
            style={{
              inset: `-${rec.borderWidth}px`,
              border: `${rec.borderWidth}px solid rgba(196, 130, 90, ${rec.borderAlpha})`,
              boxShadow:
                rec.glowSize > 0
                  ? `0 0 ${rec.glowSize}px rgba(196, 130, 90, ${rec.glowAlpha})`
                  : "none",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
