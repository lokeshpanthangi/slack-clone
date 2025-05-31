
import { useState } from 'react';
import { ChevronRight, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useChat } from './ChatContext';

export const UserProfilePopup = () => {
  const { currentUser } = useChat();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-lg text-gray-400 hover:bg-slate-700 hover:text-white relative"
        >
          <span className="text-lg">{currentUser.avatar}</span>
          <Circle className="w-3 h-3 absolute -bottom-1 -right-1 fill-green-500 text-green-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        align="end"
        className="w-80 p-0 bg-slate-800 border-slate-700 text-white"
      >
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <span className="text-2xl">{currentUser.avatar}</span>
              <Circle className="w-4 h-4 absolute -bottom-1 -right-1 fill-green-500 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{currentUser.name}</h3>
              <p className="text-sm text-green-400 flex items-center gap-1">
                <Circle className="w-2 h-2 fill-current" />
                Active
              </p>
            </div>
          </div>

          {/* Status Update */}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-slate-700 mb-4"
          >
            😶 Update your status
          </Button>

          <Separator className="bg-slate-700 mb-4" />

          {/* Menu Items */}
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-slate-700"
            >
              Set yourself as away
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-between text-gray-300 hover:bg-slate-700"
            >
              Pause notifications
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Separator className="bg-slate-700 my-4" />

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-slate-700"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-slate-700"
            >
              Preferences
            </Button>
          </div>

          <Separator className="bg-slate-700 my-4" />

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-between text-gray-300 hover:bg-slate-700"
            >
              Downloads
              <span className="text-xs text-gray-500">Ctrl+Shift+J</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-slate-700"
            >
              ⚡ Upgrade MisogiAI
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-slate-700"
            >
              Sign out of MisogiAI
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
