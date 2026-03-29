"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { updateBlasterScore } from "@/lib/game-scores";
import { CURRENT_USER } from "@/lib/mock-users";
import PostGameLeaderboard from "@/components/PostGameLeaderboard";
import { MOCK_USERS } from "@/lib/mock-users";

type Enemy = {
  id: number;
  worldX: number;
  worldZ: number;
  speed: number;
  alive: boolean;
  size: number;
};

type Particle = {
  x: number; y: number; vx: number; vy: number; life: number; color: string;
};

type ScorePopup = {
  x: number; y: number; value: number; life: number;
};

type GameState = "menu" | "playing" | "gameover";

export default function GummyShooterGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("menu");
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [wave, setWave] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const g = useRef({
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    popups: [] as ScorePopup[],
    score: 0, health: 3, wave: 1,
    nextId: 0, spawnTimer: 0, spawnedThisWave: 0,
    mouseX: 0, mouseY: 0,
    muzzleFlash: 0, shakeTimer: 0,
    state: "menu" as GameState,
    gummiImg: null as HTMLImageElement | null,
    animFrame: 0,
    stars: [] as { x: number; y: number; s: number; b: number }[],
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = "/gummi-icon.png";
    img.onload = () => { g.current.gummiImg = img; };
    // Generate stars
    g.current.stars = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random() * 0.55, s: 0.5 + Math.random() * 1.5, b: 0.3 + Math.random() * 0.7,
    }));
    const saved = localStorage.getItem("gummi-shooter-high");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const waveTarget = (w: number) => 3 + w * 2;

  const startGame = useCallback(() => {
    const r = g.current;
    r.enemies = []; r.particles = []; r.popups = [];
    r.score = 0; r.health = 3; r.wave = 1;
    r.nextId = 0; r.spawnTimer = 0; r.spawnedThisWave = 0;
    r.muzzleFlash = 0; r.shakeTimer = 0; r.state = "playing";
    setScore(0); setHealth(3); setWave(1); setGameState("playing");
  }, []);

  const endGame = useCallback(() => {
    const r = g.current;
    r.state = "gameover";
    setGameState("gameover");
    setFinalScore(r.score);
    if (r.score > highScore) {
      setHighScore(r.score);
      localStorage.setItem("gummi-shooter-high", String(r.score));
    }
    updateBlasterScore(CURRENT_USER.id, r.score);
    setShowLeaderboard(true);
  }, [highScore]);

  const spawnEnemy = useCallback(() => {
    const r = g.current;
    r.enemies.push({
      id: r.nextId++,
      worldX: (Math.random() - 0.5) * 10,
      worldZ: 14 + Math.random() * 12,
      speed: 1.8 + r.wave * 0.25 + Math.random() * 0.6,
      alive: true,
      size: 0.9 + Math.random() * 0.4,
    });
    r.spawnedThisWave++;
  }, []);

  // Handle shoot
  const handleShoot = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const r = g.current;
    if (!canvas || r.state !== "playing") return;
    const rect = canvas.getBoundingClientRect();
    const cx = (clientX - rect.left) * (canvas.width / rect.width);
    const cy = (clientY - rect.top) * (canvas.height / rect.height);
    r.muzzleFlash = 1;
    r.shakeTimer = 0.08;

    const W = canvas.width, H = canvas.height;
    const fl = W * 0.5, centerX = W / 2, horizonY = H * 0.55;

    const sorted = r.enemies.filter(e => e.alive).sort((a, b) => a.worldZ - b.worldZ);
    for (const enemy of sorted) {
      const sx = centerX + (enemy.worldX * fl) / enemy.worldZ;
      const sy = horizonY - (1.0 * fl) / enemy.worldZ;
      const ss = (enemy.size * fl) / enemy.worldZ;
      const dx = cx - sx, dy = cy - sy;
      if (Math.sqrt(dx * dx + dy * dy) < ss * 0.65) {
        enemy.alive = false;
        const pts = Math.floor(10 + enemy.worldZ * 2);
        r.score += pts; setScore(r.score);
        r.popups.push({ x: sx, y: sy, value: pts, life: 1 });
        for (let i = 0; i < 10; i++) {
          r.particles.push({
            x: sx, y: sy,
            vx: (Math.random() - 0.5) * 400, vy: (Math.random() - 0.5) * 400,
            life: 0.4 + Math.random() * 0.3,
            color: ["#ff6b9d","#ffd93d","#6bcb77","#4d96ff","#ff9ff3"][Math.floor(Math.random() * 5)],
          });
        }
        break;
      }
    }
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.clientWidth * 1.5; canvas.height = canvas.clientHeight * 1.5; };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = performance.now();
    let running = true;

    const loop = (time: number) => {
      if (!running) return;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const r = g.current;
      const W = canvas.width, H = canvas.height;
      const fl = W * 0.5, centerX = W / 2, horizonY = H * 0.55;

      if (r.state === "playing") {
        // Spawn
        const interval = Math.max(0.4, 1.8 - r.wave * 0.1);
        r.spawnTimer += dt;
        if (r.spawnTimer > interval && r.spawnedThisWave < waveTarget(r.wave)) {
          r.spawnTimer = 0; spawnEnemy();
        }
        // Update enemies
        for (const e of r.enemies) {
          if (!e.alive) continue;
          e.worldZ -= e.speed * dt;
          if (e.worldZ < 0.8) {
            e.alive = false; r.health--; setHealth(r.health);
            r.shakeTimer = 0.3;
            if (r.health <= 0) endGame();
          }
        }
        // Wave check
        const alive = r.enemies.filter(e => e.alive).length;
        if (r.spawnedThisWave >= waveTarget(r.wave) && alive === 0) {
          r.wave++; setWave(r.wave);
          r.enemies = []; r.spawnedThisWave = 0; r.spawnTimer = -1.0;
        }
        // Update particles
        for (const p of r.particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; p.life -= dt; }
        r.particles = r.particles.filter(p => p.life > 0);
        for (const p of r.popups) { p.y -= 60 * dt; p.life -= dt; }
        r.popups = r.popups.filter(p => p.life > 0);
        r.muzzleFlash = Math.max(0, r.muzzleFlash - dt * 12);
        r.shakeTimer = Math.max(0, r.shakeTimer - dt);
      }

      // --- DRAW ---
      const sx = r.shakeTimer > 0 ? (Math.random() - 0.5) * 6 : 0;
      const sy = r.shakeTimer > 0 ? (Math.random() - 0.5) * 6 : 0;
      ctx.save(); ctx.translate(sx, sy);

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, "#0d0221"); sky.addColorStop(0.5, "#2a0845"); sky.addColorStop(1, "#6b2fa0");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, horizonY);

      // Stars
      for (const star of r.stars) {
        ctx.fillStyle = `rgba(255,255,255,${star.b * (0.5 + 0.5 * Math.sin(time * 0.002 + star.x * 100))})`;
        ctx.beginPath(); ctx.arc(star.x * W, star.y * H, star.s, 0, Math.PI * 2); ctx.fill();
      }

      // Ground
      const grd = ctx.createLinearGradient(0, horizonY, 0, H);
      grd.addColorStop(0, "#3d1560"); grd.addColorStop(1, "#1a0a2e");
      ctx.fillStyle = grd; ctx.fillRect(0, horizonY, W, H - horizonY);

      // Ground grid
      ctx.strokeStyle = "rgba(139,92,246,0.12)"; ctx.lineWidth = 1;
      for (let z = 2; z < 30; z += 1.5) {
        const ly = horizonY + (2.0 * fl) / z;
        if (ly > H) continue;
        ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(W, ly); ctx.stroke();
      }
      for (let x = -12; x <= 12; x += 2) {
        ctx.beginPath();
        ctx.moveTo(centerX + (x * fl) / 2, horizonY);
        ctx.lineTo(centerX + (x * fl) / 30, H);
        ctx.stroke();
      }

      // Draw enemies (back to front)
      const sortedEnemies = r.enemies.filter(e => e.alive && e.worldZ > 0.5).sort((a, b) => b.worldZ - a.worldZ);
      for (const enemy of sortedEnemies) {
        const ex = centerX + (enemy.worldX * fl) / enemy.worldZ;
        const ey = horizonY - (1.0 * fl) / enemy.worldZ;
        const es = (enemy.size * fl) / enemy.worldZ;
        // Shadow
        const shadowY = horizonY + (0.5 * fl) / enemy.worldZ;
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath(); ctx.ellipse(ex, shadowY, es * 0.4, es * 0.1, 0, 0, Math.PI * 2); ctx.fill();
        // Glow
        if (enemy.worldZ < 5) {
          const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, es);
          glow.addColorStop(0, `rgba(255,107,157,${(5 - enemy.worldZ) / 5 * 0.3})`);
          glow.addColorStop(1, "rgba(255,107,157,0)");
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(ex, ey, es, 0, Math.PI * 2); ctx.fill();
        }
        // Enemy image
        if (r.gummiImg) {
          ctx.drawImage(r.gummiImg, ex - es / 2, ey - es / 2, es, es);
        } else {
          ctx.fillStyle = "#ff6b9d";
          ctx.beginPath(); ctx.arc(ex, ey, es / 2, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Particles
      for (const p of r.particles) {
        ctx.globalAlpha = Math.max(0, p.life * 2.5);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Score popups
      for (const p of r.popups) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = "#ffd93d"; ctx.font = `bold ${20}px sans-serif`; ctx.textAlign = "center";
        ctx.fillText(`+${p.value}`, p.x, p.y);
      }
      ctx.globalAlpha = 1;

      // Muzzle flash
      if (r.muzzleFlash > 0) {
        ctx.fillStyle = `rgba(255,255,200,${r.muzzleFlash * 0.25})`;
        ctx.fillRect(0, 0, W, H);
      }

      // Crosshair at mouse position
      const rect = canvas.getBoundingClientRect();
      const mx = r.mouseX * (W / rect.width);
      const my = r.mouseY * (H / rect.height);
      ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mx - 18, my); ctx.lineTo(mx - 6, my);
      ctx.moveTo(mx + 6, my); ctx.lineTo(mx + 18, my);
      ctx.moveTo(mx, my - 18); ctx.lineTo(mx, my - 6);
      ctx.moveTo(mx, my + 6); ctx.lineTo(mx, my + 18);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6b9d"; ctx.fill();

      ctx.restore();
      g.current.animFrame = requestAnimationFrame(loop);
    };

    g.current.animFrame = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(g.current.animFrame); window.removeEventListener("resize", resize); };
  }, [spawnEnemy, endGame]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full px-4 py-3 z-10">
        <button 
          onClick={() => {
            // Save the final wave score before going back
            if (wave > 0) {
              updateBlasterScore(CURRENT_USER.id, wave);
            }
            onBack();
          }} 
          className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="flex items-center gap-2">
          {/* GUMI_ICON_PLACEHOLDER */}
          <Image src="/gummi-icon.png" alt="Gummi" width={24} height={24} />
          <span className="text-lg font-bold text-(--text-primary)" style={{ fontFamily: "var(--font-cormorant), serif" }}>Gummy Blaster</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Game area */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-xl"
          style={{ cursor: gameState === "playing" ? "none" : "default" }}
          onClick={(e) => handleShoot(e.clientX, e.clientY)}
          onMouseMove={(e) => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) { g.current.mouseX = e.clientX - rect.left; g.current.mouseY = e.clientY - rect.top; }
          }}
        />

        {/* HUD */}
        {gameState === "playing" && (
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-white/60 text-xs">SCORE</p>
              <p className="text-white text-xl font-bold">{score}</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <p className="text-white/60 text-xs">WAVE</p>
              <p className="text-white text-xl font-bold">{wave}</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 flex gap-1 items-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={`text-lg ${i < health ? "opacity-100" : "opacity-20"}`}>
                  {/* GUMI_ICON_PLACEHOLDER - heart representation */}
                  {i < health ? "💗" : "🖤"}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Menu overlay */}
        {gameState === "menu" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl">
            <div className="text-center">
              {/* GUMI_ICON_PLACEHOLDER */}
              <Image src="/gummi-icon.png" alt="Gummi" width={80} height={80} className="mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Gummy Blaster</h2>
              <p className="text-white/60 text-sm mb-6">Defend against the gummy invasion!</p>
              {highScore > 0 && <p className="text-amber-400 text-sm mb-4">High Score: {highScore}</p>}
              <button onClick={startGame} className="px-8 py-3 rounded-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Game over overlay */}
        {gameState === "gameover" && !showLeaderboard && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
            <div className="text-center">
              {/* GUMI_ICON_PLACEHOLDER */}
              <Image src="/gummi-icon.png" alt="Gummi" width={64} height={64} className="mx-auto mb-4 grayscale" />
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Game Over</h2>
              <p className="text-white/80 text-lg mb-1">Score: <span className="font-bold text-amber-400">{score}</span></p>
              <p className="text-white/60 text-sm mb-1">Wave Reached: {wave}</p>
              {score >= highScore && score > 0 && <p className="text-amber-400 text-sm font-bold mb-4">New High Score!</p>}
              <button onClick={startGame} className="mt-4 px-8 py-3 rounded-full bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-transform shadow-lg">
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Post-game leaderboard */}
        <AnimatePresence>
          {showLeaderboard && (
            <PostGameLeaderboard
              game="blaster"
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
