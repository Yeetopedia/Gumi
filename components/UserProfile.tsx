"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MockUser } from "@/types";
import { getUserGummis, getUserHighlights } from "@/lib/user-products";
import { formatCount } from "@/lib/utils";
import GummiBear from "./GummiBear/GummiBear";

// Seeded deterministic overlap score from user IDs
function getTasteOverlap(userId: string): number {
  const hash = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 55 + (hash % 40); // 55-94%
}

const SHARED_INTERESTS = [
  ["Minimalist Home", "Skincare", "Ceramics"],
  ["Fashion", "Art Prints", "Coffee Gear"],
  ["Streetwear", "Tech Gadgets", "Books"],
  ["Jewelry", "Candles", "Plants"],
  ["Vintage Fashion", "Kitchenware", "Stationery"],
];
function getSharedInterests(userId: string): string[] {
  const hash = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return SHARED_INTERESTS[hash % SHARED_INTERESTS.length];
}

type UserProfileProps = {
  user: MockUser | null;
  onClose: () => void;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  isFollowing?: (userId: string) => boolean;
};

export default function UserProfile({
  user,
  onClose,
  onFollow,
  onMessage,
  isFollowing,
}: UserProfileProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (user) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    };
  }, [user]);

  const userGummis = user ? getUserGummis(user.id) : [];
  const highlights = user ? getUserHighlights(user.id) : [];
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const tasteOverlap = useMemo(() => user ? getTasteOverlap(user.id) : 0, [user]);
  const sharedInterests = useMemo(() => user ? getSharedInterests(user.id) : [], [user]);

  // Reset highlight when user changes
  useEffect(() => {
    setActiveHighlight(null);
  }, [user]);

  const displayProducts = activeHighlight
    ? highlights.find((h) => h.id === activeHighlight)?.products || userGummis
    : userGummis;

  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-(--card-bg) z-50 overflow-y-auto shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-(--bg-secondary) flex items-center justify-center hover:bg-(--border) transition-colors z-20"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Profile header */}
            <div className="flex flex-col items-center pt-12 pb-6 px-6">
              {/* Avatar with story ring */}
              <div className="relative w-24 h-24 mb-4">
                <div className={`absolute inset-0 flex items-center justify-center ${user.hasStory ? "p-[4px]" : "p-0"}`}>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-(--bg-secondary)">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="96px" />
                  </div>
                </div>
                {user.hasStory && (
                  <Image src="/story-ring.png" alt="" fill className="object-contain z-10 pointer-events-none" sizes="96px" />
                )}
              </div>

              <h2
                className="text-xl text-(--text-primary) mb-0.5"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {user.name}
              </h2>
              <p className="text-sm text-(--text-tertiary) mb-3">@{user.username}</p>
              <p className="text-sm text-(--text-secondary) text-center max-w-xs mb-6">
                {user.bio}
              </p>

              {/* Stats — Gummi count is the star metric */}
              <div className="flex gap-8 mb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5">
                    <Image src="/gummi-icon.png" alt="" width={18} height={31} />
                    <span className="text-xl font-bold text-(--accent)">
                      {formatCount(user.gummiCount)}
                    </span>
                  </div>
                  <span className="text-xs text-(--text-tertiary)">Gummis</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-(--text-primary)">
                    {formatCount(user.followers)}
                  </span>
                  <span className="text-xs text-(--text-tertiary)">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-(--text-primary)">
                    {formatCount(user.following)}
                  </span>
                  <span className="text-xs text-(--text-tertiary)">Following</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 w-full max-w-xs">
                <button
                  onClick={() => {
                    onFollow?.(user.id);
                  }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    isFollowing?.(user.id)
                      ? "border border-(--border) text-(--text-secondary) hover:bg-(--bg-secondary)"
                      : "bg-(--accent) text-white hover:bg-(--accent-hover)"
                  }`}
                >
                  {isFollowing?.(user.id) ? "Following" : "Follow"}
                </button>
                <button
                  onClick={() => {
                    onMessage?.(user.id);
                  }}
                  className="flex-1 py-2.5 border border-(--border) text-(--text-secondary) rounded-full text-sm font-medium hover:border-(--text-tertiary) transition-colors"
                >
                  Message
                </button>
              </div>
            </div>

            {/* Taste Overlap panel */}
            <div className="mx-6 mb-4 rounded-2xl bg-(--bg-secondary) p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-(--text-tertiary) font-medium">
                  Taste Overlap
                </p>
                <div className="flex items-center gap-1">
                  <GummiBear
                    config={{ hue: user.gummiHue ?? 0, clothing: user.gummiOutfit?.clothing ?? null, accessory: user.gummiOutfit?.accessory ?? null, headwear: user.gummiOutfit?.headwear ?? null }}
                    size={22}
                  />
                </div>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-2.5 bg-(--border) rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-(--accent) to-rose-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${tasteOverlap}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
                <span className="text-sm font-bold text-(--accent) shrink-0">{tasteOverlap}%</span>
              </div>
              {/* Shared categories */}
              <div className="flex flex-wrap gap-1.5">
                {sharedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="text-[10px] font-medium px-2 py-0.5 bg-(--card-bg) rounded-full text-(--text-secondary) border border-(--border)"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-(--text-tertiary) mt-2">
                You and {user.name.split(" ")[0]} both love these categories
              </p>
            </div>

            {/* Highlights row */}
            {highlights.length > 0 && (
              <div className="px-6 py-4 border-t border-(--border)/50">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {highlights.map((highlight) => (
                    <button
                      key={highlight.id}
                      onClick={() =>
                        setActiveHighlight(activeHighlight === highlight.id ? null : highlight.id)
                      }
                      className="flex flex-col items-center gap-1.5 shrink-0"
                    >
                      <div
                        className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-colors ${
                          activeHighlight === highlight.id
                            ? "border-(--accent)"
                            : "border-(--border)"
                        }`}
                      >
                        <div className="w-full h-full bg-(--bg-secondary) flex items-center justify-center relative">
                          {highlight.products[0] ? (
                            <Image
                              src={highlight.products[0].primaryImage.url}
                              alt={highlight.label}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <span className="text-2xl">{highlight.emoji}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-(--text-secondary) font-medium">
                        {highlight.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Products they've Gummied (purchased and posted) */}
            <div className="px-6 pb-8">
              <h3 className="text-xs uppercase tracking-[0.1em] text-(--text-tertiary) font-medium mb-3">
                {activeHighlight
                  ? highlights.find((h) => h.id === activeHighlight)?.label
                  : `Products ${user.name.split(" ")[0]} bought`}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative aspect-square rounded-xl overflow-hidden bg-(--bg-secondary) group cursor-pointer"
                  >
                    <Image
                      src={product.primaryImage.url}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="120px"
                    />
                    {/* Gummi badge overlay */}
                    <div className="absolute bottom-1 left-1 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                      <Image src="/gummi-icon.png" alt="" width={10} height={17} />
                      <span className="text-white text-[9px] font-medium">
                        {formatCount(product.gummis)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
