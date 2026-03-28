"use client";

import { useState } from "react";
import Image from "next/image";
import { Category, FeedMode } from "@/types";
import { CURRENT_USER } from "@/lib/mock-users";
import SearchBar from "./SearchBar";

type SidebarProps = {
  feedMode: FeedMode;
  onFeedModeChange: (mode: FeedMode) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  onAlgorithmClick?: () => void;
  onProfileClick?: () => void;
};

export default function Sidebar({
  feedMode,
  onFeedModeChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  categories,
  activeCategory,
  onCategorySelect,
  onAlgorithmClick,
  onProfileClick,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[var(--bg-primary)] border-r border-[var(--border)] z-40 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div
            className="flex items-center gap-2 mb-8 mt-2 flex-shrink-0 cursor-pointer"
            onClick={() => {
              onCategorySelect("for-you");
              onSearchChange("");
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            <Image
              src="/gumi-icon.png"
              alt="Gumi"
              width={32}
              height={32}
              className="drop-shadow-sm"
            />
            <h1
              className="text-2xl tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
            >
              Gumi
            </h1>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
            />
          </div>

          {/* Main navigation links */}
          <nav className="flex-1 mb-6">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="var(--text-primary)" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Home</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Explore</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Likes</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Messages</span>
              </button>
            </div>
          </nav>

          {/* Feed mode toggle */}
          <div className="space-y-2 mb-6 pb-6 border-b border-[var(--border)]">
            <p className="text-xs uppercase tracking-widest text-[var(--text-tertiary)] font-semibold px-3">View</p>
            <div className="flex gap-2 px-3">
              <button
                onClick={() => {
                  onFeedModeChange("gallery");
                  setIsOpen(false);
                }}
                className={`flex-1 p-2 rounded-lg transition-all ${
                  feedMode === "gallery"
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text-primary)]"
                }`}
                aria-label="Gallery view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  onFeedModeChange("reels");
                  setIsOpen(false);
                }}
                className={`flex-1 p-2 rounded-lg transition-all ${
                  feedMode === "reels"
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text-primary)]"
                }`}
                aria-label="Reels view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Algorithm button */}
          {onAlgorithmClick && (
            <button
              onClick={onAlgorithmClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left mb-6"
            >
              <span className="text-lg" style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600 }}>
                Σ
              </span>
              <span className="text-sm font-medium text-[var(--text-primary)]">The Algorithm</span>
            </button>
          )}

          {/* User profile button */}
          <button onClick={onProfileClick} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--bg-secondary)] flex-shrink-0">
              <Image src={CURRENT_USER.avatar} alt="You" fill className="object-cover" sizes="32px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">{CURRENT_USER.name}</p>
              <p className="text-xs text-[var(--text-tertiary)]">@{CURRENT_USER.username}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Spacer on desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
}
