
import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

const renderMarkdown = (text: string) => {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, '<div class="ml-4 mb-1">• $1</div>');
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in group`}>
      <div className={`max-w-[70%] relative ${isUser ? 'order-1' : 'order-2'}`}>
        
        {/* Outer glow effect */}
        <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-300 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`} />

        <div className={`relative px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.01] ${
          isUser
            ? 'glass-dark border border-blue-500/30 text-white ml-auto hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-500/10'
            : 'glass-dark border border-purple-500/30 text-white hover:border-purple-400/50 hover:shadow-md hover:shadow-purple-500/10'
        }`}>
          
          {/* Animated background gradient */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
              : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10'
          }`} />

          {/* Floating particles on hover */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 ${
                isUser ? 'bg-blue-400' : 'bg-purple-400'
              }`}
              style={{
                left: `${25 + i * 25}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}

          {isTyping ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-typing" />
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-xs text-gray-300 ml-2">Nova is thinking...</span>
            </div>
          ) : (
            <div className="relative z-10">
              <div 
                className="text-sm leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(message) }}
              />
              {timestamp && (
                <p className="text-xs text-gray-400 mt-1 opacity-60">
                  {timestamp}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Message tail with gradient */}
        <div className={`absolute top-3 w-3 h-3 transform rotate-45 ${
          isUser 
            ? '-right-1.5 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border-r border-b border-blue-500/30'
            : '-left-1.5 bg-gradient-to-br from-purple-500/15 to-pink-500/15 border-l border-b border-purple-500/30'
        } transition-all duration-300 group-hover:scale-105`} />
      </div>
    </div>
  );
};

export default ChatBubble;
