import { Conversation, Message } from "@/types";
import { CURRENT_USER } from "./mock-users";

// Helper to create a message
function createMessage(
  id: string,
  sender: string,
  content: string,
  minutesAgo: number,
  read: boolean = true
): Message {
  return {
    id,
    sender,
    content,
    timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
    read,
  };
}

// Mock conversation data
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    participantId: "user-1", // Sophia Chen
    messages: [
      createMessage("msg-1-1", "user-1", "Just found the most amazing vase! 🏺", 45, true),
      createMessage("msg-1-2", CURRENT_USER.id, "That's gorgeous! Where did you find it?", 43, true),
      createMessage("msg-1-3", "user-1", "Saw it at this cute little shop downtown", 42, true),
      createMessage("msg-1-4", "user-1", "You should totally check it out", 41, true),
      createMessage("msg-1-5", CURRENT_USER.id, "I will! Thanks for the tip 💕", 40, true),
      createMessage("msg-1-6", "user-1", "Btw did you end up getting that candle?", 5, false),
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
  },
  {
    id: "conv-2",
    participantId: "user-2", // Liam Park
    messages: [
      createMessage("msg-2-1", CURRENT_USER.id, "Hey! Did you watch the designer talk last night?", 120, true),
      createMessage("msg-2-2", "user-2", "I did! It was so inspiring 🎨", 118, true),
      createMessage("msg-2-3", "user-2", "That part about sustainable materials really stuck with me", 117, true),
      createMessage("msg-2-4", CURRENT_USER.id, "Right? I want to check out their collection", 115, true),
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "conv-3",
    participantId: "user-3", // Olivia Rose
    messages: [
      createMessage("msg-3-1", "user-3", "Love the outfit you posted! ✨", 240, true),
      createMessage("msg-3-2", CURRENT_USER.id, "Thanks so much! Just tried mixing old and new pieces", 238, true),
      createMessage("msg-3-3", "user-3", "It works perfectly! The vintage jacket is perfection", 236, true),
      createMessage("msg-3-4", CURRENT_USER.id, "Found it at a thrift store last month", 234, true),
      createMessage("msg-3-5", "user-3", "Amazing finds over there lately?", 2, false),
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 2), // 2 min ago
  },
  {
    id: "conv-4",
    participantId: "user-4", // Marcus Johnson
    messages: [
      createMessage("msg-4-1", "user-4", "Your collection inspiration post was 🔥", 360, true),
      createMessage("msg-4-2", CURRENT_USER.id, "Thanks Marcus! Took me forever to curate", 358, true),
      createMessage("msg-4-3", "user-4", "Well it shows. Every piece tells a story", 356, true),
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
  },
  {
    id: "conv-5",
    participantId: "user-5", // Emma Wilson
    messages: [
      createMessage("msg-5-1", "user-5", "The kitchen tools you recommended changed my life", 480, true),
      createMessage("msg-5-2", CURRENT_USER.id, "Haha no way! Which ones?", 478, true),
      createMessage("msg-5-3", "user-5", "Those Japanese knives mostly! Now I can actually cook 😄", 476, true),
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 480), // 8 hours ago
  },
  {
    id: "conv-6",
    participantId: "user-6", // Alex Chen
    messages: [
      createMessage("msg-6-1", CURRENT_USER.id, "Hey, want to collab on a wishlist video?", 600, false),
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 600), // 10 hours ago
  },
];

// Get all conversations sorted by most recent
export function getConversationsByUser(): Conversation[] {
  return [...MOCK_CONVERSATIONS].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );
}

// Get a specific conversation by ID
export function getConversation(id: string): Conversation | undefined {
  return MOCK_CONVERSATIONS.find((c) => c.id === id);
}

// Get unread message count
export function getUnreadCount(): number {
  let count = 0;
  MOCK_CONVERSATIONS.forEach((conv) => {
    conv.messages.forEach((msg) => {
      if (msg.sender !== CURRENT_USER.id && !msg.read) {
        count++;
      }
    });
  });
  return count;
}

// Mark conversation as read
export function markConversationAsRead(conversationId: string): void {
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === conversationId);
  if (conv) {
    conv.messages.forEach((msg) => {
      if (msg.sender !== CURRENT_USER.id) {
        msg.read = true;
      }
    });
  }
}

// Add a new message to a conversation
export function addMessageToConversation(
  conversationId: string,
  sender: string,
  content: string
): Message | null {
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === conversationId);
  if (!conv) return null;

  const message: Message = {
    id: `msg-${conversationId}-${Date.now()}`,
    sender,
    content,
    timestamp: new Date(),
    read: sender === CURRENT_USER.id, // Mark as read if we sent it
  };

  conv.messages.push(message);
  conv.updatedAt = new Date();

  // Re-sort conversations
  MOCK_CONVERSATIONS.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return message;
}

// Delete a conversation
export function deleteConversation(conversationId: string): boolean {
  const index = MOCK_CONVERSATIONS.findIndex((c) => c.id === conversationId);
  if (index !== -1) {
    MOCK_CONVERSATIONS.splice(index, 1);
    return true;
  }
  return false;
}
