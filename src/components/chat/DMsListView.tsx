
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useChat } from './ChatContext';

export const DMsListView = () => {
  const { users, setActiveChannel } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const directMessages = [
    { id: 'dm-dipak', name: 'Dipak Kumar Tomar', lastMessage: 'Hello !', time: '', avatar: '👨‍💼', isActive: true },
    { id: 'dm-ramjayanth', name: 'Ramjayanth Vajja', lastMessage: 'Allright', time: 'May 21st', avatar: '👨‍🎨', isActive: false },
    { id: 'dm-nandini', name: 'Nandini Korlakanti', lastMessage: 'hiii venkata lokesh', time: '', avatar: '👩‍💻', isActive: false },
    { id: 'dm-sai', name: 'Sai Lokesh Manchineella', lastMessage: 'Hi', time: 'May 15th', avatar: '👨‍💼', isActive: false },
    { id: 'dm-ravin', name: 'Ravin Kumar Jangir', lastMessage: '', time: '', avatar: '👨‍🔬', isActive: false },
    { id: 'dm-dhruv', name: 'Dhruv Sahu', lastMessage: '', time: '', avatar: '👨‍🎨', isActive: false },
    { id: 'dm-harishankar', name: 'Harishankar', lastMessage: '', time: '', avatar: '👨‍💼', isActive: false },
    { id: 'dm-jyothsna', name: 'Jyothsna Meduri', lastMessage: '', time: '', avatar: '👩‍💻', isActive: false },
    { id: 'dm-aman', name: 'Aman Acharya', lastMessage: 'You: Is today the last day to apply for mac challenge ?', time: 'May 12th', avatar: '👨‍💼', isActive: false },
    { id: 'dm-nikith', name: 'Nikith Majeti', lastMessage: '', time: 'May 11th', avatar: '👨‍🎨', isActive: false }
  ];

  const filteredDMs = directMessages.filter(dm =>
    dm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - DM List */}
      <div className="w-80 border-r border-border bg-background">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Direct messages</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Unreads</span>
              <div className="w-8 h-5 bg-muted rounded-full relative">
                <div className="absolute left-1 top-0.5 w-4 h-4 bg-background rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Find a DM"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-accent"
            />
          </div>
        </div>

        {/* DM List */}
        <div className="flex-1 overflow-y-auto">
          {filteredDMs.map((dm) => (
            <div
              key={dm.id}
              onClick={() => setActiveChannel(dm.id)}
              className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer border-b border-border/50"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
                  {dm.name.charAt(0)}
                </div>
                {dm.isActive && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground truncate">{dm.name}</span>
                  {dm.time && (
                    <span className="text-xs text-muted-foreground">{dm.time}</span>
                  )}
                </div>
                {dm.lastMessage && (
                  <p className="text-sm text-muted-foreground truncate">{dm.lastMessage}</p>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <button className="w-5 h-5 flex items-center justify-center hover:bg-accent-foreground/10 rounded">
                  📌
                </button>
                <button className="w-5 h-5 flex items-center justify-center hover:bg-accent-foreground/10 rounded">
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Selected DM Header */}
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
                D
              </div>
              <span className="font-semibold text-foreground">Dipak Kumar Tomar</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-accent rounded">🎧</button>
              <button className="p-2 hover:bg-accent rounded">⋮</button>
              <button className="p-2 hover:bg-accent rounded">❌</button>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
                D
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Dipak Kumar Tomar</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              This conversation is just between @Dipak Kumar Tomar and you. Check out their profile to learn more about them.
            </p>
            
            <button className="px-4 py-2 bg-accent text-foreground rounded hover:bg-accent/80">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
