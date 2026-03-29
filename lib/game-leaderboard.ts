import { MockUser } from "@/types";
import { getAllGameScores } from "./game-scores";

export type GameScore = {
  userId: string;
  blasterScore: number;
  pacmanScore: number;
};

export type GameLeaderboardEntry = {
  userId: string;
  user: MockUser;
  score: number; // The specific game score
  rank: number;
};

// Get leaderboard for a specific game
export function getGameLeaderboard(
  users: MockUser[],
  game: "blaster" | "pacman"
): GameLeaderboardEntry[] {
  const allScores = getAllGameScores();

  const entries = users
    .map((user) => {
      const userScores = allScores[user.id] || {
        blasterScore: 0,
        pacmanScore: 0,
      };
      const score = game === "blaster" ? userScores.blasterScore : userScores.pacmanScore;
      return {
        userId: user.id,
        score,
        user,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  return entries;
}

// Get user's rank in a specific game
export function getUserRank(
  userId: string,
  users: MockUser[],
  game: "blaster" | "pacman"
): GameLeaderboardEntry | undefined {
  const leaderboard = getGameLeaderboard(users, game);
  return leaderboard.find((entry) => entry.userId === userId);
}
