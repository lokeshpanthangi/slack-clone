
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: Date;
  edited?: boolean;
  reactions?: { emoji: string; users: string[] }[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  isPrivate?: boolean;
  members?: string[];
  lastMessage?: Message;
}

interface ChatContextType {
  currentUser: User;
  channels: Channel[];
  activeChannelId: string;
  messages: Record<string, Message[]>;
  users: User[];
  setActiveChannel: (channelId: string) => void;
  sendMessage: (content: string) => void;
  addReaction: (messageId: string, emoji: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    avatar: '👨‍💼',
    status: 'online'
  });

  const [users] = useState<User[]>([
    { id: '1', name: 'John Doe', avatar: '👨‍💼', status: 'online' },
    { id: '2', name: 'Sarah Smith', avatar: '👩‍💻', status: 'online' },
    { id: '3', name: 'Mike Johnson', avatar: '👨‍🎨', status: 'away' },
    { id: '4', name: 'Emma Wilson', avatar: '👩‍🔬', status: 'busy' },
  ]);

  const [channels] = useState<Channel[]>([
    { id: 'general', name: 'general', type: 'channel' },
    { id: 'random', name: 'random', type: 'channel' },
    { id: 'development', name: 'development', type: 'channel', isPrivate: true },
    { id: 'dm-sarah', name: 'Sarah Smith', type: 'dm' },
    { id: 'dm-mike', name: 'Mike Johnson', type: 'dm' },
  ]);

  const [activeChannelId, setActiveChannelId] = useState('general');

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      {
        id: '1',
        content: 'Welcome to the team! 🎉',
        userId: '2',
        userName: 'Sarah Smith',
        userAvatar: '👩‍💻',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        content: 'Thanks! Excited to be here and start contributing to the project.',
        userId: '1',
        userName: 'John Doe',
        userAvatar: '👨‍💼',
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
    random: [
      {
        id: '3',
        content: 'Anyone up for lunch? 🍕',
        userId: '3',
        userName: 'Mike Johnson',
        userAvatar: '👨‍🎨',
        timestamp: new Date(Date.now() - 1800000),
        reactions: [{ emoji: '🍕', users: ['2', '4'] }],
      },
    ],
    development: [
      {
        id: '4',
        content: 'Just pushed the new feature branch. Please review when you get a chance.',
        userId: '4',
        userName: 'Emma Wilson',
        userAvatar: '👩‍🔬',
        timestamp: new Date(Date.now() - 900000),
      },
    ],
  });

  const setActiveChannel = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
  }, []);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMessage],
    }));
  }, [activeChannelId, currentUser]);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages(prev => ({
      ...prev,
      [activeChannelId]: prev[activeChannelId]?.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);
          
          if (existingReaction) {
            if (existingReaction.users.includes(currentUser.id)) {
              existingReaction.users = existingReaction.users.filter(id => id !== currentUser.id);
              if (existingReaction.users.length === 0) {
                return { ...msg, reactions: reactions.filter(r => r.emoji !== emoji) };
              }
            } else {
              existingReaction.users.push(currentUser.id);
            }
          } else {
            reactions.push({ emoji, users: [currentUser.id] });
          }
          
          return { ...msg, reactions };
        }
        return msg;
      }) || [],
    }));
  }, [activeChannelId, currentUser.id]);

  return (
    <ChatContext.Provider value={{
      currentUser,
      channels,
      activeChannelId,
      messages,
      users,
      setActiveChannel,
      sendMessage,
      addReaction,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
