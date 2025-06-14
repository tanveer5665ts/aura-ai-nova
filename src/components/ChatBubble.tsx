
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in group`}>
      <div className={`max-w-[80%] relative ${isUser ? 'order-1' : 'order-2'}`}>
        
        {/* Outer glow effect */}
        <div className={`absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-40 transition-all duration-500 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`} />

        <div className={`relative px-6 py-4 rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
          isUser
            ? 'glass-dark border border-blue-500/30 text-white ml-auto hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20'
            : 'glass-dark border border-purple-500/30 text-white hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20'
        }`}>
          
          {/* Animated background gradient */}
          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
              : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
          }`} />

          {/* Floating particles on hover */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ${
                isUser ? 'bg-blue-400' : 'bg-purple-400'
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + (i % 2) * 60}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}

          {isTyping ? (
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-typing" />
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm text-gray-300 ml-3">Nova is thinking...</span>
            </div>
          ) : (
            <div className="relative z-10">
              <div 
                className="text-sm leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(message) }}
              />
              {timestamp && (
                <p className="text-xs text-gray-400 mt-2 opacity-70">
                  {timestamp}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Message tail with gradient */}
        <div className={`absolute top-4 w-4 h-4 transform rotate-45 ${
          isUser 
            ? '-right-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-r border-b border-blue-500/30'
            : '-left-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-l border-b border-purple-500/30'
        } transition-all duration-500 group-hover:scale-110`} />
      </div>
    </div>
  );
};

export default ChatBubble;
