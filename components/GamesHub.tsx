"use client";

import { useState } from "react";
import Image from "next/image";
import WordleGame from "./games/WordleGame";
import GummyShooterGame from "./games/GummyShooterGame";
import GummiPacmanGame from "./games/GummiPacmanGame";
import GameLeaderboard from "./GameLeaderboard";
import { MOCK_USERS } from "@/lib/mock-users";

type GameId = "wordle" | "shooter" | "pacman";
type View = "games" | "leaderboard";

const GAMES: { id: GameId; title: string; description: string; gradient: string; icon: string }[] = [
  {
    id: "wordle",
    title: "Gummi Wordle",
    description: "Crack the 5-letter code in 6 tries",
    gradient: "from-emerald-500 to-teal-600",
    icon: "🧩",
  },
  {
    id: "shooter",
    title: "Gummy Blaster",
    description: "Survive the gummy invasion in this FPS arcade shooter",
    gradient: "from-pink-500 to-purple-600",
    icon: "🎯",
  },
  {
    id: "pacman",
    title: "Gummi Pac",
    description: "Eat all the gummy candies and dodge the ghosts",
    gradient: "from-amber-400 to-orange-500",
    icon: "👻",
  },
];

export default function GamesHub() {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [view, setView] = useState<View>("games");

  if (activeGame === "wordle") return <div className="w-full h-screen flex flex-col items-center justify-center"><WordleGame onBack={() => setActiveGame(null)} /></div>;
  if (activeGame === "shooter") return <div className="w-full h-screen flex flex-col items-center justify-center"><GummyShooterGame onBack={() => setActiveGame(null)} /></div>;
  if (activeGame === "pacman") return <div className="w-full h-screen flex flex-col items-center justify-center"><GummiPacmanGame onBack={() => setActiveGame(null)} /></div>;

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-8 flex flex-col justify-center">
      {/* Header with tabs */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* GUMI_ICON_PLACEHOLDER */}
            <Image src="/gummi-icon.png" alt="Gummi" width={40} height={40} className="drop-shadow-md" />
            <h1 className="text-4xl font-bold text-(--text-primary)" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Gummi Games
            </h1>
          </div>
          {/* View toggle tabs */}
          <div className="flex items-center gap-2 bg-(--bg-secondary) rounded-full p-1">
            <button
              onClick={() => setView("games")}
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                view === "games"
                  ? "bg-(--accent) text-white"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              Games
            </button>
            <button
              onClick={() => setView("leaderboard")}
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                view === "leaderboard"
                  ? "bg-(--accent) text-white"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>
        <p className="text-(--text-secondary) text-sm ml-[52px]">
          {view === "games" ? "Play, compete, and have fun with gummy-powered games" : "See how you rank against your friends"}
        </p>
      </div>

      {/* Content */}
      {view === "games" ? (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className="group text-left rounded-2xl overflow-hidden bg-(--card-bg) border border-(--border) shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Card hero */}
            <div className={`relative h-40 bg-linear-to-br ${game.gradient} flex items-center justify-center overflow-hidden`}>
              {/* GUMI_ICON_PLACEHOLDER - decorative background icons */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Image
                    key={i}
                    src="/gummi-icon.png"
                    alt=""
                    width={40}
                    height={40}
                    className="absolute"
                    style={{
                      top: `${15 + (i % 3) * 30}%`,
                      left: `${10 + (i % 2) * 50 + (i * 13) % 30}%`,
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  />
                ))}
              </div>
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{game.icon}</span>
            </div>
            {/* Card body */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-(--text-primary) mb-1" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {game.title}
              </h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed">{game.description}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-(--accent) group-hover:gap-2.5 transition-all">
                <span>Play now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </button>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <GameLeaderboard users={MOCK_USERS} />
        </div>
      )}

      {/* Footer badge */}
      <div className="max-w-4xl mx-auto mt-12 flex items-center justify-center gap-2 text-(--text-tertiary) text-xs">
        {/* GUMI_ICON_PLACEHOLDER */}
        <Image src="/gummi-icon.png" alt="Gummi" width={16} height={16} className="opacity-50" />
        <span>Powered by Gummi</span>
      </div>
    </div>
  );
}
