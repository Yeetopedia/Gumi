"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Conversation, MockUser } from "@/types";
import { CURRENT_USER, getUserById } from "@/lib/mock-users";
import { addMessageToConversation, markConversationAsRead } from "@/lib/mock-conversations";
import GummyBearChat from "./GummyBearChat";

export default function MessagesConversation({
  conversation,
  onBack,
  onDeleteConversation,
}: {
  conversation: Conversation;
  onBack?: () => void;
  onDeleteConversation?: (conversationId: string) => void;
}) {
  const participantUser = getUserById(conversation.participantId) as MockUser;
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState(conversation);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mark as read on open
  useEffect(() => {
    markConversationAsRead(conversation.id);
  }, [conversation.id]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    // Add user message
    const userMsg = addMessageToConversation(
      conversation.id,
      CURRENT_USER.id,
      messageInput
    );

    setMessageInput("");
    setConversationState({ ...conversation });

    // Simulate typing indicator
    if (userMsg) {
      setIsTyping(true);
      setTimeout(() => {
        // Add response message
        const responses = [
          "That's awesome! 😄",
          "I totally agree! 💯",
          "Love that energy ✨",
          "Right? 🙌",
          "For sure! 👀",
          "Haha yes! 😂",
          "Perfect! 🎯",
          "Absolutely! 💕",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        addMessageToConversation(
          conversation.id,
          conversation.participantId,
          randomResponse
        );
        setConversationState({ ...conversation });
        setIsTyping(false);
      }, 1200 + Math.random() * 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] sticky top-0 z-40">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-[var(--bg-primary)] rounded-full transition-colors"
            aria-label="Back to conversations"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <Image
            src={participantUser.avatar}
            alt={participantUser.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

          <div className="min-w-0">
            <h2 className="font-semibold text-[var(--text-primary)] truncate">
              {participantUser.name}
            </h2>
            <p className="text-xs text-[var(--text-tertiary)]">
              @{participantUser.username}
            </p>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => {
            if (confirm("Delete this conversation?")) {
              onDeleteConversation?.(conversation.id);
              onBack?.();
            }
          }}
          className="w-8 h-8 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
          aria-label="Delete conversation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 4 21 4 23 6" />
            <path d="M19 8v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8" />
            <line x1="10" y1="12" x2="10" y2="16" />
            <line x1="14" y1="12" x2="14" y2="16" />
          </svg>
        </button>
      </div>

      {/* Chat view */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <GummyBearChat
          messages={conversationState.messages}
          participantUser={participantUser}
          isTyping={isTyping}
        />
      </div>

      {/* Message input */}
      <div className="px-4 py-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="w-10 h-10 flex items-center justify-center bg-[var(--accent)] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
