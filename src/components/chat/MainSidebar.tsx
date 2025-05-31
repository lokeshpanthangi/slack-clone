
import { Home, MessageCircle, Bell, Users, Settings, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfilePopup } from './UserProfilePopup';

interface MainSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const mainItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dms', icon: MessageCircle, label: 'DMs' },
    { id: 'activity', icon: Bell, label: 'Activity' },
    { id: 'people', icon: Users, label: 'People & user groups' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
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
            onClick={() => onSectionChange(item.id)}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
      </div>

      {/* User Profile at Bottom */}
      <div className="mt-auto">
        <UserProfilePopup />
      </div>
    </div>
  );
};
