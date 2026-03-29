"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import GamesHub from "@/components/GamesHub";
import { CATEGORIES } from "@/lib/mock-data";

export default function GamesPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("for-you");

  return (
    <main className="flex min-h-screen bg-(--bg-primary)">
      {/* Sidebar */}
      <Sidebar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={() => {}}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        activeSection="games"
        onHomeClick={() => router.push("/")}
        onExploreClick={() => router.push("/explore")}
        onGamesClick={() => {}}
        onMessagesClick={() => router.push("/messages")}
        onLikesClick={() => router.push("/")}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        <GamesHub />
      </div>
    </main>
  );
}
