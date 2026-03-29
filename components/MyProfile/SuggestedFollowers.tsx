"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MockUser } from "@/types";
import { MOCK_USERS } from "@/lib/mock-users";
import { getUserGummis } from "@/lib/user-products";

type SuggestedFollowersProps = {
  onUserClick: (user: MockUser) => void;
};

function useSuggestions() {
  const myGummis = getUserGummis("user-me");
  const myIds = new Set(myGummis.map((p) => p.id));

  return MOCK_USERS.map((user) => ({
    user,
    overlap: getUserGummis(user.id).filter((p) => myIds.has(p.id)).length,
  }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 6);
}

export default function SuggestedFollowers({ onUserClick }: SuggestedFollowersProps) {
  const suggestions = useSuggestions();
  const [followed, setFollowed] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium">
          Suggested for you
        </span>
        <button className="text-xs text-(--accent) hover:opacity-70 transition-opacity">
          See all
        </button>
      </div>

      {/* Horizontal scroll strip */}
      <div
        className="flex gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {suggestions.map(({ user, overlap }, idx) => {
          // Deterministic mutual friends pick
          const mutuals = MOCK_USERS.filter((u) => u.id !== user.id).slice(
            idx % 5,
            (idx % 5) + 2
          );
          const isFollowed = followed.has(user.id);

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="w-[160px] shrink-0 bg-(--card-bg) rounded-xl border border-(--border) p-4 flex flex-col items-center gap-1.5"
            >
              {/* Avatar */}
              <button
                onClick={() => onUserClick(user)}
                className="relative w-12 h-12 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>

              {/* Name */}
              <button
                onClick={() => onUserClick(user)}
                className="text-sm font-semibold text-(--text-primary) text-center leading-tight hover:opacity-70 transition-opacity"
              >
                {user.name}
              </button>

              {/* Username */}
              <p className="text-xs text-(--text-tertiary)">@{user.username}</p>

              {/* Mutual friends */}
              {mutuals.length > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex -space-x-1">
                    {mutuals.map((m) => (
                      <div
                        key={m.id}
                        className="relative w-4 h-4 rounded-full overflow-hidden border border-(--card-bg)"
                      >
                        <Image
                          src={m.avatar}
                          alt={m.name}
                          fill
                          className="object-cover"
                          sizes="16px"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-(--text-tertiary) leading-tight">
                    {mutuals[0].name.split(" ")[0]}
                    {mutuals[1] ? `, ${mutuals[1].name.split(" ")[0]}` : ""}
                  </p>
                </div>
              )}

              {/* Similarity line */}
              <div className="flex items-center gap-1 mt-0.5">
                <Image src="/gummi-icon.png" alt="" width={10} height={17} />
                <span className="text-[11px] text-(--accent)">
                  {overlap} similar Gummis
                </span>
              </div>

              {/* Follow button */}
              <button
                onClick={() => toggle(user.id)}
                className={`mt-auto w-full py-2 rounded-full text-xs font-semibold transition-colors ${
                  isFollowed
                    ? "border border-(--border) text-(--text-secondary)"
                    : "bg-(--accent) text-white hover:bg-(--accent-hover)"
                }`}
              >
                {isFollowed ? "Following" : "Follow"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
