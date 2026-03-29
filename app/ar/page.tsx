"use client";

import { useState, useRef, useCallback, useMemo, Suspense } from "react";
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

function ARPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { state } = useGummiBear();

  type PageState = "idle" | "loading" | "running" | "error" | "unconfigured";
  const [pageState, setPageState] = useState<PageState>(
    isSnapConfigured() ? "idle" : "unconfigured"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [lensReady, setLensReady] = useState(false);
  const [copied, setCopied] = useState(false);

  // Each time we need a fresh canvas, increment this key
  const [canvasKey, setCanvasKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const startingRef = useRef(false);

  const config = useMemo<GummiBearConfig>(() => ({
    hue: params.get("hue") ? parseInt(params.get("hue")!, 10) : state.config.hue,
    clothing: params.get("clothing") || state.config.clothing,
    accessory: params.get("accessory") || state.config.accessory,
    headwear: params.get("headwear") || state.config.headwear,
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const colorItem = GUMI_BEAR_ITEMS.find(
    (i) => i.category === "color" && i.hue === config.hue
  );
  const launchData = buildSnapLaunchData(config);

  const startSession = useCallback(async () => {
    if (startingRef.current) return;
    if (!canvasRef.current) return;
    startingRef.current = true;

    // Stop any previous session
    cleanupRef.current?.();
    cleanupRef.current = null;

    setPageState("loading");
    setLensReady(false);

    const cleanup = await startCameraKitSession(canvasRef.current, config, (err) => {
      let msg = err.message;
      if (msg.includes("Permission") || msg.includes("NotAllowed")) {
        msg = "Camera access denied. Please allow camera access and try again.";
      } else if (msg.includes("401") || msg.includes("403") || msg.includes("apiToken")) {
        msg = "Invalid Snap API token. Check your .env.local file.";
      } else if (msg.includes("transferControlToOffscreen") || msg.includes("InvalidState")) {
        msg = "Camera couldn't start. Please tap Try Again.";
      }
      setErrorMsg(msg);
      setPageState("error");
      startingRef.current = false;
    });

    cleanupRef.current = cleanup;
    setPageState("running");
    setTimeout(() => setLensReady(true), 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRetry = useCallback(() => {
    startingRef.current = false;
    cleanupRef.current?.();
    cleanupRef.current = null;
    setCanvasKey(k => k + 1);
    // Small delay to let the new canvas mount
    setTimeout(startSession, 50);
  }, [startSession]);

  const buildShareUrl = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const p = new URLSearchParams({ hue: String(config.hue) });
    if (config.clothing) p.set("clothing", config.clothing);
    if (config.accessory) p.set("accessory", config.accessory);
    if (config.headwear) p.set("headwear", config.headwear);
    return `${base}/ar?${p.toString()}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-5 pb-3 bg-gradient-to-b from-black/70 to-transparent">
        <button
          onClick={() => { cleanupRef.current?.(); router.back(); }}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <Image src="/gummi-icon.png" alt="Gummi" width={20} height={34} />
          <span className="text-white text-xl tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700 }}>
            Gummi AR
          </span>
        </div>

        <button onClick={handleCopyLink} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/25 transition-colors">
          {copied
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          }
          <span className="text-white text-xs font-medium">{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>

      {/* Canvas — fresh element each time canvasKey changes */}
      <canvas
        key={canvasKey}
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: pageState === "running" ? "block" : "none" }}
      />

      {/* Loading */}
      <AnimatePresence>
        {pageState === "loading" && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <GummiBear config={config} size={100} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white" />
            <p className="text-white/60 text-sm">Starting AR camera…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle */}
      {pageState === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <GummiBear config={config} size={120} />
          </motion.div>
          <div>
            <h2 className="text-white text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Your Bear in AR
            </h2>
            <p className="text-white/60 text-sm">
              Your {colorItem?.name ?? "Cherry"} bear will appear alongside you.
            </p>
          </div>
          <button onClick={startSession} className="px-8 py-3.5 rounded-full font-semibold text-black text-sm"
            style={{ background: "linear-gradient(135deg, #FFFC00, #FF6B35, #FF0099)" }}>
            Start Camera
          </button>
        </div>
      )}

      {/* Error */}
      {pageState === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-white text-base font-semibold">AR couldn't start</p>
          <p className="text-white/60 text-sm leading-relaxed">{errorMsg}</p>
          <button onClick={handleRetry} className="mt-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
            Try Again
          </button>
        </div>
      )}

      {/* Unconfigured */}
      {pageState === "unconfigured" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <GummiBear config={config} size={110} />
          </motion.div>
          <div>
            <h2 className="text-white text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Almost There</h2>
            <p className="text-white/60 text-sm leading-relaxed">Add your Snap credentials to enable the live AR camera.</p>
          </div>
          {SNAP_LENS_ID && (
            <a href={buildLensDeepLink()} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition-colors">
              Open in Snapchat
            </a>
          )}
        </div>
      )}

      {/* Running overlay */}
      <AnimatePresence>
        {pageState === "running" && lensReady && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 pb-10 px-4 bg-gradient-to-t from-black/60 to-transparent pt-16 flex flex-col items-center gap-3">
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

export default function ARPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white" />
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
