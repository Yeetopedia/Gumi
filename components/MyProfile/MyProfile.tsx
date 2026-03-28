"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProfileTab, SortOption, MockUser, Collection, UserListType } from "@/types";
import { getCurrentUserProfile, getUserHighlights, HighlightCollection } from "@/lib/current-user-data";
import ProfileHeader from "./ProfileHeader";
import ProfileHighlights from "./ProfileHighlights";
import HighlightViewer from "./HighlightViewer";
import ProfileTabs from "./ProfileTabs";
import ProfileGumisGrid from "./ProfileGumisGrid";
import ProfileSavedGrid from "./ProfileSavedGrid";
import ProfileCollections from "./ProfileCollections";
import ProfileCollectionDetail from "./ProfileCollectionDetail";
import ProfileWishlist from "./ProfileWishlist";
import EditProfileModal from "./EditProfileModal";
import SettingsPanel from "./SettingsPanel";
import UserListModal from "./UserListModal";

type MyProfileProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
  onUserClick: (user: MockUser) => void;
};

export default function MyProfile({ isOpen, onClose, onProductClick, onUserClick }: MyProfileProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("gumis");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userListType, setUserListType] = useState<UserListType | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [highlightViewerIndex, setHighlightViewerIndex] = useState<number | null>(null);

  // Profile data
  const [profile, setProfile] = useState(getCurrentUserProfile());
  const [profileName, setProfileName] = useState(profile.name);
  const [profileBio, setProfileBio] = useState(profile.bio);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY, 10) * -1);
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (highlightViewerIndex !== null) {
          setHighlightViewerIndex(null);
        } else if (settingsOpen) {
          setSettingsOpen(false);
        } else if (editModalOpen) {
          setEditModalOpen(false);
        } else if (userListType) {
          setUserListType(null);
        } else if (selectedCollection) {
          setSelectedCollection(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, highlightViewerIndex, settingsOpen, editModalOpen, userListType, selectedCollection]);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setActiveTab("gumis");
      setSortOption("recent");
      setEditModalOpen(false);
      setSettingsOpen(false);
      setUserListType(null);
      setSelectedCollection(null);
      setHighlightViewerIndex(null);
    }
  }, [isOpen]);

  const handleSaveProfile = useCallback((name: string, bio: string) => {
    setProfileName(name);
    setProfileBio(bio);
    setProfile((prev) => ({ ...prev, name, bio }));
    setEditModalOpen(false);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 bg-[var(--bg-primary)] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-4 left-4 z-30 w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
            aria-label="Close profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="max-w-2xl mx-auto">
            <ProfileHeader
              profile={{ ...profile, name: profileName, bio: profileBio }}
              onEditClick={() => setEditModalOpen(true)}
              onSettingsClick={() => setSettingsOpen(true)}
              onFollowersClick={() => setUserListType("followers")}
              onFollowingClick={() => setUserListType("following")}
            />

            <ProfileHighlights
              userId={profile.id}
              onHighlightClick={(highlight, index) => setHighlightViewerIndex(index)}
            />

            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "gumis" && (
                  <ProfileGumisGrid
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    onProductClick={onProductClick}
                  />
                )}
                {activeTab === "saved" && (
                  <ProfileSavedGrid onProductClick={onProductClick} />
                )}
                {activeTab === "collections" && (
                  <ProfileCollections
                    onCollectionClick={setSelectedCollection}
                  />
                )}
                {activeTab === "wishlist" && (
                  <ProfileWishlist onProductClick={onProductClick} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sub-views */}
          <AnimatePresence>
            {selectedCollection && (
              <ProfileCollectionDetail
                collection={selectedCollection}
                onClose={() => setSelectedCollection(null)}
                onProductClick={onProductClick}
              />
            )}
          </AnimatePresence>

          <EditProfileModal
            isOpen={editModalOpen}
            name={profileName}
            bio={profileBio}
            avatar={profile.avatar}
            onSave={handleSaveProfile}
            onClose={() => setEditModalOpen(false)}
          />

          <SettingsPanel
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            profile={profile}
          />

          <UserListModal
            type={userListType}
            onClose={() => setUserListType(null)}
            onUserClick={onUserClick}
          />

          {/* Highlight story viewer */}
          <AnimatePresence>
            {highlightViewerIndex !== null && (
              <HighlightViewer
                highlights={getUserHighlights(profile.id)}
                initialHighlightIndex={highlightViewerIndex}
                onClose={() => setHighlightViewerIndex(null)}
                onProductClick={(product) => {
                  setHighlightViewerIndex(null);
                  onProductClick(product);
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
