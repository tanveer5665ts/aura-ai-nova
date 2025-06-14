
import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  isListening, 
  onToggle, 
  disabled = false 
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative w-14 h-14 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        isListening
          ? 'glass-dark border-2 border-cosmic-cyan animate-pulse-glow'
          : 'glass border border-cosmic-purple/30 hover:border-cosmic-cyan/50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-cyan/10 via-cosmic-purple/10 to-cosmic-pink/10 animate-gradient-shift" />
      
      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {isListening ? (
          <Mic className="w-6 h-6 text-cosmic-cyan animate-pulse" />
        ) : (
          <MicOff className="w-6 h-6 text-cosmic-purple" />
        )}
      </div>

      {/* Voice activity rings */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-cosmic-cyan/30 animate-ping" />
          <div className="absolute -inset-2 rounded-full border border-cosmic-cyan/20 animate-ping animation-delay-300" />
          <div className="absolute -inset-4 rounded-full border border-cosmic-cyan/10 animate-ping animation-delay-500" />
        </>
      )}
    </button>
  );
};

export default VoiceButton;
