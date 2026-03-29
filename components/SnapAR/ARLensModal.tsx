"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GummiBearConfig } from "@/types/gummi-bear";
import {
  isSnapConfigured,
  startCameraKitSession,
  buildSnapLaunchData,
  SNAP_LENS_ID,
} from "@/lib/snap-ar";
import { GUMI_BEAR_ITEMS } from "@/lib/gummi-bear-items";

type ARMode = "loading" | "running" | "error" | "unconfigured";

type ARLensModalProps = {
  config: GummiBearConfig;
  onClose: () => void;
};

export default function ARLensModal({ config, onClose }: ARLensModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [mode, setMode] = useState<ARMode>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [lensLoaded, setLensLoaded] = useState(false);

  const colorItem = GUMI_BEAR_ITEMS.find(
    (i) => i.category === "color" && i.hue === config.hue
  );
  const launchData = buildSnapLaunchData(config);

  const startSession = useCallback(async () => {
    if (!canvasRef.current) return;
    setMode("loading");
    setLensLoaded(false);

    const cleanup = await startCameraKitSession(
      canvasRef.current,
      config,
      (err) => {
        let msg = err.message;
        if (msg.includes("Permission denied") || msg.includes("NotAllowedError")) {
          msg = "Camera permission denied. Please allow camera access and try again.";
        } else if (msg.includes("apiToken") || msg.includes("401") || msg.includes("403")) {
          msg = "Snap API token invalid or missing. Check your .env.local file.";
        } else if (msg.includes("lens") || msg.includes("loadLens")) {
          msg = "Lens not found. Check your SNAP_LENS_ID and SNAP_LENS_GROUP_ID.";
        }
        setErrorMsg(msg);
        setMode("error");
      }
    );
    cleanupRef.current = cleanup;
    setMode("running");
    // Give Camera Kit a moment to render the first frame
    setTimeout(() => setLensLoaded(true), 800);
  }, [config]);

  useEffect(() => {
    if (!isSnapConfigured()) {
      setMode("unconfigured");
      return;
    }
    startSession();
    return () => {
      cleanupRef.current?.();
    };
  }, [startSession]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] bg-black flex flex-col items-center justify-center"
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4 pb-3 bg-gradient-to-b from-black/60 to-transparent">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors"
          aria-label="Close AR"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {/* Snap ghost logo */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.029 12.017.029z"/>
          </svg>
          <span className="text-white text-sm font-semibold tracking-wide">Gummi AR</span>
        </div>

        {/* Bear color badge */}
        <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: hueToCSS(config.hue) }}
          />
          <span className="text-white text-xs font-medium">{colorItem?.name ?? "Cherry"}</span>
        </div>
      </div>

      {/* Camera Kit canvas — always mounted so the session can attach */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ display: mode === "running" ? "block" : "none" }}
      />

      {/* Loading state */}
      <AnimatePresence>
        {mode === "loading" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white"
            />
            <p className="text-white/70 text-sm">Starting AR camera…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {mode === "error" && (
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
          <button
            onClick={startSession}
            className="mt-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Unconfigured state — shown when env vars are missing (dev only) */}
      {mode === "unconfigured" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <p className="text-white text-base font-semibold">Snap AR not configured</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Add your Snap credentials to <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/80 text-xs">.env.local</code> to enable Camera Kit.
          </p>
          <div className="mt-2 bg-white/10 rounded-xl px-4 py-3 text-left w-full max-w-xs">
            <p className="text-white/50 text-xs font-mono mb-2">Required env vars:</p>
            {[
              "NEXT_PUBLIC_SNAP_API_TOKEN",
              "NEXT_PUBLIC_SNAP_LENS_ID",
              "NEXT_PUBLIC_SNAP_LENS_GROUP_ID",
            ].map((key) => (
              <p key={key} className="text-yellow-300/80 text-xs font-mono">{key}</p>
            ))}
          </div>
          <p className="text-white/40 text-xs">See SNAP_AR_SETUP.md for full setup instructions.</p>
        </div>
      )}

      {/* Running — overlay badges once lens has loaded */}
      <AnimatePresence>
        {mode === "running" && lensLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 pb-10 px-4 flex flex-col items-center gap-3 bg-gradient-to-t from-black/60 to-transparent pt-16"
          >
            {/* Outfit tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {launchData.clothing && (
                <OutfitBadge label={itemLabel(launchData.clothing)} />
              )}
              {launchData.accessory && (
                <OutfitBadge label={itemLabel(launchData.accessory)} />
              )}
              {launchData.headwear && (
                <OutfitBadge label={itemLabel(launchData.headwear)} />
              )}
            </div>

            {/* Snap branding */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <p className="text-white/50 text-xs">Powered by Snap Camera Kit</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function OutfitBadge({ label }: { label: string }) {
  return (
    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

function itemLabel(id: string): string {
  const item = GUMI_BEAR_ITEMS.find((i) => i.id === id);
  return item?.name ?? id;
}

/** Convert a hue (0-360) to an approximate CSS hsl color for the badge dot. */
function hueToCSS(hue: number): string {
  return `hsl(${hue}, 70%, 55%)`;
}
