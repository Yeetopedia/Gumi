"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MessagesHub from "@/components/MessagesHub";
import { CATEGORIES } from "@/lib/mock-data";

export default function MessagesPage() {
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
        activeSection="messages"
        onHomeClick={() => router.push("/")}
        onExploreClick={() => router.push("/explore")}
        onGamesClick={() => router.push("/games")}
        onMessagesClick={() => {}}
        onLikesClick={() => router.push("/")}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        <MessagesHub />
      </div>
    </main>
  );
}
