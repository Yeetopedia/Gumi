"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { getUserHighlights, HighlightCollection } from "@/lib/current-user-data";
import { useGummiBear } from "@/lib/gummi-bear-context";
import TintedImage from "../GummiBear/TintedImage";

type ProfileHighlightsProps = {
  userId: string;
  onHighlightClick: (highlight: HighlightCollection, index: number) => void;
};

export default function ProfileHighlights({ userId, onHighlightClick }: ProfileHighlightsProps) {
  const { state } = useGummiBear();
  const highlights = getUserHighlights(userId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  // Check scroll position to show/hide buttons
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Setup scroll event listener
  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", checkScroll);
    checkScroll(); // Initial check

    return () => ref.removeEventListener("scroll", checkScroll);
  }, [highlights.length]);

  // Handle mouse wheel scroll
  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      const scrollAmount = 200;
      e.preventDefault();
      ref.scrollBy({
        left: e.deltaY > 0 ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    };

    ref.addEventListener("wheel", handleWheel, { passive: false });
    return () => ref.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (highlights.length === 0) return null;

  return (
    <div className="relative bg-(--bg-primary) group px-6 py-8">
      {/* Left scroll button */}
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Right scroll button */}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Highlights scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar"
      >
        {highlights.map((highlight, index) => (
          <button
            key={highlight.id}
            onClick={() => onHighlightClick(highlight, index)}
            className="flex flex-col items-center gap-1.5 shrink-0 group/highlight"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 group-hover/highlight:scale-105 transition-transform">
              {/* Avatar inside ring */}
              <div className="absolute inset-0 flex items-center justify-center p-[3px]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-(--bg-secondary)">
                  {highlight.products[0] ? (
                    <Image
                      src={highlight.products[0].primaryImage.url}
                      alt={highlight.label}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">{highlight.emoji}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Story ring overlay — tinted by bear color */}
              <TintedImage
                src="/story-ring.png"
                hue={state.config.hue}
                fill
                className="object-contain z-10 pointer-events-none"
              />
            </div>
            <span className={`text-[11px] truncate w-20 text-center text-(--text-secondary)`}>
              {highlight.label}
            </span>
          </button>
        ))}

        {/* Add new highlight button */}
        <button className="flex flex-col items-center gap-1.5 shrink-0 group/highlight">
          <div className="relative w-20 h-20 md:w-24 md:h-24 group-hover/highlight:scale-105 transition-transform">
            <div className="w-full h-full rounded-full border-2 border-dashed border-(--border) flex items-center justify-center group-hover/highlight:border-(--text-tertiary) transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className="text-[11px] truncate w-20 text-center text-(--text-tertiary)">New</span>
        </button>
      </div>
    </div>
  );
}
