"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import CategoryPills from "./CategoryPills";
import { Category, FeedMode } from "@/types";
import { CURRENT_USER } from "@/lib/mock-users";

type TopNavProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  feedMode: FeedMode;
  onFeedModeChange: (mode: FeedMode) => void;
  onAlgorithmClick?: () => void;
  onProfileClick?: () => void;
};

export default function TopNav({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  categories,
  activeCategory,
  onCategorySelect,
  feedMode,
  onFeedModeChange,
  onAlgorithmClick,
  onProfileClick,
}: TopNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 100 || currentY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        setIsVisible(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-[var(--border)]/50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main nav bar */}
      <div className="flex items-center gap-4 px-4 md:px-6 lg:px-8 py-3">
        {/* Logo: Gumi bear icon + text */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={() => {
            onCategorySelect("for-you");
            onSearchChange("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/gumi-icon.png"
            alt="Gumi"
            width={28}
            height={48}
            className="drop-shadow-sm"
          />
          <h1
            className="text-3xl tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
          >
            Gumi
          </h1>
        </div>

        {/* Search */}
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />

        {/* Feed mode toggle */}
        <div className="flex items-center bg-[var(--bg-secondary)] rounded-full p-1 flex-shrink-0">
          <button
            onClick={() => onFeedModeChange("gallery")}
            className={`p-2 rounded-full transition-all ${
              feedMode === "gallery"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
            aria-label="Gallery view"
            title="Gallery view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={feedMode === "gallery" ? "var(--text-primary)" : "var(--text-tertiary)"}
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => onFeedModeChange("reels")}
            className={`p-2 rounded-full transition-all ${
              feedMode === "reels"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
            aria-label="Feed view"
            title="Feed view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={feedMode === "reels" ? "var(--text-primary)" : "var(--text-tertiary)"}
              strokeWidth="2"
            >
              <rect x="6" y="3" width="12" height="18" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </button>
        </div>

        {/* Algorithm info button */}
        {onAlgorithmClick && (
          <button
            onClick={onAlgorithmClick}
            className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-[var(--bg-secondary)] flex items-center justify-center transition-colors"
            aria-label="How Gumi works"
            title="The Algorithm"
          >
            <span className="text-sm text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600 }}>
              Σ
            </span>
          </button>
        )}

        {/* Profile with Gumi count */}
        <button
          onClick={onProfileClick}
          className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1.5 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="Profile"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[var(--bg-secondary)]">
            <Image src={CURRENT_USER.avatar} alt="You" fill className="object-cover" sizes="28px" />
          </div>
          <div className="flex items-center gap-0.5">
            <Image src="/gumi-icon.png" alt="" width={12} height={21} />
            <span className="text-xs font-semibold text-[var(--text-primary)]">{CURRENT_USER.gumiCount}</span>
          </div>
        </button>
      </div>

      {/* Category pills — only show in gallery mode */}
      {feedMode === "gallery" && (
        <CategoryPills
          categories={categories}
          activeCategory={activeCategory}
          onSelect={onCategorySelect}
        />
      )}
    </nav>
  );
}
