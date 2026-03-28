"use client";

import { useRef } from "react";
import Image from "next/image";
import { MockUser } from "@/types";

type StoriesRowProps = {
  users: MockUser[];
  onStoryClick: (user: MockUser, index: number) => void;
};

export default function StoriesRow({ users, onStoryClick }: StoriesRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-[var(--border)]/50 bg-[var(--bg-primary)]">
      <div className="px-4 md:px-6 lg:px-8 pt-3 pb-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium">
          Recent Gumis from friends
        </p>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-6 lg:px-8 pb-4 pt-1"
      >
        {users.map((user, index) => (
          <button
            key={user.id}
            onClick={() => onStoryClick(user, index)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
          >
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px]">
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  user.hasStory ? "p-[3px]" : "p-0"
                }`}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)] group-hover:scale-105 transition-transform">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              </div>
              {user.hasStory && (
                <Image
                  src="/story-ring.png"
                  alt=""
                  fill
                  className="object-contain z-10 pointer-events-none"
                  sizes="72px"
                />
              )}
              {user.hasStory && (
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-transparent flex items-center justify-center z-20">
                  <Image src="/gumi-icon.png" alt="" width={12} height={12} />
                </div>
              )}
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] truncate w-16 text-center">
              {user.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
