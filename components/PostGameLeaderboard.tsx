"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MockUser } from "@/types";
import { CURRENT_USER } from "@/lib/mock-users";
import GummiBear from "./GummiBear/GummiBear";
import { getGameLeaderboard, getUserRank } from "@/lib/game-leaderboard";

type PostGameLeaderboardProps = {
  game: "blaster" | "pacman";
  finalScore: number;
  users: MockUser[];
  onClose: () => void;
};

export default function PostGameLeaderboard({
  game,
  finalScore,
  users,
  onClose,
}: PostGameLeaderboardProps) {
  const allUsers = useMemo(() => [CURRENT_USER, ...users], [users]);
  const leaderboard = useMemo(() => getGameLeaderboard(allUsers, game), [allUsers, game]);
  const userRank = useMemo(() => getUserRank(CURRENT_USER.id, allUsers, game), [allUsers, game]);

  const gameTitle = game === "blaster" ? "Gummy Blaster" : "Gummi Pac";
  const gameIcon = game === "blaster" ? "🎯" : "👻";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-(--bg-primary) rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-(--bg-secondary) border-b border-(--border) flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{gameIcon}</span>
            <div>
              <h2 className="text-xl font-bold text-(--text-primary)">{gameTitle}</h2>
              <p className="text-xs text-(--text-tertiary)">Final Rankings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-(--bg-primary) rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Your Score */}
        {userRank && (
          <div className="px-6 py-4 bg-(--accent)/10 border-b border-(--accent)/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${
                userRank.rank === 1 ? "text-yellow-500" : "text-(--accent)"
              }`}>
                #{userRank.rank}
              </span>
              <div>
                <p className="text-sm font-semibold text-(--text-primary)">Your Score</p>
                <p className="text-xs text-(--text-tertiary)">
                  {leaderboard.length - userRank.rank} {leaderboard.length - userRank.rank === 1 ? "person" : "people"} behind 1st
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-(--accent)">{userRank.score}</p>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="flex-1 overflow-y-auto">
          {/* Header row */}
          <div className="px-4 py-3 bg-(--bg-secondary) border-b border-(--border) flex items-center gap-3 text-xs font-semibold text-(--text-secondary) uppercase tracking-wide sticky top-0">
            <div className="w-8 text-center">#</div>
            <div className="flex-1">Player</div>
            <div className="w-16 text-right">Score</div>
          </div>

          {/* Rows */}
          {leaderboard.map((entry, idx) => {
            const isCurrentUser = entry.userId === CURRENT_USER.id;
            return (
              <div
                key={entry.userId}
                className={`flex items-center gap-3 px-4 py-3 border-b border-(--border) transition-colors ${
                  isCurrentUser
                    ? "bg-(--accent)/10"
                    : idx % 2 === 0
                      ? "bg-(--bg-secondary)"
                      : ""
                }`}
              >
                {/* Rank */}
                <div className="w-8 text-center">
                  <span className={`font-bold ${
                    entry.rank === 1
                      ? "text-yellow-500 text-lg"
                      : entry.rank === 2
                        ? "text-gray-400 text-lg"
                        : entry.rank === 3
                          ? "text-orange-500 text-lg"
                          : "text-(--text-secondary)"
                  }`}>
                    {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                  </span>
                </div>

                {/* Player */}
                <div className="flex-1 flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-(--bg-primary) flex items-center justify-center flex-shrink-0">
                    {entry.user.gummiOutfit || entry.user.gummiHue !== 0 ? (
                      <GummiBear
                        config={{
                          hue: entry.user.gummiHue,
                          clothing: entry.user.gummiOutfit?.clothing || null,
                          accessory: entry.user.gummiOutfit?.accessory || null,
                          headwear: entry.user.gummiOutfit?.headwear || null,
                        }}
                        size={32}
                      />
                    ) : (
                      <Image
                        src={entry.user.avatar}
                        alt={entry.user.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-sm font-medium truncate ${
                      isCurrentUser ? "text-(--accent)" : "text-(--text-primary)"
                    }`}>
                      {entry.user.name}
                    </span>
                    <span className="text-xs text-(--text-tertiary) truncate">@{entry.user.username}</span>
                  </div>
                </div>

                {/* Score */}
                <div className={`w-16 text-right text-sm font-bold ${
                  isCurrentUser ? "text-(--accent)" : "text-(--text-primary)"
                }`}>
                  {entry.score}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-(--bg-secondary) border-t border-(--border) flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-(--accent) text-white font-semibold hover:bg-(--accent)/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
