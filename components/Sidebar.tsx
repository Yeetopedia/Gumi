"use client";

import { useState } from "react";
import Image from "next/image";
import { Category, FeedMode } from "@/types";
import { CURRENT_USER } from "@/lib/mock-users";
import { getUnreadCount } from "@/lib/mock-conversations";
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
  activeSection?: "feed" | "games" | "messages";
  onHomeClick?: () => void;
  onGamesClick?: () => void;
  onMessagesClick?: () => void;
  onFollowUser?: (userId: string) => void;
  isFollowing?: (userId: string) => boolean;
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
  activeSection = "feed",
  onHomeClick,
  onGamesClick,
  onMessagesClick,
  onFollowUser,
  isFollowing,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = getUnreadCount();

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
              onHomeClick?.();
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
              <button
                onClick={() => { onHomeClick?.(); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left ${activeSection === "feed" ? "bg-[var(--bg-secondary)]" : ""}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={activeSection === "feed" ? "currentColor" : "none"} stroke="var(--text-primary)" strokeWidth={activeSection === "feed" ? "1.5" : "2"}>
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
              <button
                onClick={() => { onMessagesClick?.(); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left relative ${activeSection === "messages" ? "bg-[var(--bg-secondary)]" : ""}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Messages</span>
                {unreadCount > 0 && (
                  <span className="ml-auto bg-[var(--accent)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onFeedModeChange("reels");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="3" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Feed</span>
              </button>
              <button
                onClick={() => { onGamesClick?.(); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left ${activeSection === "games" ? "bg-[var(--bg-secondary)]" : ""}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={activeSection === "games" ? "currentColor" : "none"} stroke="var(--text-primary)" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="3" />
                  <circle cx="9" cy="12" r="1.5" fill={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} stroke="none" />
                  <circle cx="15" cy="10" r="1" fill={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} stroke="none" />
                  <circle cx="17" cy="12" r="1" fill={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} stroke="none" />
                  <circle cx="15" cy="14" r="1" fill={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} stroke="none" />
                  <circle cx="13" cy="12" r="1" fill={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} stroke="none" />
                  <line x1="7" y1="12" x2="11" y2="12" stroke={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} strokeWidth="1.5" />
                  <line x1="9" y1="10" x2="9" y2="14" stroke={activeSection === "games" ? "var(--card-bg)" : "var(--text-primary)"} strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">Games</span>
              </button>
            </div>
          </nav>

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
