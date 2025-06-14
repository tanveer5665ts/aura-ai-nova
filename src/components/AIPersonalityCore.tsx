
import React, { useState, useEffect } from 'react';

interface PersonalityTraits {
  creativity: number;
  logic: number;
  empathy: number;
  curiosity: number;
  confidence: number;
}

interface AIPersonalityCoreProps {
  currentMood: string;
  isActive: boolean;
}

const AIPersonalityCore: React.FC<AIPersonalityCoreProps> = ({ currentMood, isActive }) => {
  const [traits, setTraits] = useState<PersonalityTraits>({
    creativity: 0.8,
    logic: 0.9,
    empathy: 0.85,
    curiosity: 0.95,
    confidence: 0.75
  });

  const [neuralActivity, setNeuralActivity] = useState<number[]>([]);

  useEffect(() => {
    // Simulate neural activity based on personality
    const interval = setInterval(() => {
      const activity = Object.values(traits).map(trait => 
        trait + (Math.random() - 0.5) * 0.2
      );
      setNeuralActivity(activity);
    }, 100);

    return () => clearInterval(interval);
  }, [traits]);

  const getTraitColor = (value: number) => {
    if (value > 0.8) return '#00FF88';
    if (value > 0.6) return '#00D4FF';
    if (value > 0.4) return '#8B5CF6';
    return '#EC4899';
  };

  return (
    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-16">
      <div className="glass-dark rounded-lg p-2 border border-cosmic-cyan/20">
        <div className="text-xs text-center text-cosmic-cyan mb-1 font-mono">
          NOVA PERSONALITY CORE
        </div>
        
        <div className="grid grid-cols-5 gap-1">
          {Object.entries(traits).map(([trait, value], index) => (
            <div key={trait} className="flex flex-col items-center">
              <div className="text-xs text-gray-400 capitalize truncate w-full text-center">
                {trait.slice(0, 4)}
              </div>
              <div 
                className="w-2 rounded-full transition-all duration-300"
                style={{
                  height: `${(neuralActivity[index] || value) * 20}px`,
                  backgroundColor: getTraitColor(neuralActivity[index] || value),
                  boxShadow: `0 0 8px ${getTraitColor(neuralActivity[index] || value)}40`
                }}
              />
            </div>
          ))}
        </div>
        
        {isActive && (
          <div className="mt-1 text-xs text-center text-gray-400 animate-pulse">
            Processing: {currentMood}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPersonalityCore;
