
import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

// Simple markdown renderer for basic formatting
const renderMarkdown = (text: string) => {
  // Replace **text** with bold
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace *text* with italic
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace numbered lists
  formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, '<div class="ml-4 mb-1">• $1</div>');
  
  // Replace line breaks
  formatted = formatted.replace(/\n/g, '<br />');
  
  return formatted;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  isTyping = false 
}) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-3 rounded-2xl relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            isUser
              ? 'glass border border-blue-500/30 text-white ml-auto hover:border-blue-500/50'
              : 'glass-dark border border-purple-500/30 text-white hover:border-purple-500/50'
          }`}
        >
          {isTyping ? (
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-typing animation-delay-150" />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-typing animation-delay-300" />
              </div>
              <span className="text-sm text-gray-300 ml-2">Nova is thinking...</span>
            </div>
          ) : (
            <div>
              <div 
                className={`text-sm leading-relaxed ${
                  isUser ? 'text-white' : 'text-white'
                }`}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(message) }}
              />
              {timestamp && (
                <p className="text-xs text-gray-400 mt-1 opacity-70">
                  {timestamp}
                </p>
              )}
            </div>
          )}
          
          {/* Subtle glow effect on hover */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 hover:opacity-30 ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500/10 to-transparent'
              : 'bg-gradient-to-r from-purple-500/10 to-transparent'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
