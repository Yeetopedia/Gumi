"use client";

/**
 * SnapARButton — "See My Bear in AR" CTA
 *
 * Strategy waterfall (best → fallback):
 *   1. Camera Kit  — opens in-app AR modal (requires configured env vars)
 *   2. Creative Kit — opens Snapchat with bear config as launchData
 *   3. Deep Link   — opens Snapchat lens (no bear config passthrough)
 *   4. QR Code     — shows Snapcode to scan (desktop fallback)
 *
 * Props:
 *   mode="inline"  — renders the full animated button (for profile header)
 *   mode="compact" — smaller pill version (for customizer footer)
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GummiBearConfig } from "@/types/gummi-bear";
import {
  isSnapConfigured,
  shareToSnapWithBear,
  buildLensDeepLink,
  SNAP_LENS_ID,
} from "@/lib/snap-ar";

type SnapARButtonProps = {
  config: GummiBearConfig;
  mode?: "inline" | "compact";
};

// Load the Creative Kit SDK once, lazily
let creativeKitLoaded = false;
function loadCreativeKit() {
  if (creativeKitLoaded || typeof window === "undefined") return;
  const id = "snapkit-creative-kit-sdk";
  if (document.getElementById(id)) { creativeKitLoaded = true; return; }
  const s = document.createElement("script");
  s.id = id;
  s.src = "https://sdk.snapkit.com/js/v1/create.js";
  s.async = true;
  document.head.appendChild(s);
  creativeKitLoaded = true;
}

export default function SnapARButton({ config, mode = "inline" }: SnapARButtonProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [tooltipMsg, setTooltipMsg] = useState("");
  const configured = isSnapConfigured();

  useEffect(() => {
    loadCreativeKit();
  }, []);

  const showTooltip = useCallback((msg: string, ms = 2500) => {
    setTooltipMsg(msg);
    setTimeout(() => setTooltipMsg(""), ms);
  }, []);

  const handleClick = useCallback(async () => {
    if (status === "loading") return;

    // Strategy 1: Navigate to /ar page (requires credentials)
    if (configured) {
      const p = new URLSearchParams({ hue: String(config.hue) });
      if (config.clothing) p.set("clothing", config.clothing);
      if (config.accessory) p.set("accessory", config.accessory);
      if (config.headwear) p.set("headwear", config.headwear);
      router.push(`/ar?${p.toString()}`);
      return;
    }

    setStatus("loading");

    // Strategy 2: Creative Kit (opens Snapchat with bear config)
    try {
      await shareToSnapWithBear(config);
      setStatus("idle");
      return;
    } catch {
      // Creative Kit not loaded or lens not configured — fall through
    }

    // Strategy 3: Deep link to Snapchat lens
    const deepLink = buildLensDeepLink();
    if (deepLink !== "https://www.snapchat.com" && SNAP_LENS_ID) {
      window.open(deepLink, "_blank");
      setStatus("idle");
      showTooltip("Opening Snapchat…");
      return;
    }

    // Strategy 4: Unconfigured — explain what's needed
    setStatus("idle");
    showTooltip("Configure Snap credentials in .env.local to enable AR");
  }, [config, configured, status, showTooltip]);

  if (mode === "compact") {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 active:scale-95 transition-all"
      >
        <SnapGhost size={16} />
        <span>Try in AR</span>
      </button>
    );
  }

  // Inline (full) mode
  return (
    <>
      <div className="relative flex flex-col items-center">
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all"
          style={{
            background: "linear-gradient(135deg, #FFFC00 0%, #FF6B35 60%, #FF0099 100%)",
            color: "#000",
          }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-white/25 -skew-x-12"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />

          {status === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
            />
          ) : (
            <SnapGhost size={18} />
          )}

          <span className="relative z-10">See My Bear in AR</span>

          {/* Snap branding badge */}
          <span className="relative z-10 text-[10px] font-bold bg-black/15 px-1.5 py-0.5 rounded-full">
            SNAP
          </span>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltipMsg && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-7 text-xs text-(--text-tertiary) whitespace-nowrap"
            >
              {tooltipMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function SnapGhost({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.029 12.017.029z" />
    </svg>
  );
}
