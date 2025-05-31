import { Home, MessageCircle, Bell, Users, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfilePopup } from './UserProfilePopup';
import { MoreMenu } from './MoreMenu';
import { useState } from 'react';
import { useChat } from './ChatContext';

interface MainSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { setActiveChannel } = useChat();

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    
    switch (sectionId) {
      case 'home':
        // Navigate to general channel
        setActiveChannel('general');
        window.dispatchEvent(new CustomEvent('navigate-to-chat'));
        break;
      case 'dms':
        window.dispatchEvent(new CustomEvent('navigate-to-dms'));
        break;
      case 'activity':
        window.dispatchEvent(new CustomEvent('navigate-to-activity'));
        break;
      case 'people':
        // For now, keep in DMs view but could be expanded later
        window.dispatchEvent(new CustomEvent('navigate-to-dms'));
        break;
    }
  };

  const mainItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dms', icon: MessageCircle, label: 'DMs' },
    { id: 'activity', icon: Bell, label: 'Activity' },
    { id: 'people', icon: Users, label: 'People & user groups' },
  ];

  const handleMoreClick = () => {
    setIsMoreMenuOpen(true);
  };

  return (
    <>
      <div className="w-16 bg-slate-800 flex flex-col items-center py-4 border-r border-slate-700">
        {/* Workspace Logo */}
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-6">
          <span className="text-slate-800 font-bold text-lg">M</span>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col gap-2 flex-1">
          {mainItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={`w-10 h-10 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
              onClick={() => handleSectionClick(item.id)}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
          
          {/* More Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-lg transition-colors text-gray-400 hover:bg-slate-700 hover:text-white"
            onClick={handleMoreClick}
            title="More"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* User Profile at Bottom */}
        <div className="mt-auto">
          <UserProfilePopup />
        </div>
      </div>
      
      <MoreMenu isOpen={isMoreMenuOpen} onClose={() => setIsMoreMenuOpen(false)} />
    </>
  );
};
