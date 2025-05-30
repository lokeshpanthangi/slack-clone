
import { useState } from 'react';
import { useChat } from './ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Hash, Lock, MessageCircle, Users, Phone, Video, Settings, Info, Star, Bookmark } from 'lucide-react';
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
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-background">
        <div className="flex items-center gap-3">
          {getChannelIcon()}
          <div>
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              {activeChannel.name}
              {activeChannel.type === 'dm' && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </h2>
            {activeChannel.type === 'channel' && (
              <p className="text-xs text-muted-foreground">{memberCount} members</p>
            )}
            {activeChannel.type === 'dm' && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {activeChannel.type === 'dm' && (
            <>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Video className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList channelId={activeChannelId} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-background p-4">
        <MessageInput />
      </div>
    </div>
  );
};
