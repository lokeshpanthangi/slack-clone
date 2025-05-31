
import { Button } from '@/components/ui/button';
import { Plus, Hash } from 'lucide-react';
import { useChat } from './ChatContext';

export const HuddlesView = () => {
  const { users, channels } = useChat();

  const directMessages = [
    { id: 1, name: 'Aman Acharya', status: 'Away', avatar: '👨‍💼' },
    { id: 2, name: 'Priya', status: 'Away', avatar: '👩‍💻' },
    { id: 3, name: 'Amol Barkale', status: 'Away', avatar: '👨‍🎨' }
  ];

  const channelsList = [
    { id: 1, name: 'learn-ask-build' },
    { id: 2, name: 'introduce-yourself' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Huddles</h1>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Huddle
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-8">
        {/* Hero Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Instantly connect over audio or video
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Talk it out in real time on a huddle, with screen-sharing, expressive reactions
              and a message thread that automatically saves for later reference.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              🎧 Start a Huddle
            </Button>
          </div>
          
          {/* Huddle Demo Card */}
          <div className="w-80 h-48 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4 relative">
            <div className="absolute top-4 left-4 right-4 h-24 bg-gradient-to-br from-blue-400 to-yellow-400 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                🎤
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                ✨
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                💻
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                ⋮
              </div>
            </div>
          </div>
        </div>

        {/* Direct Messages Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Direct messages</h3>
            <span className="text-sm text-muted-foreground">— Talk privately 1:1 with someone</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {directMessages.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white text-lg">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Channels</h3>
            <span className="text-sm text-muted-foreground">— talk with a teammate, or</span>
            <button className="text-sm text-blue-500 hover:underline">upgrade</button>
            <span className="text-sm text-muted-foreground">to meet with the whole team.</span>
          </div>
          
          <div className="space-y-2">
            {channelsList.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg transition-colors cursor-pointer"
              >
                <Hash className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{channel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
