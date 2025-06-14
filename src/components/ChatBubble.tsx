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
      <div className={`max-w-[65%] relative ${isUser ? 'order-1' : 'order-2'}`}>
        
        {/* Ultra-glossy outer glow effect */}
        <div className={`absolute -inset-1 rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition-all duration-500 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500'
            : 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500'
        }`} />

        {/* Glossy reflection layer */}
        <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-700 overflow-hidden ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30'
            : 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-glossy-reflection" />
        </div>

        <div className={`relative px-4 py-2 rounded-3xl transition-all duration-500 hover:scale-[1.021] glass-ultra ${
          isUser
            ? 'border border-blue-400/40 text-white ml-auto hover:border-blue-300/60 hover:shadow-2xl hover:shadow-blue-500/40'
            : 'border border-purple-400/40 text-white hover:border-purple-300/70 hover:shadow-2xl hover:shadow-purple-500/40'
        }`}>
          
          {/* Extra shimmer highlight */}
          <div className="absolute left-2 top-2 w-8 h-4 rounded-full bg-white/13 blur-lg opacity-50 pointer-events-none animate-glossy-shine"/>
          
          {/* Ultra-glossy animated background gradient */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 ${
            isUser 
              ? 'bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-blue-500/20'
              : 'bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-purple-500/20'
          }`} />

          {/* Enhanced floating particles with glossy effect */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ${
                isUser ? 'bg-blue-300' : 'bg-purple-300'
              }`}
              style={{
                left: `${15 + i * 18}%`,
                top: `${25 + (i % 2) * 50}%`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: `0 0 6px currentColor`
              }}
            />
          ))}

          {/* Glossy shimmer effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer ${
              isUser ? 'delay-100' : 'delay-200'
            }`} />
          </div>

          {isTyping ? (
            <div className="flex items-center space-x-2 relative z-10">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-typing shadow-lg shadow-blue-400/50" />
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-typing shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-typing shadow-lg shadow-pink-400/50" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-xs text-gray-200 ml-2 font-medium">Nova is thinking...</span>
            </div>
          ) : (
            <div className="relative z-10">
              <div 
                className="text-sm leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(message) }}
              />
              {timestamp && (
                <p className="text-xs text-gray-300 mt-1 opacity-70 font-medium">
                  {timestamp}
                </p>
              )}
            </div>
          )}

          {/* Enhanced shimmer highlight at top left */}
          <div className="absolute top-0 left-0 w-1/3 h-2 rounded-bl-3xl bg-white/20 blur mt-0.5 ml-0.5 opacity-30 pointer-events-none animate-glossy-shine" />

          {/* Ultra-glossy top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Enhanced message tail with ultra-glossy effect */}
        <div className={`absolute top-2 w-3 h-3 transform rotate-45 transition-all duration-500 group-hover:scale-110 ${
          isUser 
            ? '-right-1.5 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 border-r border-b border-blue-400/40 shadow-lg shadow-blue-400/20'
            : '-left-1.5 bg-gradient-to-br from-purple-400/25 to-pink-400/25 border-l border-b border-purple-400/40 shadow-lg shadow-purple-400/20'
        }`}>
          {/* Glossy highlight on tail */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
