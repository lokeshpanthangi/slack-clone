
import { useState } from 'react';
import { useChat } from './ChatContext';
import { Hash, Lock, MessageCircle, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ChannelList = () => {
  const { channels, activeChannelId, setActiveChannel, addChannel } = useChat();
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [isChannelsExpanded, setIsChannelsExpanded] = useState(true);
  const [isDMsExpanded, setIsDMsExpanded] = useState(true);

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      addChannel({
        id: `channel-${Date.now()}`,
        name: newChannelName.trim(),
        type: 'channel',
        isPrivate: false,
      });
      setNewChannelName('');
      setIsCreateChannelOpen(false);
    }
  };

  const getChannelIcon = (channel: any) => {
    if (channel.type === 'dm') return <MessageCircle className="w-4 h-4" />;
    if (channel.isPrivate) return <Lock className="w-4 h-4" />;
    return <Hash className="w-4 h-4" />;
  };

  const channelsList = channels.filter(channel => channel.type === 'channel');
  const dmsList = channels.filter(channel => channel.type === 'dm');

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Channels Section */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setIsChannelsExpanded(!isChannelsExpanded)}
            className="flex items-center gap-1 text-sm font-semibold text-sidebar-foreground/80 hover:text-sidebar-foreground"
          >
            {isChannelsExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span>Channels</span>
          </button>
          
          <Dialog open={isCreateChannelOpen} onOpenChange={setIsCreateChannelOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a channel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="channel-name">Channel name</Label>
                  <Input
                    id="channel-name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="e.g. marketing"
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateChannelOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateChannel} disabled={!newChannelName.trim()}>
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {isChannelsExpanded && (
          <div className="space-y-0.5">
            {channelsList.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  activeChannelId === channel.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                {getChannelIcon(channel)}
                <span className="truncate">{channel.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Direct Messages Section */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setIsDMsExpanded(!isDMsExpanded)}
            className="flex items-center gap-1 text-sm font-semibold text-sidebar-foreground/80 hover:text-sidebar-foreground"
          >
            {isDMsExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span>Direct messages</span>
          </button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        {isDMsExpanded && (
          <div className="space-y-0.5">
            {dmsList.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  activeChannelId === channel.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                {getChannelIcon(channel)}
                <span className="truncate">{channel.name}</span>
                <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apps Section */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-sidebar-foreground/80">
            Apps
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Plus className="w-4 h-4" />
          <span className="truncate">Add apps</span>
        </button>
      </div>
    </div>
  );
};
