
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
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      {/* Outer glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
      
      {/* Main container with holographic effect */}
      <div className={`relative glass-dark rounded-2xl border p-1 transition-all duration-500 ${
        isClicked 
          ? 'border-cyan-400/80 shadow-2xl shadow-cyan-400/30 scale-[1.02]' 
          : isFocused
          ? 'border-purple-400/60 shadow-xl shadow-purple-400/20'
          : 'border-slate-600/40 hover:border-cyan-400/50'
      }`}>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 transition-opacity duration-500 ${
            isFocused || isClicked ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-cyan-400 rounded-full transition-all duration-1000 ${
                isFocused ? 'opacity-60 animate-pulse' : 'opacity-0'
              }`}
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        <div className="flex items-end space-x-3 p-4 relative z-10">
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
              className={`w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-sm leading-relaxed transition-all duration-300 ${
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
            
            {/* Dynamic ripple effect */}
            {isClicked && (
              <div className="absolute inset-0 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-xl animate-ping" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl animate-pulse" />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group ${
              message.trim() && !disabled
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-cyan-500/50'
                : 'glass border border-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {/* Button glow effect */}
            {message.trim() && !disabled && (
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
            )}
            <Send className="w-4 h-4 relative z-10" />
          </button>
        </div>
      </div>

      {/* Enhanced animated bottom line */}
      <div className="absolute -bottom-1 left-0 right-0 h-1 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-500 ${
          isClicked
            ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-100 scale-x-100'
            : isFocused
            ? 'bg-gradient-to-r from-purple-400 to-cyan-400 opacity-80 scale-x-100'
            : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 scale-x-0'
        }`}>
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
