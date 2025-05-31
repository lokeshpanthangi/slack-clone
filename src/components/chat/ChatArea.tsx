
import { useState } from 'react';
import { useChat } from './ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { DraftsView } from './DraftsView';
import { HuddlesView } from './HuddlesView';
import { DMsListView } from './DMsListView';
import { ActivityView } from './ActivityView';
import { Hash, Lock, MessageCircle, Users, Phone, Video, Settings, Info, Star, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatArea = () => {
  const { channels, activeChannelId, users } = useChat();
  const [currentView, setCurrentView] = useState('chat'); // 'chat', 'drafts', 'huddles', 'dms', 'activity'
  
  const activeChannel = channels.find(c => c.id === activeChannelId);

  // Handle special navigation from sidebar buttons
  const handleSidebarNavigation = (section: string) => {
    switch (section) {
      case 'drafts':
        setCurrentView('drafts');
        break;
      case 'huddles':
        setCurrentView('huddles');
        break;
      case 'dms-list':
        setCurrentView('dms');
        break;
      case 'activity':
        setCurrentView('activity');
        break;
      default:
        setCurrentView('chat');
    }
  };

  // Render different views based on current view
  if (currentView === 'drafts') {
    return <DraftsView />;
  }

  if (currentView === 'huddles') {
    return <HuddlesView />;
  }

  if (currentView === 'dms') {
    return <DMsListView />;
  }

  if (currentView === 'activity') {
    return <ActivityView />;
  }

  // Default chat view
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
