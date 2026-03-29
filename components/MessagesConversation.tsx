"use client";

import { useState, useEffect, useRef } from "react";
import { Conversation, MockUser } from "@/types";
import { CURRENT_USER, getUserById } from "@/lib/mock-users";
import { addMessageToConversation, markConversationAsRead } from "@/lib/mock-conversations";
import GummyBearChat from "./GummyBearChat";
import GummiBear from "./GummiBear/GummiBear";
import EmojiPicker from "./EmojiPicker";
import type { Emotion } from "@/lib/emoji-emotions";

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
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<Emotion | null>(null);
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

    const messageToSend = messageInput;
    setMessageInput("");
    setConversationState({ ...conversation });

    // Get AI response via Lava
    if (userMsg) {
      setIsTyping(true);

      const generateResponse = async () => {
        try {
          console.log("🔵 API CALL: Fetching response from /api/messages/response");
          console.log("Message:", messageToSend);
          console.log("Participant:", participantUser.name);

          const res = await fetch("/api/messages/response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userMessage: messageToSend,
              participant: participantUser,
            }),
          });

          console.log("🔵 API Response Status:", res.status);
          const data = await res.json();
          console.log("🔵 API Response Data:", data);

          if (!res.ok) {
            console.error("🔴 API ERROR:", data);
            setIsTyping(false);
            return;
          }

          // Simulate natural typing delay
          setTimeout(() => {
            console.log("🟢 Adding AI message:", data.message);
            addMessageToConversation(
              conversation.id,
              conversation.participantId,
              data.message
            );
            setConversationState({ ...conversation });
            setIsTyping(false);
          }, 1200 + Math.random() * 800);
        } catch (error) {
          console.error("🔴 Failed to get response:", error);
          setIsTyping(false);
        }
      };

      generateResponse();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-(--bg-primary)">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-(--border) bg-(--bg-secondary) sticky top-0 z-40">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-(--bg-primary) rounded-full transition-colors"
            aria-label="Back to conversations"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-(--bg-secondary) shrink-0">
            <GummiBear
              config={{
                hue: participantUser.gummiHue,
                clothing: participantUser.gummiOutfit?.clothing || null,
                accessory: participantUser.gummiOutfit?.accessory || null,
                headwear: participantUser.gummiOutfit?.headwear || null,
              }}
              size={40}
            />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-(--text-primary) truncate">
              {participantUser.name}
            </h2>
            <p className="text-xs text-(--text-tertiary)">
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
      <div className="px-4 py-4 border-t border-(--border) bg-(--bg-secondary)">
        <div className="flex gap-2">
          <button
            onClick={() => setEmojiPickerOpen(true)}
            className="w-10 h-10 flex items-center justify-center hover:bg-(--bg-primary) rounded-full transition-colors"
            aria-label="Add emoji"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9" y2="9.01" />
              <line x1="15" y1="9" x2="15" y2="9.01" />
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2.5 bg-(--bg-primary) border border-(--border) rounded-full text-(--text-primary) placeholder-(--text-tertiary) focus:outline-none focus:border-(--accent) transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="w-10 h-10 flex items-center justify-center bg-(--accent) text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Emoji Picker */}
      <EmojiPicker
        isOpen={emojiPickerOpen}
        onClose={() => setEmojiPickerOpen(false)}
        onSelectEmoji={(emotion) => {
          setSelectedEmoji(emotion);
          // Send emoji as a message
          addMessageToConversation(
            conversation.id,
            CURRENT_USER.id,
            `[emoji:${emotion}]`
          );
          setConversationState({ ...conversation });
          setEmojiPickerOpen(false);

          // Get AI response for emoji reaction
          setIsTyping(true);
          const generateResponse = async () => {
            try {
              const res = await fetch("/api/messages/response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userMessage: `[emoji:${emotion}]`,
                  participant: participantUser,
                }),
              });

              const data = await res.json();
              setTimeout(() => {
                addMessageToConversation(
                  conversation.id,
                  conversation.participantId,
                  data.message
                );
                setConversationState({ ...conversation });
                setIsTyping(false);
              }, 1200 + Math.random() * 800);
            } catch (error) {
              console.error("Failed to get emoji response:", error);
              setIsTyping(false);
            }
          };
          generateResponse();
        }}
        userConfig={{
          hue: CURRENT_USER.gummiHue,
          clothing: CURRENT_USER.gummiOutfit?.clothing || null,
          accessory: CURRENT_USER.gummiOutfit?.accessory || null,
          headwear: CURRENT_USER.gummiOutfit?.headwear || null,
        }}
      />
    </div>
  );
}
