
import { useChat } from './ChatContext';
import { useTheme } from '../ThemeProvider';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserStatus } from './UserStatus';
import { WorkspaceHeader } from './WorkspaceHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { ChannelList } from './ChannelList';

export const Sidebar = () => {
  const { currentUser, workspaceName, setWorkspaceName } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Workspace Header */}
      <WorkspaceHeader 
        workspaceName={workspaceName} 
        onWorkspaceChange={setWorkspaceName}
      />

      {/* Navigation */}
      <SidebarNavigation />

      {/* Channels and DMs */}
      <ChannelList />

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <UserStatus user={currentUser} showName />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
