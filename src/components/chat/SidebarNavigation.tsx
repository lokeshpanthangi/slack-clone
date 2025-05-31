
import { Home, MessageCircle, Bell, Users, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SidebarNavigation = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: MessageCircle, label: 'DMs', active: true },
    { icon: Bell, label: 'Activity', active: false },
    { icon: Users, label: 'People & user groups', active: false },
    { icon: FileText, label: 'Canvas', active: false },
    { icon: MoreHorizontal, label: 'More', active: false },
  ];

  return (
    <div className="px-3 py-2 border-b border-sidebar-border">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start text-sm transition-colors ${
              item.active 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
