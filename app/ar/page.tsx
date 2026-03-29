"use client";

/**
 * /ar — Standalone AR page
 *
 * This page runs the Camera Kit session full-screen in the browser.
 * It reads the user's bear config from localStorage (GummiBearProvider)
 * and passes it directly to the Camera Kit session.
 *
 * URL: /ar
 *
 * Also supports URL params for sharing a specific config:
 *   /ar?hue=140&clothing=clothing-hoodie&accessory=acc-glasses&headwear=hat-crown
 *
 * This allows "share my bear in AR" deep links from the web app.
 */

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GummiBearConfig } from "@/types/gummi-bear";
import { useGummiBear } from "@/lib/gummi-bear-context";
import {
  isSnapConfigured,
  startCameraKitSession,
  buildSnapLaunchData,
  buildLensDeepLink,
  SNAP_LENS_ID,
} from "@/lib/snap-ar";
import { GUMI_BEAR_ITEMS } from "@/lib/gummi-bear-items";
import GummiBear from "@/components/GummiBear/GummiBear";

// ─── Inner component (uses hooks that require Suspense) ───────────────────────

function ARPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { state } = useGummiBear();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  type PageState = "idle" | "loading" | "running" | "error" | "unconfigured";
  const [pageState, setPageState] = useState<PageState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [lensReady, setLensReady] = useState(false);

  // Resolve bear config: URL params override localStorage (for sharing)
  const config: GummiBearConfig = {
    hue: params.get("hue") ? parseInt(params.get("hue")!, 10) : state.config.hue,
    clothing: params.get("clothing") || state.config.clothing,
    accessory: params.get("accessory") || state.config.accessory,
    headwear: params.get("headwear") || state.config.headwear,
  };

  const colorItem = GUMI_BEAR_ITEMS.find(
    (i) => i.category === "color" && i.hue === config.hue
  );
  const launchData = buildSnapLaunchData(config);

  const startSession = useCallback(async () => {
    if (!canvasRef.current) return;
    cleanupRef.current?.();
    setPageState("loading");
    setLensReady(false);

    const cleanup = await startCameraKitSession(canvasRef.current, config, (err) => {
      let msg = err.message;
      if (msg.includes("Permission") || msg.includes("NotAllowed")) {
        msg = "Camera access denied. Please allow camera access and try again.";
      } else if (msg.includes("401") || msg.includes("403") || msg.includes("apiToken")) {
        msg = "Invalid Snap API token. Check your .env.local file.";
      } else if (msg.includes("lens") || msg.includes("loadLens")) {
        msg = "Lens not found. Verify SNAP_LENS_ID and SNAP_LENS_GROUP_ID.";
      }
      setErrorMsg(msg);
      setPageState("error");
    });

    cleanupRef.current = cleanup;
    setPageState("running");
    setTimeout(() => setLensReady(true), 1000);
  }, [config]);

  useEffect(() => {
    if (!isSnapConfigured()) {
      setPageState("unconfigured");
      return;
    }
    startSession();
    return () => { cleanupRef.current?.(); };
  }, [startSession]);

  // ─── Build shareable URL for this bear config ───────────────────────────
  const buildShareUrl = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const p = new URLSearchParams({
      hue: String(config.hue),
      ...(config.clothing ? { clothing: config.clothing } : {}),
      ...(config.accessory ? { accessory: config.accessory } : {}),
      ...(config.headwear ? { headwear: config.headwear } : {}),
    });
    return `${base}/ar?${p.toString()}`;
  };

  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black flex flex-col">

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-5 pb-3 bg-gradient-to-b from-black/70 to-transparent">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
          aria-label="Go back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <Image src="/gummi-icon.png" alt="Gummi" width={20} height={34} />
          <span
            className="text-white text-xl tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}
          >
            Gummi AR
          </span>
        </div>

        {/* Share bear config */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/25 transition-colors"
          aria-label="Copy share link"
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          )}
          <span className="text-white text-xs font-medium">{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>

      {/* Camera Kit canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: pageState === "running" ? "block" : "none" }}
      />

      {/* Loading */}
      <AnimatePresence>
        {pageState === "loading" && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          >
            <GummiBear config={config} size={100} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white"
            />
            <p className="text-white/60 text-sm">Starting AR camera…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle (before click to start) */}
      {pageState === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <GummiBear config={config} size={120} />
          </motion.div>
          <div>
            <h2 className="text-white text-2xl font-semibold mb-2"
              style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Your Bear in AR
            </h2>
            <p className="text-white/60 text-sm">
              Your {colorItem?.name ?? "Cherry"} bear will appear alongside you
              {config.headwear || config.clothing || config.accessory ? " — fully dressed" : ""}.
            </p>
          </div>
          <button
            onClick={startSession}
            className="px-8 py-3.5 rounded-full font-semibold text-black text-sm"
            style={{ background: "linear-gradient(135deg, #FFFC00, #FF6B35, #FF0099)" }}
          >
            Start Camera
          </button>
        </div>
      )}

      {/* Error */}
      {pageState === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-white text-base font-semibold">AR couldn't start</p>
          <p className="text-white/60 text-sm leading-relaxed">{errorMsg}</p>
          <button onClick={startSession}
            className="mt-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
            Try Again
          </button>
        </div>
      )}

      {/* Unconfigured */}
      {pageState === "unconfigured" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <GummiBear config={config} size={110} />
          </motion.div>

          <div>
            <h2 className="text-white text-2xl font-semibold mb-2"
              style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Almost There
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Add your Snap credentials to enable the live AR camera.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl px-5 py-4 text-left w-full max-w-sm">
            <p className="text-white/50 text-xs font-mono mb-3">Add to .env.local:</p>
            {[
              ["NEXT_PUBLIC_SNAP_API_TOKEN", "your_staging_token"],
              ["NEXT_PUBLIC_SNAP_LENS_ID", "your_lens_uuid"],
              ["NEXT_PUBLIC_SNAP_LENS_GROUP_ID", "your_group_id"],
            ].map(([key, val]) => (
              <div key={key} className="mb-1.5">
                <span className="text-yellow-300/80 text-xs font-mono">{key}</span>
                <span className="text-white/30 text-xs font-mono">={val}</span>
              </div>
            ))}
          </div>

          {/* Deep link fallback if lens ID is at least set */}
          {SNAP_LENS_ID && (
            <a
              href={buildLensDeepLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.029 12.017.029z" />
              </svg>
              Open in Snapchat
            </a>
          )}

          <p className="text-white/30 text-xs">See SNAP_AR_SETUP.md for full instructions</p>
        </div>
      )}

      {/* Running overlay */}
      <AnimatePresence>
        {pageState === "running" && lensReady && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 pb-10 px-4 bg-gradient-to-t from-black/60 to-transparent pt-16 flex flex-col items-center gap-3"
          >
            {/* Active outfit badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <OutfitBadge label={colorItem?.name ?? "Cherry"} color={`hsl(${config.hue}, 70%, 55%)`} />
              {launchData.clothing && <OutfitBadge label={itemName(launchData.clothing)} />}
              {launchData.accessory && <OutfitBadge label={itemName(launchData.accessory)} />}
              {launchData.headwear && <OutfitBadge label={itemName(launchData.headwear)} />}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <p className="text-white/50 text-xs">Powered by Snap Camera Kit</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Exported page (wrapped in Suspense for useSearchParams) ─────────────────

export default function ARPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white"
        />
      </div>
    }>
      <ARPageInner />
    </Suspense>
  );
}

function OutfitBadge({ label, color }: { label: string; color?: string }) {
  return (
    <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
      {color && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />}
      {label}
    </span>
  );
}

function itemName(id: string): string {
  return GUMI_BEAR_ITEMS.find((i) => i.id === id)?.name ?? id;
}
