"use client";

import { Message, MockUser } from "@/types";
import { motion } from "framer-motion";
import { CURRENT_USER } from "@/lib/mock-users";

// Hash user ID to consistent color
function hashUserToColor(userId: string): string {
  const colors = [
    "#FF6B6B", // red
    "#4ECDC4", // teal
    "#FFE66D", // yellow
    "#95E1D3", // mint
    "#F38181", // pink
    "#AA96DA", // purple
    "#FFA07A", // salmon
    "#87CEEB", // sky blue
  ];
  const hash = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Format timestamp to relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function GummyBearChat({
  messages,
  participantUser,
  isTyping = false,
}: {
  messages: Message[];
  participantUser: MockUser;
  isTyping?: boolean;
}) {
  const participantColor = hashUserToColor(participantUser.id);
  const currentUserColor = hashUserToColor(CURRENT_USER.id);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Background with field */}
      <div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #E3F2FD 0%, #E8F5E9 70%, #C8E6C9 100%)",
        }}
      >
        {/* Decorative grass */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#A5D6A7] to-transparent opacity-40" />

        {/* Floating flowers (emoji) */}
        <div className="absolute top-8 left-12 text-2xl opacity-30">🌼</div>
        <div className="absolute top-16 right-16 text-2xl opacity-25">🌻</div>
        <div className="absolute bottom-32 left-1/4 text-xl opacity-20">🌱</div>
        <div className="absolute bottom-32 right-1/3 text-xl opacity-25">✨</div>
      </div>

      {/* Messages container */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <p className="text-[var(--text-tertiary)] text-sm">
                Start a conversation with {participantUser.name}!
              </p>
              <p className="text-[var(--text-tertiary)] text-xs mt-1">
                Send a message to get started
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender === CURRENT_USER.id}
              participantColor={participantColor}
              currentUserColor={currentUserColor}
            />
          ))
        )}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div className="flex justify-start">
            <div className="bg-[var(--bg-secondary)] px-4 py-2 rounded-lg max-w-xs">
              <div className="flex gap-1.5">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-[var(--text-tertiary)] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Gummy bears at bottom */}
      <div className="relative z-20 px-6 py-8 flex justify-between items-end gap-8">
        {/* Participant bear */}
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Gummy bear body */}
            <div
              className="w-20 h-20 rounded-full shadow-lg relative flex items-center justify-center"
              style={{ backgroundColor: participantColor }}
            >
              {/* Eyes */}
              <div className="absolute top-6 flex gap-4">
                <div className="w-2.5 h-3 bg-white rounded-full" />
                <div className="w-2.5 h-3 bg-white rounded-full" />
              </div>
              {/* Mouth - semicircle smile */}
              <div className="absolute bottom-3 w-6 h-3 border-b-2 border-white rounded-full" />
            </div>
          </motion.div>
          <span className="text-xs font-semibold text-[var(--text-secondary)]">
            {participantUser.name}
          </span>
        </div>

        {/* Current user bear */}
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="flex flex-col items-center"
          >
            {/* Gummy bear body */}
            <div
              className="w-20 h-20 rounded-full shadow-lg relative flex items-center justify-center"
              style={{ backgroundColor: currentUserColor }}
            >
              {/* Eyes */}
              <div className="absolute top-6 flex gap-4">
                <div className="w-2.5 h-3 bg-white rounded-full" />
                <div className="w-2.5 h-3 bg-white rounded-full" />
              </div>
              {/* Mouth - semicircle smile */}
              <div className="absolute bottom-3 w-6 h-3 border-b-2 border-white rounded-full" />
            </div>
          </motion.div>
          <span className="text-xs font-semibold text-[var(--text-secondary)]">
            {CURRENT_USER.name}
          </span>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isOwn,
  participantColor,
  currentUserColor,
}: {
  message: Message;
  isOwn: boolean;
  participantColor: string;
  currentUserColor: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs px-4 py-2.5 rounded-lg ${
          isOwn
            ? `text-white`
            : `bg-[var(--bg-secondary)] text-[var(--text-primary)]`
        }`}
        style={isOwn ? { backgroundColor: currentUserColor } : {}}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <div className="flex items-center justify-end gap-1.5 mt-1">
          <p className="text-xs opacity-70">
            {formatRelativeTime(message.timestamp)}
          </p>
          {isOwn && (
            <span className="text-xs opacity-70">
              {message.read ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
