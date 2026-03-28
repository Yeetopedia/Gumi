"use client";

import Image from "next/image";
import { getUserHighlights, HighlightCollection } from "@/lib/current-user-data";

type ProfileHighlightsProps = {
  userId: string;
  onHighlightClick: (highlight: HighlightCollection, index: number) => void;
};

export default function ProfileHighlights({ userId, onHighlightClick }: ProfileHighlightsProps) {
  const highlights = getUserHighlights(userId);

  if (highlights.length === 0) return null;

  return (
    <div className="px-6 py-4 border-t border-[var(--border)]/50">
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {highlights.map((highlight, index) => (
          <button
            key={highlight.id}
            onClick={() => onHighlightClick(highlight, index)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
          >
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] group-hover:scale-105 transition-transform">
              {/* Avatar inside ring */}
              <div className="absolute inset-0 flex items-center justify-center p-[3px]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
                  {highlight.products[0] ? (
                    <Image
                      src={highlight.products[0].primaryImage.url}
                      alt={highlight.label}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">{highlight.emoji}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Story ring overlay */}
              <Image
                src="/story-ring.png"
                alt=""
                fill
                className="object-contain z-10 pointer-events-none"
                sizes="72px"
              />
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] font-medium truncate w-16 text-center">
              {highlight.label}
            </span>
          </button>
        ))}

        {/* Add new highlight button */}
        <button className="flex flex-col items-center gap-1.5 flex-shrink-0 group">
          <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center group-hover:border-[var(--text-tertiary)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className="text-[11px] text-[var(--text-tertiary)] font-medium">New</span>
        </button>
      </div>
    </div>
  );
}
