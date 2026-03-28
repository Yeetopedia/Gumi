"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type EditProfileModalProps = {
  isOpen: boolean;
  name: string;
  bio: string;
  avatar: string;
  onSave: (name: string, bio: string) => void;
  onClose: () => void;
};

const MAX_BIO_LENGTH = 150;

export default function EditProfileModal({
  isOpen,
  name,
  bio,
  avatar,
  onSave,
  onClose,
}: EditProfileModalProps) {
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);

  // Reset to current values when opened
  useEffect(() => {
    if (isOpen) {
      setEditName(name);
      setEditBio(bio);
    }
  }, [isOpen, name, bio]);

  const handleSave = () => {
    if (editName.trim()) {
      onSave(editName.trim(), editBio.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-[60] bg-[var(--card-bg)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]/50">
              <button
                onClick={onClose}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Cancel
              </button>
              <h3
                className="text-lg text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
              >
                Edit Profile
              </h3>
              <button
                onClick={handleSave}
                disabled={!editName.trim()}
                className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors disabled:opacity-40"
              >
                Save
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-20 h-20 mb-3">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
                    <Image
                      src={avatar}
                      alt="Profile photo"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                </div>
                <button className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
                  Change Photo
                </button>
              </div>

              {/* Name input */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  maxLength={50}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-shadow"
                  placeholder="Your name"
                />
              </div>

              {/* Bio input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-medium">
                    Bio
                  </label>
                  <span
                    className={`text-[10px] font-medium ${
                      editBio.length > MAX_BIO_LENGTH * 0.9
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {editBio.length}/{MAX_BIO_LENGTH}
                  </span>
                </div>
                <textarea
                  value={editBio}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_BIO_LENGTH) {
                      setEditBio(e.target.value);
                    }
                  }}
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-shadow resize-none"
                  placeholder="Tell people about yourself"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
