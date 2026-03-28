"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MockUser, UserListType } from "@/types";
import { getMyFollowers, getMyFollowing } from "@/lib/current-user-data";
import { formatCount } from "@/lib/utils";

type UserListModalProps = {
  type: UserListType | null;
  onClose: () => void;
  onUserClick: (user: MockUser) => void;
};

export default function UserListModal({ type, onClose, onUserClick }: UserListModalProps) {
  const users = useMemo(() => {
    if (type === "followers") return getMyFollowers();
    if (type === "following") return getMyFollowing();
    return [];
  }, [type]);

  const [followingState, setFollowingState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    const following = getMyFollowing();
    following.forEach((u) => { state[u.id] = true; });
    return state;
  });

  const toggleFollow = (userId: string) => {
    setFollowingState((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <AnimatePresence>
      {type && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-sm md:max-h-[70vh] z-[60] bg-[var(--card-bg)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/50">
              <h3
                className="text-lg text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                {type === "followers" ? "Followers" : "Following"}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[var(--bg-secondary)] flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* User list */}
            <div className="flex-1 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-secondary)]/50 transition-colors"
                >
                  <button
                    onClick={() => onUserClick(user)}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--bg-secondary)] flex-shrink-0">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)] truncate">
                        @{user.username} · {formatCount(user.gumiCount)} gumis
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                      followingState[user.id]
                        ? "border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
                        : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                    }`}
                  >
                    {followingState[user.id] ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
