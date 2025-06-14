
import React, { useState, useEffect } from 'react';

interface HolographicAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  mood?: 'neutral' | 'happy' | 'thinking' | 'excited' | 'focused';
}

const HolographicAvatar: React.FC<HolographicAvatarProps> = ({ 
  isListening, 
  isSpeaking, 
  mood = 'neutral' 
}) => {
  const [brainWave, setBrainWave] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrainWave(prev => (prev + 0.1) % (Math.PI * 2));
      if (isSpeaking || isListening) {
        setEnergyLevel(0.8 + Math.random() * 0.2);
      } else {
        setEnergyLevel(0.3 + Math.random() * 0.2);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isSpeaking, isListening]);

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return '#00FF88';
      case 'thinking': return '#8B5CF6';
      case 'excited': return '#FF6B35';
      case 'focused': return '#00D4FF';
      default: return '#00D4FF';
    }
  };

  const getMoodGradient = () => {
    switch (mood) {
      case 'happy': return 'from-green-400 via-cyan-400 to-blue-500';
      case 'thinking': return 'from-purple-400 via-pink-400 to-indigo-500';
      case 'excited': return 'from-orange-400 via-red-400 to-pink-500';
      case 'focused': return 'from-cyan-400 via-blue-400 to-purple-500';
      default: return 'from-cosmic-cyan via-cosmic-purple to-cosmic-pink';
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Holographic field */}
      <div className="absolute inset-0 scale-150">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getMoodGradient()} opacity-20 animate-pulse blur-sm`} />
      </div>

      {/* Energy rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-full border-2 opacity-30 animate-ping`}
          style={{
            borderColor: getMoodColor(),
            animationDelay: `${i * 0.5}s`,
            animationDuration: '3s',
            transform: `scale(${1 + i * 0.3})`
          }}
        />
      ))}

      {/* Neural network visualization */}
      <div className="absolute inset-0 w-20 h-20 mx-auto my-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Neural connections */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = 50 + Math.cos(angle) * 20;
            const y1 = 50 + Math.sin(angle) * 20;
            const x2 = 50 + Math.cos(angle + brainWave) * 35;
            const y2 = 50 + Math.sin(angle + brainWave) * 35;
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={getMoodColor()}
                strokeWidth="1"
                opacity={energyLevel}
                className="animate-pulse"
              />
            );
          })}
          
          {/* Central node */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill={getMoodColor()}
            opacity={energyLevel}
            className="animate-pulse"
          />
          
          {/* Outer nodes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8 + brainWave;
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;
            
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={getMoodColor()}
                opacity={energyLevel * 0.8}
              />
            );
          })}
        </svg>
      </div>

      {/* Main avatar container */}
      <div className={`relative w-20 h-20 rounded-full glass-dark border-2 transition-all duration-300 ${
        isListening 
          ? 'border-cyan-400 animate-pulse-glow scale-110' 
          : isSpeaking 
          ? 'border-purple-400 animate-pulse-glow scale-105' 
          : 'border-cosmic-cyan/30 scale-100'
      }`}>
        
        {/* Holographic overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-transparent animate-gradient-shift" />
        
        {/* Nova core */}
        <div className="absolute inset-2 rounded-full flex items-center justify-center">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getMoodGradient()} flex items-center justify-center relative overflow-hidden`}>
            
            {/* Scanning lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-1 animate-pulse" 
                 style={{ 
                   transform: `translateY(${Math.sin(brainWave * 4) * 20}px)`,
                   transition: 'transform 0.1s ease-out'
                 }} />
            
            {/* Nova symbol with dynamic effects */}
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-6 h-6 relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="dynamic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor={getMoodColor()} />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              <path 
                d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z" 
                fill="url(#dynamic-gradient)"
                className="drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 ${energyLevel * 10}px ${getMoodColor()})`
                }}
              />
            </svg>
          </div>
        </div>

        {/* Data streams */}
        {(isListening || isSpeaking) && (
          <div className="absolute inset-0 rounded-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-ping"
                style={{
                  backgroundColor: getMoodColor(),
                  left: `${50 + Math.cos((i * Math.PI) / 3 + brainWave) * 40}%`,
                  top: `${50 + Math.sin((i * Math.PI) / 3 + brainWave) * 40}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quantum field effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${50 + Math.cos((i * Math.PI) / 6 + brainWave * 2) * 60}%`,
              top: `${50 + Math.sin((i * Math.PI) / 6 + brainWave * 2) * 60}%`,
              transform: `scale(${1 + Math.sin(brainWave * 3 + i) * 0.5})`,
              filter: `hue-rotate(${Math.sin(brainWave + i) * 60}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HolographicAvatar;
