
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const DraftsView = () => {
  const [activeTab, setActiveTab] = useState('drafts');

  const tabs = [
    { id: 'drafts', label: 'Drafts' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'sent', label: 'Sent' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Drafts & sent</h1>
          <Button variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 border-b-2 transition-colors ${
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="w-16 h-12 bg-white rounded opacity-80"></div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              All your outgoing messages
            </h2>
            <p className="text-muted-foreground">
              Everything you send, draft, and schedule can now be found here.
            </p>
          </div>
          
          {activeTab === 'drafts' && (
            <div className="pt-8 space-y-4">
              <div className="w-16 h-4 bg-purple-600 rounded-full mx-auto transform rotate-12"></div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">
                  Draft messages to send when you're ready
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start typing a message anywhere, then find it here. Re-read,
                  revise, and send whenever you'd like.
                </p>
              </div>
              <Button className="mt-4">New Message</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
