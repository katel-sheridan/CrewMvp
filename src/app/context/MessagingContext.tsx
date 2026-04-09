import { createContext, useContext, useState, ReactNode } from 'react';
import { getCreatorAvatarById } from '../data/mock-data';

/** Logged-in user for mock data and message UI (avatar alignment). */
export const CURRENT_USER_HANDLE = '@corgiburrito';

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: string;
  type: 'sent' | 'received';
}

export interface Conversation {
  id: string;
  creatorId: string;
  creatorUsername: string;
  creatorAvatar?: string;
  messages: Message[];
  status: 'pending' | 'accepted' | 'declined';
}

export interface Notification {
  id: string;
  type: 'message_accepted' | 'message_received' | 'collab_invite';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  creatorId?: string;
  conversationId?: string;
}

interface MessagingContextType {
  conversations: Conversation[];
  notifications: Notification[];
  sendMessageRequest: (creatorId: string, creatorUsername: string, text: string) => void;
  addMessage: (conversationId: string, text: string) => void;
  markNotificationRead: (id: string) => void;
  unreadCount: number;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      creatorId: '1',
      creatorUsername: '@kitsune_art',
      creatorAvatar: getCreatorAvatarById('1'),
      status: 'accepted',
      messages: [
        {
          id: 'msg-0',
          from: '@corgiburrito',
          to: '@kitsune_art',
          text: "Hey! I love your character designs. I'm working on a comic project and would love to collaborate with you on it. Are you interested?",
          timestamp: '2026-04-03T14:30:00Z',
          type: 'sent',
        },
        {
          id: 'msg-1',
          from: '@kitsune_art',
          to: '@corgiburrito',
          text: "Thanks so much! I'd love to hear more about your comic project. What kind of style are you going for?",
          timestamp: '2026-04-03T15:45:00Z',
          type: 'received',
        },
        {
          id: 'msg-2',
          from: '@corgiburrito',
          to: '@kitsune_art',
          text: "It's a dark fantasy setting with a manga-inspired style. I've got the script for the first chapter done already!",
          timestamp: '2026-04-03T16:00:00Z',
          type: 'sent',
        },
        {
          id: 'msg-3',
          from: '@kitsune_art',
          to: '@corgiburrito',
          text: "That sounds amazing! I've been wanting to work on something like that. Could you share some reference images or mood boards?",
          timestamp: '2026-04-03T16:20:00Z',
          type: 'received',
        },
      ],
    },
    {
      id: 'conv-2',
      creatorId: '3',
      creatorUsername: '@pixelforge',
      creatorAvatar: getCreatorAvatarById('3'),
      status: 'accepted',
      messages: [
        {
          id: 'msg-10',
          from: '@corgiburrito',
          to: '@pixelforge',
          text: "Hi! Saw your pixel art sprites — they're incredible. Would you be open to doing some character sprites for a game jam project?",
          timestamp: '2026-03-28T10:00:00Z',
          type: 'sent',
        },
        {
          id: 'msg-11',
          from: '@pixelforge',
          to: '@corgiburrito',
          text: "Absolutely! I love game jams. What's the theme and timeline?",
          timestamp: '2026-03-28T12:30:00Z',
          type: 'received',
        },
      ],
    },
    {
      id: 'conv-3',
      creatorId: '5',
      creatorUsername: '@synthwave_sam',
      creatorAvatar: getCreatorAvatarById('5'),
      status: 'pending',
      messages: [
        {
          id: 'msg-20',
          from: '@corgiburrito',
          to: '@synthwave_sam',
          text: "Hey Sam! I'm looking for someone to compose a soundtrack for a visual novel project. Your ambient work is exactly the vibe I'm going for.",
          timestamp: '2026-04-05T09:00:00Z',
          type: 'sent',
        },
      ],
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      type: 'message_accepted',
      title: '@kitsune_art accepted your message request',
      description: 'You can now chat with @kitsune_art',
      timestamp: '2026-04-03T15:00:00Z',
      read: false,
      creatorId: '1',
      conversationId: 'conv-1',
    },
  ]);

  const sendMessageRequest = (creatorId: string, creatorUsername: string, text: string) => {
    const convId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: convId,
      creatorId,
      creatorUsername,
      creatorAvatar: getCreatorAvatarById(creatorId),
      status: 'pending',
      messages: [
        {
          id: `msg-${Date.now()}`,
          from: '@corgiburrito',
          to: creatorUsername,
          text,
          timestamp: new Date().toISOString(),
          type: 'sent',
        },
      ],
    };
    setConversations((prev) => [...prev, newConversation]);
  };

  const addMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: `msg-${Date.now()}`,
                  from: '@corgiburrito',
                  to: conv.creatorUsername,
                  text,
                  timestamp: new Date().toISOString(),
                  type: 'sent' as const,
                },
              ],
            }
          : conv
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <MessagingContext.Provider
      value={{ conversations, notifications, sendMessageRequest, addMessage, markNotificationRead, unreadCount }}
    >
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (!context) throw new Error('useMessaging must be used within MessagingProvider');
  return context;
}