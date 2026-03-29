"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GummiBearItemCategory, GummiBearItem, GummiBearConfig } from "@/types/gummi-bear";
import { useGummiBear } from "@/lib/gummi-bear-context";
import { getItemsByCategory, GUMI_BEAR_ITEMS } from "@/lib/gummi-bear-items";
import { formatCount } from "@/lib/utils";
import GummiBear from "./GummiBear";
import TintedImage from "./TintedImage";
import SnapARButton from "../SnapAR/SnapARButton";

type GummiBearCustomizerProps = {
  onClose: () => void;
};

const CATEGORIES: { id: GummiBearItemCategory; label: string; emoji: string }[] = [
  { id: "color", label: "Colors", emoji: "🎨" },
  { id: "clothing", label: "Clothing", emoji: "👕" },
  { id: "accessory", label: "Accessories", emoji: "✨" },
  { id: "headwear", label: "Hats", emoji: "👒" },
];

const RARITY_BORDER = {
  common: "border-(--border)",
  rare: "border-blue-300",
  legendary: "border-amber-400",
};

const ITEM_EMOJI: Record<string, string> = {
  "clothing-tshirt": "👕", "clothing-hoodie": "🧥", "clothing-dress": "👗",
  "clothing-blazer": "🤵", "clothing-overalls": "👖", "clothing-sweater": "🧶",
  "clothing-tuxedo": "🎩", "clothing-cape": "🦸",
  "acc-glasses": "👓", "acc-sunglasses": "🕶️", "acc-scarf": "🧣",
  "acc-bowtie": "🎀", "acc-headphones": "🎧", "acc-wings": "😇",
  "hat-beanie": "🧢", "hat-crown": "👑", "hat-flower": "🌸",
  "hat-beret": "🎨", "hat-tophat": "🎩", "hat-cap": "🧢", "hat-halo": "😇",
};

export default function GummiBearCustomizer({ onClose }: GummiBearCustomizerProps) {
  const { state, equipItem, purchaseItem } = useGummiBear();
  const [activeCategory, setActiveCategory] = useState<GummiBearItemCategory>("color");
  const [previewConfig, setPreviewConfig] = useState<GummiBearConfig | null>(null);
  const [pendingItem, setPendingItem] = useState<GummiBearItem | null>(null);
  const [animateKey, setAnimateKey] = useState("init");
  const [toast, setToast] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);

  const displayConfig = previewConfig || state.config;
  const items = getItemsByCategory(activeCategory);

  // Sort: owned first, then by price
  const sortedItems = [...items].sort((a, b) => {
    const aOwned = state.inventory.includes(a.id) || !!a.isDefault;
    const bOwned = state.inventory.includes(b.id) || !!b.isDefault;
    if (aOwned && !bOwned) return -1;
    if (!aOwned && bOwned) return 1;
    return a.price - b.price;
  });

  const handleSelectItem = useCallback((item: GummiBearItem) => {
    const isOwned = state.inventory.includes(item.id) || !!item.isDefault;

    if (isOwned) {
      const currentId = getCurrentEquipped(state.config, item.category);
      if (item.category === "color") {
        if (state.config.hue !== (item.hue ?? 0)) {
          equipItem("color", item.id);
          setAnimateKey(item.id);
        }
      } else if (currentId === item.id) {
        equipItem(item.category, null);
        setAnimateKey(`unequip-${item.id}`);
      } else {
        equipItem(item.category, item.id);
        setAnimateKey(item.id);
      }
      setPreviewConfig(null);
      setPendingItem(null);
    } else {
      setPreviewConfig(buildPreview(state.config, item));
      setPendingItem(item);
    }
  }, [state, equipItem]);

  const handlePurchase = useCallback(() => {
    if (!pendingItem) return;
    const success = purchaseItem(pendingItem.id);
    if (success) {
      setToast(`Unlocked ${pendingItem.name}!`);
      setAnimateKey(`buy-${pendingItem.id}`);
      setConfetti(true);
      setPreviewConfig(null);
      setPendingItem(null);
      setTimeout(() => setToast(null), 2500);
      setTimeout(() => setConfetti(false), 1200);
    }
  }, [pendingItem, purchaseItem]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[60] bg-(--bg-primary) overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-(--bg-secondary) flex items-center justify-center hover:bg-(--border) transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2
          className="text-lg text-(--text-primary)"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
        >
          Customize Your Gummi
        </h2>

        <div className="flex items-center gap-2">
          <SnapARButton config={displayConfig} mode="compact" />
          <div className="flex items-center gap-1.5 bg-(--bg-secondary) px-3 py-1.5 rounded-full">
            <Image src="/gummi-icon.png" alt="" width={14} height={24} />
            <span className="text-sm font-semibold text-(--accent)">
              {formatCount(state.gummiBalance)}
            </span>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="shrink-0 flex items-center justify-center py-4 relative">
        <motion.div
          key={animateKey}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1, y: [0, -4, 0] }}
          transition={{
            scale: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <GummiBear config={displayConfig} size={180} />
        </motion.div>

        {/* Purchase confetti burst */}
        <AnimatePresence>
          {confetti && Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * 360;
            const rad = (angle * Math.PI) / 180;
            const dist = 80 + Math.random() * 40;
            const colors = ["#E84393", "#F9CA24", "#6C5CE7", "#00B894", "#FD79A8", "#0984E3", "#E17055", "#55EFC4"];
            return (
              <motion.div
                key={`confetti-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 6 + Math.random() * 6,
                  height: 6 + Math.random() * 6,
                  backgroundColor: colors[i % colors.length],
                  top: "50%",
                  left: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * dist,
                  y: Math.sin(rad) * dist,
                  opacity: 0,
                  scale: 0.3,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Purchase bar */}
      {pendingItem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 px-4 pb-3 shrink-0"
        >
          <button
            onClick={() => { setPreviewConfig(null); setPendingItem(null); }}
            className="px-4 py-2 text-sm font-medium text-(--text-secondary) bg-(--bg-secondary) rounded-full hover:bg-(--border) transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={state.gummiBalance < pendingItem.price}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              state.gummiBalance >= pendingItem.price
                ? "bg-(--accent) text-white hover:bg-(--accent-hover) active:scale-95"
                : "bg-(--bg-secondary) text-(--text-tertiary) cursor-not-allowed"
            }`}
          >
            {state.gummiBalance >= pendingItem.price ? (
              <>
                <span>Buy for</span>
                <Image src="/gummi-icon.png" alt="" width={12} height={20} className="brightness-0 invert" />
                <span>{pendingItem.price}</span>
              </>
            ) : (
              "Not enough Gummis"
            )}
          </button>
        </motion.div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setPreviewConfig(null);
              setPendingItem(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              activeCategory === cat.id
                ? "bg-(--text-primary) text-(--bg-primary)"
                : "bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--border)"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Item grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {sortedItems.map((item) => {
            const isOwned = state.inventory.includes(item.id) || !!item.isDefault;
            const isEquipped = isItemEquipped(state.config, item);
            const canAfford = state.gummiBalance >= item.price;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-[1.03] active:scale-[0.98] ${
                  isEquipped
                    ? "border-(--accent) bg-(--accent)/5"
                    : RARITY_BORDER[item.rarity]
                } ${!isOwned && !canAfford ? "opacity-50" : ""}`}
              >
                {/* Preview */}
                <div className="w-14 h-14 flex items-center justify-center">
                  {item.category === "color" ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <TintedImage
                        src="/gummi-icon.png"
                        hue={item.hue ?? 0}
                        fill
                        className="object-contain scale-150"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center">
                      <span className="text-lg">{ITEM_EMOJI[item.id] || "🧸"}</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className="text-xs font-medium text-(--text-primary) text-center leading-tight line-clamp-2">
                  {item.name}
                </span>

                {/* Status */}
                {isOwned ? (
                  isEquipped ? (
                    <span className="text-[10px] font-semibold text-(--accent) bg-(--accent)/10 px-2 py-0.5 rounded-full">
                      Equipped
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-(--text-tertiary) bg-(--bg-secondary) px-2 py-0.5 rounded-full">
                      Owned
                    </span>
                  )
                ) : (
                  <span className="flex items-center gap-1">
                    <Image src="/gummi-icon.png" alt="" width={10} height={17} />
                    <span className={`text-[11px] font-semibold ${canAfford ? "text-(--text-secondary)" : "text-(--text-tertiary)"}`}>
                      {item.price}
                    </span>
                  </span>
                )}

                {/* Equipped check */}
                {isEquipped && (
                  <div className="absolute top-1 left-1 w-4 h-4 bg-(--accent) rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-(--text-primary) text-(--bg-primary) px-5 py-3 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 z-[70]"
        >
          <Image src="/gummi-icon.png" alt="" width={14} height={24} />
          {toast}
        </motion.div>
      )}
    </motion.div>
  );
}

function getCurrentEquipped(config: GummiBearConfig, category: GummiBearItemCategory): string | null {
  switch (category) {
    case "clothing": return config.clothing;
    case "accessory": return config.accessory;
    case "headwear": return config.headwear;
    case "color": return null;
  }
}

function isItemEquipped(config: GummiBearConfig, item: GummiBearItem): boolean {
  switch (item.category) {
    case "color": return config.hue === (item.hue ?? 0);
    case "clothing": return config.clothing === item.id;
    case "accessory": return config.accessory === item.id;
    case "headwear": return config.headwear === item.id;
  }
}

function buildPreview(base: GummiBearConfig, item: GummiBearItem): GummiBearConfig {
  const preview = { ...base };
  switch (item.category) {
    case "color":
      preview.hue = item.hue ?? 0;
      break;
    case "clothing":
      preview.clothing = item.id;
      break;
    case "accessory":
      preview.accessory = item.id;
      break;
    case "headwear":
      preview.headwear = item.id;
      break;
  }
  return preview;
}
