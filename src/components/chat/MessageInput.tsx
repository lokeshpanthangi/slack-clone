
import { useState, useRef, KeyboardEvent } from 'react';
import { useChat } from './ChatContext';
import { Send, Plus, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const MessageInput = () => {
  const { sendMessage, activeChannelId, channels } = useChat();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const activeChannel = channels.find(c => c.id === activeChannelId);
  const placeholder = activeChannel?.type === 'dm' 
    ? `Message ${activeChannel.name}` 
    : `Message #${activeChannel?.name}`;

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="sm" className="mb-2">
          <Plus className="w-4 h-4" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[44px] max-h-[120px] resize-none pr-20 bg-background border-input"
            rows={1}
          />
          
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Smile className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};
