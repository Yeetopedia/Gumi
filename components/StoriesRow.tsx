"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MockUser } from "@/types";

type StoriesRowProps = {
  users: MockUser[];
  onStoryClick: (user: MockUser, index: number) => void;
  viewedUserIds: Set<string>;
};

export default function StoriesRow({ users, onStoryClick, viewedUserIds }: StoriesRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  // Check scroll position to show/hide buttons
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Setup scroll event listener
  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", checkScroll);
    checkScroll(); // Initial check

    return () => ref.removeEventListener("scroll", checkScroll);
  }, [users.length]);

  // Handle mouse wheel scroll
  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      const scrollAmount = 200;
      e.preventDefault();
      ref.scrollBy({
        left: e.deltaY > 0 ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    };

    ref.addEventListener("wheel", handleWheel, { passive: false });
    return () => ref.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-[var(--bg-primary)] group">
      {/* Left scroll button */}
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Right scroll button */}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Stories scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-6 lg:px-8 pb-4 pt-1"
      >
        {users.map((user, index) => {
          const isViewed = viewedUserIds.has(user.id);
          return (
            <button
              key={user.id}
              onClick={() => onStoryClick(user, index)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
            >
              <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] group-hover:scale-105 transition-transform">
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    user.hasStory ? "p-[3px]" : "p-0"
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
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
                    className={`object-contain z-10 pointer-events-none transition-all ${
                      isViewed ? "grayscale" : ""
                    }`}
                    sizes="72px"
                  />
                )}
                {user.hasStory && !isViewed && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 flex items-center justify-center z-20">
                    <Image src="/gumi-icon.png" alt="" width={12} height={21} />
                  </div>
                )}
              </div>
              <span className={`text-[11px] truncate w-16 text-center ${
                isViewed ? "text-[var(--text-tertiary)]" : "text-[var(--text-secondary)]"
              }`}>
                {user.username}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
