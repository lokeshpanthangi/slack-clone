
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

  // For home section, automatically select general channel
  if (activeSection === 'home' && activeChannelId !== 'general') {
    setActiveChannel('general');
  }

  if (activeSection === 'activity' || activeSection === 'people') {
    return null;
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
        {/* Quick Actions */}
        <div className="p-2">
          <div className="space-y-1 mb-4">
            <div
              className="w-full justify-start text-purple-200 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-huddles'))}
            >
              🏠 Huddles
            </div>
            <div
              className="w-full justify-start text-purple-200 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-drafts'))}
            >
              📝 Drafts & sent
            </div>
          </div>

          {/* Channels */}
          <div className="mb-4">
            <div
              className="w-full justify-between text-sm font-medium text-purple-200 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors flex items-center"
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
              <div
                className="h-5 w-5 p-0 hover:bg-purple-600 rounded flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChannelModalOpen(true);
                }}
              >
                <Plus className="w-3 h-3" />
              </div>
            </div>
            
            {isChannelsExpanded && (
              <div className="ml-4 space-y-1">
                {channelItems.map((channel) => (
                  <div
                    key={channel.id}
                    className={`w-full justify-start text-sm p-2 rounded cursor-pointer transition-colors flex items-center gap-2 ${
                      activeChannelId === channel.id
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-200 hover:bg-purple-700'
                    }`}
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    {channel.isPrivate ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Hash className="w-4 h-4" />
                    )}
                    {channel.name}
                  </div>
                ))}
                
                <div
                  className="w-full justify-start text-sm text-purple-300 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors flex items-center gap-2"
                  onClick={() => setIsChannelModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add channels
                </div>
              </div>
            )}
          </div>

          {/* Direct Messages */}
          <div className="mb-4">
            <div
              className="w-full justify-between text-sm font-medium text-purple-200 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors flex items-center"
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
            </div>
            
            {isDMsExpanded && (
              <div className="ml-4 space-y-1">
                {dmItems.map((dm) => {
                  const user = users.find(u => dm.name.includes(u.name));
                  return (
                    <div
                      key={dm.id}
                      className={`w-full justify-start text-sm p-2 rounded cursor-pointer transition-colors flex items-center gap-2 ${
                        activeChannelId === dm.id
                          ? 'bg-purple-600 text-white'
                          : 'text-purple-200 hover:bg-purple-700'
                      }`}
                      onClick={() => setActiveChannel(dm.id)}
                    >
                      <div className="relative">
                        <span className="text-sm">{user?.avatar || '👤'}</span>
                        {user?.status === 'online' && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-800" />
                        )}
                      </div>
                      {dm.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Apps Section */}
          <div>
            <div className="w-full justify-between text-sm font-medium text-purple-200 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors flex items-center">
              <span className="flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Apps
              </span>
            </div>
            <div className="ml-4 mt-1">
              <div className="w-full justify-start text-sm text-purple-300 hover:bg-purple-700 p-2 rounded cursor-pointer transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add apps
              </div>
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
