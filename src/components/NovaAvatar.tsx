
import React from 'react';

interface NovaAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
}

const NovaAvatar: React.FC<NovaAvatarProps> = ({ isListening, isSpeaking }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isListening 
            ? 'animate-pulse-glow ring-4 ring-cosmic-cyan/50' 
            : isSpeaking 
            ? 'animate-pulse-glow ring-4 ring-cosmic-purple/50' 
            : 'ring-2 ring-cosmic-cyan/20'
        }`}
      />
      
      {/* Avatar container */}
      <div className="relative w-16 h-16 rounded-full glass-dark border-2 border-cosmic-cyan/30 flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-cyan/20 via-cosmic-purple/20 to-cosmic-pink/20 animate-gradient-shift" />
        
        {/* Nova symbol */}
        <div className="relative z-10 w-8 h-8 flex items-center justify-center">
          <div className={`w-6 h-6 rounded-full cosmic-text transition-all duration-300 ${
            isListening || isSpeaking ? 'animate-pulse scale-110' : ''
          }`}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="nova-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path 
                d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z" 
                fill="url(#nova-gradient)"
                className={isListening || isSpeaking ? 'drop-shadow-lg' : ''}
              />
            </svg>
          </div>
        </div>

        {/* Voice activity indicator */}
        {(isListening || isSpeaking) && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-2 rounded-full border-2 border-cosmic-cyan/50 animate-ping" />
            <div className="absolute inset-4 rounded-full border border-cosmic-purple/50 animate-ping animation-delay-150" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NovaAvatar;
