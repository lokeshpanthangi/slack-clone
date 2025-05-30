
import { useState } from 'react';
import { Message, useChat } from './ChatContext';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Reply, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageItemProps {
  message: Message;
  showAvatar: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, showAvatar }) => {
  const { addReaction, currentUser } = useChat();
  const [showActions, setShowActions] = useState(false);

  const handleReaction = (emoji: string) => {
    addReaction(message.id, emoji);
  };

  const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex gap-3">
        {showAvatar ? (
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            {message.userAvatar || message.userName.charAt(0)}
          </div>
        ) : (
          <div className="w-10" />
        )}
        
        <div className="flex-1 min-w-0">
          {showAvatar && (
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">{message.userName}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </span>
              {message.edited && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
            </div>
          )}
          
          <div className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>
          
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => handleReaction(reaction.emoji)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                    reaction.users.includes(currentUser.id)
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.users.length}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {showActions && (
        <div className="absolute top-0 right-0 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center">
            {commonEmojis.map(emoji => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted"
                onClick={() => handleReaction(emoji)}
              >
                {emoji}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Reply className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
