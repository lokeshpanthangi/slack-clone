
import { useState } from 'react';
import { Bell } from 'lucide-react';

export const ActivityView = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'mentions', label: '@ Mentions' },
    { id: 'threads', label: 'Threads' },
    { id: 'reactions', label: 'Reactions' },
    { id: 'invitations', label: 'Invitations' }
  ];

  const activities = [
    {
      id: 1,
      type: 'reaction',
      channel: '#learn-ask-build',
      user: 'Amol Barkale and 2 others',
      action: 'reacted in',
      time: '14 mins',
      content: null
    },
    {
      id: 2,
      type: 'message',
      channel: null,
      user: 'Venkata Lokesh',
      action: 'To download TRAE',
      time: null,
      content: 'https://www.trae.ai/...',
      reactions: '🙌 3'
    },
    {
      id: 3,
      type: 'mention',
      channel: '#cohort-1',
      user: 'Aman Vats',
      action: '@channel mention in',
      time: 'Yesterday',
      content: 'One important point @channel - one of the main agenda of our today\'s/tomorrow\'s session (depending on by when are we done with...'
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Activity List */}
      <div className="w-96 border-r border-border bg-background">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Activity</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Unreads</span>
              <div className="w-8 h-5 bg-muted rounded-full relative">
                <div className="absolute left-1 top-0.5 w-4 h-4 bg-background rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 border-b border-border/50 hover:bg-accent cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center text-white text-sm font-semibold">
                  {activity.user.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{activity.user}</span>
                    <span className="text-sm text-muted-foreground">{activity.action}</span>
                    {activity.channel && (
                      <span className="text-sm text-blue-500">{activity.channel}</span>
                    )}
                    {activity.time && (
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    )}
                  </div>
                  
                  {activity.content && (
                    <p className="text-sm text-foreground mb-2">{activity.content}</p>
                  )}
                  
                  {activity.reactions && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{activity.reactions}</span>
                      <button className="w-5 h-5 text-muted-foreground hover:text-foreground">
                        💬
                      </button>
                    </div>
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
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Selected Activity Detail */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-foreground">learn-ask-build</span>
            <span className="text-sm text-muted-foreground">🧠 Learn. ❓ Ask. ⚒️ Build. — This is your all-in-one dojo to grow, share, and ship</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">83</span>
              <button className="p-1 hover:bg-accent rounded">🎧</button>
              <button className="p-1 hover:bg-accent rounded">⋮</button>
              <button className="p-1 hover:bg-accent rounded">❌</button>
            </div>
          </div>
        </div>

        {/* Activity Detail Content */}
        <div className="flex-1 p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              Request has been blocked as our system has detected suspicious activity. You've reached your trial request limit...
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white text-sm">
                V
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Venkata Lokesh</span>
                  <span className="text-sm text-muted-foreground">9:42 PM</span>
                </div>
                <p className="text-sm mb-2">To download TRAE : https://www.trae.ai/</p>
                <p className="text-sm text-muted-foreground mb-2">you can use VPN to buy Pro version</p>
                
                <div className="bg-card border rounded-lg p-3 mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="font-medium text-sm">Trae - Collaborate with Intelligence</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trae IDE integrates seamlessly into your workflow, collaborating with you to maximize performance and efficiency. (122 kB)
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">🙌 3</span>
                  <button className="text-sm text-muted-foreground hover:text-foreground">💬</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
