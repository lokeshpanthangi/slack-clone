
import { useState } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatProvider } from '@/components/chat/ChatContext';

const Index = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="h-screen flex bg-background text-foreground">
          <Sidebar />
          <ChatArea />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Index;
