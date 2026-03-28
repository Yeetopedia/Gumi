"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Conversation, MockUser } from "@/types";
import { getConversationsByUser, deleteConversation, getUnreadCount } from "@/lib/mock-conversations";
import { getUserById, CURRENT_USER } from "@/lib/mock-users";
import MessagesConversation from "./MessagesConversation";

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
}

export default function MessagesHub() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(getConversationsByUser());
  const [unreadCount, setUnreadCount] = useState(getUnreadCount());

  // Refresh conversations list
  const refreshConversations = () => {
    setConversations(getConversationsByUser());
    setUnreadCount(getUnreadCount());
  };

  const handleDeleteConversation = (conversationId: string) => {
    deleteConversation(conversationId);
    setSelectedConversationId(null);
    refreshConversations();
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversationId);

  if (selectedConv) {
    return (
      <MessagesConversation
        conversation={selectedConv}
        onBack={() => {
          setSelectedConversationId(null);
          refreshConversations();
        }}
        onDeleteConversation={handleDeleteConversation}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      {/* Conversations list - hidden on mobile */}
      <div className="hidden md:flex md:flex-col w-96 border-r border-[var(--border)]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border)] sticky top-0 z-40 bg-[var(--bg-secondary)]">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            Messages
          </h1>
          {unreadCount > 0 && (
            <p className="text-xs text-[var(--text-tertiary)] mt-1">
              {unreadCount} unread
            </p>
          )}
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-[var(--text-tertiary)] text-sm">
                No messages yet
              </p>
              <p className="text-[var(--text-tertiary)] text-xs mt-1">
                Start messaging your followers!
              </p>
            </div>
          ) : (
            conversations.map((conv) => {
              const participant = getUserById(conv.participantId) as MockUser;
              const lastMessage = conv.messages[conv.messages.length - 1];
              const hasUnread = conv.messages.some(
                (m) => m.sender !== CURRENT_USER.id && !m.read
              );

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={`w-full px-4 py-3.5 border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors text-left ${
                    selectedConversationId === conv.id ? "bg-[var(--bg-secondary)]" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={participant.avatar}
                        alt={participant.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      {hasUnread && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-primary)]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <p className={`text-sm ${hasUnread ? "font-semibold" : ""} text-[var(--text-primary)]`}>
                          {participant.name}
                        </p>
                        <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
                          {formatRelativeTime(conv.updatedAt)}
                        </span>
                      </div>

                      {/* Last message preview */}
                      <p
                        className={`text-sm truncate ${
                          hasUnread
                            ? "font-medium text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {lastMessage?.sender === CURRENT_USER.id && "You: "}
                        {lastMessage?.content || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Mobile conversation list overlay */}
      <div className="md:hidden w-full px-4 py-6 flex flex-col max-h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          Messages
        </h1>
        {unreadCount > 0 && (
          <p className="text-xs text-[var(--text-tertiary)] mb-3">
            {unreadCount} unread
          </p>
        )}

        <div className="space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--text-tertiary)] text-sm">
                No messages yet
              </p>
              <p className="text-[var(--text-tertiary)] text-xs mt-1">
                Start messaging your followers!
              </p>
            </div>
          ) : (
            conversations.map((conv) => {
              const participant = getUserById(conv.participantId) as MockUser;
              const lastMessage = conv.messages[conv.messages.length - 1];
              const hasUnread = conv.messages.some(
                (m) => m.sender !== CURRENT_USER.id && !m.read
              );

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--border)] transition-colors text-left"
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={participant.avatar}
                        alt={participant.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      {hasUnread && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-secondary)]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <p className={`text-sm ${hasUnread ? "font-semibold" : ""} text-[var(--text-primary)]`}>
                          {participant.name}
                        </p>
                        <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
                          {formatRelativeTime(conv.updatedAt)}
                        </span>
                      </div>

                      <p
                        className={`text-sm truncate ${
                          hasUnread
                            ? "font-medium text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {lastMessage?.sender === CURRENT_USER.id && "You: "}
                        {lastMessage?.content || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Empty state for desktop */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-[var(--text-secondary)] text-lg">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    </div>
  );
}
