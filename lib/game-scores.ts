// Persistent game scores storage using localStorage

const SCORES_KEY = "gumi_game_scores";

export type UserGameScores = {
  blasterScore: number;
  pacmanScore: number;
};

export type AllGameScores = Record<string, UserGameScores>;

// Initialize default scores
function getDefaultScores(): AllGameScores {
  return {
    "user-me": {
      blasterScore: 17,
      pacmanScore: 3080,
    },
    "user-1": {
      blasterScore: 15,
      pacmanScore: 2850,
    },
    "user-2": {
      blasterScore: 18,
      pacmanScore: 3120,
    },
    "user-3": {
      blasterScore: 12,
      pacmanScore: 2450,
    },
    "user-4": {
      blasterScore: 20,
      pacmanScore: 3450,
    },
    "user-5": {
      blasterScore: 16,
      pacmanScore: 2920,
    },
    "user-6": {
      blasterScore: 14,
      pacmanScore: 2680,
    },
    "user-7": {
      blasterScore: 19,
      pacmanScore: 3200,
    },
  };
}

// Get all scores from localStorage
export function getAllGameScores(): AllGameScores {
  if (typeof window === "undefined") return getDefaultScores();
  
  try {
    const stored = localStorage.getItem(SCORES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to read game scores from localStorage", error);
  }
  
  return getDefaultScores();
}

// Get specific user's scores
export function getUserGameScores(userId: string): UserGameScores {
  const allScores = getAllGameScores();
  return allScores[userId] || { blasterScore: 0, pacmanScore: 0 };
}

// Update a user's Blaster score (keep highest)
export function updateBlasterScore(userId: string, score: number): void {
  if (typeof window === "undefined") return;
  
  try {
    const allScores = getAllGameScores();
    const currentScores = allScores[userId] || { blasterScore: 0, pacmanScore: 0 };
    
    // Keep the higher score
    if (score > currentScores.blasterScore) {
      currentScores.blasterScore = score;
      allScores[userId] = currentScores;
      localStorage.setItem(SCORES_KEY, JSON.stringify(allScores));
    }
  } catch (error) {
    console.error("Failed to update Blaster score", error);
  }
}

// Update a user's Pac-Man score (keep highest)
export function updatePacmanScore(userId: string, score: number): void {
  if (typeof window === "undefined") return;
  
  try {
    const allScores = getAllGameScores();
    const currentScores = allScores[userId] || { blasterScore: 0, pacmanScore: 0 };
    
    // Keep the higher score
    if (score > currentScores.pacmanScore) {
      currentScores.pacmanScore = score;
      allScores[userId] = currentScores;
      localStorage.setItem(SCORES_KEY, JSON.stringify(allScores));
    }
  } catch (error) {
    console.error("Failed to update Pac-Man score", error);
  }
}

// Reset all scores to defaults (for testing)
export function resetAllScores(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(SCORES_KEY);
  } catch (error) {
    console.error("Failed to reset scores", error);
  }
}
