"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentUserProfile } from "@/types";

type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  profile: CurrentUserProfile;
};

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
        animate={{ left: enabled ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    </button>
  );
}

export default function SettingsPanel({ isOpen, onClose, profile }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState({
    purchases: true,
    followers: true,
    friendActivity: false,
  });
  const [isPrivate, setIsPrivate] = useState(profile.isPrivate);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-[55]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[var(--card-bg)] z-[55] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]/50">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
                aria-label="Close settings"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <h2
                className="text-lg text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                Settings
              </h2>
            </div>

            <div className="p-5">
              {/* Account section */}
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-4">
                  Account
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[var(--text-tertiary)] mb-1 block">Email</label>
                    <p className="text-sm text-[var(--text-primary)]">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--text-tertiary)] mb-1 block">Username</label>
                    <p className="text-sm text-[var(--text-primary)]">@{profile.username}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--text-tertiary)] mb-1 block">Member since</label>
                    <p className="text-sm text-[var(--text-primary)]">
                      {new Date(profile.joinedDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notifications section */}
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">Purchase alerts</p>
                      <p className="text-xs text-[var(--text-tertiary)]">When friends buy something</p>
                    </div>
                    <Toggle
                      enabled={notifications.purchases}
                      onChange={(v) => setNotifications((prev) => ({ ...prev, purchases: v }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">New followers</p>
                      <p className="text-xs text-[var(--text-tertiary)]">When someone follows you</p>
                    </div>
                    <Toggle
                      enabled={notifications.followers}
                      onChange={(v) => setNotifications((prev) => ({ ...prev, followers: v }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">Friend activity</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Daily digest of friend activity</p>
                    </div>
                    <Toggle
                      enabled={notifications.friendActivity}
                      onChange={(v) => setNotifications((prev) => ({ ...prev, friendActivity: v }))}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy section */}
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-4">
                  Privacy
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-primary)]">Private profile</p>
                    <p className="text-xs text-[var(--text-tertiary)]">Only followers can see your Gumis</p>
                  </div>
                  <Toggle enabled={isPrivate} onChange={setIsPrivate} />
                </div>
              </div>

              {/* About section */}
              <div className="border-t border-[var(--border)]/50 pt-6">
                <h3 className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-4">
                  About
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[var(--text-secondary)]">Version</p>
                    <p className="text-sm text-[var(--text-tertiary)]">1.0.0</p>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)] text-center pt-4">
                    Made with love by Gumi
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
