
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Settings } from 'lucide-react';

interface PersonalityTraits {
  creativity: number;
  logic: number;
  empathy: number;
  curiosity: number;
  confidence: number;
}

interface PersonalityControlsProps {
  traits: PersonalityTraits;
  onTraitChange: (trait: keyof PersonalityTraits, value: number) => void;
  isVisible: boolean;
  onToggle: () => void;
}

const PersonalityControls: React.FC<PersonalityControlsProps> = ({
  traits,
  onTraitChange,
  isVisible,
  onToggle
}) => {
  const traitLabels = {
    creativity: 'Creativity',
    logic: 'Logic',
    empathy: 'Empathy',
    curiosity: 'Curiosity',
    confidence: 'Confidence'
  };

  const getTraitColor = (value: number) => {
    if (value > 0.8) return '#00FF88';
    if (value > 0.6) return '#00D4FF';
    if (value > 0.4) return '#8B5CF6';
    return '#EC4899';
  };

  return (
    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-80">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="mb-2 mx-auto block p-2 glass-dark rounded-lg border border-cosmic-cyan/20 hover:border-cosmic-cyan/40 transition-all"
      >
        <Settings className="w-4 h-4 text-cosmic-cyan" />
      </button>

      {/* Controls Panel */}
      {isVisible && (
        <div className="glass-dark rounded-lg p-4 border border-cosmic-cyan/20 animate-fade-in">
          <div className="text-xs text-center text-cosmic-cyan mb-3 font-mono">
            PERSONALITY CONTROLS
          </div>
          
          <div className="space-y-3">
            {Object.entries(traits).map(([trait, value]) => (
              <div key={trait} className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-gray-300 capitalize">
                    {traitLabels[trait as keyof PersonalityTraits]}
                  </label>
                  <span 
                    className="text-xs font-mono"
                    style={{ color: getTraitColor(value) }}
                  >
                    {Math.round(value * 100)}%
                  </span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={([newValue]) => 
                    onTraitChange(trait as keyof PersonalityTraits, newValue)
                  }
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-600">
            <div className="text-xs text-gray-400 text-center">
              Adjust Nova's personality traits in real-time
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityControls;
