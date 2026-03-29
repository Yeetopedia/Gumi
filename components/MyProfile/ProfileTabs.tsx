"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ProfileTab } from "@/types";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

const TABS: { id: ProfileTab; label: string; hasIcon?: boolean }[] = [
  { id: "gummis", label: "Gummis", hasIcon: true },
  { id: "saved", label: "Saved" },
  { id: "collections", label: "Collections" },
  { id: "wishlist", label: "Wishlist" },
];

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="sticky top-8 z-10 bg-(--bg-primary)/95 backdrop-blur-md border-b border-(--border)/50">
      <div className="flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 relative flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-(--text-primary)"
                : "text-(--text-tertiary) hover:text-(--text-secondary)"
            }`}
          >
            {tab.hasIcon && (
              <Image
                src="/gummi-icon.png"
                alt=""
                width={12}
                height={21}
                className={activeTab === tab.id ? "opacity-100" : "opacity-40"}
              />
            )}
            {tab.label}

            {activeTab === tab.id && (
              <motion.div
                layoutId="profile-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-(--accent)"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
