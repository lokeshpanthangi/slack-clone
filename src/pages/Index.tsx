
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { DraftsView } from '@/components/chat/DraftsView';
import { HuddlesView } from '@/components/chat/HuddlesView';
import { DMsListView } from '@/components/chat/DMsListView';
import { ActivityView } from '@/components/chat/ActivityView';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatProvider } from '@/components/chat/ChatContext';

const Index = () => {
  const [currentView, setCurrentView] = useState('chat');

  useEffect(() => {
    const handleNavigateToHuddles = () => setCurrentView('huddles');
    const handleNavigateToDrafts = () => setCurrentView('drafts');
    const handleNavigateToDMs = () => setCurrentView('dms');
    const handleNavigateToActivity = () => setCurrentView('activity');
    const handleNavigateToChat = () => setCurrentView('chat');

    window.addEventListener('navigate-to-huddles', handleNavigateToHuddles);
    window.addEventListener('navigate-to-drafts', handleNavigateToDrafts);
    window.addEventListener('navigate-to-dms', handleNavigateToDMs);
    window.addEventListener('navigate-to-activity', handleNavigateToActivity);
    window.addEventListener('navigate-to-chat', handleNavigateToChat);

    return () => {
      window.removeEventListener('navigate-to-huddles', handleNavigateToHuddles);
      window.removeEventListener('navigate-to-drafts', handleNavigateToDrafts);
      window.removeEventListener('navigate-to-dms', handleNavigateToDMs);
      window.removeEventListener('navigate-to-activity', handleNavigateToActivity);
      window.removeEventListener('navigate-to-chat', handleNavigateToChat);
    };
  }, []);

  const renderMainContent = () => {
    switch (currentView) {
      case 'drafts':
        return <DraftsView />;
      case 'huddles':
        return <HuddlesView />;
      case 'dms':
        return <DMsListView />;
      case 'activity':
        return <ActivityView />;
      default:
        return <ChatArea />;
    }
  };

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="h-screen flex bg-background text-foreground">
          <Sidebar />
          {renderMainContent()}
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Index;
