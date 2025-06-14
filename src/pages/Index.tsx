
import React from 'react';
import StarField from '@/components/StarField';
import AdvancedParticleSystem from '@/components/AdvancedParticleSystem';
import AdvancedNovaChat from '@/components/AdvancedNovaChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      <StarField />
      <AdvancedParticleSystem />
      
      <div className="relative z-10">
        <AdvancedNovaChat />
      </div>
    </div>
  );
};

export default Index;
