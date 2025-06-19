
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { History, Trash2, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  mood?: string;
  confidence?: number;
  reactions?: string[];
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  lastUpdated: string;
}

interface ConversationHistoryProps {
  onLoadConversation: (messages: Message[]) => void;
  currentMessages: Message[];
  onSaveConversation: () => void;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  onLoadConversation,
  currentMessages,
  onSaveConversation
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nova-conversations');
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  }, []);

  const saveCurrentConversation = () => {
    if (currentMessages.length === 0) return;
    
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: currentMessages[0]?.text.substring(0, 50) + '...' || 'New Conversation',
      messages: currentMessages,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    const updated = [...conversations, newConversation];
    setConversations(updated);
    localStorage.setItem('nova-conversations', JSON.stringify(updated));
    onSaveConversation();
  };

  const deleteConversation = (id: string) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    localStorage.setItem('nova-conversations', JSON.stringify(updated));
  };

  const exportConversation = (conversation: Conversation) => {
    const content = conversation.messages
      .map(m => `${m.isUser ? 'You' : 'Nova'}: ${m.text}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova-conversation-${conversation.createdAt.slice(0, 10)}.txt`;
    a.click();
  };

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.messages.some(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-30 glass-dark"
      >
        <History className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="fixed left-4 top-16 z-30 w-80 h-96 glass-dark rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">History</h3>
        <div className="flex space-x-2">
          <Button onClick={saveCurrentConversation} size="sm" variant="ghost">
            Save Current
          </Button>
          <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost">
            ×
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-600"
          />
        </div>
      </div>

      <ScrollArea className="h-64">
        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div 
                  className="flex-1"
                  onClick={() => onLoadConversation(conversation.messages)}
                >
                  <h4 className="text-sm font-medium text-white truncate">
                    {conversation.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(conversation.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {conversation.messages.length} messages
                  </p>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    onClick={() => exportConversation(conversation)}
                    size="sm"
                    variant="ghost"
                    className="p-1 h-auto"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={() => deleteConversation(conversation.id)}
                    size="sm"
                    variant="ghost"
                    className="p-1 h-auto text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;
