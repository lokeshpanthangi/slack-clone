
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoreMenu: React.FC<MoreMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: '🧩',
      title: 'Templates',
      subtitle: 'Kickstart any job with these pre-built bundles',
      badge: 'NEW'
    },
    {
      icon: '🎨',
      title: 'Canvases',
      subtitle: 'Curate content and collaborate',
      badge: 'NEW'
    },
    {
      icon: '📄',
      title: 'Files',
      subtitle: 'Documents, clips, and attachments'
    },
    {
      icon: '💬',
      title: 'Channels',
      subtitle: "Browse your team's conversations"
    },
    {
      icon: '👥',
      title: 'People',
      subtitle: 'Your team and user groups'
    },
    {
      icon: '🔗',
      title: 'External connections',
      subtitle: 'Work with people from other organizations'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-semibold">More</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg transition-colors text-left"
              onClick={onClose}
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.title}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">{item.subtitle}</p>
              </div>
            </button>
          ))}
          
          <div className="pt-4 border-t border-slate-700">
            <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Customize navigation bar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
