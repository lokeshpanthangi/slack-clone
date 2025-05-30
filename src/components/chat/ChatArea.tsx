
import { useState } from 'react';
import { useChat } from './ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Hash, Lock, MessageCircle, Users, Phone, Video, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatArea = () => {
  const { channels, activeChannelId, users } = useChat();
  const activeChannel = channels.find(c => c.id === activeChannelId);

  if (!activeChannel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground/60 mb-2">No channel selected</h2>
          <p className="text-foreground/40">Choose a channel from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  const getChannelIcon = () => {
    if (activeChannel.type === 'dm') return <MessageCircle className="w-5 h-5" />;
    if (activeChannel.isPrivate) return <Lock className="w-5 h-5" />;
    return <Hash className="w-5 h-5" />;
  };

  const memberCount = activeChannel.type === 'channel' ? users.length : 2;

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-3">
          {getChannelIcon()}
          <div>
            <h2 className="font-semibold text-card-foreground">{activeChannel.name}</h2>
            {activeChannel.type === 'channel' && (
              <p className="text-xs text-muted-foreground">{memberCount} members</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {activeChannel.type === 'dm' && (
            <>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm">
            <Users className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList channelId={activeChannelId} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-card p-4">
        <MessageInput />
      </div>
    </div>
  );
};
