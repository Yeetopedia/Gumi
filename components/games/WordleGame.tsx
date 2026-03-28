"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";

const WORDS = [
  "GUMMY","CANDY","SWEET","SUGAR","JELLY","BERRY","FRUIT","PEACH","GRAPE","LEMON",
  "MELON","HONEY","CREAM","TREAT","TASTE","CHEWY","MANGO","APPLE","CHARM","LUCKY",
  "HAPPY","SMILE","DREAM","MAGIC","SHINE","BLISS","HEART","CLOUD","BEACH","OCEAN",
  "TIGER","CRANE","FLAME","GLOBE","HOUSE","PLANT","STONE","TRAIN","BRAVE","DANCE",
  "FEAST","GRACE","LEARN","MARCH","PAINT","QUIET","RAISE","SOLVE","TRUST","UNITY",
  "VALUE","WATCH","YOUNG","ALARM","BLOOM","CRISP","DRIFT","EAGLE","FLASH","GHOST",
  "HAVEN","IVORY","JOKER","KAYAK","LUNAR","NORTH","ORBIT","PEARL","QUEEN","RIVER",
  "STORM","TOWER","VIVID","WORLD","YACHT","ZESTY","AMBER","BLAZE","CORAL","DELTA",
  "EMBER","FROST","GLEAM","JEWEL","KARMA","LANCE","MAPLE","NOBLE","OLIVE","PRISM",
  "QUILT","RAVEN","SPARK","THORN","URBAN","VAULT","WHEAT","YOUTH","BLEND","CHASE",
  "DOUGH","ELBOW","FUDGE","GRAIN","HUMOR","INPUT","JUDGE","KNOCK","LATCH","MINOR",
  "NOVEL","OUTER","PLUMB","QUICK","RANCH","SHELF","TRACK","VERSE","WRIST","ANGEL",
  "BOOST","CIDER","DETOX","FLINT","GRILL","HOVER","PIXEL","ROYAL","TULIP","VIOLA",
];

type TileState = "correct" | "present" | "absent" | "empty" | "active";

function getRowStates(guess: string, solution: string): TileState[] {
  const states: TileState[] = Array(5).fill("absent");
  const remaining = solution.split("");
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      states[i] = "correct";
      remaining[i] = "";
    }
  }
  for (let i = 0; i < 5; i++) {
    if (states[i] === "correct") continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx !== -1) {
      states[i] = "present";
      remaining[idx] = "";
    }
  }
  return states;
}

function getKeyboardStates(guesses: string[], solution: string): Map<string, TileState> {
  const states = new Map<string, TileState>();
  for (const guess of guesses) {
    const rowStates = getRowStates(guess, solution);
    for (let i = 0; i < 5; i++) {
      const letter = guess[i];
      const current = states.get(letter);
      if (rowStates[i] === "correct") {
        states.set(letter, "correct");
      } else if (rowStates[i] === "present" && current !== "correct") {
        states.set(letter, "present");
      } else if (!current) {
        states.set(letter, "absent");
      }
    }
  }
  return states;
}

const TILE_COLORS: Record<TileState, string> = {
  correct: "bg-emerald-500 border-emerald-500 text-white",
  present: "bg-amber-400 border-amber-400 text-white",
  absent: "bg-zinc-600 border-zinc-600 text-white",
  empty: "bg-transparent border-[var(--border)]",
  active: "bg-transparent border-[var(--text-secondary)]",
};

const KEY_COLORS: Record<string, string> = {
  correct: "bg-emerald-500 text-white",
  present: "bg-amber-400 text-white",
  absent: "bg-zinc-600 text-zinc-400",
};

const KEYBOARD = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","DEL"],
];

export default function WordleGame({ onBack }: { onBack: () => void }) {
  const [gameKey, setGameKey] = useState(0);
  const solution = useMemo(() => WORDS[Math.floor(Math.random() * WORDS.length)], [gameKey]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [shake, setShake] = useState(false);
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("");

  const keyStates = useMemo(() => getKeyboardStates(guesses, solution), [guesses, solution]);

  const showMessage = (msg: string, duration = 1500) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  const handleKey = useCallback((key: string) => {
    if (gameState !== "playing") return;
    if (key === "ENTER") {
      if (currentGuess.length !== 5) {
        setShake(true);
        showMessage("Not enough letters");
        setTimeout(() => setShake(false), 500);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setRevealedRows(prev => new Set(prev).add(newGuesses.length - 1));
      setCurrentGuess("");
      if (currentGuess === solution) {
        setTimeout(() => {
          setGameState("won");
          showMessage(["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"][newGuesses.length - 1] || "Nice!", 3000);
        }, 1600);
      } else if (newGuesses.length >= 6) {
        setTimeout(() => {
          setGameState("lost");
          showMessage(solution, 5000);
        }, 1600);
      }
      return;
    }
    if (key === "DEL") {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, guesses, gameState, solution]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleKey("ENTER");
      else if (e.key === "Backspace") handleKey("DEL");
      else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const reset = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameState("playing");
    setRevealedRows(new Set());
    setMessage("");
    setGameKey(k => k + 1);
  };

  const renderTile = (letter: string, state: TileState, rowIdx: number, colIdx: number, revealed: boolean) => {
    const delay = revealed ? colIdx * 0.3 : 0;
    return (
      <div
        key={`${rowIdx}-${colIdx}`}
        className={`w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] flex items-center justify-center text-2xl font-bold rounded-lg border-2 transition-all duration-500 ${TILE_COLORS[state]}`}
        style={{
          transitionDelay: revealed ? `${delay}s` : "0s",
          transform: revealed ? "rotateX(360deg)" : state === "active" ? "scale(1.05)" : "scale(1)",
        }}
      >
        {letter}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="flex items-center gap-2">
          {/* GUMI_ICON_PLACEHOLDER */}
          <Image src="/gumi-icon.png" alt="Gumi" width={28} height={28} />
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            Gumi Wordle
          </h2>
        </div>
        <button onClick={reset} className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors">
          New
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-bold animate-bounce">
          {message}
        </div>
      )}

      {/* Grid */}
      <div className={`flex flex-col gap-1.5 mb-6 ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
        {Array.from({ length: 6 }).map((_, rowIdx) => {
          const isGuessed = rowIdx < guesses.length;
          const isCurrent = rowIdx === guesses.length;
          const guess = isGuessed ? guesses[rowIdx] : isCurrent ? currentGuess : "";
          const revealed = revealedRows.has(rowIdx);

          return (
            <div key={rowIdx} className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, colIdx) => {
                const letter = guess[colIdx] || "";
                let state: TileState = "empty";
                if (isGuessed && revealed) {
                  state = getRowStates(guesses[rowIdx], solution)[colIdx];
                } else if (letter) {
                  state = "active";
                }
                return renderTile(letter, state, rowIdx, colIdx, isGuessed && revealed);
              })}
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="flex flex-col gap-1.5 w-full max-w-[484px]">
        {KEYBOARD.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1">
            {row.map(key => {
              const ks = keyStates.get(key);
              const colorClass = ks ? KEY_COLORS[ks] : "bg-[var(--bg-secondary)] text-[var(--text-primary)]";
              const isWide = key === "ENTER" || key === "DEL";
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  className={`${isWide ? "px-3 text-xs" : "w-[32px] sm:w-[36px]"} h-[46px] rounded-md font-semibold text-sm transition-colors hover:opacity-80 ${colorClass}`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Game over overlay */}
      {gameState !== "playing" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={reset}>
          <div className="bg-[var(--card-bg)] rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* GUMI_ICON_PLACEHOLDER */}
            <Image src="/gumi-icon.png" alt="Gumi" width={64} height={64} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {gameState === "won" ? "Sweet Victory!" : "Better Luck Next Time!"}
            </h3>
            <p className="text-[var(--text-secondary)] mb-1">The word was <span className="font-bold text-[var(--text-primary)]">{solution}</span></p>
            {gameState === "won" && (
              <p className="text-[var(--text-tertiary)] text-sm mb-4">Solved in {guesses.length}/6 guesses</p>
            )}
            <button onClick={reset} className="mt-4 px-6 py-2.5 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-opacity">
              Play Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
