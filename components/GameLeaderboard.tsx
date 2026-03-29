"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { MockUser } from "@/types";
import { CURRENT_USER } from "@/lib/mock-users";
import GummiBear from "./GummiBear/GummiBear";
import { getGameLeaderboard, getUserRank } from "@/lib/game-leaderboard";

type GameLeaderboardProps = {
  users: MockUser[];
};

export default function GameLeaderboard({ users }: GameLeaderboardProps) {
  const [selectedGame, setSelectedGame] = useState<"blaster" | "pacman">("blaster");
  const [scoreUpdate, setScoreUpdate] = useState(0);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setScoreUpdate(prev => prev + 1);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  const allUsers = useMemo(() => [CURRENT_USER, ...users], [users]);
  const leaderboard = useMemo(
    () => getGameLeaderboard(allUsers, selectedGame),
    [allUsers, selectedGame, scoreUpdate]
  );
  const userRank = useMemo(
    () => getUserRank(CURRENT_USER.id, allUsers, selectedGame),
    [allUsers, selectedGame, scoreUpdate]
  );

  const gameTitle = selectedGame === "blaster" ? "Gummy Blaster" : "Gummi Pac";
  const description = selectedGame === "blaster" ? "Wave level reached" : "Points collected";

  return (
    <div className="w-full">
      {/* Game tabs */}
      <div className="mb-6 flex gap-2 bg-(--bg-secondary) rounded-lg p-1">
        <button
          onClick={() => setSelectedGame("blaster")}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all ${
            selectedGame === "blaster"
              ? "bg-(--accent) text-white"
              : "text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          🎯 Blaster
        </button>
        <button
          onClick={() => setSelectedGame("pacman")}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all ${
            selectedGame === "pacman"
              ? "bg-(--accent) text-white"
              : "text-(--text-secondary) hover:text-(--text-primary)"
          }`}
        >
          👻 Pac
        </button>
      </div>

      {/* Header with current user's rank */}
      {userRank && (
        <div className="mb-6 p-4 rounded-lg bg-(--bg-secondary) border-2 border-(--accent)">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold text-(--accent)">#{userRank.rank}</div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-(--text-primary)">
                  Your Rank
                </span>
                <span className="text-xs text-(--text-tertiary)">
                  {leaderboard.length - userRank.rank} {leaderboard.length - userRank.rank === 1 ? "person" : "people"} behind #{1}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-(--accent)">
                {userRank.score}
              </div>
              <div className="text-xs text-(--text-tertiary)">{description}</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard table */}
      <div className="rounded-lg bg-(--bg-secondary) overflow-hidden">
        {/* Header row */}
        <div className="px-4 py-3 bg-(--bg-primary) border-b border-(--bg-secondary) flex items-center gap-4 text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
          <div className="w-8 text-center">#</div>
          <div className="flex-1">Player</div>
          <div className="w-20 text-right font-bold text-(--text-primary)">Score</div>
        </div>

        {/* Leaderboard rows */}
        {leaderboard.map((entry, idx) => {
          const isCurrentUser = entry.userId === CURRENT_USER.id;
          return (
            <div
              key={entry.userId}
              className={`flex items-center gap-4 px-4 py-3 border-b border-(--bg-secondary) transition-colors ${
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

              {/* Player info */}
              <div className="flex-1 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-(--bg-primary) flex items-center justify-center flex-shrink-0">
                  {entry.user.gummiOutfit || entry.user.gummiHue !== 0 ? (
                    <GummiBear
                      config={{
                        hue: entry.user.gummiHue,
                        clothing: entry.user.gummiOutfit?.clothing || null,
                        accessory: entry.user.gummiOutfit?.accessory || null,
                        headwear: entry.user.gummiOutfit?.headwear || null,
                      }}
                      size={40}
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
                  <span className={`text-sm font-semibold truncate ${
                    isCurrentUser ? "text-(--accent)" : "text-(--text-primary)"
                  }`}>
                    {entry.user.name}
                  </span>
                  <span className="text-xs text-(--text-tertiary) truncate">
                    @{entry.user.username}
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className={`w-20 text-right text-sm font-bold ${
                isCurrentUser ? "text-(--accent)" : "text-(--text-primary)"
              }`}>
                {entry.score}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 text-xs text-(--text-tertiary) space-y-1">
        <p><span className="font-semibold">Blaster:</span> Wave level reached</p>
        <p><span className="font-semibold">Pac:</span> Points collected</p>
      </div>
    </div>
  );
}
