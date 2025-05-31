
import { useState } from 'react';
import { Hash, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@/components/ui/dialog-description';
import { Switch } from '@/components/ui/switch';
import { useChat } from './ChatContext';

interface ChannelCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChannelCreationModal: React.FC<ChannelCreationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addChannel } = useChat();
  const [channelName, setChannelName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (channelName.trim()) {
      const newChannel = {
        id: `channel-${Date.now()}`,
        name: channelName.toLowerCase().replace(/\s+/g, '-'),
        type: 'channel' as const,
        isPrivate,
        description: description.trim() || undefined,
      };
      
      addChannel(newChannel);
      setChannelName('');
      setDescription('');
      setIsPrivate(false);
      onClose();
    }
  };

  const handleClose = () => {
    setChannelName('');
    setDescription('');
    setIsPrivate(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Create a channel</DialogTitle>
          <DialogDescription className="text-slate-400">
            Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Channel Name */}
          <div>
            <Label htmlFor="channel-name" className="text-white">Name</Label>
            <div className="relative mt-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {isPrivate ? (
                  <Lock className="w-4 h-4 text-slate-400" />
                ) : (
                  <Hash className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <Input
                id="channel-name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g. plan-budget"
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                maxLength={21}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {channelName.length}/21 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-white">Description (optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this channel about?"
              className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Privacy Setting */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Make private</Label>
              <p className="text-sm text-slate-400">
                Only specific people can access this channel
              </p>
            </div>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!channelName.trim()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
