
import React from 'react';

const ParticleEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-modern-indigo rounded-full opacity-30 animate-particle-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <div
          key={`purple-${i}`}
          className="absolute w-2 h-2 bg-modern-purple rounded-full opacity-20 animate-particle-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 8}s`
          }}
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <div
          key={`pink-${i}`}
          className="absolute w-1.5 h-1.5 bg-modern-pink rounded-full opacity-25 animate-particle-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${12 + Math.random() * 6}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
