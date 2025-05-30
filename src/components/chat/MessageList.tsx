
import { useEffect, useRef } from 'react';
import { useChat } from './ChatContext';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  channelId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ channelId }) => {
  const { messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelMessages = messages[channelId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages]);

  return (
    <div className="h-full overflow-y-auto px-4 py-4 space-y-4">
      {channelMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground/60">Start the conversation!</p>
          </div>
        </div>
      ) : (
        channelMessages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            showAvatar={
              index === 0 ||
              channelMessages[index - 1]?.userId !== message.userId ||
              new Date(message.timestamp).getTime() - new Date(channelMessages[index - 1]?.timestamp).getTime() > 300000
            }
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
