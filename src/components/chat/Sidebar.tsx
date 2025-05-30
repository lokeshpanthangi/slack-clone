
import { useState } from 'react';
import { useChat } from './ChatContext';
import { useTheme } from '../ThemeProvider';
import { Hash, Lock, MessageCircle, Users, Settings, Search, Plus, Moon, Sun, Home, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserStatus } from './UserStatus';

export const Sidebar = () => {
  const { channels, activeChannelId, setActiveChannel, users, currentUser } = useChat();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChannelIcon = (channel: any) => {
    if (channel.type === 'dm') return <MessageCircle className="w-4 h-4" />;
    if (channel.isPrivate) return <Lock className="w-4 h-4" />;
    return <Hash className="w-4 h-4" />;
  };

  return (
    <div className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-sidebar font-bold text-lg">M</span>
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground">MisogiAI</h1>
        </div>
        <div className="flex items-center justify-between">
          <UserStatus user={currentUser} showName />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 py-2">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Home className="w-4 h-4 mr-3" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <MessageCircle className="w-4 h-4 mr-3" />
            DMs
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Bell className="w-4 h-4 mr-3" />
            Activity
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/60" />
          <Input
            placeholder="Search MisogiAI"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/60"
          />
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-sidebar-foreground/80">
              Channels
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          {filteredChannels
            .filter(channel => channel.type === 'channel')
            .map(channel => (
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

        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-sidebar-foreground/80">
              Direct messages
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          {filteredChannels
            .filter(channel => channel.type === 'dm')
            .map(channel => (
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

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="w-4 h-4 mr-3" />
          Preferences
        </Button>
      </div>
    </div>
  );
};
