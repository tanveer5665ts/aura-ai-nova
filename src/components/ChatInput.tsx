import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Ask Nova anything..." 
}) => {
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      {/* Extra glassy glowing ring effect */}
      <div className="absolute -inset-3 pointer-events-none">
        <div className="rounded-2xl w-full h-full border-4 opacity-30 border-cyan-300/60 blur-lg animate-neon-flow"></div>
      </div>

      {/* Ultra-glossy outer glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-50 transition duration-700" />
      
      {/* Glossy reflection layer */}
      <div className="absolute -inset-1 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-glossy-reflection" />
      </div>
      
      {/* Main container with ultra-glossy effect */}
      <div className={`relative glass-ultra rounded-2xl border p-1 transition-all duration-700 shadow-md ${
        isClicked 
          ? 'border-cyan-300/90 shadow-2xl shadow-cyan-400/40 scale-[1.02]' 
          : isFocused
          ? 'border-purple-300/80 ring-4 ring-cyan-300/50 shadow-xl shadow-purple-400/30'
          : 'border-slate-500/60 hover:border-cyan-400/70'
      }`}>
        
        {/* Ultra-glossy animated background pattern */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/8 via-purple-400/8 to-pink-400/8 transition-opacity duration-700 ${
            isFocused || isClicked ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Enhanced floating particles with glossy effect */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-1500 ${
                isFocused ? 'opacity-80 animate-pulse' : 'opacity-0'
              }`}
              style={{
                left: `${15 + i * 10}%`,
                top: `${25 + (i % 2) * 50}%`,
                animationDelay: `${i * 0.25}s`,
                background: `linear-gradient(45deg, ${
                  i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#8B5CF6' : '#EC4899'
                }, transparent)`,
                boxShadow: `0 0 8px currentColor`
              }}
            />
          ))}

          {/* Ultra-glossy shimmer effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-opacity duration-500 ${
            isFocused || isClicked ? 'opacity-100 animate-shimmer' : 'opacity-0'
          }`} />
        </div>

        <div className="flex items-end space-x-3 p-3 relative z-10">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onClick={handleClick}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={`w-full bg-transparent text-white placeholder-gray-300 resize-none focus:outline-none text-sm leading-relaxed transition-all duration-500 ${
                isClicked ? 'text-cyan-100' : isFocused ? 'text-purple-100' : ''
              }`}
              style={{
                minHeight: '20px',
                maxHeight: '100px',
                overflow: 'hidden'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            
            {/* Ultra-glossy dynamic ripple effect */}
            {isClicked && (
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-xl animate-ping" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-purple-400/15 rounded-xl animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`relative p-3 rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 group overflow-hidden ${
              message.trim() && !disabled
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-cyan-500/60'
                : 'glass border border-gray-500 text-gray-400 cursor-not-allowed'
            }`}
          >
            {/* Ultra-glossy button glow effect */}
            {message.trim() && !disabled && (
              <>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur opacity-40 group-hover:opacity-80 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 animate-shimmer" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </>
            )}
            <Send className="w-4 h-4 relative z-10" />
          </button>
        </div>

        {/* Ultra-glossy top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Enhanced animated glowing line below input (neon fuse) */}
      <div className="absolute -bottom-1 left-0 right-0 h-1 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-700 ${
          isClicked
            ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-100 scale-x-100 shadow-lg shadow-cyan-400/50'
            : isFocused
            ? 'bg-gradient-to-r from-purple-400 to-cyan-400 opacity-90 scale-x-100 shadow-md shadow-purple-400/30 animate-neon-fuse'
            : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 scale-x-0'
        }`}></div>
      </div>
    </form>
  );
};

export default ChatInput;
