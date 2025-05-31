
import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Hash, Lock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from './ChatContext';
import { ChannelCreationModal } from './ChannelCreationModal';

interface SecondarySidebarProps {
  activeSection: string;
}

export const SecondarySidebar: React.FC<SecondarySidebarProps> = ({ 
  activeSection 
}) => {
  const { 
    channels, 
    activeChannelId, 
    setActiveChannel, 
    workspaceName,
    users 
  } = useChat();
  
  const [isChannelsExpanded, setIsChannelsExpanded] = useState(true);
  const [isDMsExpanded, setIsDMsExpanded] = useState(true);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);

  const channelItems = channels.filter(c => c.type === 'channel');
  const dmItems = channels.filter(c => c.type === 'dm');

  if (activeSection !== 'dms') {
    return (
      <div className="w-64 bg-purple-800 text-white border-r border-purple-700">
        <div className="p-4">
          <h2 className="text-lg font-semibold">{workspaceName}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-purple-800 text-white flex flex-col border-r border-purple-700">
      {/* Header */}
      <div className="p-4 border-b border-purple-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold">{workspaceName}</h1>
        </div>
        
        <div className="relative">
          <Input
            placeholder={`Search ${workspaceName}`}
            className="bg-purple-700/50 border-purple-600 text-white placeholder:text-purple-300"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Direct Messages Section */}
        <div className="p-2">
          <div className="space-y-1 mb-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-purple-200 hover:bg-purple-700"
            >
              🏠 Huddles
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-purple-200 hover:bg-purple-700"
            >
              📝 Drafts & sent
            </Button>
          </div>

          {/* Channels */}
          <div className="mb-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium text-purple-200 hover:bg-purple-700 p-2"
              onClick={() => setIsChannelsExpanded(!isChannelsExpanded)}
            >
              <span className="flex items-center gap-2">
                {isChannelsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Channels
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-purple-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChannelModalOpen(true);
                }}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </Button>
            
            {isChannelsExpanded && (
              <div className="ml-4 space-y-1">
                {channelItems.map((channel) => (
                  <Button
                    key={channel.id}
                    variant="ghost"
                    className={`w-full justify-start text-sm p-2 ${
                      activeChannelId === channel.id
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-200 hover:bg-purple-700'
                    }`}
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    <span className="flex items-center gap-2">
                      {channel.isPrivate ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Hash className="w-4 h-4" />
                      )}
                      {channel.name}
                    </span>
                  </Button>
                ))}
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-purple-300 hover:bg-purple-700 p-2"
                  onClick={() => setIsChannelModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add channels
                </Button>
              </div>
            )}
          </div>

          {/* Direct Messages */}
          <div className="mb-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium text-purple-200 hover:bg-purple-700 p-2"
              onClick={() => setIsDMsExpanded(!isDMsExpanded)}
            >
              <span className="flex items-center gap-2">
                {isDMsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Direct messages
              </span>
            </Button>
            
            {isDMsExpanded && (
              <div className="ml-4 space-y-1">
                {dmItems.map((dm) => {
                  const user = users.find(u => dm.name.includes(u.name));
                  return (
                    <Button
                      key={dm.id}
                      variant="ghost"
                      className={`w-full justify-start text-sm p-2 ${
                        activeChannelId === dm.id
                          ? 'bg-purple-600 text-white'
                          : 'text-purple-200 hover:bg-purple-700'
                      }`}
                      onClick={() => setActiveChannel(dm.id)}
                    >
                      <span className="flex items-center gap-2">
                        <div className="relative">
                          <span className="text-sm">{user?.avatar || '👤'}</span>
                          {user?.status === 'online' && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-800" />
                          )}
                        </div>
                        {dm.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Apps Section */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between text-sm font-medium text-purple-200 hover:bg-purple-700 p-2"
            >
              <span className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Apps
              </span>
            </Button>
            <div className="ml-4 mt-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-purple-300 hover:bg-purple-700 p-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add apps
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ChannelCreationModal 
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
      />
    </div>
  );
};
