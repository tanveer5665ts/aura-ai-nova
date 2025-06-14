
import React from 'react';
import StarField from '@/components/StarField';
import AdvancedParticleSystem from '@/components/AdvancedParticleSystem';
import AdvancedNovaChat from '@/components/AdvancedNovaChat';
import ParallaxBackground from '@/components/ParallaxBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      <ParallaxBackground />
      <StarField />
      <AdvancedParticleSystem />
      <div className="relative z-10">
        <AdvancedNovaChat />
      </div>
    </div>
  );
};

export default Index;
