"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { updatePacmanScore } from "@/lib/game-scores";
import { CURRENT_USER, MOCK_USERS } from "@/lib/mock-users";
import PostGameLeaderboard from "@/components/PostGameLeaderboard";

// 0=pellet, 1=wall, 2=empty, 3=power pellet
const MAZE_TEMPLATE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,3,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,3,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,2,1,2,1,1,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,2,2,2,2,2,2,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,1,1,2,1,1,2,1,0,1,1,1,1],
  [2,2,2,2,0,2,2,1,2,2,2,1,2,2,0,2,2,2,2],
  [1,1,1,1,0,1,2,1,1,1,1,1,2,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,2,2,2,2,2,2,1,0,1,1,1,1],
  [1,1,1,1,0,1,2,1,1,1,1,1,2,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,3,0,1,0,0,0,0,0,2,0,0,0,0,0,1,0,3,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const ROWS = MAZE_TEMPLATE.length;
const COLS = MAZE_TEMPLATE[0].length;

type Dir = "up" | "down" | "left" | "right";
const DX: Record<Dir, number> = { left: -1, right: 1, up: 0, down: 0 };
const DY: Record<Dir, number> = { up: -1, down: 1, left: 0, right: 0 };

const GHOST_COLORS = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb852"];

type Ghost = {
  x: number; y: number; dir: Dir; speed: number;
  homeX: number; homeY: number; scared: boolean; eaten: boolean;
  scatterTarget: { x: number; y: number };
};

function isWall(maze: number[][], gx: number, gy: number): boolean {
  // Wrap horizontally for tunnel
  const wx = ((gx % COLS) + COLS) % COLS;
  if (gy < 0 || gy >= ROWS) return true;
  return maze[gy][wx] === 1;
}

function canMove(maze: number[][], x: number, y: number, dir: Dir): boolean {
  return !isWall(maze, x + DX[dir], y + DY[dir]);
}

export default function GummiPacmanGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "won" | "lost">("menu");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const gRef = useRef({
    maze: MAZE_TEMPLATE.map(row => [...row]),
    px: 9, py: 15, pDir: "left" as Dir, pNextDir: null as Dir | null,
    pMoving: false, pMouthOpen: 0,
    ghosts: [] as Ghost[],
    score: 0, lives: 3, level: 1,
    totalPellets: 0, pelletsEaten: 0,
    powerTimer: 0, state: "menu" as string,
    animFrame: 0,
    gummiImg: null as HTMLImageElement | null,
    moveTimer: 0,
    ghostMoveTimer: 0,
    deathPause: 0,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = "/gummi-icon.png";
    img.onload = () => { gRef.current.gummiImg = img; };
  }, []);

  const initGame = useCallback(() => {
    const r = gRef.current;
    r.maze = MAZE_TEMPLATE.map(row => [...row]);
    r.px = 9; r.py = 15; r.pDir = "left"; r.pNextDir = null; r.pMoving = true;
    r.score = 0; r.lives = 3; r.level = 1;
    r.powerTimer = 0; r.moveTimer = 0; r.ghostMoveTimer = 0;
    r.pelletsEaten = 0;
    r.totalPellets = 0;
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      if (r.maze[y][x] === 0 || r.maze[y][x] === 3) r.totalPellets++;
    }
    r.ghosts = [
      { x: 9, y: 9, dir: "up", speed: 1, homeX: 9, homeY: 9, scared: false, eaten: false, scatterTarget: { x: COLS - 2, y: 0 } },
      { x: 8, y: 9, dir: "up", speed: 1, homeX: 8, homeY: 9, scared: false, eaten: false, scatterTarget: { x: 1, y: 0 } },
      { x: 10, y: 9, dir: "up", speed: 1, homeX: 10, homeY: 9, scared: false, eaten: false, scatterTarget: { x: COLS - 2, y: ROWS - 1 } },
      { x: 9, y: 8, dir: "down", speed: 0.9, homeX: 9, homeY: 8, scared: false, eaten: false, scatterTarget: { x: 1, y: ROWS - 1 } },
    ];
    r.state = "playing";
    setScore(0); setLives(3); setLevel(1); setGameState("playing");
  }, []);

  const resetPositions = useCallback(() => {
    const r = gRef.current;
    r.px = 9; r.py = 15; r.pDir = "left"; r.pNextDir = null; r.pMoving = true;
    r.moveTimer = 0; r.ghostMoveTimer = 0;
    r.ghosts.forEach((g, i) => {
      g.x = [9, 8, 10, 9][i]; g.y = [9, 9, 9, 8][i];
      g.dir = i < 3 ? "up" : "down"; g.scared = false; g.eaten = false;
    });
    r.powerTimer = 0;
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const r = gRef.current;
      if (r.state !== "playing") return;
      const map: Record<string, Dir> = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
      const dir = map[e.key];
      if (dir) { e.preventDefault(); r.pNextDir = dir; }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let running = true;
    let lastTime = performance.now();

    const MOVE_INTERVAL = 0.15; // seconds per cell move
    const GHOST_INTERVAL = 0.18;

    const loop = (time: number) => {
      if (!running) return;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const r = gRef.current;

      // Responsive canvas sizing
      const container = canvas.parentElement!;
      const maxCellW = Math.floor(container.clientWidth / COLS);
      const maxCellH = Math.floor((container.clientHeight - 10) / ROWS);
      const CELL = Math.min(maxCellW, maxCellH, 28);
      if (CELL < 2) { gRef.current.animFrame = requestAnimationFrame(loop); return; }
      canvas.width = COLS * CELL;
      canvas.height = ROWS * CELL;

      if (r.state === "playing") {
        // Death pause — freeze briefly after losing a life
        if (r.deathPause > 0) {
          r.deathPause -= dt;
          // skip to draw
        } else {
        r.pMouthOpen += dt * 8;

        // Player movement
        r.moveTimer += dt;
        if (r.moveTimer >= MOVE_INTERVAL) {
          r.moveTimer -= MOVE_INTERVAL;
          // Try next direction
          if (r.pNextDir && canMove(r.maze, r.px, r.py, r.pNextDir)) {
            r.pDir = r.pNextDir; r.pNextDir = null;
          }
          if (canMove(r.maze, r.px, r.py, r.pDir)) {
            r.px += DX[r.pDir]; r.py += DY[r.pDir];
            // Tunnel wrap
            r.px = ((r.px % COLS) + COLS) % COLS;
          }
          // Eat pellet
          const cell = r.maze[r.py]?.[r.px];
          if (cell === 0) {
            r.maze[r.py][r.px] = 2; r.score += 10; r.pelletsEaten++;
            setScore(r.score);
          } else if (cell === 3) {
            r.maze[r.py][r.px] = 2; r.score += 50; r.pelletsEaten++;
            r.powerTimer = 8;
            r.ghosts.forEach(g => { if (!g.eaten) g.scared = true; });
            setScore(r.score);
          }
          // Win check
          if (r.pelletsEaten >= r.totalPellets) {
            r.state = "won"; 
            setGameState("won");
            setFinalScore(r.score);
            updatePacmanScore(CURRENT_USER.id, r.score);
            setShowLeaderboard(true);
          }
        }

        // Ghost movement
        r.ghostMoveTimer += dt;
        if (r.ghostMoveTimer >= GHOST_INTERVAL) {
          r.ghostMoveTimer -= GHOST_INTERVAL;
          for (const ghost of r.ghosts) {
            if (ghost.eaten) {
              // Move toward home
              const dirs: Dir[] = ["up", "down", "left", "right"];
              const valid = dirs.filter(d => canMove(r.maze, ghost.x, ghost.y, d));
              if (valid.length > 0) {
                let bestDir = valid[0], bestDist = Infinity;
                for (const d of valid) {
                  const nx = ghost.x + DX[d], ny = ghost.y + DY[d];
                  const dist = Math.abs(nx - ghost.homeX) + Math.abs(ny - ghost.homeY);
                  if (dist < bestDist) { bestDist = dist; bestDir = d; }
                }
                ghost.x += DX[bestDir]; ghost.y += DY[bestDir]; ghost.dir = bestDir;
                ghost.x = ((ghost.x % COLS) + COLS) % COLS;
              }
              if (ghost.x === ghost.homeX && ghost.y === ghost.homeY) { ghost.eaten = false; ghost.scared = false; }
              continue;
            }
            const dirs: Dir[] = ["up", "down", "left", "right"];
            const opposite: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
            const valid = dirs.filter(d => d !== opposite[ghost.dir] && canMove(r.maze, ghost.x, ghost.y, d));
            if (valid.length === 0) {
              // Dead end, reverse
              if (canMove(r.maze, ghost.x, ghost.y, opposite[ghost.dir])) {
                ghost.dir = opposite[ghost.dir];
                ghost.x += DX[ghost.dir]; ghost.y += DY[ghost.dir];
              }
            } else if (ghost.scared) {
              // Random movement when scared
              const d = valid[Math.floor(Math.random() * valid.length)];
              ghost.x += DX[d]; ghost.y += DY[d]; ghost.dir = d;
            } else {
              // Ghost 0 & 1 chase player directly, ghost 2 aims ahead, ghost 3 scatters
              const chases = ghost === r.ghosts[0] || ghost === r.ghosts[1];
              const ambush = ghost === r.ghosts[2];
              const targetX = chases ? r.px : ambush ? r.px + DX[r.pDir] * 4 : ghost.scatterTarget.x;
              const targetY = chases ? r.py : ambush ? r.py + DY[r.pDir] * 4 : ghost.scatterTarget.y;
              let bestDir = valid[0], bestDist = Infinity;
              for (const d of valid) {
                const nx = ghost.x + DX[d], ny = ghost.y + DY[d];
                const dist = Math.abs(nx - targetX) + Math.abs(ny - targetY);
                if (dist < bestDist) { bestDist = dist; bestDir = d; }
              }
              ghost.x += DX[bestDir]; ghost.y += DY[bestDir]; ghost.dir = bestDir;
            }
            ghost.x = ((ghost.x % COLS) + COLS) % COLS;
          }
        }

        // Power timer
        if (r.powerTimer > 0) {
          r.powerTimer -= dt;
          if (r.powerTimer <= 0) {
            r.ghosts.forEach(g => { g.scared = false; });
          }
        }

        // Collision check
        for (const ghost of r.ghosts) {
          if (ghost.x === r.px && ghost.y === r.py) {
            if (ghost.scared && !ghost.eaten) {
              ghost.eaten = true; r.score += 200; setScore(r.score);
            } else if (!ghost.eaten) {
              r.lives--; setLives(r.lives);
              if (r.lives <= 0) { 
                r.state = "lost"; 
                setGameState("lost");
                setFinalScore(r.score);
                updatePacmanScore(CURRENT_USER.id, r.score);
                setShowLeaderboard(true);
              }
              else { resetPositions(); r.deathPause = 1.0; }
              break;
            }
          }
        }
        } // end else (deathPause)
      }

      // --- DRAW ---
      ctx.fillStyle = "#0d0a1a"; ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Maze
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cell = r.maze[y][x];
          const cx = x * CELL, cy = y * CELL;
          if (cell === 1) {
            ctx.fillStyle = "#1e1250";
            ctx.fillRect(cx, cy, CELL, CELL);
            // Border glow
            ctx.strokeStyle = "#6b3fa0";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(cx + 1, cy + 1, CELL - 2, CELL - 2);
          } else if (cell === 0) {
            // Pellet
            ctx.fillStyle = "#ffd93d";
            ctx.beginPath(); ctx.arc(cx + CELL / 2, cy + CELL / 2, CELL * 0.12, 0, Math.PI * 2); ctx.fill();
          } else if (cell === 3) {
            // Power pellet (pulsing)
            const pulse = 0.8 + 0.2 * Math.sin(time * 0.005);
            ctx.fillStyle = "#ff6b9d";
            ctx.beginPath(); ctx.arc(cx + CELL / 2, cy + CELL / 2, CELL * 0.3 * pulse, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      // Player (Gummi icon)
      const pcx = r.px * CELL + CELL / 2, pcy = r.py * CELL + CELL / 2;
      if (r.gummiImg) {
        const size = CELL * 0.85;
        ctx.drawImage(r.gummiImg, pcx - size / 2, pcy - size / 2, size, size);
      } else {
        ctx.fillStyle = "#ffd93d";
        ctx.beginPath(); ctx.arc(pcx, pcy, CELL * 0.4, 0, Math.PI * 2); ctx.fill();
      }

      // Ghosts
      for (let i = 0; i < r.ghosts.length; i++) {
        const ghost = r.ghosts[i];
        const gx = ghost.x * CELL + CELL / 2, gy = ghost.y * CELL + CELL / 2;
        const size = CELL * 0.8;

        if (ghost.eaten) {
          // Just eyes
          ctx.fillStyle = "white";
          ctx.beginPath(); ctx.arc(gx - size * 0.15, gy - size * 0.05, size * 0.12, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(gx + size * 0.15, gy - size * 0.05, size * 0.12, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#111";
          ctx.beginPath(); ctx.arc(gx - size * 0.15, gy - size * 0.05, size * 0.06, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(gx + size * 0.15, gy - size * 0.05, size * 0.06, 0, Math.PI * 2); ctx.fill();
        } else {
          const color = ghost.scared
            ? (r.powerTimer < 2 && Math.sin(time * 0.02) > 0 ? "white" : "#2233ff")
            : GHOST_COLORS[i];
          // Ghost body
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(gx, gy - size * 0.1, size * 0.4, Math.PI, 0);
          ctx.lineTo(gx + size * 0.4, gy + size * 0.3);
          // Wavy bottom
          const wave = Math.sin(time * 0.01) * size * 0.06;
          ctx.lineTo(gx + size * 0.27, gy + size * 0.2 + wave);
          ctx.lineTo(gx + size * 0.13, gy + size * 0.3);
          ctx.lineTo(gx, gy + size * 0.2 - wave);
          ctx.lineTo(gx - size * 0.13, gy + size * 0.3);
          ctx.lineTo(gx - size * 0.27, gy + size * 0.2 + wave);
          ctx.lineTo(gx - size * 0.4, gy + size * 0.3);
          ctx.closePath();
          ctx.fill();
          // Eyes
          ctx.fillStyle = "white";
          ctx.beginPath(); ctx.arc(gx - size * 0.15, gy - size * 0.12, size * 0.13, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(gx + size * 0.15, gy - size * 0.12, size * 0.13, 0, Math.PI * 2); ctx.fill();
          if (!ghost.scared) {
            ctx.fillStyle = "#111";
            const edx = DX[ghost.dir] * size * 0.04, edy = DY[ghost.dir] * size * 0.04;
            ctx.beginPath(); ctx.arc(gx - size * 0.15 + edx, gy - size * 0.12 + edy, size * 0.06, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(gx + size * 0.15 + edx, gy - size * 0.12 + edy, size * 0.06, 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.fillStyle = "#111";
            ctx.beginPath(); ctx.arc(gx - size * 0.15, gy - size * 0.12, size * 0.06, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(gx + size * 0.15, gy - size * 0.12, size * 0.06, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      gRef.current.animFrame = requestAnimationFrame(loop);
    };

    gRef.current.animFrame = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(gRef.current.animFrame); };
  }, [resetPositions]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full px-4 py-3 z-10">
        <button 
          onClick={() => {
            // Save the final score before going back
            if (score > 0) {
              updatePacmanScore(CURRENT_USER.id, score);
            }
            onBack();
          }} 
          className="p-2 rounded-lg hover:bg-(--bg-secondary) transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="flex items-center gap-2">
          {/* GUMI_ICON_PLACEHOLDER */}
          <Image src="/gummi-icon.png" alt="Gummi" width={24} height={24} />
          <span className="text-lg font-bold text-(--text-primary)" style={{ fontFamily: "var(--font-cormorant), serif" }}>Gummi Pac</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-(--text-primary)">{score}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < lives ? "" : "opacity-20"}`}>💗</span>
            ))}
          </div>
        </div>
      </div>

      {/* Game area */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="block" />

        {/* Menu */}
        {gameState === "menu" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <Image src="/gummi-icon.png" alt="Gummi" width={72} height={72} className="mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Gummi Pac</h2>
              <p className="text-white/60 text-sm mb-6">Eat all the gummy candies!</p>
              <p className="text-white/40 text-xs mb-4">Use arrow keys or WASD</p>
              <button onClick={initGame} className="px-8 py-3 rounded-full bg-linear-to-r from-amber-400 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Won */}
        {gameState === "won" && !showLeaderboard && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <Image src="/gummi-icon.png" alt="Gummi" width={72} height={72} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Level Clear!</h2>
              <p className="text-amber-400 text-lg font-bold mb-4">Score: {score}</p>
              <button onClick={initGame} className="px-8 py-3 rounded-full bg-linear-to-r from-emerald-400 to-cyan-500 text-white font-bold hover:scale-105 transition-transform shadow-lg">
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Lost */}
        {gameState === "lost" && !showLeaderboard && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <Image src="/gummi-icon.png" alt="Gummi" width={64} height={64} className="mx-auto mb-4 grayscale" />
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Game Over</h2>
              <p className="text-white/80 text-lg mb-4">Score: <span className="text-amber-400 font-bold">{score}</span></p>
              <button onClick={initGame} className="px-8 py-3 rounded-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-transform shadow-lg">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Post-game leaderboard */}
        <AnimatePresence>
          {showLeaderboard && (
            <PostGameLeaderboard
              game="pacman"
              finalScore={finalScore}
              users={MOCK_USERS.filter((u) => u.id !== CURRENT_USER.id)}
              onClose={() => {
                setShowLeaderboard(false);
                setGameState("menu");
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
