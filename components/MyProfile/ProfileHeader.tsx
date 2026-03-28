"use client";

import Image from "next/image";
import { CurrentUserProfile } from "@/types";
import { formatCount } from "@/lib/utils";

type ProfileHeaderProps = {
  profile: CurrentUserProfile;
  onEditClick: () => void;
  onSettingsClick: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
};

export default function ProfileHeader({
  profile,
  onEditClick,
  onSettingsClick,
  onFollowersClick,
  onFollowingClick,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center pt-14 pb-6 px-6">
      {/* Avatar with edit indicator */}
      <div className="relative w-24 h-24 mb-4">
        <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        {/* Camera edit indicator */}
        <button
          onClick={onEditClick}
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-md border-2 border-[var(--card-bg)]"
          aria-label="Edit photo"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      {/* Name */}
      <h2
        className="text-2xl text-[var(--text-primary)] mb-0.5"
        style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
      >
        {profile.name}
      </h2>
      <p className="text-sm text-[var(--text-tertiary)] mb-2">@{profile.username}</p>
      <p className="text-sm text-[var(--text-secondary)] text-center max-w-xs mb-6">
        {profile.bio}
      </p>

      {/* Stats row */}
      <div className="flex gap-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <Image src="/gumi-icon.png" alt="" width={18} height={31} />
            <span className="text-xl font-bold text-[var(--accent)]">
              {formatCount(profile.gumiCount)}
            </span>
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">Gumis</span>
        </div>
        <button onClick={onFollowersClick} className="flex flex-col items-center hover:opacity-70 transition-opacity">
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {formatCount(profile.followers)}
          </span>
          <span className="text-xs text-[var(--text-tertiary)]">Followers</span>
        </button>
        <button onClick={onFollowingClick} className="flex flex-col items-center hover:opacity-70 transition-opacity">
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {formatCount(profile.following)}
          </span>
          <span className="text-xs text-[var(--text-tertiary)]">Following</span>
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={onEditClick}
          className="flex-1 py-2.5 border border-[var(--border)] text-[var(--text-primary)] rounded-full text-sm font-semibold hover:border-[var(--text-tertiary)] transition-colors"
        >
          Edit Profile
        </button>
        <button
          onClick={onSettingsClick}
          className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--text-tertiary)] transition-colors flex-shrink-0"
          aria-label="Settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
