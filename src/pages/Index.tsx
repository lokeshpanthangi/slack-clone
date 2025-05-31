
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { DraftsView } from '@/components/chat/DraftsView';
import { HuddlesView } from '@/components/chat/HuddlesView';
import { DMsListView } from '@/components/chat/DMsListView';
import { ActivityView } from '@/components/chat/ActivityView';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatProvider } from '@/components/chat/ChatContext';
import { useAuth } from '@/components/auth/AuthProvider';
import { AuthPage } from '@/components/auth/AuthPage';
import { WorkspaceSelector } from '@/components/workspace/WorkspaceSelector';

const Index = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('chat');
  const [currentWorkspace, setCurrentWorkspace] = useState<any>(null);

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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

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
          <div className="flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col">
            {currentWorkspace && (
              <div className="bg-purple-800 text-white">
                <WorkspaceSelector 
                  onWorkspaceChange={setCurrentWorkspace}
                />
              </div>
            )}
            {!currentWorkspace && (
              <div className="bg-purple-800 text-white">
                <WorkspaceSelector 
                  onWorkspaceChange={setCurrentWorkspace}
                />
              </div>
            )}
            {renderMainContent()}
          </div>
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Index;
