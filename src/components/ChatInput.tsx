
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
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`glass-dark rounded-2xl border p-1 transition-all duration-300 ${
        isClicked 
          ? 'border-cyan-400/70 shadow-lg shadow-cyan-400/20' 
          : 'border-cosmic-purple/30 hover:border-cosmic-cyan/50'
      } focus-within:border-cosmic-cyan focus-within:glow-cyan`}>
        <div className="flex items-end space-x-3 p-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onClick={handleClick}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={`w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-sm leading-relaxed transition-all duration-200 ${
                isClicked ? 'text-cyan-100' : ''
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
            
            {/* Click ripple effect */}
            {isClicked && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse pointer-events-none" />
            )}
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              message.trim() && !disabled
                ? 'bg-gradient-to-r from-cosmic-cyan to-cosmic-purple text-white glow-cyan'
                : 'glass border border-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Enhanced typing indicator line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
        isClicked
          ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-100 scale-x-100'
          : 'bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-pink opacity-0 scale-x-0'
      } focus-within:opacity-100 focus-within:scale-x-100`} />
    </form>
  );
};

export default ChatInput;
