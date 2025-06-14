
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
          className={`px-4 py-3 rounded-2xl relative transition-all duration-300 hover:scale-[1.02] ${
            isUser
              ? 'glass border border-cosmic-cyan/30 text-white ml-auto glow-cyan'
              : 'glass-dark border border-cosmic-purple/30 text-white glow-purple'
          }`}
        >
          {isTyping ? (
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cosmic-cyan rounded-full animate-typing" />
                <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-typing animation-delay-150" />
                <div className="w-2 h-2 bg-cosmic-pink rounded-full animate-typing animation-delay-300" />
              </div>
              <span className="text-sm text-gray-300 ml-2">Nova is thinking...</span>
            </div>
          ) : (
            <div>
              <div 
                className={`text-sm leading-relaxed ${
                  isUser ? 'text-white' : 'cosmic-text font-medium'
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
          
          {/* Glowing edge effect */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            isUser 
              ? 'bg-gradient-to-r from-cosmic-cyan/20 to-transparent opacity-0 hover:opacity-100'
              : 'bg-gradient-to-r from-cosmic-purple/20 to-transparent opacity-0 hover:opacity-100'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
