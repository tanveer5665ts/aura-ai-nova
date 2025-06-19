
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Heart, Laugh, Lightbulb, Copy, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessageReactionsProps {
  messageId: string;
  isUser: boolean;
  messageText: string;
  onReaction: (messageId: string, reaction: string) => void;
  reactions?: string[];
}

const MessageReactions: React.FC<MessageReactionsProps> = ({
  messageId,
  isUser,
  messageText,
  onReaction,
  reactions = []
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const { toast } = useToast();

  const reactionButtons = [
    { icon: ThumbsUp, name: 'thumbs_up', label: 'Good' },
    { icon: ThumbsDown, name: 'thumbs_down', label: 'Not helpful' },
    { icon: Heart, name: 'heart', label: 'Love it' },
    { icon: Laugh, name: 'laugh', label: 'Funny' },
    { icon: Lightbulb, name: 'lightbulb', label: 'Insightful' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    toast({ title: 'Message copied to clipboard!' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nova AI Response',
        text: messageText
      });
    } else {
      handleCopy();
    }
  };

  if (isUser) return null;

  return (
    <div 
      className="opacity-0 group-hover:opacity-100 transition-opacity mt-2"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <div className="flex items-center space-x-1">
        {showReactions && (
          <>
            {reactionButtons.map(({ icon: Icon, name, label }) => (
              <Button
                key={name}
                onClick={() => onReaction(messageId, name)}
                variant="ghost"
                size="sm"
                className={`p-1 h-auto hover:bg-slate-700/50 ${
                  reactions.includes(name) ? 'text-blue-400' : 'text-gray-400'
                }`}
                title={label}
              >
                <Icon className="w-3 h-3" />
              </Button>
            ))}
            <div className="w-px h-4 bg-slate-600 mx-1" />
            <Button
              onClick={handleCopy}
              variant="ghost"
              size="sm"
              className="p-1 h-auto text-gray-400 hover:bg-slate-700/50"
              title="Copy"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="p-1 h-auto text-gray-400 hover:bg-slate-700/50"
              title="Share"
            >
              <Share className="w-3 h-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageReactions;
